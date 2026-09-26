import React, { useEffect } from 'react';
import { X, Play } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      id="video-showreel-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-neutral-950 border border-white/15 rounded-2xl overflow-hidden shadow-2xl shadow-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-neutral-900/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#a8f300] animate-pulse" />
            <h3 className="text-sm font-geist font-medium text-white">
              Agency Showreel 2026 • Concepts &amp; Branding
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Container */}
        <div className="relative aspect-video w-full bg-neutral-900 flex items-center justify-center overflow-hidden group">
          {/* Animated Background Reel Simulation */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black via-neutral-900 to-[#162e03]/60 opacity-90" />
          
          <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
            <div className="w-16 h-16 rounded-full bg-[#a8f300] text-black flex items-center justify-center shadow-lg shadow-[#a8f300]/30 hover:scale-105 transition-transform cursor-pointer">
              <Play className="w-7 h-7 fill-current ml-1" />
            </div>
            <div>
              <p className="text-lg font-geist font-semibold text-white">
                Striking Concepts &amp; Digital Innovation
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                Showcasing brand identity, kinetic systems, and digital product designs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
