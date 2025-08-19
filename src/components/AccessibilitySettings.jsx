import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoiceReader } from '../hooks/useVoiceReader';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSettings, FiVolume2, FiEye, FiType, FiX } = FiIcons;

function AccessibilitySettings({ isOpen, onClose }) {
  const {
    voices,
    selectedVoice,
    setSelectedVoice,
    rate,
    setRate,
    pitch,
    setPitch,
    volume,
    setVolume,
    speak
  } = useVoiceReader();

  const [fontSize, setFontSize] = useState('medium');
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [autoRead, setAutoRead] = useState(false);

  useEffect(() => {
    // Load saved accessibility settings
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setFontSize(settings.fontSize || 'medium');
      setHighContrast(settings.highContrast || false);
      setReducedMotion(settings.reducedMotion || false);
      setAutoRead(settings.autoRead || false);
    }
  }, []);

  const saveSettings = () => {
    const settings = {
      fontSize,
      highContrast,
      reducedMotion,
      autoRead,
      voice: selectedVoice?.name,
      rate,
      pitch,
      volume
    };
    
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
    
    // Apply settings to document
    document.documentElement.style.fontSize = getFontSizeValue(fontSize);
    
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    if (reducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  };

  const getFontSizeValue = (size) => {
    switch (size) {
      case 'small': return '14px';
      case 'medium': return '16px';
      case 'large': return '18px';
      case 'extra-large': return '20px';
      default: return '16px';
    }
  };

  const testVoice = () => {
    speak("This is a test of the voice reading feature. You can adjust the speed, pitch, and volume to your preference.", {
      rate,
      pitch,
      volume
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="dark-card rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6 border-b border-dark-700/50 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-500/20 rounded-lg border border-primary-500/30">
                  <SafeIcon icon={FiSettings} className="text-xl text-primary-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-200">Accessibility Settings</h2>
                  <p className="text-sm text-slate-400">Customize your learning experience</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-dark-800/50 text-slate-400 hover:text-slate-200 rounded-lg transition-colors border border-dark-600"
              >
                <SafeIcon icon={FiX} className="text-xl" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Voice Settings */}
              <div className="dark-card rounded-lg p-4 border border-primary-500/30">
                <div className="flex items-center space-x-2 mb-4">
                  <SafeIcon icon={FiVolume2} className="text-primary-400" />
                  <h3 className="font-semibold text-slate-200">Voice Reading</h3>
                </div>

                <div className="space-y-4">
                  {/* Voice Selection */}
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Voice</label>
                    <select
                      value={selectedVoice?.name || ''}
                      onChange={(e) => {
                        const voice = voices.find(v => v.name === e.target.value);
                        setSelectedVoice(voice);
                      }}
                      className="w-full p-2 bg-dark-800/50 border border-dark-600 rounded text-slate-200 focus:border-primary-500/50"
                    >
                      {voices.map((voice) => (
                        <option key={voice.name} value={voice.name}>
                          {voice.name} ({voice.lang})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Speed Control */}
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">
                      Speed: {rate.toFixed(1)}x
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={rate}
                      onChange={(e) => setRate(parseFloat(e.target.value))}
                      className="w-full accent-primary-500"
                    />
                  </div>

                  {/* Volume Control */}
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">
                      Volume: {Math.round(volume * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-full accent-primary-500"
                    />
                  </div>

                  {/* Auto-read toggle */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-slate-300">Auto-read content</label>
                    <input
                      type="checkbox"
                      checked={autoRead}
                      onChange={(e) => setAutoRead(e.target.checked)}
                      className="rounded border-dark-600 bg-dark-800/50 text-primary-500 focus:ring-primary-500/50"
                    />
                  </div>

                  <button
                    onClick={testVoice}
                    className="w-full py-2 px-4 btn-dark-secondary rounded-lg text-center"
                  >
                    Test Voice
                  </button>
                </div>
              </div>

              {/* Visual Settings */}
              <div className="dark-card rounded-lg p-4 border border-green-500/30">
                <div className="flex items-center space-x-2 mb-4">
                  <SafeIcon icon={FiEye} className="text-green-400" />
                  <h3 className="font-semibold text-slate-200">Visual Settings</h3>
                </div>

                <div className="space-y-4">
                  {/* Font Size */}
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Font Size</label>
                    <select
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      className="w-full p-2 bg-dark-800/50 border border-dark-600 rounded text-slate-200 focus:border-green-500/50"
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                      <option value="extra-large">Extra Large</option>
                    </select>
                  </div>

                  {/* High Contrast */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-slate-300">High contrast mode</label>
                    <input
                      type="checkbox"
                      checked={highContrast}
                      onChange={(e) => setHighContrast(e.target.checked)}
                      className="rounded border-dark-600 bg-dark-800/50 text-green-500 focus:ring-green-500/50"
                    />
                  </div>

                  {/* Reduced Motion */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-slate-300">Reduce animations</label>
                    <input
                      type="checkbox"
                      checked={reducedMotion}
                      onChange={(e) => setReducedMotion(e.target.checked)}
                      className="rounded border-dark-600 bg-dark-800/50 text-green-500 focus:ring-green-500/50"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  saveSettings();
                  onClose();
                }}
                className="w-full py-3 btn-dark-primary rounded-lg font-semibold"
              >
                Save Settings
              </motion.button>

              {/* Accessibility Info */}
              <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-500/30">
                <h4 className="font-semibold text-slate-200 mb-2">🌟 Accessibility Features</h4>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• Voice reading with customizable speed and pitch</li>
                  <li>• Keyboard navigation support</li>
                  <li>• High contrast mode for better visibility</li>
                  <li>• Adjustable font sizes</li>
                  <li>• Screen reader compatible</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AccessibilitySettings;