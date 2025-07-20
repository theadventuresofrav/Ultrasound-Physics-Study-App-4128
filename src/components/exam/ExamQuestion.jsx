import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiCheck, FiX } = FiIcons;

function ExamQuestion({ question, selectedAnswer, onAnswerSelect, showExplanation = false, isExamMode = false }) {
  const isAnswered = selectedAnswer !== undefined;
  const isCorrect = selectedAnswer === question.correctAnswer;
  
  return (
    <div className="space-y-6">
      <div className="text-lg text-medical-900 leading-relaxed">
        {question.question}
      </div>
      
      {/* Image if available */}
      {question.image && (
        <div className="my-4 flex justify-center">
          <img 
            src={question.image} 
            alt="Question illustration" 
            className="max-h-60 object-contain border border-medical-200 rounded-lg shadow-md"
          />
        </div>
      )}
      
      <div className="space-y-3">
        {question.options.map((option, index) => {
          let buttonClasses = "w-full p-4 rounded-xl border-2 text-left transition-all";
          
          // If in exam mode, just highlight selection
          if (isExamMode) {
            buttonClasses += selectedAnswer === index
              ? " border-primary-500 bg-primary-50 text-primary-800"
              : " border-medical-200 hover:border-primary-300 text-medical-700 hover:bg-medical-50";
          }
          // If showing results/review mode
          else if (showExplanation) {
            if (index === question.correctAnswer) {
              buttonClasses += " border-green-500 bg-green-50 text-green-800";
            } else if (selectedAnswer === index) {
              buttonClasses += " border-red-500 bg-red-50 text-red-800";
            } else {
              buttonClasses += " border-medical-200 text-medical-700";
            }
          }
          
          return (
            <motion.button
              key={index}
              whileHover={!showExplanation ? { scale: 1.01 } : {}}
              whileTap={!showExplanation ? { scale: 0.99 } : {}}
              onClick={() => !showExplanation && onAnswerSelect(index)}
              disabled={showExplanation}
              className={buttonClasses}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    selectedAnswer === index
                      ? 'bg-primary-500 text-white'
                      : 'bg-medical-100 text-medical-600'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
                
                {showExplanation && index === question.correctAnswer && (
                  <SafeIcon icon={FiCheck} className="text-green-600 text-xl" />
                )}
                
                {showExplanation && selectedAnswer === index && index !== question.correctAnswer && (
                  <SafeIcon icon={FiX} className="text-red-600 text-xl" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
      
      {/* Explanation */}
      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-6 p-5 bg-blue-50 border border-blue-200 rounded-xl"
        >
          <h3 className="font-semibold text-medical-900 mb-2">Explanation</h3>
          <div className="text-medical-700 leading-relaxed">
            {question.explanation}
          </div>
          
          {/* References */}
          {question.references && (
            <div className="mt-4 pt-4 border-t border-blue-200">
              <h4 className="font-medium text-medical-900 mb-1">References</h4>
              <p className="text-sm text-medical-600">{question.references}</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default ExamQuestion;