interface FilterTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const FilterTabs = ({ tabs, activeTab, onTabChange }: FilterTabsProps) => {
  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all border ${
            activeTab === tab
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-transparent border-border text-muted-foreground hover:border-primary hover:text-primary'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
