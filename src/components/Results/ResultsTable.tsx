import React, { useState } from 'react';
import { SimulationResult } from '../../types';
import { formatCurrency, formatNumber } from '../../utils/calculations';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ResultsTableProps {
  results: SimulationResult[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  const [visibleRows, setVisibleRows] = useState(10);
  const [expanded, setExpanded] = useState(false);

  if (!results.length) return null;

  const handleShowMore = () => {
    if (expanded) {
      setVisibleRows(10);
      setExpanded(false);
    } else {
      setVisibleRows(results.length);
      setExpanded(true);
    }
  };

  const displayedResults = results.slice(0, visibleRows);

  return (
    <div className="card mt-8 animate-slide-up overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Tabel Simulasi Tahunan</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="table-head">Tahun</th>
              <th scope="col" className="table-head">Usia</th>
              <th scope="col" className="table-head">Tabungan Tahunan</th>
              <th scope="col" className="table-head">Total Saham</th>
              <th scope="col" className="table-head">Saham dari Dividen</th>
              <th scope="col" className="table-head">Harga Saham</th>
              <th scope="col" className="table-head">Dividen per Saham</th>
              <th scope="col" className="table-head">Total Dividen</th>
              <th scope="col" className="table-head">Dividen Reinvestasi</th>
              <th scope="col" className="table-head">Nilai Aset</th>
              <th scope="col" className="table-head">Biaya Hidup</th>
              <th scope="col" className="table-head">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayedResults.map((result, index) => (
              <tr key={index} className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
                <td className="table-cell">{result.year}</td>
                <td className="table-cell">{result.age}</td>
                <td className="table-cell">{formatCurrency(result.savingsForYear)}</td>
                <td className="table-cell">{formatNumber(result.cumulativeStocks)}</td>
                <td className="table-cell">{formatNumber(result.stocksFromDividends)}</td>
                <td className="table-cell">{formatCurrency(result.stockPrice)}</td>
                <td className="table-cell">{formatCurrency(result.dividendPerShare)}</td>
                <td className="table-cell font-medium">{formatCurrency(result.totalDividends)}</td>
                <td className="table-cell">{formatCurrency(result.reinvestedDividends)}</td>
                <td className="table-cell font-medium">{formatCurrency(result.totalAssetValue)}</td>
                <td className="table-cell">{formatCurrency(result.yearlyExpenses)}</td>
                <td className="table-cell">
                  <span 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      result.isSufficientForLiving 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {result.isSufficientForLiving ? 'Cukup' : 'Kurang'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {results.length > 10 && (
        <div className="mt-4 text-center">
          <button 
            className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center mx-auto"
            onClick={handleShowMore}
          >
            {expanded ? (
              <>
                <ChevronUp size={16} className="mr-1" />
                Tampilkan Lebih Sedikit
              </>
            ) : (
              <>
                <ChevronDown size={16} className="mr-1" />
                Tampilkan Semua ({results.length} tahun)
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultsTable;