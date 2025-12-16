import React from 'react';
import { TICKER_ITEMS } from '../constants';
import { TickerItem } from '../types';

interface NewsTickerProps {
  items?: TickerItem[];
}

const NewsTicker: React.FC<NewsTickerProps> = ({ items = TICKER_ITEMS }) => {
  return (
    <div className="bg-[#F7F5F0] border-b border-[#E0E0E0] py-2.5 overflow-hidden relative">
      <div className="flex animate-ticker whitespace-nowrap w-max">
        {[...items, ...items].map((item, index) => (
          <div key={index} className="inline-flex items-center mr-16 text-[11px] font-serif tracking-wide">
            <span className="text-[#999] font-mono mr-2 text-[10px]">{item.time}</span>
            <span className="text-[#333] font-medium">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsTicker;
