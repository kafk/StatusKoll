import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'hr', name: 'Hrvatski', flag: '🇭🇷' },
];

const LanguageSettings = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {t('settings.languageDescription')}
      </p>

      <div className="space-y-2">
        {languages.map((lang) => (
          <Card 
            key={lang.code}
            className={`cursor-pointer transition-all hover:border-primary/50 ${
              language === lang.code ? 'border-primary bg-primary/5' : ''
            }`}
            onClick={() => setLanguage(lang.code)}
          >
            <CardContent className="py-3 px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                </div>
                {language === lang.code && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LanguageSettings;
