import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useStudy } from '../context/StudyContext';

const { FiBookOpen, FiTarget, FiArrowRight } = FiIcons;

function RecommendedStudyMaterials() {
  const { state } = useStudy();

  const studyMaterials = [
    {
      id: 'physics-basics',
      title: 'Ultrasound Physics Fundamentals',
      description: 'Master the basic principles of ultrasound wave propagation, frequency, and wavelength relationships.',
      type: 'Interactive Tutorial',
      relevantSection: 'Basic Physics Concepts'
    },
    {
      id: 'doppler-principles',
      title: 'Doppler Effect in Medical Imaging',
      description: 'Learn how the Doppler effect enables blood flow measurement and color flow imaging.',
      type: 'Visual Guide',
      relevantSection: 'Doppler Principles'
    },
    {
      id: 'artifact-recognition',
      title: 'Common Ultrasound Artifacts',
      description: 'Identify and understand the physics behind common ultrasound imaging artifacts.',
      type: 'Case Studies',
      relevantSection: 'Artifact Recognition'
    }
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <SafeIcon icon={FiBookOpen} className="text-2xl text-primary-600" />
          <div>
            <h2 className="text-2xl font-bold text-medical-900">Recommended Study Materials</h2>
            <p className="text-medical-600">Study materials tailored to your current progress</p>
          </div>
        </div>
        <Link
          to="/knowledge"
          className="text-primary-600 hover:text-primary-700 flex items-center space-x-1"
        >
          <span>View all materials</span>
          <SafeIcon icon={FiArrowRight} className="text-sm" />
        </Link>
      </div>

      <div className="space-y-4">
        {studyMaterials.map((material, index) => (
          <motion.div
            key={material.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl border border-primary-100 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-md flex-shrink-0 flex items-center justify-center">
                <SafeIcon icon={FiTarget} className="text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-medical-900 line-clamp-2">{material.title}</h3>
                <p className="text-xs text-medical-600 line-clamp-2">{material.description}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-primary-700 font-medium">
                    {material.relevantSection}
                  </span>
                  <span className="text-xs text-medical-500">{material.type}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {studyMaterials.length === 0 && (
        <div className="text-center py-8">
          <SafeIcon icon={FiBookOpen} className="text-3xl text-medical-400 mx-auto mb-4" />
          <p className="text-medical-600">No study materials available at this time.</p>
          <Link to="/knowledge" className="text-primary-600 hover:text-primary-700 text-sm">
            Browse all resources →
          </Link>
        </div>
      )}
    </div>
  );
}

export default RecommendedStudyMaterials;