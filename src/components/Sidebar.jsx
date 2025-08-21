import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { sections } from '../data/questions';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiHome, FiBook, FiTarget, FiBarChart3, FiZap, FiRadio, FiSettings, 
  FiActivity, FiShield, FiDatabase, FiMessageSquare, FiAward, FiCpu, 
  FiClock, FiTool, FiCreditCard, FiBookOpen, FiGraduationCap 
} = FiIcons;

const iconMap = { FiZap, FiRadio, FiSettings, FiActivity, FiShield };

function Sidebar() {
  const location = useLocation();

  const navigationItems = [
    { path: '/', icon: FiHome, label: 'Dashboard' },
    { path: '/courses', icon: FiGraduationCap, label: 'SPI Courses', highlight: true },
    { path: '/physics-tools', icon: FiTool, label: 'Physics Tools', highlight: true },
    { path: '/chat-tutor', icon: FiCpu, label: 'Chat Tutor' },
    { path: '/spi-mock-exam', icon: FiClock, label: 'SPI 2025-2026 Mock Exam' },
    { path: '/quiz/practice', icon: FiTarget, label: 'Practice Quiz' },
    { path: '/jeopardy', icon: FiAward, label: 'Jeopardy Game' },
    { path: '/progress', icon: FiBarChart3, label: 'Progress' },
    { path: '/knowledge', icon: FiMessageSquare, label: 'Knowledge Center' },
    { path: '/knowledge-base', icon: FiDatabase, label: 'Knowledge Base' },
    { path: '/contacts', icon: FiDatabase, label: 'Contacts' },
    { path: '/pricing', icon: FiCreditCard, label: 'Pricing', highlight: true }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white/90 backdrop-blur-sm border-r border-medical-200 z-40">
      <div className="p-6">
        {/* Navigation */}
        <nav className="space-y-2 mb-8">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                location.pathname === item.path || 
                (item.path === '/courses' && location.pathname.startsWith('/courses'))
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'text-medical-700 hover:bg-primary-50 hover:text-primary-700'
              } ${item.highlight ? 'ring-2 ring-primary-200' : ''}`}
            >
              <SafeIcon icon={item.icon} className="text-lg" />
              <span className="font-medium">{item.label}</span>
              {item.highlight && (
                <span className="ml-auto text-xs bg-primary-200 text-primary-800 px-2 py-1 rounded-full">
                  NEW
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Study Sections */}
        <div className="border-t border-medical-200 pt-6">
          <h3 className="text-xs font-semibold text-medical-500 uppercase tracking-wider mb-4">
            Quick Study Sections
          </h3>
          <div className="space-y-2">
            {sections.map((section) => {
              const IconComponent = iconMap[section.icon] || FiBook;
              return (
                <Link
                  key={section.id}
                  to={`/study/${section.id}`}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                    location.pathname === `/study/${section.id}`
                      ? 'bg-primary-100 text-primary-700 border-l-4 border-primary-500'
                      : 'text-medical-600 hover:bg-medical-50 hover:text-medical-900'
                  }`}
                >
                  <div className={`p-1.5 rounded ${section.color} text-white`}>
                    <SafeIcon icon={IconComponent} className="text-xs" />
                  </div>
                  <span className="truncate">{section.title}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Study Tips Quick Link */}
        <div className="border-t border-medical-200 pt-6 mt-6">
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-4 border border-primary-200">
            <div className="flex items-center space-x-3 mb-2">
              <SafeIcon icon={FiBookOpen} className="text-primary-600" />
              <span className="font-semibold text-medical-900">Enhanced Learning</span>
            </div>
            <p className="text-xs text-medical-600 mb-3">
              AI-powered courses and interactive tools
            </p>
            <div className="space-y-2">
              <Link
                to="/courses"
                className="block text-xs bg-primary-500 text-white px-3 py-2 rounded-lg hover:bg-primary-600 transition-colors text-center"
              >
                SPI Courses
              </Link>
              <Link
                to="/physics-tools"
                className="block text-xs bg-white text-primary-700 px-3 py-2 rounded-lg hover:bg-primary-50 transition-colors text-center border border-primary-200"
              >
                Physics Tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;