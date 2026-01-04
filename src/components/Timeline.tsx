import { useState } from 'react';
import { useEvents, formatEventForUI } from '@/hooks/useEvents';
import { useLanguage } from '@/contexts/LanguageContext';
import EventCard from './EventCard';
import FilterTabs from './FilterTabs';
import { EventType } from '@/types/rental';

const Timeline = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  
  const tabs = [
    { key: 'all', label: t('timeline.filter.all') },
    { key: 'booking', label: t('timeline.filter.booking') },
    { key: 'cleaning', label: t('timeline.filter.cleaning') },
    { key: 'payment', label: t('timeline.filter.payment') },
  ];
  
  const { data: dbEvents, isLoading } = useEvents();

  const filterMap: Record<string, EventType | 'all'> = {
    'all': 'all',
    'booking': 'booking',
    'cleaning': 'cleaning',
    'payment': 'payment',
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
        <FilterTabs 
          tabs={tabs.map(t => t.label)} 
          activeTab={tabs.find(tab => tab.key === activeFilter)?.label || tabs[0].label} 
          onTabChange={(label) => {
            const tab = tabs.find(t => t.label === label);
            if (tab) setActiveFilter(tab.key);
          }} 
        />
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
          <div className="text-muted-foreground text-center py-8">{t('common.loading')}</div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-muted-foreground text-center py-8">{t('timeline.noEvents')}</div>
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
