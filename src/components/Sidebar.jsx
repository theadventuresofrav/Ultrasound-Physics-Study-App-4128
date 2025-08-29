import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { sections } from '../data/questions';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiHome, FiBook, FiTarget, FiBarChart3, FiZap, FiRadio, FiSettings, 
  FiActivity, FiShield, FiDatabase, FiMessageSquare, FiAward, FiCpu, 
  FiClock, FiTool, FiCreditCard, FiBookOpen, FiGraduationCap, 
  FiChevronDown, FiStar
} = FiIcons;

const iconMap = {
  FiZap, FiRadio, FiSettings, FiActivity, FiShield
};

function Sidebar() {
  const location = useLocation();
  const [isQuickStudyExpanded, setIsQuickStudyExpanded] = useState(false);

  const navigationItems = [
    { path: '/', icon: FiHome, label: 'Dashboard' },
    { path: '/courses', icon: FiGraduationCap, label: 'SPI Courses', highlight: true },
    { path: '/physics-tools', icon: FiTool, label: 'Physics Tools', highlight: true },
    { path: '/chat-tutor', icon: FiCpu, label: 'AI Tutor' },
    { path: '/spi-mock-exam', icon: FiClock, label: 'Mock Exam' },
    { path: '/quiz/practice', icon: FiTarget, label: 'Practice Quiz' },
    { path: '/jeopardy', icon: FiAward, label: 'Jeopardy Game' },
    { path: '/progress', icon: FiBarChart3, label: 'Progress' },
    { path: '/knowledge', icon: FiMessageSquare, label: 'Knowledge Hub' },
    { path: '/contacts', icon: FiDatabase, label: 'Contacts' },
    { path: '/pricing', icon: FiCreditCard, label: 'Upgrade', highlight: true }
  ];

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-0 h-full w-72 glass-card border-r border-gray-200/50 z-40 overflow-y-auto custom-scrollbar"
    >
      <div className="p-6">
        {/* Navigation Header */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
            <SafeIcon icon={FiBookOpen} className="mr-2 text-primary-500" />
            Learning Hub
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full"></div>
        </div>

        {/* Main Navigation */}
        <nav className="space-y-2 mb-8">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                location.pathname === item.path || (item.path === '/courses' && location.pathname.startsWith('/courses'))
                  ? 'bg-gradient-to-r from-primary-500 to-blue-500 text-white shadow-lg shadow-primary-500/25'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <SafeIcon icon={item.icon} className="text-lg" />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.highlight && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-2 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold rounded-full shadow-md"
                >
                  NEW
                </motion.span>
              )}
            </Link>
          ))}
        </nav>

        {/* Quick Study Sections */}
        <div className="border-t border-gray-200 pt-6">
          <button
            onClick={() => setIsQuickStudyExpanded(!isQuickStudyExpanded)}
            className="w-full flex items-center justify-between mb-4 text-left group"
          >
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
              Quick Study
            </h3>
            <motion.div
              animate={{ rotate: isQuickStudyExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <SafeIcon icon={FiChevronDown} className="text-gray-400 group-hover:text-gray-600" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isQuickStudyExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                {sections.map((section) => {
                  const IconComponent = iconMap[section.icon] || FiBook;
                  return (
                    <Link
                      key={section.id}
                      to={`/study/${section.id}`}
                      className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                        location.pathname === `/study/${section.id}`
                          ? 'bg-gradient-to-r from-primary-100 to-blue-100 text-primary-700 border-l-4 border-primary-500'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg ${section.color} text-white shadow-md group-hover:shadow-lg transition-all duration-200`}>
                        <SafeIcon icon={IconComponent} className="text-xs" />
                      </div>
                      <span className="truncate font-medium">{section.title}</span>
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Enhanced Learning Section */}
        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className="bg-gradient-to-br from-primary-50 via-blue-50 to-purple-50 rounded-2xl p-6 border border-primary-200/50 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <SafeIcon icon={FiStar} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Premium Learning</h3>
                <p className="text-xs text-gray-600">AI-powered education</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <Link
                to="/courses"
                className="block w-full text-center py-2.5 bg-gradient-to-r from-primary-500 to-blue-500 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                SPI Courses
              </Link>
              <Link
                to="/physics-tools"
                className="block w-full text-center py-2.5 bg-white text-primary-700 font-medium rounded-xl hover:bg-primary-50 transition-all duration-200 border border-primary-200 shadow-sm"
              >
                Physics Tools
              </Link>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-800">Study Progress</span>
            <span className="text-sm font-bold text-green-700">67%</span>
          </div>
          <div className="progress-bar">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '67%' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="progress-fill"
            />
          </div>
          <p className="text-xs text-green-600 mt-2">Keep up the great work! 🎯</p>
        </div>
      </div>
    </motion.div>
  );
}

export default Sidebar;