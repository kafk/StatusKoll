import { Home, Activity, Users, Coins, BarChart3 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type Page = 'home' | 'status' | 'customers' | 'economy' | 'statistics' | 'settings';

interface BottomNavProps {
  activePage: Page;
  onPageChange: (page: Page) => void;
}

const BottomNav = ({ activePage, onPageChange }: BottomNavProps) => {
  const { t } = useLanguage();
  
  const navItems: { id: Page; labelKey: string; icon: typeof Home }[] = [
    { id: 'home', labelKey: 'nav.home', icon: Home },
    { id: 'status', labelKey: 'nav.status', icon: Activity },
    { id: 'customers', labelKey: 'nav.customers', icon: Users },
    { id: 'economy', labelKey: 'nav.economy', icon: Coins },
    { id: 'statistics', labelKey: 'nav.statistics', icon: BarChart3 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border pt-2 pb-6 z-[100] shadow-[0_-2px_10px_rgba(45,52,54,0.08)]">
      <div className="max-w-[428px] mx-auto flex justify-around items-center">
        {navItems.map(({ id, labelKey, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onPageChange(id)}
            className={`flex flex-col items-center gap-0.5 px-2 sm:px-4 py-1 rounded-xl transition-all hover:bg-primary/10 min-w-0 ${
              activePage === id ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Icon className="w-5 h-5 shrink-0" strokeWidth={2} />
            <span className="text-[9px] sm:text-[10px] truncate max-w-[48px]">{t(labelKey)}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
