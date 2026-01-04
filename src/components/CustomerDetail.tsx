import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Customer } from '@/types/rental';
import { Customer as DbCustomer } from '@/hooks/useCustomers';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCreateEvent, useCustomerEvents, useUpdateEvent, useDeleteEvent, DbEvent } from '@/hooks/useEvents';
import { useUpdateCustomer } from '@/hooks/useCustomers';
import AddActivityModal, { ActivityFormData } from './AddActivityModal';
import EditBookingModal from './EditBookingModal';
import { Pencil, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface CustomerDetailProps {
  customer: Customer;
  dbCustomer: DbCustomer;
  onBack: () => void;
}

const CustomerDetail = ({ customer, dbCustomer, onBack }: CustomerDetailProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditBookingOpen, setIsEditBookingOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<DbEvent | null>(null);
  const [deletingEventId, setDeletingEventId] = useState<string | null>(null);
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();
  const updateCustomer = useUpdateCustomer();
  const { data: events, isLoading: eventsLoading } = useCustomerEvents(customer.id);

  const handleMarkCleaningBooked = async () => {
    try {
      await createEvent.mutateAsync({
        customer_id: customer.id,
        type: 'cleaning',
        date: format(new Date(), 'yyyy-MM-dd'),
        description: t('customer.cleaningBookedFor', { name: customer.name }),
        note: t('customer.cleaningBookedNote'),
      });
      
      await updateCustomer.mutateAsync({
        id: customer.id,
        cleaning_done: true,
      });

      toast({
        title: t('customer.cleaningBooked'),
        description: t('customer.cleaningBookedDesc', { name: customer.name }),
      });
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('customer.markError'),
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
        description: t('customer.cleaningPaidFor', { name: customer.name }),
        note: t('customer.cleaningPaidNote'),
      });
      
      await updateCustomer.mutateAsync({
        id: customer.id,
        payment_done: true,
      });

      toast({
        title: t('customer.cleaningPaid'),
        description: t('customer.cleaningPaidDesc', { name: customer.name }),
      });
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('customer.markError'),
        variant: 'destructive',
      });
    }
  };

  const handleMarkBookingPaymentReceived = async () => {
    try {
      await createEvent.mutateAsync({
        customer_id: customer.id,
        type: 'payment',
        date: format(new Date(), 'yyyy-MM-dd'),
        description: t('customer.bookingPaymentFor', { name: customer.name }),
        note: t('customer.bookingPaymentNote'),
      });
      
      await updateCustomer.mutateAsync({
        id: customer.id,
        booking_payment_received: true,
      });

      toast({
        title: t('customer.bookingPaymentReceived'),
        description: t('customer.bookingPaymentReceivedDesc', { name: customer.name }),
      });
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('customer.markError'),
        variant: 'destructive',
      });
    }
  };

  const getTypeLabel = (type: ActivityFormData['type']) => {
    const typeMap = {
      cleaning_booked: t('activity.cleaningBooked'),
      payment_received: t('activity.paymentFromBooking'),
      booking_made: t('activity.bookingViaBooking'),
    };
    return typeMap[type];
  };

  const handleAddActivity = async (activity: ActivityFormData) => {
    const typeMap = {
      cleaning_booked: { type: 'cleaning' as const },
      payment_received: { type: 'payment' as const },
      booking_made: { type: 'booking' as const },
    };

    const { type } = typeMap[activity.type];
    const label = getTypeLabel(activity.type);

    try {
      await createEvent.mutateAsync({
        customer_id: customer.id,
        type,
        date: format(activity.date, 'yyyy-MM-dd'),
        description: `${label} ${t('activity.for')} ${customer.name}`,
        amount: activity.amount,
        note: activity.note,
      });

      toast({
        title: t('customer.activityAdded'),
        description: t('customer.activityAddedDesc', { type: label, name: customer.name }),
      });
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('customer.activityAddError'),
        variant: 'destructive',
      });
    }
  };

  const handleUpdateActivity = async (activity: ActivityFormData & { id: string }) => {
    const typeMap = {
      cleaning_booked: { type: 'cleaning' as const },
      payment_received: { type: 'payment' as const },
      booking_made: { type: 'booking' as const },
    };

    const { type } = typeMap[activity.type];
    const label = getTypeLabel(activity.type);

    try {
      await updateEvent.mutateAsync({
        id: activity.id,
        date: format(activity.date, 'yyyy-MM-dd'),
        description: `${label} ${t('activity.for')} ${customer.name}`,
        amount: activity.amount || null,
        note: activity.note || null,
      });

      toast({
        title: t('customer.activityUpdated'),
        description: t('customer.activityUpdatedDesc', { type: label, name: customer.name }),
      });
      setEditingEvent(null);
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('customer.activityUpdateError'),
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

  const handleDeleteEvent = async () => {
    if (!deletingEventId) return;
    
    try {
      await deleteEvent.mutateAsync(deletingEventId);
      toast({
        title: t('customer.activityDeleted'),
        description: t('customer.activityDeletedDesc'),
      });
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('customer.activityDeleteError'),
        variant: 'destructive',
      });
    } finally {
      setDeletingEventId(null);
    }
  };

  const getStatusText = () => {
    if (customer.filterStatus === 'past') return t('status.done');
    if (customer.filterStatus === 'current') return t('status.ongoing');
    return t('status.upcoming');
  };

  return (
    <div className="animate-fade-in-up pb-20">
      <button
        onClick={onBack}
        className="bg-card border border-border rounded-xl px-4 py-2.5 text-muted-foreground font-mono text-xs hover:border-primary hover:text-primary transition-all mb-4 inline-block"
      >
        {t('customers.backToList')}
      </button>

      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-[28px] font-bold gradient-text-secondary">
          {customer.name}
        </h3>
        <button
          onClick={() => setIsEditBookingOpen(true)}
          className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2.5 text-muted-foreground font-mono text-xs hover:border-primary hover:text-primary transition-all"
        >
          <Pencil className="w-4 h-4" />
          {t('booking.edit')}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
            {t('customer.checkIn')}
          </div>
          <div className="font-display text-xl font-bold">{customer.checkIn}</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
            {t('customer.checkOut')}
          </div>
          <div className="font-display text-xl font-bold">{customer.checkOut}</div>
        </div>
        <div className="bg-card border border-primary rounded-2xl p-4 bg-gradient-to-br from-primary/5 to-primary/[0.02]">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
            {t('customer.amount')}
          </div>
          <div className="font-display text-xl font-bold text-primary">{customer.amount}</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
            {t('customer.status')}
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
            {getStatusText()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <button
          onClick={handleMarkCleaningBooked}
          disabled={createEvent.isPending || updateCustomer.isPending}
          className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center gap-2 font-mono text-[10px] font-bold hover:border-primary hover:-translate-y-0.5 transition-all disabled:opacity-50"
        >
          <span className="text-2xl">🧹</span>
          {t('customer.markCleaningBooked')}
        </button>
        <button
          onClick={handleMarkCleaningPaid}
          disabled={createEvent.isPending || updateCustomer.isPending}
          className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center gap-2 font-mono text-[10px] font-bold hover:border-primary hover:-translate-y-0.5 transition-all disabled:opacity-50"
        >
          <span className="text-2xl">💳</span>
          {t('customer.markCleaningPaid')}
        </button>
        <button
          onClick={handleMarkBookingPaymentReceived}
          disabled={createEvent.isPending || updateCustomer.isPending}
          className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center gap-2 font-mono text-[10px] font-bold hover:border-primary hover:-translate-y-0.5 transition-all disabled:opacity-50"
        >
          <span className="text-2xl">📥</span>
          {t('customer.markBookingPayment')}
        </button>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-display text-lg font-bold">{t('customer.activity')}</h4>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-transparent border border-border rounded-xl px-4 py-2 text-primary font-mono text-[11px] font-bold hover:border-primary hover:bg-primary/10 transition-all"
          >
            {t('customer.addActivity')}
          </button>
        </div>

        <div className="relative pl-[30px]">
          <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-border" />

          {eventsLoading ? (
            <div className="text-muted-foreground text-sm">{t('customer.loadingActivities')}</div>
          ) : !events || events.length === 0 ? (
            <div className="text-muted-foreground text-sm">{t('customer.noActivities')}</div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="bg-card border border-border rounded-xl p-4 mb-3 relative group"
              >
                <div className="absolute -left-[22px] top-5 w-3 h-3 rounded-full bg-primary border-2 border-background z-[1]" />
                <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                  <button
                    onClick={() => handleEditEvent(event)}
                    className="p-2 rounded-lg hover:bg-muted"
                    title={t('common.edit')}
                  >
                    <Pencil className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => setDeletingEventId(event.id)}
                    className="p-2 rounded-lg hover:bg-destructive/10"
                    title={t('common.delete')}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                </div>
                <div className="text-[11px] text-muted-foreground mb-1">
                  {format(parseISO(event.date), 'd MMM yyyy')}
                </div>
                <div className="text-[13px] text-muted-foreground">{event.note || event.description}</div>
              </div>
            ))
          )}
        </div>
      </div>

      <EditBookingModal
        isOpen={isEditBookingOpen}
        onClose={() => setIsEditBookingOpen(false)}
        customer={dbCustomer}
      />

      <AddActivityModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddActivity}
        onUpdate={handleUpdateActivity}
        customerName={customer.name}
        editingEvent={editingEvent}
      />

      <AlertDialog open={!!deletingEventId} onOpenChange={() => setDeletingEventId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('customer.deleteActivityTitle')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('customer.deleteActivityDesc')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteEvent}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t('common.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CustomerDetail;
