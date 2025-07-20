import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiLock } = FiIcons;

function AchievementBadge({ achievement, unlocked, size = 'md' }) {
  const sizeClasses = {
    sm: 'w-12 h-12 text-lg',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-20 h-20 text-3xl'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`relative group ${unlocked ? 'cursor-pointer' : 'cursor-not-allowed'}`}
    >
      <div
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center
        ${unlocked 
          ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-lg' 
          : 'bg-gray-200'
        }`}
      >
        {unlocked ? (
          <div className="text-white">{achievement.icon}</div>
        ) : (
          <SafeIcon icon={FiLock} className="text-gray-400" />
        )}
      </div>
      
      {/* Hover tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-48">
        <div className="bg-white rounded-lg shadow-lg p-3 text-center border border-medical-200">
          <div className="font-bold text-medical-900">{achievement.name}</div>
          <div className="text-sm text-medical-600">{achievement.description}</div>
          {unlocked && (
            <div className="text-xs text-primary-600 mt-1">+{achievement.xp} XP</div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default AchievementBadge;