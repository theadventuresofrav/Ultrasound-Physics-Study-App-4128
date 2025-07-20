import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStudy } from '../context/StudyContext';
import SafeIcon from '../common/SafeIcon';
import DiagramViewer from './DiagramViewer';
import { getDiagrams } from '../services/diagramService';
import * as FiIcons from 'react-icons/fi';

const { FiBook, FiImage } = FiIcons;

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
    // Get relevant diagrams for this section
    const relevantDiagrams = getDiagrams(section.title + " " + section.description);
    setDiagrams(relevantDiagrams);
    setShowDiagrams(true);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-5 bg-white rounded-xl border border-medical-200 hover:border-primary-300 hover:shadow-lg transition-all duration-200"
    >
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-lg ${section.color} text-white`}>
          <SafeIcon name={section.icon.replace('Fi', '')} className="text-xl" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-medical-900">{section.title}</h3>
            <div className="flex space-x-2">
              <button
                onClick={handleViewDiagrams}
                className="flex items-center space-x-1 text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-700 hover:bg-primary-200 transition-colors"
              >
                <SafeIcon icon={FiImage} className="text-xs" />
                <span>Diagrams</span>
              </button>
            </div>
          </div>
          
          <p className="text-sm text-medical-600 mb-4">
            {section.description}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-700">{accuracy}%</div>
              <div className="text-xs text-green-600">Accuracy</div>
            </div>
            <div className="text-center p-2 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-700">{answeredInSection}/{sectionQuestions.length}</div>
              <div className="text-xs text-blue-600">Questions</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-medical-600 mb-1">
              <span>Progress</span>
              <span>{sectionProgress}%</span>
            </div>
            <div className="h-2 bg-medical-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${sectionProgress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-full ${section.color} rounded-full`}
              />
            </div>
          </div>

          <Link
            to={`/study/${section.id}`}
            className="flex items-center justify-center space-x-2 w-full py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
          >
            <SafeIcon icon={FiBook} />
            <span>Start Studying</span>
          </Link>
        </div>
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

export default StudySection;