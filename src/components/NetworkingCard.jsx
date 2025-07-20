import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStudy } from '../context/StudyContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiMessageSquare, FiCopy, FiThumbsUp } = FiIcons;

function NetworkingCard() {
  const { state } = useStudy();
  const [copied, setCopied] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('general');

  const topics = {
    general: [
      "What aspects of ultrasound physics do you find most challenging?",
      "Which textbook or resource has been most helpful for your ultrasound studies?",
      "How do you balance clinical training with physics theory study?"
    ],
    clinical: [
      "Have you encountered interesting artifacts in your clinical practice?",
      "How do you apply physics principles when optimizing image quality?",
      "What's been your most challenging case where physics knowledge was crucial?"
    ],
    career: [
      "What specialty are you most interested in pursuing?",
      "How are you preparing for your registry exams?",
      "What continuing education resources would you recommend?"
    ]
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <SafeIcon icon={FiUsers} className="text-xl text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-medical-900">Networking</h3>
            <p className="text-sm text-medical-600">Connect with fellow sonographers</p>
          </div>
        </div>
      </div>

      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setSelectedTopic('general')}
          className={`px-3 py-1 text-sm rounded-full ${
            selectedTopic === 'general'
              ? 'bg-primary-500 text-white'
              : 'bg-medical-100 text-medical-700 hover:bg-medical-200'
          } transition-colors`}
        >
          General
        </button>
        <button
          onClick={() => setSelectedTopic('clinical')}
          className={`px-3 py-1 text-sm rounded-full ${
            selectedTopic === 'clinical'
              ? 'bg-primary-500 text-white'
              : 'bg-medical-100 text-medical-700 hover:bg-medical-200'
          } transition-colors`}
        >
          Clinical
        </button>
        <button
          onClick={() => setSelectedTopic('career')}
          className={`px-3 py-1 text-sm rounded-full ${
            selectedTopic === 'career'
              ? 'bg-primary-500 text-white'
              : 'bg-medical-100 text-medical-700 hover:bg-medical-200'
          } transition-colors`}
        >
          Career
        </button>
      </div>

      <div className="space-y-3">
        {topics[selectedTopic].map((topic, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-3 bg-medical-50 rounded-lg"
          >
            <div className="flex items-start space-x-3">
              <SafeIcon icon={FiMessageSquare} className="text-primary-600 mt-1" />
              <div className="flex-1">
                <p className="text-medical-800 text-sm">{topic}</p>
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={() => handleCopy(topic)}
                    className="flex items-center space-x-1 text-xs text-primary-600 hover:text-primary-700"
                  >
                    <SafeIcon icon={copied ? FiThumbsUp : FiCopy} className="text-xs" />
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-medical-100 text-center">
        <p className="text-sm text-medical-600">
          Use these conversation starters to connect with peers in your field
        </p>
      </div>
    </motion.div>
  );
}

export default NetworkingCard;