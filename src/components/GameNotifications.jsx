import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudy } from '../context/StudyContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiAward, FiZap } = FiIcons;

function GameNotifications() {
  const { state, dispatch, ACHIEVEMENTS } = useStudy();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const newNotifications = [];

    if (state.leveledUp) {
      newNotifications.push({
        id: 'level_up',
        type: 'level',
        title: `Level Up! 🎉`,
        message: `You've reached Level ${state.user.level}!`,
        icon: FiTrendingUp,
        color: 'from-purple-500 to-pink-500'
      });

      // Trigger confetti for level up
      try {
        import('canvas-confetti').then(module => {
          const confetti = module.default;
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        });
      } catch (error) {
        console.warn('Confetti effect not available:', error);
      }
    }

    if (state.xpGained > 0 && !state.leveledUp) {
      newNotifications.push({
        id: 'xp_gained',
        type: 'xp',
        title: `+${state.xpGained} XP`,
        message: 'Great job!',
        icon: FiZap,
        color: 'from-blue-500 to-cyan-500'
      });
    }

    // Check for new achievements
    const lastAchievements = JSON.parse(localStorage.getItem('lastAchievements') || '[]');
    const newAchievements = state.achievements.filter(id => !lastAchievements.includes(id));

    newAchievements.forEach(achievementId => {
      const achievement = ACHIEVEMENTS[achievementId];
      if (achievement) {
        newNotifications.push({
          id: `achievement_${achievementId}`,
          type: 'achievement',
          title: `Achievement Unlocked! ${achievement.icon}`,
          message: achievement.name,
          description: achievement.description,
          icon: FiAward,
          color: 'from-yellow-500 to-orange-500'
        });

        // Trigger confetti for achievements
        try {
          import('canvas-confetti').then(module => {
            const confetti = module.default;
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.7 },
              colors: ['#FFD700', '#FFA500', '#FF6347']
            });
          });
        } catch (error) {
          console.warn('Confetti effect not available:', error);
        }
      }
    });

    localStorage.setItem('lastAchievements', JSON.stringify(state.achievements));

    if (newNotifications.length > 0) {
      setNotifications(newNotifications);
      // Auto-clear notifications after 4 seconds
      setTimeout(() => {
        setNotifications([]);
        dispatch({ type: 'CLEAR_NOTIFICATIONS' });
      }, 4000);
    }
  }, [state.leveledUp, state.xpGained, state.achievements, dispatch, ACHIEVEMENTS]);

  return (
    <div className="fixed top-20 right-6 z-50 space-y-3">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            className={`bg-gradient-to-r ${notification.color} p-4 rounded-xl shadow-lg text-white min-w-80 max-w-sm`}
          >
            <div className="flex items-start space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <SafeIcon icon={notification.icon} className="text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{notification.title}</h3>
                <p className="text-white/90">{notification.message}</p>
                {notification.description && (
                  <p className="text-white/70 text-sm mt-1">{notification.description}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default GameNotifications;