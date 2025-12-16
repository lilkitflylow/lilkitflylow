import React from 'react';
import { StockCategory } from '../types';

interface FilterBarProps {
  activeCategory: StockCategory;
  onSelect: (category: StockCategory) => void;
}

const CATEGORIES: StockCategory[] = [
  '智算', '硬件', '医药', '金控', 
  '能源', '材料', '制造', '加密'
];

const FilterBar: React.FC<FilterBarProps> = ({ activeCategory, onSelect }) => {
  return (
    <div className="h-[50px] bg-[#FDFDFB] border-b border-[#D0D0D0] flex items-center justify-between px-2 w-full z-30 shadow-sm sticky top-0 overflow-x-auto no-scrollbar">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`
            shrink-0 w-[42px] py-1.5 mx-0.5 rounded-sm text-[13px] font-bold tracking-tight transition-all duration-300 font-yahei
            ${activeCategory === cat 
              ? 'text-[#B08D55] bg-[#F7F5F0] border border-[#B08D55] shadow-sm scale-105' 
              : 'text-[#666] hover:text-[#333] hover:bg-[#F0F0F0]'}
          `}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
