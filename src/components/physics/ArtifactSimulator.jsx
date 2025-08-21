import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiAlertTriangle, FiEye, FiSettings, FiRefreshCw, FiZap } = FiIcons;

function ArtifactSimulator() {
  const [selectedArtifact, setSelectedArtifact] = useState('reverberation');
  const [artifactIntensity, setArtifactIntensity] = useState(50);
  const [showCorrection, setShowCorrection] = useState(false);
  const [animateArtifact, setAnimateArtifact] = useState(true);

  const artifacts = {
    reverberation: {
      name: 'Reverberation',
      description: 'Multiple reflections between parallel surfaces',
      color: '#ef4444',
      correction: 'Change scanning angle or reduce gain',
      mechanism: 'Sound bounces back and forth between reflectors'
    },
    shadowing: {
      name: 'Acoustic Shadowing',
      description: 'Sound blocked by highly attenuating structure',
      color: '#1f2937',
      correction: 'Scan from different angle or use lower frequency',
      mechanism: 'Strong attenuation prevents sound transmission'
    },
    enhancement: {
      name: 'Acoustic Enhancement',
      description: 'Increased echoes behind low-attenuating structure',
      color: '#10b981',
      correction: 'Adjust TGC or recognize as normal finding',
      mechanism: 'Less attenuation preserves sound energy'
    },
    sideLobes: {
      name: 'Side Lobe Artifact',
      description: 'False echoes from off-axis beam energy',
      color: '#8b5cf6',
      correction: 'Use beam steering or harmonic imaging',
      mechanism: 'Side lobe energy detects off-axis reflectors'
    },
    mirror: {
      name: 'Mirror Image',
      description: 'Duplicate structure on opposite side of reflector',
      color: '#f59e0b',
      correction: 'Change scanning approach or recognize pattern',
      mechanism: 'Strong reflector acts as acoustic mirror'
    }
  };

  const currentArtifact = artifacts[selectedArtifact];

  const generateArtifactPattern = () => {
    switch (selectedArtifact) {
      case 'reverberation':
        return Array.from({ length: 5 }, (_, i) => ({
          x: 200,
          y: 100 + i * 30,
          intensity: Math.max(100 - i * 20, 10),
          delay: i * 0.2
        }));
      case 'shadowing':
        return [{
          x: 200,
          y: 150,
          width: 60,
          height: 100,
          intensity: 10
        }];
      case 'enhancement':
        return [{
          x: 200,
          y: 150,
          width: 40,
          height: 80,
          intensity: 150
        }];
      case 'sideLobes':
        return [
          { x: 120, y: 180, intensity: 60 },
          { x: 280, y: 180, intensity: 60 }
        ];
      case 'mirror':
        return [
          { x: 150, y: 120, intensity: 80, original: true },
          { x: 250, y: 120, intensity: 60, mirror: true }
        ];
      default:
        return [];
    }
  };

  const artifactPattern = generateArtifactPattern();

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <SafeIcon icon={FiAlertTriangle} className="text-2xl text-orange-600" />
          <div>
            <h2 className="text-xl font-bold text-medical-900">Artifact Simulator</h2>
            <p className="text-sm text-medical-600">Interactive artifact demonstration</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowCorrection(!showCorrection)}
            className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <SafeIcon icon={FiEye} className="mr-1" />
            {showCorrection ? 'Hide' : 'Show'} Correction
          </button>
          <button
            onClick={() => setAnimateArtifact(!animateArtifact)}
            className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <SafeIcon icon={FiZap} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Artifact Selection */}
        <div className="space-y-4">
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <h3 className="font-semibold text-medical-900 mb-3">Select Artifact</h3>
            <div className="space-y-2">
              {Object.entries(artifacts).map(([key, artifact]) => (
                <button
                  key={key}
                  onClick={() => setSelectedArtifact(key)}
                  className={`w-full p-3 text-left rounded-lg transition-all ${
                    selectedArtifact === key
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-white text-medical-700 hover:bg-orange-100 border border-orange-200'
                  }`}
                >
                  <div className="font-medium">{artifact.name}</div>
                  <div className="text-xs opacity-80">{artifact.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Artifact Intensity */}
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-medical-700">
                Artifact Intensity
              </label>
              <span className="text-slate-700 font-bold">{artifactIntensity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={artifactIntensity}
              onChange={(e) => setArtifactIntensity(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Artifact Information */}
          <motion.div
            key={selectedArtifact}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-medical-50 rounded-lg p-4 border border-medical-200"
          >
            <h4 className="font-semibold text-medical-900 mb-2">Physics Mechanism</h4>
            <p className="text-sm text-medical-700 mb-3">
              {currentArtifact.mechanism}
            </p>
            
            {showCorrection && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-3 border-t border-medical-200"
              >
                <h4 className="font-semibold text-green-900 mb-2">Correction Method</h4>
                <p className="text-sm text-green-700">
                  {currentArtifact.correction}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Interactive Ultrasound Image */}
        <div className="lg:col-span-2">
          <div className="bg-black rounded-xl p-4 h-80 relative overflow-hidden">
            <div className="text-white text-sm mb-2 flex items-center justify-between">
              <span>Simulated Ultrasound Image</span>
              <span className="text-xs text-slate-400">
                {currentArtifact.name} @ {artifactIntensity}%
              </span>
            </div>
            
            <svg width="100%" height="90%" className="border border-slate-600 rounded">
              {/* Background tissue texture */}
              <defs>
                <pattern id="tissue" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="1" fill="#4a5568" opacity="0.3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#tissue)" />

              {/* Normal tissue structures */}
              <ellipse cx="150" cy="80" rx="30" ry="15" fill="#718096" opacity="0.6" />
              <ellipse cx="250" cy="120" rx="20" ry="25" fill="#a0aec0" opacity="0.4" />

              {/* Artifact visualization */}
              <AnimatePresence>
                {artifactPattern.map((pattern, index) => (
                  <motion.g
                    key={`${selectedArtifact}-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: artifactIntensity / 100 }}
                    exit={{ opacity: 0 }}
                  >
                    {selectedArtifact === 'reverberation' && (
                      <motion.rect
                        x={pattern.x - 15}
                        y={pattern.y}
                        width="30"
                        height="8"
                        fill={currentArtifact.color}
                        opacity={pattern.intensity / 100}
                        animate={animateArtifact ? {
                          opacity: [pattern.intensity / 100, (pattern.intensity / 100) * 0.5, pattern.intensity / 100]
                        } : {}}
                        transition={{ duration: 1, repeat: Infinity, delay: pattern.delay }}
                      />
                    )}
                    
                    {selectedArtifact === 'shadowing' && (
                      <motion.rect
                        x={pattern.x - pattern.width / 2}
                        y={pattern.y}
                        width={pattern.width}
                        height={pattern.height}
                        fill="#000"
                        opacity={0.8}
                        animate={animateArtifact ? {
                          opacity: [0.8, 0.6, 0.8]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    
                    {selectedArtifact === 'enhancement' && (
                      <motion.rect
                        x={pattern.x - pattern.width / 2}
                        y={pattern.y}
                        width={pattern.width}
                        height={pattern.height}
                        fill="#10b981"
                        opacity={0.4}
                        animate={animateArtifact ? {
                          opacity: [0.4, 0.6, 0.4]
                        } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                    
                    {selectedArtifact === 'sideLobes' && (
                      <motion.circle
                        cx={pattern.x}
                        cy={pattern.y}
                        r="8"
                        fill={currentArtifact.color}
                        opacity={pattern.intensity / 100}
                        animate={animateArtifact ? {
                          r: [8, 12, 8],
                          opacity: [pattern.intensity / 100, (pattern.intensity / 100) * 0.5, pattern.intensity / 100]
                        } : {}}
                        transition={{ duration: 1, repeat: Infinity, delay: index * 0.3 }}
                      />
                    )}
                    
                    {selectedArtifact === 'mirror' && (
                      <motion.ellipse
                        cx={pattern.x}
                        cy={pattern.y}
                        rx="15"
                        ry="10"
                        fill={pattern.original ? "#718096" : currentArtifact.color}
                        opacity={pattern.intensity / 100}
                        animate={animateArtifact ? {
                          opacity: [pattern.intensity / 100, (pattern.intensity / 100) * 0.7, pattern.intensity / 100]
                        } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.g>
                ))}
              </AnimatePresence>

              {/* Depth markers */}
              {[50, 100, 150, 200].map((depth) => (
                <g key={depth}>
                  <line x1="0" y1={depth} x2="20" y2={depth} stroke="#4a5568" strokeWidth="1" />
                  <text x="25" y={depth + 3} fill="#9ca3af" fontSize="8">
                    {Math.round(depth * 0.154)} cm
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Interactive Controls */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex space-x-2">
              <button
                onClick={() => setAnimateArtifact(!animateArtifact)}
                className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm"
              >
                <SafeIcon icon={animateArtifact ? FiPause : FiPlay} className="mr-1" />
                {animateArtifact ? 'Pause' : 'Animate'}
              </button>
              <button
                onClick={() => setArtifactIntensity(50)}
                className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm"
              >
                <SafeIcon icon={FiRefreshCw} className="mr-1" />
                Reset
              </button>
            </div>
            
            <div className="text-sm text-medical-600">
              Artifact Intensity: {artifactIntensity}%
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Feedback */}
      <motion.div
        layout
        className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200"
      >
        <h3 className="font-semibold text-medical-900 mb-2">Real-time Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-blue-900 mb-1">Current Settings Impact:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Artifact severity: {artifactIntensity > 70 ? 'High' : artifactIntensity > 30 ? 'Moderate' : 'Low'}</li>
              <li>• Image quality: {artifactIntensity > 50 ? 'Compromised' : 'Good'}</li>
              <li>• Diagnostic confidence: {artifactIntensity > 60 ? 'Reduced' : 'Maintained'}</li>
            </ul>
          </div>
          
          {showCorrection && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h4 className="text-sm font-medium text-green-900 mb-1">Optimization Strategy:</h4>
              <p className="text-sm text-green-800">{currentArtifact.correction}</p>
              <div className="mt-2 flex items-center text-xs text-green-700">
                <SafeIcon icon={FiZap} className="mr-1" />
                <span>Expected improvement: {Math.max(100 - artifactIntensity, 20)}%</span>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default ArtifactSimulator;