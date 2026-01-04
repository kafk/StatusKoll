import { useState, useMemo } from 'react';
import { getYear, parseISO } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Card } from '@/components/ui/card';
import { Home, Globe, Building2, Users } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import Header from './Header';
import { useCosts } from '@/hooks/useCosts';
import { useCustomers } from '@/hooks/useCustomers';
import { useLanguage } from '@/contexts/LanguageContext';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--info))', 'hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--destructive))'];

const StatisticsPage = () => {
  const { t } = useLanguage();
  const { data: costs } = useCosts();
  const { data: customers } = useCustomers();

  const MONTHS = [
    t('month.jan'), t('month.feb'), t('month.mar'), t('month.apr'),
    t('month.may'), t('month.jun'), t('month.jul'), t('month.aug'),
    t('month.sep'), t('month.oct'), t('month.nov'), t('month.dec')
  ];

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
  }, [costs, customers, selectedYears, MONTHS]);

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

  // Calculate platform statistics
  const platformStats = useMemo(() => {
    const platforms = ['Airbnb', 'Booking', 'VRBO', 'Direct'];
    const platformColors: Record<string, string> = {
      'Airbnb': 'hsl(var(--destructive))',
      'Booking': 'hsl(var(--info))',
      'VRBO': 'hsl(var(--success))',
      'Direct': 'hsl(var(--primary))'
    };
    const platformIcons: Record<string, typeof Home> = {
      'Airbnb': Home,
      'Booking': Globe,
      'VRBO': Building2,
      'Direct': Users
    };

    return platforms.map(platform => {
      const platformCustomers = customers?.filter(c => 
        (c.platform || 'Direct') === platform &&
        (selectedYears.length === 0 || selectedYears.includes(getYear(parseISO(c.check_in))))
      ) || [];
      
      const bookings = platformCustomers.length;
      const revenue = platformCustomers.reduce((total, customer) => {
        const amount = parseFloat(customer.amount.replace('€', '').replace(',', '.')) || 0;
        return total + amount;
      }, 0);

      return {
        platform,
        bookings,
        revenue,
        color: platformColors[platform],
        Icon: platformIcons[platform]
      };
    });
  }, [customers, selectedYears]);

  return (
    <div className="pb-24">
      <Header title={t('statistics.title')} subtitle={t('statistics.subtitle')} />

      {/* Year Selection */}
      <Card className="p-4 mb-6">
        <h3 className="font-medium text-sm mb-3 text-muted-foreground">{t('statistics.selectYears')}</h3>
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
          {t('statistics.incomePerMonth')}
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
          {t('statistics.costsPerMonth')}
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
          {t('statistics.profitPerMonth')}
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

      {/* Platform Statistics */}
      <Card className="p-4 mb-6">
        <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-info" />
          {t('statistics.platformStats')}
        </h3>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {platformStats.map(({ platform, bookings, revenue, color, Icon }) => (
            <div 
              key={platform} 
              className="p-4 rounded-xl bg-muted/50 border border-border"
            >
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: color + '20' }}
                >
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <span className="font-medium text-sm">{platform}</span>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{bookings}</p>
                <p className="text-xs text-muted-foreground">{t('statistics.bookings')}</p>
                <p className="text-sm font-medium" style={{ color }}>
                  {revenue.toLocaleString()} €
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={platformStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="platform" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value: number) => [`${value.toLocaleString()} €`, t('statistics.revenue')]}
              />
              <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
                {platformStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Yearly Summary */}
      <Card className="p-4">
        <h3 className="font-display font-bold text-lg mb-4">{t('statistics.yearlySummary')}</h3>
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
                  <p className="text-muted-foreground">{t('statistics.income')}</p>
                  <p className="font-medium text-success">{data.income.toLocaleString()} €</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t('statistics.costs')}</p>
                  <p className="font-medium text-destructive">{data.costs.toLocaleString()} €</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t('statistics.profit')}</p>
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
