import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoiceReader } from '../hooks/useVoiceReader';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlay, FiPause, FiSquare, FiSettings, FiVolume2, FiVolumeX, FiChevronDown } = FiIcons;

function VoiceControls({ text, title = "Section Content", className = "" }) {
  const {
    isSupported,
    isReading,
    isPaused,
    voices,
    selectedVoice,
    setSelectedVoice,
    rate,
    setRate,
    pitch,
    setPitch,
    volume,
    setVolume,
    speak,
    stop,
    pause,
    resume
  } = useVoiceReader();

  const [showSettings, setShowSettings] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  if (!isSupported) {
    return null;
  }

  const handlePlay = () => {
    if (isReading && !isPaused) {
      pause();
    } else if (isPaused) {
      resume();
    } else {
      speak(text, {
        onStart: () => console.log('Started reading:', title),
        onEnd: () => console.log('Finished reading:', title),
        onError: (error) => console.error('Voice reading error:', error)
      });
    }
  };

  const handleStop = () => {
    stop();
  };

  const handleVolumeToggle = () => {
    if (isMuted) {
      setVolume(0.8);
      setIsMuted(false);
    } else {
      setVolume(0);
      setIsMuted(true);
    }
  };

  const getPlayButtonIcon = () => {
    if (isReading && !isPaused) return FiPause;
    return FiPlay;
  };

  const getPlayButtonText = () => {
    if (isReading && !isPaused) return 'Pause';
    if (isPaused) return 'Resume';
    return 'Read Aloud';
  };

  return (
    <div className={`voice-controls ${className}`}>
      <div className="flex items-center space-x-2">
        {/* Main Play/Pause Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePlay}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500/20 text-primary-400 rounded-lg hover:bg-primary-500/30 transition-colors border border-primary-500/30"
          title={getPlayButtonText()}
        >
          <SafeIcon 
            icon={getPlayButtonIcon()} 
            className={`text-lg ${isReading ? 'animate-pulse' : ''}`} 
          />
          <span className="text-sm font-medium">{getPlayButtonText()}</span>
        </motion.button>

        {/* Stop Button */}
        {isReading && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStop}
            className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors border border-red-500/30"
            title="Stop Reading"
          >
            <SafeIcon icon={FiSquare} className="text-lg" />
          </motion.button>
        )}

        {/* Volume Control */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleVolumeToggle}
          className="p-2 bg-dark-800/50 text-slate-300 rounded-lg hover:bg-dark-700 transition-colors border border-dark-600"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          <SafeIcon icon={isMuted ? FiVolumeX : FiVolume2} className="text-lg" />
        </motion.button>

        {/* Settings Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 bg-dark-800/50 text-slate-300 rounded-lg hover:bg-dark-700 transition-colors border border-dark-600"
          title="Voice Settings"
        >
          <SafeIcon icon={FiSettings} className="text-lg" />
        </motion.button>
      </div>

      {/* Voice Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 p-4 dark-card rounded-lg border border-primary-500/30 shadow-lg z-50"
          >
            <h4 className="font-semibold text-slate-200 mb-4">Voice Settings</h4>
            
            {/* Voice Selection */}
            <div className="mb-4">
              <label className="block text-sm text-slate-300 mb-2">Voice</label>
              <select
                value={selectedVoice?.name || ''}
                onChange={(e) => {
                  const voice = voices.find(v => v.name === e.target.value);
                  setSelectedVoice(voice);
                }}
                className="w-full p-2 bg-dark-800/50 border border-dark-600 rounded text-slate-200 focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50"
              >
                {voices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>

            {/* Speed Control */}
            <div className="mb-4">
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
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>Slower</span>
                <span>Normal</span>
                <span>Faster</span>
              </div>
            </div>

            {/* Pitch Control */}
            <div className="mb-4">
              <label className="block text-sm text-slate-300 mb-2">
                Pitch: {pitch.toFixed(1)}
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="w-full accent-primary-500"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>Lower</span>
                <span>Normal</span>
                <span>Higher</span>
              </div>
            </div>

            {/* Volume Control */}
            <div className="mb-4">
              <label className="block text-sm text-slate-300 mb-2">
                Volume: {Math.round(volume * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => {
                  const newVolume = parseFloat(e.target.value);
                  setVolume(newVolume);
                  setIsMuted(newVolume === 0);
                }}
                className="w-full accent-primary-500"
              />
            </div>

            {/* Test Voice Button */}
            <button
              onClick={() => speak("Hello! This is a test of the voice reading feature for ultrasound physics education.", { 
                rate, 
                pitch, 
                volume 
              })}
              className="w-full py-2 px-4 bg-primary-500/20 text-primary-400 rounded-lg hover:bg-primary-500/30 transition-colors border border-primary-500/30"
            >
              Test Voice
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default VoiceControls;