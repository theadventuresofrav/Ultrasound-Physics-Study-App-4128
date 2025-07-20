import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { sections } from '../data/questions';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHome, FiBook, FiTarget, FiBarChart3, FiZap, FiRadio, FiSettings, FiActivity, FiShield, FiUsers, FiDatabase, FiMessageSquare } = FiIcons;

const iconMap = { FiZap, FiRadio, FiSettings, FiActivity, FiShield };

function Sidebar() {
  const location = useLocation();

  const navigationItems = [
    { path: '/', icon: FiHome, label: 'Dashboard' },
    { path: '/quiz/practice', icon: FiTarget, label: 'Practice Quiz' },
    { path: '/multiplayer', icon: FiUsers, label: 'Multiplayer' },
    { path: '/progress', icon: FiBarChart3, label: 'Progress' },
    { path: '/knowledge', icon: FiMessageSquare, label: 'Knowledge Center' },
    { path: '/knowledge-base', icon: FiDatabase, label: 'Knowledge Base' },
    { path: '/contacts', icon: FiUsers, label: 'Contacts' }
  ];

  const getSectionProgress = (sectionId) => {
    // Mock progress calculation
    return Math.floor(Math.random() * 100);
  };

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white/90 backdrop-blur-sm border-r border-medical-200 p-4 overflow-y-auto"
    >
      <nav className="space-y-2">
        {navigationItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
              location.pathname === item.path
                ? 'bg-primary-100 text-primary-700 shadow-sm'
                : 'text-medical-600 hover:bg-medical-50 hover:text-medical-900'
            }`}
          >
            <SafeIcon icon={item.icon} className="text-lg" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-8">
        <h3 className="text-sm font-semibold text-medical-700 mb-3 px-3">
          Study Sections
        </h3>
        <div className="space-y-2">
          {sections.map((section) => {
            const progress = getSectionProgress(section.id);
            const IconComponent = iconMap[section.icon];
            
            return (
              <Link
                key={section.id}
                to={`/study/${section.id}`}
                className="block"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`p-3 rounded-lg border transition-all duration-200 ${
                    location.pathname === `/study/${section.id}`
                      ? 'border-primary-300 bg-primary-50 shadow-sm'
                      : 'border-medical-200 bg-white hover:border-primary-200 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${section.color} text-white`}>
                      <SafeIcon icon={IconComponent} className="text-sm" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-medical-900 text-sm leading-tight">
                        {section.title}
                      </h4>
                      <p className="text-xs text-medical-600 mt-1 line-clamp-2">
                        {section.description}
                      </p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-medical-600">Progress</span>
                          <span className="font-semibold text-medical-700">
                            {progress}%
                          </span>
                        </div>
                        <div className="mt-1 h-1.5 bg-medical-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`h-full ${section.color} rounded-full`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.aside>
  );
}

export default Sidebar;