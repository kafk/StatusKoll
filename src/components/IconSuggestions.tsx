import { Check, X, Home, Calendar, Users } from 'lucide-react';

// Current app icon
import currentAppIcon from '@/assets/app-icon.png';

// Custom icons for reference
import platformPhoneCheck from '@/assets/icons/platform-phone-check.png';

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
