import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (activity: ActivityFormData) => void;
  customerName: string;
}

export interface ActivityFormData {
  type: 'cleaning_booked' | 'payment_received' | 'booking_made';
  date: Date;
  amount?: string;
  note?: string;
}

const activityTypes = [
  { value: 'cleaning_booked', label: 'Städ bokat', emoji: '🧹' },
  { value: 'payment_received', label: 'Betalning mottagen', emoji: '💰' },
  { value: 'booking_made', label: 'Bokning gjord', emoji: '📅' },
] as const;

const AddActivityModal = ({ isOpen, onClose, onSubmit, customerName }: AddActivityModalProps) => {
  const [selectedType, setSelectedType] = useState<ActivityFormData['type'] | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    if (!selectedType) return;

    onSubmit({
      type: selectedType,
      date,
      amount: amount || undefined,
      note: note || undefined,
    });

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
          Lägg till aktivitet för {customerName}
        </h3>

        <div className="space-y-4">
          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2 block">
              Typ av aktivitet
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
              Datum
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
                  {date ? format(date, 'yyyy-MM-dd') : 'Välj datum'}
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
                Belopp
              </label>
              <Input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="t.ex. 5000 kr"
              />
            </div>
          )}

          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2 block">
              Anteckning (valfritt)
            </label>
            <Input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Lägg till en anteckning..."
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-transparent border border-border rounded-xl py-3 font-mono text-sm hover:border-primary transition-all"
          >
            Avbryt
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedType}
            className="flex-1 bg-primary text-primary-foreground rounded-xl py-3 font-mono text-sm font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Lägg till
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddActivityModal;
