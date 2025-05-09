import { TrendingUp } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-500 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TrendingUp size={28} className="text-white" />
          <h1 className="text-xl md:text-2xl font-bold m-0">SimuSaham</h1>
        </div>
        <div className="text-xs md:text-sm font-medium">
          Simulator Investasi Saham
        </div>
      </div>
    </header>
  );
};

export default Header;