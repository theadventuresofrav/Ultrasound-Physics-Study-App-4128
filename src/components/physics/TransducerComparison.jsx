import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiRadio, FiTarget, FiMaximize2, FiSettings } = FiIcons;

function TransducerComparison() {
  const [selectedTransducers, setSelectedTransducers] = useState(['linear', 'phased']);
  const [showBeamPattern, setShowBeamPattern] = useState(true);
  const [animateBeams, setAnimateBeams] = useState(false);

  const transducers = {
    linear: {
      name: 'Linear Array',
      frequency: '5-12 MHz',
      footprint: 'Large',
      imageFormat: 'Rectangular',
      applications: ['Small parts', 'Vascular', 'MSK'],
      color: '#0ea5e9',
      beamWidth: 40,
      beamLength: 120,
      elements: 128
    },
    curved: {
      name: 'Curved Array',
      frequency: '2-8 MHz',
      footprint: 'Large',
      imageFormat: 'Curved/Sector',
      applications: ['Abdominal', 'OB/GYN'],
      color: '#10b981',
      beamWidth: 35,
      beamLength: 140,
      elements: 128
    },
    phased: {
      name: 'Phased Array',
      frequency: '1-5 MHz',
      footprint: 'Small',
      imageFormat: 'Sector',
      applications: ['Cardiac', 'Transcranial'],
      color: '#f59e0b',
      beamWidth: 15,
      beamLength: 150,
      elements: 64
    },
    endocavitary: {
      name: 'Endocavitary',
      frequency: '5-9 MHz',
      footprint: 'Small',
      imageFormat: 'Sector',
      applications: ['Transvaginal', 'Transrectal'],
      color: '#8b5cf6',
      beamWidth: 12,
      beamLength: 100,
      elements: 96
    }
  };

  const toggleTransducer = (type) => {
    if (selectedTransducers.includes(type)) {
      if (selectedTransducers.length > 1) {
        setSelectedTransducers(prev => prev.filter(t => t !== type));
      }
    } else {
      if (selectedTransducers.length < 3) {
        setSelectedTransducers(prev => [...prev, type]);
      }
    }
  };

  const generateBeamPath = (transducer, index, total) => {
    const startX = 50 + (index * 200);
    const startY = 50;
    const transducerData = transducers[transducer];
    
    if (transducer === 'linear') {
      return `
        M ${startX} ${startY + 20}
        L ${startX} ${startY + transducerData.beamLength}
        L ${startX + transducerData.beamWidth} ${startY + transducerData.beamLength}
        L ${startX + transducerData.beamWidth} ${startY + 20}
        Z
      `;
    } else if (transducer === 'curved') {
      return `
        M ${startX + transducerData.beamWidth/2} ${startY + 20}
        Q ${startX - 20} ${startY + transducerData.beamLength/2} ${startX - 10} ${startY + transducerData.beamLength}
        Q ${startX + transducerData.beamWidth/2} ${startY + transducerData.beamLength + 20} ${startX + transducerData.beamWidth + 10} ${startY + transducerData.beamLength}
        Q ${startX + transducerData.beamWidth + 20} ${startY + transducerData.beamLength/2} ${startX + transducerData.beamWidth/2} ${startY + 20}
        Z
      `;
    } else {
      // Phased/sector beam
      return `
        M ${startX + transducerData.beamWidth/2} ${startY + 20}
        L ${startX - transducerData.beamLength * 0.3} ${startY + transducerData.beamLength}
        L ${startX + transducerData.beamWidth + transducerData.beamLength * 0.3} ${startY + transducerData.beamLength}
        Z
      `;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <SafeIcon icon={FiRadio} className="text-2xl text-blue-600" />
          <div>
            <h2 className="text-xl font-bold text-medical-900">Transducer Comparison Tool</h2>
            <p className="text-sm text-medical-600">Compare different transducer types side by side</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowBeamPattern(!showBeamPattern)}
            className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
          >
            <SafeIcon icon={FiTarget} className="mr-1" />
            {showBeamPattern ? 'Hide' : 'Show'} Beams
          </button>
          <button
            onClick={() => setAnimateBeams(!animateBeams)}
            className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm"
          >
            <SafeIcon icon={FiSettings} />
          </button>
        </div>
      </div>

      {/* Transducer Selection */}
      <div className="mb-6">
        <h3 className="font-semibold text-medical-900 mb-3">Select Transducers to Compare (max 3)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(transducers).map(([key, transducer]) => (
            <button
              key={key}
              onClick={() => toggleTransducer(key)}
              disabled={!selectedTransducers.includes(key) && selectedTransducers.length >= 3}
              className={`p-3 rounded-lg transition-all ${
                selectedTransducers.includes(key)
                  ? 'border-2 shadow-lg'
                  : 'bg-medical-100 text-medical-700 hover:bg-medical-200 border border-medical-200'
              } ${
                !selectedTransducers.includes(key) && selectedTransducers.length >= 3
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              style={{
                backgroundColor: selectedTransducers.includes(key) ? `${transducer.color}20` : '',
                borderColor: selectedTransducers.includes(key) ? transducer.color : ''
              }}
            >
              <div className="font-medium">{transducer.name}</div>
              <div className="text-xs opacity-75">{transducer.frequency}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Visual Comparison */}
      {showBeamPattern && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6 bg-slate-900 rounded-xl p-4"
        >
          <h3 className="text-white font-semibold mb-4">Beam Pattern Comparison</h3>
          <div className="h-64 relative">
            <svg width="100%" height="100%">
              {selectedTransducers.map((transducer, index) => {
                const transducerData = transducers[transducer];
                const startX = 50 + (index * 200);
                
                return (
                  <g key={transducer}>
                    {/* Transducer element */}
                    <rect
                      x={startX}
                      y="30"
                      width={transducerData.beamWidth}
                      height="20"
                      fill={transducerData.color}
                      rx="3"
                    />
                    
                    {/* Beam pattern */}
                    <motion.path
                      d={generateBeamPath(transducer, index, selectedTransducers.length)}
                      fill={transducerData.color}
                      fillOpacity="0.2"
                      stroke={transducerData.color}
                      strokeWidth="1"
                      strokeDasharray="2,2"
                      animate={animateBeams ? {
                        fillOpacity: [0.2, 0.4, 0.2],
                        strokeOpacity: [0.5, 1, 0.5]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    />
                    
                    {/* Label */}
                    <text
                      x={startX + transducerData.beamWidth/2}
                      y="25"
                      textAnchor="middle"
                      fill={transducerData.color}
                      fontSize="12"
                      fontWeight="bold"
                    >
                      {transducerData.name}
                    </text>
                    
                    {/* Frequency label */}
                    <text
                      x={startX + transducerData.beamWidth/2}
                      y="15"
                      textAnchor="middle"
                      fill="#9ca3af"
                      fontSize="10"
                    >
                      {transducerData.frequency}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </motion.div>
      )}

      {/* Detailed Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-medical-200">
              <th className="text-left p-3 text-medical-900 font-semibold">Property</th>
              {selectedTransducers.map((transducer) => (
                <th
                  key={transducer}
                  className="text-center p-3 text-medical-900 font-semibold"
                  style={{ color: transducers[transducer].color }}
                >
                  {transducers[transducer].name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { key: 'frequency', label: 'Frequency Range' },
              { key: 'footprint', label: 'Footprint Size' },
              { key: 'imageFormat', label: 'Image Format' },
              { key: 'elements', label: 'Element Count' }
            ].map((property) => (
              <motion.tr
                key={property.key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-b border-medical-100 hover:bg-medical-50"
              >
                <td className="p-3 font-medium text-medical-900">{property.label}</td>
                {selectedTransducers.map((transducer) => (
                  <td key={transducer} className="text-center p-3 text-medical-700">
                    {transducers[transducer][property.key]}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Clinical Applications */}
      <div className="mt-6 grid gap-4">
        {selectedTransducers.map((transducer, index) => {
          const transducerData = transducers[transducer];
          return (
            <motion.div
              key={transducer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg border-l-4"
              style={{ 
                borderLeftColor: transducerData.color,
                backgroundColor: `${transducerData.color}10`
              }}
            >
              <h4 className="font-semibold text-medical-900 mb-2">
                {transducerData.name} - Clinical Applications
              </h4>
              <div className="flex flex-wrap gap-2">
                {transducerData.applications.map((app) => (
                  <span
                    key={app}
                    className="px-3 py-1 bg-white rounded-full text-sm font-medium border"
                    style={{ 
                      borderColor: transducerData.color,
                      color: transducerData.color
                    }}
                  >
                    {app}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default TransducerComparison;