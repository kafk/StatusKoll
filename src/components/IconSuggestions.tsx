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
  // Plattforms-ikoner - klick/check/bokning
  SmartphoneNfc,
  TabletSmartphone,
  CheckCircle,
  CheckCircle2,
  CheckSquare,
  CheckSquare2,
  CircleCheck,
  ClipboardCheck,
  ClipboardList,
  ListChecks,
  ListTodo,
  CalendarCheck,
  CalendarCheck2,
  FileCheck,
  FileCheck2,
  BadgeCheck,
  ShieldCheck,
  SquareCheckBig,
  CircleDot,
  MousePointerClick,
  Hand
} from 'lucide-react';

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
    { Icon: SmartphoneNfc, name: 'SmartphoneNfc', desc: 'Mobil + tap' },
    { Icon: TabletSmartphone, name: 'TabletSmartphone', desc: 'Enheter' },
    { Icon: CheckCircle, name: 'CheckCircle', desc: 'Check cirkel' },
    { Icon: CheckCircle2, name: 'CheckCircle2', desc: 'Alt check' },
    { Icon: CheckSquare, name: 'CheckSquare', desc: 'Check ruta' },
    { Icon: CheckSquare2, name: 'CheckSquare2', desc: 'Alt ruta' },
    { Icon: CircleCheck, name: 'CircleCheck', desc: 'Cirkel check' },
    { Icon: ClipboardCheck, name: 'ClipboardCheck', desc: 'Urklipp ✓' },
    { Icon: ClipboardList, name: 'ClipboardList', desc: 'Urklipp lista' },
    { Icon: ListChecks, name: 'ListChecks', desc: 'Lista checks' },
    { Icon: ListTodo, name: 'ListTodo', desc: 'Todo-lista' },
    { Icon: CalendarCheck, name: 'CalendarCheck', desc: 'Kalender ✓' },
    { Icon: CalendarCheck2, name: 'CalendarCheck2', desc: 'Alt kalender' },
    { Icon: FileCheck, name: 'FileCheck', desc: 'Fil check' },
    { Icon: FileCheck2, name: 'FileCheck2', desc: 'Alt fil' },
    { Icon: BadgeCheck, name: 'BadgeCheck', desc: 'Badge ✓' },
    { Icon: ShieldCheck, name: 'ShieldCheck', desc: 'Sköld ✓' },
    { Icon: SquareCheckBig, name: 'SquareCheckBig', desc: 'Stor check' },
    { Icon: MousePointerClick, name: 'MousePointerClick', desc: 'Klick' },
    { Icon: Hand, name: 'Hand', desc: 'Hand/tap' },
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
      <div className="grid grid-cols-4 gap-3">
        {icons.map(({ Icon, name, desc }) => (
          <div
            key={name}
            className="bg-card border border-border rounded-xl p-3 flex flex-col items-center gap-1.5 hover:border-primary transition-all"
          >
            <Icon className={`w-7 h-7 ${accentColor}`} strokeWidth={1.5} />
            <span className="text-[10px] font-bold text-center leading-tight">{name}</span>
            <span className="text-[9px] text-muted-foreground text-center">{desc}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-5 max-w-[500px] mx-auto pb-20">
      <h2 className="font-display text-2xl font-bold gradient-text mb-6">Ikonförslag</h2>
      
      <IconSection title="Gäster" icons={guestIcons} accentColor="text-primary" />
      <IconSection title="Pris" icons={priceIcons} accentColor="text-warning" />
      <IconSection title="Plattform (20 st)" icons={platformIcons} accentColor="text-secondary" />

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
            <ClipboardCheck className="w-10 h-10 text-secondary" strokeWidth={1.5} />
            <span className="text-xs font-bold">ClipboardCheck</span>
            <span className="text-[10px] text-muted-foreground">Plattform</span>
          </div>
        </div>
      </div>

      {/* Alternativ */}
      <div className="mt-4 p-5 bg-card border border-border rounded-xl">
        <h3 className="font-display text-lg font-bold mb-4">Alternativ: Kalender-stil</h3>
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
            <CalendarCheck className="w-10 h-10 text-foreground/70" strokeWidth={1.5} />
            <span className="text-xs font-bold">CalendarCheck</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconSuggestions;
