import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStudy } from '../context/StudyContext';
import SafeIcon from '../common/SafeIcon';
import DiagramViewer from './DiagramViewer';
import VoiceControls from './VoiceControls';
import { getDiagrams } from '../services/diagramService';
import * as FiIcons from 'react-icons/fi';

const { FiBook, FiImage, FiVolume2 } = FiIcons;

function StudySectionWithVoice({ section }) {
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

  // Prepare text for voice reading
  const voiceText = `
    Study section: ${section.title}. 
    ${section.description}. 
    Your current progress: ${sectionProgress} percent complete with ${accuracy} percent accuracy. 
    You have answered ${answeredInSection} out of ${sectionQuestions.length} questions correctly.
    This section covers important concepts in ultrasound physics that will help you prepare for your SPI exam.
  `;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="dark-card dark-card-hover rounded-2xl p-6 shadow-lg group relative"
    >
      {/* Voice Controls - Positioned at top right */}
      <div className="absolute top-4 right-4 z-10">
        <VoiceControls 
          text={voiceText}
          title={section.title}
          className="relative"
        />
      </div>

      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-xl ${section.color} text-white shadow-lg`}>
          <SafeIcon name={section.icon.replace('Fi', '')} className="text-xl" />
        </div>
        <div className="flex-1 pr-16"> {/* Add padding to avoid overlap with voice controls */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-slate-200 group-hover:text-primary-400 transition-colors">
              {section.title}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={handleViewDiagrams}
                className="flex items-center space-x-1 text-xs px-2 py-1 rounded-full bg-primary-500/20 text-primary-400 border border-primary-500/30 hover:bg-primary-500/30 transition-colors"
              >
                <SafeIcon icon={FiImage} className="text-xs" />
                <span>Diagrams</span>
              </button>
            </div>
          </div>
          
          <p className="text-sm text-slate-400 mb-4">
            {section.description}
          </p>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="text-center p-3 bg-green-500/20 rounded-lg border border-green-500/30">
              <div className="text-lg font-bold text-green-400">{accuracy}%</div>
              <div className="text-xs text-green-400">Accuracy</div>
            </div>
            <div className="text-center p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
              <div className="text-lg font-bold text-blue-400">{answeredInSection}/{sectionQuestions.length}</div>
              <div className="text-xs text-blue-400">Questions</div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Progress</span>
              <span>{sectionProgress}%</span>
            </div>
            <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${sectionProgress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-full ${section.color} rounded-full shadow-sm`}
              />
            </div>
          </div>
          
          <Link
            to={`/study/${section.id}`}
            className="flex items-center justify-center space-x-2 w-full py-3 btn-dark-primary rounded-lg transition-colors"
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

export default StudySectionWithVoice;