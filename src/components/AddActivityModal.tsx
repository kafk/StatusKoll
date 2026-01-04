import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { DbEvent } from '@/hooks/useEvents';
import { useLanguage } from '@/contexts/LanguageContext';

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (activity: ActivityFormData) => void;
  onUpdate?: (activity: ActivityFormData & { id: string }) => void;
  customerName: string;
  editingEvent?: DbEvent | null;
}

export interface ActivityFormData {
  type: 'cleaning_booked' | 'payment_received' | 'booking_made';
  date: Date;
  amount?: string;
  note?: string;
}

const AddActivityModal = ({ isOpen, onClose, onSubmit, onUpdate, customerName, editingEvent }: AddActivityModalProps) => {
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState<ActivityFormData['type'] | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const activityTypes = [
    { value: 'cleaning_booked' as const, label: t('activity.cleaningBooked'), emoji: '🧹', dbType: 'cleaning' },
    { value: 'payment_received' as const, label: t('activity.paymentReceived'), emoji: '💰', dbType: 'payment' },
    { value: 'booking_made' as const, label: t('activity.bookingMade'), emoji: '📅', dbType: 'booking' },
  ];

  const getActivityTypeFromDbType = (dbType: string): ActivityFormData['type'] | null => {
    const mapping = activityTypes.find(t => t.dbType === dbType);
    return mapping ? mapping.value : null;
  };

  useEffect(() => {
    if (editingEvent) {
      const type = getActivityTypeFromDbType(editingEvent.type);
      setSelectedType(type);
      setDate(parseISO(editingEvent.date));
      setAmount(editingEvent.amount || '');
      setNote(editingEvent.note || '');
    } else {
      setSelectedType(null);
      setDate(new Date());
      setAmount('');
      setNote('');
    }
  }, [editingEvent, isOpen]);

  const handleSubmit = () => {
    if (!selectedType) return;

    const activityData = {
      type: selectedType,
      date,
      amount: amount || undefined,
      note: note || undefined,
    };

    if (editingEvent && onUpdate) {
      onUpdate({ ...activityData, id: editingEvent.id });
    } else {
      onSubmit(activityData);
    }

    // Reset form
    setSelectedType(null);
    setDate(new Date());
    setAmount('');
    setNote('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 animate-fade-in-up">
        <h3 className="font-display text-xl font-bold mb-4">
          {editingEvent ? t('activity.edit') : t('activity.add')} {t('activity.for')} {customerName}
        </h3>

        <div className="space-y-4">
          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2 block">
              {t('activity.type')}
            </label>
            <div className="grid grid-cols-1 gap-2">
              {activityTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-xl border transition-all text-left',
                    selectedType === type.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <span className="text-xl">{type.emoji}</span>
                  <span className="font-mono text-sm">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2 block">
              {t('activity.date')}
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'yyyy-MM-dd') : t('activity.selectDate')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => d && setDate(d)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {selectedType === 'payment_received' && (
            <div>
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2 block">
                {t('activity.amount')}
              </label>
              <Input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={t('activity.amountPlaceholder')}
              />
            </div>
          )}

          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2 block">
              {t('activity.note')}
            </label>
            <Input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t('activity.notePlaceholder')}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-transparent border border-border rounded-xl py-3 font-mono text-sm hover:border-primary transition-all"
          >
            {t('common.cancel')}
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedType}
            className="flex-1 bg-primary text-primary-foreground rounded-xl py-3 font-mono text-sm font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {editingEvent ? t('common.save') : t('common.add')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddActivityModal;
