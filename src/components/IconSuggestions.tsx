import appIconV1 from "@/assets/icons/app-icon-v1.png";
import appIconV2 from "@/assets/icons/app-icon-v2.png";
import appIconV3 from "@/assets/icons/app-icon-v3.png";
import appIconV4 from "@/assets/icons/app-icon-v4.png";
import appIconV5 from "@/assets/icons/app-icon-v5.png";

const appIconVersions = [
  { src: appIconV1, label: "V1: Hus + Kalender", desc: "Hus med kalender-checkmark overlay" },
  { src: appIconV2, label: "V2: Kalender + Hus", desc: "Kalender fokus med hus-detalj" },
  { src: appIconV3, label: "V3: Mobil Bekräftelse", desc: "Telefon med checkmark-cirkel" },
  { src: appIconV4, label: "V4: Kalender + Nyckel", desc: "Uthyrning tema med nyckel" },
  { src: appIconV5, label: "V5: Hand Tap", desc: "Bekräftelse-gest i cirkel" },
];

const IconSuggestions = () => {
  return (
    <div className="p-5 max-w-[500px] mx-auto pb-20 space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold gradient-text">App-ikon förslag</h2>
        <p className="text-sm text-muted-foreground mt-1">5 versioner i korall gradient-stil (1024×1024)</p>
      </div>
      
      {/* Grid of 5 app icon versions */}
      <div className="grid grid-cols-2 gap-4">
        {appIconVersions.map((icon, index) => (
          <div 
            key={index}
            className="bg-card border border-border rounded-xl p-4 flex flex-col items-center gap-3"
          >
            <img 
              src={icon.src} 
              alt={icon.label} 
              className="w-24 h-24 rounded-2xl shadow-lg"
            />
            <div className="text-center">
              <h3 className="font-display text-sm font-bold">{icon.label}</h3>
              <p className="text-xs text-muted-foreground">{icon.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="bg-muted/30 border border-border rounded-xl p-4">
        <p className="text-sm text-muted-foreground">
          Säg till vilken du gillar så sätter jag den som app-ikon!
        </p>
      </div>
    </div>
  );
};

export default IconSuggestions;
