import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Users, Globe, LogOut } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import TeamSettings from './settings/TeamSettings';
import LanguageSettings from './settings/LanguageSettings';
import { APP_VERSION } from '@/constants/version';

const SettingsPage = () => {
  const { t } = useLanguage();
  const { signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'team' | 'language'>('team');

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: t('common.error'),
        description: t('header.logoutError'),
        variant: "destructive",
      });
    } else {
      navigate("/auth");
    }
  };

  const menuItems = [
    { id: 'team' as const, icon: Users, label: t('settings.team') },
    { id: 'language' as const, icon: Globe, label: t('settings.language') },
  ];

  return (
    <div className="pb-24">
      <div className="flex items-center gap-3 pt-12 pb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Settings className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold">{t('settings.title')}</h1>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
              activeTab === item.id
                ? 'bg-primary/10 border-primary text-primary'
                : 'bg-card border-border text-foreground hover:border-primary/50'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="mb-8">
        {activeTab === 'team' && <TeamSettings />}
        {activeTab === 'language' && <LanguageSettings />}
      </div>

      <div className="border-t border-border pt-6">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          {t('settings.logout')}
        </Button>
        <button
          onClick={() => navigate('/changelog')}
          className="w-full text-center text-xs text-muted-foreground mt-4 hover:text-primary transition-colors"
        >
          v{APP_VERSION}
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
