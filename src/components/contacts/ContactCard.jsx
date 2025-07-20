import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiMail, FiPhone, FiBriefcase, FiMapPin } = FiIcons;

const ContactCard = ({ contact, onClick }) => {
  // Define category colors
  const getCategoryColor = (category) => {
    switch (category) {
      case 'healthcare':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'academic':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'vendor':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'student':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="reading-card rounded-2xl p-6 cursor-pointer hover:shadow-lg hover:shadow-mystic-500/10 transition-all duration-300"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-mystic-500/20 to-cosmic-500/20 border border-mystic-500/30 overflow-hidden flex-shrink-0">
          {contact.image ? (
            <img 
              src={contact.image} 
              alt={contact.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-mystic-400">
              {contact.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-lg font-mystical font-bold text-white">
            {contact.name}
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 text-sm">{contact.role}</span>
            <span className={`text-xs px-2 py-1 rounded-full border ${getCategoryColor(contact.category)}`}>
              {contact.category.charAt(0).toUpperCase() + contact.category.slice(1)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiBriefcase} className="text-mystic-400" />
          <span className="text-slate-300">
            {contact.specialty || 'Not specified'}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiMapPin} className="text-mystic-400" />
          <span className="text-slate-300">
            {contact.facility || 'Not specified'}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiMail} className="text-mystic-400" />
          <span className="text-slate-300">
            {contact.email || 'Not available'}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiPhone} className="text-mystic-400" />
          <span className="text-slate-300">
            {contact.phone || 'Not available'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactCard;