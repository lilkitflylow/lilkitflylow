import React from 'react';
import { SESSION_ANALYSIS } from '../constants';
import { Sun, Moon } from 'lucide-react';

const SessionSummary: React.FC = () => {
  return (
    <div className="bg-[#FAF9F6] border-b border-[#D0D0D0] p-3">
      <div className="flex gap-3 overflow-x-auto no-scrollbar">
        {/* Morning */}
        <div className="bg-white border border-[#E0E0E0] rounded-sm p-2.5 min-w-[200px] flex-1 shadow-sm">
           <div className="flex items-center text-[#B08D55] text-[10px] font-bold mb-1.5 uppercase tracking-wider">
             <Sun size={12} className="mr-1.5" /> 上午盘走势
           </div>
           <div className="text-[11px] text-[#444] leading-tight text-justify font-yahei">
             {SESSION_ANALYSIS.morning}
           </div>
        </div>
        
        {/* Afternoon */}
        <div className="bg-white border border-[#E0E0E0] rounded-sm p-2.5 min-w-[200px] flex-1 shadow-sm">
           <div className="flex items-center text-[#555] text-[10px] font-bold mb-1.5 uppercase tracking-wider">
             <Moon size={12} className="mr-1.5" /> 下午盘总结
           </div>
           <div className="text-[11px] text-[#444] leading-tight text-justify font-yahei">
             {SESSION_ANALYSIS.afternoon}
           </div>
        </div>
      </div>
    </div>
  );
};

export default SessionSummary;
