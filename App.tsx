import React, { useState, useEffect } from 'react';
import { StockCategory, Stock } from './types';
import NewsTicker from './components/NewsTicker';
import FilterBar from './components/FilterBar';
import SessionSummary from './components/SessionSummary';
import StockRow from './components/StockRow';
import GuruModal from './components/GuruModal';
import { Briefcase, Loader2, Wifi } from 'lucide-react';
import { fetchMarketData, subscribeToTicker } from './services/DataService';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<StockCategory>('智算');
  const [isGuruOpen, setIsGuruOpen] = useState(false);
  const [allStocks, setAllStocks] = useState<Record<StockCategory, Stock[]> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Initial Data Fetch (Simulating Backend)
  useEffect(() => {
    fetchMarketData().then((data) => {
      setAllStocks(data);
      setIsLoading(false);
    });
  }, []);

  // 2. Real-time Ticker Subscription
  useEffect(() => {
    if (!allStocks) return;

    const unsubscribe = subscribeToTicker(allStocks, (updatedData) => {
      setAllStocks(updatedData);
    });

    return () => unsubscribe();
  }, [allStocks]); // Re-subscribe when data object reference changes to keep closure fresh

  const displayedStocks = allStocks ? (allStocks[activeCategory] || []) : [];

  return (
    <div className="w-full max-w-[375px] h-full bg-[#F7F5F0] border-x border-[#D1D1D1] flex flex-col relative shadow-2xl bg-paper">
      
      {/* 1. Header Area: Ticker + Session + Filter */}
      <div className="shadow-md z-30 relative bg-[#FDFDFB]">
        <NewsTicker />
        <SessionSummary />
        <FilterBar 
          activeCategory={activeCategory} 
          onSelect={setActiveCategory} 
        />
      </div>

      {/* 2. Main Stock List Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative">
        
        {/* Table Column Headers (Sticky) */}
        <div className="sticky top-0 z-20 bg-[#F0F0EB] border-b border-[#D0D0D0] shadow-sm">
           <div className="flex items-center h-[28px] text-[10px] text-[#888] font-yahei">
             <div className="w-[85px] shrink-0 px-2 text-left">名称</div>
             <div className="flex-1 overflow-x-auto no-scrollbar flex items-center">
                <div className="flex min-w-max px-2 gap-3">
                  <div className="w-[75px] text-right">最新价</div>
                  <div className="w-[60px] text-right">市值</div>
                  <div className="w-[40px] text-right">PE</div>
                  <div className="w-[50px] text-right">量比</div>
                  <div className="w-[90px] text-right">52周高/低</div>
                  <div className="w-[40px] text-right">PEG</div>
                  <div className="w-[60px] text-right pr-1">EV/EBITDA</div>
                </div>
             </div>
             <div className="w-[25px]"></div>
          </div>
        </div>

        {/* Content or Loading */}
        <div className="pb-4 min-h-[400px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-[300px] text-[#888]">
               <Loader2 size={24} className="animate-spin mb-2 text-[#B08D55]" />
               <span className="text-[10px] font-mono">正在连接彭博终端数据源...</span>
            </div>
          ) : (
            <>
              {displayedStocks.map((stock) => (
                <StockRow key={stock.sym} stock={stock} />
              ))}
              
              <div className="py-8 text-center flex flex-col items-center opacity-60">
                <div className="flex items-center text-[9px] text-[#AAA] mb-2">
                   <Wifi size={10} className="mr-1 text-green-600" /> 实时数据连接正常
                </div>
                <div className="text-[10px] text-[#AAA] tracking-[0.5em] font-yahei">
                  ~ 完 ~
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 3. Bottom Footer: Institution Holdings */}
      <div className="bg-[#1A1A1A] border-t border-[#333] p-3 safe-area-bottom z-30">
        <button 
          onClick={() => setIsGuruOpen(true)}
          className="w-full bg-[#333] hover:bg-[#444] text-[#B08D55] border border-[#555] rounded-md py-3 flex items-center justify-center transition-all active:scale-[0.98] shadow-lg group"
        >
           <Briefcase size={16} className="mr-2 text-[#DDD] group-hover:text-white" />
           <span className="text-[13px] font-bold font-serif tracking-widest">查看顶级机构持仓追踪</span>
        </button>
      </div>

      {/* Modals */}
      <GuruModal 
        isOpen={isGuruOpen} 
        onClose={() => setIsGuruOpen(false)} 
      />
      
    </div>
  );
};

export default App;
