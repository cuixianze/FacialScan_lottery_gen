import React from 'react';
import { Camera, X } from 'lucide-react';

interface CameraButtonProps {
  isActive: boolean;
  onClick: () => void;
}

export const CameraButton: React.FC<CameraButtonProps> = ({ isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center justify-center gap-2 px-6 py-3 
        rounded-xl font-medium transition-all transform hover:scale-105
        ${isActive 
          ? 'bg-red-500 hover:bg-red-600 text-white' 
          : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700'
        }
        shadow-lg hover:shadow-xl
      `}
    >
      {isActive ? (
        <>
          <X className="w-5 h-5" />
          Stop Camera
        </>
      ) : (
        <>
          <Camera className="w-5 h-5" />
          Take Your Lucky Shot!
        </>
      )}
    </button>
  );
};