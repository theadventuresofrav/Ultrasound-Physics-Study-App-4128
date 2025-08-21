import React from 'react';
import { motion } from 'framer-motion';
import { useStudy } from '../context/StudyContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiFire, FiCalendar } = FiIcons;

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

  // Mock current streak - in real app, calculate from actual data
  const currentStreak = 5;
  const streakGoal = 7;

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <SafeIcon icon={FiFire} className="text-2xl text-orange-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-medical-900">Study Streak</h3>
            <p className="text-sm text-medical-600">Keep the momentum going!</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-3xl font-bold text-orange-600">{currentStreak}</div>
          <div className="text-sm text-medical-600">days</div>
        </div>
      </div>

      {/* Streak Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-medical-600 mb-2">
          <span>Goal: {streakGoal} days</span>
          <span>{currentStreak}/{streakGoal}</span>
        </div>
        <div className="h-2 bg-white rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(currentStreak / streakGoal) * 100}%` }}
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
          />
        </div>
      </div>

      {/* Weekly Calendar */}
      <div className="grid grid-cols-7 gap-2">
        {last7Days.map((day, index) => (
          <div key={day.date} className="text-center">
            <div className="text-xs text-medical-600 mb-1">{day.day}</div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                day.studied
                  ? 'bg-orange-500 text-white'
                  : 'bg-white border-2 border-medical-200 text-medical-400'
              }`}
            >
              {day.studied ? '🔥' : '○'}
            </motion.div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-medical-600">
          Study today to keep your streak alive! 🎯
        </p>
      </div>
    </div>
  );
}

export default StudyStreak;