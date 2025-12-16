import React, { useState } from 'react';
import { X, ChevronLeft, PieChart, TrendingUp, DollarSign } from 'lucide-react';
import { GURUS } from '../constants';
import { GuruProfile } from '../types';

interface GuruModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GuruModal: React.FC<GuruModalProps> = ({ isOpen, onClose }) => {
  const [selectedGuru, setSelectedGuru] = useState<GuruProfile | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#F7F5F0] flex flex-col animate-book-fade w-full h-full overflow-hidden">
      
      {/* Header */}
      <div className="bg-[#1A1A1A] text-[#B08D55] px-4 py-3 flex items-center justify-between shadow-md shrink-0">
        {selectedGuru ? (
           <button onClick={() => setSelectedGuru(null)} className="flex items-center text-sm font-bold">
             <ChevronLeft size={18} className="mr-1" /> 返回列表
           </button>
        ) : (
           <h3 className="text-lg font-bold font-serif tracking-widest">机构持仓追踪</h3>
        )}
        <button 
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center bg-[#333] text-white rounded-full hover:bg-[#444]"
        >
          <X size={18} />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar bg-[#F0F0EB] pb-safe">
        
        {/* VIEW 1: GURU LIST */}
        {!selectedGuru && (
          <div className="pb-8">
             {/* Sticky Header */}
             <div className="sticky top-0 z-20 bg-[#EAE8E0] border-b border-[#D0D0D0] shadow-sm">
                <div className="flex items-center h-[36px] text-[11px] text-[#666] font-yahei px-4">
                  <div className="w-[120px]">机构名称</div>
                  <div className="flex-1 text-right">管理规模</div>
                  <div className="w-[80px] text-right">1年回报</div>
                </div>
             </div>

             {/* Rows */}
             {GURUS.map((guru) => (
               <div 
                 key={guru.id}
                 onClick={() => setSelectedGuru(guru)}
                 className="flex items-center h-[70px] px-4 border-b border-[#DCDCDC] bg-white active:bg-[#F5F5F5] transition-colors cursor-pointer"
               >
                  <div className="w-[130px] flex items-center">
                     <div className="w-10 h-10 rounded-full bg-[#1A1A1A] text-[#B08D55] flex items-center justify-center font-serif text-lg border border-[#B08D55] mr-3 shrink-0 shadow-sm">
                       {guru.avatar}
                     </div>
                     <div>
                       <div className="text-[14px] font-bold text-[#333] leading-tight">{guru.name}</div>
                       <div className="text-[10px] text-[#888] mt-1">{guru.title}</div>
                     </div>
                  </div>
                  <div className="flex-1 text-right">
                     <div className="text-[14px] font-mono font-medium text-[#444]">{guru.aum}</div>
                     <div className="text-[10px] text-[#999] mt-0.5">Top: {guru.topHolding}</div>
                  </div>
                  <div className="w-[80px] text-right">
                     <div className="inline-block bg-[#F0F8F0] text-[#2E7D32] border border-[#C8E6C9] px-2 py-1 rounded text-[12px] font-bold font-mono">
                       {guru.return1y}
                     </div>
                  </div>
               </div>
             ))}
             <div className="text-center py-8 text-[11px] text-[#999]">
               数据更新于: 2025/12/15 14:30 EST
             </div>
          </div>
        )}

        {/* VIEW 2: GURU DETAILS */}
        {selectedGuru && (
          <div className="p-4 pb-8">
             <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] p-5 mb-4">
                <div className="flex items-start mb-5">
                   <div className="w-14 h-14 rounded-full bg-[#1A1A1A] text-[#B08D55] flex items-center justify-center font-serif text-3xl border-2 border-[#B08D55] mr-4 shadow-lg shrink-0">
                      {selectedGuru.avatar}
                   </div>
                   <div>
                      <h2 className="text-xl font-bold text-[#222] font-serif">{selectedGuru.name}</h2>
                      <div className="text-[12px] text-[#666] mt-2 italic leading-relaxed">"{selectedGuru.desc}"</div>
                   </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-[#F9F9F9] p-3 rounded border border-[#EEE]">
                      <div className="flex items-center text-[10px] text-[#888] mb-1">
                         <DollarSign size={12} className="mr-1"/> 管理规模 (AUM)
                      </div>
                      <div className="text-[15px] font-bold text-[#333] font-mono">{selectedGuru.aum}</div>
                   </div>
                   <div className="bg-[#F9F9F9] p-3 rounded border border-[#EEE]">
                      <div className="flex items-center text-[10px] text-[#888] mb-1">
                         <TrendingUp size={12} className="mr-1"/> 年度回报 (1Y)
                      </div>
                      <div className="text-[15px] font-bold text-[#2E7D32] font-mono">{selectedGuru.return1y}</div>
                   </div>
                </div>
             </div>

             <div className="bg-white rounded-lg shadow-sm border border-[#E0E0E0] overflow-hidden">
                <div className="bg-[#FAFAFA] px-5 py-3 border-b border-[#EEE] flex items-center">
                   <PieChart size={16} className="text-[#B08D55] mr-2" />
                   <span className="text-[13px] font-bold text-[#555]">前五大重仓股配置</span>
                </div>
                
                <div className="divide-y divide-[#F0F0F0]">
                   {selectedGuru.holdings.map((h, i) => (
                      <div key={h.symbol} className="px-5 py-4 relative">
                         <div className="flex justify-between items-center relative z-10">
                            <div className="flex items-center">
                               <div className="w-6 h-6 rounded flex items-center justify-center text-[11px] font-bold text-white mr-3 shadow-sm" style={{backgroundColor: h.color}}>
                                  {i + 1}
                               </div>
                               <div>
                                  <div className="text-[14px] font-bold text-[#333]">{h.symbol}</div>
                                  <div className="text-[11px] text-[#888]">{h.name}</div>
                               </div>
                            </div>
                            <div className="text-[14px] font-bold font-mono text-[#333]">{h.percent}%</div>
                         </div>
                         {/* Progress Bar Background */}
                         <div className="absolute bottom-0 left-0 h-[3px] opacity-40 transition-all duration-1000" style={{width: `${h.percent * 2}%`, backgroundColor: h.color}}></div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default GuruModal;
