import React, { createContext, useContext, useReducer, useEffect } from 'react';

const StudyContext = createContext();

const initialState = {
  user: {
    name: 'Study Warrior',
    avatar: '🎯',
    level: 1,
    xp: 0,
    title: 'Novice Sonographer',
    joinDate: new Date().toISOString(),
    interests: 'Ultrasound Physics, Medical Imaging, Sonography',
    background: 'Sonography Student with interest in vascular applications'
  },
  progress: {
    sectionsCompleted: [],
    questionsAnswered: [],
    correctAnswers: [],
    studyTime: 0,
    streaks: {
      current: 0,
      longest: 0,
      daily: 0
    },
    lastStudyDate: null
  },
  achievements: [],
  badges: [],
  currentSection: null,
  quizResults: [],
  challenges: [],
  leaderboard: [],
  socialActivity: [],
  preferences: {
    theme: 'light',
    studyMode: 'guided',
    showExplanations: true,
    notifications: true,
    soundEffects: true
  }
};

// Achievement definitions
const ACHIEVEMENTS = {
  FIRST_CORRECT: {
    id: 'first_correct',
    name: 'First Success',
    description: 'Answer your first question correctly',
    xp: 10,
    icon: '✨'
  },
  FIVE_STREAK: {
    id: 'five_streak',
    name: 'On Fire',
    description: 'Get 5 questions correct in a row',
    xp: 25,
    icon: '🔥'
  },
  TEN_STREAK: {
    id: 'ten_streak',
    name: 'Unstoppable',
    description: 'Get 10 questions correct in a row',
    xp: 50,
    icon: '⚡'
  },
  SECTION_MASTER: {
    id: 'section_master',
    name: 'Section Master',
    description: 'Complete a section with 100% accuracy',
    xp: 100,
    icon: '👑'
  },
  QUIZ_PERFECTIONIST: {
    id: 'quiz_perfectionist',
    name: 'Perfect Quiz',
    description: 'Score 100% on a practice quiz',
    xp: 75,
    icon: '💎'
  },
  SPEED_DEMON: {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Complete a quiz in under 5 minutes',
    xp: 40,
    icon: '💨'
  },
  NIGHT_OWL: {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Study after 10 PM',
    xp: 15,
    icon: '🦉'
  },
  EARLY_BIRD: {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Study before 7 AM',
    xp: 15,
    icon: '🐦'
  },
  DEDICATED_LEARNER: {
    id: 'dedicated_learner',
    name: 'Dedicated Learner',
    description: 'Study for 7 days in a row',
    xp: 200,
    icon: '📚'
  },
  KNOWLEDGE_SEEKER: {
    id: 'knowledge_seeker',
    name: 'Knowledge Seeker',
    description: 'Answer 100 questions',
    xp: 150,
    icon: '🧠'
  },
  PHYSICS_PRODIGY: {
    id: 'physics_prodigy',
    name: 'Physics Prodigy',
    description: 'Achieve 90%+ accuracy overall',
    xp: 300,
    icon: '🏆'
  }
};

// XP and leveling system
const XP_PER_LEVEL = 100;
const getLevel = (xp) => Math.floor(xp / XP_PER_LEVEL) + 1;
const getXPForNextLevel = (xp) => (Math.floor(xp / XP_PER_LEVEL) + 1) * XP_PER_LEVEL;

function studyReducer(state, action) {
  switch (action.type) {
    case 'LOAD_PROGRESS':
      return { ...state, ...action.payload };

    case 'UPDATE_USER_PROFILE':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };

    case 'ANSWER_QUESTION':
      const { questionId, isCorrect, sectionId, timeSpent } = action.payload;
      const newAnswered = [...state.progress.questionsAnswered, questionId];
      const newCorrect = isCorrect 
        ? [...state.progress.correctAnswers, questionId] 
        : state.progress.correctAnswers;
      const newStreak = isCorrect ? state.progress.streaks.current + 1 : 0;

      let xpGained = 0;
      let newAchievements = [...state.achievements];

      // XP calculation
      if (isCorrect) {
        xpGained = 5; // Base XP for correct answer
        if (newStreak >= 5) xpGained += 2; // Streak bonus
        if (timeSpent && timeSpent < 10) xpGained += 3; // Speed bonus
      }

      // Check for achievements
      const checkAchievement = (achievementId) => {
        if (!state.achievements.includes(achievementId)) {
          newAchievements.push(achievementId);
          xpGained += ACHIEVEMENTS[achievementId].xp;
          return true;
        }
        return false;
      };

      if (isCorrect && state.progress.correctAnswers.length === 0) {
        checkAchievement('FIRST_CORRECT');
      }
      if (newStreak === 5) checkAchievement('FIVE_STREAK');
      if (newStreak === 10) checkAchievement('TEN_STREAK');
      if (newAnswered.length === 100) checkAchievement('KNOWLEDGE_SEEKER');

      const newXP = state.user.xp + xpGained;
      const newLevel = getLevel(newXP);
      const leveledUp = newLevel > state.user.level;

      return {
        ...state,
        user: {
          ...state.user,
          xp: newXP,
          level: newLevel
        },
        progress: {
          ...state.progress,
          questionsAnswered: newAnswered,
          correctAnswers: newCorrect,
          streaks: {
            ...state.progress.streaks,
            current: newStreak,
            longest: Math.max(newStreak, state.progress.streaks.longest)
          },
          lastStudyDate: new Date().toISOString()
        },
        achievements: newAchievements,
        leveledUp,
        xpGained
      };

    case 'COMPLETE_SECTION':
      return {
        ...state,
        progress: {
          ...state.progress,
          sectionsCompleted: [...state.progress.sectionsCompleted, action.payload]
        }
      };

    case 'ADD_STUDY_TIME':
      const studyHour = new Date().getHours();
      let timeAchievements = [...state.achievements];
      let timeXP = 0;

      if (studyHour >= 22 || studyHour <= 2) {
        if (!timeAchievements.includes('NIGHT_OWL')) {
          timeAchievements.push('NIGHT_OWL');
          timeXP += ACHIEVEMENTS.NIGHT_OWL.xp;
        }
      }
      if (studyHour >= 5 && studyHour <= 7) {
        if (!timeAchievements.includes('EARLY_BIRD')) {
          timeAchievements.push('EARLY_BIRD');
          timeXP += ACHIEVEMENTS.EARLY_BIRD.xp;
        }
      }

      return {
        ...state,
        user: {
          ...state.user,
          xp: state.user.xp + timeXP
        },
        progress: {
          ...state.progress,
          studyTime: state.progress.studyTime + action.payload
        },
        achievements: timeAchievements
      };

    case 'SAVE_QUIZ_RESULT':
      const quizResult = action.payload;
      let quizXP = Math.floor(quizResult.percentage / 10) * 5; // 5 XP per 10%
      let quizAchievements = [...state.achievements];

      if (quizResult.percentage === 100) {
        if (!quizAchievements.includes('QUIZ_PERFECTIONIST')) {
          quizAchievements.push('QUIZ_PERFECTIONIST');
          quizXP += ACHIEVEMENTS.QUIZ_PERFECTIONIST.xp;
        }
      }

      if (quizResult.timeElapsed < 300) { // 5 minutes
        if (!quizAchievements.includes('SPEED_DEMON')) {
          quizAchievements.push('SPEED_DEMON');
          quizXP += ACHIEVEMENTS.SPEED_DEMON.xp;
        }
      }

      return {
        ...state,
        user: {
          ...state.user,
          xp: state.user.xp + quizXP
        },
        quizResults: [...state.quizResults, quizResult],
        achievements: quizAchievements
      };

    case 'SAVE_EXAM_RESULT':
      return {
        ...state,
        examResults: [...(state.examResults || []), action.payload]
      };

    case 'ADD_CHALLENGE':
      return {
        ...state,
        challenges: [...state.challenges, action.payload]
      };

    case 'COMPLETE_CHALLENGE':
      const challenge = state.challenges.find(c => c.id === action.payload);
      const challengeXP = challenge ? challenge.xp : 0;

      return {
        ...state,
        user: {
          ...state.user,
          xp: state.user.xp + challengeXP
        },
        challenges: state.challenges.map(c =>
          c.id === action.payload ? { ...c, completed: true } : c
        )
      };

    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload }
      };

    case 'CLEAR_NOTIFICATIONS':
      return {
        ...state,
        leveledUp: false,
        xpGained: 0
      };

    default:
      return state;
  }
}

export function StudyProvider({ children }) {
  const [state, dispatch] = useReducer(studyReducer, initialState);

  useEffect(() => {
    const savedState = localStorage.getItem('sonography-school-2025-spi-progress');
    if (savedState) {
      dispatch({ type: 'LOAD_PROGRESS', payload: JSON.parse(savedState) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sonography-school-2025-spi-progress', JSON.stringify(state));
  }, [state]);

  return (
    <StudyContext.Provider value={{
      state,
      dispatch,
      ACHIEVEMENTS,
      getLevel,
      getXPForNextLevel
    }}>
      {children}
    </StudyContext.Provider>
  );
}

export function useStudy() {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudy must be used within StudyProvider');
  }
  return context;
}