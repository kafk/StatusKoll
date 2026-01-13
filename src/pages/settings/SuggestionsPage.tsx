import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lightbulb, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

const DEMO_EMAIL = 'demo@statuskoll.se';

const SuggestionsPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [suggestion, setSuggestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDemoDialog, setShowDemoDialog] = useState(false);

  const isDemoAccount = user?.email === DEMO_EMAIL;

  const handleSubmit = async () => {
    if (!suggestion.trim()) return;

    if (isDemoAccount) {
      setShowDemoDialog(true);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate sending - in a real app, this would send to a backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success(t('suggestions.sent'));
    setSuggestion('');
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background p-4 pb-24">
      <div className="max-w-lg mx-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-4 -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('common.back')}
        </Button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold">{t('suggestions.title')}</h1>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{t('suggestions.cardTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t('suggestions.description')}
            </p>
            
            <Textarea
              placeholder={t('suggestions.placeholder')}
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              rows={5}
              className="resize-none"
            />

            <Button 
              onClick={handleSubmit}
              disabled={!suggestion.trim() || isSubmitting}
              className="w-full"
            >
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? t('suggestions.sending') : t('suggestions.send')}
            </Button>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground text-center mt-4">
          {t('suggestions.note')}
        </p>
      </div>

      {/* Demo account dialog */}
      <Dialog open={showDemoDialog} onOpenChange={setShowDemoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              Demokonto
            </DialogTitle>
            <DialogDescription className="pt-2">
              Detta är ett demokonto. På ett riktigt konto skulle ditt förslag skickas till vårt team för granskning.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowDemoDialog(false)}>
              Jag förstår
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuggestionsPage;
