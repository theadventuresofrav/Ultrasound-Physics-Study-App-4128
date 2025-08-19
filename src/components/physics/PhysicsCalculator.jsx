import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { physicsSimulations } from '../../data/physicsSimulations';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCalculator, FiSliders, FiZap } = FiIcons;

function PhysicsCalculator() {
  const [frequency, setFrequency] = useState(5); // MHz
  const [depth, setDepth] = useState(10); // cm
  const [selectedTissue, setSelectedTissue] = useState(physicsSimulations.soundWaves.tissues[0]);
  const [aperture, setAperture] = useState(20); // mm

  // Calculate physics parameters
  const wavelength = physicsSimulations.soundWaves.calculations.wavelength(frequency);
  const penetration = physicsSimulations.soundWaves.calculations.penetration(frequency, selectedTissue);
  const axialResolution = physicsSimulations.resolution.axial(wavelength);
  const lateralResolution = physicsSimulations.resolution.lateral(wavelength, aperture, depth * 10);

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-medical-900 mb-4 flex items-center">
        <SafeIcon icon={FiCalculator} className="mr-2 text-primary-600" />
        Physics Calculator
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Parameters */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-medical-700 mb-1">
              Frequency (MHz)
            </label>
            <input
              type="range"
              min="2"
              max="15"
              step="0.5"
              value={frequency}
              onChange={(e) => setFrequency(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="text-right text-sm text-medical-600">{frequency} MHz</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-medical-700 mb-1">
              Scanning Depth (cm)
            </label>
            <input
              type="range"
              min="1"
              max="30"
              value={depth}
              onChange={(e) => setDepth(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-right text-sm text-medical-600">{depth} cm</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-medical-700 mb-1">
              Tissue Type
            </label>
            <select
              value={selectedTissue.name}
              onChange={(e) => {
                const tissue = physicsSimulations.soundWaves.tissues.find(
                  t => t.name === e.target.value
                );
                setSelectedTissue(tissue);
              }}
              className="w-full p-2 border border-medical-200 rounded-lg"
            >
              {physicsSimulations.soundWaves.tissues.map(tissue => (
                <option key={tissue.name} value={tissue.name}>
                  {tissue.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Calculated Results */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-primary-50 rounded-lg border border-primary-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-medical-700">Wavelength</span>
              <span className="text-primary-600 font-bold">{wavelength.toFixed(3)} mm</span>
            </div>
            <div className="text-xs text-medical-500">
              Determines spatial pulse length and resolution
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 bg-blue-50 rounded-lg border border-blue-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-medical-700">Maximum Penetration</span>
              <span className="text-blue-600 font-bold">{penetration.toFixed(1)} cm</span>
            </div>
            <div className="text-xs text-medical-500">
              Based on tissue attenuation and frequency
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 bg-green-50 rounded-lg border border-green-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-medical-700">Axial Resolution</span>
              <span className="text-green-600 font-bold">{axialResolution.toFixed(3)} mm</span>
            </div>
            <div className="text-xs text-medical-500">
              Ability to distinguish objects along beam axis
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 bg-yellow-50 rounded-lg border border-yellow-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-medical-700">Lateral Resolution</span>
              <span className="text-yellow-600 font-bold">{lateralResolution.toFixed(3)} mm</span>
            </div>
            <div className="text-xs text-medical-500">
              Ability to distinguish objects perpendicular to beam
            </div>
          </motion.div>
        </div>
      </div>

      {/* Optimization Tips */}
      <div className="mt-6 p-4 bg-medical-50 rounded-lg">
        <h3 className="font-medium text-medical-900 mb-2 flex items-center">
          <SafeIcon icon={FiSliders} className="mr-2 text-medical-600" />
          Optimization Tips
        </h3>
        <ul className="space-y-2 text-sm text-medical-700">
          {frequency > 7.5 && depth > 15 && (
            <li className="flex items-center text-yellow-700">
              <SafeIcon icon={FiZap} className="mr-2" />
              Consider lower frequency for better penetration at this depth
            </li>
          )}
          {frequency < 5 && depth < 5 && (
            <li className="flex items-center text-yellow-700">
              <SafeIcon icon={FiZap} className="mr-2" />
              Higher frequency recommended for better resolution at shallow depth
            </li>
          )}
          {selectedTissue.name === 'Bone' && frequency > 5 && (
            <li className="flex items-center text-yellow-700">
              <SafeIcon icon={FiZap} className="mr-2" />
              Lower frequency suggested for bone penetration
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default PhysicsCalculator;