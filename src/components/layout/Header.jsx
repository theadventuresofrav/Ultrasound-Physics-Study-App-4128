import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useAuth } from '../../context/AuthContext';
import GetStartedButton from '../GetStartedButton';

const { FiTarget, FiUsers, FiBarChart2, FiMenu, FiLogOut, FiUser, FiCrown, FiClock, FiTool, FiBook, FiX, FiGraduationCap, FiBell } = FiIcons;

const Header = () => {
  const location = useLocation();
  const { user, logout, hasRole, membership, MEMBERSHIP_TIERS, getDaysLeftInTrial } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: FiTarget },
    { path: '/courses', label: 'SPI Courses', icon: FiGraduationCap, highlight: true },
    { path: '/physics-tools', label: 'Physics Tools', icon: FiTool },
    { path: '/contacts', label: 'Contacts', icon: FiUsers },
    ...(hasRole('admin') ? [{ path: '/analytics', label: 'Analytics', icon: FiBarChart2 }] : []),
    { path: '/knowledge', label: 'Resources', icon: FiBook }
  ];

  const getMembershipBadge = () => {
    if (membership.tier === 'free') return null;
    
    const tierData = MEMBERSHIP_TIERS[membership.tier];
    const colors = {
      premium: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
      pro: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
    };
    
    const isTrialActive = membership.trial?.active;
    const daysLeft = getDaysLeftInTrial();

    return (
      <div className="flex items-center space-x-2">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[membership.tier]} shadow-lg`}>
          <SafeIcon icon={FiCrown} className="inline mr-1" />
          {tierData.name}
        </span>
        {isTrialActive && (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-400 to-emerald-500 text-white flex items-center space-x-1 shadow-md">
            <SafeIcon icon={FiClock} className="text-xs" />
            <span>Trial: {daysLeft}d</span>
          </span>
        )}
      </div>
    );
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div 
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 via-blue-500 to-purple-500 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <SafeIcon icon={FiTarget} className="text-white text-xl" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent group-hover:from-primary-600 group-hover:to-blue-600 transition-all duration-300">
                  Sonography School
                </h1>
                <p className="text-xs text-gray-500 font-medium">
                  SPI Exam Prep • Interactive Physics • AI Tutoring
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 group ${
                    location.pathname === item.path || (item.path === '/courses' && location.pathname.startsWith('/courses'))
                      ? 'bg-gradient-to-r from-primary-500 to-blue-500 text-white shadow-lg shadow-primary-500/25'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <SafeIcon icon={item.icon} className="text-lg" />
                  <span>{item.label}</span>
                  {item.highlight && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg"></span>
                  )}
                </Link>
              ))}
            </nav>

            {/* User Section */}
            <div className="flex items-center space-x-4">
              {user && <GetStartedButton />}

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-all duration-200 relative"
                >
                  <SafeIcon icon={FiBell} className="text-lg" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>
              </div>

              {user ? (
                <div className="hidden md:flex items-center space-x-4">
                  {/* User Info */}
                  <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-xl">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm shadow-md">
                      {user.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{user.name}</div>
                      {getMembershipBadge()}
                    </div>
                  </div>

                  {/* Membership Button */}
                  <Link
                    to="/membership"
                    className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <SafeIcon icon={FiCrown} />
                    <span>Upgrade</span>
                  </Link>

                  {/* Logout */}
                  <button
                    onClick={logout}
                    className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-all duration-200"
                  >
                    <SafeIcon icon={FiLogOut} className="text-lg" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden md:flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-blue-500 text-white font-semibold hover:from-primary-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <SafeIcon icon={FiUser} />
                  <span>Sign In</span>
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-all duration-200"
              >
                <SafeIcon icon={isMobileMenuOpen ? FiX : FiMenu} className="text-lg" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-200 bg-white/98 backdrop-blur-xl"
            >
              <div className="container mx-auto px-6 py-4">
                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                        location.pathname === item.path
                          ? 'bg-gradient-to-r from-primary-500 to-blue-500 text-white shadow-lg'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <SafeIcon icon={item.icon} className="text-lg" />
                      <span>{item.label}</span>
                      {item.highlight && (
                        <span className="ml-auto px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          NEW
                        </span>
                      )}
                    </Link>
                  ))}
                </nav>

                {user ? (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-blue-500 rounded-xl flex items-center justify-center text-white font-semibold shadow-md">
                        {user.name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{user.name}</div>
                        {getMembershipBadge()}
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <Link
                        to="/membership"
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold"
                      >
                        <SafeIcon icon={FiCrown} />
                        <span>Upgrade</span>
                      </Link>
                      <button
                        onClick={logout}
                        className="px-4 py-3 rounded-xl bg-gray-100 text-gray-600 font-medium"
                      >
                        <SafeIcon icon={FiLogOut} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Link
                      to="/login"
                      className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-blue-500 text-white font-semibold"
                    >
                      <SafeIcon icon={FiUser} />
                      <span>Sign In</span>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Notifications Dropdown */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 right-6 w-80 glass-card rounded-2xl p-4 shadow-2xl z-40"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              <button
                onClick={() => setShowNotifications(false)}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <SafeIcon icon={FiX} className="text-gray-500" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="font-medium text-blue-900 text-sm">New Course Available!</div>
                <div className="text-blue-700 text-xs mt-1">Advanced Doppler Physics course is now live</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="font-medium text-green-900 text-sm">Study Streak</div>
                <div className="text-green-700 text-xs mt-1">You're on a 5-day learning streak! 🔥</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;