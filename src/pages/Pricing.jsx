import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../context/AuthContext';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiShield, FiHelpCircle, FiCreditCard, FiClock, FiCheck, FiZap, FiCrown, FiX } = FiIcons;

function Pricing() {
  const { membership, startTrial, MEMBERSHIP_TIERS, getDaysLeftInTrial } = useAuth();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [trialTier, setTrialTier] = useState('premium');

  // Available coupons
  const VALID_COUPONS = {
    'STUDENT50': { discount: 0.5, description: '50% off for students' },
    'WELCOME25': { discount: 0.25, description: '25% off for new users' },
    'SUMMER2024': { discount: 0.3, description: '30% summer discount' }
  };

  // Payment plans from Stripe
  const plans = [
    {
      name: "Sonography School 2025 (SPI)",
      amount: 26,
      priceId: "prod_SiUGNwBgh7wMdH",
      paymentLink: "https://buy.stripe.com/fZuaEQ9Ho2pScuuafEabK00",
      currency: "usd",
      interval: "1 PAYMENT - LIFETIME DEAL"
    }
  ];

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    const coupon = VALID_COUPONS[couponCode.toUpperCase()];
    if (coupon) {
      setAppliedDiscount(coupon);
      setCouponError('');
    } else {
      setAppliedDiscount(null);
      setCouponError('Invalid coupon code');
    }
  };

  const removeCoupon = () => {
    setAppliedDiscount(null);
    setCouponCode('');
    setCouponError('');
  };

  const getPrice = (tier) => {
    const tierData = MEMBERSHIP_TIERS[tier];
    if (tier === 'free') return 'Free';
    
    let price = tierData.price;
    
    // Apply discount if valid coupon
    if (appliedDiscount) {
      price = price * (1 - appliedDiscount.discount);
    }
    
    return `$${price.toFixed(2)}/${tierData.period}`;
  };

  const handleStartTrial = (tier) => {
    setTrialTier(tier);
    setShowTrialModal(true);
  };

  const confirmStartTrial = () => {
    startTrial(trialTier);
    setShowTrialModal(false);
    alert(`Your 3-day trial of ${MEMBERSHIP_TIERS[trialTier].name} has started!`);
  };

  const TrialModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
      >
        <h3 className="text-xl font-bold text-medical-900 mb-4">Start Your 3-Day Free Trial</h3>
        <p className="text-medical-700 mb-6">
          You're about to start your 3-day free trial of the {MEMBERSHIP_TIERS[trialTier].name} plan. 
          You'll have full access to all {MEMBERSHIP_TIERS[trialTier].name} features during this period.
        </p>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-start space-x-3">
          <SafeIcon icon={FiClock} className="text-blue-600 mt-1" />
          <div>
            <h4 className="font-medium text-medical-900">What happens after 3 days?</h4>
            <p className="text-sm text-blue-700">
              After your trial ends, your account will automatically revert to the Free plan unless you choose to upgrade.
              No credit card required to start.
            </p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowTrialModal(false)}
            className="flex-1 px-4 py-3 bg-medical-100 text-medical-700 font-medium rounded-lg hover:bg-medical-200 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={confirmStartTrial}
            className="flex-1 px-4 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
          >
            Start My Free Trial
          </button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-4">
          <SafeIcon icon={FiArrowLeft} />
          <span>Back to Dashboard</span>
        </Link>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-medical-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-medical-600 max-w-2xl mx-auto">
            Get access to comprehensive SPI exam preparation with our monthly subscription
          </p>
        </div>
      </div>

      {/* Coupon Section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <SafeIcon icon={FiCreditCard} className="text-primary-600" />
            <h2 className="font-bold text-medical-900">Discount Coupon</h2>
          </div>
          {appliedDiscount && (
            <span className="text-green-600 flex items-center">
              <SafeIcon icon={FiCheck} className="mr-1" />
              {Math.round(appliedDiscount.discount * 100)}% discount applied
            </span>
          )}
        </div>
        {!appliedDiscount ? (
          <form onSubmit={handleCouponSubmit} className="mt-4 flex space-x-4">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="flex-1 p-2 border border-medical-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Apply
            </button>
          </form>
        ) : (
          <div className="mt-4 flex items-center justify-between bg-green-50 p-4 rounded-lg border border-green-200">
            <div>
              <div className="font-medium text-green-800">{couponCode}</div>
              <div className="text-sm text-green-600">{appliedDiscount.description}</div>
            </div>
            <button onClick={removeCoupon} className="text-red-600 hover:text-red-700">
              <SafeIcon icon={FiX} />
            </button>
          </div>
        )}
        {couponError && (
          <p className="mt-2 text-red-600 text-sm">{couponError}</p>
        )}
      </div>

      {/* Trial Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 mb-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-full">
              <SafeIcon icon={FiClock} className="text-2xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">Try Premium or Pro Free for 3 Days</h2>
              <p className="text-white/90">
                Experience all features risk-free. No credit card required.
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <button 
              onClick={() => handleStartTrial('premium')}
              className="px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-md"
            >
              Start Free Trial
            </button>
          </div>
        </div>
        <div className="mt-4 md:hidden">
          <button 
            onClick={() => handleStartTrial('premium')}
            className="w-full px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-md"
          >
            Start Free Trial
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Free Plan */}
        <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-2xl p-6 border-2 border-medical-200 shadow-lg">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-medical-100 flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiCreditCard} className="text-2xl text-medical-600" />
            </div>
            <h3 className="text-xl font-bold text-medical-900 mb-2">Free</h3>
            <div className="mb-4">
              <span className="text-3xl font-bold text-medical-900">$0</span>
              <span className="text-medical-600">/forever</span>
            </div>
          </div>
          <div className="space-y-3 mb-6">
            {MEMBERSHIP_TIERS.free.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <SafeIcon icon={FiCheck} className="text-green-500 flex-shrink-0" />
                <span className="text-medical-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>
          <button 
            disabled={membership.tier === 'free'}
            className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 
            ${membership.tier === 'free' 
              ? 'bg-medical-100 text-medical-400 cursor-not-allowed' 
              : 'bg-medical-100 hover:bg-medical-200 text-medical-700'}`}
          >
            <span>Current Plan</span>
          </button>
        </motion.div>
        
        {/* Premium Plan */}
        <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-2xl p-6 border-2 border-primary-500 shadow-lg relative">
          {/* Popular tag */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </span>
          </div>
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiZap} className="text-2xl text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-medical-900 mb-2">Premium</h3>
            <div className="mb-4">
              <span className="text-3xl font-bold text-medical-900">{getPrice('premium')}</span>
            </div>
          </div>
          <div className="space-y-3 mb-6">
            {MEMBERSHIP_TIERS.premium.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <SafeIcon icon={FiCheck} className="text-green-500 flex-shrink-0" />
                <span className="text-medical-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>
          {membership.trial?.active && membership.tier === 'premium' ? (
            <div className="w-full py-3 px-4 rounded-xl font-semibold bg-green-500 text-white text-center">
              Trial Active - {getDaysLeftInTrial()} days left
            </div>
          ) : (
            <div className="space-y-3">
              <button 
                onClick={() => handleStartTrial('premium')}
                className="w-full py-3 px-4 rounded-xl font-semibold bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <SafeIcon icon={FiClock} />
                <span>Start 3-Day Free Trial</span>
              </button>
              <button 
                onClick={() => window.open(plans[0].paymentLink, '_blank')}
                className="w-full py-3 px-4 rounded-xl font-semibold bg-primary-500 hover:bg-primary-600 text-white transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <SafeIcon icon={FiCreditCard} />
                <span>Subscribe Now</span>
              </button>
            </div>
          )}
          <p className="text-xs text-medical-500 text-center mt-3">
            Secure payment via Stripe
          </p>
        </motion.div>
        
        {/* Pro Plan */}
        <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-2xl p-6 border-2 border-medical-200 shadow-lg">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiCrown} className="text-2xl text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-medical-900 mb-2">Pro</h3>
            <div className="mb-4">
              <span className="text-3xl font-bold text-medical-900">{getPrice('pro')}</span>
            </div>
          </div>
          <div className="space-y-3 mb-6">
            {MEMBERSHIP_TIERS.pro.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <SafeIcon icon={FiCheck} className="text-green-500 flex-shrink-0" />
                <span className="text-medical-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>
          {membership.trial?.active && membership.tier === 'pro' ? (
            <div className="w-full py-3 px-4 rounded-xl font-semibold bg-green-500 text-white text-center">
              Trial Active - {getDaysLeftInTrial()} days left
            </div>
          ) : (
            <div className="space-y-3">
              <button 
                onClick={() => handleStartTrial('pro')}
                className="w-full py-3 px-4 rounded-xl font-semibold bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <SafeIcon icon={FiClock} />
                <span>Start 3-Day Free Trial</span>
              </button>
              <button 
                onClick={() => window.open(plans[0].paymentLink, '_blank')}
                className="w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
              >
                <SafeIcon icon={FiCreditCard} />
                <span>Subscribe Now</span>
              </button>
            </div>
          )}
          <p className="text-xs text-medical-500 text-center mt-3">
            Secure payment via Stripe
          </p>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-medical-200 mb-8">
        <h2 className="text-2xl font-bold text-medical-900 text-center mb-8">
          What's Included
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "SPI Mock Exams", description: "Full-length practice exams that simulate the real SPI test experience" },
            { title: "Interactive Physics Tools", description: "Calculators, simulators, and visual aids for understanding ultrasound physics" },
            { title: "AI Chat Tutor", description: "Get instant help with physics concepts and exam questions" },
            { title: "Progress Tracking", description: "Monitor your learning progress with detailed analytics" },
            { title: "Study Materials", description: "Comprehensive resources covering all SPI exam topics" },
            { title: "Practice Questions", description: "Thousands of practice questions with detailed explanations" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-medical-50 rounded-xl"
            >
              <h3 className="font-semibold text-medical-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-medical-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-medical-200 mb-8">
        <h2 className="text-2xl font-bold text-medical-900 text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          {[
            {
              question: "How does the 3-day free trial work?",
              answer: "You can try Premium or Pro features for 3 days completely free. No credit card is required. After the trial period ends, your account will automatically revert to the Free plan unless you choose to subscribe."
            },
            {
              question: "Can I cancel my subscription anytime?",
              answer: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your current billing period."
            },
            {
              question: "Is my payment information secure?",
              answer: "Absolutely! We use Stripe for payment processing, which provides bank-level security and encryption for all transactions."
            },
            {
              question: "What happens if I fail my SPI exam?",
              answer: "Don't worry! You can continue using the platform to study and retake the exam. Our materials are designed to help you succeed."
            },
            {
              question: "Do you offer student discounts?",
              answer: "Please contact our support team for information about student discounts and special pricing."
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-medical-200 pb-4 last:border-b-0"
            >
              <h3 className="font-semibold text-medical-900 mb-2 flex items-center">
                <SafeIcon icon={FiHelpCircle} className="mr-2 text-primary-600" />
                {faq.question}
              </h3>
              <p className="text-medical-700 ml-6">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Security Badge */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200">
          <SafeIcon icon={FiShield} />
          <span className="text-sm font-medium">Secured by Stripe</span>
        </div>
        <p className="text-xs text-medical-500 mt-2">
          Your payment information is encrypted and secure
        </p>
      </div>

      {/* Trial Modal */}
      {showTrialModal && <TrialModal />}
    </motion.div>
  );
}

export default Pricing;