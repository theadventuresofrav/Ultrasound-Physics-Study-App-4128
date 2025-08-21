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
            // This is simplified - in a real app, you'd track timestamps
            return true; // Placeholder logic
          });
          currentProgress = todayAnswers.length >= 5 ? 1 : 0;
          break;
        case 'speed_challenge':
          // This would need additional tracking of question times
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

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-medical-900">Daily Challenges</h2>
        <div className="text-sm text-medical-600">
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
                  ? 'border-green-300 bg-gradient-to-r from-green-50 to-emerald-50'
                  : 'border-medical-200 bg-white hover:border-primary-300'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${
                  challenge.completed 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-primary-100 text-primary-600'
                }`}>
                  {challenge.completed ? (
                    <SafeIcon icon={FiCheck} className="text-xl" />
                  ) : (
                    <SafeIcon icon={challenge.icon} className="text-xl" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-medical-900">{challenge.title}</h3>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      challenge.completed
                        ? 'bg-green-100 text-green-700'
                        : 'bg-primary-100 text-primary-700'
                    }`}>
                      +{challenge.xp} XP
                    </span>
                  </div>
                  
                  <p className="text-sm text-medical-600 mb-3">{challenge.description}</p>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 h-2 bg-medical-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        className={`h-full rounded-full ${
                          challenge.completed 
                            ? 'bg-green-500' 
                            : 'bg-primary-500'
                        }`}
                      />
                    </div>
                    <span className="text-sm text-medical-600 font-medium">
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