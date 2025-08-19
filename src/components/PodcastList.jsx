import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBookOpen, FiTool, FiTarget } = FiIcons;

function StudyResourcesList() {
  const studyResources = [
    {
      id: 'physics-calculator',
      title: 'Physics Calculator',
      description: 'Interactive calculator for wavelength, frequency, and resolution calculations.',
      type: 'Interactive Tool'
    },
    {
      id: 'artifact-analyzer',
      title: 'Artifact Analyzer',
      description: 'Learn to identify and understand common ultrasound artifacts.',
      type: 'Learning Tool'
    },
    {
      id: 'scan-optimizer',
      title: 'Scan Optimizer',
      description: 'Get recommendations for optimal scanning parameters.',
      type: 'Optimization Tool'
    }
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <SafeIcon icon={FiTool} className="text-2xl text-primary-600" />
          <div>
            <h2 className="text-2xl font-bold text-medical-900">Study Resources</h2>
            <p className="text-medical-600">
              Interactive tools and materials for ultrasound physics learning
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {studyResources.map((resource, index) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-white rounded-xl border border-medical-200 hover:border-primary-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary-100 rounded-md flex-shrink-0 flex items-center justify-center">
                <SafeIcon icon={FiTarget} className="text-primary-600 text-xl" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-medical-900 mb-1">
                  {resource.title}
                </h3>
                <p className="text-sm text-medical-600 mb-2">
                  {resource.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-primary-700 font-medium">
                    {resource.type}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {studyResources.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiBookOpen} className="text-3xl text-medical-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-medical-900 mb-2">No resources found</h3>
          <p className="text-medical-600 mb-4">
            Study resources are currently being updated
          </p>
        </div>
      )}
    </div>
  );
}

export default StudyResourcesList;