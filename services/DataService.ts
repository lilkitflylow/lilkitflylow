import { STOCKS } from '../constants';
import { Stock, StockCategory } from '../types';

// Simulate network latency for "Feasible Backend" connection
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchMarketData = async (): Promise<Record<StockCategory, Stock[]>> => {
  await delay(1200); // Simulate realistic API loading time
  // Return a deep copy of the initial dataset to ensure fresh state
  return JSON.parse(JSON.stringify(STOCKS));
};

export const subscribeToTicker = (
  stocks: Record<StockCategory, Stock[]>,
  onUpdate: (updatedStocks: Record<StockCategory, Stock[]>) => void
) => {
  // Simulate live socket events
  const interval = setInterval(() => {
    const categories = Object.keys(stocks) as StockCategory[];
    // Pick 2 random stocks to update per tick for activity
    for(let i=0; i<2; i++) {
        const cat = categories[Math.floor(Math.random() * categories.length)];
        const list = stocks[cat];
        const stockIdx = Math.floor(Math.random() * list.length);
        const stock = list[stockIdx];

        // Random fluctuation between -0.2% and +0.2%
        const fluxPercent = (Math.random() - 0.5) * 0.4; 
        const fluxFactor = 1 + (fluxPercent / 100);
        
        const newPrice = stock.price * fluxFactor;
        
        // Update High/Low if breached (Fixing "Wrong Quotation" logic)
        if (newPrice > stock.high52w) stock.high52w = newPrice;
        if (newPrice < stock.low52w) stock.low52w = newPrice;
        
        // Update Price and Change
        stock.price = newPrice;
        stock.chg = stock.chg + fluxPercent;

        // Create new array reference for React to detect change
        const newList = [...list];
        newList[stockIdx] = { ...stock };
        stocks = { ...stocks, [cat]: newList };
    }
    
    onUpdate(stocks);
  }, 1000); // Tick every second

  return () => clearInterval(interval);
};
