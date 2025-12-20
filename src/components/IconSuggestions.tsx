import { Users, Coins } from 'lucide-react';

// Anpassade genererade ikoner
import phoneTapCheck from '@/assets/icons/phone-tap-check.png';
import phoneBooking from '@/assets/icons/phone-booking.png';
import handCalendarCheck from '@/assets/icons/hand-calendar-check.png';
import phoneHomeBooking from '@/assets/icons/phone-home-booking.png';
import clipboardTap from '@/assets/icons/clipboard-tap.png';
import mobileConfirmed from '@/assets/icons/mobile-confirmed.png';

const customIcons = [
  { src: phoneTapCheck, name: 'Phone Tap Check', desc: 'Mobil + hand + check' },
  { src: phoneBooking, name: 'Phone Booking', desc: 'Mobil bekräftad' },
  { src: handCalendarCheck, name: 'Hand Calendar', desc: 'Hand + kalender' },
  { src: phoneHomeBooking, name: 'Phone Home', desc: 'Boende + check' },
  { src: clipboardTap, name: 'Clipboard Tap', desc: 'Lista + hand' },
  { src: mobileConfirmed, name: 'Mobile Confirmed', desc: 'Hand håller mobil' },
];

const IconSuggestions = () => {
  return (
    <div className="p-5 max-w-[500px] mx-auto pb-20">
      <h2 className="font-display text-2xl font-bold gradient-text mb-6">Anpassade Ikoner</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Genererade i din apps färgschema (coral/teal) med mobil + hand + check tema
      </p>
      
      {/* Custom generated icons */}
      <div className="mb-8">
        <h3 className="font-display text-lg font-bold mb-4">Plattform-ikoner (6 st)</h3>
        <div className="grid grid-cols-3 gap-4">
          {customIcons.map(({ src, name, desc }, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-4 flex flex-col items-center gap-2 hover:border-primary transition-all hover:-translate-y-1"
            >
              <img src={src} alt={name} className="w-16 h-16 object-contain" />
              <span className="text-[10px] font-bold text-center leading-tight">{name}</span>
              <span className="text-[9px] text-muted-foreground text-center">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rekommenderad kombination */}
      <div className="mt-8 p-5 bg-card border-2 border-primary/30 rounded-xl">
        <h3 className="font-display text-lg font-bold mb-4 gradient-text">Rekommenderad kombination</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <Users className="w-10 h-10 text-primary" strokeWidth={1.5} />
            <span className="text-xs font-bold">Users</span>
            <span className="text-[10px] text-muted-foreground">Gäster</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Coins className="w-10 h-10 text-warning" strokeWidth={1.5} />
            <span className="text-xs font-bold">Coins</span>
            <span className="text-[10px] text-muted-foreground">Pris</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <img src={phoneTapCheck} alt="Phone Tap" className="w-10 h-10 object-contain" />
            <span className="text-xs font-bold">Phone Tap</span>
            <span className="text-[10px] text-muted-foreground">Plattform</span>
          </div>
        </div>
      </div>

      {/* Alternativ 1 */}
      <div className="mt-4 p-5 bg-card border border-border rounded-xl">
        <h3 className="font-display text-lg font-bold mb-4">Alternativ: Teal tema</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <Users className="w-10 h-10 text-foreground/70" strokeWidth={1.5} />
            <span className="text-xs font-bold">Users</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Coins className="w-10 h-10 text-foreground/70" strokeWidth={1.5} />
            <span className="text-xs font-bold">Coins</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <img src={phoneHomeBooking} alt="Phone Home" className="w-10 h-10 object-contain" />
            <span className="text-xs font-bold">Phone Home</span>
          </div>
        </div>
      </div>

      {/* Alternativ 2 */}
      <div className="mt-4 p-5 bg-card border border-border rounded-xl">
        <h3 className="font-display text-lg font-bold mb-4">Alternativ: Kalender</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <Users className="w-10 h-10 text-foreground/70" strokeWidth={1.5} />
            <span className="text-xs font-bold">Users</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Coins className="w-10 h-10 text-foreground/70" strokeWidth={1.5} />
            <span className="text-xs font-bold">Coins</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <img src={handCalendarCheck} alt="Calendar" className="w-10 h-10 object-contain" />
            <span className="text-xs font-bold">Hand Calendar</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconSuggestions;
