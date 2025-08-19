import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiTool, FiTarget, FiBookOpen } = FiIcons;

function StudyResourcesPage() {
  const studyResources = [
    {
      id: 'physics-tools',
      title: 'Interactive Physics Tools',
      description: 'Use calculators and simulators to understand ultrasound physics concepts.',
      link: '/physics-tools',
      icon: FiTool,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'practice-quizzes',
      title: 'Practice Quizzes',
      description: 'Test your knowledge with targeted practice questions.',
      link: '/quiz/practice',
      icon: FiTarget,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'knowledge-center',
      title: 'Knowledge Center',
      description: 'Access comprehensive study materials and resources.',
      link: '/knowledge',
      icon: FiBookOpen,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-4">
          <SafeIcon icon={FiArrowLeft} />
          <span>Back to Dashboard</span>
        </Link>
        <h1 className="text-3xl font-bold text-medical-900 mb-2">Study Resources</h1>
        <p className="text-medical-600">
          Access comprehensive learning materials for ultrasound physics
        </p>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {studyResources.map((resource, index) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 border border-medical-200 shadow-lg hover:shadow-xl transition-all"
          >
            <div className={`w-16 h-16 bg-gradient-to-r ${resource.color} rounded-xl flex items-center justify-center mb-4`}>
              <SafeIcon icon={resource.icon} className="text-2xl text-white" />
            </div>
            <h3 className="text-xl font-bold text-medical-900 mb-2">{resource.title}</h3>
            <p className="text-medical-600 mb-4">{resource.description}</p>
            <Link
              to={resource.link}
              className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              <span>Explore</span>
              <SafeIcon icon={FiArrowLeft} className="rotate-180" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Study Tips */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-medical-200">
        <h2 className="text-2xl font-bold text-medical-900 mb-6">Study Tips for Success</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Interactive Learning",
              tip: "Use our physics calculators to see how changing parameters affects ultrasound behavior in real-time."
            },
            {
              title: "Practice Regularly",
              tip: "Take daily practice quizzes to reinforce your knowledge and identify areas that need more attention."
            },
            {
              title: "Visual Understanding",
              tip: "Review diagrams and animations to visualize complex physics concepts like wave propagation and artifact formation."
            },
            {
              title: "Apply Knowledge",
              tip: "Connect theoretical physics concepts to practical clinical applications for better retention."
            }
          ].map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-primary-50 rounded-lg border border-primary-200"
            >
              <h3 className="font-semibold text-medical-900 mb-2">{tip.title}</h3>
              <p className="text-medical-700">{tip.tip}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default StudyResourcesPage;