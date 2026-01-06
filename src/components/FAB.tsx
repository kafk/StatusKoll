import { Plus } from 'lucide-react';

interface FABProps {
  onClick: () => void;
}

const FAB = ({ onClick }: FABProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-[100px] right-5 md:right-8 lg:right-12 w-14 h-14 md:w-16 md:h-16 rounded-full gradient-primary text-primary-foreground flex items-center justify-center text-3xl font-bold shadow-primary z-[99] transition-all hover:scale-110 hover:rotate-90 hover:shadow-[0_8px_20px_rgba(255,107,74,0.6)] active:scale-95"
    >
      <Plus className="w-7 h-7 md:w-8 md:h-8" strokeWidth={2.5} />
    </button>
  );
};

export default FAB;
