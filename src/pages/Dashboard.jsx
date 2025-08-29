import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStudy } from '../context/StudyContext';
import { sections } from '../data/questions';
import StudySection from '../components/StudySection';
import DailyChallenges from '../components/DailyChallenges';
import StudyStreak from '../components/StudyStreak';
import AchievementPanel from '../components/AchievementPanel';
import Leaderboard from '../components/Leaderboard';
import RecommendedStudyMaterials from '../components/RecommendedEpisodes';
import AgainstAllOddsInspiration from '../components/AgainstAllOddsInspiration';
import GameNotifications from '../components/GameNotifications';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTarget, FiBook, FiCpu, FiClock, FiTool, FiGraduationCap, FiZap, FiTrendingUp, FiAward, FiUsers, FiArrowRight, FiStar, FiPlay } = FiIcons;

function Dashboard() {
  const { state } = useStudy();
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('morning');
    else if (hour < 17) setTimeOfDay('afternoon');
    else setTimeOfDay('evening');
  }, []);

  const getGreeting = () => {
    const name = state.user?.name || 'Learner';
    const greetings = {
      morning: `Good morning, ${name}! ☀️`,
      afternoon: `Good afternoon, ${name}! 🌤️`,
      evening: `Good evening, ${name}! 🌙`
    };
    return greetings[timeOfDay] || `Hello, ${name}! 👋`;
  };

  // Quick stats for dashboard
  const quickStats = [
    {
      label: 'Study Streak',
      value: `${state.progress.streaks.current} days`,
      icon: FiZap,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
      change: '+2 from yesterday'
    },
    {
      label: 'Questions Answered',
      value: state.progress.questionsAnswered.length,
      icon: FiTarget,
      color: 'from-blue-500 to-purple-500',
      bgColor: 'from-blue-50 to-purple-50',
      change: '+15 this week'
    },
    {
      label: 'Accuracy Rate',
      value: `${Math.round((state.progress.correctAnswers.length / Math.max(state.progress.questionsAnswered.length, 1)) * 100)}%`,
      icon: FiTrendingUp,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      change: '+5% improvement'
    },
    {
      label: 'Current Level',
      value: state.user.level,
      icon: FiAward,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      change: `${state.user.xp}/300 XP`
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <GameNotifications />

      {/* Enhanced Welcome Section */}
      <div className="relative overflow-hidden">
        <div className="glass-card rounded-3xl p-8 border-2 border-primary-200/50">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="heading-1 mb-4 text-gradient">
                {getGreeting()}
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Master ultrasound physics and ace your SPI exam with our comprehensive, AI-powered learning platform
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {quickStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`bg-gradient-to-br ${stat.bgColor} p-4 rounded-2xl border border-white/50 hover-lift group`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 rounded-xl bg-gradient-to-r ${stat.color} text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                        <SafeIcon icon={stat.icon} className="text-lg" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
                    <div className="text-xs text-gray-500">{stat.change}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-20 h-20 bg-primary-500 rounded-full blur-xl animate-float"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-purple-500 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
      </div>

      {/* Enhanced Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'SPI Courses',
            description: 'AI-powered comprehensive learning',
            icon: FiGraduationCap,
            link: '/courses',
            color: 'from-blue-500 to-blue-600',
            bgColor: 'from-blue-50 to-blue-100',
            highlight: 'Most Popular'
          },
          {
            title: 'Physics Tools',
            description: 'Interactive calculators & simulators',
            icon: FiTool,
            link: '/physics-tools',
            color: 'from-green-500 to-green-600',
            bgColor: 'from-green-50 to-green-100',
            highlight: 'Hands-on Learning'
          },
          {
            title: 'Comprehensive Exam',
            description: '110-question practice test',
            icon: FiTarget,
            link: '/comprehensive-exam',
            color: 'from-purple-500 to-purple-600',
            bgColor: 'from-purple-50 to-purple-100',
            highlight: 'Full Length'
          },
          {
            title: 'AI Tutor',
            description: 'Get instant physics help',
            icon: FiCpu,
            link: '/chat-tutor',
            color: 'from-orange-500 to-orange-600',
            bgColor: 'from-orange-50 to-orange-100',
            highlight: 'AI Powered'
          }
        ].map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="group relative"
          >
            <Link to={card.link}>
              <div className={`glass-card rounded-2xl p-6 hover-lift group-hover:shadow-2xl transition-all duration-300 bg-gradient-to-br ${card.bgColor} border-2 border-white/50`}>
                {/* Highlight Badge */}
                <div className="absolute -top-2 -right-2">
                  <span className="px-3 py-1 bg-gradient-to-r from-primary-500 to-blue-500 text-white text-xs font-bold rounded-full shadow-lg">
                    {card.highlight}
                  </span>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${card.color} text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                    <SafeIcon icon={card.icon} className="text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary-700 transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Start Learning
                  </span>
                  <SafeIcon 
                    icon={FiArrowRight} 
                    className="text-primary-500 group-hover:translate-x-1 group-hover:text-primary-600 transition-all duration-300" 
                  />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Enhanced Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column - Primary Content */}
        <div className="xl:col-span-2 space-y-8">
          {/* Enhanced Study Sections */}
          <div className="glass-card rounded-3xl p-8 border-2 border-gray-200/50">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="heading-2 mb-2 flex items-center">
                  <SafeIcon icon={FiBook} className="mr-3 text-primary-600" />
                  Study Sections
                </h2>
                <p className="text-gray-600">Master each topic with interactive content</p>
              </div>
              <Link 
                to="/courses" 
                className="btn-primary text-sm"
              >
                View All Courses
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <StudySection section={section} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Enhanced Inspiration Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <AgainstAllOddsInspiration />
          </motion.div>

          {/* Enhanced Study Materials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <RecommendedStudyMaterials />
          </motion.div>
        </div>

        {/* Right Column - Sidebar Content */}
        <div className="space-y-8">
          {/* Enhanced Study Streak */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <StudyStreak />
          </motion.div>

          {/* Enhanced Daily Challenges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <DailyChallenges />
          </motion.div>

          {/* Enhanced Leaderboard */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Leaderboard />
          </motion.div>

          {/* Quick Access Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="glass-card rounded-2xl p-6 border-2 border-primary-200/50"
          >
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <SafeIcon icon={FiZap} className="mr-2 text-yellow-500" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Take Practice Quiz', link: '/quiz/practice', icon: FiPlay, color: 'text-blue-600' },
                { label: 'Chat with AI Tutor', link: '/chat-tutor', icon: FiCpu, color: 'text-purple-600' },
                { label: 'View Progress', link: '/progress', icon: FiTrendingUp, color: 'text-green-600' }
              ].map((action, index) => (
                <Link
                  key={action.label}
                  to={action.link}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-200 group"
                >
                  <SafeIcon icon={action.icon} className={`${action.color} group-hover:scale-110 transition-transform duration-200`} />
                  <span className="font-medium text-gray-700 group-hover:text-gray-900">{action.label}</span>
                  <SafeIcon icon={FiArrowRight} className="ml-auto text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Achievement Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <AchievementPanel />
      </motion.div>

      {/* Motivational Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="glass-card rounded-3xl p-8 border-2 border-primary-200/50 text-center bg-gradient-to-r from-primary-50 to-blue-50"
      >
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Ready to Master Ultrasound Physics? 🚀
          </h3>
          <p className="text-gray-600 mb-6">
            Join thousands of students who have successfully passed their SPI exams with our comprehensive platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses" className="btn-primary">
              <SafeIcon icon={FiGraduationCap} className="mr-2" />
              Start Learning Now
            </Link>
            <Link to="/comprehensive-exam" className="btn-secondary">
              <SafeIcon icon={FiTarget} className="mr-2" />
              Take Practice Exam
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;