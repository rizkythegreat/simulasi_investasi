import React from 'react';
import { formatCurrency, formatNumber } from '../../utils/calculations';
import { SimulationResult } from '../../types';
import { TrendingUp, DollarSign, AlertCircle } from 'lucide-react';

interface SummaryCardProps {
  results: SimulationResult[];
}

const SummaryCard: React.FC<SummaryCardProps> = ({ results }) => {
  if (!results.length) return null;

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
  
  // Calculate total reinvested dividends before retirement
  const totalReinvestedDividends = results
    .filter(r => r.savingsForYear > 0)
    .reduce((sum, r) => sum + r.reinvestedDividends, 0);

  const totalStocksFromDividends = results
    .filter(r => r.savingsForYear > 0)
    .reduce((sum, r) => sum + r.stocksFromDividends, 0);

  return (
    <div className="card mt-8 animate-slide-up">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Ringkasan Hasil Simulasi</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={20} className="text-primary-500 dark:text-primary-400" />
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 m-0">Total Aset</h3>
          </div>
          <p className="text-2xl font-bold text-primary-700 dark:text-primary-300">
            {formatCurrency(lastResult.totalAssetValue)}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {formatNumber(lastResult.cumulativeStocks)} lembar saham
          </p>
          {totalStocksFromDividends > 0 && (
            <p className="text-sm text-success-600 dark:text-success-400 mt-1">
              +{formatNumber(totalStocksFromDividends)} dari reinvestasi dividen
            </p>
          )}
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={20} className="text-secondary-500 dark:text-secondary-400" />
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 m-0">Dividen Tahunan</h3>
          </div>
          <p className="text-2xl font-bold text-secondary-700 dark:text-secondary-300">
            {formatCurrency(lastResult.totalDividends)}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            pada usia {lastResult.age} tahun
          </p>
          {totalReinvestedDividends > 0 && (
            <p className="text-sm text-success-600 dark:text-success-400 mt-1">
              Total reinvestasi: {formatCurrency(totalReinvestedDividends)}
            </p>
          )}
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={20} className={statusColor} />
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 m-0">Status Pensiun</h3>
          </div>
          <p className={`text-2xl font-bold ${statusColor}`}>
            {sufficiencyStatus}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {formatNumber(retirementSufficiencyPercentage, 0)}% terpenuhi
            {sufficiencyStatus === 'Sangat Baik' ? ` pada usia ${firstSufficientYear?.age} tahun` : ''}
          </p>
        </div>
      </div>
      
      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Detail Finansial Pensiun</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Dividen Awal Pensiun:</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {formatCurrency(firstRetirementYear.totalDividends)} / tahun
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Kebutuhan Hidup Awal Pensiun:</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {formatCurrency(firstRetirementYear.yearlyExpenses)} / tahun
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Surplus/Defisit Awal Pensiun:</p>
            <p className={`text-lg font-semibold ${firstRetirementYear.surplus >= 0 ? 'text-success-500 dark:text-success-400' : 'text-danger-500 dark:text-danger-400'}`}>
              {formatCurrency(firstRetirementYear.surplus)} / tahun
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Surplus/Defisit Akhir Simulasi:</p>
            <p className={`text-lg font-semibold ${lastResult.surplus >= 0 ? 'text-success-500 dark:text-success-400' : 'text-danger-500 dark:text-danger-400'}`}>
              {formatCurrency(lastResult.surplus)} / tahun
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;