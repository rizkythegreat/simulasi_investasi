import { useState } from 'react';
import InputField from './InputField';
import { SimulationInput } from '../../types';

interface SimulationFormProps {
  onSimulate: (inputs: SimulationInput) => void;
}

const SimulationForm: React.FC<SimulationFormProps> = ({ onSimulate }) => {
  const [inputs, setInputs] = useState<SimulationInput>({
    startAge: 25,
    retirementAge: 50,
    savingsPerYear: 16000000,
    stockPrice: 22000,
    dividendYield: 15,
    monthlyExpenses: 1500000
  });

  const handleInputChange = (field: keyof SimulationInput, value: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSimulate(inputs);
  };

  return (
    <div className="card animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Parameter Simulasi</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <InputField
            id="startAge"
            label="Usia Mulai Investasi"
            type="number"
            value={inputs.startAge}
            min={18}
            max={inputs.retirementAge - 1}
            onChange={(value) => handleInputChange('startAge', value)}
            suffix="tahun"
          />
          <InputField
            id="retirementAge"
            label="Usia Pensiun"
            type="number"
            value={inputs.retirementAge}
            min={inputs.startAge + 1}
            max={100}
            onChange={(value) => handleInputChange('retirementAge', value)}
            suffix="tahun"
          />
          <InputField
            id="savingsPerYear"
            label="Tabungan per Tahun"
            type="currency"
            value={inputs.savingsPerYear}
            min={0}
            step={1000000}
            onChange={(value) => handleInputChange('savingsPerYear', value)}
            prefix="Rp"
          />
          <InputField
            id="stockPrice"
            label="Harga Saham"
            type="currency"
            value={inputs.stockPrice}
            min={0}
            step={100}
            onChange={(value) => handleInputChange('stockPrice', value)}
            prefix="Rp"
          />
          <InputField
            id="dividendYield"
            label="Dividen Yield"
            type="percentage"
            value={inputs.dividendYield}
            min={0}
            max={100}
            step={1}
            onChange={(value) => handleInputChange('dividendYield', value)}
            suffix="%"
          />
          <InputField
            id="monthlyExpenses"
            label="Biaya Hidup per Bulan"
            type="currency"
            value={inputs.monthlyExpenses}
            min={0}
            step={500000}
            onChange={(value) => handleInputChange('monthlyExpenses', value)}
            prefix="Rp"
          />
        </div>
        <div className="mt-6">
          <button type="submit" className="btn-primary w-full">
            Hitung Simulasi
          </button>
        </div>
      </form>
    </div>
  );
};

export default SimulationForm;