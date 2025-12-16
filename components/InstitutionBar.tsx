import React from 'react';
import { INSTITUTION_MOVES } from '../constants';

const InstitutionBar: React.FC = () => {
  return (
    <div className="bg-[#F7F5F0] py-2.5 overflow-x-auto whitespace-nowrap no-scrollbar border-b border-[#E0E0E0]">
      <div className="px-4 flex gap-6">
        {INSTITUTION_MOVES.map((move, index) => (
          <div key={index} className="inline-flex items-center text-[11px] text-[#555] bg-white border border-[#E5E5E5] px-3 py-1.5 rounded-sm shadow-sm">
            <span className="text-[#9D8140] font-bold mr-2 font-serif">{move.name}</span>
            <span className="mr-2">{move.action}</span>
            <span className={`font-bold ${move.trend === 'up' ? 'text-[#B08D55]' : 'text-[#999]'}`}>
              {move.trend === 'up' ? '↑' : '↓'}
            </span>
            <span className="ml-2 text-[9px] text-[#AAA] font-mono">{move.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstitutionBar;