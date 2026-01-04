import Header from './Header';
import StatsGrid from './StatsGrid';
import Timeline from './Timeline';

interface HomePageProps {
  onSettingsClick?: () => void;
}

const HomePage = ({ onSettingsClick }: HomePageProps) => {
  return (
    <div className="pb-20">
      <Header onSettingsClick={onSettingsClick} />
      <StatsGrid />
      <Timeline />
    </div>
  );
};

export default HomePage;
