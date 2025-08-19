import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBarChart, FiClock, FiTarget } = FiIcons;

function UsageTracker({ feature, currentUsage = 0, showDetails = true }) {
  const { membership, canUseFeature } = useAuth();
  
  const limit = membership.limits[feature];
  const canUse = canUseFeature(feature, currentUsage);
  const usagePercentage = limit === Infinity ? 0 : (currentUsage / limit) * 100;

  if (limit === Infinity) {
    return showDetails ? (
      <div className="flex items-center space-x-2 text-green-600 text-sm">
        <SafeIcon icon={FiTarget} />
        <span>Unlimited</span>
      </div>
    ) : null;
  }

  const getColorClass = () => {
    if (usagePercentage >= 90) return 'text-red-600 bg-red-50';
    if (usagePercentage >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const getProgressColor = () => {
    if (usagePercentage >= 90) return 'bg-red-500';
    if (usagePercentage >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  if (!showDetails) {
    return (
      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getColorClass()}`}>
        {currentUsage}/{limit}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-lg p-4 border border-medical-200"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiBarChart} className="text-medical-600" />
          <span className="font-medium text-medical-900 capitalize">
            {feature.replace(/([A-Z])/g, ' $1').toLowerCase()}
          </span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getColorClass()}`}>
          {currentUsage}/{limit}
        </span>
      </div>
      
      <div className="w-full bg-medical-200 rounded-full h-2 mb-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(usagePercentage, 100)}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`h-2 rounded-full ${getProgressColor()}`}
        />
      </div>
      
      {!canUse && (
        <p className="text-xs text-red-600 mt-1">
          Limit reached. Upgrade to continue using this feature.
        </p>
      )}
    </motion.div>
  );
}

export default UsageTracker;