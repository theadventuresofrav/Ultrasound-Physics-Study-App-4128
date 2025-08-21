import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import {useStudy} from '../context/StudyContext';

const {FiBookOpen,FiTarget,FiArrowRight,FiTool,FiCpu,FiCalculator} = FiIcons;

function RecommendedStudyMaterials() {
  const {state} = useStudy();

  const studyMaterials = [
    {
      id: 'physics-tools',
      title: 'Interactive Physics Tools',
      description: 'Use calculators and simulators to understand ultrasound wave behavior, impedance calculations, and beam characteristics.',
      type: 'Interactive Tools',
      link: '/physics-tools',
      icon: FiTool,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'chat-tutor',
      title: 'AI Physics Tutor',
      description: 'Get instant explanations for complex physics concepts with our AI-powered chat tutor.',
      type: 'AI Assistant',
      link: '/chat-tutor',
      icon: FiCpu,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'comprehensive-exam',
      title: 'Comprehensive SPI Exam',
      description: 'Take the full 110-question comprehensive exam that simulates the real SPI testing experience.',
      type: 'Practice Exam',
      link: '/comprehensive-exam',
      icon: FiTarget,
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <SafeIcon icon={FiBookOpen} className="text-2xl text-primary-600" />
          <div>
            <h2 className="text-2xl font-bold text-medical-900">Recommended Study Tools</h2>
            <p className="text-medical-600">Interactive tools tailored to your learning progress</p>
          </div>
        </div>
        <Link
          to="/physics-tools"
          className="text-primary-600 hover:text-primary-700 flex items-center space-x-1"
        >
          <span>View all tools</span>
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
            className="group"
          >
            <Link
              to={material.link}
              className="block p-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl border border-primary-100 hover:shadow-md transition-all cursor-pointer group-hover:border-primary-300"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${material.color} rounded-lg flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <SafeIcon icon={material.icon} className="text-white text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-medical-900 group-hover:text-primary-700 transition-colors">
                    {material.title}
                  </h3>
                  <p className="text-sm text-medical-600 line-clamp-2">
                    {material.description}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-primary-700 font-medium bg-primary-100 px-2 py-1 rounded-full">
                      {material.type}
                    </span>
                    <SafeIcon icon={FiArrowRight} className="text-primary-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Access Tools */}
      <div className="mt-6 pt-4 border-t border-medical-200">
        <h3 className="font-semibold text-medical-900 mb-3">Quick Access Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link
            to="/physics-tools"
            className="flex items-center space-x-2 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <SafeIcon icon={FiCalculator} />
            <span className="font-medium">Physics Calculator</span>
          </Link>
          <Link
            to="/physics-tools"
            className="flex items-center space-x-2 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
          >
            <SafeIcon icon={FiTool} />
            <span className="font-medium">Scan Optimizer</span>
          </Link>
          <Link
            to="/physics-tools"
            className="flex items-center space-x-2 p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <SafeIcon icon={FiTarget} />
            <span className="font-medium">Artifact Analyzer</span>
          </Link>
        </div>
      </div>

      {studyMaterials.length === 0 && (
        <div className="text-center py-8">
          <SafeIcon icon={FiBookOpen} className="text-3xl text-medical-400 mx-auto mb-4" />
          <p className="text-medical-600">No study materials available at this time.</p>
          <Link to="/physics-tools" className="text-primary-600 hover:text-primary-700 text-sm">
            Explore physics tools →
          </Link>
        </div>
      )}
    </div>
  );
}

export default RecommendedStudyMaterials;