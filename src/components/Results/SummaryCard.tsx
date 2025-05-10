import React from 'react';
import { formatCurrency, formatNumber } from '../../utils/calculations';
import { SimulationResult } from '../../types';
import { TrendingUp, DollarSign, AlertCircle } from 'lucide-react';

interface SummaryCardProps {
  results: SimulationResult[];
}

const SummaryCard: React.FC<SummaryCardProps> = ({ results }) => {
  if (!results.length) return null;

  console.log('results', results);

  const retirementResults = results.filter(
    result => result.savingsForYear === 0
  );
  
  const lastResult = results[results.length - 1];
  const firstRetirementYear = retirementResults[0];
  
  const sufficientYears = retirementResults.filter(
    result => result.isSufficientForLiving
  ).length;
  
  const retirementSufficiencyPercentage = 
    (sufficientYears / retirementResults.length) * 100;
  
  const sufficiencyStatus = 
    retirementSufficiencyPercentage >= 90 ? 'Sangat Baik' :
    retirementSufficiencyPercentage >= 70 ? 'Baik' :
    retirementSufficiencyPercentage >= 50 ? 'Cukup' : 'Perlu Perhatian';
  
  const statusColor = 
    retirementSufficiencyPercentage >= 90 ? 'text-success-500' :
    retirementSufficiencyPercentage >= 70 ? 'text-success-500' :
    retirementSufficiencyPercentage >= 50 ? 'text-warning-500' : 'text-danger-500';

  const firstSufficientYear = results.find(item => item.isSufficientForLiving === true);

  return (
    <div className="card mt-8 animate-slide-up">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Ringkasan Hasil Simulasi</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={20} className="text-primary-500" />
            <h3 className="text-lg font-medium text-gray-700 m-0">Total Aset</h3>
          </div>
          <p className="text-2xl font-bold text-primary-700">
            {formatCurrency(lastResult.totalAssetValue)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {formatNumber(lastResult.cumulativeStocks)} lembar saham
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={20} className="text-secondary-500" />
            <h3 className="text-lg font-medium text-gray-700 m-0">Dividen Tahunan</h3>
          </div>
          <p className="text-2xl font-bold text-secondary-700">
            {formatCurrency(lastResult.totalDividends)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            pada usia {lastResult.age} tahun
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={20} className={statusColor} />
            <h3 className="text-lg font-medium text-gray-700 m-0">Status Pensiun</h3>
          </div>
          <p className={`text-2xl font-bold ${statusColor}`}>
            {sufficiencyStatus}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {formatNumber(retirementSufficiencyPercentage, 0)}% terpenuhi
            {sufficiencyStatus === 'Sangat Baik' ? ` pada usia ${firstSufficientYear?.age} tahun` : ''}
          </p>
        </div>
      </div>
      
      <div className="mt-8 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium mb-4">Detail Finansial Pensiun</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Dividen Awal Pensiun:</p>
            <p className="text-lg font-semibold">
              {formatCurrency(firstRetirementYear.totalDividends)} / tahun
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Kebutuhan Hidup Awal Pensiun:</p>
            <p className="text-lg font-semibold">
              {formatCurrency(firstRetirementYear.yearlyExpenses)} / tahun
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Surplus/Defisit Awal Pensiun:</p>
            <p className={`text-lg font-semibold ${firstRetirementYear.surplus >= 0 ? 'text-success-500' : 'text-danger-500'}`}>
              {formatCurrency(firstRetirementYear.surplus)} / tahun
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Surplus/Defisit Akhir Simulasi:</p>
            <p className={`text-lg font-semibold ${lastResult.surplus >= 0 ? 'text-success-500' : 'text-danger-500'}`}>
              {formatCurrency(lastResult.surplus)} / tahun
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;