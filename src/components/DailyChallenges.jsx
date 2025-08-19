import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStudy } from '../context/StudyContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTarget, FiClock, FiTrendingUp, FiZap, FiCheck } = FiIcons;

const DAILY_CHALLENGES = [
  {
    id: 'daily_streak',
    title: 'Daily Streak',
    description: 'Answer 10 questions correctly',
    icon: FiZap,
    target: 10,
    xp: 50,
    type: 'correct_answers'
  },
  {
    id: 'speed_round',
    title: 'Speed Round',
    description: 'Complete 5 questions in under 2 minutes',
    icon: FiClock,
    target: 5,
    timeLimit: 120,
    xp: 75,
    type: 'speed_challenge'
  },
  {
    id: 'section_focus',
    title: 'Section Focus',
    description: 'Study one complete section today',
    icon: FiTarget,
    target: 1,
    xp: 100,
    type: 'section_complete'
  },
  {
    id: 'accuracy_master',
    title: 'Accuracy Master',
    description: 'Maintain 80%+ accuracy for 20 questions',
    icon: FiTrendingUp,
    target: 20,
    accuracy: 80,
    xp: 125,
    type: 'accuracy_challenge'
  }
];

function DailyChallenges() {
  const { state, dispatch } = useStudy();

  useEffect(() => {
    // Generate daily challenges if not already present
    const today = new Date().toDateString();
    const existingChallenges = state.challenges.filter(c =>
      new Date(c.date).toDateString() === today
    );

    if (existingChallenges.length === 0) {
      // Add 2 random challenges for today
      const shuffled = [...DAILY_CHALLENGES].sort(() => Math.random() - 0.5);
      const todayChallenges = shuffled.slice(0, 2).map(challenge => ({
        ...challenge,
        id: `${challenge.id}_${Date.now()}`,
        date: new Date().toISOString(),
        progress: 0,
        completed: false
      }));

      todayChallenges.forEach(challenge => {
        dispatch({ type: 'ADD_CHALLENGE', payload: challenge });
      });
    }
  }, [state.challenges, dispatch]);

  const todayChallenges = state.challenges.filter(c =>
    new Date(c.date).toDateString() === new Date().toDateString()
  );

  if (todayChallenges.length === 0) {
    return null;
  }

  return (
    <div className="dark-card rounded-2xl p-6 border border-primary-500/30 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-200">Daily Challenges</h2>
        <div className="text-sm text-slate-400">
          {todayChallenges.filter(c => c.completed).length}/{todayChallenges.length} Complete
        </div>
      </div>

      <div className="space-y-4">
        {todayChallenges.map((challenge) => {
          const progressPercent = Math.min((challenge.progress / challenge.target) * 100, 100);
          
          return (
            <motion.div
              key={challenge.id}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                challenge.completed
                  ? 'border-green-500/30 bg-green-500/10 shadow-lg shadow-green-500/20'
                  : 'border-dark-600 bg-dark-800/30 hover:border-primary-500/30'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${
                  challenge.completed
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                }`}>
                  {challenge.completed ? (
                    <SafeIcon icon={FiCheck} className="text-xl" />
                  ) : (
                    <SafeIcon icon={challenge.icon} className="text-xl" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-200">{challenge.title}</h3>
                    <span className={`text-sm px-2 py-1 rounded-full border ${
                      challenge.completed
                        ? 'bg-green-500/20 text-green-400 border-green-500/30'
                        : 'bg-primary-500/20 text-primary-400 border-primary-500/30'
                    }`}>
                      +{challenge.xp} XP
                    </span>
                  </div>
                  
                  <p className="text-sm text-slate-400 mb-3">{challenge.description}</p>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 h-2 bg-dark-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        className={`h-full rounded-full ${
                          challenge.completed ? 'bg-green-500' : 'bg-primary-500'
                        }`}
                      />
                    </div>
                    <span className="text-sm text-slate-400 font-medium">
                      {challenge.progress}/{challenge.target}
                    </span>
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

export default DailyChallenges;