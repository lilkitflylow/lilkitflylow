export interface TimelineEvent {
  date: string;
  icon: string;
  text: string;
}

export interface Stock {
  sym: string;
  name: string;
  price: number;
  chg: number;
  
  // Columns Data
  cap: string;
  pe: string;
  vol: string;      // Turnover/Volume
  volRatio: string; // Volume Ratio
  peg: string;      // PEG Ratio
  evEbitda: string; // EV / EBITDA

  // Detailed Financials
  cashRatio: string; // Cash Ratio
  revCagr: string;   // Revenue CAGR (3-5y)
  epsCagr: string;   // EPS CAGR (3-5y)
  
  // Earnings
  nextEarnings: string;
  earningsBrief: string;

  // News (Dates instead of times)
  news48h: string;    
  news48hDate: string; 
  news2w: string;     
  news2wDate: string; 
  
  // Historical / Axis Data
  lastYearPrice: number; 
  high52w: number;
  high52wDate: string;
  low52w: number;
  low52wDate: string;

  // Trading Levels
  target: number;
  support: number;
  
  // Qualitative
  analysis: string; // Auto-generated judgement
  hero: boolean; // Is it a top stock
  hot: boolean;  // Is it a trending stock
}

// 2-character categories
export type StockCategory = 
  | '智算' // AI & Compute
  | '硬件' // Consumer Electronics
  | '医药' // Healthcare
  | '金控' // Finance
  | '能源' // Energy
  | '材料' // Materials
  | '制造' // Industrial/Auto
  | '加密'; // Crypto/Blockchain

export interface InstitutionMove {
  name: string;
  action: string;
  trend: 'up' | 'down';
  time: string;
}

export interface NetworkNodeData {
  title: string;
  content: string[];
}

export interface TickerItem {
  text: string;
  time: string;
}

export interface GuruPortfolioItem {
  symbol: string;
  name: string;
  percent: number;
  color: string;
}

export interface GuruProfile {
  id: string;
  name: string;
  title: string;
  avatar: string; 
  holdings: GuruPortfolioItem[];
  desc: string;
  aum: string;    // Assets Under Management
  return1y: string; // 1 Year Return
  topHolding: string; // Name of top holding
}
