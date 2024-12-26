import React, { useState } from 'react';
import { FaceScan } from './components/FaceScan';
import { LotteryNumber } from './components/LotteryNumber';
import { generateLotteryNumbers } from './utils/numberGenerator';
import { Scan } from 'lucide-react';

function App() {
  const [lotteryNumbers, setLotteryNumbers] = useState<number[]>([]);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleFaceDetected = (landmarks: any) => {
    const numbers = generateLotteryNumbers(landmarks);
    setLotteryNumbers(numbers);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Scan className="w-10 h-10 text-blue-500" />
            <h1 className="text-4xl font-bold text-gray-800">
              Facial Lottery Generator
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Let your unique facial features determine your lucky lottery numbers! 
            Simply scan your face to generate your personalized combination.
          </p>
        </div>

        {lotteryNumbers.length > 0 ? (
          <LotteryNumber numbers={lotteryNumbers} capturedImage={capturedImage} />
        ) : (
          <FaceScan 
            onFaceDetected={(landmarks) => {
              handleFaceDetected(landmarks);
              setCapturedImage(capturedImage);
            }} 
          />
        )}
      </div>
    </div>
  );
}

export default App;