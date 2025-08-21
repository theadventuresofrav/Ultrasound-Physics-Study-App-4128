import React from 'react';
import {Link,useLocation} from 'react-router-dom';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import {useAuth} from '../context/AuthContext';
import GetStartedButton from './GetStartedButton';

const {FiTarget,FiUsers,FiBarChart2,FiMenu,FiLogOut,FiUser,FiMapPin,FiCrown,FiClock,FiTool,FiBook} = FiIcons;

function Header() {
  const location = useLocation();
  const {user, logout, hasRole, membership, MEMBERSHIP_TIERS, getDaysLeftInTrial} = useAuth();

  const navItems = [
    {path: '/', label: 'Home', icon: FiTarget},
    {path: '/physics-tools', label: 'Physics Tools', icon: FiTool},
    {path: '/spi-mock-exam', label: 'SPI Mock Exam', icon: FiClock},
    {path: '/contacts', label: 'Contacts', icon: FiUsers},
    ...(hasRole('admin') ? [{path: '/analytics', label: 'Analytics', icon: FiBarChart2}] : []),
    {path: '/knowledge', label: 'Resources', icon: FiBook}
  ];

  const getMembershipBadge = () => {
    if (membership.tier === 'free') return null;
    
    const tierData = MEMBERSHIP_TIERS[membership.tier];
    const colors = {
      premium: 'bg-blue-100 text-blue-700',
      pro: 'bg-purple-100 text-purple-700'
    };

    const isTrialActive = membership.trial?.active;
    const daysLeft = getDaysLeftInTrial();

    return (
      <div className="flex items-center space-x-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[membership.tier]}`}>
          {tierData.name}
        </span>
        {isTrialActive && (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 flex items-center space-x-1">
            <SafeIcon icon={FiClock} className="text-xs" />
            <span>Trial: {daysLeft}d left</span>
          </span>
        )}
      </div>
    );
  };

  return (
    <header className="relative z-50 bg-slate-900/80 backdrop-blur-md border-b border-primary-500/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-blue-500 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <SafeIcon icon={FiTarget} className="text-white text-lg" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-white group-hover:text-primary-400 transition-colors">
                Sonography School (SPI)
              </h1>
              <p className="text-xs text-slate-400">
                Ultrasound Physics • SPI Exam Prep • Interactive Learning
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
                    ? 'bg-primary-500/20 text-primary-400 shadow-lg shadow-primary-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <SafeIcon icon={item.icon} className="text-lg" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}

            {user && <GetStartedButton />}

            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-slate-300">
                  <SafeIcon icon={FiUser} />
                  <div>
                    <span className="font-medium">{user.name}</span>
                    {getMembershipBadge()}
                  </div>
                </div>

                <Link
                  to="/membership"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-colors"
                >
                  <SafeIcon icon={FiCrown} />
                  <span className="font-medium">Membership</span>
                </Link>

                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-800/50 text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  <SafeIcon icon={FiLogOut} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
              >
                <SafeIcon icon={FiUser} />
                <span className="font-medium">Login</span>
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
}

export default Header;