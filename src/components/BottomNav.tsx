import { Home, Activity, Users, Coins } from 'lucide-react';

type Page = 'home' | 'status' | 'customers' | 'economy';

interface BottomNavProps {
  activePage: Page;
  onPageChange: (page: Page) => void;
}

const BottomNav = ({ activePage, onPageChange }: BottomNavProps) => {
  const navItems: { id: Page; label: string; icon: typeof Home }[] = [
    { id: 'home', label: 'Hem', icon: Home },
    { id: 'status', label: 'Status', icon: Activity },
    { id: 'customers', label: 'Kunder', icon: Users },
    { id: 'economy', label: 'Ekonomi', icon: Coins },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border pt-2 pb-6 z-[100] shadow-[0_-2px_10px_rgba(45,52,54,0.08)]">
      <div className="max-w-[428px] mx-auto flex justify-around items-center">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onPageChange(id)}
            className={`flex flex-col items-center gap-1 px-5 py-1 rounded-xl transition-all hover:bg-primary/10 ${
              activePage === id ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Icon className="w-5 h-5" strokeWidth={2} />
            <span className="text-[10px]">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
