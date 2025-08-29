import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStudy } from '../context/StudyContext';
import SafeIcon from '../common/SafeIcon';
import DiagramViewer from './DiagramViewer';
import { getDiagrams } from '../services/diagramService';
import * as FiIcons from 'react-icons/fi';

const { FiBook, FiImage, FiPlay, FiTrendingUp, FiTarget, FiArrowRight } = FiIcons;

function StudySection({ section }) {
  const { state } = useStudy();
  const [showDiagrams, setShowDiagrams] = useState(false);
  const [diagrams, setDiagrams] = useState([]);

  // Calculate section progress
  const sectionQuestions = section.questions.map(q => q.id);
  const answeredInSection = state.progress.questionsAnswered.filter(
    id => sectionQuestions.includes(id)
  ).length;
  const correctInSection = state.progress.correctAnswers.filter(
    id => sectionQuestions.includes(id)
  ).length;
  const sectionProgress = Math.round((answeredInSection / sectionQuestions.length) * 100);
  const accuracy = answeredInSection > 0 ? Math.round((correctInSection / answeredInSection) * 100) : 0;

  const handleViewDiagrams = () => {
    const relevantDiagrams = getDiagrams(section.title + " " + section.description);
    setDiagrams(relevantDiagrams);
    setShowDiagrams(true);
  };

  const getProgressColor = () => {
    if (sectionProgress >= 80) return 'from-green-500 to-emerald-500';
    if (sectionProgress >= 60) return 'from-yellow-500 to-orange-500';
    if (sectionProgress >= 40) return 'from-blue-500 to-cyan-500';
    return 'from-gray-400 to-gray-500';
  };

  const getAccuracyColor = () => {
    if (accuracy >= 90) return 'text-green-600 bg-green-50';
    if (accuracy >= 80) return 'text-blue-600 bg-blue-50';
    if (accuracy >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="glass-card rounded-2xl p-6 border-2 border-gray-200/50 hover:border-primary-300/50 hover-lift group transition-all duration-300"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className={`p-4 rounded-2xl ${section.color} text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
              <SafeIcon name={section.icon.replace('Fi', '')} className="text-2xl" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary-700 transition-colors duration-300">
                {section.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {section.description}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleViewDiagrams}
            className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-gradient-to-r from-primary-100 to-blue-100 text-primary-700 hover:from-primary-200 hover:to-blue-200 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg"
          >
            <SafeIcon icon={FiImage} className="text-sm" />
            <span>Diagrams</span>
          </button>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className={`text-center p-4 rounded-xl border-2 border-white/50 ${getAccuracyColor()} transition-all duration-300`}>
            <div className="text-2xl font-bold">{accuracy}%</div>
            <div className="text-xs font-medium uppercase tracking-wider">Accuracy</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200/50">
            <div className="text-2xl font-bold text-blue-700">{answeredInSection}</div>
            <div className="text-xs text-blue-600 font-medium uppercase tracking-wider">Answered</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200/50">
            <div className="text-2xl font-bold text-purple-700">{correctInSection}</div>
            <div className="text-xs text-purple-600 font-medium uppercase tracking-wider">Correct</div>
          </div>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
            <span className="font-medium">Progress</span>
            <span className="font-bold text-gray-900">{sectionProgress}%</span>
          </div>
          <div className="progress-bar">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${sectionProgress}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className={`h-full bg-gradient-to-r ${getProgressColor()} rounded-full shadow-sm`}
            />
          </div>
        </div>

        {/* Enhanced Action Button */}
        <Link
          to={`/study/${section.id}`}
          className="group/btn w-full flex items-center justify-center space-x-3 py-4 bg-gradient-to-r from-primary-500 to-blue-500 hover:from-primary-600 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <SafeIcon icon={FiPlay} className="group-hover/btn:scale-110 transition-transform duration-200" />
          <span>Start Studying</span>
          <SafeIcon icon={FiArrowRight} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
        </Link>
      </motion.div>

      {showDiagrams && (
        <DiagramViewer
          diagrams={diagrams}
          onClose={() => setShowDiagrams(false)}
        />
      )}
    </>
  );
}

export default StudySection;