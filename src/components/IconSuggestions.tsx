import { Users, Coins } from 'lucide-react';

// Minimalistiska plattform-ikoner
import platformV1 from '@/assets/icons/platform-v1.png';
import platformV2 from '@/assets/icons/platform-v2.png';
import platformV3 from '@/assets/icons/platform-v3.png';
import platformV4 from '@/assets/icons/platform-v4.png';

const platformIcons = [
  { src: platformV1, name: 'Monitor', desc: 'Skärm + hus' },
  { src: platformV2, name: 'House Check', desc: 'Hus + check' },
  { src: platformV3, name: 'Browser', desc: 'Webbläsare + klick' },
  { src: platformV4, name: 'Laptop', desc: 'Laptop + hus' },
];

const IconSuggestions = () => {
  return (
    <div className="p-5 max-w-[500px] mx-auto pb-20">
      <h2 className="font-display text-2xl font-bold gradient-text mb-6">Plattform-ikoner</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Tunna linje-ikoner i korall-stil
      </p>
      
      {/* Platform icons */}
      <div className="mb-8">
        <h3 className="font-display text-lg font-bold mb-4">Nya ikoner</h3>
        <div className="grid grid-cols-2 gap-4">
          {platformIcons.map(({ src, name, desc }, index) => (
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
            <img src={platformV1} alt="Monitor" className="w-10 h-10 object-contain" />
            <span className="text-xs font-bold">Monitor</span>
            <span className="text-[10px] text-muted-foreground">Plattform</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconSuggestions;
