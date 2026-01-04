import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import NotificationBell from "./NotificationBell";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const Header = ({ title = "STATUS", subtitle }: HeaderProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center pt-12 pb-8 animate-slide-down">
      <div>
        <h1 className="font-display text-3xl font-extrabold gradient-text tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <NotificationBell />
        <button
          onClick={() => navigate("/changelog")}
          className="px-3 py-1.5 bg-card border border-border rounded-full text-xs font-bold text-muted-foreground hover:border-primary hover:text-primary transition-all hover:-translate-y-0.5"
        >
          v1.4
        </button>
      </div>
    </header>
  );
};

export default Header;
