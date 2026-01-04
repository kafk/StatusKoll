import { useStats } from '@/hooks/useStats';
import { useLanguage } from '@/contexts/LanguageContext';

const StatsGrid = () => {
  const { t } = useLanguage();
  const stats = useStats();
  
  const statItems = [
    { 
      label: t('stats.bookings'), 
      value: stats.bookings,
      color: 'text-primary',
    },
    { 
      label: t('stats.cleanings'), 
      value: stats.cleanings,
      color: 'text-secondary',
    },
    { 
      label: t('stats.revenue'), 
      value: stats.revenue,
      color: 'text-warning',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
      {statItems.map((stat, index) => {
        return (
          <div
            key={index}
            className="bg-card border border-border rounded-xl p-4 relative overflow-hidden transition-all duration-300 shadow-card hover:shadow-card-hover hover:-translate-y-1 group"
          >
            <div className="absolute top-0 left-0 right-0 h-1 gradient-primary opacity-0 group-hover:opacity-100 transition-opacity" />
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
