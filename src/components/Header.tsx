interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const Header = ({ title = "STATUS", subtitle }: HeaderProps) => {
  return (
    <header className="flex justify-between items-center py-5 pb-8 animate-slide-down">
      <div>
        <h1 className="font-display text-3xl font-extrabold gradient-text tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
      <span className="px-3 py-1.5 bg-card border border-border rounded-full text-xs font-bold text-muted-foreground hover:border-primary hover:text-primary transition-all cursor-pointer hover:-translate-y-0.5">
        v1.1
      </span>
    </header>
  );
};

export default Header;
