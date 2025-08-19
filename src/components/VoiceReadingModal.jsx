import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoiceReader } from '../hooks/useVoiceReader';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiX, FiPlay, FiPause, FiSquare, FiSettings, FiVolume2, FiSkipForward, FiSkipBack } = FiIcons;

function VoiceReadingModal({ isOpen, onClose, content, title }) {
  const {
    isSupported,
    isReading,
    isPaused,
    voices,
    selectedVoice,
    setSelectedVoice,
    rate,
    setRate,
    volume,
    setVolume,
    speak,
    stop,
    pause,
    resume
  } = useVoiceReader();

  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [paragraphs, setParagraphs] = useState([]);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (content && typeof content === 'string') {
      // Split content into paragraphs for better reading experience
      const splitParagraphs = content
        .split(/\n\n|\. (?=[A-Z])|(?<=\.) (?=[A-Z][a-z]+ [A-Z])/g)
        .filter(p => p.trim().length > 0)
        .map(p => p.trim());
      
      setParagraphs(splitParagraphs);
      setCurrentParagraph(0);
    }
  }, [content]);

  const handlePlay = () => {
    if (!paragraphs.length) return;

    if (isReading && !isPaused) {
      pause();
    } else if (isPaused) {
      resume();
    } else {
      const textToRead = paragraphs[currentParagraph];
      speak(textToRead, {
        onEnd: () => {
          // Auto-advance to next paragraph
          if (currentParagraph < paragraphs.length - 1) {
            setCurrentParagraph(prev => prev + 1);
            setTimeout(() => {
              const nextText = paragraphs[currentParagraph + 1];
              if (nextText) {
                speak(nextText, { onEnd: handlePlay });
              }
            }, 500);
          }
        }
      });
    }
  };

  const handleStop = () => {
    stop();
    setCurrentParagraph(0);
  };

  const handleNext = () => {
    if (currentParagraph < paragraphs.length - 1) {
      stop();
      setCurrentParagraph(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentParagraph > 0) {
      stop();
      setCurrentParagraph(prev => prev - 1);
    }
  };

  const handleParagraphClick = (index) => {
    stop();
    setCurrentParagraph(index);
  };

  if (!isSupported) {
    return null;
  }

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
            className="dark-card rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6 border-b border-dark-700/50 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-500/20 rounded-lg border border-primary-500/30">
                  <SafeIcon icon={FiVolume2} className="text-xl text-primary-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-200">Voice Reading</h2>
                  <p className="text-sm text-slate-400">{title}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-dark-800/50 text-slate-400 hover:text-slate-200 rounded-lg transition-colors border border-dark-600"
              >
                <SafeIcon icon={FiX} className="text-xl" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(90vh-12rem)]">
              {/* Content Area */}
              <div className="lg:col-span-2 overflow-y-auto pr-2">
                <div className="space-y-4">
                  {paragraphs.map((paragraph, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0.6 }}
                      animate={{ 
                        opacity: index === currentParagraph ? 1 : 0.6,
                        scale: index === currentParagraph ? 1.02 : 1
                      }}
                      className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                        index === currentParagraph
                          ? 'bg-primary-500/20 border border-primary-500/30 shadow-lg'
                          : 'bg-dark-800/30 border border-dark-600 hover:bg-dark-800/50'
                      }`}
                      onClick={() => handleParagraphClick(index)}
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-xs bg-dark-700 text-slate-400 px-2 py-1 rounded-full">
                          {index + 1}
                        </span>
                        <p className={`text-sm leading-relaxed ${
                          index === currentParagraph ? 'text-slate-200' : 'text-slate-400'
                        }`}>
                          {paragraph}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Controls Panel */}
              <div className="lg:col-span-1 space-y-6">
                {/* Playback Controls */}
                <div className="dark-card rounded-lg p-4 border border-primary-500/30">
                  <h3 className="font-semibold text-slate-200 mb-4">Playback Controls</h3>
                  
                  <div className="space-y-3">
                    {/* Main controls */}
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePrevious}
                        disabled={currentParagraph === 0}
                        className="p-2 bg-dark-800/50 text-slate-300 rounded-lg hover:bg-dark-700 transition-colors border border-dark-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <SafeIcon icon={FiSkipBack} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePlay}
                        className="flex-1 flex items-center justify-center space-x-2 py-3 btn-dark-primary rounded-lg"
                      >
                        <SafeIcon icon={isReading && !isPaused ? FiPause : FiPlay} />
                        <span>{isReading && !isPaused ? 'Pause' : isPaused ? 'Resume' : 'Play'}</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNext}
                        disabled={currentParagraph === paragraphs.length - 1}
                        className="p-2 bg-dark-800/50 text-slate-300 rounded-lg hover:bg-dark-700 transition-colors border border-dark-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <SafeIcon icon={FiSkipForward} />
                      </motion.button>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleStop}
                      className="w-full py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors border border-red-500/30"
                    >
                      <SafeIcon icon={FiSquare} className="inline mr-2" />
                      Stop
                    </motion.button>
                  </div>

                  {/* Progress */}
                  <div className="mt-4 pt-4 border-t border-dark-700/50">
                    <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
                      <span>Progress</span>
                      <span>{currentParagraph + 1} / {paragraphs.length}</span>
                    </div>
                    <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentParagraph + 1) / paragraphs.length) * 100}%` }}
                        className="h-full bg-primary-500 rounded-full"
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Voice Settings */}
                <div className="dark-card rounded-lg p-4 border border-primary-500/30">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="flex items-center justify-between w-full text-slate-200 font-semibold mb-4"
                  >
                    <span>Voice Settings</span>
                    <SafeIcon icon={FiSettings} className="text-slate-400" />
                  </button>

                  <AnimatePresence>
                    {showSettings && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4"
                      >
                        {/* Voice Selection */}
                        <div>
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Reading Tips */}
                <div className="dark-card rounded-lg p-4 border border-green-500/30">
                  <h4 className="font-semibold text-slate-200 mb-2">📚 Reading Tips</h4>
                  <ul className="text-xs text-slate-400 space-y-1">
                    <li>• Click paragraphs to jump to specific sections</li>
                    <li>• Adjust speed for comfortable learning pace</li>
                    <li>• Use pause to take notes or reflect</li>
                    <li>• Voice settings are saved for future sessions</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default VoiceReadingModal;