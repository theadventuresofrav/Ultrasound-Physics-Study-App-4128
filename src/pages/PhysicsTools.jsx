import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PhysicsCalculator from '../components/physics/PhysicsCalculator';
import InteractiveBeamSimulator from '../components/physics/InteractiveBeamSimulator';
import DopplerSimulator from '../components/physics/DopplerSimulator';
import ArtifactSimulator from '../components/physics/ArtifactSimulator';
import TransducerComparison from '../components/physics/TransducerComparison';
import RealtimeQuizChallenge from '../components/physics/RealtimeQuizChallenge';
import ScanOptimizer from '../components/physics/ScanOptimizer';
import ArtifactAnalyzer from '../components/physics/ArtifactAnalyzer';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTool, FiZap, FiTarget, FiActivity, FiRadio, FiAlertTriangle, FiCalculator, FiPlay } = FiIcons;

function PhysicsTools() {
  const [activeTab, setActiveTab] = useState('calculators');

  const tools = {
    calculators: {
      name: 'Calculators & Simulators',
      icon: FiCalculator,
      color: 'from-blue-500 to-blue-600',
      components: [
        { component: PhysicsCalculator, title: 'Physics Calculator' },
        { component: InteractiveBeamSimulator, title: 'Beam Simulator' }
      ]
    },
    doppler: {
      name: 'Doppler & Flow',
      icon: FiActivity,
      color: 'from-red-500 to-red-600',
      components: [
        { component: DopplerSimulator, title: 'Doppler Simulator' }
      ]
    },
    artifacts: {
      name: 'Artifacts & QA',
      icon: FiAlertTriangle,
      color: 'from-orange-500 to-orange-600',
      components: [
        { component: ArtifactSimulator, title: 'Artifact Simulator' },
        { component: ArtifactAnalyzer, title: 'Artifact Analyzer' }
      ]
    },
    transducers: {
      name: 'Transducers',
      icon: FiRadio,
      color: 'from-green-500 to-green-600',
      components: [
        { component: TransducerComparison, title: 'Transducer Comparison' }
      ]
    },
    optimization: {
      name: 'Optimization',
      icon: FiTarget,
      color: 'from-purple-500 to-purple-600',
      components: [
        { component: ScanOptimizer, title: 'Scan Optimizer' }
      ]
    },
    challenges: {
      name: 'Interactive Challenges',
      icon: FiPlay,
      color: 'from-yellow-500 to-yellow-600',
      components: [
        { component: RealtimeQuizChallenge, title: 'Lightning Round' }
      ]
    }
  };

  const currentTool = tools[activeTab];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Interactive Physics Tools
            </h1>
            <p className="text-primary-100">
              Master ultrasound physics with hands-on simulations and real-time feedback
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-primary-200">Interactive</p>
              <p className="font-bold">Learning Experience</p>
            </div>
            <SafeIcon icon={FiTool} className="text-4xl text-primary-200" />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-medical-200">
        <div className="flex flex-wrap gap-2">
          {Object.entries(tools).map(([key, tool]) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === key
                  ? `bg-gradient-to-r ${tool.color} text-white shadow-lg`
                  : 'bg-medical-100 text-medical-700 hover:bg-medical-200'
              }`}
            >
              <SafeIcon icon={tool.icon} />
              <span>{tool.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tool Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-8"
        >
          {currentTool.components.map(({ component: Component, title }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Component />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Learning Tips */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
        <h2 className="text-xl font-bold text-medical-900 mb-4 flex items-center">
          <SafeIcon icon={FiZap} className="mr-2 text-yellow-600" />
          Interactive Learning Tips
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-medical-900 mb-2">Maximize Your Learning</h3>
            <ul className="text-sm text-medical-700 space-y-1">
              <li>• Experiment with different parameter combinations</li>
              <li>• Watch how changes affect multiple variables simultaneously</li>
              <li>• Use audio feedback in Doppler simulator for better understanding</li>
              <li>• Practice with real clinical scenarios using presets</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-medical-900 mb-2">Pro Tips</h3>
            <ul className="text-sm text-medical-700 space-y-1">
              <li>• Save interesting calculations for later review</li>
              <li>• Compare multiple transducers to understand trade-offs</li>
              <li>• Use artifact simulators to recognize patterns</li>
              <li>• Challenge yourself with the lightning round for speed</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
        <h2 className="text-xl font-bold text-medical-900 mb-4">Your Interactive Learning Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Tools Used', value: '6/6', icon: FiTool, color: 'text-blue-600' },
            { label: 'Calculations', value: '47', icon: FiCalculator, color: 'text-green-600' },
            { label: 'Simulations', value: '23', icon: FiZap, color: 'text-purple-600' },
            { label: 'Challenge Score', value: '1,250', icon: FiTarget, color: 'text-orange-600' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-4 bg-medical-50 rounded-lg"
            >
              <SafeIcon icon={stat.icon} className={`text-2xl ${stat.color} mx-auto mb-2`} />
              <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-medical-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default PhysicsTools;