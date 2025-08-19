import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBookOpen, FiTool, FiTarget } = FiIcons;

function StudyToolsPanel() {
  const studyTools = [
    {
      id: 'physics-calculator',
      title: 'Physics Calculator',
      description: 'Calculate wavelength, frequency, and resolution parameters.',
      icon: FiTool
    },
    {
      id: 'artifact-analyzer',
      title: 'Artifact Analyzer',
      description: 'Learn to identify and understand ultrasound artifacts.',
      icon: FiTarget
    },
    {
      id: 'scan-optimizer',
      title: 'Scan Optimizer',
      description: 'Get recommendations for optimal scanning settings.',
      icon: FiBookOpen
    }
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
      <div className="flex items-center space-x-3 mb-6">
        <SafeIcon icon={FiTool} className="text-2xl text-primary-600" />
        <div>
          <h2 className="text-2xl font-bold text-medical-900">Study Tools</h2>
          <p className="text-medical-600">Interactive learning resources</p>
        </div>
      </div>

      <div className="space-y-4">
        {studyTools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl border border-primary-100 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-md flex-shrink-0 flex items-center justify-center">
                <SafeIcon icon={tool.icon} className="text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-medical-900 mb-1">{tool.title}</h3>
                <p className="text-sm text-medical-600">{tool.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default StudyToolsPanel;