import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiClock } = FiIcons;

function ExamTimer({ remainingTime }) {
  // Format time as hours:minutes:seconds
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Determine color based on remaining time
  const getTimerColor = () => {
    if (remainingTime <= 300) { // 5 minutes or less
      return "text-red-600 bg-red-50";
    } else if (remainingTime <= 900) { // 15 minutes or less
      return "text-yellow-600 bg-yellow-50";
    } else {
      return "text-medical-600 bg-medical-50";
    }
  };
  
  const timeColor = getTimerColor();
  const isLowTime = remainingTime <= 300;
  
  return (
    <motion.div
      animate={isLowTime ? { scale: [1, 1.05, 1] } : {}}
      transition={isLowTime ? { repeat: Infinity, duration: 1 } : {}}
      className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${timeColor}`}
    >
      <SafeIcon icon={FiClock} className={isLowTime ? "animate-pulse" : ""} />
      <span className="font-mono font-medium">{formatTime(remainingTime)}</span>
    </motion.div>
  );
}

export default ExamTimer;