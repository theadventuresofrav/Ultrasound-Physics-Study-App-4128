import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { sections } from '../data/questions';
import { useStudy } from '../context/StudyContext';
import SafeIcon from '../common/SafeIcon';
import DiagramViewer from '../components/DiagramViewer';
import { getDiagrams } from '../services/diagramService';
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
      dispatch({
        type: 'ADD_STUDY_TIME',
        payload: studyTime
      });
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

  const handleAnswerSelect = async (answerIndex) => {
    if (isAnswered) return;
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQuestion.correct;
    const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);

    if (correct) {
      // Celebration effect using dynamic import
      try {
        const confetti = (await import('canvas-confetti')).default;
        confetti({
          particleCount: 30,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#10B981', '#34D399', '#6EE7B7']
        });
      } catch (error) {
        console.warn('Confetti effect not available:', error);
      }
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

  const handleNextQuestion = () => {
    if (currentQuestionIndex < section.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-4"
        >
          <SafeIcon icon={FiArrowLeft} />
          <span>Back to Dashboard</span>
        </Link>
        <h1 className="text-3xl font-bold text-medical-900 mb-2">{section.title}</h1>
        <p className="text-medical-600">{section.description}</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-medical-200 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-medical-900">
              Question {currentQuestionIndex + 1} of {section.questions.length}
            </h2>
            {diagrams.length > 0 && (
              <button
                onClick={() => setShowDiagrams(true)}
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
              >
                <SafeIcon icon={FiImage} />
                <span>View Diagrams</span>
              </button>
            )}
          </div>

          <p className="text-lg text-medical-900 mb-6">{currentQuestion.question}</p>

          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isAnswer = currentQuestion.correct === index;
              let buttonClasses = "w-full p-4 rounded-xl border-2 text-left transition-all";

              if (showExplanation) {
                if (isAnswer) {
                  buttonClasses += " bg-green-50 border-green-500 text-green-800";
                } else if (isSelected) {
                  buttonClasses += " bg-red-50 border-red-500 text-red-800";
                } else {
                  buttonClasses += " bg-white border-medical-200";
                }
              } else {
                buttonClasses += isSelected
                  ? " bg-primary-50 border-primary-500 text-primary-800"
                  : " bg-white border-medical-200 hover:border-primary-300 text-medical-700";
              }

              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: !showExplanation ? 1.02 : 1 }}
                  whileTap={{ scale: !showExplanation ? 0.98 : 1 }}
                  onClick={() => !showExplanation && handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={buttonClasses}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {showExplanation && isAnswer && (
                      <SafeIcon icon={FiCheck} className="text-green-600 text-xl" />
                    )}
                    {showExplanation && isSelected && !isAnswer && (
                      <SafeIcon icon={FiX} className="text-red-600 text-xl" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-blue-50 p-4 rounded-xl border border-blue-200"
            >
              <h3 className="font-semibold text-medical-900 mb-2">Explanation</h3>
              <p className="text-medical-700">{currentQuestion.explanation}</p>
            </motion.div>
          )}

          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                currentQuestionIndex === 0
                  ? 'bg-medical-100 text-medical-400 cursor-not-allowed'
                  : 'bg-medical-100 text-medical-700 hover:bg-medical-200'
              }`}
            >
              <SafeIcon icon={FiChevronLeft} />
              <span>Previous</span>
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === section.questions.length - 1}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                currentQuestionIndex === section.questions.length - 1
                  ? 'bg-medical-100 text-medical-400 cursor-not-allowed'
                  : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
              }`}
            >
              <span>Next</span>
              <SafeIcon icon={FiChevronRight} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

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