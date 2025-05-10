import { SimulationInput, SimulationResult } from '../types';

export const calculateSimulation = (input: SimulationInput): SimulationResult[] => {
  const {
    startAge,
    retirementAge,
    savingsPerYear,
    stockPrice,
    dividendYield,
    monthlyExpenses,
  } = input;

  const yearlyExpenses = monthlyExpenses * 12;
  const results: SimulationResult[] = [];
  
  // Simulation constants (can be made configurable later)
  const stockPriceGrowthRate = 0.08; // 8% annual stock price growth
  const dividendGrowthRate = 0.05; // 5% annual dividend growth
  const inflationRate = 0.03; // 3% annual inflation
  
  let currentAge = startAge;
  let currentYear = new Date().getFullYear();
  let cumulativeStocks = 0;
  let currentStockPrice = stockPrice;
  let currentDividendYield = dividendYield / 100;
  let currentYearlyExpenses = yearlyExpenses;
  
  // Simulate until 30 years after retirement or 100 years old (whichever comes first)
  const simulationEndAge = Math.min(retirementAge + 10, 100);
  
  while (currentAge <= simulationEndAge) {
    // Calculate current year's savings
    const savingsForYear = currentAge < retirementAge ? savingsPerYear : 0;
    
    // Calculate stocks purchased this year
    const stocksPurchased = savingsForYear / currentStockPrice;
    
    // Update cumulative stocks
    cumulativeStocks += stocksPurchased;
    
    // Calculate dividend per share
    const dividendPerShare = currentStockPrice * currentDividendYield;
    
    // Calculate total dividends for the year
    const totalDividends = cumulativeStocks * dividendPerShare;
    
    // Calculate total asset value
    const totalAssetValue = cumulativeStocks * currentStockPrice;
    
    // Check if dividends are sufficient for yearly expenses
    const isSufficientForLiving = totalDividends >= currentYearlyExpenses;
    
    // Calculate surplus/deficit
    const surplus = totalDividends - currentYearlyExpenses;
    
    // Add to results
    results.push({
      age: currentAge,
      year: currentYear,
      savingsForYear,
      totalStocksPurchased: round(stocksPurchased),
      cumulativeStocks: round(cumulativeStocks),
      stockPrice: round(currentStockPrice),
      dividendPerShare: round(dividendPerShare),
      totalDividends: round(totalDividends),
      totalAssetValue: round(totalAssetValue),
      yearlyExpenses: round(currentYearlyExpenses),
      isSufficientForLiving,
      surplus: round(surplus)
    });
    
    // Prepare for next year
    currentAge++;
    currentYear++;
    
    // Adjust for next year (growth and inflation)
    currentStockPrice *= (1 + stockPriceGrowthRate);
    currentDividendYield *= (1 + dividendGrowthRate / 100); // Small adjustment to yield
    currentYearlyExpenses *= (1 + inflationRate);
  }
  
  return results;
};

const round = (value: number, decimals = 2): number => {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export const formatNumber = (value: number, decimals = 2): string => {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals
  }).format(value);
};