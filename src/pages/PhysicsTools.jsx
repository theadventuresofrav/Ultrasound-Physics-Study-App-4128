import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import PhysicsCalculator from '../components/physics/PhysicsCalculator';
import ScanOptimizer from '../components/physics/ScanOptimizer';
import ArtifactAnalyzer from '../components/physics/ArtifactAnalyzer';
import ScanTechniqueTool from '../components/physics/ScanTechniqueTool';
import PhysicsLearningPath from '../components/physics/PhysicsLearningPath';
import PhysicsPodcastPanel from '../components/physics/PhysicsPodcastPanel';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiArrowLeft, FiZap, FiTool} = FiIcons;

function PhysicsTools() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Back Navigation */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700"
        >
          <SafeIcon icon={FiArrowLeft} />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Interactive Physics Tools
            </h1>
            <p className="text-primary-100">
              Master ultrasound physics with interactive tools and visual learning
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-primary-200">Interactive</p>
              <p className="font-bold">Learning Tools</p>
            </div>
            <SafeIcon icon={FiTool} className="text-4xl text-primary-200" />
          </div>
        </div>
      </div>

      {/* Learning Path */}
      <PhysicsLearningPath />

      {/* Quick Physics Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: 'Resolution vs Penetration',
            tip: 'Higher frequencies improve resolution but reduce penetration depth. Find the optimal balance for your imaging needs.',
            icon: FiZap
          },
          {
            title: 'Focus Optimization',
            tip: 'Position focal zone at or slightly below area of interest for optimal lateral resolution.',
            icon: FiTool
          },
          {
            title: 'Artifact Recognition',
            tip: 'Understanding artifact physics helps distinguish pathology from imaging artifacts.',
            icon: FiZap
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-medical-200 shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-3">
              <SafeIcon icon={item.icon} className="text-primary-600" />
              <h3 className="font-bold text-medical-900">{item.title}</h3>
            </div>
            <p className="text-medical-700">{item.tip}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Tools Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <ScanTechniqueTool />
          <PhysicsCalculator />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ScanOptimizer />
            <ArtifactAnalyzer />
          </div>
        </div>

        {/* Learning Resources Sidebar */}
        <div className="xl:col-span-1">
          <PhysicsPodcastPanel currentTopic="general" />
        </div>
      </div>

      {/* Study Resources Call-to-Action */}
      <div className="bg-gradient-to-r from-blue-50 to-primary-50 rounded-2xl p-6 border border-primary-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiTool} className="text-2xl text-primary-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-medical-900">Master Physics Concepts</h3>
              <p className="text-medical-600">
                Use interactive tools and practice questions to deepen your understanding
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Link
              to="/quiz/practice"
              className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
            >
              Practice Quiz
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default PhysicsTools;