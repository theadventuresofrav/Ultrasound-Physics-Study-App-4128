import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiFilter, FiFlag, FiCheckCircle, FiAlertCircle } = FiIcons;

function ExamNavigation({ questions, currentIndex, selectedAnswers, flaggedQuestions, onQuestionClick }) {
  const [filter, setFilter] = useState('all');
  
  // Filter questions based on selected filter
  const getFilteredQuestions = () => {
    switch (filter) {
      case 'answered':
        return questions.filter(q => selectedAnswers[q.id] !== undefined);
      case 'unanswered':
        return questions.filter(q => selectedAnswers[q.id] === undefined);
      case 'flagged':
        return questions.filter(q => flaggedQuestions.includes(q.id));
      default:
        return questions;
    }
  };
  
  // Group questions by sections (10 questions per section)
  const groupedQuestions = () => {
    const filtered = getFilteredQuestions();
    const grouped = {};
    
    filtered.forEach((question, index) => {
      const sectionIndex = Math.floor(questions.indexOf(question) / 10);
      if (!grouped[sectionIndex]) {
        grouped[sectionIndex] = [];
      }
      grouped[sectionIndex].push({
        ...question,
        originalIndex: questions.indexOf(question)
      });
    });
    
    return grouped;
  };
  
  // Get button style based on question status
  const getButtonStyle = (questionId, originalIndex) => {
    const isAnswered = selectedAnswers[questionId] !== undefined;
    const isFlagged = flaggedQuestions.includes(questionId);
    const isCurrent = originalIndex === currentIndex;
    
    let baseClasses = "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all";
    
    if (isCurrent) {
      return `${baseClasses} bg-primary-500 text-white ring-2 ring-primary-300`;
    } else if (isFlagged && isAnswered) {
      return `${baseClasses} bg-yellow-100 text-yellow-700 border-2 border-yellow-400`;
    } else if (isFlagged) {
      return `${baseClasses} bg-yellow-100 text-yellow-700`;
    } else if (isAnswered) {
      return `${baseClasses} bg-green-100 text-green-700`;
    } else {
      return `${baseClasses} bg-medical-100 text-medical-600 hover:bg-medical-200`;
    }
  };
  
  // Get progress statistics
  const answered = Object.keys(selectedAnswers).length;
  const unanswered = questions.length - answered;
  const flagged = flaggedQuestions.length;
  
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-medical-200 shadow-md">
      <h2 className="font-semibold text-medical-900 mb-4">Question Navigator</h2>
      
      {/* Progress Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="p-2 bg-green-50 rounded-lg text-center">
          <div className="text-sm text-green-600 font-medium">{answered}</div>
          <div className="text-xs text-medical-500">Answered</div>
        </div>
        <div className="p-2 bg-medical-50 rounded-lg text-center">
          <div className="text-sm text-medical-600 font-medium">{unanswered}</div>
          <div className="text-xs text-medical-500">Unanswered</div>
        </div>
        <div className="p-2 bg-yellow-50 rounded-lg text-center">
          <div className="text-sm text-yellow-600 font-medium">{flagged}</div>
          <div className="text-xs text-medical-500">Flagged</div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex items-center space-x-2 mb-4">
        <SafeIcon icon={FiFilter} className="text-medical-400" />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="flex-1 text-sm p-2 border border-medical-200 rounded-lg bg-medical-50 text-medical-700"
        >
          <option value="all">All Questions</option>
          <option value="answered">Answered</option>
          <option value="unanswered">Unanswered</option>
          <option value="flagged">Flagged</option>
        </select>
      </div>
      
      {/* Question Navigation */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
        {Object.entries(groupedQuestions()).map(([sectionIndex, sectionQuestions]) => (
          <div key={sectionIndex} className="border-b border-medical-100 pb-4 last:border-0">
            <div className="text-xs font-medium text-medical-500 mb-2">
              Section {parseInt(sectionIndex) + 1}
            </div>
            <div className="grid grid-cols-5 gap-2">
              {sectionQuestions.map((question) => (
                <motion.button
                  key={question.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onQuestionClick(question.originalIndex)}
                  className={getButtonStyle(question.id, question.originalIndex)}
                  title={`Question ${question.originalIndex + 1}`}
                >
                  {question.originalIndex + 1}
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-medical-100">
        <div className="text-xs font-medium text-medical-500 mb-2">Legend</div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-medical-100"></div>
            <span>Unanswered</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-green-100"></div>
            <span>Answered</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-yellow-100"></div>
            <span>Flagged</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-primary-500"></div>
            <span>Current</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamNavigation;