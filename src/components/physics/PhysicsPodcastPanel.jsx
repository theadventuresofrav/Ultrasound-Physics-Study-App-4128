import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBookOpen, FiTool, FiTarget } = FiIcons;

function PhysicsPodcastPanel({ currentTopic = 'general' }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-4">
        <SafeIcon icon={FiBookOpen} className="text-2xl text-primary-600" />
        <div>
          <h3 className="text-lg font-bold text-medical-900">Study Resources</h3>
          <p className="text-sm text-medical-600">Additional learning materials</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-primary-50 rounded-lg border border-primary-100">
          <h4 className="font-medium text-medical-900 mb-2">Interactive Tools</h4>
          <p className="text-sm text-medical-600">
            Use our physics calculators and simulators to understand complex concepts.
          </p>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h4 className="font-medium text-medical-900 mb-2">Practice Questions</h4>
          <p className="text-sm text-medical-600">
            Test your knowledge with targeted questions on {currentTopic} physics.
          </p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg border border-green-100">
          <h4 className="font-medium text-medical-900 mb-2">Visual Learning</h4>
          <p className="text-sm text-medical-600">
            Explore diagrams and animations to visualize physics principles.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PhysicsPodcastPanel;