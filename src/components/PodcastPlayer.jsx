import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiMusic,FiTool,FiTarget,FiCalculator,FiSettings,FiZap} = FiIcons;

function StudyToolsPanel() {
  const studyTools = [
    {
      id: 'physics-calculator',
      title: 'Physics Calculator',
      description: 'Calculate wavelength, frequency, and resolution parameters.',
      icon: FiCalculator,
      link: '/physics-tools',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'artifact-analyzer',
      title: 'Artifact Analyzer',
      description: 'Learn to identify and understand ultrasound artifacts.',
      icon: FiTarget,
      link: '/physics-tools',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'scan-optimizer',
      title: 'Scan Optimizer',
      description: 'Get recommendations for optimal scanning settings.',
      icon: FiSettings,
      link: '/physics-tools',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
      <div className="flex items-center space-x-3 mb-6">
        <SafeIcon icon={FiTool} className="text-2xl text-primary-600" />
        <div>
          <h2 className="text-2xl font-bold text-medical-900">Interactive Study Tools</h2>
          <p className="text-medical-600">Hands-on learning resources</p>
        </div>
      </div>

      <div className="space-y-4">
        {studyTools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <Link
              to={tool.link}
              className="block p-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl border border-primary-100 hover:shadow-md transition-all cursor-pointer group-hover:border-primary-300"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${tool.color} rounded-lg flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <SafeIcon icon={tool.icon} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-medical-900 group-hover:text-primary-700 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-medical-600">{tool.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-primary-700 font-medium bg-primary-100 px-2 py-1 rounded-full">
                      Interactive Tool
                    </span>
                    <SafeIcon icon={FiZap} className="text-primary-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-primary-50 rounded-xl border border-primary-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-medical-900 mb-1">Master Physics with Interactive Tools</h3>
            <p className="text-sm text-medical-600">
              Visualize concepts and practice calculations with our comprehensive toolkit
            </p>
          </div>
          <Link
            to="/physics-tools"
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
          >
            <SafeIcon icon={FiTool} />
            <span>Explore Tools</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudyToolsPanel;