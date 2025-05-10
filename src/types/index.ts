export interface SimulationInput {
  startAge: number;
  retirementAge: number;
  savingsPerYear: number;
  stockPrice: number;
  dividendYield: number;
  monthlyExpenses: number;
  reinvestDividends: boolean;
}

export interface SimulationResult {
  age: number;
  year: number;
  savingsForYear: number;
  totalStocksPurchased: number;
  cumulativeStocks: number;
  stockPrice: number;
  dividendPerShare: number;
  totalDividends: number;
  reinvestedDividends: number;
  stocksFromDividends: number;
  totalAssetValue: number;
  yearlyExpenses: number;
  isSufficientForLiving: boolean;
  surplus: number;
}