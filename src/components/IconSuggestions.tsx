import { Users, Coins } from 'lucide-react';

// Enkla linje-ikoner
import phoneTapSimple from '@/assets/icons/phone-tap-simple.png';
import phoneTapMinimal from '@/assets/icons/phone-tap-minimal.png';
import phoneTapLine from '@/assets/icons/phone-tap-line.png';
import phoneClickCheck from '@/assets/icons/phone-click-check.png';

// Tidigare genererade
import phoneBooking from '@/assets/icons/phone-booking.png';
import phoneHomeBooking from '@/assets/icons/phone-home-booking.png';

const simpleIcons = [
  { src: phoneTapSimple, name: 'Simple Coral', desc: 'Tunn linje, coral' },
  { src: phoneTapMinimal, name: 'Minimal Gray', desc: 'Grå, tap + check' },
  { src: phoneTapLine, name: 'Line Art', desc: 'Svart linje' },
  { src: phoneClickCheck, name: 'Click Hand', desc: 'Enkel hand' },
  { src: phoneBooking, name: 'Phone Check', desc: 'Teal bekräftad' },
  { src: phoneHomeBooking, name: 'Phone Home', desc: 'Boende + check' },
];

const IconSuggestions = () => {
  return (
    <div className="p-5 max-w-[500px] mx-auto pb-20">
      <h2 className="font-display text-2xl font-bold gradient-text mb-6">Enkla Linje-ikoner</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Minimalistiska ikoner med mobil + hand + check
      </p>
      
      {/* Simple line icons */}
      <div className="mb-8">
        <h3 className="font-display text-lg font-bold mb-4">Plattform-ikoner</h3>
        <div className="grid grid-cols-3 gap-4">
          {simpleIcons.map(({ src, name, desc }, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-4 flex flex-col items-center gap-2 hover:border-primary transition-all hover:-translate-y-1"
            >
              <img src={src} alt={name} className="w-14 h-14 object-contain" />
              <span className="text-[10px] font-bold text-center leading-tight">{name}</span>
              <span className="text-[9px] text-muted-foreground text-center">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rekommenderad */}
      <div className="mt-8 p-5 bg-card border-2 border-primary/30 rounded-xl">
        <h3 className="font-display text-lg font-bold mb-4 gradient-text">Rekommenderad</h3>
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
            <img src={phoneTapMinimal} alt="Minimal" className="w-10 h-10 object-contain" />
            <span className="text-xs font-bold">Minimal</span>
            <span className="text-[10px] text-muted-foreground">Plattform</span>
          </div>
        </div>
      </div>

      {/* Alternativ: Coral */}
      <div className="mt-4 p-5 bg-card border border-border rounded-xl">
        <h3 className="font-display text-lg font-bold mb-4">Alternativ: Coral</h3>
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
            <img src={phoneTapSimple} alt="Simple" className="w-10 h-10 object-contain" />
            <span className="text-xs font-bold">Simple Coral</span>
          </div>
        </div>
      </div>

      {/* Alternativ: Svart */}
      <div className="mt-4 p-5 bg-card border border-border rounded-xl">
        <h3 className="font-display text-lg font-bold mb-4">Alternativ: Svart linje</h3>
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
            <img src={phoneTapLine} alt="Line" className="w-10 h-10 object-contain" />
            <span className="text-xs font-bold">Line Art</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconSuggestions;
