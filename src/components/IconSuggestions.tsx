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
  // Mobil + interaktion ikoner
  SmartphoneNfc,
  SmartphoneCharging,
  Smartphone,
  TabletSmartphone,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneForwarded,
  Fingerprint,
  ScanLine,
  QrCode,
  NfcIcon,
  Bluetooth,
  Wifi,
  Signal,
  MonitorSmartphone,
  Vibrate,
  BellRing,
  MessageSquare,
  Send
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

  // Mobil med interaktion - telefon + tap/aktivitet
  const platformIcons = [
    { Icon: SmartphoneNfc, name: 'SmartphoneNfc', desc: 'Mobil tap' },
    { Icon: SmartphoneCharging, name: 'SmartphoneCharging', desc: 'Mobil aktiv' },
    { Icon: Smartphone, name: 'Smartphone', desc: 'Mobil' },
    { Icon: TabletSmartphone, name: 'TabletSmartphone', desc: 'Mobil+platta' },
    { Icon: MonitorSmartphone, name: 'MonitorSmartphone', desc: 'Synk' },
    { Icon: PhoneCall, name: 'PhoneCall', desc: 'Samtal' },
    { Icon: PhoneIncoming, name: 'PhoneIncoming', desc: 'Inkommande' },
    { Icon: PhoneOutgoing, name: 'PhoneOutgoing', desc: 'Utgående' },
    { Icon: PhoneForwarded, name: 'PhoneForwarded', desc: 'Vidarekopplad' },
    { Icon: Fingerprint, name: 'Fingerprint', desc: 'Touch ID' },
    { Icon: ScanLine, name: 'ScanLine', desc: 'Skanna' },
    { Icon: QrCode, name: 'QrCode', desc: 'QR-kod' },
    { Icon: NfcIcon, name: 'NfcIcon', desc: 'NFC tap' },
    { Icon: Bluetooth, name: 'Bluetooth', desc: 'Trådlös' },
    { Icon: Wifi, name: 'Wifi', desc: 'Online' },
    { Icon: Signal, name: 'Signal', desc: 'Signal' },
    { Icon: Vibrate, name: 'Vibrate', desc: 'Vibration' },
    { Icon: BellRing, name: 'BellRing', desc: 'Notis' },
    { Icon: MessageSquare, name: 'MessageSquare', desc: 'Meddelande' },
    { Icon: Send, name: 'Send', desc: 'Skicka' },
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
      <IconSection title="Plattform - Mobil + Interaktion (20 st)" icons={platformIcons} accentColor="text-secondary" />

      {/* Rekommenderad kombination */}
      <div className="mt-8 p-5 bg-card border-2 border-primary/30 rounded-xl">
        <h3 className="font-display text-lg font-bold mb-4 gradient-text">Rekommenderad: Mobil + tap</h3>
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
            <SmartphoneNfc className="w-10 h-10 text-secondary" strokeWidth={1.5} />
            <span className="text-xs font-bold">SmartphoneNfc</span>
            <span className="text-[10px] text-muted-foreground">Plattform</span>
          </div>
        </div>
      </div>

      {/* Alternativ */}
      <div className="mt-4 p-5 bg-card border border-border rounded-xl">
        <h3 className="font-display text-lg font-bold mb-4">Alternativ: Touch/Fingerprint</h3>
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
            <Fingerprint className="w-10 h-10 text-foreground/70" strokeWidth={1.5} />
            <span className="text-xs font-bold">Fingerprint</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconSuggestions;
