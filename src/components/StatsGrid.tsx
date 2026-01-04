import { useStats } from '@/hooks/useStats';
import { useLanguage } from '@/contexts/LanguageContext';
import { CalendarCheck, Sparkles, Euro } from 'lucide-react';

const StatsGrid = () => {
  const { t } = useLanguage();
  const stats = useStats();
  
  const statItems = [
    { 
      label: t('stats.bookings'), 
      value: stats.bookings,
      icon: CalendarCheck,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    { 
      label: t('stats.cleanings'), 
      value: stats.cleanings,
      icon: Sparkles,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    { 
      label: t('stats.revenue'), 
      value: stats.revenue,
      icon: Euro,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
      {statItems.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-card border border-border rounded-xl p-4 relative overflow-hidden transition-all duration-300 shadow-card hover:shadow-card-hover hover:-translate-y-1 group"
          >
            <div className="absolute top-0 left-0 right-0 h-1 gradient-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className={`w-8 h-8 ${stat.bgColor} rounded-lg flex items-center justify-center mb-3`}>
              <Icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
              {stat.label}
            </div>
            <div className={`font-display text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsGrid;
