import React from 'react';

interface ScanOverlayProps {
  isActive: boolean;
}

export const ScanOverlay: React.FC<ScanOverlayProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 border-4 border-blue-500/30 rounded-2xl" />
      <div className="absolute inset-16 border-2 border-dashed border-blue-500/50 rounded-xl animate-pulse" />
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-blue-500/90 text-white px-4 py-2 rounded-full text-sm font-medium">
        Align your face within the frame
      </div>
    </div>
  );
};