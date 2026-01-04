import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'sv' | 'en' | 'de' | 'hr';

interface Translations {
  [key: string]: string;
}

const translations: Record<Language, Translations> = {
  sv: {
    // Navigation
    'nav.home': 'Hem',
    'nav.status': 'Status',
    'nav.customers': 'Kunder',
    'nav.economy': 'Ekonomi',
    'nav.statistics': 'Statistik',
    'nav.settings': 'Inställningar',
    
    // Settings
    'settings.title': 'Inställningar',
    'settings.team': 'Team',
    'settings.language': 'Språk',
    'settings.languageDescription': 'Välj språk för appen',
    
    // Team
    'team.title': 'Team',
    'team.description': 'Bjud in delägare, partners och städare',
    'team.addMember': 'Lägg till teammedlem',
    'team.email': 'E-post',
    'team.name': 'Namn (valfritt)',
    'team.role': 'Roll',
    'team.add': 'Lägg till',
    'team.adding': 'Lägger till...',
    'team.members': 'Teammedlemmar',
    'team.noMembers': 'Inga teammedlemmar än',
    'team.inviteFirst': 'Bjud in din första teammedlem ovan',
    'team.remove': 'Ta bort teammedlem?',
    'team.removeConfirm': 'kommer inte längre ha åtkomst till dina bokningar.',
    'team.cancel': 'Avbryt',
    'team.delete': 'Ta bort',
    
    // Roles
    'role.owner': 'Ägare',
    'role.co_owner': 'Delägare',
    'role.partner': 'Partner',
    'role.cleaner': 'Städare',
    'role.co_owner.desc': 'Full åtkomst',
    'role.partner.desc': 'Ser bokningar',
    'role.cleaner.desc': 'Ser bokningar',
    
    // Languages
    'lang.sv': 'Svenska',
    'lang.en': 'English',
    'lang.de': 'Deutsch',
    'lang.hr': 'Hrvatski',
    
    // Common
    'common.loading': 'Laddar...',
    'common.save': 'Spara',
    'common.cancel': 'Avbryt',
    'common.delete': 'Ta bort',
    'common.edit': 'Redigera',
    'common.add': 'Lägg till',
    'common.search': 'Sök',
    'common.all': 'Alla',
    'common.booking': 'Bokning',
    'common.cleaning': 'Städning',
    'common.payment': 'Betalning',
    'common.period': 'Period',
    'common.source': 'Källa',
    'common.amount': 'Belopp',
    'common.afterGuest': 'Efter gäst',
    'common.performedBy': 'Utförd av',
    'common.transaction': 'Transaktion',
    'common.note': 'Anteckning',
    
    // Notifications
    'notif.title': 'Notiser',
    'notif.markAllRead': 'Markera alla som lästa',
    'notif.empty': 'Inga notiser',
    'notif.newBooking': 'Ny bokning',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.status': 'Status',
    'nav.customers': 'Customers',
    'nav.economy': 'Economy',
    'nav.statistics': 'Statistics',
    'nav.settings': 'Settings',
    
    // Settings
    'settings.title': 'Settings',
    'settings.team': 'Team',
    'settings.language': 'Language',
    'settings.languageDescription': 'Choose app language',
    
    // Team
    'team.title': 'Team',
    'team.description': 'Invite co-owners, partners and cleaners',
    'team.addMember': 'Add team member',
    'team.email': 'Email',
    'team.name': 'Name (optional)',
    'team.role': 'Role',
    'team.add': 'Add',
    'team.adding': 'Adding...',
    'team.members': 'Team members',
    'team.noMembers': 'No team members yet',
    'team.inviteFirst': 'Invite your first team member above',
    'team.remove': 'Remove team member?',
    'team.removeConfirm': 'will no longer have access to your bookings.',
    'team.cancel': 'Cancel',
    'team.delete': 'Remove',
    
    // Roles
    'role.owner': 'Owner',
    'role.co_owner': 'Co-owner',
    'role.partner': 'Partner',
    'role.cleaner': 'Cleaner',
    'role.co_owner.desc': 'Full access',
    'role.partner.desc': 'Sees bookings',
    'role.cleaner.desc': 'Sees bookings',
    
    // Languages
    'lang.sv': 'Svenska',
    'lang.en': 'English',
    'lang.de': 'Deutsch',
    'lang.hr': 'Hrvatski',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
    'common.search': 'Search',
    'common.all': 'All',
    'common.booking': 'Booking',
    'common.cleaning': 'Cleaning',
    'common.payment': 'Payment',
    'common.period': 'Period',
    'common.source': 'Source',
    'common.amount': 'Amount',
    'common.afterGuest': 'After guest',
    'common.performedBy': 'Performed by',
    'common.transaction': 'Transaction',
    'common.note': 'Note',
    
    // Notifications
    'notif.title': 'Notifications',
    'notif.markAllRead': 'Mark all as read',
    'notif.empty': 'No notifications',
    'notif.newBooking': 'New booking',
  },
  de: {
    // Navigation
    'nav.home': 'Start',
    'nav.status': 'Status',
    'nav.customers': 'Kunden',
    'nav.economy': 'Finanzen',
    'nav.statistics': 'Statistik',
    'nav.settings': 'Einstellungen',
    
    // Settings
    'settings.title': 'Einstellungen',
    'settings.team': 'Team',
    'settings.language': 'Sprache',
    'settings.languageDescription': 'App-Sprache wählen',
    
    // Team
    'team.title': 'Team',
    'team.description': 'Miteigentümer, Partner und Reinigungskräfte einladen',
    'team.addMember': 'Teammitglied hinzufügen',
    'team.email': 'E-Mail',
    'team.name': 'Name (optional)',
    'team.role': 'Rolle',
    'team.add': 'Hinzufügen',
    'team.adding': 'Wird hinzugefügt...',
    'team.members': 'Teammitglieder',
    'team.noMembers': 'Noch keine Teammitglieder',
    'team.inviteFirst': 'Laden Sie Ihr erstes Teammitglied ein',
    'team.remove': 'Teammitglied entfernen?',
    'team.removeConfirm': 'hat keinen Zugriff mehr auf Ihre Buchungen.',
    'team.cancel': 'Abbrechen',
    'team.delete': 'Entfernen',
    
    // Roles
    'role.owner': 'Eigentümer',
    'role.co_owner': 'Miteigentümer',
    'role.partner': 'Partner',
    'role.cleaner': 'Reinigungskraft',
    'role.co_owner.desc': 'Voller Zugriff',
    'role.partner.desc': 'Sieht Buchungen',
    'role.cleaner.desc': 'Sieht Buchungen',
    
    // Languages
    'lang.sv': 'Svenska',
    'lang.en': 'English',
    'lang.de': 'Deutsch',
    'lang.hr': 'Hrvatski',
    
    // Common
    'common.loading': 'Laden...',
    'common.save': 'Speichern',
    'common.cancel': 'Abbrechen',
    'common.delete': 'Löschen',
    'common.edit': 'Bearbeiten',
    'common.add': 'Hinzufügen',
    'common.search': 'Suchen',
    'common.all': 'Alle',
    'common.booking': 'Buchung',
    'common.cleaning': 'Reinigung',
    'common.payment': 'Zahlung',
    'common.period': 'Zeitraum',
    'common.source': 'Quelle',
    'common.amount': 'Betrag',
    'common.afterGuest': 'Nach Gast',
    'common.performedBy': 'Durchgeführt von',
    'common.transaction': 'Transaktion',
    'common.note': 'Notiz',
    
    // Notifications
    'notif.title': 'Benachrichtigungen',
    'notif.markAllRead': 'Alle als gelesen markieren',
    'notif.empty': 'Keine Benachrichtigungen',
    'notif.newBooking': 'Neue Buchung',
  },
  hr: {
    // Navigation
    'nav.home': 'Početna',
    'nav.status': 'Status',
    'nav.customers': 'Klijenti',
    'nav.economy': 'Financije',
    'nav.statistics': 'Statistika',
    'nav.settings': 'Postavke',
    
    // Settings
    'settings.title': 'Postavke',
    'settings.team': 'Tim',
    'settings.language': 'Jezik',
    'settings.languageDescription': 'Odaberite jezik aplikacije',
    
    // Team
    'team.title': 'Tim',
    'team.description': 'Pozovite suvlasnike, partnere i čistače',
    'team.addMember': 'Dodaj člana tima',
    'team.email': 'E-mail',
    'team.name': 'Ime (neobavezno)',
    'team.role': 'Uloga',
    'team.add': 'Dodaj',
    'team.adding': 'Dodavanje...',
    'team.members': 'Članovi tima',
    'team.noMembers': 'Još nema članova tima',
    'team.inviteFirst': 'Pozovite svog prvog člana tima',
    'team.remove': 'Ukloniti člana tima?',
    'team.removeConfirm': 'više neće imati pristup vašim rezervacijama.',
    'team.cancel': 'Odustani',
    'team.delete': 'Ukloni',
    
    // Roles
    'role.owner': 'Vlasnik',
    'role.co_owner': 'Suvlasnik',
    'role.partner': 'Partner',
    'role.cleaner': 'Čistač',
    'role.co_owner.desc': 'Puni pristup',
    'role.partner.desc': 'Vidi rezervacije',
    'role.cleaner.desc': 'Vidi rezervacije',
    
    // Languages
    'lang.sv': 'Svenska',
    'lang.en': 'English',
    'lang.de': 'Deutsch',
    'lang.hr': 'Hrvatski',
    
    // Common
    'common.loading': 'Učitavanje...',
    'common.save': 'Spremi',
    'common.cancel': 'Odustani',
    'common.delete': 'Obriši',
    'common.edit': 'Uredi',
    'common.add': 'Dodaj',
    'common.search': 'Pretraži',
    'common.all': 'Sve',
    'common.booking': 'Rezervacija',
    'common.cleaning': 'Čišćenje',
    'common.payment': 'Plaćanje',
    'common.period': 'Razdoblje',
    'common.source': 'Izvor',
    'common.amount': 'Iznos',
    'common.afterGuest': 'Nakon gosta',
    'common.performedBy': 'Izvršio',
    'common.transaction': 'Transakcija',
    'common.note': 'Bilješka',
    
    // Notifications
    'notif.title': 'Obavijesti',
    'notif.markAllRead': 'Označi sve kao pročitano',
    'notif.empty': 'Nema obavijesti',
    'notif.newBooking': 'Nova rezervacija',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('app-language');
    return (saved as Language) || 'sv';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
