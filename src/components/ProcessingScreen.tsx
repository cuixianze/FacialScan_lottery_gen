import React from 'react';
import { Brain, Sparkles } from 'lucide-react';

interface ProcessingScreenProps {
  capturedImage: string | null;
}

export const ProcessingScreen: React.FC<ProcessingScreenProps> = ({ capturedImage }) => {
  return (
    <div className="relative w-full max-w-md mx-auto space-y-6 animate-fade-in">
      <div className="relative aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl overflow-hidden shadow-lg">
        {capturedImage && (
          <img 
            src={capturedImage} 
            alt="Captured face"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Brain className="w-6 h-6 text-blue-500 animate-pulse" />
            <Sparkles className="w-6 h-6 text-indigo-500 animate-bounce" />
          </div>
          <p className="text-lg font-medium text-gray-800">
            AI is analyzing your facial features...
          </p>
          <p className="text-sm text-gray-600">
            Generating your personalized lucky numbers
          </p>
        </div>
      </div>
    </div>
  );
};