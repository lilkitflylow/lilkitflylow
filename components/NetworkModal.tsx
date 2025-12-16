import React from 'react';
import { X } from 'lucide-react';
import { NETWORK_NODES } from '../constants';

interface NetworkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NetworkModal: React.FC<NetworkModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col p-5 overflow-y-auto animate-fade-in backdrop-blur-sm">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-[#333] text-white rounded-full hover:bg-[#444] transition-colors"
      >
        <X size={18} />
      </button>

      <div className="mt-8 text-white">
        <h3 className="text-[#FFD700] text-center font-bold text-lg mb-6">科技AI板块关联网络</h3>
        
        <div className="space-y-4">
          {NETWORK_NODES.map((node, idx) => (
            <div key={idx} className="bg-[#222] p-3 rounded-lg border-l-[3px] border-[#9B59B6] shadow-lg shadow-purple-900/10">
              <div className="font-bold text-[13px] mb-1.5 text-[#FFD700]">{node.title}</div>
              <div className="text-[11px] text-[#AAA] leading-relaxed font-mono">
                {node.content.map((line, i) => (
                  <div key={i} className="mb-1 last:mb-0">{line}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NetworkModal;