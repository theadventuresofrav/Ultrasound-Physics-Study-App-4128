import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import AchievementBadge from './AchievementBadge';
import * as FiIcons from 'react-icons/fi';

const { FiX, FiAward } = FiIcons;

function AchievementsModal({ isOpen, onClose, achievements, unlockedAchievements }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl p-6 w-full max-w-3xl"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <SafeIcon 
                icon={FiAward} 
                className="text-2xl text-yellow-500" 
              />
              <h2 className="text-2xl font-bold text-medical-900">Achievements</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-medical-100 rounded-lg transition-colors"
            >
              <SafeIcon icon={FiX} />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Object.values(achievements).map(achievement => (
              <div 
                key={achievement.id} 
                className="flex flex-col items-center text-center space-y-3"
              >
                <AchievementBadge
                  achievement={achievement}
                  unlocked={unlockedAchievements.includes(achievement.id)}
                  size="lg"
                />
                <div>
                  <div className="font-bold text-medical-900">
                    {achievement.name}
                  </div>
                  <div className="text-sm text-medical-600">
                    {achievement.description}
                  </div>
                  {unlockedAchievements.includes(achievement.id) && (
                    <div className="text-xs text-primary-600 mt-1">
                      +{achievement.xp} XP
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-medical-600">
            {unlockedAchievements.length} of {Object.keys(achievements).length} achievements unlocked
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AchievementsModal;