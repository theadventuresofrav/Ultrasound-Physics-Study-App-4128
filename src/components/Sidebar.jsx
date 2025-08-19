import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { sections } from '../data/questions';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHome, FiBook, FiTarget, FiBarChart3, FiZap, FiRadio, FiSettings, FiActivity, FiShield, FiDatabase, FiMessageSquare, FiAward, FiCpu, FiClock, FiTool, FiCreditCard } = FiIcons;

const iconMap = { FiZap, FiRadio, FiSettings, FiActivity, FiShield };

function Sidebar() {
  const location = useLocation();

  const navigationItems = [
    { path: '/', icon: FiHome, label: 'Dashboard' },
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
    <div className="fixed left-0 top-0 h-full w-64 glass-dark border-r border-dark-700/50 z-40 backdrop-blur-xl">
      <div className="p-6">
        {/* Navigation */}
        <nav className="space-y-2 mb-8">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                location.pathname === item.path
                  ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30 shadow-lg shadow-primary-500/10'
                  : 'text-slate-300 hover:bg-dark-800/50 hover:text-slate-100 border border-transparent'
              } ${item.highlight ? 'ring-1 ring-primary-500/30' : ''}`}
            >
              <SafeIcon icon={item.icon} className="text-lg group-hover:scale-110 transition-transform" />
              <span className="font-medium">{item.label}</span>
              {item.highlight && (
                <span className="ml-auto text-xs bg-primary-500/20 text-primary-400 px-2 py-1 rounded-full border border-primary-500/30">
                  NEW
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Study Sections */}
        <div className="border-t border-dark-700/50 pt-6">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Study Sections
          </h3>
          <div className="space-y-2">
            {sections.map((section) => {
              const IconComponent = iconMap[section.icon] || FiBook;
              return (
                <Link
                  key={section.id}
                  to={`/study/${section.id}`}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 group ${
                    location.pathname === `/study/${section.id}`
                      ? 'bg-primary-500/15 text-primary-400 border-l-4 border-primary-500'
                      : 'text-slate-400 hover:bg-dark-800/40 hover:text-slate-200'
                  }`}
                >
                  <div className={`p-1.5 rounded ${section.color} text-white group-hover:scale-110 transition-transform`}>
                    <SafeIcon icon={IconComponent} className="text-xs" />
                  </div>
                  <span className="truncate">{section.title}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Study Tools Quick Link */}
        <div className="border-t border-dark-700/50 pt-6 mt-6">
          <div className="dark-card rounded-xl p-4 border border-primary-500/20">
            <div className="flex items-center space-x-3 mb-2">
              <SafeIcon icon={FiTool} className="text-primary-400" />
              <span className="font-semibold text-slate-200">Study Tools</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Interactive physics tools and calculators
            </p>
            <div className="space-y-2">
              <Link
                to="/physics-tools"
                className="block text-xs btn-dark-primary px-3 py-2 rounded-lg text-center transition-colors"
              >
                Physics Tools
              </Link>
              <Link
                to="/knowledge"
                className="block text-xs btn-dark-secondary px-3 py-2 rounded-lg text-center transition-colors"
              >
                Study Resources
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;