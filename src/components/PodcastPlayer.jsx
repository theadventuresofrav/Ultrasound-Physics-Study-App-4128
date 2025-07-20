import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlay, FiPause, FiSkipForward, FiSkipBack, FiVolume2, FiVolume, FiX, FiMaximize, FiMinimize } = FiIcons;

function PodcastPlayer({ episode, onClose, minimized = false, onToggleMinimize }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef(null);

  useEffect(() => {
    // Reset player when episode changes
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
      
      // Load new episode
      if (episode?.audioUrl) {
        audioRef.current.src = episode.audioUrl;
        audioRef.current.load();
      }
    }
  }, [episode?.audioUrl]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const skip = (seconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        Math.max(audioRef.current.currentTime + seconds, 0),
        duration
      );
    }
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!episode) return null;

  // Minimized player
  if (minimized) {
    return (
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg border border-medical-200 p-3 w-72"
      >
        <div className="flex items-center space-x-3">
          <button
            onClick={togglePlayPause}
            className="w-8 h-8 flex items-center justify-center bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
          >
            <SafeIcon icon={isPlaying ? FiPause : FiPlay} />
          </button>
          
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-semibold text-medical-900 truncate">{episode.title}</h4>
            <div className="text-xs text-medical-600 flex items-center">
              <span>{formatTime(currentTime)}</span>
              <div className="mx-1 flex-1 h-1 bg-medical-200 rounded-full">
                <div 
                  className="h-full bg-primary-500 rounded-full" 
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={onToggleMinimize}
              className="p-1 text-medical-600 hover:text-medical-900"
              title="Expand player"
            >
              <SafeIcon icon={FiMaximize} className="text-sm" />
            </button>
            <button
              onClick={onClose}
              className="p-1 text-medical-600 hover:text-medical-900"
              title="Close player"
            >
              <SafeIcon icon={FiX} className="text-sm" />
            </button>
          </div>
        </div>
        
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />
      </motion.div>
    );
  }

  // Full player
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-xl p-6 w-full max-w-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-medical-900">Now Playing</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={onToggleMinimize}
              className="p-2 text-medical-600 hover:bg-medical-100 rounded-full transition-colors"
              title="Minimize player"
            >
              <SafeIcon icon={FiMinimize} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-medical-600 hover:bg-medical-100 rounded-full transition-colors"
              title="Close player"
            >
              <SafeIcon icon={FiX} />
            </button>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary-100 rounded-md flex-shrink-0 overflow-hidden">
              {episode.imageUrl ? (
                <img src={episode.imageUrl} alt={episode.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary-200 text-primary-600">
                  <SafeIcon icon={FiVolume2} className="text-2xl" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-medical-900 mb-1 line-clamp-2">{episode.title}</h4>
              <p className="text-sm text-medical-600">
                {new Date(episode.publishDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-medical-600 mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
            className="w-full h-2 bg-medical-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500"
          />
        </div>
        
        <div className="flex items-center justify-center space-x-6 mb-6">
          <button
            onClick={() => skip(-10)}
            className="p-3 text-medical-700 hover:text-medical-900 transition-colors"
            title="Skip back 10 seconds"
          >
            <SafeIcon icon={FiSkipBack} className="text-xl" />
          </button>
          
          <button
            onClick={togglePlayPause}
            className="w-14 h-14 flex items-center justify-center bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
          >
            <SafeIcon icon={isPlaying ? FiPause : FiPlay} className="text-2xl" />
          </button>
          
          <button
            onClick={() => skip(10)}
            className="p-3 text-medical-700 hover:text-medical-900 transition-colors"
            title="Skip forward 10 seconds"
          >
            <SafeIcon icon={FiSkipForward} className="text-xl" />
          </button>
        </div>
        
        <div className="flex items-center space-x-3 mb-4">
          <SafeIcon icon={volume > 0.5 ? FiVolume2 : FiVolume} className="text-medical-600" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-1 bg-medical-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500"
          />
        </div>
        
        <div className="text-sm text-medical-600 bg-medical-50 p-4 rounded-lg max-h-32 overflow-y-auto">
          <p className="line-clamp-4">{episode.description}</p>
        </div>
        
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />
      </motion.div>
    </motion.div>
  );
}

export default PodcastPlayer;