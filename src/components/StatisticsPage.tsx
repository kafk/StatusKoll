import { useState, useMemo } from 'react';
import { format, getYear, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Header from './Header';
import { useCosts } from '@/hooks/useCosts';
import { useCustomers } from '@/hooks/useCustomers';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
const COLORS = ['hsl(var(--primary))', 'hsl(var(--info))', 'hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--destructive))'];

const StatisticsPage = () => {
  const { data: costs } = useCosts();
  const { data: customers } = useCustomers();

  // Get available years from data
  const availableYears = useMemo(() => {
    const years = new Set<number>();
    
    costs?.forEach(cost => {
      years.add(getYear(parseISO(cost.date)));
    });
    
    customers?.forEach(customer => {
      years.add(getYear(parseISO(customer.check_in)));
    });
    
    // Add current year if no data
    if (years.size === 0) {
      years.add(new Date().getFullYear());
    }
    
    return Array.from(years).sort((a, b) => b - a);
  }, [costs, customers]);

  const [selectedYears, setSelectedYears] = useState<number[]>(() => {
    return availableYears.slice(0, 2);
  });

  const toggleYear = (year: number) => {
    setSelectedYears(prev => 
      prev.includes(year) 
        ? prev.filter(y => y !== year)
        : [...prev, year].sort((a, b) => b - a)
    );
  };

  // Calculate monthly data for each selected year
  const chartData = useMemo(() => {
    return MONTHS.map((month, monthIndex) => {
      const dataPoint: Record<string, string | number> = { month };
      
      selectedYears.forEach(year => {
        // Calculate income for this month/year
        const monthlyIncome = customers?.reduce((total, customer) => {
          const checkInDate = parseISO(customer.check_in);
          if (getYear(checkInDate) === year && checkInDate.getMonth() === monthIndex) {
            const amount = parseFloat(customer.amount.replace('€', '').replace(',', '.')) || 0;
            return total + amount;
          }
          return total;
        }, 0) || 0;

        // Calculate costs for this month/year
        const monthlyCosts = costs?.reduce((total, cost) => {
          const costDate = parseISO(cost.date);
          if (getYear(costDate) === year && costDate.getMonth() === monthIndex) {
            return total + Number(cost.amount);
          }
          return total;
        }, 0) || 0;

        dataPoint[`income_${year}`] = monthlyIncome;
        dataPoint[`costs_${year}`] = monthlyCosts;
        dataPoint[`profit_${year}`] = monthlyIncome - monthlyCosts;
      });
      
      return dataPoint;
    });
  }, [costs, customers, selectedYears]);

  // Calculate yearly totals
  const yearlyTotals = useMemo(() => {
    return selectedYears.map(year => {
      const income = customers?.reduce((total, customer) => {
        const checkInDate = parseISO(customer.check_in);
        if (getYear(checkInDate) === year) {
          const amount = parseFloat(customer.amount.replace('€', '').replace(',', '.')) || 0;
          return total + amount;
        }
        return total;
      }, 0) || 0;

      const totalCosts = costs?.reduce((total, cost) => {
        const costDate = parseISO(cost.date);
        if (getYear(costDate) === year) {
          return total + Number(cost.amount);
        }
        return total;
      }, 0) || 0;

      return { year, income, costs: totalCosts, profit: income - totalCosts };
    });
  }, [costs, customers, selectedYears]);

  return (
    <div className="pb-24">
      <Header title="Statistik" subtitle="Jämför data mellan år" />

      {/* Year Selection */}
      <Card className="p-4 mb-6">
        <h3 className="font-medium text-sm mb-3 text-muted-foreground">Välj år att jämföra</h3>
        <div className="flex flex-wrap gap-3">
          {availableYears.map(year => (
            <label key={year} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedYears.includes(year)}
                onCheckedChange={() => toggleYear(year)}
              />
              <span className="text-sm font-medium">{year}</span>
            </label>
          ))}
        </div>
      </Card>

      {/* Income Chart */}
      <Card className="p-4 mb-6">
        <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-success" />
          Intäkter per månad
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              {selectedYears.map((year, index) => (
                <Line
                  key={year}
                  type="monotone"
                  dataKey={`income_${year}`}
                  name={`${year}`}
                  stroke={COLORS[index % COLORS.length]}
                  strokeWidth={2}
                  dot={{ fill: COLORS[index % COLORS.length] }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Costs Chart */}
      <Card className="p-4 mb-6">
        <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-destructive" />
          Kostnader per månad
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              {selectedYears.map((year, index) => (
                <Line
                  key={year}
                  type="monotone"
                  dataKey={`costs_${year}`}
                  name={`${year}`}
                  stroke={COLORS[index % COLORS.length]}
                  strokeWidth={2}
                  dot={{ fill: COLORS[index % COLORS.length] }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Profit Chart */}
      <Card className="p-4 mb-6">
        <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" />
          Vinst per månad
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              {selectedYears.map((year, index) => (
                <Line
                  key={year}
                  type="monotone"
                  dataKey={`profit_${year}`}
                  name={`${year}`}
                  stroke={COLORS[index % COLORS.length]}
                  strokeWidth={2}
                  dot={{ fill: COLORS[index % COLORS.length] }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Yearly Summary */}
      <Card className="p-4">
        <h3 className="font-display font-bold text-lg mb-4">Årssammanfattning</h3>
        <div className="space-y-4">
          {yearlyTotals.map((data, index) => (
            <div key={data.year} className="p-4 rounded-xl bg-muted/50 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <span 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="font-bold text-lg">{data.year}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Intäkter</p>
                  <p className="font-medium text-success">{data.income.toLocaleString()} €</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Kostnader</p>
                  <p className="font-medium text-destructive">{data.costs.toLocaleString()} €</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Vinst</p>
                  <p className={`font-medium ${data.profit >= 0 ? 'text-primary' : 'text-destructive'}`}>
                    {data.profit >= 0 ? '+' : ''}{data.profit.toLocaleString()} €
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default StatisticsPage;
