import { useState } from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import SimulationForm from './components/Form/SimulationForm';
import ResultsTable from './components/Results/ResultsTable';
import GrowthChart from './components/Results/GrowthChart';
import SummaryCard from './components/Results/SummaryCard';
import { SimulationInput, SimulationResult } from './types';
import { calculateSimulation } from './utils/calculations';
import { ArrowDown } from 'lucide-react';

function App() {
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [hasSimulated, setHasSimulated] = useState(false);

  const handleSimulate = (inputs: SimulationInput) => {
    const simulationResults = calculateSimulation(inputs);
    setResults(simulationResults);
    setHasSimulated(true);
    
    // Smoothly scroll to results
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Simulasi Investasi Saham</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mt-2">
            Rencanakan masa depan finansial Anda dengan simulasi investasi saham jangka panjang.
            Lihat bagaimana tabungan dan dividen dapat mendukung gaya hidup Anda di masa pensiun.
          </p>
        </div>
        
        <SimulationForm onSimulate={handleSimulate} />
        
        {hasSimulated && (
          <div className="text-center my-8 animate-bounce">
            <ArrowDown size={24} className="mx-auto text-primary-500" />
          </div>
        )}
        
        {hasSimulated && (
          <div id="results-section" className="pb-10">
            <SummaryCard results={results} />
            <GrowthChart results={results} />
            <ResultsTable results={results} />
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;