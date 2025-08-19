import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiLock, FiCrown, FiArrowRight } = FiIcons;

function MembershipGate({ 
  requiredTier = 'premium', 
  feature, 
  children, 
  fallback = null 
}) {
  const { membership, MEMBERSHIP_TIERS } = useAuth();

  const tierHierarchy = { free: 0, premium: 1, pro: 2 };
  const userTierLevel = tierHierarchy[membership.tier];
  const requiredTierLevel = tierHierarchy[requiredTier];

  const hasAccess = userTierLevel >= requiredTierLevel;

  if (hasAccess) {
    return children;
  }

  if (fallback) {
    return fallback;
  }

  const requiredTierData = MEMBERSHIP_TIERS[requiredTier];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-medical-200 text-center"
    >
      <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <SafeIcon icon={FiLock} className="text-3xl text-white" />
      </div>
      
      <h2 className="text-2xl font-bold text-medical-900 mb-4">
        {requiredTierData.name} Feature
      </h2>
      
      <p className="text-medical-600 mb-6 max-w-md mx-auto">
        {feature ? `${feature} is available for ${requiredTierData.name} members.` : 
         `This feature requires a ${requiredTierData.name} membership.`}
        {' '}Upgrade now to unlock this and many other premium features.
      </p>

      <div className="bg-medical-50 rounded-xl p-4 mb-6">
        <h3 className="font-semibold text-medical-900 mb-3">
          What you'll get with {requiredTierData.name}:
        </h3>
        <ul className="space-y-2 text-sm text-medical-700">
          {requiredTierData.features.slice(0, 4).map((feature, index) => (
            <li key={index} className="flex items-center space-x-2">
              <SafeIcon icon={FiCrown} className="text-purple-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/membership"
          className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-colors font-medium"
        >
          <SafeIcon icon={FiCrown} />
          <span>Upgrade to {requiredTierData.name}</span>
          <SafeIcon icon={FiArrowRight} />
        </Link>
        
        <Link
          to="/membership"
          className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-white text-medical-700 border border-medical-200 rounded-lg hover:bg-medical-50 transition-colors"
        >
          <span>View All Plans</span>
        </Link>
      </div>

      <p className="text-xs text-medical-500 mt-4">
        Starting at ${requiredTierData.price}/{requiredTierData.period}
      </p>
    </motion.div>
  );
}

export default MembershipGate;