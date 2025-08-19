import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBookOpen, FiTool, FiTarget, FiCheck } = FiIcons;

function PhysicsLearningPath() {
  const [activeModule, setActiveModule] = useState('basics');

  const learningModules = [
    {
      id: 'basics',
      title: 'Sound Wave Fundamentals',
      description: 'Understanding how sound propagates through tissue',
      topics: ['Frequency & Wavelength', 'Propagation Speed', 'Wave Characteristics'],
      completed: false
    },
    {
      id: 'impedance',
      title: 'Acoustic Impedance',
      description: 'How tissue properties affect sound transmission',
      topics: ['Impedance Matching', 'Reflection Coefficients', 'Interface Effects'],
      completed: false
    },
    {
      id: 'artifacts',
      title: 'Artifact Recognition',
      description: 'Identifying and managing common artifacts',
      topics: ['Shadowing', 'Enhancement', 'Reverberation', 'Refraction'],
      completed: false
    },
    {
      id: 'optimization',
      title: 'Scan Optimization',
      description: 'Applying physics principles to improve image quality',
      topics: ['TGC Settings', 'Frequency Selection', 'Focus Positioning'],
      completed: false
    }
  ];

  const activeModuleData = learningModules.find(m => m.id === activeModule);

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <SafeIcon icon={FiTarget} className="text-2xl text-primary-600" />
          <div>
            <h2 className="text-xl font-bold text-medical-900">Physics Learning Path</h2>
            <p className="text-sm text-medical-600">Structured approach to mastering ultrasound physics</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Module Selection */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {learningModules.map((module, index) => (
              <motion.button
                key={module.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveModule(module.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  activeModule === module.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-medical-200 hover:border-primary-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-medical-900">{module.title}</h3>
                  {module.completed && (
                    <SafeIcon icon={FiCheck} className="text-green-500" />
                  )}
                </div>
                <p className="text-sm text-medical-600 mb-3">{module.description}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-xs text-medical-500">
                    <SafeIcon icon={FiBookOpen} />
                    <span>{module.topics.length} Topics</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Active Module Details */}
          {activeModuleData && (
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-medical-50 rounded-lg border border-medical-200"
            >
              <h3 className="font-bold text-medical-900 mb-3">{activeModuleData.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-medical-800 mb-2">Topics Covered:</h4>
                  <ul className="space-y-1">
                    {activeModuleData.topics.map((topic, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-medical-700">
                        <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <Link
                    to="/physics-tools"
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    <SafeIcon icon={FiTool} />
                    <span>Interactive Tools</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Learning Resources */}
        <div>
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-medical-900 mb-4">Study Resources</h3>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg border border-blue-100">
                <h4 className="font-medium text-medical-900 mb-2">Interactive Calculators</h4>
                <p className="text-sm text-medical-600">
                  Use physics calculators to understand relationships between frequency, wavelength, and resolution.
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-blue-100">
                <h4 className="font-medium text-medical-900 mb-2">Visual Diagrams</h4>
                <p className="text-sm text-medical-600">
                  Explore interactive diagrams showing wave propagation, reflection, and artifact formation.
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-blue-100">
                <h4 className="font-medium text-medical-900 mb-2">Practice Questions</h4>
                <p className="text-sm text-medical-600">
                  Test your understanding with targeted questions for each physics concept.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhysicsLearningPath;