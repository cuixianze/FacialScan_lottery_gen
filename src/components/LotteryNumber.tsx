import React from 'react';
import { Ticket } from 'lucide-react';

interface LotteryNumberProps {
  numbers: number[];
  capturedImage: string | null;
}

export const LotteryNumber: React.FC<LotteryNumberProps> = ({ numbers, capturedImage }) => {
  return (
    <div className="w-full max-w-md mx-auto space-y-6 animate-fade-in">
      {capturedImage && (
        <div className="relative aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl overflow-hidden shadow-lg">
          <img 
            src={capturedImage} 
            alt="Your lucky face"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Ticket className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-800">Your Lucky Numbers</h2>
        </div>
        
        <div className="flex justify-center gap-3">
          {numbers.map((number, index) => (
            <div
              key={index}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-xl font-bold animate-bounce"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {number}
            </div>
          ))}
        </div>
        
        <p className="text-center text-gray-600 text-sm">
          Numbers generated based on your unique facial features
        </p>
      </div>
    </div>
  );
};