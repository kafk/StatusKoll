import { useLanguage } from "@/contexts/LanguageContext";
import { Menu } from "lucide-react";
import NotificationBell from "./NotificationBell";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onSettingsClick?: () => void;
}

const Header = ({ title = "STATUS", subtitle, onSettingsClick }: HeaderProps) => {
  const { t } = useLanguage();

  return (
    <header className="flex justify-between items-center pt-12 pb-8 md:pt-16 md:pb-10 animate-slide-down">
      <div className="flex items-center gap-3 md:gap-4">
        {onSettingsClick && (
          <button
            onClick={onSettingsClick}
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-card border border-border hover:border-primary hover:text-primary transition-all"
          >
            <Menu className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        )}
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold gradient-text tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm md:text-base text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <NotificationBell />
      </div>
    </header>
  );
};

export default Header;
