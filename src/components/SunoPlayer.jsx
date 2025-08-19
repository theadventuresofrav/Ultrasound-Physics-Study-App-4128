import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMusic, FiPlay, FiPause, FiExternalLink, FiInfo } = FiIcons;

function SunoPlayer() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const tracks = [
    {
      id: 1,
      title: "Waves of Sound",
      description: "A musical journey through ultrasound wave physics",
      duration: "2:45",
      url: "https://suno.com/@ultrasoundphysics/waves-of-sound"
    },
    {
      id: 2,
      title: "Doppler Effect Groove",
      description: "Understanding frequency shifts through rhythm",
      duration: "3:15",
      url: "https://suno.com/@ultrasoundphysics/doppler-groove"
    },
    {
      id: 3,
      title: "Piezoelectric Beat",
      description: "The science of transducers in musical form",
      duration: "2:30",
      url: "https://suno.com/@ultrasoundphysics/piezo-beat"
    }
  ];

  const handlePlay = (track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <SafeIcon icon={FiMusic} className="text-2xl text-primary-600" />
          <div>
            <h2 className="text-2xl font-bold text-medical-900">Learn with Music</h2>
            <p className="text-medical-600">AI-generated educational tracks about ultrasound physics</p>
          </div>
        </div>
        <a
          href="https://suno.com/@ultrasoundphysics"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
        >
          <span>Visit Channel</span>
          <SafeIcon icon={FiExternalLink} />
        </a>
      </div>

      <div className="space-y-4">
        {tracks.map((track) => (
          <motion.div
            key={track.id}
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl border border-primary-200"
          >
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handlePlay(track)}
                className="w-12 h-12 flex items-center justify-center bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
              >
                <SafeIcon 
                  icon={currentTrack?.id === track.id && isPlaying ? FiPause : FiPlay} 
                  className="text-lg"
                />
              </button>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-medical-900 truncate">{track.title}</h3>
                <p className="text-sm text-medical-600 truncate">{track.description}</p>
                <div className="mt-1 flex items-center text-xs text-medical-500">
                  <span>{track.duration}</span>
                </div>
              </div>
              <a
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-primary-600 hover:text-primary-700"
                title="View on Suno"
              >
                <SafeIcon icon={FiExternalLink} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <SafeIcon icon={FiInfo} className="text-blue-600 mt-1" />
          <div>
            <h3 className="font-semibold text-medical-900 mb-1">About Music Learning</h3>
            <p className="text-sm text-medical-700">
              These AI-generated tracks combine educational content with engaging melodies to help you remember key concepts in ultrasound physics. Listen while studying or during breaks to reinforce your learning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SunoPlayer;