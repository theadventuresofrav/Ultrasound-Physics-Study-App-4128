import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useStudy } from '../context/StudyContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrophy, FiTrendingUp, FiUsers, FiStar } = FiIcons;

// Mock leaderboard data - in a real app, this would come from a backend
const MOCK_LEADERBOARD = [
  { id: 1, name: 'Alex Chen', avatar: '🏆', level: 15, xp: 1847, accuracy: 94, streak: 23 },
  { id: 2, name: 'Sarah Johnson', avatar: '⭐', level: 12, xp: 1456, accuracy: 91, streak: 18 },
  { id: 3, name: 'Mike Rodriguez', avatar: '🚀', level: 11, xp: 1332, accuracy: 89, streak: 15 },
  { id: 4, name: 'Emma Thompson', avatar: '💎', level: 10, xp: 1198, accuracy: 87, streak: 12 },
  { id: 5, name: 'David Kim', avatar: '⚡', level: 9, xp: 1056, accuracy: 85, streak: 10 },
];

function Leaderboard() {
  const { state } = useStudy();
  const [timeframe, setTimeframe] = useState('weekly');
  const [category, setCategory] = useState('xp');

  // Add current user to leaderboard
  const currentUserEntry = {
    id: 'current',
    name: state.user.name,
    avatar: state.user.avatar,
    level: state.user.level,
    xp: state.user.xp,
    accuracy: Math.round((state.progress.correctAnswers.length / Math.max(state.progress.questionsAnswered.length, 1)) * 100) || 0,
    streak: state.progress.streaks.longest,
    isCurrentUser: true
  };

  const fullLeaderboard = [...MOCK_LEADERBOARD, currentUserEntry]
    .sort((a, b) => {
      switch (category) {
        case 'xp':
          return b.xp - a.xp;
        case 'accuracy':
          return b.accuracy - a.accuracy;
        case 'streak':
          return b.streak - a.streak;
        default:
          return b.xp - a.xp;
      }
    });

  const currentUserRank = fullLeaderboard.findIndex(entry => entry.isCurrentUser) + 1;

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'text-yellow-600 bg-yellow-50';
      case 2: return 'text-gray-600 bg-gray-50';
      case 3: return 'text-orange-600 bg-orange-50';
      default: return 'text-medical-600 bg-medical-50';
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <SafeIcon icon={FiTrophy} className="text-2xl text-yellow-600" />
          <h2 className="text-2xl font-bold text-medical-900">Leaderboard</h2>
        </div>
        
        <div className="flex space-x-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="text-sm border border-medical-200 rounded-lg px-3 py-1"
          >
            <option value="xp">XP</option>
            <option value="accuracy">Accuracy</option>
            <option value="streak">Streak</option>
          </select>
          
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="text-sm border border-medical-200 rounded-lg px-3 py-1"
          >
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="alltime">All Time</option>
          </select>
        </div>
      </div>

      {/* Current User Rank */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="mb-4 p-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl border-2 border-primary-200"
      >
        <div className="flex items-center space-x-4">
          <div className={`px-3 py-1 rounded-full text-sm font-bold ${getRankColor(currentUserRank)}`}>
            {getRankIcon(currentUserRank)}
          </div>
          <div className="text-3xl">{currentUserEntry.avatar}</div>
          <div className="flex-1">
            <h3 className="font-bold text-medical-900">{currentUserEntry.name} (You)</h3>
            <div className="flex items-center space-x-4 text-sm text-medical-600">
              <span>Level {currentUserEntry.level}</span>
              <span>{currentUserEntry.xp} XP</span>
              <span>{currentUserEntry.accuracy}% accuracy</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-600">#{currentUserRank}</div>
            <div className="text-xs text-medical-600">Your Rank</div>
          </div>
        </div>
      </motion.div>

      {/* Leaderboard */}
      <div className="space-y-3">
        {fullLeaderboard.slice(0, 10).map((entry, index) => {
          const rank = index + 1;
          
          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                entry.isCurrentUser
                  ? 'border-primary-300 bg-primary-50 shadow-md'
                  : 'border-medical-200 bg-white hover:border-primary-200 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`px-3 py-1 rounded-full text-sm font-bold ${getRankColor(rank)}`}>
                  {getRankIcon(rank)}
                </div>
                
                <div className="text-2xl">{entry.avatar}</div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-medical-900">
                    {entry.name}
                    {entry.isCurrentUser && <span className="text-primary-600 ml-2">(You)</span>}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-medical-600">
                    <span>Level {entry.level}</span>
                    <span>{entry.xp} XP</span>
                    <span>{entry.accuracy}% accuracy</span>
                    <span>🔥 {entry.streak}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-medical-900">
                    {category === 'xp' && `${entry.xp} XP`}
                    {category === 'accuracy' && `${entry.accuracy}%`}
                    {category === 'streak' && `${entry.streak} 🔥`}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4 text-center">
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          View Full Leaderboard
        </button>
      </div>
    </div>
  );
}

export default Leaderboard;