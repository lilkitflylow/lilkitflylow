import React, { useState } from 'react';
import { Stock } from '../types';
import { ChevronRight, TrendingUp, Flame, Newspaper } from 'lucide-react';

interface StockRowProps {
  stock: Stock;
}

const StockRow: React.FC<StockRowProps> = ({ stock }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isUp = stock.chg >= 0;
  const colorClass = isUp ? 'text-[#B08D55]' : 'text-[#888888]';
  const sign = stock.chg > 0 ? '+' : '';

  return (
    <div 
      className={`border-b border-[#EAEaea] transition-all duration-300 ${isExpanded ? 'bg-[#FAF9F6]' : 'hover:bg-[#FCFCFA] bg-white'}`}
    >
      {/* --- Collapsed View: Table Row --- */}
      <div 
        className="flex items-stretch h-[48px] cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Fixed Name Column */}
        <div className="w-[85px] flex-shrink-0 flex flex-col justify-center px-2 border-r border-dashed border-[#F0F0F0] bg-white z-10 relative">
          <div className="flex items-center">
            <span className={`text-[13px] font-bold truncate font-yahei ${stock.hero ? 'text-[#B08D55]' : 'text-[#2C2C2C]'}`}>{stock.name}</span>
            {stock.hot && <Flame size={10} className="text-[#FF4500] ml-1 fill-current" />}
          </div>
          <div className="text-[9px] text-[#999] font-yahei leading-none mt-1 flex items-center">
            {stock.sym}
            {stock.hero && <div className="ml-1 w-1 h-1 bg-[#B08D55] rounded-full"></div>}
          </div>
        </div>

        {/* Scrollable Data Columns */}
        <div className="flex-1 overflow-x-auto no-scrollbar flex items-center">
          <div className="flex min-w-max px-2 gap-3">
            
            <div className="w-[75px] text-right">
               <div className="text-[14px] font-bold text-[#333] font-mono leading-none tracking-tight">{stock.price.toFixed(2)}</div>
               <div className={`text-[10px] font-medium ${colorClass} font-mono leading-none mt-1.5`}>{sign}{stock.chg}%</div>
            </div>

            <div className="w-[60px] text-right flex flex-col justify-center">
               <div className="text-[12px] text-[#555] font-yahei">{stock.cap}</div>
            </div>

            <div className="w-[40px] text-right flex flex-col justify-center">
               <div className="text-[12px] text-[#555] font-yahei">{stock.pe}</div>
            </div>

             <div className="w-[50px] text-right flex flex-col justify-center">
               <div className="text-[12px] text-[#555] font-yahei">{stock.volRatio}</div>
            </div>

            <div className="w-[100px] text-right flex flex-col justify-center">
               <div className="text-[11px] text-[#555] font-mono">{stock.low52w.toFixed(0)} - {stock.high52w.toFixed(0)}</div>
            </div>

            <div className="w-[40px] text-right flex flex-col justify-center">
               <div className="text-[12px] text-[#555] font-yahei">{stock.peg}</div>
            </div>

            <div className="w-[60px] text-right pr-1 flex flex-col justify-center">
               <div className="text-[12px] text-[#555] font-yahei">{stock.evEbitda}</div>
            </div>

          </div>
        </div>
        
        {/* Expand Trigger */}
        <div className="w-[25px] flex items-center justify-center text-[#DDD] border-l border-dashed border-[#F0F0F0]">
           <ChevronRight size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-90 text-[#B08D55]' : ''}`} />
        </div>
      </div>

      {/* --- Expanded View --- */}
      {isExpanded && (
        <div className="px-3 pb-5 pt-2 animate-book-fade bg-[#FAF9F6] border-t border-[#EAEAEA]">
          
          {/* 1. Priority News Section (Top) */}
          <div className="mb-5 space-y-2">
             <div className="flex items-start bg-white p-2 rounded-sm border-l-[3px] border-[#B08D55] shadow-sm">
                <div className="mr-2 mt-0.5">
                   <div className="bg-[#B08D55] text-white text-[9px] px-1 py-0.5 rounded font-bold whitespace-nowrap">48h</div>
                </div>
                <div>
                   <div className="text-[12px] text-[#333] font-medium leading-tight">{stock.news48h}</div>
                   <div className="text-[9px] text-[#999] mt-1 flex items-center">
                      <Newspaper size={10} className="mr-1"/> 数据来源: 彭博终端 · {stock.news48hDate}
                   </div>
                </div>
             </div>

             <div className="flex items-start bg-white p-2 rounded-sm border-l-[3px] border-[#DDD] shadow-sm">
                <div className="mr-2 mt-0.5">
                   <div className="bg-[#F0F0F0] text-[#666] text-[9px] px-1 py-0.5 rounded font-bold whitespace-nowrap">2周</div>
                </div>
                <div>
                   <div className="text-[11px] text-[#555] leading-tight">{stock.news2w}</div>
                   <div className="text-[9px] text-[#999] mt-1">{stock.news2wDate} · 机构持仓变动</div>
                </div>
             </div>
          </div>

          {/* 2. Equidistant Price Data (Golden Fonts, No Axis) */}
          <div className="mb-6 bg-white p-3 rounded-sm border border-[#EAEAEA] shadow-sm">
             <div className="flex justify-between items-center text-center">
                <div className="flex flex-col items-center flex-1">
                   <span className="text-[9px] text-[#999] mb-1">52周最低</span>
                   <span className="text-[13px] font-bold text-[#B08D55] font-mono">{stock.low52w.toFixed(1)}</span>
                </div>
                <div className="w-[1px] h-4 bg-[#EEE]"></div>
                <div className="flex flex-col items-center flex-1">
                   <span className="text-[9px] text-[#999] mb-1">支撑位</span>
                   <span className="text-[13px] font-bold text-[#B08D55] font-mono">{stock.support.toFixed(1)}</span>
                </div>
                <div className="w-[1px] h-4 bg-[#EEE]"></div>
                <div className="flex flex-col items-center flex-1">
                   <span className="text-[9px] text-[#999] mb-1">现价</span>
                   <span className="text-[14px] font-black text-[#B08D55] font-mono border-b-2 border-[#B08D55] leading-none pb-0.5">{stock.price.toFixed(2)}</span>
                </div>
                <div className="w-[1px] h-4 bg-[#EEE]"></div>
                <div className="flex flex-col items-center flex-1">
                   <span className="text-[9px] text-[#999] mb-1">目标价</span>
                   <span className="text-[13px] font-bold text-[#B08D55] font-mono">{stock.target.toFixed(1)}</span>
                </div>
                <div className="w-[1px] h-4 bg-[#EEE]"></div>
                <div className="flex flex-col items-center flex-1">
                   <span className="text-[9px] text-[#999] mb-1">52周最高</span>
                   <span className="text-[13px] font-bold text-[#B08D55] font-mono">{stock.high52w.toFixed(1)}</span>
                </div>
             </div>
          </div>

          {/* 3. Indicators Grid */}
          <div className="grid grid-cols-4 gap-2 mb-4">
             <div className="bg-white border border-[#E0E0E0] p-2 rounded text-center">
                 <div className="text-[9px] text-[#999] mb-1 font-yahei">PEG</div>
                 <div className="text-[12px] font-bold text-[#333] font-mono">{stock.peg}</div>
             </div>
             <div className="bg-white border border-[#E0E0E0] p-2 rounded text-center">
                 <div className="text-[9px] text-[#999] mb-1 font-yahei">EV/EBITDA</div>
                 <div className="text-[12px] font-bold text-[#333] font-mono">{stock.evEbitda}</div>
             </div>
             <div className="bg-white border border-[#E0E0E0] p-2 rounded text-center">
                 <div className="text-[9px] text-[#999] mb-1 font-yahei">现金比率</div>
                 <div className="text-[12px] font-bold text-[#333] font-mono">{stock.cashRatio}</div>
             </div>
             <div className="bg-white border border-[#E0E0E0] p-2 rounded text-center">
                 <div className="text-[9px] text-[#999] mb-1 font-yahei">营收CAGR</div>
                 <div className="text-[12px] font-bold text-[#333] font-mono">{stock.revCagr}</div>
             </div>
          </div>

          {/* 4. Analysis Footer */}
          <div className="bg-[#F0F0EB] p-3 rounded-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] font-bold text-[#333] flex items-center">
                   <TrendingUp size={12} className="mr-1" />
                   AI 综合评述
                </span>
                <span className="text-[9px] text-[#888]">{stock.nextEarnings.split('日')[0]} 财报前瞻</span>
              </div>
              <div className="text-[12px] text-[#444] leading-relaxed font-yahei text-justify">
                {stock.analysis}
              </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default StockRow;