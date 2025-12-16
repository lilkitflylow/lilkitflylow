import React from 'react';

const MarketOverview: React.FC = () => {
  return (
    <div className="px-6 py-8 text-center bg-paper">
      <div className="font-serif text-[#B08D55] text-[18px] font-bold mb-3 tracking-[0.25em]">
        市场手札
      </div>
      <div className="font-serif text-[#444] text-[12px] leading-7 max-w-[90%] mx-auto text-justify-center">
        <span className="font-bold text-[#222]">今日摘要：</span>
        纳指在科技权重带领下再创新高，<span className="text-[#B08D55] font-bold">英伟达</span>与<span className="text-[#B08D55] font-bold">博通</span>表现抢眼。
        国会山资金流向显示，<span className="border-b border-[#B08D55]">佩洛西家族</span>再次押注半导体板块。
        通胀预期回落，十年期美债收益率下行至4.1%。
      </div>
      <div className="w-8 h-[2px] bg-[#B08D55] mx-auto mt-6 opacity-50"></div>
    </div>
  );
};

export default MarketOverview;