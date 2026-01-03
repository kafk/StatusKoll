import { useState, useMemo } from 'react';
import { format, getYear, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';
import { Plus, Trash2, TrendingUp, TrendingDown, Wallet, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import Header from './Header';
import { useCosts, useCreateCost, useDeleteCost } from '@/hooks/useCosts';
import { useCustomers } from '@/hooks/useCustomers';

const EconomyPage = () => {
  const { data: costs, isLoading: costsLoading } = useCosts();
  const { data: customers } = useCustomers();
  const createCost = useCreateCost();
  const deleteCost = useDeleteCost();

  const [newFixedName, setNewFixedName] = useState('');
  const [newFixedAmount, setNewFixedAmount] = useState('');
  const [newFixedDate, setNewFixedDate] = useState<Date>(new Date());
  const [newVariableName, setNewVariableName] = useState('');
  const [newVariableAmount, setNewVariableAmount] = useState('');
  const [newVariableDate, setNewVariableDate] = useState<Date>(new Date());
  const [selectedYear, setSelectedYear] = useState<string>('all');

  // Get available years from data
  const availableYears = useMemo(() => {
    const years = new Set<number>();
    
    costs?.forEach(cost => {
      years.add(getYear(parseISO(cost.date)));
    });
    
    customers?.forEach(customer => {
      years.add(getYear(parseISO(customer.check_in)));
    });
    
    if (years.size === 0) {
      years.add(new Date().getFullYear());
    }
    
    return Array.from(years).sort((a, b) => b - a);
  }, [costs, customers]);

  // Filter data by selected year
  const filteredCustomers = useMemo(() => {
    if (selectedYear === 'all') return customers || [];
    return customers?.filter(c => getYear(parseISO(c.check_in)) === parseInt(selectedYear)) || [];
  }, [customers, selectedYear]);

  const filteredCosts = useMemo(() => {
    if (selectedYear === 'all') return costs || [];
    return costs?.filter(c => getYear(parseISO(c.date)) === parseInt(selectedYear)) || [];
  }, [costs, selectedYear]);

  // Calculate income from filtered customers
  const income = filteredCustomers.reduce((total, customer) => {
    const amount = parseFloat(customer.amount.replace('€', '').replace(',', '.')) || 0;
    return total + amount;
  }, 0);

  const fixedCosts = filteredCosts.filter(c => c.type === 'fixed');
  const variableCosts = filteredCosts.filter(c => c.type === 'variable');

  const totalFixedCosts = fixedCosts.reduce((sum, c) => sum + Number(c.amount), 0);
  const totalVariableCosts = variableCosts.reduce((sum, c) => sum + Number(c.amount), 0);
  const totalCosts = totalFixedCosts + totalVariableCosts;
  const profit = income - totalCosts;

  const addFixedCost = async () => {
    if (newFixedName && newFixedAmount) {
      await createCost.mutateAsync({
        name: newFixedName,
        amount: parseFloat(newFixedAmount),
        date: format(newFixedDate, 'yyyy-MM-dd'),
        type: 'fixed'
      });
      setNewFixedName('');
      setNewFixedAmount('');
      setNewFixedDate(new Date());
    }
  };

  const addVariableCost = async () => {
    if (newVariableName && newVariableAmount) {
      await createCost.mutateAsync({
        name: newVariableName,
        amount: parseFloat(newVariableAmount),
        date: format(newVariableDate, 'yyyy-MM-dd'),
        type: 'variable'
      });
      setNewVariableName('');
      setNewVariableAmount('');
      setNewVariableDate(new Date());
    }
  };

  const removeFixedCost = (id: string) => {
    deleteCost.mutate(id);
  };

  const removeVariableCost = (id: string) => {
    deleteCost.mutate(id);
  };

  if (costsLoading) {
  return (
    <div className="pb-24">
      <Header title="Ekonomi" subtitle="Översikt av intäkter & kostnader" />

      {/* Year Filter */}
      <div className="mb-4">
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Välj år" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="all">Alla år</SelectItem>
            {availableYears.map(year => (
              <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
        <div className="text-center text-muted-foreground py-8">Laddar...</div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <Header title="Ekonomi" subtitle="Översikt av intäkter & kostnader" />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card className="p-4 bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-success" />
            <span className="text-xs text-muted-foreground">Intäkter</span>
          </div>
          <p className="text-xl font-bold text-success">{income.toLocaleString()} €</p>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-destructive" />
            <span className="text-xs text-muted-foreground">Kostnader</span>
          </div>
          <p className="text-xl font-bold text-destructive">{totalCosts.toLocaleString()} €</p>
        </Card>
      </div>

      {/* Profit Card */}
      <Card className={`p-5 mb-6 border-2 ${profit >= 0 ? 'bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30' : 'bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/30'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${profit >= 0 ? 'bg-primary/20' : 'bg-destructive/20'}`}>
              <Wallet className={`w-5 h-5 ${profit >= 0 ? 'text-primary' : 'text-destructive'}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Vinst efter kostnader</p>
              <p className={`text-2xl font-bold ${profit >= 0 ? 'text-primary' : 'text-destructive'}`}>
                {profit >= 0 ? '+' : ''}{profit.toLocaleString()} €
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Variable Costs */}
      <div className="mb-6">
        <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-info" />
          Rörliga kostnader
        </h3>
        
        <Card className="p-4">
          <div className="space-y-3 mb-4">
            {variableCosts.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-2">Inga rörliga kostnader</p>
            ) : (
              variableCosts.map(cost => (
                <div key={cost.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <span className="text-sm">{cost.name}</span>
                    <p className="text-xs text-muted-foreground">{format(new Date(cost.date), 'd MMM yyyy', { locale: sv })}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{Number(cost.amount).toLocaleString()} €</span>
                    <button 
                      onClick={() => removeVariableCost(cost.id)}
                      className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Input 
              placeholder="Kostnad..." 
              value={newVariableName}
              onChange={(e) => setNewVariableName(e.target.value)}
              className="flex-1 min-w-[100px]"
            />
            <Input 
              placeholder="Belopp" 
              type="number"
              value={newVariableAmount}
              onChange={(e) => setNewVariableAmount(e.target.value)}
              className="w-24"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-[120px] justify-start text-left font-normal", !newVariableDate && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(newVariableDate, 'd MMM', { locale: sv })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={newVariableDate}
                  onSelect={(date) => date && setNewVariableDate(date)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            <Button size="icon" onClick={addVariableCost} disabled={createCost.isPending}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="mt-3 pt-3 border-t border-border flex justify-between">
            <span className="text-sm text-muted-foreground">Totalt rörliga</span>
            <span className="font-bold">{totalVariableCosts.toLocaleString()} €</span>
          </div>
        </Card>
      </div>

      {/* Fixed Costs */}
      <div className="mb-6">
        <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-warning" />
          Fasta kostnader
        </h3>
        
        <Card className="p-4">
          <div className="space-y-3 mb-4">
            {fixedCosts.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-2">Inga fasta kostnader</p>
            ) : (
              fixedCosts.map(cost => (
                <div key={cost.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <span className="text-sm">{cost.name}</span>
                    <p className="text-xs text-muted-foreground">{format(new Date(cost.date), 'd MMM yyyy', { locale: sv })}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{Number(cost.amount).toLocaleString()} €</span>
                    <button 
                      onClick={() => removeFixedCost(cost.id)}
                      className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Input 
              placeholder="Kostnad..." 
              value={newFixedName}
              onChange={(e) => setNewFixedName(e.target.value)}
              className="flex-1 min-w-[100px]"
            />
            <Input 
              placeholder="Belopp" 
              type="number"
              value={newFixedAmount}
              onChange={(e) => setNewFixedAmount(e.target.value)}
              className="w-24"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-[120px] justify-start text-left font-normal", !newFixedDate && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(newFixedDate, 'd MMM', { locale: sv })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={newFixedDate}
                  onSelect={(date) => date && setNewFixedDate(date)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            <Button size="icon" onClick={addFixedCost} disabled={createCost.isPending}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="mt-3 pt-3 border-t border-border flex justify-between">
            <span className="text-sm text-muted-foreground">Totalt fasta</span>
            <span className="font-bold">{totalFixedCosts.toLocaleString()} €</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EconomyPage;
