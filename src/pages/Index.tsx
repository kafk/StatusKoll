import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomePage from '@/components/HomePage';
import StatusPage from '@/components/StatusPage';
import CustomersPage from '@/components/CustomersPage';
import EconomyPage from '@/components/EconomyPage';
import StatisticsPage from '@/components/StatisticsPage';
import BottomNav from '@/components/BottomNav';
import FAB from '@/components/FAB';
import BookingModal from '@/components/BookingModal';
import { useAuth } from '@/hooks/useAuth';

type Page = 'home' | 'status' | 'customers' | 'economy' | 'statistics';

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
      <div className="max-w-[428px] mx-auto px-5 relative z-[1]">
        {activePage === 'home' && <HomePage />}
        {activePage === 'status' && <StatusPage />}
        {activePage === 'customers' && <CustomersPage />}
        {activePage === 'economy' && <EconomyPage />}
        {activePage === 'statistics' && <StatisticsPage />}
      </div>

      <FAB onClick={() => setIsModalOpen(true)} />
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <BottomNav activePage={activePage} onPageChange={setActivePage} />
    </div>
  );
};

export default Index;
