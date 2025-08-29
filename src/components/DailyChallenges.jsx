import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudy } from '../context/StudyContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTarget, FiClock, FiTrendingUp, FiZap, FiCheck, FiStar, FiAward } = FiIcons;

const DAILY_CHALLENGES = [
  {
    id: 'daily_streak',
    title: 'Daily Streak',
    description: 'Answer 10 questions correctly',
    icon: FiZap,
    target: 10,
    xp: 50,
    type: 'correct_answers',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'speed_round',
    title: 'Speed Round',
    description: 'Complete 5 questions in under 2 minutes',
    icon: FiClock,
    target: 5,
    timeLimit: 120,
    xp: 75,
    type: 'speed_challenge',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'section_focus',
    title: 'Section Focus',
    description: 'Study one complete section today',
    icon: FiTarget,
    target: 1,
    xp: 100,
    type: 'section_complete',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'accuracy_master',
    title: 'Accuracy Master',
    description: 'Maintain 80%+ accuracy for 20 questions',
    icon: FiTrendingUp,
    target: 20,
    accuracy: 80,
    xp: 125,
    type: 'accuracy_challenge',
    color: 'from-purple-500 to-pink-500'
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

  const updateChallengeProgress = (challengeId, progress) => {
    const challenge = todayChallenges.find(c => c.id === challengeId);
    if (challenge && progress >= challenge.target && !challenge.completed) {
      dispatch({ type: 'COMPLETE_CHALLENGE', payload: challengeId });
    }
  };

  // Update challenge progress based on user activity
  useEffect(() => {
    todayChallenges.forEach(challenge => {
      let currentProgress = 0;
      
      switch (challenge.type) {
        case 'correct_answers':
          currentProgress = state.progress.correctAnswers.length;
          break;
        case 'section_complete':
          const today = new Date().toDateString();
          const todayAnswers = state.progress.questionsAnswered.filter(id => {
            return true; // Placeholder logic
          });
          currentProgress = todayAnswers.length >= 5 ? 1 : 0;
          break;
        case 'speed_challenge':
          currentProgress = 0;
          break;
        case 'accuracy_challenge':
          const recent20 = state.progress.questionsAnswered.slice(-20);
          const recent20Correct = state.progress.correctAnswers.filter(id =>
            recent20.includes(id)
          );
          const accuracy = recent20.length > 0 ? (recent20Correct.length / recent20.length) * 100 : 0;
          currentProgress = accuracy >= challenge.accuracy ? recent20.length : 0;
          break;
      }
      
      updateChallengeProgress(challenge.id, currentProgress);
    });
  }, [state.progress, todayChallenges]);

  if (todayChallenges.length === 0) {
    return null;
  }

  const completedCount = todayChallenges.filter(c => c.completed).length;
  const totalChallenges = todayChallenges.length;

  return (
    <div className="glass-card rounded-3xl p-6 border-2 border-primary-200/50 bg-gradient-to-br from-primary-50 to-blue-50 shadow-xl">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-primary-500 to-blue-500 rounded-2xl shadow-lg">
            <SafeIcon icon={FiStar} className="text-2xl text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Daily Challenges</h2>
            <p className="text-sm text-gray-600">Complete challenges to earn XP</p>
          </div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/50 shadow-md">
          <div className="text-sm font-medium text-gray-600">
            {completedCount}/{totalChallenges} Complete
          </div>
          <div className="w-16 h-1 bg-gray-200 rounded-full mt-1">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / totalChallenges) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Enhanced Challenges */}
      <div className="space-y-4">
        <AnimatePresence>
          {todayChallenges.map((challenge, index) => {
            const progressPercent = Math.min((challenge.progress / challenge.target) * 100, 100);
            const challengeData = DAILY_CHALLENGES.find(c => challenge.id.startsWith(c.id));
            
            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`relative overflow-hidden p-5 rounded-2xl border-2 transition-all duration-300 shadow-lg hover:shadow-xl ${
                  challenge.completed
                    ? 'border-green-300 bg-gradient-to-r from-green-50 via-emerald-50 to-green-50'
                    : 'border-white/50 bg-white/70 backdrop-blur-sm hover:border-primary-300/50'
                }`}
              >
                {/* Completion Celebration Effect */}
                {challenge.completed && (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 animate-pulse" />
                )}

                <div className="relative z-10 flex items-center space-x-4">
                  {/* Enhanced Icon */}
                  <div className={`p-4 rounded-2xl shadow-lg transition-all duration-300 ${
                    challenge.completed
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white animate-bounce-gentle'
                      : challengeData ? `bg-gradient-to-r ${challengeData.color} text-white` : 'bg-gradient-to-r from-primary-500 to-blue-500 text-white'
                  }`}>
                    <SafeIcon 
                      icon={challenge.completed ? FiCheck : (challengeData?.icon || FiTarget)} 
                      className="text-xl" 
                    />
                  </div>

                  {/* Challenge Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900">{challenge.title}</h3>
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`px-3 py-1 rounded-full text-xs font-bold shadow-md ${
                          challenge.completed
                            ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                            : 'bg-gradient-to-r from-primary-400 to-blue-500 text-white'
                        }`}
                      >
                        +{challenge.xp} XP
                      </motion.span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4 font-medium">{challenge.description}</p>
                    
                    {/* Enhanced Progress Bar */}
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercent}%` }}
                          transition={{ duration: 1.0, ease: "easeOut" }}
                          className={`h-full rounded-full shadow-sm ${
                            challenge.completed
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                              : challengeData ? `bg-gradient-to-r ${challengeData.color}` : 'bg-gradient-to-r from-primary-500 to-blue-500'
                          }`}
                        />
                      </div>
                      <span className="text-sm font-bold text-gray-700 min-w-0">
                        {challenge.progress}/{challenge.target}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Completion Badge */}
                {challenge.completed && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute top-3 right-3"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                      <SafeIcon icon={FiCheck} className="text-white text-sm" />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Motivational Footer */}
      <div className="mt-6 text-center">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-md">
          <p className="text-sm font-medium text-gray-700 mb-1">
            🌟 Challenge yourself daily to accelerate your learning!
          </p>
          <p className="text-xs text-gray-600">
            Complete all challenges to unlock bonus XP and achievements
          </p>
        </div>
      </div>
    </div>
  );
}

export default DailyChallenges;