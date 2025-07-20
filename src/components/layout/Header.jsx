import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useAuth } from '../../context/AuthContext';

const {
  FiStar,
  FiMoon,
  FiSun,
  FiBarChart2,
  FiMenu,
  FiLogOut,
  FiUser,
  FiMapPin,
  FiUsers
} = FiIcons;

const Header = () => {
  const location = useLocation();
  const { user, logout, hasRole } = useAuth();

  const navItems = [
    { path: '/', label: 'Home', icon: FiSun },
    { path: '/reading', label: 'Get Reading', icon: FiStar },
    { path: '/city-numerology', label: 'City Numerology', icon: FiMapPin },
    { path: '/contacts', label: 'Contacts', icon: FiUsers },
    ...(hasRole('admin') ? [{ path: '/analytics', label: 'Analytics', icon: FiBarChart2 }] : []),
    { path: '/about', label: 'About', icon: FiMoon }
  ];

  return (
    <header className="relative z-50 bg-slate-900/80 backdrop-blur-md border-b border-mystic-500/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              className="w-10 h-10 rounded-full bg-gradient-to-r from-mystic-500 to-cosmic-500 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <SafeIcon icon={FiStar} className="text-white text-lg" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-mystical font-bold text-white group-hover:text-mystic-400 transition-colors">
                Mystic Insights
              </h1>
              <p className="text-xs text-slate-400 font-cosmic">
                Numerology • Astrology • Gematria
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-mystic-500/20 text-mystic-400 shadow-lg shadow-mystic-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <SafeIcon icon={item.icon} className="text-lg" />
                <span className="font-cosmic font-medium">{item.label}</span>
              </Link>
            ))}

            {user ? (
              <div className="flex items-center space-x-4">
                <div className="text-slate-300">
                  <SafeIcon icon={FiUser} className="inline-block mr-2" />
                  <span className="font-cosmic">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-800/50 text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  <SafeIcon icon={FiLogOut} />
                  <span className="font-cosmic">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-mystic-500 text-white hover:bg-mystic-600 transition-colors"
              >
                <SafeIcon icon={FiUser} />
                <span className="font-cosmic">Login</span>
              </Link>
            )}
          </nav>

          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-slate-800/50 text-slate-300 hover:text-white transition-colors"
            >
              <SafeIcon icon={FiMenu} className="text-xl" />
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;