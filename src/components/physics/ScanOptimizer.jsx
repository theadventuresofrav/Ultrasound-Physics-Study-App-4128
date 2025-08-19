import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { optimizationPresets } from '../../data/physicsSimulations';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSettings, FiZap, FiSliders, FiMaximize2, FiEye } = FiIcons;

function ScanOptimizer() {
  const [scanType, setScanType] = useState('abdominal');
  const [patientType, setPatientType] = useState('normal');
  const [currentSettings, setCurrentSettings] = useState(optimizationPresets.abdominal.normal);

  const handleScanTypeChange = (type) => {
    setScanType(type);
    setCurrentSettings(optimizationPresets[type][patientType]);
  };

  const handlePatientTypeChange = (type) => {
    setPatientType(type);
    setCurrentSettings(optimizationPresets[scanType][type]);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-medical-900 mb-4 flex items-center">
        <SafeIcon icon={FiSettings} className="mr-2 text-primary-600" />
        Scan Optimizer
      </h2>

      {/* Scan Selection */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {Object.keys(optimizationPresets).map((type) => (
          <motion.button
            key={type}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleScanTypeChange(type)}
            className={`p-4 rounded-lg border-2 transition-all ${
              scanType === type
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-medical-200 hover:border-primary-300'
            }`}
          >
            <div className="text-center">
              <div className="font-medium capitalize">{type}</div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Patient Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-medical-700 mb-2">
          Patient Type
        </label>
        <div className="grid grid-cols-2 gap-4">
          {['normal', 'difficult'].map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handlePatientTypeChange(type)}
              className={`p-3 rounded-lg border-2 transition-all ${
                patientType === type
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-medical-200 hover:border-primary-300'
              }`}
            >
              <div className="text-center">
                <div className="font-medium capitalize">{type}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recommended Settings */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-blue-50 rounded-lg border border-blue-200"
        >
          <h3 className="font-medium text-medical-900 mb-2 flex items-center">
            <SafeIcon icon={FiSliders} className="mr-2 text-blue-600" />
            Recommended Settings
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-medical-600">Frequency</div>
              <div className="font-bold text-blue-700">{currentSettings.frequency} MHz</div>
            </div>
            <div>
              <div className="text-sm text-medical-600">Focus Zones</div>
              <div className="font-bold text-blue-700">{currentSettings.focusZones}</div>
            </div>
          </div>
        </motion.div>

        {/* Gain Adjustments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 bg-green-50 rounded-lg border border-green-200"
        >
          <h3 className="font-medium text-medical-900 mb-2 flex items-center">
            <SafeIcon icon={FiZap} className="mr-2 text-green-600" />
            TGC Adjustments
          </h3>
          <div className="space-y-2">
            {Object.entries(currentSettings.gainAdjustments).map(([zone, value]) => (
              <div key={zone} className="flex items-center justify-between">
                <span className="text-sm text-medical-600 capitalize">{zone} Field</span>
                <span className={`font-bold ${
                  value > 0 ? 'text-green-600' : value < 0 ? 'text-red-600' : 'text-medical-600'
                }`}>
                  {value > 0 ? '+' : ''}{value} dB
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Optimization Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 bg-yellow-50 rounded-lg border border-yellow-200"
        >
          <h3 className="font-medium text-medical-900 mb-2 flex items-center">
            <SafeIcon icon={FiEye} className="mr-2 text-yellow-600" />
            Optimization Tips
          </h3>
          <ul className="space-y-2 text-sm text-medical-700">
            {patientType === 'difficult' && (
              <>
                <li className="flex items-center">
                  <SafeIcon icon={FiMaximize2} className="mr-2 text-yellow-600" />
                  Increase near-field gain for better visualization
                </li>
                <li className="flex items-center">
                  <SafeIcon icon={FiMaximize2} className="mr-2 text-yellow-600" />
                  Consider harmonic imaging if available
                </li>
              </>
            )}
            <li className="flex items-center">
              <SafeIcon icon={FiMaximize2} className="mr-2 text-yellow-600" />
              Adjust focal zones to region of interest
            </li>
            <li className="flex items-center">
              <SafeIcon icon={FiMaximize2} className="mr-2 text-yellow-600" />
              Fine-tune TGC for uniform image brightness
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default ScanOptimizer;