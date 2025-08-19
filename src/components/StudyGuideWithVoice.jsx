import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { sections } from '../data/questions';
import { useStudy } from '../context/StudyContext';
import { useVoiceReader } from '../hooks/useVoiceReader';
import SafeIcon from '../common/SafeIcon';
import VoiceControls from './VoiceControls';
import DiagramViewer from './DiagramViewer';
import { getDiagrams } from '../services/diagramService';
import * as FiIcons from 'react-icons/fi';

const { FiChevronLeft, FiChevronRight, FiCheck, FiX, FiInfo, FiArrowLeft, FiZap, FiImage, FiVolume2 } = FiIcons;

function StudyGuideWithVoice() {
  const { section: sectionId } = useParams();
  const { state, dispatch } = useStudy();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [startTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [diagrams, setDiagrams] = useState([]);
  const [showDiagrams, setShowDiagrams] = useState(false);
  const [autoReadEnabled, setAutoReadEnabled] = useState(false);

  const section = sections.find(s => s.id === parseInt(sectionId));
  const { speak, stop, isReading } = useVoiceReader();

  useEffect(() => {
    return () => {
      const studyTime = Math.round((Date.now() - startTime) / 1000);
      dispatch({ type: 'ADD_STUDY_TIME', payload: studyTime });
      // Stop any ongoing speech when leaving
      stop();
    };
  }, [dispatch, startTime, stop]);

  useEffect(() => {
    setQuestionStartTime(Date.now());
    // Get relevant diagrams for the current question
    if (section && section.questions[currentQuestionIndex]) {
      const currentQuestion = section.questions[currentQuestionIndex];
      const relevantDiagrams = getDiagrams(currentQuestion);
      setDiagrams(relevantDiagrams);

      // Auto-read question if enabled
      if (autoReadEnabled) {
        const questionText = `
          Question ${currentQuestionIndex + 1} of ${section.questions.length}.
          ${currentQuestion.question}
          Option A: ${currentQuestion.options[0]}
          Option B: ${currentQuestion.options[1]}
          Option C: ${currentQuestion.options[2]}
          Option D: ${currentQuestion.options[3]}
        `;
        speak(questionText);
      }
    }
  }, [currentQuestionIndex, section, autoReadEnabled, speak]);

  // Auto-read explanation when it's shown
  useEffect(() => {
    if (showExplanation && autoReadEnabled && section?.questions[currentQuestionIndex]) {
      const currentQuestion = section.questions[currentQuestionIndex];
      const isCorrect = selectedAnswer === currentQuestion.correct;
      const explanationText = `
        ${isCorrect ? 'Correct!' : 'Incorrect.'} 
        The correct answer is option ${String.fromCharCode(65 + currentQuestion.correct)}.
        Explanation: ${currentQuestion.explanation}
      `;
      
      setTimeout(() => {
        speak(explanationText);
      }, 1000); // Delay to let the UI settle
    }
  }, [showExplanation, autoReadEnabled, selectedAnswer, section, currentQuestionIndex, speak]);

  if (!section) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-slate-100 mb-4">Section not found</h2>
        <Link to="/" className="text-primary-400 hover:text-primary-300">
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
      stop(); // Stop reading when moving to next question
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      stop(); // Stop reading when moving to previous question
    }
  };

  // Prepare section overview text for voice
  const sectionOverviewText = `
    Welcome to ${section.title}. 
    ${section.description}
    This section contains ${section.questions.length} practice questions to help you master these concepts.
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 mb-4"
        >
          <SafeIcon icon={FiArrowLeft} />
          <span>Back to Dashboard</span>
        </Link>
        
        {/* Section Header with Voice Controls */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-100 mb-2">{section.title}</h1>
            <p className="text-slate-400">{section.description}</p>
          </div>
          
          {/* Section Overview Voice Controls */}
          <div className="ml-4">
            <VoiceControls
              text={sectionOverviewText}
              title={`${section.title} Overview`}
            />
          </div>
        </div>

        {/* Auto-read toggle */}
        <div className="flex items-center space-x-3 mb-4">
          <label className="flex items-center space-x-2 text-slate-300">
            <input
              type="checkbox"
              checked={autoReadEnabled}
              onChange={(e) => setAutoReadEnabled(e.target.checked)}
              className="rounded border-dark-600 bg-dark-800/50 text-primary-500 focus:ring-primary-500/50"
            />
            <span className="text-sm">Auto-read questions and explanations</span>
          </label>
          <SafeIcon icon={FiVolume2} className="text-primary-400" />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="dark-card rounded-2xl p-8 border border-primary-500/30 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-slate-200">
                Question {currentQuestionIndex + 1} of {section.questions.length}
              </h2>
              
              {/* Question Voice Controls */}
              <VoiceControls
                text={`
                  Question ${currentQuestionIndex + 1}. 
                  ${currentQuestion.question}
                  The answer options are:
                  A: ${currentQuestion.options[0]}
                  B: ${currentQuestion.options[1]} 
                  C: ${currentQuestion.options[2]}
                  D: ${currentQuestion.options[3]}
                `}
                title={`Question ${currentQuestionIndex + 1}`}
              />
            </div>
            
            {diagrams.length > 0 && (
              <button
                onClick={() => setShowDiagrams(true)}
                className="flex items-center space-x-2 text-primary-400 hover:text-primary-300"
              >
                <SafeIcon icon={FiImage} />
                <span>View Diagrams</span>
              </button>
            )}
          </div>

          <p className="text-lg text-slate-200 mb-6">{currentQuestion.question}</p>

          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isAnswer = currentQuestion.correct === index;
              let buttonClasses = "w-full p-4 rounded-xl border-2 text-left transition-all";

              if (showExplanation) {
                if (isAnswer) {
                  buttonClasses += " bg-green-500/20 border-green-500/50 text-green-300";
                } else if (isSelected) {
                  buttonClasses += " bg-red-500/20 border-red-500/50 text-red-300";
                } else {
                  buttonClasses += " bg-dark-800/50 border-dark-600 text-slate-400";
                }
              } else {
                buttonClasses += isSelected
                  ? " bg-primary-500/20 border-primary-500/50 text-primary-300"
                  : " bg-dark-800/50 border-dark-600 hover:border-primary-500/30 text-slate-300 hover:text-slate-200";
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
                    <div className="flex items-center space-x-3">
                      <span className="font-bold text-slate-400">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <span className="font-medium">{option}</span>
                    </div>
                    {showExplanation && isAnswer && (
                      <SafeIcon icon={FiCheck} className="text-green-400 text-xl" />
                    )}
                    {showExplanation && isSelected && !isAnswer && (
                      <SafeIcon icon={FiX} className="text-red-400 text-xl" />
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
              className="bg-blue-500/20 p-4 rounded-xl border border-blue-500/30 mb-4"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-slate-200 flex items-center">
                  <SafeIcon icon={FiInfo} className="mr-2 text-blue-400" />
                  Explanation
                </h3>
                
                {/* Explanation Voice Controls */}
                <VoiceControls
                  text={currentQuestion.explanation}
                  title="Explanation"
                  className="relative"
                />
              </div>
              <p className="text-slate-300 leading-relaxed">{currentQuestion.explanation}</p>
            </motion.div>
          )}

          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                currentQuestionIndex === 0
                  ? 'bg-dark-800/50 text-slate-500 cursor-not-allowed border border-dark-700'
                  : 'bg-dark-800/50 text-slate-300 hover:bg-dark-700 border border-dark-600'
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
                  ? 'bg-dark-800/50 text-slate-500 cursor-not-allowed border border-dark-700'
                  : 'btn-dark-primary'
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

      {/* Reading Status Indicator */}
      <AnimatePresence>
        {isReading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="dark-card rounded-lg p-3 border border-primary-500/30 shadow-lg">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiVolume2} className="text-primary-400 animate-pulse" />
                <span className="text-sm text-slate-300">Reading content...</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default StudyGuideWithVoice;