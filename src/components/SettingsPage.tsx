import { useNavigate } from 'react-router-dom';
import { Settings, Users, Globe, LogOut, Lightbulb, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { APP_VERSION } from '@/constants/version';

const SettingsPage = () => {
  const { t } = useLanguage();
  const { signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

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
    { path: '/settings/team', icon: Users, label: t('settings.team'), description: t('team.description') },
    { path: '/settings/language', icon: Globe, label: t('settings.language'), description: t('settings.languageDescription') },
    { path: '/settings/suggestions', icon: Lightbulb, label: t('suggestions.title'), description: t('suggestions.menuDescription') },
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

      <div className="flex flex-col gap-2 mb-8">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex items-center gap-3 p-4 rounded-xl border bg-card border-border text-foreground hover:border-primary/50 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-medium block">{item.label}</span>
              <span className="text-xs text-muted-foreground block truncate">{item.description}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          </button>
        ))}
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
