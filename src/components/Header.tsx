const Header = () => {
  return (
    <header className="flex justify-between items-center py-5 pb-8 animate-slide-down">
      <h1 className="font-display text-3xl font-extrabold gradient-text tracking-tight">
        STATUS
      </h1>
      <span className="px-3 py-1.5 bg-card border border-border rounded-full text-xs font-bold text-muted-foreground hover:border-primary hover:text-primary transition-all cursor-pointer hover:-translate-y-0.5">
        v1.05
      </span>
    </header>
  );
};

export default Header;
