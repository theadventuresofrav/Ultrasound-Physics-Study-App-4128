import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiVolume2, FiX, FiInfo } = FiIcons;

function VoiceReadingBanner() {
  const [isVisible, setIsVisible] = useState(() => {
    // Check if user has seen this banner before
    return !localStorage.getItem('voice-reading-banner-dismissed');
  });

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('voice-reading-banner-dismissed', 'true');
  };

  const isSupported = 'speechSynthesis' in window;

  if (!isVisible || !isSupported) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-4 mb-6"
      >
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
            <SafeIcon icon={FiVolume2} className="text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-200 mb-1">🎧 New: Voice Reading Feature!</h3>
            <p className="text-sm text-slate-400 mb-2">
              Now you can listen to study content, questions, and explanations read aloud. 
              Perfect for auditory learners and accessibility needs.
            </p>
            <div className="flex items-center space-x-4 text-xs text-slate-500">
              <span>• Click the voice button on any section</span>
              <span>• Adjust speed and voice settings</span>
              <span>• Auto-read mode available</span>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <SafeIcon icon={FiX} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default VoiceReadingBanner;