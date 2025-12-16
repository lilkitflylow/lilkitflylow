import React from 'react';

const HistoryBar: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-[#1E1E1E] to-[#2A2A2A] p-2.5 flex justify-around text-[10px] border-b border-[#333]">
      <div className="text-center flex-1">
        <div className="text-[#888] text-[9px] mb-0.5">一年前今天</div>
        <div className="font-bold text-[#888]">NVDA $49</div>
      </div>
      <div className="text-center flex-1">
        <div className="text-[#888] text-[9px] mb-0.5">现价</div>
        <div className="font-bold text-[#00D9A3]">$175</div>
      </div>
      <div className="text-center flex-1">
        <div className="text-[#888] text-[9px] mb-0.5">涨幅</div>
        <div className="font-bold text-[#FF6B35]">+257%</div>
      </div>
      <div className="text-center flex-1">
        <div className="text-[#888] text-[9px] mb-0.5">超越</div>
        <div className="font-bold text-[#FFD700]">98%股票</div>
      </div>
    </div>
  );
};

export default HistoryBar;