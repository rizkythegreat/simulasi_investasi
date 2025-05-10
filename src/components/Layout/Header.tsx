import { TrendingUp, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-500 dark:from-gray-800 dark:to-gray-900 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TrendingUp size={28} className="text-white" />
          <h1 className="text-xl md:text-2xl font-bold m-0">SimuSaham</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs md:text-sm font-medium">
            Simulator Investasi Saham
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};