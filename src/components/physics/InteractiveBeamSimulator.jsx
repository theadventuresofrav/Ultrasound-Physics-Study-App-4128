import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiZap, FiTarget, FiSliders, FiPlay, FiPause, FiRotateCcw } = FiIcons;

function InteractiveBeamSimulator() {
  const [frequency, setFrequency] = useState(5);
  const [aperture, setAperture] = useState(20);
  const [focusDepth, setFocusDepth] = useState(50);
  const [isAnimating, setIsAnimating] = useState(false);
  const [beamPhase, setBeamPhase] = useState(0);
  const [showFocalZone, setShowFocalZone] = useState(true);
  const [selectedPreset, setSelectedPreset] = useState('general');

  // Presets for different clinical applications
  const presets = {
    superficial: { frequency: 12, aperture: 25, focusDepth: 20, name: 'Superficial (MSK)' },
    general: { frequency: 5, aperture: 20, focusDepth: 50, name: 'General Purpose' },
    deep: { frequency: 2.5, aperture: 30, focusDepth: 100, name: 'Deep Abdominal' },
    cardiac: { frequency: 2, aperture: 15, focusDepth: 80, name: 'Cardiac' }
  };

  useEffect(() => {
    let interval;
    if (isAnimating) {
      interval = setInterval(() => {
        setBeamPhase(prev => (prev + 0.1) % (2 * Math.PI));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isAnimating]);

  const applyPreset = (preset) => {
    const config = presets[preset];
    setFrequency(config.frequency);
    setAperture(config.aperture);
    setFocusDepth(config.focusDepth);
    setSelectedPreset(preset);
  };

  const calculateBeamProperties = () => {
    const wavelength = 1.54 / frequency; // mm
    const nearFieldLength = (aperture * aperture) / (4 * wavelength);
    const divergenceAngle = Math.atan(wavelength / aperture) * (180 / Math.PI);
    
    return {
      wavelength,
      nearFieldLength,
      divergenceAngle,
      beamWidth: aperture
    };
  };

  const beamProps = calculateBeamProperties();

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <SafeIcon icon={FiZap} className="text-2xl text-primary-600" />
          <div>
            <h2 className="text-xl font-bold text-medical-900">Interactive Beam Simulator</h2>
            <p className="text-sm text-medical-600">Visualize ultrasound beam characteristics</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className={`px-3 py-2 rounded-lg transition-colors ${
              isAnimating 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            <SafeIcon icon={isAnimating ? FiPause : FiPlay} className="mr-2" />
            {isAnimating ? 'Pause' : 'Animate'}
          </button>
          <button
            onClick={() => setBeamPhase(0)}
            className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <SafeIcon icon={FiRotateCcw} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          {/* Presets */}
          <div className="bg-medical-50 rounded-lg p-4">
            <h3 className="font-semibold text-medical-900 mb-3">Quick Presets</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(presets).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => applyPreset(key)}
                  className={`p-2 text-sm rounded-lg transition-colors ${
                    selectedPreset === key
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-medical-700 hover:bg-primary-100'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Parameter Controls */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-medical-700 mb-2">
                Frequency: {frequency} MHz
              </label>
              <input
                type="range"
                min="1"
                max="15"
                step="0.5"
                value={frequency}
                onChange={(e) => setFrequency(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-medical-700 mb-2">
                Aperture: {aperture} mm
              </label>
              <input
                type="range"
                min="5"
                max="40"
                value={aperture}
                onChange={(e) => setAperture(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-medical-700 mb-2">
                Focus Depth: {focusDepth} mm
              </label>
              <input
                type="range"
                min="10"
                max="150"
                value={focusDepth}
                onChange={(e) => setFocusDepth(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Display Options */}
          <div className="bg-slate-50 rounded-lg p-4">
            <h3 className="font-semibold text-medical-900 mb-3">Display Options</h3>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showFocalZone}
                onChange={(e) => setShowFocalZone(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-medical-700">Show Focal Zone</span>
            </label>
          </div>
        </div>

        {/* Beam Visualization */}
        <div className="lg:col-span-2">
          <div className="bg-slate-900 rounded-xl p-4 h-96 relative overflow-hidden">
            <h3 className="text-white font-semibold mb-4">Ultrasound Beam Profile</h3>
            
            <svg width="100%" height="100%" className="absolute inset-4">
              {/* Transducer */}
              <rect
                x="10"
                y="10"
                width={aperture}
                height="20"
                fill="#0ea5e9"
                rx="2"
              />
              
              {/* Beam outline */}
              <path
                d={`
                  M ${10 + aperture/2} 30
                  L ${10 + aperture/2 - (focusDepth * 0.3)} ${30 + focusDepth}
                  L ${10 + aperture/2 + (focusDepth * 0.3)} ${30 + focusDepth}
                  Z
                `}
                fill="rgba(14, 165, 233, 0.2)"
                stroke="#0ea5e9"
                strokeWidth="1"
                strokeDasharray="2,2"
              />

              {/* Focal zone indicator */}
              {showFocalZone && (
                <circle
                  cx={10 + aperture/2}
                  cy={30 + focusDepth}
                  r="8"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                />
              )}

              {/* Animated beam pulses */}
              {isAnimating && (
                <>
                  {[0, 1, 2].map((i) => (
                    <motion.circle
                      key={i}
                      cx={10 + aperture/2}
                      cy={30}
                      r="5"
                      fill="#06b6d4"
                      opacity="0.6"
                      animate={{
                        cy: [30, 30 + focusDepth + 50],
                        opacity: [0.8, 0.2, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </>
              )}

              {/* Depth markers */}
              {[20, 40, 60, 80, 100].map((depth) => (
                <g key={depth}>
                  <line
                    x1="5"
                    y1={30 + depth}
                    x2={15 + aperture}
                    y2={30 + depth}
                    stroke="#64748b"
                    strokeWidth="1"
                    opacity="0.5"
                  />
                  <text
                    x="0"
                    y={35 + depth}
                    fill="#94a3b8"
                    fontSize="10"
                  >
                    {depth}mm
                  </text>
                </g>
              ))}

              {/* Labels */}
              <text x={10 + aperture/2} y="50" textAnchor="middle" fill="#0ea5e9" fontSize="10">
                Transducer ({aperture}mm)
              </text>
              
              {showFocalZone && (
                <text 
                  x={25 + aperture/2} 
                  y={35 + focusDepth} 
                  fill="#10b981" 
                  fontSize="10"
                >
                  Focus ({focusDepth}mm)
                </text>
              )}
            </svg>
          </div>

          {/* Beam Properties */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <div className="text-sm text-blue-600 mb-1">Near Field Length</div>
              <div className="font-bold text-blue-800">
                {beamProps.nearFieldLength.toFixed(1)} mm
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
              <div className="text-sm text-green-600 mb-1">Divergence Angle</div>
              <div className="font-bold text-green-800">
                {beamProps.divergenceAngle.toFixed(1)}°
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InteractiveBeamSimulator;