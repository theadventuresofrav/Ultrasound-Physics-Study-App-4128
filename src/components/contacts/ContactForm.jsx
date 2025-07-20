import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiX, FiUser, FiBriefcase, FiMail, FiPhone, FiMapPin, FiTag, FiMessageSquare, FiImage } = FiIcons;

const ContactForm = ({ isOpen, onClose, onSubmit, initialData, mode = 'add' }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    facility: '',
    email: '',
    phone: '',
    specialty: '',
    category: 'healthcare',
    notes: '',
    image: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Reset form when adding new contact
      setFormData({
        name: '',
        role: '',
        facility: '',
        email: '',
        phone: '',
        specialty: '',
        category: 'healthcare',
        notes: '',
        image: ''
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 bg-slate-900 rounded-2xl border border-mystic-500/20"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <SafeIcon icon={FiX} className="text-xl" />
            </button>

            <h3 className="text-2xl font-mystical font-bold text-white mb-6">
              {mode === 'add' ? 'Add New Contact' : 'Edit Contact'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-cosmic text-slate-300 mb-2">
                        <SafeIcon icon={FiUser} className="inline-block mr-2 text-mystic-400" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-slate-800/50 border border-mystic-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-mystic-500"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="role" className="block text-sm font-cosmic text-slate-300 mb-2">
                        <SafeIcon icon={FiBriefcase} className="inline-block mr-2 text-mystic-400" />
                        Role
                      </label>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full p-3 bg-slate-800/50 border border-mystic-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-mystic-500"
                        placeholder="Sonographer, Medical Physicist, etc."
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-cosmic text-slate-300 mb-2">
                        <SafeIcon icon={FiMail} className="inline-block mr-2 text-mystic-400" />
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 bg-slate-800/50 border border-mystic-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-mystic-500"
                        placeholder="email@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-cosmic text-slate-300 mb-2">
                        <SafeIcon icon={FiPhone} className="inline-block mr-2 text-mystic-400" />
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-3 bg-slate-800/50 border border-mystic-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-mystic-500"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Professional Information */}
                <div>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="facility" className="block text-sm font-cosmic text-slate-300 mb-2">
                        <SafeIcon icon={FiMapPin} className="inline-block mr-2 text-mystic-400" />
                        Facility
                      </label>
                      <input
                        type="text"
                        id="facility"
                        name="facility"
                        value={formData.facility}
                        onChange={handleChange}
                        className="w-full p-3 bg-slate-800/50 border border-mystic-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-mystic-500"
                        placeholder="Hospital, University, Company, etc."
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="specialty" className="block text-sm font-cosmic text-slate-300 mb-2">
                        <SafeIcon icon={FiTag} className="inline-block mr-2 text-mystic-400" />
                        Specialty
                      </label>
                      <input
                        type="text"
                        id="specialty"
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleChange}
                        className="w-full p-3 bg-slate-800/50 border border-mystic-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-mystic-500"
                        placeholder="Cardiac, Abdominal, Physics, etc."
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="category" className="block text-sm font-cosmic text-slate-300 mb-2">
                        <SafeIcon icon={FiBriefcase} className="inline-block mr-2 text-mystic-400" />
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-3 bg-slate-800/50 border border-mystic-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-mystic-500"
                      >
                        <option value="healthcare">Healthcare Professional</option>
                        <option value="academic">Academic/Educator</option>
                        <option value="vendor">Vendor/Equipment</option>
                        <option value="student">Student</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="image" className="block text-sm font-cosmic text-slate-300 mb-2">
                        <SafeIcon icon={FiImage} className="inline-block mr-2 text-mystic-400" />
                        Profile Image URL
                      </label>
                      <input
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full p-3 bg-slate-800/50 border border-mystic-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-mystic-500"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className="block text-sm font-cosmic text-slate-300 mb-2">
                  <SafeIcon icon={FiMessageSquare} className="inline-block mr-2 text-mystic-400" />
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-3 bg-slate-800/50 border border-mystic-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-mystic-500"
                  placeholder="Additional information about this contact..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-mystic-500 to-cosmic-500 text-white font-cosmic font-semibold rounded-xl shadow-lg hover:shadow-mystic-500/25 transition-all duration-300"
              >
                {mode === 'add' ? 'Add Contact' : 'Update Contact'}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactForm;