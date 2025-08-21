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

const { FiFlag, FiSave, FiAlertTriangle, FiClock, FiTarget, FiBookOpen } = FiIcons;

function ComprehensiveExam() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [isExamComplete, setIsExamComplete] = useState(false);
  const [remainingTime, setRemainingTime] = useState(150 * 60); // 2.5 hours in seconds
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const { dispatch } = useStudy();
  const navigate = useNavigate();

  // Refs for timer
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  // Start the exam timer
  useEffect(() => {
    if (examStarted && !isExamComplete) {
      startTimeRef.current = Date.now() - ((150 * 60) - remainingTime) * 1000;
      timerRef.current = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
        const newRemainingTime = Math.max(0, 150 * 60 - elapsedSeconds);
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
    const timeSpent = (150 * 60) - remainingTime;

    // Save results to study context
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
        answers: selectedAnswers,
        examType: 'Comprehensive SPI Exam'
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
    setShowInstructions(false);
  };

  // Current question data
  const currentQuestion = mockExamQuestions[currentQuestionIndex];

  // Instructions Screen
  if (showInstructions) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-medical-200 shadow-lg">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-primary-500 rounded-full mx-auto flex items-center justify-center mb-4">
              <SafeIcon icon={FiTarget} className="text-3xl text-white" />
            </div>
            <h1 className="text-3xl font-bold text-medical-900 mb-2">Comprehensive SPI Exam</h1>
            <p className="text-medical-600">
              Sonography Principles & Instrumentation Practice Exam
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-primary-50 rounded-xl p-6 border border-primary-200">
              <h2 className="text-xl font-bold text-medical-900 mb-4 flex items-center">
                <SafeIcon icon={FiBookOpen} className="mr-2 text-primary-600" />
                Exam Information
              </h2>
              <ul className="space-y-3 text-medical-700">
                <li className="flex items-center">
                  <span className="w-40 font-medium">Total Questions:</span>
                  <span>110 multiple choice questions</span>
                </li>
                <li className="flex items-center">
                  <span className="w-40 font-medium">Time Limit:</span>
                  <span>2.5 hours (150 minutes)</span>
                </li>
                <li className="flex items-center">
                  <span className="w-40 font-medium">Passing Score:</span>
                  <span>75% or higher</span>
                </li>
                <li className="flex items-center">
                  <span className="w-40 font-medium">Question Types:</span>
                  <span>Multiple choice (A, B, C, D)</span>
                </li>
                <li className="flex items-center">
                  <span className="w-40 font-medium">Navigation:</span>
                  <span>You can move freely between questions</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h2 className="text-xl font-bold text-medical-900 mb-4 flex items-center">
                <SafeIcon icon={FiClock} className="mr-2 text-blue-600" />
                Content Areas
              </h2>
              <ul className="space-y-2 text-medical-700 text-sm">
                <li>• Physics Fundamentals (30 questions)</li>
                <li>• Transducer Technology (25 questions)</li>
                <li>• Doppler and Hemodynamics (25 questions)</li>
                <li>• Artifacts and QA (20 questions)</li>
                <li>• Advanced Techniques (10 questions)</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200 mb-8">
            <h2 className="text-xl font-bold text-medical-900 mb-3 flex items-center">
              <SafeIcon icon={FiAlertTriangle} className="mr-2 text-yellow-600" />
              Important Instructions
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-2 text-medical-700">
                <li>• Read each question carefully before selecting an answer</li>
                <li>• You can change your answers at any time during the exam</li>
                <li>• Use the navigation panel to move between questions</li>
                <li>• Flag difficult questions to review later if time permits</li>
              </ul>
              <ul className="space-y-2 text-medical-700">
                <li>• The timer will display your remaining time</li>
                <li>• The exam will automatically submit when time expires</li>
                <li>• Review your answers before final submission</li>
                <li>• Detailed explanations will be provided after completion</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartExam}
              className="px-8 py-4 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors shadow-lg text-lg"
            >
              Begin Comprehensive SPI Exam
            </motion.button>
            <p className="text-sm text-medical-500 mt-4">
              Make sure you have 2.5 hours available before starting
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Results Screen
  if (isExamComplete) {
    return (
      <ExamResults
        answers={selectedAnswers}
        questions={mockExamQuestions}
        timeSpent={((150 * 60) - remainingTime)}
      />
    );
  }

  // Main Exam Interface
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto"
    >
      {/* Exam Header with Timer */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 mb-6 shadow-md border border-medical-200 sticky top-16 z-30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-medical-900">
              Comprehensive SPI Exam
            </h1>
            <p className="text-sm text-medical-600">
              Question {currentQuestionIndex + 1} of {mockExamQuestions.length}
            </p>
          </div>

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

        {/* Progress Bar */}
        <div className="mt-4 h-2 bg-medical-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / mockExamQuestions.length) * 100}%` }}
            className="h-full bg-primary-500 rounded-full"
            transition={{ duration: 0.3 }}
          />
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
                <div className="flex items-center space-x-4">
                  <h2 className="text-lg font-semibold text-medical-900">
                    Question {currentQuestionIndex + 1}
                  </h2>
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                    {currentQuestion.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    currentQuestion.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    currentQuestion.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {currentQuestion.difficulty}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleFlagQuestion(currentQuestion.id)}
                  className={`p-2 rounded-lg flex items-center space-x-2 transition-colors ${
                    flaggedQuestions.includes(currentQuestion.id)
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-medical-100 text-medical-600 hover:bg-medical-200'
                  }`}
                >
                  <SafeIcon icon={FiFlag} />
                  <span>{flaggedQuestions.includes(currentQuestion.id) ? 'Flagged' : 'Flag'}</span>
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
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentQuestionIndex === 0
                      ? 'bg-medical-100 text-medical-400 cursor-not-allowed'
                      : 'bg-medical-100 text-medical-700 hover:bg-medical-200'
                  }`}
                >
                  Previous Question
                </button>

                <div className="text-center">
                  <p className="text-sm text-medical-600">
                    {Object.keys(selectedAnswers).length} of {mockExamQuestions.length} answered
                  </p>
                </div>

                <button
                  onClick={() => goToQuestion(currentQuestionIndex + 1)}
                  disabled={currentQuestionIndex === mockExamQuestions.length - 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
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
                You are about to submit your Comprehensive SPI Exam. You have answered{' '}
                {Object.keys(selectedAnswers).length} out of {mockExamQuestions.length} questions.
                {Object.keys(selectedAnswers).length < mockExamQuestions.length && (
                  <span className="block mt-2 text-yellow-600 font-medium">
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

export default ComprehensiveExam;