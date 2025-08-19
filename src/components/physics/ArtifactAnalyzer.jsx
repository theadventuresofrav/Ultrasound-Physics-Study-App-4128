import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { physicsSimulations } from '../../data/physicsSimulations';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiAlertTriangle, FiCheck, FiImage, FiSearch } = FiIcons;

function ArtifactAnalyzer() {
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArtifacts = physicsSimulations.artifacts.filter(artifact =>
    artifact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artifact.cause.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-medical-900 mb-4 flex items-center">
        <SafeIcon icon={FiAlertTriangle} className="mr-2 text-primary-600" />
        Artifact Analyzer
      </h2>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search artifacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-10 border border-medical-200 rounded-lg focus:outline-none focus:border-primary-500"
        />
        <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-medical-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Artifact List */}
        <div className="space-y-4">
          {filteredArtifacts.map((artifact, index) => (
            <motion.button
              key={artifact.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedArtifact(artifact)}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                selectedArtifact?.name === artifact.name
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-medical-200 hover:border-primary-300'
              }`}
            >
              <div className="font-medium text-medical-900">{artifact.name}</div>
              <div className="text-sm text-medical-600 mt-1">{artifact.cause}</div>
            </motion.button>
          ))}
        </div>

        {/* Artifact Details */}
        {selectedArtifact && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Appearance */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-medium text-medical-900 mb-2 flex items-center">
                <SafeIcon icon={FiImage} className="mr-2 text-blue-600" />
                Appearance
              </h3>
              <p className="text-medical-700">{selectedArtifact.appearance}</p>
            </div>

            {/* Solutions */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-medium text-medical-900 mb-2 flex items-center">
                <SafeIcon icon={FiCheck} className="mr-2 text-green-600" />
                Solutions
              </h3>
              <ul className="space-y-2">
                {selectedArtifact.solutions.map((solution, index) => (
                  <li key={index} className="flex items-center text-medical-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    {solution}
                  </li>
                ))}
              </ul>
            </div>

            {/* Example Images */}
            <div className="p-4 bg-medical-50 rounded-lg border border-medical-200">
              <h3 className="font-medium text-medical-900 mb-2 flex items-center">
                <SafeIcon icon={FiImage} className="mr-2 text-medical-600" />
                Example Images
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-medical-100 rounded-lg flex items-center justify-center">
                  <span className="text-medical-500 text-sm">With Artifact</span>
                </div>
                <div className="aspect-square bg-medical-100 rounded-lg flex items-center justify-center">
                  <span className="text-medical-500 text-sm">After Correction</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default ArtifactAnalyzer;