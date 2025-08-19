import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { allQuestions } from '../data/questions';
import { useStudy } from '../context/StudyContext';
import { useAuth } from '../context/AuthContext';
import SafeIcon from '../common/SafeIcon';
import MembershipGate from '../components/MembershipGate';
import UsageTracker from '../components/UsageTracker';
import * as FiIcons from 'react-icons/fi';

const { FiClock, FiTarget, FiCheck, FiX, FiArrowLeft, FiRotateCcw } = FiIcons;

function QuizMode() {
  const { mode } = useParams();
  const { dispatch } = useStudy();
  const { canUseFeature, membership } = useAuth();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [startTime] = useState(Date.now());
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [dailyQuizCount, setDailyQuizCount] = useState(0);

  // Check daily usage
  useEffect(() => {
    const today = new Date().toDateString();
    const savedData = localStorage.getItem(`daily-quiz-usage-${today}`);
    const usage = savedData ? JSON.parse(savedData) : { count: 0, date: today };
    setDailyQuizCount(usage.count);
  }, []);

  // Check if user can take quiz
  const canTakeQuiz = canUseFeature('dailyQuizzes', dailyQuizCount);

  useEffect(() => {
    if (canTakeQuiz) {
      // Generate quiz questions
      const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
      setQuizQuestions(shuffled.slice(0, 10)); // 10 question quiz
    }
  }, [mode, canTakeQuiz]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;

  const handleAnswerSelect = (answerIndex) => {
    if (quizComplete) return;

    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answerIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeQuiz();
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const completeQuiz = () => {
    const results = quizQuestions.map((question, index) => ({
      questionId: question.id,
      selected: selectedAnswers[index],
      correct: question.correct,
      isCorrect: selectedAnswers[index] === question.correct
    }));

    const score = results.filter(r => r.isCorrect).length;
    const percentage = Math.round((score / totalQuestions) * 100);

    dispatch({
      type: 'SAVE_QUIZ_RESULT',
      payload: {
        date: new Date().toISOString(),
        score,
        total: totalQuestions,
        percentage,
        timeElapsed,
        results
      }
    });

    // Record individual answers
    results.forEach(result => {
      dispatch({
        type: 'ANSWER_QUESTION',
        payload: {
          questionId: result.questionId,
          isCorrect: result.isCorrect,
          sectionId: quizQuestions.find(q => q.id === result.questionId)?.sectionId
        }
      });
    });

    // Update daily usage
    const today = new Date().toDateString();
    const newUsage = { count: dailyQuizCount + 1, date: today };
    localStorage.setItem(`daily-quiz-usage-${today}`, JSON.stringify(newUsage));
    setDailyQuizCount(newUsage.count);

    setQuizComplete(true);
  };

  const restartQuiz = () => {
    if (!canUseFeature('dailyQuizzes', dailyQuizCount)) {
      return; // Can't restart if limit reached
    }

    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    setQuizQuestions(shuffled.slice(0, 10));
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizComplete(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Show membership gate if user can't access
  if (!canTakeQuiz) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-4"
          >
            <SafeIcon icon={FiArrowLeft} />
            <span>Back to Dashboard</span>
          </Link>
        </div>
        
        <MembershipGate 
          requiredTier="premium" 
          feature="Unlimited Practice Quizzes"
          fallback={
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-medical-200 text-center">
              <h2 className="text-2xl font-bold text-medical-900 mb-4">Daily Quiz Limit Reached</h2>
              <p className="text-medical-600 mb-6">
                You've used all {membership.limits.dailyQuizzes} of your daily practice quizzes. 
                Upgrade to Premium for unlimited access!
              </p>
              <UsageTracker feature="dailyQuizzes" currentUsage={dailyQuizCount} />
              <div className="mt-6">
                <Link
                  to="/membership"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors"
                >
                  <span>Upgrade Now</span>
                </Link>
              </div>
            </div>
          }
        />
      </div>
    );
  }

  if (quizQuestions.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-medical-600">Loading quiz questions...</p>
        </div>
      </div>
    );
  }

  if (quizComplete) {
    const score = Object.values(selectedAnswers).filter(
      (answer, index) => answer === quizQuestions[index].correct
    ).length;
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-medical-200">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
              percentage >= 80 ? 'bg-green-100' : percentage >= 60 ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              <SafeIcon icon={percentage >= 80 ? FiCheck : FiTarget} className={`text-3xl ${
                percentage >= 80 ? 'text-green-600' : percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
              }`} />
            </div>
          </motion.div>

          <h2 className="text-3xl font-bold text-medical-900 mb-2">Quiz Complete!</h2>
          <p className="text-medical-600 mb-8">
            Here's how you performed on this practice quiz
          </p>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div>
              <div className="text-2xl font-bold text-primary-600">{score}/{totalQuestions}</div>
              <div className="text-sm text-medical-600">Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-600">{percentage}%</div>
              <div className="text-sm text-medical-600">Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-600">{formatTime(timeElapsed)}</div>
              <div className="text-sm text-medical-600">Time</div>
            </div>
          </div>

          {/* Usage Tracker */}
          <div className="mb-6">
            <UsageTracker feature="dailyQuizzes" currentUsage={dailyQuizCount} />
          </div>

          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={restartQuiz}
              disabled={!canUseFeature('dailyQuizzes', dailyQuizCount)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                canUseFeature('dailyQuizzes', dailyQuizCount)
                  ? 'bg-primary-500 text-white hover:bg-primary-600'
                  : 'bg-medical-100 text-medical-400 cursor-not-allowed'
              }`}
            >
              <SafeIcon icon={FiRotateCcw} />
              <span>Try Again</span>
            </motion.button>
            <Link
              to="/"
              className="flex items-center space-x-2 bg-white text-medical-700 px-6 py-3 rounded-xl font-medium hover:bg-medical-50 border border-medical-200 transition-colors"
            >
              <SafeIcon icon={FiArrowLeft} />
              <span>Dashboard</span>
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  const selectedAnswer = selectedAnswers[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-4"
        >
          <SafeIcon icon={FiArrowLeft} />
          <span>Back to Dashboard</span>
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-medical-900 mb-2">Practice Quiz</h1>
            <p className="text-medical-600">Test your knowledge with random questions</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-4 text-sm text-medical-600 mb-2">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiClock} />
                <span>{formatTime(timeElapsed)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiTarget} />
                <span>{currentQuestionIndex + 1} / {totalQuestions}</span>
              </div>
            </div>
            <UsageTracker feature="dailyQuizzes" currentUsage={dailyQuizCount} showDetails={false} />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 h-2 bg-medical-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-primary-500 rounded-full"
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-medical-200 mb-6"
        >
          <h2 className="text-xl font-semibold text-medical-900 mb-6">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  selectedAnswer === index
                    ? 'bg-primary-50 border-primary-500 text-primary-800'
                    : 'bg-white border-medical-200 hover:border-primary-300 text-medical-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option}</span>
                  {selectedAnswer === index && (
                    <SafeIcon icon={FiCheck} className="text-primary-600 text-xl" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                currentQuestionIndex === 0
                  ? 'bg-medical-100 text-medical-400 cursor-not-allowed'
                  : 'bg-white text-medical-700 hover:bg-medical-50 border border-medical-200'
              }`}
            >
              Previous
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextQuestion}
              disabled={selectedAnswer === undefined}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                selectedAnswer === undefined
                  ? 'bg-medical-100 text-medical-400 cursor-not-allowed'
                  : 'bg-primary-500 text-white hover:bg-primary-600'
              }`}
            >
              {currentQuestionIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Question Navigator */}
      <div className="flex justify-center">
        <div className="flex space-x-2">
          {quizQuestions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
                index === currentQuestionIndex
                  ? 'bg-primary-500 text-white scale-110'
                  : selectedAnswers[index] !== undefined
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-medical-200 text-medical-600 hover:bg-medical-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default QuizMode;