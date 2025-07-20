import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import ConversationStarters from '../ConversationStarters';

const { 
  FiX, FiMail, FiPhone, FiBriefcase, FiMapPin, 
  FiEdit2, FiTrash2, FiMessageSquare, FiShare2, FiStar 
} = FiIcons;

const ContactDetails = ({ isOpen, onClose, contact, onEdit, onDelete }) => {
  if (!contact) return null;

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      onDelete(contact.id);
    }
  };

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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 bg-slate-900 rounded-2xl border border-mystic-500/20"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
            >
              <SafeIcon icon={FiX} className="text-xl" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Contact Information */}
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-mystic-500/20 to-cosmic-500/20 border border-mystic-500/30 overflow-hidden flex-shrink-0">
                    {contact.image ? (
                      <img 
                        src={contact.image} 
                        alt={contact.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-mystic-400 text-2xl">
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-mystical font-bold text-white">
                      {contact.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-300">{contact.role}</span>
                      <span className={`text-xs px-2 py-1 rounded-full border ${getCategoryColor(contact.category)}`}>
                        {contact.category.charAt(0).toUpperCase() + contact.category.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div className="insight-highlight rounded-lg p-4">
                      <h4 className="text-lg font-cosmic font-semibold text-white mb-3">
                        Contact Information
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-mystic-500/20 flex items-center justify-center">
                            <SafeIcon icon={FiMail} className="text-mystic-400" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-400">Email</p>
                            <p className="text-white">{contact.email || 'Not available'}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-mystic-500/20 flex items-center justify-center">
                            <SafeIcon icon={FiPhone} className="text-mystic-400" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-400">Phone</p>
                            <p className="text-white">{contact.phone || 'Not available'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="insight-highlight rounded-lg p-4">
                      <h4 className="text-lg font-cosmic font-semibold text-white mb-3">
                        Professional Details
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-mystic-500/20 flex items-center justify-center">
                            <SafeIcon icon={FiBriefcase} className="text-mystic-400" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-400">Specialty</p>
                            <p className="text-white">{contact.specialty || 'Not specified'}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-mystic-500/20 flex items-center justify-center">
                            <SafeIcon icon={FiMapPin} className="text-mystic-400" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-400">Facility</p>
                            <p className="text-white">{contact.facility || 'Not specified'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes Section */}
                {contact.notes && (
                  <div className="insight-highlight rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <SafeIcon icon={FiMessageSquare} className="text-mystic-400" />
                      <h4 className="text-lg font-cosmic font-semibold text-white">
                        Notes
                      </h4>
                    </div>
                    <p className="text-slate-300">{contact.notes}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onEdit}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-mystic-500 text-white font-cosmic font-semibold rounded-lg hover:bg-mystic-600 transition-colors"
                  >
                    <SafeIcon icon={FiEdit2} />
                    <span>Edit Contact</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDelete}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-red-500/20 text-red-400 font-cosmic font-semibold rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    <SafeIcon icon={FiTrash2} />
                    <span>Delete Contact</span>
                  </motion.button>
                </div>
                
                {/* Quick Action Buttons */}
                <div className="flex justify-center space-x-4">
                  {contact.email && (
                    <a
                      href={`mailto:${contact.email}`}
                      className="p-3 bg-slate-800/50 rounded-full text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                      title="Send Email"
                    >
                      <SafeIcon icon={FiMail} />
                    </a>
                  )}
                  
                  {contact.phone && (
                    <a
                      href={`tel:${contact.phone}`}
                      className="p-3 bg-slate-800/50 rounded-full text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                      title="Call Contact"
                    >
                      <SafeIcon icon={FiPhone} />
                    </a>
                  )}
                  
                  <button
                    className="p-3 bg-slate-800/50 rounded-full text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                    title="Add to Favorites"
                  >
                    <SafeIcon icon={FiStar} />
                  </button>
                  
                  <button
                    className="p-3 bg-slate-800/50 rounded-full text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                    title="Share Contact"
                  >
                    <SafeIcon icon={FiShare2} />
                  </button>
                </div>
              </div>

              {/* Right Column - Conversation Starters */}
              <div className="bg-white/10 rounded-xl p-4">
                <ConversationStarters contactInfo={contact} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactDetails;