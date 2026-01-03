import { Check, X, Home, Calendar } from 'lucide-react';

// Current app icon
import currentAppIcon from '@/assets/app-icon.png';

// Custom icons for reference
import platformPhoneCheck from '@/assets/icons/platform-phone-check.png';

// Generated app icon versions
import appIconV1 from "@/assets/icons/app-icon-v1.png";
import appIconV2 from "@/assets/icons/app-icon-v2.png";
import appIconV3 from "@/assets/icons/app-icon-v3.png";
import appIconV4 from "@/assets/icons/app-icon-v4.png";
import appIconV5 from "@/assets/icons/app-icon-v5.png";

// Polling style versions
import pollingV1 from "@/assets/icons/polling-v1.png";
import pollingV2 from "@/assets/icons/polling-v2.png";
import pollingV3 from "@/assets/icons/polling-v3.png";
import pollingV4 from "@/assets/icons/polling-v4.png";
import pollingV5 from "@/assets/icons/polling-v5.png";

// Expense app inspired versions
import expenseV1 from "@/assets/icons/expense-v1.png";
import expenseV2 from "@/assets/icons/expense-v2.png";
import expenseV3 from "@/assets/icons/expense-v3.png";
import expenseV4 from "@/assets/icons/expense-v4.png";
import expenseV5 from "@/assets/icons/expense-v5.png";

// Dark + Coral versions
import darkCoralV1 from "@/assets/icons/dark-coral-v1.png";
import darkCoralV2 from "@/assets/icons/dark-coral-v2.png";
import darkCoralV3 from "@/assets/icons/dark-coral-v3.png";
import darkCoralV4 from "@/assets/icons/dark-coral-v4.png";
import darkCoralV5 from "@/assets/icons/dark-coral-v5.png";

const appIconVersions = [
  { src: appIconV1, label: "V1: Hus + Kalender", desc: "Hus med kalender-checkmark overlay" },
  { src: appIconV2, label: "V2: Kalender + Hus", desc: "Kalender fokus med hus-detalj" },
  { src: appIconV3, label: "V3: Mobil Bekräftelse", desc: "Telefon med checkmark-cirkel" },
  { src: appIconV4, label: "V4: Kalender + Nyckel", desc: "Uthyrning tema med nyckel" },
  { src: appIconV5, label: "V5: Hand Tap", desc: "Bekräftelse-gest i cirkel" },
];

const pollingVersions = [
  { src: pollingV1, label: "Polling V1", desc: "Tre checkmarks i cirkel" },
  { src: pollingV2, label: "Polling V2", desc: "Staplad korall med checks" },
  { src: pollingV3, label: "Polling V3", desc: "Checklista med rutor" },
  { src: pollingV4, label: "Polling V4", desc: "Cirkulär check-arrangement" },
  { src: pollingV5, label: "Polling V5", desc: "Gradient med checkboxar" },
];

const expenseVersions = [
  { src: expenseV1, label: "Donut Chart", desc: "Korall/teal cirkeldiagram med siffra" },
  { src: expenseV2, label: "Kategori Grid", desc: "4 kategori-knappar i grid" },
  { src: expenseV3, label: "Kort + Check", desc: "Vitt kort med bekräftelse-knapp" },
  { src: expenseV4, label: "Progress Ring", desc: "Hus i cirkulär progress-ring" },
  { src: expenseV5, label: "Staplar", desc: "Färgade horisontella staplar" },
];

const darkCoralVersions = [
  { src: darkCoralV1, label: "Dark V1", desc: "Mörk med korall cirklar" },
  { src: darkCoralV2, label: "Dark V2", desc: "Staplad 3D med korall" },
  { src: darkCoralV3, label: "Dark V3", desc: "4 checkmarks grid" },
  { src: darkCoralV4, label: "Dark V4", desc: "Linje-checkboxar" },
  { src: darkCoralV5, label: "Dark V5", desc: "Tre cirklar horisontellt" },
];

const IconSuggestions = () => {
  return (
    <div className="p-5 max-w-[500px] mx-auto pb-20 space-y-8">
      <div>
        <h2 className="font-display text-2xl font-bold gradient-text">App-ikon förslag</h2>
        <p className="text-sm text-muted-foreground mt-1">För App Store & hemskärm</p>
      </div>
      
      {/* CURRENT APP ICON */}
      <div className="bg-card border-2 border-primary/30 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          <h3 className="font-display text-lg font-bold gradient-text">Nuvarande</h3>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <img 
              src={currentAppIcon} 
              alt="Current app icon" 
              className="w-20 h-20 rounded-2xl shadow-lg"
            />
            <span className="text-xs text-muted-foreground">1024×1024</span>
          </div>
          <div className="flex-1">
            <p className="text-sm text-foreground">
              Din nuvarande app-ikon
            </p>
          </div>
        </div>
      </div>

      {/* GENERATED VERSIONS - 5 coral gradient style */}
      <div className="bg-card border-2 border-success/30 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
          <h3 className="font-display text-lg font-bold text-success">5 Genererade versioner</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-4">Korall gradient-stil (1024×1024)</p>
        
        <div className="grid grid-cols-2 gap-3">
          {appIconVersions.map((icon, index) => (
            <div 
              key={index}
              className="flex flex-col items-center gap-2 p-2 rounded-lg bg-muted/30"
            >
              <img 
                src={icon.src} 
                alt={icon.label} 
                className="w-20 h-20 rounded-2xl shadow-lg"
              />
              <div className="text-center">
                <h4 className="font-display text-xs font-bold">{icon.label}</h4>
                <p className="text-[10px] text-muted-foreground">{icon.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OPTION 1: Outlined Polling Style */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-display text-lg font-bold mb-2">Alternativ 1: Polling Style</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Baserat på Vecteezy polling — cirklar med checkmarks
        </p>
        
        <div className="flex gap-4">
          {/* Light version */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-2xl bg-white border border-border shadow-lg flex items-center justify-center p-3">
              <div className="flex flex-col gap-1.5 w-full">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-800 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-gray-800" strokeWidth={3} />
                  </div>
                  <div className="flex-1 h-2 bg-gray-800 rounded-full" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center">
                    <X className="w-2.5 h-2.5 text-gray-400" strokeWidth={3} />
                  </div>
                  <div className="flex-1 h-2 bg-gray-400 rounded-full" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-800 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-gray-800" strokeWidth={3} />
                  </div>
                  <div className="flex-1 h-2 bg-gray-800 rounded-full" />
                </div>
              </div>
            </div>
            <span className="text-[10px] text-muted-foreground">Ljus</span>
          </div>
          
          {/* Dark version */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-2xl bg-gray-900 shadow-lg flex items-center justify-center p-3">
              <div className="flex flex-col gap-1.5 w-full">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  </div>
                  <div className="flex-1 h-2 bg-white rounded-full" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-500 flex items-center justify-center">
                    <X className="w-2.5 h-2.5 text-gray-500" strokeWidth={3} />
                  </div>
                  <div className="flex-1 h-2 bg-gray-500 rounded-full" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  </div>
                  <div className="flex-1 h-2 bg-white rounded-full" />
                </div>
              </div>
            </div>
            <span className="text-[10px] text-muted-foreground">Mörk</span>
          </div>
        </div>
        
        {/* Generated Polling Versions */}
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="font-display text-sm font-bold text-primary mb-3">5 Genererade Polling-varianter</h4>
          <div className="grid grid-cols-2 gap-3">
            {pollingVersions.map((icon, index) => (
              <div 
                key={index}
                className="flex flex-col items-center gap-2 p-2 rounded-lg bg-muted/30"
              >
                <img 
                  src={icon.src} 
                  alt={icon.label} 
                  className="w-20 h-20 rounded-2xl shadow-lg"
                />
                <div className="text-center">
                  <h4 className="font-display text-xs font-bold">{icon.label}</h4>
                  <p className="text-[10px] text-muted-foreground">{icon.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OPTION 2: Bold Minimalist Checklist */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-display text-lg font-bold mb-2">Alternativ 2: Bold Checklist</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Baserat på Vecteezy minimalist checklist — fylld bakgrund
        </p>
        
        <div className="flex gap-4">
          {/* Black version */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-2xl bg-gray-900 shadow-lg flex items-center justify-center p-3">
              <div className="flex flex-col gap-1.5 w-full">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  <div className="flex-1 h-2 bg-white rounded-sm" />
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  <div className="flex-1 h-2 bg-white rounded-sm" />
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  <div className="flex-1 h-2 bg-white rounded-sm" />
                </div>
              </div>
            </div>
            <span className="text-[10px] text-muted-foreground">Svart</span>
          </div>
          
          {/* Coral gradient version */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-warning shadow-lg flex items-center justify-center p-3">
              <div className="flex flex-col gap-1.5 w-full">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  <div className="flex-1 h-2 bg-white rounded-sm" />
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  <div className="flex-1 h-2 bg-white rounded-sm" />
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  <div className="flex-1 h-2 bg-white rounded-sm" />
                </div>
              </div>
            </div>
            <span className="text-[10px] text-muted-foreground">Korall</span>
          </div>
        </div>
      </div>

      {/* OPTION 3: House/Calendar rental themed */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-display text-lg font-bold mb-2">Alternativ 3: Uthyrning-tema</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Hus + kalender/check — matchar appens syfte
        </p>
        
        <div className="flex gap-4">
          {/* Coral with house */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-warning shadow-lg flex items-center justify-center">
              <Home className="w-10 h-10 text-white" strokeWidth={2} />
            </div>
            <span className="text-[10px] text-muted-foreground">Hus</span>
          </div>
          
          {/* Coral with calendar */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-warning shadow-lg flex items-center justify-center">
              <Calendar className="w-10 h-10 text-white" strokeWidth={2} />
            </div>
            <span className="text-[10px] text-muted-foreground">Kalender</span>
          </div>
          
          {/* House + check combo */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-warning shadow-lg flex items-center justify-center relative">
              <Home className="w-9 h-9 text-white" strokeWidth={2} />
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-success flex items-center justify-center border-2 border-white">
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              </div>
            </div>
            <span className="text-[10px] text-muted-foreground">Hus + Check</span>
          </div>
        </div>
      </div>

      {/* OPTION 4: Custom coral style like existing icons */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-display text-lg font-bold mb-2">Alternativ 4: Korall linje-stil</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Samma stil som dina custom ikoner
        </p>
        
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-2xl bg-white border border-border shadow-lg flex items-center justify-center p-2">
              <img src={platformPhoneCheck} alt="Phone check" className="w-14 h-14 object-contain" />
            </div>
            <span className="text-[10px] text-muted-foreground">Phone Check</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-warning/10 border border-primary/20 shadow-lg flex items-center justify-center p-2">
              <img src={platformPhoneCheck} alt="Phone check" className="w-14 h-14 object-contain" />
            </div>
            <span className="text-[10px] text-muted-foreground">Med bakgrund</span>
          </div>
        </div>
      </div>

      {/* NEW: Expense App Inspired Style */}
      <div className="bg-card border-2 border-warning/30 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-warning animate-pulse" />
          <h3 className="font-display text-lg font-bold text-warning">Expense App Inspirerad</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-4">Baserat på inspirationsbilden med donut-diagram och kategori-chips</p>
        
        <div className="grid grid-cols-2 gap-3">
          {expenseVersions.map((icon, index) => (
            <div 
              key={index}
              className="flex flex-col items-center gap-2 p-2 rounded-lg bg-muted/30"
            >
              <img 
                src={icon.src} 
                alt={icon.label} 
                className="w-20 h-20 rounded-2xl shadow-lg"
              />
              <div className="text-center">
                <h4 className="font-display text-xs font-bold">{icon.label}</h4>
                <p className="text-[10px] text-muted-foreground">{icon.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NEW: Dark + Coral Style */}
      <div className="bg-card border-2 border-gray-700 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-gray-700 animate-pulse" />
          <h3 className="font-display text-lg font-bold">Mörk + Korall</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-4">Mörk bakgrund med korall accenter — inspirerad av Polling Style Mörk</p>
        
        <div className="grid grid-cols-2 gap-3">
          {darkCoralVersions.map((icon, index) => (
            <div 
              key={index}
              className="flex flex-col items-center gap-2 p-2 rounded-lg bg-muted/30"
            >
              <img 
                src={icon.src} 
                alt={icon.label} 
                className="w-20 h-20 rounded-2xl shadow-lg"
              />
              <div className="text-center">
                <h4 className="font-display text-xs font-bold">{icon.label}</h4>
                <p className="text-[10px] text-muted-foreground">{icon.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info about generating */}
      <div className="bg-muted/30 border border-border rounded-xl p-4">
        <p className="text-sm text-muted-foreground">
          💡 Säg till vilken stil du gillar så kan jag generera en riktig 1024×1024 app-ikon åt dig!
        </p>
      </div>
    </div>
  );
};

export default IconSuggestions;
