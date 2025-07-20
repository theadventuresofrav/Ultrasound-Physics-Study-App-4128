import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import ExamQuestion from './ExamQuestion';
import ExamTimer from './ExamTimer';
import ExamNavigation from './ExamNavigation';
import ExamResults from './ExamResults';
import { mockExamQuestions } from '../../data/mockExamQuestions';
import { useStudy } from '../../context/StudyContext';

const { FiFlag, FiSave, FiAlertTriangle } = FiIcons;

function MockExam() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [isExamComplete, setIsExamComplete] = useState(false);
  const [remainingTime, setRemainingTime] = useState(180 * 60); // 3 hours in seconds
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const { dispatch } = useStudy();
  const navigate = useNavigate();
  
  // Refs for timer
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  
  // Start the exam timer
  useEffect(() => {
    if (examStarted && !isExamComplete) {
      startTimeRef.current = Date.now() - ((180 * 60) - remainingTime) * 1000;
      
      timerRef.current = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
        const newRemainingTime = Math.max(0, 180 * 60 - elapsedSeconds);
        
        setRemainingTime(newRemainingTime);
        
        if (newRemainingTime <= 0) {
          clearInterval(timerRef.current);
          submitExam();
        }
      }, 1000);
      
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [examStarted, isExamComplete]);
  
  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };
  
  const handleFlagQuestion = (questionId) => {
    setFlaggedQuestions(prev => {
      if (prev.includes(questionId)) {
        return prev.filter(id => id !== questionId);
      } else {
        return [...prev, questionId];
      }
    });
  };
  
  const goToQuestion = (index) => {
    if (index >= 0 && index < mockExamQuestions.length) {
      setCurrentQuestionIndex(index);
    }
  };
  
  const submitExam = () => {
    // Calculate results
    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;
    
    mockExamQuestions.forEach(question => {
      const selectedAnswer = selectedAnswers[question.id];
      
      if (selectedAnswer === undefined) {
        unansweredCount++;
      } else if (selectedAnswer === question.correctAnswer) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });
    
    const totalQuestions = mockExamQuestions.length;
    const score = Math.round((correctCount / totalQuestions) * 100);
    const timeSpent = (180 * 60) - remainingTime;
    
    // Save results
    dispatch({
      type: 'SAVE_EXAM_RESULT',
      payload: {
        date: new Date().toISOString(),
        score,
        correctCount,
        incorrectCount,
        unansweredCount,
        timeSpent,
        totalQuestions,
        answers: selectedAnswers
      }
    });
    
    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setIsExamComplete(true);
  };
  
  const confirmSubmit = () => {
    setShowConfirmSubmit(true);
  };
  
  const handleStartExam = () => {
    setExamStarted(true);
  };
  
  // Current question data
  const currentQuestion = mockExamQuestions[currentQuestionIndex];
  
  if (!examStarted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-medical-200 shadow-lg">
          <h1 className="text-3xl font-bold text-medical-900 mb-6">Ultrasound Physics Mock Exam</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-medical-800 mb-4">Exam Information</h2>
            <ul className="space-y-3 text-medical-700">
              <li className="flex items-center">
                <span className="w-40 font-medium">Total Questions:</span>
                <span>110 multiple choice questions</span>
              </li>
              <li className="flex items-center">
                <span className="w-40 font-medium">Time Limit:</span>
                <span>3 hours (180 minutes)</span>
              </li>
              <li className="flex items-center">
                <span className="w-40 font-medium">Passing Score:</span>
                <span>75% or higher</span>
              </li>
              <li className="flex items-center">
                <span className="w-40 font-medium">Question Navigation:</span>
                <span>You can move freely between questions</span>
              </li>
              <li className="flex items-center">
                <span className="w-40 font-medium">Flagging:</span>
                <span>You can flag questions to review later</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-primary-50 p-6 rounded-xl mb-8 border border-primary-100">
            <h2 className="text-xl font-semibold text-primary-800 mb-3">Exam Instructions</h2>
            <ul className="space-y-2 text-medical-700">
              <li>• Read each question carefully before selecting an answer</li>
              <li>• You can change your answers at any time during the exam</li>
              <li>• Use the navigation panel to move between questions</li>
              <li>• Flag difficult questions to review later if time permits</li>
              <li>• The timer will display your remaining time</li>
              <li>• The exam will automatically submit when time expires</li>
            </ul>
          </div>
          
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartExam}
              className="px-8 py-4 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors shadow-lg"
            >
              Begin 3-Hour Mock Exam
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }
  
  if (isExamComplete) {
    return (
      <ExamResults
        answers={selectedAnswers}
        questions={mockExamQuestions}
        timeSpent={((180 * 60) - remainingTime)}
      />
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto"
    >
      {/* Exam Header with Timer */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 mb-6 shadow-md border border-medical-200 sticky top-16 z-30">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-medical-900">
            Ultrasound Physics Mock Exam
          </h1>
          
          <div className="flex items-center space-x-4">
            <ExamTimer remainingTime={remainingTime} />
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={confirmSubmit}
              className="px-4 py-2 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2"
            >
              <SafeIcon icon={FiSave} />
              <span>Submit Exam</span>
            </motion.button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Question Navigation Sidebar */}
        <div className="lg:col-span-1">
          <ExamNavigation
            questions={mockExamQuestions}
            currentIndex={currentQuestionIndex}
            selectedAnswers={selectedAnswers}
            flaggedQuestions={flaggedQuestions}
            onQuestionClick={goToQuestion}
          />
        </div>
        
        {/* Question Content */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-medical-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-medical-900">
                  Question {currentQuestionIndex + 1} of {mockExamQuestions.length}
                </h2>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleFlagQuestion(currentQuestion.id)}
                  className={`p-2 rounded-lg flex items-center space-x-2 ${
                    flaggedQuestions.includes(currentQuestion.id)
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-medical-100 text-medical-600 hover:bg-medical-200'
                  }`}
                >
                  <SafeIcon icon={FiFlag} />
                  <span>{flaggedQuestions.includes(currentQuestion.id) ? 'Flagged' : 'Flag Question'}</span>
                </motion.button>
              </div>
              
              <ExamQuestion
                question={currentQuestion}
                selectedAnswer={selectedAnswers[currentQuestion.id]}
                onAnswerSelect={(answerIndex) => handleAnswerSelect(currentQuestion.id, answerIndex)}
                isExamMode={true}
              />
              
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={() => goToQuestion(currentQuestionIndex - 1)}
                  disabled={currentQuestionIndex === 0}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    currentQuestionIndex === 0
                      ? 'bg-medical-100 text-medical-400 cursor-not-allowed'
                      : 'bg-medical-100 text-medical-700 hover:bg-medical-200'
                  }`}
                >
                  Previous Question
                </button>
                
                <button
                  onClick={() => goToQuestion(currentQuestionIndex + 1)}
                  disabled={currentQuestionIndex === mockExamQuestions.length - 1}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    currentQuestionIndex === mockExamQuestions.length - 1
                      ? 'bg-medical-100 text-medical-400 cursor-not-allowed'
                      : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                  }`}
                >
                  Next Question
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Submit Confirmation Modal */}
      <AnimatePresence>
        {showConfirmSubmit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowConfirmSubmit(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <SafeIcon icon={FiAlertTriangle} className="text-yellow-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-medical-900">Submit Exam?</h3>
              </div>
              
              <p className="text-medical-700 mb-6">
                You are about to submit your exam. You have answered {Object.keys(selectedAnswers).length} out of {mockExamQuestions.length} questions.
                {Object.keys(selectedAnswers).length < mockExamQuestions.length && (
                  <span className="block mt-2 text-yellow-600">
                    Warning: You have {mockExamQuestions.length - Object.keys(selectedAnswers).length} unanswered questions.
                  </span>
                )}
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowConfirmSubmit(false)}
                  className="flex-1 px-4 py-3 bg-medical-100 text-medical-700 font-medium rounded-lg hover:bg-medical-200 transition-colors"
                >
                  Continue Exam
                </button>
                <button
                  onClick={submitExam}
                  className="flex-1 px-4 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Submit Exam
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default MockExam;