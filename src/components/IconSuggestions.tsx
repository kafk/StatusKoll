import { 
  Users, 
  UserRound, 
  UsersRound, 
  UserCircle,
  PersonStanding,
  Contact,
  Euro,
  Wallet,
  CreditCard,
  Banknote,
  CircleDollarSign,
  PiggyBank,
  Coins,
  Globe,
  Globe2,
  Link,
  ExternalLink,
  Share2,
  Building2,
  Store
} from 'lucide-react';

/**
 * Ikonförslag för kundkort
 * 
 * GÄSTER (ersätter 🧑‍🤝‍🧑):
 * - Users: Klassisk grupp-ikon, tydlig
 * - UsersRound: Mjukare rundad stil
 * - UserRound: Enkel person
 * - UserCircle: Person i cirkel
 * - PersonStanding: Helfigur
 * - Contact: Kontaktkort-stil
 * 
 * PRIS (ersätter 💰):
 * - Euro: Direkt Euro-symbol
 * - Wallet: Plånbok
 * - CreditCard: Kreditkort
 * - Banknote: Sedel
 * - CircleDollarSign: Dollar i cirkel
 * - PiggyBank: Spargris
 * - Coins: Mynt
 * 
 * PLATTFORM (ersätter 🌐):
 * - Globe: Klassisk jordglob
 * - Globe2: Alternativ glob
 * - Link: Länk-kedja
 * - ExternalLink: Extern länk
 * - Share2: Delning
 * - Building2: Företag/plattform
 * - Store: Butik/marknadsplats
 */

const IconSuggestions = () => {
  const guestIcons = [
    { Icon: Users, name: 'Users', desc: 'Klassisk grupp' },
    { Icon: UsersRound, name: 'UsersRound', desc: 'Mjuk stil' },
    { Icon: UserRound, name: 'UserRound', desc: 'Enkel person' },
    { Icon: UserCircle, name: 'UserCircle', desc: 'I cirkel' },
    { Icon: PersonStanding, name: 'PersonStanding', desc: 'Helfigur' },
    { Icon: Contact, name: 'Contact', desc: 'Kontaktkort' },
  ];

  const priceIcons = [
    { Icon: Euro, name: 'Euro', desc: 'Euro-symbol' },
    { Icon: Wallet, name: 'Wallet', desc: 'Plånbok' },
    { Icon: CreditCard, name: 'CreditCard', desc: 'Kreditkort' },
    { Icon: Banknote, name: 'Banknote', desc: 'Sedel' },
    { Icon: CircleDollarSign, name: 'CircleDollarSign', desc: 'I cirkel' },
    { Icon: PiggyBank, name: 'PiggyBank', desc: 'Spargris' },
    { Icon: Coins, name: 'Coins', desc: 'Mynt' },
  ];

  const platformIcons = [
    { Icon: Globe, name: 'Globe', desc: 'Jordglob' },
    { Icon: Globe2, name: 'Globe2', desc: 'Alt glob' },
    { Icon: Link, name: 'Link', desc: 'Länk-kedja' },
    { Icon: ExternalLink, name: 'ExternalLink', desc: 'Extern länk' },
    { Icon: Share2, name: 'Share2', desc: 'Delning' },
    { Icon: Building2, name: 'Building2', desc: 'Företag' },
    { Icon: Store, name: 'Store', desc: 'Marknadsplats' },
  ];

  const IconSection = ({ 
    title, 
    icons, 
    accentColor 
  }: { 
    title: string; 
    icons: typeof guestIcons; 
    accentColor: string;
  }) => (
    <div className="mb-8">
      <h3 className="font-display text-lg font-bold mb-4">{title}</h3>
      <div className="grid grid-cols-3 gap-3">
        {icons.map(({ Icon, name, desc }) => (
          <div
            key={name}
            className="bg-card border border-border rounded-xl p-4 flex flex-col items-center gap-2 hover:border-primary transition-all"
          >
            <Icon className={`w-8 h-8 ${accentColor}`} strokeWidth={1.5} />
            <span className="text-xs font-bold">{name}</span>
            <span className="text-[10px] text-muted-foreground">{desc}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-5 max-w-[428px] mx-auto">
      <h2 className="font-display text-2xl font-bold gradient-text mb-6">Ikonförslag</h2>
      
      <IconSection title="Gäster" icons={guestIcons} accentColor="text-primary" />
      <IconSection title="Pris" icons={priceIcons} accentColor="text-warning" />
      <IconSection title="Plattform" icons={platformIcons} accentColor="text-secondary" />

      {/* Rekommenderad kombination */}
      <div className="mt-8 p-5 bg-card border-2 border-primary/30 rounded-xl">
        <h3 className="font-display text-lg font-bold mb-4 gradient-text">Rekommenderad kombination</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <UsersRound className="w-10 h-10 text-primary" strokeWidth={1.5} />
            <span className="text-xs font-bold">UsersRound</span>
            <span className="text-[10px] text-muted-foreground">Gäster</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Euro className="w-10 h-10 text-warning" strokeWidth={1.5} />
            <span className="text-xs font-bold">Euro</span>
            <span className="text-[10px] text-muted-foreground">Pris</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Globe className="w-10 h-10 text-secondary" strokeWidth={1.5} />
            <span className="text-xs font-bold">Globe</span>
            <span className="text-[10px] text-muted-foreground">Plattform</span>
          </div>
        </div>
      </div>

      {/* Alternativ: Minimal stil */}
      <div className="mt-4 p-5 bg-card border border-border rounded-xl">
        <h3 className="font-display text-lg font-bold mb-4">Alternativ: Minimal</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <Users className="w-10 h-10 text-foreground/70" strokeWidth={1.5} />
            <span className="text-xs font-bold">Users</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Wallet className="w-10 h-10 text-foreground/70" strokeWidth={1.5} />
            <span className="text-xs font-bold">Wallet</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Link className="w-10 h-10 text-foreground/70" strokeWidth={1.5} />
            <span className="text-xs font-bold">Link</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconSuggestions;
