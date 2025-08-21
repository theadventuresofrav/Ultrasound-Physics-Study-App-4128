import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiBookOpen,FiTool,FiTarget,FiCalculator,FiSettings,FiZap} = FiIcons;

function StudyResourcesList() {
  const studyResources = [
    {
      id: 'physics-calculator',
      title: 'Physics Calculator',
      description: 'Interactive calculator for wavelength, frequency, and resolution calculations.',
      type: 'Interactive Tool',
      link: '/physics-tools',
      icon: FiCalculator,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'artifact-analyzer',
      title: 'Artifact Analyzer',
      description: 'Learn to identify and understand common ultrasound artifacts.',
      type: 'Learning Tool',
      link: '/physics-tools',
      icon: FiTarget,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'scan-optimizer',
      title: 'Scan Optimizer',
      description: 'Get recommendations for optimal scanning parameters.',
      type: 'Optimization Tool',
      link: '/physics-tools',
      icon: FiSettings,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <SafeIcon icon={FiTool} className="text-2xl text-primary-600" />
          <div>
            <h2 className="text-2xl font-bold text-medical-900">Interactive Study Tools</h2>
            <p className="text-medical-600">
              Hands-on tools and materials for ultrasound physics learning
            </p>
          </div>
        </div>
        <Link
          to="/physics-tools"
          className="text-primary-600 hover:text-primary-700 flex items-center space-x-1"
        >
          <span>View all tools</span>
          <SafeIcon icon={FiZap} className="text-sm" />
        </Link>
      </div>

      <div className="space-y-4">
        {studyResources.map((resource, index) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <Link
              to={resource.link}
              className="block p-4 bg-white rounded-xl border border-medical-200 hover:border-primary-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${resource.color} rounded-lg flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <SafeIcon icon={resource.icon} className="text-white text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-medical-900 group-hover:text-primary-700 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-medical-600 mb-2">
                    {resource.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-primary-700 font-medium bg-primary-100 px-2 py-1 rounded-full">
                      {resource.type}
                    </span>
                    <SafeIcon icon={FiZap} className="text-primary-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
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
          <Link
            to="/physics-tools"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <SafeIcon icon={FiTool} />
            <span>Explore Physics Tools</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default StudyResourcesList;