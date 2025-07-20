import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiUser,
  FiUsers,
  FiCpu,
  FiClock,
  FiAward,
  FiArrowRight,
  FiCheck,
  FiX,
  FiAlertTriangle
} = FiIcons;

function Multiplayer() {
  const { state, createGame, startGame, submitAnswer } = useGame();
  const [selectedMode, setSelectedMode] = useState('');
  const [aiDifficulty, setAiDifficulty] = useState('medium');
  const navigate = useNavigate();
  
  useEffect(() => {
    // If the game is finished, navigate to results
    if (state.gameStatus === 'finished') {
      navigate('/game-results');
    }
  }, [state.gameStatus, navigate]);

  const gameModes = [
    {
      id: 'ai',
      name: 'Play vs AI',
      icon: FiCpu,
      description: 'Challenge an AI opponent with adjustable difficulty'
    },
    {
      id: 'multiplayer',
      name: 'Multiplayer',
      icon: FiUsers,
      description: 'Compete with other players in real-time'
    }
  ];

  const difficulties = [
    { id: 'easy', name: 'Easy', color: 'bg-green-500' },
    { id: 'medium', name: 'Medium', color: 'bg-yellow-500' },
    { id: 'hard', name: 'Hard', color: 'bg-red-500' }
  ];

  const handleStartGame = () => {
    createGame(selectedMode, aiDifficulty);
    startGame();
  };

  const formatTime = (seconds) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  if (!state.isActive) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-medical-900 mb-4">
            Multiplayer Challenge
          </h1>
          <p className="text-lg text-medical-600">
            Test your knowledge against AI or other players
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {gameModes.map((mode) => (
            <motion.button
              key={mode.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedMode(mode.id)}
              className={`p-6 rounded-xl border-2 text-left transition-all ${
                selectedMode === mode.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-medical-200 hover:border-primary-300'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${
                  selectedMode === mode.id ? 'bg-primary-500' : 'bg-medical-100'
                } text-white`}>
                  <SafeIcon icon={mode.icon} className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-medical-900 mb-1">{mode.name}</h3>
                  <p className="text-sm text-medical-600">{mode.description}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {selectedMode === 'ai' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-white rounded-xl p-6 border border-medical-200 mb-8"
          >
            <h3 className="font-bold text-medical-900 mb-4">Select AI Difficulty</h3>
            <div className="grid grid-cols-3 gap-4">
              {difficulties.map((diff) => (
                <motion.button
                  key={diff.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setAiDifficulty(diff.id)}
                  className={`p-3 rounded-lg text-center transition-all ${
                    aiDifficulty === diff.id
                      ? `${diff.color} text-white`
                      : 'bg-medical-100 hover:bg-medical-200 text-medical-700'
                  }`}
                >
                  {diff.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartGame}
            disabled={!selectedMode}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
              selectedMode
                ? 'bg-primary-500 text-white hover:bg-primary-600'
                : 'bg-medical-100 text-medical-400 cursor-not-allowed'
            }`}
          >
            Start Game
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // Display error banner if there's a connection issue
  const ErrorBanner = () => {
    if (!state.error) return null;
    
    return (
      <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg flex items-center space-x-3">
        <SafeIcon icon={FiAlertTriangle} className="text-yellow-600" />
        <span className="text-yellow-800">{state.error}</span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <ErrorBanner />
      
      {/* Game Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-6">
          {state.players.map((player) => (
            <div
              key={player.id}
              className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-medical-200"
            >
              <SafeIcon
                icon={player.isHuman ? FiUser : FiCpu}
                className="text-medical-600"
              />
              <span className="font-medium text-medical-900">{player.name}</span>
              <span className="font-bold text-primary-600">
                {Math.round(state.scores[player.id] || 0)}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-2 bg-medical-100 px-4 py-2 rounded-lg">
          <SafeIcon icon={FiClock} className="text-medical-600" />
          <span className="font-medium text-medical-900">
            {formatTime(state.timeLeft)}
          </span>
        </div>
      </div>

      {/* Current Question */}
      {state.currentQuestion && (
        <AnimatePresence mode="wait">
          <motion.div
            key={state.currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-xl p-8 border border-medical-200 mb-6"
          >
            <h2 className="text-xl font-semibold text-medical-900 mb-6">
              {state.currentQuestion.question}
            </h2>

            <div className="space-y-3">
              {state.currentQuestion.options.map((option, index) => {
                const hasAnswered = state.playerAnswers['player1']?.answer !== undefined;
                const isSelected = state.playerAnswers['player1']?.answer === index;
                const isCorrect = index === state.currentQuestion.correct;
                
                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: hasAnswered ? 1 : 1.02 }}
                    whileTap={{ scale: hasAnswered ? 1 : 0.98 }}
                    onClick={() => !hasAnswered && submitAnswer(index)}
                    disabled={hasAnswered}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      hasAnswered
                        ? isCorrect
                          ? 'bg-green-50 border-green-500 text-green-800'
                          : isSelected
                          ? 'bg-red-50 border-red-500 text-red-800'
                          : 'bg-white border-medical-200'
                        : isSelected
                        ? 'bg-primary-50 border-primary-500 text-primary-800'
                        : 'bg-white border-medical-200 hover:border-primary-300 text-medical-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      {hasAnswered && isCorrect && (
                        <SafeIcon icon={FiCheck} className="text-green-600 text-xl" />
                      )}
                      {hasAnswered && isSelected && !isCorrect && (
                        <SafeIcon icon={FiX} className="text-red-600 text-xl" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Progress Bar */}
      <div className="bg-medical-100 rounded-full h-2 mb-4">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${(state.currentRound / 10) * 100}%` }}
          className="bg-primary-500 h-full rounded-full"
        />
      </div>
      <div className="flex justify-between text-sm text-medical-600">
        <span>Question {state.currentRound + 1} of 10</span>
        <span>Round Score: {state.scores['player1'] || 0}</span>
      </div>
    </motion.div>
  );
}

export default Multiplayer;