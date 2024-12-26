export const generateLotteryNumbers = (landmarks: any): number[] => {
  // Convert landmarks to array of coordinates
  const points = landmarks.positions;
  
  // Use facial features to generate seed
  const seed = points.reduce((acc: number, point: { x: number; y: number }) => {
    return acc + (point.x * point.y);
  }, 0);
  
  // Generate 6 unique numbers between 1 and 49
  const numbers: number[] = [];
  const seededRandom = () => {
    let x = Math.sin(seed + numbers.length) * 10000;
    return x - Math.floor(x);
  };
  
  while (numbers.length < 6) {
    const num = Math.floor(seededRandom() * 49) + 1;
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }
  
  return numbers.sort((a, b) => a - b);
};