import React from 'react';
import { motion } from 'framer-motion';
import { useStudy } from '../context/StudyContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiFire, FiCalendar, FiTrendingUp, FiTarget } = FiIcons;

function StudyStreak() {
  const { state } = useStudy();
  const { progress } = state;

  // Generate last 7 days for streak visualization
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      date: date.toISOString().split('T')[0],
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      studied: Math.random() > 0.3 // Mock data - in real app, check actual study activity
    };
  });

  const currentStreak = 7; // Mock current streak
  const streakGoal = 14;
  const longestStreak = 12;

  return (
    <div className="glass-card rounded-3xl p-6 border-2 border-orange-200/50 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg animate-glow">
            <SafeIcon icon={FiFire} className="text-2xl text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Study Streak</h3>
            <p className="text-sm text-gray-600">Keep the momentum going! 🔥</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            {currentStreak}
          </div>
          <div className="text-sm text-gray-600 font-medium">days</div>
        </div>
      </div>

      {/* Streak Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-md">
          <div className="flex items-center space-x-2 mb-2">
            <SafeIcon icon={FiTarget} className="text-orange-600" />
            <span className="text-sm font-medium text-gray-700">Current Goal</span>
          </div>
          <div className="text-lg font-bold text-gray-900">{streakGoal} days</div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-md">
          <div className="flex items-center space-x-2 mb-2">
            <SafeIcon icon={FiTrendingUp} className="text-orange-600" />
            <span className="text-sm font-medium text-gray-700">Best Streak</span>
          </div>
          <div className="text-lg font-bold text-gray-900">{longestStreak} days</div>
        </div>
      </div>

      {/* Enhanced Streak Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <span className="font-medium">Goal Progress</span>
          <span className="font-bold text-gray-900">{currentStreak}/{streakGoal}</span>
        </div>
        <div className="progress-bar">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(currentStreak / streakGoal) * 100}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full shadow-lg"
          />
        </div>
      </div>

      {/* Enhanced Weekly Calendar */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
          <SafeIcon icon={FiCalendar} className="mr-2 text-orange-600" />
          This Week
        </h4>
        <div className="grid grid-cols-7 gap-2">
          {last7Days.map((day, index) => (
            <motion.div
              key={day.date}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-xs font-medium text-gray-600 mb-2">{day.day}</div>
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-md hover:shadow-lg ${
                  day.studied
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white scale-110 animate-glow'
                    : 'bg-white border-2 border-gray-200 text-gray-400 hover:border-gray-300'
                }`}
              >
                {day.studied ? '🔥' : '○'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Motivational Message */}
      <div className="text-center">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-md">
          <p className="text-sm font-medium text-gray-700 mb-2">
            🎯 You're doing amazing!
          </p>
          <p className="text-xs text-gray-600">
            Study today to extend your streak to {currentStreak + 1} days
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudyStreak;