import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiClock, FiArrowRight } = FiIcons;

function TrialBanner() {
  const { membership, getDaysLeftInTrial } = useAuth();
  
  // If not in a trial or not logged in, don't show the banner
  if (!membership?.trial?.active) {
    return null;
  }
  
  const daysLeft = getDaysLeftInTrial();
  const tierName = membership.tier.charAt(0).toUpperCase() + membership.tier.slice(1);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 shadow-md"
    >
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center space-x-3 mb-3 sm:mb-0">
          <div className="p-2 bg-white/20 rounded-full">
            <SafeIcon icon={FiClock} />
          </div>
          <div>
            <p className="font-medium">
              You're on a {tierName} trial! <span className="font-bold">{daysLeft} days</span> remaining.
            </p>
          </div>
        </div>
        <Link
          to="/pricing"
          className="flex items-center space-x-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium shadow-sm"
        >
          <span>Subscribe Now</span>
          <SafeIcon icon={FiArrowRight} className="text-xs" />
        </Link>
      </div>
    </motion.div>
  );
}

export default TrialBanner;