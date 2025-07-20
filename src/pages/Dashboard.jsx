import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { sections } from '../data/questions';
import SafeIcon from '../common/SafeIcon';
import StudySection from '../components/StudySection';
import DiagramViewer from '../components/DiagramViewer';
import ConversationStarters from '../components/ConversationStarters';
import { getDiagrams } from '../services/diagramService';
import * as FiIcons from 'react-icons/fi';

const { FiTarget, FiBook, FiTrendingUp, FiClock, FiAward, FiActivity, FiCheckCircle, FiArrowRight, FiUsers, FiDatabase, FiImage } = FiIcons;

function Dashboard() {
  const [showDiagrams, setShowDiagrams] = useState(false);
  const [diagrams, setDiagrams] = useState([]);

  // Mock user data - in a real app this would come from context/state
  const mockUser = {
    name: 'Study Warrior',
    role: 'Sonography Student',
    specialty: 'General Ultrasound',
    interests: 'Cardiac imaging, Physics principles',
    background: 'Second year sonography student preparing for registry exams'
  };

  // Mock progress data
  const mockProgress = {
    questionsAnswered: 45,
    correctAnswers: 38,
    studyTime: 180, // minutes
    streaks: { longest: 12 }
  };

  const totalQuestions = sections.reduce((sum, section) => sum + section.questions.length, 0);
  const completionRate = Math.round((mockProgress.correctAnswers / Math.max(mockProgress.questionsAnswered, 1)) * 100);
  const overallProgress = Math.round((mockProgress.questionsAnswered / totalQuestions) * 100);

  const stats = [
    {
      label: 'Questions Answered',
      value: mockProgress.questionsAnswered,
      total: totalQuestions,
      icon: FiCheckCircle,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      label: 'Accuracy Rate',
      value: `${completionRate}%`,
      icon: FiTrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      label: 'Study Time',
      value: `${Math.round(mockProgress.studyTime / 60)}min`,
      icon: FiClock,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      label: 'Best Streak',
      value: mockProgress.streaks.longest,
      icon: FiAward,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    }
  ];

  const handleViewDiagrams = (topic) => {
    const relevantDiagrams = getDiagrams(topic);
    setDiagrams(relevantDiagrams);
    setShowDiagrams(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold text-medical-900 mb-4">
          Welcome to Your Study Dashboard
        </h1>
        <p className="text-lg text-medical-600 max-w-2xl mx-auto">
          Master ultrasound physics with our comprehensive study guide. Track your progress,
          practice with interactive quizzes, and prepare for your certification exam.
        </p>
        <div className="mt-4">
          <button
            onClick={() => handleViewDiagrams("ultrasound physics overview")}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
          >
            <SafeIcon icon={FiImage} />
            <span>View Ultrasound Physics Diagrams</span>
          </button>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-medical-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-medical-900">Your Progress</h2>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary-600">{overallProgress}%</div>
            <div className="text-sm text-medical-600">Complete</div>
          </div>
        </div>
        <div className="h-4 bg-medical-200 rounded-full overflow-hidden mb-6">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${stat.bg} rounded-xl p-4 border border-opacity-20`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                    {stat.total && <span className="text-sm text-medical-500">/{stat.total}</span>}
                  </div>
                  <div className="text-sm text-medical-600">{stat.label}</div>
                </div>
                <SafeIcon icon={stat.icon} className={`text-2xl ${stat.color}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Conversation Starters */}
      <ConversationStarters userInfo={mockUser} />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8 text-white"
        >
          <div className="flex items-center space-x-4 mb-4">
            <SafeIcon icon={FiTarget} className="text-3xl" />
            <div>
              <h3 className="text-xl font-bold">Practice Quiz</h3>
              <p className="opacity-90">Test your knowledge with random questions</p>
            </div>
          </div>
          <Link
            to="/quiz/practice"
            className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
          >
            <span>Start Practice</span>
            <SafeIcon icon={FiArrowRight} />
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white"
        >
          <div className="flex items-center space-x-4 mb-4">
            <SafeIcon icon={FiUsers} className="text-3xl" />
            <div>
              <h3 className="text-xl font-bold">Multiplayer</h3>
              <p className="opacity-90">Compete with AI or other students</p>
            </div>
          </div>
          <Link
            to="/multiplayer"
            className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
          >
            <span>Play Now</span>
            <SafeIcon icon={FiArrowRight} />
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white"
        >
          <div className="flex items-center space-x-4 mb-4">
            <SafeIcon icon={FiDatabase} className="text-3xl" />
            <div>
              <h3 className="text-xl font-bold">Knowledge Base</h3>
              <p className="opacity-90">Access comprehensive study resources</p>
            </div>
          </div>
          <Link
            to="/knowledge"
            className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
          >
            <span>Explore</span>
            <SafeIcon icon={FiArrowRight} />
          </Link>
        </motion.div>
      </div>

      {/* Section Overview */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-medical-200">
        <h2 className="text-2xl font-bold text-medical-900 mb-6">Study Sections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section) => (
            <StudySection key={section.id} section={section} />
          ))}
        </div>
      </div>

      {showDiagrams && (
        <DiagramViewer
          diagrams={diagrams}
          onClose={() => setShowDiagrams(false)}
        />
      )}
    </motion.div>
  );
}

export default Dashboard;