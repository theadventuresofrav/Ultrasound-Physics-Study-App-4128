import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { sections } from '../data/questions';
import { useStudy } from '../context/StudyContext';
import SafeIcon from '../common/SafeIcon';
import DiagramViewer from '../components/DiagramViewer';
import { getDiagrams } from '../services/diagramService';
import confetti from 'canvas-confetti';
import * as FiIcons from 'react-icons/fi';

const { FiChevronLeft, FiChevronRight, FiCheck, FiX, FiInfo, FiArrowLeft, FiZap, FiImage } = FiIcons;

function StudyGuide() {
  const { section: sectionId } = useParams();
  const { state, dispatch } = useStudy();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [startTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [diagrams, setDiagrams] = useState([]);
  const [showDiagrams, setShowDiagrams] = useState(false);

  const section = sections.find(s => s.id === parseInt(sectionId));

  useEffect(() => {
    return () => {
      const studyTime = Math.round((Date.now() - startTime) / 1000);
      dispatch({ type: 'ADD_STUDY_TIME', payload: studyTime });
    };
  }, [dispatch, startTime]);

  useEffect(() => {
    setQuestionStartTime(Date.now());
    
    // Get relevant diagrams for the current question
    if (section && section.questions[currentQuestionIndex]) {
      const currentQuestion = section.questions[currentQuestionIndex];
      const relevantDiagrams = getDiagrams(currentQuestion);
      setDiagrams(relevantDiagrams);
    }
  }, [currentQuestionIndex, section]);

  if (!section) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-medical-900 mb-4">Section not found</h2>
        <Link to="/" className="text-primary-600 hover:text-primary-700">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const currentQuestion = section.questions[currentQuestionIndex];
  const isAnswered = state.progress.questionsAnswered.includes(currentQuestion.id);
  const isCorrect = state.progress.correctAnswers.includes(currentQuestion.id);

  const handleAnswerSelect = (answerIndex) => {
    if (isAnswered) return;

    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQuestion.correct;
    const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);

    if (correct) {
      // Trigger celebration for correct answers
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#10B981', '#34D399', '#6EE7B7']
      });
    }

    dispatch({
      type: 'ANSWER_QUESTION',
      payload: {
        questionId: currentQuestion.id,
        isCorrect: correct,
        sectionId: section.id,
        timeSpent
      }
    });

    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < section.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const getAnswerStatus = (index) => {
    if (!isAnswered) return 'default';
    if (index === currentQuestion.correct) return 'correct';
    if (selectedAnswer === index && index !== currentQuestion.correct) return 'incorrect';
    return 'default';
  };

  const getAnswerClasses = (status) => {
    switch (status) {
      case 'correct':
        return 'bg-green-100 border-green-500 text-green-800 shadow-lg transform scale-105';
      case 'incorrect':
        return 'bg-red-100 border-red-500 text-red-800';
      default:
        return 'bg-white border-medical-200 hover:border-primary-300 text-medical-700 hover:shadow-md';
    }
  };

  // Calculate XP gained for this question
  const calculateXP = () => {
    if (!isAnswered || !isCorrect) return 0;
    let baseXP = 5;
    const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);
    if (timeSpent < 10) baseXP += 3; // Speed bonus
    if (state.progress.streaks.current >= 5) baseXP += 2; // Streak bonus
    return baseXP;
  };

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
            <h1 className="text-3xl font-bold text-medical-900 mb-2">
              {section.title}
            </h1>
            <p className="text-medical-600">{section.description}</p>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-primary-600">
              {currentQuestionIndex + 1} / {section.questions.length}
            </div>
            <div className="text-sm text-medical-600">Questions</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 h-3 bg-medical-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / section.questions.length) * 100}%` }}
            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-medical-200 mb-6 shadow-lg"
        >
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-medical-900">
                {currentQuestion.question}
              </h2>
              
              {isAnswered && isCorrect && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1 rounded-full"
                >
                  <SafeIcon icon={FiZap} className="text-sm" />
                  <span className="text-sm font-medium">+{calculateXP()} XP</span>
                </motion.div>
              )}
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const status = getAnswerStatus(index);
                const classes = getAnswerClasses(status);

                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: isAnswered ? 1 : 1.02 }}
                    whileTap={{ scale: isAnswered ? 1 : 0.98 }}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={isAnswered}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${classes} ${
                      isAnswered ? 'cursor-default' : 'cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      {status === 'correct' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center space-x-1"
                        >
                          <SafeIcon icon={FiCheck} className="text-green-600 text-xl" />
                          <span className="text-green-600 text-sm font-bold">Correct!</span>
                        </motion.div>
                      )}
                      {status === 'incorrect' && (
                        <SafeIcon icon={FiX} className="text-red-600 text-xl" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-medical-200 pt-6"
              >
                <div className="flex items-start space-x-3">
                  <SafeIcon icon={FiInfo} className="text-primary-600 text-xl mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-medical-900 mb-2">Explanation</h3>
                    <p className="text-medical-700 leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                    
                    {diagrams.length > 0 && (
                      <div className="mt-4">
                        <button
                          onClick={() => setShowDiagrams(true)}
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
                        >
                          <SafeIcon icon={FiImage} />
                          <span>View Related Diagrams ({diagrams.length})</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevQuestion}
          disabled={currentQuestionIndex === 0}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
            currentQuestionIndex === 0
              ? 'bg-medical-100 text-medical-400 cursor-not-allowed'
              : 'bg-white text-medical-700 hover:bg-medical-50 border border-medical-200 shadow-md hover:shadow-lg'
          }`}
        >
          <SafeIcon icon={FiChevronLeft} />
          <span>Previous</span>
        </motion.button>

        <div className="flex space-x-2">
          {section.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentQuestionIndex(index);
                setSelectedAnswer(null);
                setShowExplanation(false);
              }}
              className={`w-4 h-4 rounded-full transition-all ${
                index === currentQuestionIndex
                  ? 'bg-primary-500 scale-125 shadow-lg'
                  : state.progress.questionsAnswered.includes(section.questions[index].id)
                  ? 'bg-green-400 hover:bg-green-500'
                  : 'bg-medical-300 hover:bg-medical-400'
              }`}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextQuestion}
          disabled={currentQuestionIndex === section.questions.length - 1}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
            currentQuestionIndex === section.questions.length - 1
              ? 'bg-medical-100 text-medical-400 cursor-not-allowed'
              : 'bg-primary-500 text-white hover:bg-primary-600 shadow-md hover:shadow-lg'
          }`}
        >
          <span>Next</span>
          <SafeIcon icon={FiChevronRight} />
        </motion.button>
      </div>
      
      {showDiagrams && (
        <DiagramViewer
          diagrams={diagrams}
          onClose={() => setShowDiagrams(false)}
        />
      )}
    </motion.div>
  );
}

export default StudyGuide;