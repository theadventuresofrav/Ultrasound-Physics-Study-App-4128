import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiCheck, FiStar, FiZap, FiCrown, FiCreditCard, FiTag, FiX } = FiIcons;

function Membership() {
  const { membership, upgradeMembership, MEMBERSHIP_TIERS } = useAuth();
  const [selectedTier, setSelectedTier] = useState(membership.tier);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);

  // Available coupons
  const VALID_COUPONS = {
    'STUDENT50': { discount: 0.5, description: '50% off for students' },
    'WELCOME25': { discount: 0.25, description: '25% off for new users' },
    'SUMMER2024': { discount: 0.3, description: '30% summer discount' }
  };

  const getTierIcon = (tier) => {
    switch (tier) {
      case 'free': return FiStar;
      case 'premium': return FiZap;
      case 'pro': return FiCrown;
      default: return FiStar;
    }
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'free': return 'from-gray-500 to-gray-600';
      case 'premium': return 'from-blue-500 to-blue-600';
      case 'pro': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

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
    
    let price = billingCycle === 'yearly' ? tierData.price * 10 : tierData.price;
    
    // Apply discount if valid coupon
    if (appliedDiscount) {
      price = price * (1 - appliedDiscount.discount);
    }
    
    const period = billingCycle === 'yearly' ? 'year' : tierData.period;
    return `$${price.toFixed(2)}/${period}`;
  };

  const handleUpgrade = (tier) => {
    if (tier === 'free') return;
    upgradeMembership(tier);
    alert(`Successfully upgraded to ${MEMBERSHIP_TIERS[tier].name}!`);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
      {/* Header section */}
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-4">
          <SafeIcon icon={FiArrowLeft} />
          <span>Back to Dashboard</span>
        </Link>
        <h1 className="text-3xl font-bold text-medical-900 mb-2">Membership Plans</h1>
        <p className="text-medical-600">Choose the plan that best fits your learning needs</p>
      </div>

      {/* Coupon Section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <SafeIcon icon={FiTag} className="text-primary-600" />
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
            <button
              onClick={removeCoupon}
              className="text-red-600 hover:text-red-700"
            >
              <SafeIcon icon={FiX} />
            </button>
          </div>
        )}
        
        {couponError && (
          <p className="mt-2 text-red-600 text-sm">{couponError}</p>
        )}
      </div>

      {/* Rest of the membership page content remains the same */}
      {/* ... */}
    </motion.div>
  );
}

export default Membership;