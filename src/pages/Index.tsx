import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomePage from '@/components/HomePage';
import StatusPage from '@/components/StatusPage';
import CustomersPage from '@/components/CustomersPage';
import EconomyPage from '@/components/EconomyPage';
import StatisticsPage from '@/components/StatisticsPage';
import SettingsPage from '@/components/SettingsPage';
import BottomNav from '@/components/BottomNav';
import FAB from '@/components/FAB';
import BookingModal from '@/components/BookingModal';
import { useAuth } from '@/hooks/useAuth';

type Page = 'home' | 'status' | 'customers' | 'economy' | 'statistics' | 'settings';

const Index = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Laddar...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[428px] md:max-w-2xl lg:max-w-4xl mx-auto px-5 md:px-8 relative z-[1]">
        {activePage === 'home' && <HomePage onSettingsClick={() => setActivePage('settings')} />}
        {activePage === 'status' && <StatusPage onSettingsClick={() => setActivePage('settings')} />}
        {activePage === 'customers' && <CustomersPage onSettingsClick={() => setActivePage('settings')} />}
        {activePage === 'economy' && <EconomyPage onSettingsClick={() => setActivePage('settings')} />}
        {activePage === 'statistics' && <StatisticsPage onSettingsClick={() => setActivePage('settings')} />}
        {activePage === 'settings' && <SettingsPage />}
      </div>

      <FAB onClick={() => setIsModalOpen(true)} />
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <BottomNav activePage={activePage} onPageChange={setActivePage} />
    </div>
  );
};

export default Index;
