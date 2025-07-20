import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import AchievementBadge from './AchievementBadge';
import ConversationStarters from './ConversationStarters';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiEdit3, FiSave, FiX, FiTrendingUp, FiTarget, FiAward, FiMessageSquare } = FiIcons;

function UserProfile({ isOpen, onClose }) {
  // Mock user data - in a real app this would come from context
  const mockUser = {
    name: 'Study Warrior',
    avatar: '🎯',
    level: 3,
    xp: 250,
    title: 'Novice Sonographer',
    joinDate: new Date().toISOString(),
    interests: 'Ultrasound Physics, Medical Imaging, Sonography',
    background: 'Sonography Student with interest in vascular applications',
    role: 'Student',
    specialty: 'General Ultrasound',
    facility: 'State University'
  };

  const mockAchievements = ['first_correct', 'five_streak'];
  
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: mockUser.name,
    avatar: mockUser.avatar,
    title: mockUser.title,
    interests: mockUser.interests,
    background: mockUser.background
  });
  const [activeTab, setActiveTab] = useState('profile');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = () => {
    // In a real app, this would dispatch to context/state
    console.log('Saving user profile:', editData);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditData({
      name: mockUser.name,
      avatar: mockUser.avatar,
      title: mockUser.title,
      interests: mockUser.interests,
      background: mockUser.background
    });
    setIsEditing(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-medical-900 flex items-center">
              <SafeIcon icon={FiUser} className="mr-2 text-primary-600" />
              User Profile
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-medical-100 rounded-lg transition-colors"
            >
              <SafeIcon icon={FiX} />
            </button>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex mb-6 border-b border-medical-200">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'profile' 
                  ? 'text-primary-600 border-b-2 border-primary-500' 
                  : 'text-medical-600 hover:text-medical-900'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('conversations')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'conversations' 
                  ? 'text-primary-600 border-b-2 border-primary-500' 
                  : 'text-medical-600 hover:text-medical-900'
              }`}
            >
              Conversation Starters
            </button>
          </div>
          
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <div className="flex items-center mb-6">
                <div className="text-5xl mr-4">{mockUser.avatar}</div>
                <div>
                  <h3 className="text-xl font-bold text-medical-900">
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleChange}
                        className="border border-medical-300 rounded px-2 py-1 w-full"
                      />
                    ) : (
                      mockUser.name
                    )}
                  </h3>
                  <div className="text-medical-600">
                    {isEditing ? (
                      <input
                        type="text"
                        name="title"
                        value={editData.title}
                        onChange={handleChange}
                        className="border border-medical-300 rounded px-2 py-1 w-full mt-2"
                        placeholder="Your title"
                      />
                    ) : (
                      mockUser.title
                    )}
                  </div>
                </div>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="ml-auto p-2 bg-medical-100 hover:bg-medical-200 rounded-full transition-colors"
                  >
                    <SafeIcon icon={FiEdit3} className="text-medical-600" />
                  </button>
                ) : (
                  <div className="ml-auto flex space-x-2">
                    <button
                      onClick={handleCancel}
                      className="p-2 bg-medical-100 hover:bg-medical-200 rounded-full transition-colors"
                    >
                      <SafeIcon icon={FiX} className="text-medical-600" />
                    </button>
                    <button
                      onClick={handleSave}
                      className="p-2 bg-primary-100 hover:bg-primary-200 rounded-full transition-colors"
                    >
                      <SafeIcon icon={FiSave} className="text-primary-600" />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-medical-50 rounded-lg p-4">
                  <h4 className="font-semibold text-medical-900 mb-2">Level Progress</h4>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-medical-600">Level {mockUser.level}</span>
                    <span className="text-sm text-medical-600">{mockUser.xp} / 300 XP</span>
                  </div>
                  <div className="h-2 bg-medical-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(mockUser.xp % 100) / 100 * 100}%` }}
                      className="h-full bg-primary-500 rounded-full"
                    />
                  </div>
                </div>
                
                <div className="bg-medical-50 rounded-lg p-4">
                  <h4 className="font-semibold text-medical-900 mb-2">Stats</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-sm text-medical-600">Joined</div>
                      <div className="font-medium text-medical-900">
                        {new Date(mockUser.joinDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-medical-600">Achievements</div>
                      <div className="font-medium text-medical-900">{mockAchievements.length}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-medical-900 mb-2">Background</h4>
                  {isEditing ? (
                    <textarea
                      name="background"
                      value={editData.background}
                      onChange={handleChange}
                      className="border border-medical-300 rounded px-2 py-1 w-full h-20"
                      placeholder="Your professional background"
                    />
                  ) : (
                    <p className="text-medical-700">
                      {mockUser.background}
                    </p>
                  )}
                </div>
                
                <div>
                  <h4 className="font-semibold text-medical-900 mb-2">Interests</h4>
                  {isEditing ? (
                    <textarea
                      name="interests"
                      value={editData.interests}
                      onChange={handleChange}
                      className="border border-medical-300 rounded px-2 py-1 w-full h-20"
                      placeholder="Your interests"
                    />
                  ) : (
                    <p className="text-medical-700">
                      {mockUser.interests}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Conversation Starters Tab */}
          {activeTab === 'conversations' && (
            <div className="p-2">
              <div className="mb-4 p-3 bg-primary-50 border border-primary-200 rounded-lg">
                <div className="flex items-center">
                  <SafeIcon icon={FiMessageSquare} className="text-primary-600 mr-2" />
                  <div className="text-primary-700 text-sm">
                    Use these conversation starters when networking with other medical imaging professionals
                  </div>
                </div>
              </div>
              
              <ConversationStarters userInfo={mockUser} />
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default UserProfile;