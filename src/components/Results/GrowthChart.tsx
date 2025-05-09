import { SimulationResult } from '../../types';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area
} from 'recharts';
import { formatCurrency } from '../../utils/calculations';

interface GrowthChartProps {
  results: SimulationResult[];
}

const GrowthChart: React.FC<GrowthChartProps> = ({ results }) => {
  if (!results.length) return null;

  // Prepare data for the chart - pick key years to avoid crowding
  const getChartData = () => {
    if (results.length <= 30) return results;

    // For longer simulations, pick milestones
    const milestones: SimulationResult[] = [];
    
    // Always include first and last years
    milestones.push(results[0]);
    
    // Find retirement year
    const retirementIndex = results.findIndex(r => r.savingsForYear === 0);
    if (retirementIndex > 0) {
      // Include year before retirement, retirement year, and year after
      if (retirementIndex > 1) milestones.push(results[retirementIndex - 1]);
      milestones.push(results[retirementIndex]);
      if (retirementIndex < results.length - 1) milestones.push(results[retirementIndex + 1]);
    }
    
    // Select roughly evenly-spaced years
    const spacing = Math.max(Math.floor(results.length / 20), 1);
    for (let i = spacing; i < results.length - 1; i += spacing) {
      // Avoid duplicating already added milestone years
      if (!milestones.some(m => m.year === results[i].year)) {
        milestones.push(results[i]);
      }
    }
    
    // Add last year if not already included
    if (milestones[milestones.length - 1].year !== results[results.length - 1].year) {
      milestones.push(results[results.length - 1]);
    }
    
    // Sort by year
    return milestones.sort((a, b) => a.year - b.year);
  };

  const chartData = getChartData().map(result => ({
    name: result.year.toString(),
    age: result.age,
    stockValue: result.totalAssetValue,
    dividends: result.totalDividends,
    expenses: result.yearlyExpenses,
    surplus: result.surplus,
    isRetirement: result.savingsForYear === 0
  }));

  // Find the year when retirement starts
  const retirementStartIndex = results.findIndex(r => r.savingsForYear === 0);
  
  // Format large numbers for tooltip
  const formatYAxis = (value: number): string => {
    if (value >= 1_000_000_000) {
      return `${(value / 1_000_000_000).toFixed(1)}M`;
    } else if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(1)}Jt`;
    }
    return value.toString(); // pastikan ini string
  };  

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-md rounded-md">
          <p className="font-semibold text-gray-900">Tahun {label} (Usia {data.age})</p>
          <p className="text-primary-600">
            <span className="font-medium">Nilai Saham:</span> {formatCurrency(data.stockValue)}
          </p>
          <p className="text-secondary-600">
            <span className="font-medium">Total Dividen:</span> {formatCurrency(data.dividends)}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Biaya Hidup:</span> {formatCurrency(data.expenses)}
          </p>
          <p className={data.surplus >= 0 ? "text-success-500" : "text-danger-500"}>
            <span className="font-medium">Surplus/Defisit:</span> {formatCurrency(data.surplus)}
          </p>
          {data.isRetirement && (
            <p className="mt-2 text-xs font-medium text-primary-700 bg-primary-50 px-2 py-1 rounded">
              Masa Pensiun
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card mt-8 animate-slide-up">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Grafik Pertumbuhan Aset</h2>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.7} />
            <XAxis
              dataKey="name" 
              label={{ 
                value: 'Tahun', 
                position: 'insideBottomRight', 
                offset: -10 
              }}
            />
            <YAxis 
              tickFormatter={formatYAxis} 
              label={{ 
                value: 'Nilai (Rupiah)', 
                angle: -90, 
                position: 'insideLeft' 
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="stockValue" 
              name="Nilai Aset" 
              fill="#047857" 
              opacity={0.7} 
              barSize={20} 
            />
            <Line 
              type="monotone" 
              dataKey="dividends" 
              name="Dividen" 
              stroke="#7c3aed" 
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="expenses" 
              name="Biaya Hidup" 
              stroke="#ef4444" 
              strokeWidth={2} 
              strokeDasharray="5 5"
            />
            {retirementStartIndex > 0 && (
              <Area 
                type="monotone"
                dataKey="surplus"
                name="Surplus/Defisit"
                fill={chartData[chartData.length-1].surplus >= 0 ? "#10b98140" : "#ef444440"}
                stroke={chartData[chartData.length-1].surplus >= 0 ? "#10b981" : "#ef4444"}
                activeDot={{ r: 6 }}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        <ul className="flex flex-wrap gap-x-4 gap-y-2 justify-center">
          <li className="flex items-center">
            <span className="w-3 h-3 inline-block bg-primary-600 mr-1"></span>
            Nilai Total Aset (Saham)
          </li>
          <li className="flex items-center">
            <span className="w-3 h-3 inline-block bg-secondary-600 mr-1"></span>
            Total Dividen Tahunan
          </li>
          <li className="flex items-center">
            <span className="w-3 h-3 inline-block bg-danger-500 mr-1"></span>
            Biaya Hidup Tahunan
          </li>
          <li className="flex items-center">
            <span className="w-3 h-3 inline-block bg-success-500 opacity-60 mr-1"></span>
            Area Surplus/Defisit
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GrowthChart;