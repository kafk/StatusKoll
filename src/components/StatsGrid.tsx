import { stats } from '@/data/mockData';

const StatsGrid = () => {
  const statItems = [
    { label: 'Bokningar', value: stats.bookings },
    { label: 'Städningar', value: stats.cleanings },
    { label: 'Intäkt', value: stats.revenue },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
      {statItems.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 relative overflow-hidden transition-all duration-300 shadow-card hover:shadow-card-hover hover:-translate-y-1 group"
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 gradient-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
            {stat.label}
          </div>
          <div className="font-display text-2xl font-bold text-primary">
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
