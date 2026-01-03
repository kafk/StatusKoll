import { useState } from 'react';
import { useEvents, formatEventForUI } from '@/hooks/useEvents';
import EventCard from './EventCard';
import FilterTabs from './FilterTabs';
import { EventType } from '@/types/rental';

const Timeline = () => {
  const [activeFilter, setActiveFilter] = useState('Alla');
  const tabs = ['Alla', 'Bokning', 'Städ', 'Betalning'];
  const { data: dbEvents, isLoading } = useEvents();

  const filterMap: Record<string, EventType | 'all'> = {
    'Alla': 'all',
    'Bokning': 'booking',
    'Städ': 'cleaning',
    'Betalning': 'payment',
  };

  const events = dbEvents?.map(formatEventForUI) || [];

  const filteredEvents = events.filter((event) => {
    const filterType = filterMap[activeFilter];
    if (filterType === 'all') return true;
    return event.type === filterType;
  });

  return (
    <div>
      <div
        className="flex justify-end items-center mb-5 animate-fade-in-up"
        style={{ animationDelay: '0.2s' }}
      >
        <FilterTabs tabs={tabs} activeTab={activeFilter} onTabChange={setActiveFilter} />
      </div>

      <div className="relative pl-[30px]">
        {/* Timeline line */}
        <div
          className="absolute left-2 top-0 bottom-0 w-0.5 opacity-30"
          style={{
            background:
              'linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 50%, hsl(var(--warning)) 100%)',
          }}
        />

        {isLoading ? (
          <div className="text-muted-foreground text-center py-8">Laddar...</div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-muted-foreground text-center py-8">Inga händelser ännu</div>
        ) : (
          filteredEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))
        )}
      </div>
    </div>
  );
};

export default Timeline;
