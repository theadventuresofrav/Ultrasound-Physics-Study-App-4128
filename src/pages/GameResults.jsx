import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiAward, FiTrendingUp, FiClock, FiRotateCcw, FiHome } = FiIcons;

function GameResults() {
  const { state, createGame } = useGame();

  const sortedPlayers = [...state.players].sort(
    (a, b) => (state.scores[b.id] || 0) - (state.scores[a.id] || 0)
  );

  const getAccuracy = (playerId) => {
    const playerRounds = state.roundResults.filter(
      round => round.answers[playerId]?.answer !== undefined
    );
    
    const correctAnswers = playerRounds.filter(
      round => round.answers[playerId].answer === round.question.correct
    );

    return Math.round((correctAnswers.length / playerRounds.length) * 100) || 0;
  };

  const getAverageTime = (playerId) => {
    const playerRounds = state.roundResults.filter(
      round => round.answers[playerId]?.timeElapsed !== undefined
    );
    
    const totalTime = playerRounds.reduce(
      (sum, round) => sum + round.answers[playerId].timeElapsed,
      0
    );

    return (totalTime / (playerRounds.length * 1000)).toFixed(1);
  };

  const playAgain = () => {
    createGame(state.gameMode, state.aiDifficulty);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto text-center"
    >
      <div className="bg-white rounded-2xl p-8 border border-medical-200 mb-8">
        <h1 className="text-3xl font-bold text-medical-900 mb-2">Game Complete!</h1>
        <p className="text-medical-600 mb-8">Here's how everyone performed</p>

        {/* Winner Trophy */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mb-12"
        >
          <div className="inline-flex items-center justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-primary-500 flex items-center justify-center">
                <SafeIcon icon={FiAward} className="text-4xl text-white" />
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1 rounded-full border border-primary-200">
                <span className="font-bold text-primary-600">
                  {sortedPlayers[0].name} Wins!
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Player Results */}
        <div className="grid gap-4 mb-8">
          {sortedPlayers.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-xl border-2 ${
                index === 0
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-medical-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full ${
                    index === 0 ? 'bg-primary-500' : 'bg-medical-500'
                  } text-white flex items-center justify-center font-bold`}>
                    {index + 1}
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-medical-900">{player.name}</h3>
                    <p className="text-sm text-medical-600">
                      {player.isHuman ? 'Human Player' : 'AI Opponent'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-600">
                    {Math.round(state.scores[player.id] || 0)}
                  </div>
                  <div className="text-sm text-medical-600">points</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-medical-50 rounded-lg p-3">
                  <div className="flex items-center justify-center space-x-2">
                    <SafeIcon icon={FiTrendingUp} className="text-medical-600" />
                    <span className="font-bold text-medical-900">
                      {getAccuracy(player.id)}%
                    </span>
                  </div>
                  <div className="text-xs text-medical-600">Accuracy</div>
                </div>
                <div className="bg-medical-50 rounded-lg p-3">
                  <div className="flex items-center justify-center space-x-2">
                    <SafeIcon icon={FiClock} className="text-medical-600" />
                    <span className="font-bold text-medical-900">
                      {getAverageTime(player.id)}s
                    </span>
                  </div>
                  <div className="text-xs text-medical-600">Avg. Time</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={playAgain}
            className="flex items-center space-x-2 bg-primary-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-600 transition-colors"
          >
            <SafeIcon icon={FiRotateCcw} />
            <span>Play Again</span>
          </motion.button>
          
          <Link
            to="/"
            className="flex items-center space-x-2 bg-white text-medical-700 px-6 py-3 rounded-xl font-medium hover:bg-medical-50 border border-medical-200 transition-colors"
          >
            <SafeIcon icon={FiHome} />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default GameResults;