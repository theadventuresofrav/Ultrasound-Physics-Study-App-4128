import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiCreditCard, FiStar, FiZap } = FiIcons;

function PricingCard({ plan, isPopular = false, onSelect }) {
  const handlePayment = () => {
    window.open(plan.paymentLink, '_blank');
  };

  const getIcon = () => {
    switch (plan.name) {
      case 'Sonography School 2025 (SPI)':
        return FiStar;
      default:
        return FiZap;
    }
  };

  const formatPrice = (amount) => {
    return `$${amount}`;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative bg-white rounded-2xl p-6 border-2 transition-all duration-300 ${
        isPopular 
          ? 'border-primary-500 shadow-lg shadow-primary-500/20' 
          : 'border-medical-200 hover:border-primary-300'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
          isPopular ? 'bg-primary-100' : 'bg-medical-100'
        }`}>
          <SafeIcon 
            icon={getIcon()} 
            className={`text-2xl ${isPopular ? 'text-primary-600' : 'text-medical-600'}`} 
          />
        </div>
        
        <h3 className="text-xl font-bold text-medical-900 mb-2">
          {plan.name}
        </h3>
        
        <div className="mb-4">
          <span className="text-3xl font-bold text-medical-900">
            {formatPrice(plan.amount)}
          </span>
          <span className="text-medical-600">/{plan.interval}</span>
        </div>
        
        <p className="text-sm text-medical-600">
          {plan.currency.toUpperCase()} currency
        </p>
      </div>

      <div className="space-y-3 mb-6">
        {[
          'Complete SPI exam preparation',
          'Interactive physics tools',
          'Mock exams and practice quizzes',
          'EchoMasters podcast integration',
          'Progress tracking and analytics',
          'AI-powered chat tutor',
          'Comprehensive study materials'
        ].map((feature, index) => (
          <div key={index} className="flex items-center space-x-3">
            <SafeIcon icon={FiCheck} className="text-green-500 flex-shrink-0" />
            <span className="text-medical-700 text-sm">{feature}</span>
          </div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePayment}
        className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
          isPopular
            ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg'
            : 'bg-medical-100 hover:bg-medical-200 text-medical-700'
        }`}
      >
        <SafeIcon icon={FiCreditCard} />
        <span>Subscribe Now</span>
      </motion.button>

      <p className="text-xs text-medical-500 text-center mt-3">
        Secure payment via Stripe
      </p>
    </motion.div>
  );
}

export default PricingCard;