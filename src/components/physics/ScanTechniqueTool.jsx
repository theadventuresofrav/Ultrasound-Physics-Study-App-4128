import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSliders, FiUsers, FiSettings, FiZap } = FiIcons;

function ScanTechniqueTool() {
  const [patientType, setPatientType] = useState('normal');
  const [scanType, setScanType] = useState('abdominal');
  const [depth, setDepth] = useState(10);

  const patientTypes = [
    { id: 'normal', label: 'Average Body Habitus' },
    { id: 'difficult', label: 'Challenging Body Habitus' },
    { id: 'pediatric', label: 'Pediatric' },
    { id: 'geriatric', label: 'Geriatric' }
  ];

  const scanTypes = [
    { id: 'abdominal', label: 'Abdominal', depth: '8-14 cm' },
    { id: 'cardiac', label: 'Cardiac', depth: '12-18 cm' },
    { id: 'vascular', label: 'Vascular', depth: '2-6 cm' },
    { id: 'ob', label: 'OB/GYN', depth: '10-16 cm' },
    { id: 'msk', label: 'MSK', depth: '1-5 cm' }
  ];

  const getTechniqueTips = () => {
    // Comprehensive tips based on patient type and scan type
    const tips = {
      normal: {
        abdominal: [
          {
            title: 'Frequency Selection',
            tip: 'Start with 3.5-5 MHz curved array. Adjust based on depth and resolution needs.',
            settings: 'Frequency: 3.5-5 MHz, TGC: Linear increase with depth'
          },
          {
            title: 'Focal Zone Placement',
            tip: 'Position 1-2 focal zones at areas of interest. For general survey, place at mid-abdomen.',
            settings: 'Focus Depth: 8-10 cm for general survey'
          }
        ],
        cardiac: [
          {
            title: 'Probe Selection',
            tip: 'Use phased array (2-4 MHz) for adult cardiac imaging through intercostal spaces.',
            settings: 'Frequency: 2-4 MHz, Sector width: 90°'
          }
        ]
      },
      difficult: {
        abdominal: [
          {
            title: 'Penetration Optimization',
            tip: 'Lower frequency for better penetration. Consider harmonic imaging if available.',
            settings: 'Frequency: 2-3.5 MHz, Increase power output within MI/TI limits'
          },
          {
            title: 'Gain Adjustments',
            tip: 'Increase overall gain but avoid oversaturation. Use TGC to compensate for depth.',
            settings: 'Overall Gain: +3-5dB from baseline'
          }
        ]
      }
    };

    return tips[patientType]?.[scanType] || [
      {
        title: 'General Optimization',
        tip: 'Adjust settings based on visualization needs while maintaining ALARA principles.',
        settings: 'Start with preset and optimize from there'
      }
    ];
  };

  const getOptimalSettings = () => {
    // Return optimal machine settings based on selections
    const settings = {
      normal: {
        abdominal: {
          frequency: '3.5-5 MHz',
          gain: 'Mid-range (50-60)',
          depth: '14-16 cm',
          focusZones: 2,
          tgc: 'Linear increase'
        },
        cardiac: {
          frequency: '2-4 MHz',
          gain: 'Mid-high range (55-65)',
          depth: '16-18 cm',
          focusZones: 1,
          tgc: 'Increased mid-field'
        }
      },
      difficult: {
        abdominal: {
          frequency: '2-3.5 MHz',
          gain: 'Higher range (60-70)',
          depth: '16-20 cm',
          focusZones: 2,
          tgc: 'Steeper increase'
        }
      }
    };

    return settings[patientType]?.[scanType] || {
      frequency: 'Adjust per visualization',
      gain: 'Start mid-range',
      depth: 'As needed',
      focusZones: 1,
      tgc: 'Adjust to equalize brightness'
    };
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-medical-900 mb-4 flex items-center">
        <SafeIcon icon={FiSliders} className="mr-2 text-primary-600" />
        Scan Technique Optimizer
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Patient Type Selection */}
        <div>
          <label className="block text-sm font-medium text-medical-700 mb-2">
            Patient Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {patientTypes.map(type => (
              <motion.button
                key={type.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPatientType(type.id)}
                className={`p-3 rounded-lg text-left transition-all ${
                  patientType === type.id
                    ? 'bg-primary-100 border-2 border-primary-500 text-primary-700'
                    : 'bg-medical-50 border border-medical-200 hover:bg-medical-100'
                }`}
              >
                <div className="text-sm font-medium">{type.label}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Scan Type Selection */}
        <div>
          <label className="block text-sm font-medium text-medical-700 mb-2">
            Scan Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {scanTypes.map(type => (
              <motion.button
                key={type.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setScanType(type.id)}
                className={`p-3 rounded-lg text-left transition-all ${
                  scanType === type.id
                    ? 'bg-primary-100 border-2 border-primary-500 text-primary-700'
                    : 'bg-medical-50 border border-medical-200 hover:bg-medical-100'
                }`}
              >
                <div className="text-sm font-medium">{type.label}</div>
                <div className="text-xs text-medical-600">Typical depth: {type.depth}</div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Technique Tips */}
      <div className="space-y-4 mb-6">
        <h3 className="font-semibold text-medical-900 flex items-center">
          <SafeIcon icon={FiZap} className="mr-2 text-yellow-600" />
          Optimization Tips
        </h3>
        {getTechniqueTips().map((tip, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-yellow-50 rounded-lg border border-yellow-200"
          >
            <h4 className="font-medium text-medical-900 mb-2">{tip.title}</h4>
            <p className="text-sm text-medical-700 mb-2">{tip.tip}</p>
            <div className="text-xs text-yellow-800 bg-yellow-100 p-2 rounded">
              {tip.settings}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recommended Settings */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h3 className="font-semibold text-medical-900 mb-3 flex items-center">
          <SafeIcon icon={FiSettings} className="mr-2 text-blue-600" />
          Recommended Settings
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(getOptimalSettings()).map(([key, value]) => (
            <div key={key} className="bg-white p-3 rounded border border-blue-100">
              <div className="text-xs text-blue-600 uppercase">{key}</div>
              <div className="font-medium text-medical-900">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScanTechniqueTool;