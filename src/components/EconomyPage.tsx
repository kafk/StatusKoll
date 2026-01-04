import { useState, useMemo } from 'react';
import { format, getYear, parseISO } from 'date-fns';
import { sv, enUS, de, hr } from 'date-fns/locale';
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
import { useLanguage } from '@/contexts/LanguageContext';

const EconomyPage = () => {
  const { t, language } = useLanguage();
  const { data: costs, isLoading: costsLoading } = useCosts();
  const { data: customers } = useCustomers();
  const createCost = useCreateCost();
  const deleteCost = useDeleteCost();

  const localeMap = { sv, en: enUS, de, hr };
  const dateLocale = localeMap[language] || sv;

  // Single combined form state
  const [newCostName, setNewCostName] = useState('');
  const [newCostAmount, setNewCostAmount] = useState('');
  const [newCostDate, setNewCostDate] = useState<Date>(new Date());
  const [newCostTransaction, setNewCostTransaction] = useState('');
  const [newCostCustomer, setNewCostCustomer] = useState<string>('');
  const [newCostType, setNewCostType] = useState<'variable' | 'fixed'>('variable');
  
  const [selectedYear, setSelectedYear] = useState<string>('all');
  
  // Get active customers for dropdown
  const activeCustomers = useMemo(() => {
    return customers?.filter(c => c.status === 'confirmed' || c.status === 'pending') || [];
  }, [customers]);

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

  const addCost = async () => {
    if (newCostName && newCostAmount) {
      await createCost.mutateAsync({
        name: newCostName,
        amount: parseFloat(newCostAmount),
        date: format(newCostDate, 'yyyy-MM-dd'),
        type: newCostType,
        transaction_title: newCostTransaction || undefined,
        customer_id: newCostCustomer || undefined
      });
      setNewCostName('');
      setNewCostAmount('');
      setNewCostDate(new Date());
      setNewCostTransaction('');
      setNewCostCustomer('');
    }
  };

  const removeCost = (id: string) => {
    deleteCost.mutate(id);
  };

  if (costsLoading) {
    return (
      <div className="pb-24">
        <Header title={t('economy.title')} subtitle={t('economy.subtitle')} />
        <div className="text-center text-muted-foreground py-8">{t('common.loading')}</div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <Header title={t('economy.title')} subtitle={t('economy.subtitle')} />

      {/* Year Filter */}
      <div className="mb-4">
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t('economy.selectYear')} />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="all">{t('economy.allYears')}</SelectItem>
            {availableYears.map(year => (
              <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card className="p-4 bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-success" />
            <span className="text-xs text-muted-foreground">{t('economy.income')}</span>
          </div>
          <p className="text-xl font-bold text-success">{income.toLocaleString()} €</p>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-destructive" />
            <span className="text-xs text-muted-foreground">{t('economy.costs')}</span>
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
              <p className="text-sm text-muted-foreground">{t('economy.profitAfterCosts')}</p>
              <p className={`text-2xl font-bold ${profit >= 0 ? 'text-primary' : 'text-destructive'}`}>
                {profit >= 0 ? '+' : ''}{profit.toLocaleString()} €
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Add Cost Form - Combined */}
      <Card className="p-4 mb-6">
        <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          {t('economy.addCost')}
        </h3>
        
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <Input 
              placeholder={t('economy.costPlaceholder')}
              value={newCostName}
              onChange={(e) => setNewCostName(e.target.value)}
              className="flex-1 min-w-[100px]"
            />
            <Input 
              placeholder={t('economy.amountPlaceholder')}
              type="number"
              value={newCostAmount}
              onChange={(e) => setNewCostAmount(e.target.value)}
              className="w-24"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Input 
              placeholder={t('economy.transactionPlaceholder')}
              value={newCostTransaction}
              onChange={(e) => setNewCostTransaction(e.target.value)}
              className="flex-1 min-w-[150px]"
            />
            <Select value={newCostCustomer} onValueChange={(val) => setNewCostCustomer(val === 'none' ? '' : val)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder={t('economy.customerOptional')} />
              </SelectTrigger>
              <SelectContent className="bg-card border-border z-50">
                <SelectItem value="none">{t('economy.noCustomer')}</SelectItem>
                {activeCustomers.map(customer => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={newCostType} onValueChange={(val) => setNewCostType(val as 'variable' | 'fixed')}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border z-50">
                <SelectItem value="variable">{t('economy.variableCost')}</SelectItem>
                <SelectItem value="fixed">{t('economy.fixedCost')}</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("flex-1 justify-start text-left font-normal", !newCostDate && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(newCostDate, 'd MMM yyyy', { locale: dateLocale })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-50" align="start">
                <Calendar
                  mode="single"
                  selected={newCostDate}
                  onSelect={(date) => date && setNewCostDate(date)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            <Button onClick={addCost} disabled={createCost.isPending}>
              <Plus className="w-4 h-4 mr-1" />
              {t('common.add')}
            </Button>
          </div>
        </div>
      </Card>

      {/* Income Section */}
      <div className="mb-6">
        <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-success" />
          {t('economy.income')}
        </h3>
        
        <Card className="p-4">
          <div className="space-y-3">
            {filteredCustomers.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-2">{t('economy.noIncome')}</p>
            ) : (
              filteredCustomers.map(customer => {
                const amount = parseFloat(customer.amount.replace('€', '').replace(',', '.')) || 0;
                return (
                  <div key={customer.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium">{customer.name}</span>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{format(new Date(customer.check_in), 'd MMM yyyy', { locale: dateLocale })}</span>
                        {customer.platform && (
                          <span className="text-success">• {customer.platform}</span>
                        )}
                      </div>
                    </div>
                    <span className="font-medium text-success">+{amount.toLocaleString()} €</span>
                  </div>
                );
              })
            )}
          </div>
          
          <div className="mt-3 pt-3 border-t border-border flex justify-between">
            <span className="text-sm text-muted-foreground">{t('economy.totalIncome')}</span>
            <span className="font-bold text-success">+{income.toLocaleString()} €</span>
          </div>
        </Card>
      </div>

      {/* Variable Costs */}
      <div className="mb-6">
        <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-info" />
          {t('economy.variableCosts')}
        </h3>
        
        <Card className="p-4">
          <div className="space-y-3">
            {variableCosts.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-2">{t('economy.noVariableCosts')}</p>
            ) : (
              variableCosts.map(cost => {
                const linkedCustomer = customers?.find(c => c.id === cost.customer_id);
                return (
                  <div key={cost.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium">{cost.name}</span>
                      {cost.transaction_title && (
                        <p className="text-xs text-muted-foreground truncate">{cost.transaction_title}</p>
                      )}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{format(new Date(cost.date), 'd MMM yyyy', { locale: dateLocale })}</span>
                        {linkedCustomer && (
                          <span className="text-info">• {linkedCustomer.name}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{Number(cost.amount).toLocaleString()} €</span>
                      <button 
                        onClick={() => removeCost(cost.id)}
                        className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          
          <div className="mt-3 pt-3 border-t border-border flex justify-between">
            <span className="text-sm text-muted-foreground">{t('economy.totalVariable')}</span>
            <span className="font-bold">{totalVariableCosts.toLocaleString()} €</span>
          </div>
        </Card>
      </div>

      {/* Fixed Costs */}
      <div className="mb-6">
        <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-warning" />
          {t('economy.fixedCosts')}
        </h3>
        
        <Card className="p-4">
          <div className="space-y-3">
            {fixedCosts.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-2">{t('economy.noFixedCosts')}</p>
            ) : (
              fixedCosts.map(cost => {
                const linkedCustomer = customers?.find(c => c.id === cost.customer_id);
                return (
                  <div key={cost.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium">{cost.name}</span>
                      {cost.transaction_title && (
                        <p className="text-xs text-muted-foreground truncate">{cost.transaction_title}</p>
                      )}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{format(new Date(cost.date), 'd MMM yyyy', { locale: dateLocale })}</span>
                        {linkedCustomer && (
                          <span className="text-info">• {linkedCustomer.name}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{Number(cost.amount).toLocaleString()} €</span>
                      <button 
                        onClick={() => removeCost(cost.id)}
                        className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          
          <div className="mt-3 pt-3 border-t border-border flex justify-between">
            <span className="text-sm text-muted-foreground">{t('economy.totalFixed')}</span>
            <span className="font-bold">{totalFixedCosts.toLocaleString()} €</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EconomyPage;
