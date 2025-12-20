import { ArrowLeft, Sparkles, Wrench, Bug } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChangelogEntry {
  version: string;
  date: string;
  changes: {
    type: "feature" | "improvement" | "bugfix";
    description: string;
  }[];
}

const changelog: ChangelogEntry[] = [
  {
    version: "1.1",
    date: "2025-01-20",
    changes: [
      { type: "feature", description: "Ny ekonomisida med inkomster och kostnader" },
      { type: "feature", description: "Möjlighet att lägga till fasta och rörliga kostnader" },
      { type: "feature", description: "Datumväljare för transaktioner" },
      { type: "improvement", description: "Automatisk beräkning av vinst" },
    ],
  },
  {
    version: "1.0",
    date: "2025-01-15",
    changes: [
      { type: "feature", description: "Första versionen av appen" },
      { type: "feature", description: "Kundhantering med lista och detaljvy" },
      { type: "feature", description: "Bokningsmodal för nya bokningar" },
      { type: "feature", description: "Statusöversikt med timeline" },
    ],
  },
];

const getIcon = (type: "feature" | "improvement" | "bugfix") => {
  switch (type) {
    case "feature":
      return <Sparkles className="w-4 h-4 text-primary" />;
    case "improvement":
      return <Wrench className="w-4 h-4 text-blue-400" />;
    case "bugfix":
      return <Bug className="w-4 h-4 text-orange-400" />;
  }
};

const getLabel = (type: "feature" | "improvement" | "bugfix") => {
  switch (type) {
    case "feature":
      return "Ny funktion";
    case "improvement":
      return "Förbättring";
    case "bugfix":
      return "Buggfix";
  }
};

const Changelog = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6 pb-24">
      <header className="flex items-center gap-4 mb-8 animate-slide-down">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full bg-card border border-border hover:border-primary transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-display text-3xl font-extrabold gradient-text tracking-tight">
            CHANGELOG
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Vad är nytt i varje version</p>
        </div>
      </header>

      <div className="space-y-6">
        {changelog.map((entry, index) => (
          <div
            key={entry.version}
            className="bg-card border border-border rounded-2xl p-5 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm font-bold text-primary">
                v{entry.version}
              </span>
              <span className="text-sm text-muted-foreground">{entry.date}</span>
            </div>
            
            <ul className="space-y-3">
              {entry.changes.map((change, changeIndex) => (
                <li key={changeIndex} className="flex items-start gap-3">
                  <div className="mt-0.5">{getIcon(change.type)}</div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">
                      {getLabel(change.type)}
                    </span>
                    <p className="text-foreground">{change.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Changelog;
