import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { allQuestions } from '../../data/questions';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiZap, FiClock, FiTarget, FiTrendingUp, FiCheck, FiX } = FiIcons;

function RealtimeQuizChallenge() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  // Generate new question
  const generateNewQuestion = () => {
    const randomQuestion = allQuestions[Math.floor(Math.random() * allQuestions.length)];
    setCurrentQuestion(randomQuestion);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(15);
  };

  // Start challenge
  const startChallenge = () => {
    setIsActive(true);
    setScore(0);
    setStreak(0);
    setQuestionsAnswered(0);
    setAccuracy(100);
    generateNewQuestion();
  };

  // Timer effect
  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0 && !showResult) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeout();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isActive, showResult]);

  // Handle answer selection
  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const isCorrect = answerIndex === currentQuestion.correct;
    const newQuestionsAnswered = questionsAnswered + 1;
    
    if (isCorrect) {
      const timeBonus = Math.max(0, (timeLeft * 10));
      setScore(prev => prev + 100 + timeBonus);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
    
    setQuestionsAnswered(newQuestionsAnswered);
    
    // Calculate new accuracy
    const correctAnswers = isCorrect ? (questionsAnswered * (accuracy / 100)) + 1 : (questionsAnswered * (accuracy / 100));
    setAccuracy(Math.round((correctAnswers / newQuestionsAnswered) * 100));

    // Auto-advance to next question
    setTimeout(() => {
      generateNewQuestion();
    }, 2000);
  };

  // Handle timeout
  const handleTimeout = () => {
    setShowResult(true);
    setStreak(0);
    setQuestionsAnswered(prev => prev + 1);
    
    // Recalculate accuracy for timeout (counts as incorrect)
    const correctAnswers = questionsAnswered * (accuracy / 100);
    setAccuracy(Math.round((correctAnswers / (questionsAnswered + 1)) * 100));

    setTimeout(() => {
      generateNewQuestion();
    }, 2000);
  };

  // Stop challenge
  const stopChallenge = () => {
    setIsActive(false);
    setCurrentQuestion(null);
  };

  if (!isActive) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiZap} className="text-3xl text-white" />
          </div>
          <h2 className="text-2xl font-bold text-medical-900 mb-2">Lightning Round Challenge</h2>
          <p className="text-medical-600 mb-6">
            Answer as many questions as possible! Each question has 15 seconds.
          </p>
          
          <div className="grid grid-cols-3 gap-4 mb-6 max-w-md mx-auto">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-600">15s</div>
              <div className="text-xs text-blue-600">Per Question</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-600">∞</div>
              <div className="text-xs text-green-600">Questions</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-purple-600">🏆</div>
              <div className="text-xs text-purple-600">Streak Bonus</div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startChallenge}
            className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all shadow-lg"
          >
            Start Lightning Round
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      {/* Header with stats */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiTarget} className="text-blue-600" />
            <div>
              <div className="font-bold text-blue-600">{score}</div>
              <div className="text-xs text-medical-600">Score</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiZap} className="text-orange-600" />
            <div>
              <div className="font-bold text-orange-600">{streak}</div>
              <div className="text-xs text-medical-600">Streak</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiTrendingUp} className="text-green-600" />
            <div>
              <div className="font-bold text-green-600">{accuracy}%</div>
              <div className="text-xs text-medical-600">Accuracy</div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <motion.div
            animate={timeLeft <= 5 ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5, repeat: timeLeft <= 5 ? Infinity : 0 }}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
              timeLeft <= 5 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
            }`}
          >
            <SafeIcon icon={FiClock} />
            <span className="font-mono font-bold">{timeLeft}s</span>
          </motion.div>
          
          <button
            onClick={stopChallenge}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            End Challenge
          </button>
        </div>
      </div>

      {/* Timer Progress Bar */}
      <div className="mb-6 h-2 bg-medical-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${
            timeLeft <= 5 ? 'bg-red-500' : timeLeft <= 10 ? 'bg-yellow-500' : 'bg-green-500'
          }`}
          animate={{ width: `${(timeLeft / 15) * 100}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        {currentQuestion && (
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-4"
          >
            <div className="bg-medical-50 rounded-lg p-4 border border-medical-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-medical-600">
                  Question #{questionsAnswered + 1}
                </span>
                <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs">
                  {currentQuestion.sectionId ? `Section ${currentQuestion.sectionId}` : 'Mixed'}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-medical-900">
                {currentQuestion.question}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentQuestion.options.map((option, index) => {
                let buttonClass = "p-4 rounded-xl border-2 text-left transition-all font-medium";
                
                if (showResult) {
                  if (index === currentQuestion.correct) {
                    buttonClass += " bg-green-100 border-green-500 text-green-800";
                  } else if (selectedAnswer === index) {
                    buttonClass += " bg-red-100 border-red-500 text-red-800";
                  } else {
                    buttonClass += " bg-white border-medical-200 text-medical-700";
                  }
                } else {
                  buttonClass += selectedAnswer === index 
                    ? " bg-primary-100 border-primary-500 text-primary-800"
                    : " bg-white border-medical-200 hover:border-primary-300 text-medical-700 hover:bg-medical-50";
                }

                return (
                  <motion.button
                    key={index}
                    whileHover={!showResult ? { scale: 1.02 } : {}}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <span>{String.fromCharCode(65 + index)}. {option}</span>
                      {showResult && index === currentQuestion.correct && (
                        <SafeIcon icon={FiCheck} className="text-green-600 text-xl" />
                      )}
                      {showResult && selectedAnswer === index && index !== currentQuestion.correct && (
                        <SafeIcon icon={FiX} className="text-red-600 text-xl" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Result feedback */}
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg border ${
                  selectedAnswer === currentQuestion.correct
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <SafeIcon 
                    icon={selectedAnswer === currentQuestion.correct ? FiCheck : FiX} 
                    className={selectedAnswer === currentQuestion.correct ? 'text-green-600' : 'text-red-600'} 
                  />
                  <span className={`font-bold ${
                    selectedAnswer === currentQuestion.correct ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {selectedAnswer === currentQuestion.correct ? 'Correct!' : 'Incorrect'}
                  </span>
                  {selectedAnswer === currentQuestion.correct && streak > 1 && (
                    <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full text-xs font-bold">
                      🔥 {streak} Streak!
                    </span>
                  )}
                </div>
                <p className={`text-sm ${
                  selectedAnswer === currentQuestion.correct ? 'text-green-700' : 'text-red-700'
                }`}>
                  {currentQuestion.explanation}
                </p>
                {selectedAnswer === currentQuestion.correct && (
                  <div className="mt-2 text-xs text-green-600">
                    +{100 + Math.max(0, timeLeft * 10)} points (time bonus: +{Math.max(0, timeLeft * 10)})
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Performance indicators */}
      {questionsAnswered > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200"
        >
          <h3 className="font-semibold text-medical-900 mb-3">Performance Metrics</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{questionsAnswered}</div>
              <div className="text-xs text-medical-600">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
              <div className="text-xs text-medical-600">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{Math.round(score / Math.max(questionsAnswered, 1))}</div>
              <div className="text-xs text-medical-600">Avg Score</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default RealtimeQuizChallenge;