import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { Camera, Sparkles } from 'lucide-react';
import { CameraButton } from './CameraButton';
import { ScanOverlay } from './ScanOverlay';
import { ProcessingScreen } from './ProcessingScreen';

interface FaceScanProps {
  onFaceDetected: (landmarks: any) => void;
}

export const FaceScan: React.FC<FaceScanProps> = ({ onFaceDetected }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    try {
      const MODEL_URL = 'https://justadudewhohacks.github.io/face-api.js/models';
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
      ]);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      console.error('Error loading models:', error);
      setError('Failed to load face detection models. Please refresh the page.');
      setIsLoading(false);
    }
  };

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        setError(null);
      }
    } catch (error) {
      setError('Unable to access camera. Please ensure you have granted camera permissions.');
    }
  };

  const stopVideo = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoRef.current, 0, 0);
      setCapturedImage(canvas.toDataURL('image/jpeg'));
    }
  };

  const handleVideoPlay = () => {
    const interval = setInterval(async () => {
      if (videoRef.current && canvasRef.current) {
        try {
          const detections = await faceapi
            .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks();

          if (detections) {
            setIsProcessing(true);
            captureImage();
            stopVideo();
            
            // Simulate AI processing time
            setTimeout(() => {
              onFaceDetected(detections.landmarks);
              setIsProcessing(false);
            }, 2000);
          }
        } catch (error) {
          setError('Error detecting face. Please try again.');
          stopVideo();
        }
      }
    }, 100);

    return () => clearInterval(interval);
  };

  if (isProcessing) {
    return <ProcessingScreen capturedImage={capturedImage} />;
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <Sparkles className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-gray-600">Preparing the magic...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative animate-fade-in">
              {error}
            </div>
          )}
          
          <div className="relative aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl overflow-hidden shadow-lg">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              onPlay={handleVideoPlay}
            />
            <canvas ref={canvasRef} className="absolute top-0 left-0" />
            <ScanOverlay isActive={isCameraActive} />
          </div>
          
          <CameraButton 
            isActive={isCameraActive}
            onClick={isCameraActive ? stopVideo : startVideo}
          />
        </div>
      )}
    </div>
  );
};