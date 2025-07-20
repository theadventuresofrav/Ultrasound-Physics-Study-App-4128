import React from 'react';
import { motion } from 'framer-motion';
import { useStudy } from '../context/StudyContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiAward, FiLock } = FiIcons;

function AchievementPanel() {
  const { state, ACHIEVEMENTS } = useStudy();

  const achievementsList = Object.values(ACHIEVEMENTS);
  const unlockedCount = state.achievements.length;
  const totalCount = achievementsList.length;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-medical-900">Achievements</h2>
        <div className="text-sm text-medical-600">
          {unlockedCount}/{totalCount} Unlocked
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievementsList.map((achievement) => {
          const isUnlocked = state.achievements.includes(achievement.id);
          
          return (
            <motion.div
              key={achievement.id}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                isUnlocked
                  ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-md'
                  : 'border-medical-200 bg-medical-50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`text-2xl p-2 rounded-lg ${
                  isUnlocked ? 'bg-yellow-100' : 'bg-medical-200'
                }`}>
                  {isUnlocked ? achievement.icon : (
                    <SafeIcon icon={FiLock} className="text-medical-400" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className={`font-bold mb-1 ${
                    isUnlocked ? 'text-medical-900' : 'text-medical-500'
                  }`}>
                    {achievement.name}
                  </h3>
                  <p className={`text-sm mb-2 ${
                    isUnlocked ? 'text-medical-700' : 'text-medical-400'
                  }`}>
                    {achievement.description}
                  </p>
                  <div className={`inline-flex items-center space-x-1 text-xs px-2 py-1 rounded-full ${
                    isUnlocked 
                      ? 'bg-yellow-200 text-yellow-800' 
                      : 'bg-medical-200 text-medical-600'
                  }`}>
                    <SafeIcon icon={FiAward} />
                    <span>{achievement.xp} XP</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default AchievementPanel;