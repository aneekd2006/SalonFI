import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function BottomSheet({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0" style={{ background: 'var(--bg-overlay)' }} />
      {/* Sheet */}
      <div
        className="relative w-full max-w-lg bg-surface-card rounded-t-2xl shadow-xl animate-slide-up max-h-[85vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
        style={{
          animation: 'slideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
          paddingBottom: 'env(safe-area-inset-bottom, 16px)',
        }}
      >
        {/* Handle */}
        <div className="sticky top-0 bg-surface-card z-10 px-4 pt-3 pb-2 border-b border-border flex items-center justify-between">
          <div className="flex-1" />
          <div className="w-10 h-1 rounded-full bg-border mx-auto" />
          <button onClick={onClose} className="p-1 touch-target flex items-center justify-center -mr-2">
            <X size={20} className="text-text-secondary" />
          </button>
        </div>
        {title && (
          <div className="px-6 pt-4 pb-2">
            <h3 className="text-lg font-bold text-text-primary">{title}</h3>
          </div>
        )}
        <div className="px-6 py-4">
          {children}
        </div>
      </div>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}