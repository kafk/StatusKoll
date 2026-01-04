import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Customer } from '@/types/rental';
import { useToast } from '@/hooks/use-toast';
import { useCreateEvent, useCustomerEvents, useUpdateEvent, DbEvent } from '@/hooks/useEvents';
import { useUpdateCustomer } from '@/hooks/useCustomers';
import AddActivityModal, { ActivityFormData } from './AddActivityModal';
import { Pencil } from 'lucide-react';

interface CustomerDetailProps {
  customer: Customer;
  onBack: () => void;
}

const CustomerDetail = ({ customer, onBack }: CustomerDetailProps) => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<DbEvent | null>(null);
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const updateCustomer = useUpdateCustomer();
  const { data: events, isLoading: eventsLoading } = useCustomerEvents(customer.id);

  const handleMarkCleaningBooked = async () => {
    try {
      await createEvent.mutateAsync({
        customer_id: customer.id,
        type: 'cleaning',
        date: format(new Date(), 'yyyy-MM-dd'),
        description: `Städ bokat för ${customer.name}`,
        note: 'Städ bokat',
      });
      
      await updateCustomer.mutateAsync({
        id: customer.id,
        cleaning_done: true,
      });

      toast({
        title: 'Städ bokat!',
        description: `${customer.name}s städning är nu bokad.`,
      });
    } catch (error) {
      toast({
        title: 'Fel',
        description: 'Kunde inte markera städ som bokat.',
        variant: 'destructive',
      });
    }
  };

  const handleMarkCleaningPaid = async () => {
    try {
      await createEvent.mutateAsync({
        customer_id: customer.id,
        type: 'payment',
        date: format(new Date(), 'yyyy-MM-dd'),
        description: `Städ betald för ${customer.name}`,
        note: 'Städ betald',
      });
      
      await updateCustomer.mutateAsync({
        id: customer.id,
        payment_done: true,
      });

      toast({
        title: 'Städ betald!',
        description: `${customer.name}s städning är nu markerad som betald.`,
      });
    } catch (error) {
      toast({
        title: 'Fel',
        description: 'Kunde inte markera städ som betald.',
        variant: 'destructive',
      });
    }
  };

  const handleAddActivity = async (activity: ActivityFormData) => {
    const typeMap = {
      cleaning_booked: { type: 'cleaning' as const, label: 'Städ bokat' },
      payment_received: { type: 'payment' as const, label: 'Betalning mottagen från Booking' },
      booking_made: { type: 'booking' as const, label: 'Bokning gjord via Booking' },
    };

    const { type, label } = typeMap[activity.type];

    try {
      await createEvent.mutateAsync({
        customer_id: customer.id,
        type,
        date: format(activity.date, 'yyyy-MM-dd'),
        description: `${label} för ${customer.name}`,
        amount: activity.amount,
        note: activity.note,
      });

      toast({
        title: 'Aktivitet tillagd!',
        description: `${label} har lagts till för ${customer.name}.`,
      });
    } catch (error) {
      toast({
        title: 'Fel',
        description: 'Kunde inte lägga till aktiviteten.',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateActivity = async (activity: ActivityFormData & { id: string }) => {
    const typeMap = {
      cleaning_booked: { type: 'cleaning' as const, label: 'Städ bokat' },
      payment_received: { type: 'payment' as const, label: 'Betalning mottagen från Booking' },
      booking_made: { type: 'booking' as const, label: 'Bokning gjord via Booking' },
    };

    const { type, label } = typeMap[activity.type];

    try {
      await updateEvent.mutateAsync({
        id: activity.id,
        date: format(activity.date, 'yyyy-MM-dd'),
        description: `${label} för ${customer.name}`,
        amount: activity.amount || null,
        note: activity.note || null,
      });

      toast({
        title: 'Aktivitet uppdaterad!',
        description: `${label} har uppdaterats för ${customer.name}.`,
      });
      setEditingEvent(null);
    } catch (error) {
      toast({
        title: 'Fel',
        description: 'Kunde inte uppdatera aktiviteten.',
        variant: 'destructive',
      });
    }
  };

  const handleEditEvent = (event: DbEvent) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  return (
    <div className="animate-fade-in-up pb-20">
      <button
        onClick={onBack}
        className="bg-card border border-border rounded-xl px-4 py-2.5 text-muted-foreground font-mono text-xs hover:border-primary hover:text-primary transition-all mb-4 inline-block"
      >
        ← Tillbaka till kunder
      </button>

      <h3 className="font-display text-[28px] font-bold gradient-text-secondary mb-6">
        {customer.name}
      </h3>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
            Incheckning
          </div>
          <div className="font-display text-xl font-bold">{customer.checkIn}</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
            Utcheckning
          </div>
          <div className="font-display text-xl font-bold">{customer.checkOut}</div>
        </div>
        <div className="bg-card border border-primary rounded-2xl p-4 bg-gradient-to-br from-primary/5 to-primary/[0.02]">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
            Belopp
          </div>
          <div className="font-display text-xl font-bold text-primary">{customer.amount}</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
            Status
          </div>
          <div
            className={`font-display text-xl font-bold ${
              customer.filterStatus === 'past'
                ? 'text-primary'
                : customer.filterStatus === 'current'
                ? 'text-warning'
                : 'text-secondary'
            }`}
          >
            {customer.filterStatus === 'past'
              ? 'Klar'
              : customer.filterStatus === 'current'
              ? 'Pågående'
              : 'Kommande'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={handleMarkCleaningBooked}
          disabled={createEvent.isPending || updateCustomer.isPending}
          className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3 font-mono text-[11px] font-bold hover:border-primary hover:-translate-y-0.5 transition-all disabled:opacity-50"
        >
          <span className="text-2xl">🧹</span>
          Markera Städ Bokat
        </button>
        <button
          onClick={handleMarkCleaningPaid}
          disabled={createEvent.isPending || updateCustomer.isPending}
          className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3 font-mono text-[11px] font-bold hover:border-primary hover:-translate-y-0.5 transition-all disabled:opacity-50"
        >
          <span className="text-2xl">💳</span>
          Markera betald Städ
        </button>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-display text-lg font-bold">Aktivitet</h4>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-transparent border border-border rounded-xl px-4 py-2 text-primary font-mono text-[11px] font-bold hover:border-primary hover:bg-primary/10 transition-all"
          >
            + Lägg till
          </button>
        </div>

        <div className="relative pl-[30px]">
          <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-border" />

          {eventsLoading ? (
            <div className="text-muted-foreground text-sm">Laddar aktiviteter...</div>
          ) : !events || events.length === 0 ? (
            <div className="text-muted-foreground text-sm">Inga aktiviteter än</div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="bg-card border border-border rounded-xl p-4 mb-3 relative group"
              >
                <div className="absolute -left-[22px] top-5 w-3 h-3 rounded-full bg-primary border-2 border-background z-[1]" />
                <button
                  onClick={() => handleEditEvent(event)}
                  className="absolute top-3 right-3 p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-muted transition-all"
                  title="Redigera"
                >
                  <Pencil className="w-4 h-4 text-muted-foreground" />
                </button>
                <div className="text-[11px] text-muted-foreground mb-1">
                  {format(parseISO(event.date), 'd MMM yyyy')}
                </div>
                <div className="text-[13px] text-muted-foreground">{event.note || event.description}</div>
              </div>
            ))
          )}
        </div>
      </div>

      <AddActivityModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddActivity}
        onUpdate={handleUpdateActivity}
        customerName={customer.name}
        editingEvent={editingEvent}
      />
    </div>
  );
};

export default CustomerDetail;
