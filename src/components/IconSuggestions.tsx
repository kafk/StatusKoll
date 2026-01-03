import { Users, Coins, Home, Activity, Check, X, Circle, Square, CheckSquare, ListChecks } from 'lucide-react';

// Linje-ikoner i korall-stil
import platformPhoneCheck from '@/assets/icons/platform-phone-check.png';
import platformHandTap from '@/assets/icons/platform-hand-tap.png';
import platformClick from '@/assets/icons/platform-click.png';

const platformIcons = [
  { src: platformPhoneCheck, name: 'Phone Check', desc: 'Mobil + check' },
  { src: platformHandTap, name: 'Hand Tap', desc: 'Hand trycker' },
  { src: platformClick, name: 'Cursor Click', desc: 'Pekare' },
];

const IconSuggestions = () => {
  return (
    <div className="p-5 max-w-[500px] mx-auto pb-20 space-y-8">
      <h2 className="font-display text-2xl font-bold gradient-text">Ikonförslag</h2>
      
      {/* CURRENT STYLE - What we use now */}
      <div className="bg-card border-2 border-primary/30 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          <h3 className="font-display text-lg font-bold gradient-text">Nuvarande stil</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Lucide line icons + korall gradient custom icons
        </p>
        
        {/* Bottom nav icons */}
        <div className="mb-4">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Bottom Nav</span>
          <div className="grid grid-cols-4 gap-3 mt-2">
            {[
              { Icon: Home, label: 'Hem' },
              { Icon: Activity, label: 'Status' },
              { Icon: Users, label: 'Kunder' },
              { Icon: Coins, label: 'Ekonomi' },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1 p-3 rounded-xl bg-background">
                <Icon className="w-6 h-6 text-primary" strokeWidth={2} />
                <span className="text-[9px] text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Custom coral icons */}
        <div>
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Custom Icons</span>
          <div className="grid grid-cols-3 gap-3 mt-2">
            {platformIcons.map(({ src, name, desc }) => (
              <div key={name} className="flex flex-col items-center gap-1 p-3 rounded-xl bg-background">
                <img src={src} alt={name} className="w-8 h-8 object-contain" />
                <span className="text-[9px] text-muted-foreground">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OPTION 1: Outlined Polling Style */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-display text-lg font-bold mb-2">Alternativ 1: Outlined Polling</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Tunna linjer, cirklar med check/x — från Vecteezy polling
        </p>
        
        <div className="grid grid-cols-4 gap-3">
          {/* Simulated polling style icons */}
          <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-background">
            <div className="w-8 h-8 rounded-full border-2 border-foreground flex items-center justify-center">
              <Check className="w-5 h-5 text-foreground" strokeWidth={2.5} />
            </div>
            <span className="text-[9px] text-muted-foreground">Check</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-background">
            <div className="w-8 h-8 rounded-full border-2 border-foreground flex items-center justify-center">
              <X className="w-5 h-5 text-foreground" strokeWidth={2.5} />
            </div>
            <span className="text-[9px] text-muted-foreground">Avbryt</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-background">
            <Circle className="w-8 h-8 text-foreground" strokeWidth={2} />
            <span className="text-[9px] text-muted-foreground">Tom</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-background">
            <div className="flex flex-col gap-0.5">
              <div className="w-8 h-1.5 bg-foreground rounded-full" />
              <div className="w-6 h-1.5 bg-foreground/60 rounded-full" />
              <div className="w-7 h-1.5 bg-foreground/40 rounded-full" />
            </div>
            <span className="text-[9px] text-muted-foreground">Progress</span>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <span className="text-[10px] text-warning font-bold">⚠️ Konflikt:</span>
          <span className="text-[10px] text-muted-foreground ml-1">
            Svartvit stil matchar inte korall-gradient temat
          </span>
        </div>
      </div>

      {/* OPTION 2: Bold Minimalist Style */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-display text-lg font-bold mb-2">Alternativ 2: Bold Minimalist</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Fyllda svarta former, vita ikoner — från Vecteezy checklist
        </p>
        
        <div className="grid grid-cols-4 gap-3">
          {/* Simulated bold minimalist style */}
          <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-background">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
              <Check className="w-5 h-5 text-background" strokeWidth={3} />
            </div>
            <span className="text-[9px] text-muted-foreground">Check</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-background">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
              <Home className="w-4 h-4 text-background" strokeWidth={2.5} />
            </div>
            <span className="text-[9px] text-muted-foreground">Hem</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-background">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
              <Users className="w-4 h-4 text-background" strokeWidth={2.5} />
            </div>
            <span className="text-[9px] text-muted-foreground">Kunder</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-background">
            <ListChecks className="w-8 h-8 text-foreground" strokeWidth={2.5} />
            <span className="text-[9px] text-muted-foreground">Lista</span>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <span className="text-[10px] text-destructive font-bold">❌ Problem:</span>
          <span className="text-[10px] text-muted-foreground ml-1">
            Helt annan estetik, kräver total redesign
          </span>
        </div>
      </div>

      {/* Recommendation */}
      <div className="bg-gradient-to-br from-primary/10 to-warning/10 border border-primary/20 rounded-xl p-5">
        <h3 className="font-display text-lg font-bold gradient-text mb-3">Rekommendation</h3>
        <p className="text-sm text-foreground">
          Behåll <strong>nuvarande stil</strong> — Lucide line icons + korall gradient passar bäst ihop och är redan konsekvent genom hela appen.
        </p>
        <div className="mt-4 flex gap-2">
          <span className="px-3 py-1 bg-success/20 text-success text-xs font-bold rounded-full">✓ Konsekvent</span>
          <span className="px-3 py-1 bg-success/20 text-success text-xs font-bold rounded-full">✓ On-brand</span>
          <span className="px-3 py-1 bg-success/20 text-success text-xs font-bold rounded-full">✓ Läsbart</span>
        </div>
      </div>
    </div>
  );
};

export default IconSuggestions;
