import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { spiCourse } from '../../data/spiCourseData';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiCheck, FiX, FiClock, FiChevronRight, FiChevronLeft, FiTarget } = FiIcons;

function SPIQuizView() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const moduleNum = parseInt(moduleId, 10);
  
  const module = spiCourse.modules.find(m => m.id === moduleNum);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [startTime] = useState(Date.now());
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    // Timer for quiz
    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    
    return () => clearInterval(timer);
  }, [startTime]);

  if (!module || !module.quiz) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-medical-900 mb-4">Quiz not found</h2>
        <button 
          onClick={() => navigate('/spi-course')}
          className="px-6 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
        >
          Return to Course Dashboard
        </button>
      </div>
    );
  }

  const questions = module.quiz.questions;
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
    
    // Show explanation after selecting an answer
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeQuiz();
    }
  };

  const handlePrevQuestion = () => {
    setShowExplanation(false);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const completeQuiz = () => {
    // Calculate results
    let correctCount = 0;
    
    Object.entries(selectedAnswers).forEach(([questionId, selectedAnswer]) => {
      const question = questions.find(q => q.id === questionId);
      if (question && selectedAnswer === question.correctAnswer) {
        correctCount++;
      }
    });
    
    const score = Math.round((correctCount / questions.length) * 100);
    
    // Save results
    const savedProgress = localStorage.getItem('spi-course-progress');
    let progress = savedProgress ? JSON.parse(savedProgress) : {
      moduleProgress: {},
      quizScores: {},
      studyTime: {},
      completedTopics: [],
      lastStudyDate: new Date().toISOString()
    };
    
    // Update quiz score (keep highest score)
    const quizId = `quiz-module${moduleNum}`;
    progress.quizScores[quizId] = Math.max(progress.quizScores[quizId] || 0, score);
    progress.lastStudyDate = new Date().toISOString();
    
    localStorage.setItem('spi-course-progress', JSON.stringify(progress));
    
    setQuizComplete(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (quizComplete) {
    // Calculate results for display
    let correctCount = 0;
    
    Object.entries(selectedAnswers).forEach(([questionId, selectedAnswer]) => {
      const question = questions.find(q => q.id === questionId);
      if (question && selectedAnswer === question.correctAnswer) {
        correctCount++;
      }
    });
    
    const score = Math.round((correctCount / questions.length) * 100);

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-medical-200">
          <h1 className="text-3xl font-bold text-medical-900 mb-6 text-center">Quiz Results</h1>
          
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-40 h-40 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{
              background: `conic-gradient(
                ${score >= 70 ? '#10b981' : '#ef4444'} ${score}%, 
                #e2e8f0 ${score}% 100%
              )`
            }}
          >
            <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center">
              <div>
                <div className="text-3xl font-bold text-medical-900">{score}%</div>
                <div className="text-sm text-medical-600">Score</div>
              </div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">{correctCount}</div>
              <div className="text-sm text-medical-600">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-red-600">{questions.length - correctCount}</div>
              <div className="text-sm text-medical-600">Incorrect</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">{formatTime(timeElapsed)}</div>
              <div className="text-sm text-medical-600">Time</div>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <div className="text-lg font-semibold text-medical-900 mb-2">
              {score >= 70 ? 'Great job!' : 'Keep practicing!'}
            </div>
            <p className="text-medical-600">
              {score >= 70 
                ? 'You\'ve demonstrated a good understanding of this module\'s content.' 
                : 'Review the topics in this module to improve your understanding.'}
            </p>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate(`/spi-course/module/${moduleNum}`)}
              className="px-6 py-3 bg-medical-100 text-medical-700 font-medium rounded-lg hover:bg-medical-200 transition-colors"
            >
              Return to Module
            </button>
            
            <button
              onClick={() => {
                setSelectedAnswers({});
                setCurrentQuestionIndex(0);
                setQuizComplete(false);
                setShowExplanation(false);
              }}
              className="px-6 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <button 
          onClick={() => navigate(`/spi-course/module/${moduleNum}`)}
          className="flex items-center text-primary-600 hover:text-primary-700 mb-4"
        >
          <SafeIcon icon={FiArrowLeft} className="mr-1" />
          <span>Back to Module</span>
        </button>
        
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-medical-900">
            Module {module.id} Quiz
          </h1>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-medical-600">
              <SafeIcon icon={FiClock} className="mr-1" />
              <span>{formatTime(timeElapsed)}</span>
            </div>
            
            <div className="flex items-center text-medical-600">
              <SafeIcon icon={FiTarget} className="mr-1" />
              <span>{currentQuestionIndex + 1}/{questions.length}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="h-2 bg-medical-100 rounded-full mb-6">
        <motion.div 
          animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          className="h-full bg-primary-500 rounded-full"
        />
      </div>
      
      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200 mb-6"
        >
          <h2 className="text-xl font-semibold text-medical-900 mb-6">
            {currentQuestion.question}
          </h2>
          
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => {
              const selected = selectedAnswers[currentQuestion.id] === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const showResult = showExplanation;
              
              let buttonClasses = "w-full p-4 rounded-xl border-2 text-left transition-all";
              
              if (showResult) {
                if (isCorrect) {
                  buttonClasses += " bg-green-50 border-green-500 text-green-800";
                } else if (selected) {
                  buttonClasses += " bg-red-50 border-red-500 text-red-800";
                } else {
                  buttonClasses += " bg-white border-medical-200";
                }
              } else {
                buttonClasses += selected 
                  ? " bg-primary-50 border-primary-500 text-primary-800" 
                  : " bg-white border-medical-200 hover:border-primary-300 text-medical-700";
              }
              
              return (
                <motion.button
                  key={index}
                  whileHover={!showExplanation ? { scale: 1.01 } : {}}
                  whileTap={!showExplanation ? { scale: 0.99 } : {}}
                  onClick={() => !showExplanation && handleAnswerSelect(currentQuestion.id, index)}
                  disabled={showExplanation}
                  className={buttonClasses}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    
                    {showResult && isCorrect && (
                      <SafeIcon icon={FiCheck} className="text-green-600 text-xl" />
                    )}
                    
                    {showResult && selected && !isCorrect && (
                      <SafeIcon icon={FiX} className="text-red-600 text-xl" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
          
          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
              >
                <h3 className="font-semibold text-medical-900 mb-2">Explanation</h3>
                <p className="text-medical-700">{currentQuestion.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
          className={`px-4 py-2 rounded-lg flex items-center ${
            currentQuestionIndex === 0
              ? 'bg-medical-100 text-medical-400 cursor-not-allowed'
              : 'bg-medical-100 text-medical-700 hover:bg-medical-200'
          }`}
        >
          <SafeIcon icon={FiChevronLeft} className="mr-1" />
          <span>Previous</span>
        </button>
        
        <div className="flex space-x-2">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentQuestionIndex(index);
                setShowExplanation(selectedAnswers[questions[index].id] !== undefined);
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                index === currentQuestionIndex
                  ? 'bg-primary-500 text-white'
                  : selectedAnswers[questions[index].id] !== undefined
                    ? 'bg-green-100 text-green-700'
                    : 'bg-medical-100 text-medical-600 hover:bg-medical-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        
        <button
          onClick={handleNextQuestion}
          disabled={!showExplanation && selectedAnswers[currentQuestion.id] === undefined}
          className={`px-4 py-2 rounded-lg flex items-center ${
            !showExplanation && selectedAnswers[currentQuestion.id] === undefined
              ? 'bg-medical-100 text-medical-400 cursor-not-allowed'
              : 'bg-primary-500 text-white hover:bg-primary-600'
          }`}
        >
          <span>{currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}</span>
          <SafeIcon icon={FiChevronRight} className="ml-1" />
        </button>
      </div>
    </motion.div>
  );
}

export default SPIQuizView;