// Update Header.jsx to include achievements button
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStudy } from '../context/StudyContext';
import SafeIcon from '../common/SafeIcon';
import UserProfile from './UserProfile';
import AchievementsModal from './AchievementsModal';
import * as FiIcons from 'react-icons/fi';

const { FiActivity, FiTrendingUp, FiAward, FiClock, FiUser } = FiIcons;

function Header() {
  const { state, ACHIEVEMENTS } = useStudy();
  const { progress, user } = state;
  const [showProfile, setShowProfile] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);

  const completionRate = Math.round(
    (progress.correctAnswers.length / progress.questionsAnswered.length) * 100
  ) || 0;

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/90 backdrop-blur-sm border-b border-medical-200 px-6 py-4 sticky top-0 z-40"
      >
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center"
            >
              <SafeIcon icon={FiActivity} className="text-white text-xl" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-medical-900">
                Ultrasound Physics Study Guide
              </h1>
              <p className="text-sm text-medical-600">
                Master the fundamentals with interactive learning
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-6">
            {/* Achievements Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowAchievements(true)}
              className="flex items-center space-x-2 bg-yellow-50 px-3 py-2 rounded-lg"
            >
              <SafeIcon icon={FiAward} className="text-yellow-600" />
              <span className="text-sm font-semibold text-yellow-700">
                {state.achievements.length} Achievements
              </span>
            </motion.button>

            {/* User Profile Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowProfile(true)}
              className="flex items-center space-x-3 bg-gradient-to-r from-primary-50 to-blue-50 px-4 py-2 rounded-xl border border-primary-200 hover:shadow-md transition-all"
            >
              <div className="text-2xl">{user.avatar}</div>
              <div className="text-left">
                <div className="font-semibold text-medical-900 text-sm">
                  {user.name}
                </div>
                <div className="text-xs text-primary-600">Level {user.level}</div>
              </div>
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg"
            >
              <SafeIcon icon={FiTrendingUp} className="text-green-600" />
              <span className="text-sm font-semibold text-green-700">
                {completionRate}% Accuracy
              </span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 bg-purple-50 px-3 py-2 rounded-lg"
            >
              <SafeIcon icon={FiClock} className="text-purple-600" />
              <span className="text-sm font-semibold text-purple-700">
                {Math.round(progress.studyTime / 60)}min
              </span>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <UserProfile 
        isOpen={showProfile} 
        onClose={() => setShowProfile(false)} 
      />
      
      <AchievementsModal
        isOpen={showAchievements}
        onClose={() => setShowAchievements(false)}
        achievements={ACHIEVEMENTS}
        unlockedAchievements={state.achievements}
      />
    </>
  );
}

export default Header;