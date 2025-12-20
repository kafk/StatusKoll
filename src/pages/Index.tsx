import { useState } from 'react';
import HomePage from '@/components/HomePage';
import StatusPage from '@/components/StatusPage';
import CustomersPage from '@/components/CustomersPage';
import EconomyPage from '@/components/EconomyPage';
import BottomNav from '@/components/BottomNav';
import FAB from '@/components/FAB';
import BookingModal from '@/components/BookingModal';

type Page = 'home' | 'status' | 'customers' | 'economy';

const Index = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[428px] mx-auto px-5 relative z-[1]">
        {activePage === 'home' && <HomePage />}
        {activePage === 'status' && <StatusPage />}
        {activePage === 'customers' && <CustomersPage />}
        {activePage === 'economy' && <EconomyPage />}
      </div>

      <FAB onClick={() => setIsModalOpen(true)} />
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <BottomNav activePage={activePage} onPageChange={setActivePage} />
    </div>
  );
};

export default Index;
