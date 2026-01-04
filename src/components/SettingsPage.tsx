import { useState } from 'react';
import { Settings, Users, Globe } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import TeamSettings from './settings/TeamSettings';
import LanguageSettings from './settings/LanguageSettings';

const SettingsPage = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('team');

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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-6">
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            {t('settings.team')}
          </TabsTrigger>
          <TabsTrigger value="language" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            {t('settings.language')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="team">
          <TeamSettings />
        </TabsContent>

        <TabsContent value="language">
          <LanguageSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
