import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { physicsSimulations } from '../../data/physicsSimulations';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCalculator, FiSliders, FiZap, FiActivity, FiTrendingUp, FiTarget } = FiIcons;

function PhysicsCalculator() {
  const [frequency, setFrequency] = useState(5); // MHz
  const [depth, setDepth] = useState(10); // cm
  const [selectedTissue, setSelectedTissue] = useState(physicsSimulations.soundWaves.tissues[0]);
  const [aperture, setAperture] = useState(20); // mm
  const [animateValues, setAnimateValues] = useState(false);
  const [showWaveAnimation, setShowWaveAnimation] = useState(false);
  const [calculationHistory, setCalculationHistory] = useState([]);

  // Calculate physics parameters
  const wavelength = physicsSimulations.soundWaves.calculations.wavelength(frequency);
  const penetration = physicsSimulations.soundWaves.calculations.penetration(frequency, selectedTissue);
  const axialResolution = physicsSimulations.resolution.axial(wavelength);
  const lateralResolution = physicsSimulations.resolution.lateral(wavelength, aperture, depth * 10);

  // Animate values when they change
  useEffect(() => {
    setAnimateValues(true);
    const timer = setTimeout(() => setAnimateValues(false), 500);
    return () => clearTimeout(timer);
  }, [frequency, depth, selectedTissue, aperture]);

  // Save calculation to history
  const saveCalculation = () => {
    const calculation = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      frequency,
      depth,
      tissue: selectedTissue.name,
      wavelength: wavelength.toFixed(3),
      penetration: penetration.toFixed(1),
      axialResolution: axialResolution.toFixed(3),
      lateralResolution: lateralResolution.toFixed(3)
    };
    setCalculationHistory(prev => [calculation, ...prev.slice(0, 4)]);
  };

  // Get frequency color based on clinical application
  const getFrequencyColor = (freq) => {
    if (freq <= 3.5) return 'text-red-600'; // Deep imaging
    if (freq <= 7.5) return 'text-yellow-600'; // General imaging
    return 'text-green-600'; // Superficial imaging
  };

  // Generate optimization suggestions
  const getOptimizationSuggestions = () => {
    const suggestions = [];
    
    if (frequency > 7.5 && depth > 15) {
      suggestions.push({
        type: 'warning',
        message: 'High frequency with deep imaging may limit penetration',
        suggestion: 'Consider reducing frequency to 3.5-5 MHz for better penetration'
      });
    }
    
    if (frequency < 5 && depth < 5) {
      suggestions.push({
        type: 'tip',
        message: 'Low frequency for shallow imaging',
        suggestion: 'Increase frequency to 7.5-12 MHz for better resolution'
      });
    }
    
    if (selectedTissue.name === 'Bone' && frequency > 5) {
      suggestions.push({
        type: 'warning',
        message: 'High frequency through bone',
        suggestion: 'Use lower frequency (2-3.5 MHz) for bone penetration'
      });
    }

    return suggestions;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <SafeIcon icon={FiCalculator} className="text-2xl text-primary-600" />
          <div>
            <h2 className="text-xl font-bold text-medical-900">Interactive Physics Calculator</h2>
            <p className="text-sm text-medical-600">Real-time ultrasound physics calculations</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowWaveAnimation(!showWaveAnimation)}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
          >
            {showWaveAnimation ? 'Hide' : 'Show'} Wave
          </button>
          <button
            onClick={saveCalculation}
            className="px-3 py-1 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm"
          >
            Save Result
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Controls */}
        <div className="space-y-6">
          <div className="bg-medical-50 rounded-xl p-4 border border-medical-200">
            <h3 className="font-semibold text-medical-900 mb-4">Input Parameters</h3>
            
            {/* Frequency Slider */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-medical-700">
                  Frequency (MHz)
                </label>
                <span className={`text-lg font-bold ${getFrequencyColor(frequency)}`}>
                  {frequency} MHz
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="15"
                step="0.5"
                value={frequency}
                onChange={(e) => setFrequency(parseFloat(e.target.value))}
                className="w-full h-2 bg-medical-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-medical-500 mt-1">
                <span>2 MHz</span>
                <span className="text-red-600">Deep</span>
                <span className="text-yellow-600">General</span>
                <span className="text-green-600">Superficial</span>
                <span>15 MHz</span>
              </div>
            </div>

            {/* Depth Slider */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-medical-700">
                  Scanning Depth (cm)
                </label>
                <span className="text-lg font-bold text-blue-600">
                  {depth} cm
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={depth}
                onChange={(e) => setDepth(parseInt(e.target.value))}
                className="w-full h-2 bg-medical-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-medical-500 mt-1">
                <span>1 cm</span>
                <span>Shallow</span>
                <span>Deep</span>
                <span>30 cm</span>
              </div>
            </div>

            {/* Tissue Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-medical-700 mb-2">
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
                className="w-full p-3 border border-medical-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {physicsSimulations.soundWaves.tissues.map(tissue => (
                  <option key={tissue.name} value={tissue.name}>
                    {tissue.name} (Z: {tissue.impedance} MRayls)
                  </option>
                ))}
              </select>
            </div>

            {/* Aperture Control */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-medical-700">
                  Aperture Size (mm)
                </label>
                <span className="text-lg font-bold text-purple-600">
                  {aperture} mm
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                value={aperture}
                onChange={(e) => setAperture(parseInt(e.target.value))}
                className="w-full h-2 bg-medical-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>

        {/* Calculated Results */}
        <div className="space-y-4">
          <div className="bg-medical-50 rounded-xl p-4 border border-medical-200">
            <h3 className="font-semibold text-medical-900 mb-4">Calculated Results</h3>
            
            <motion.div
              animate={animateValues ? { scale: [1, 1.05, 1] } : {}}
              className="p-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg border border-primary-200 mb-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-medical-700">Wavelength</span>
                <span className="text-primary-600 font-bold text-xl">
                  {wavelength.toFixed(3)} mm
                </span>
              </div>
              <div className="text-xs text-medical-500">
                λ = c/f = 1540/{frequency * 1000} = {wavelength.toFixed(3)} mm
              </div>
              <div className="mt-2 h-1 bg-primary-200 rounded-full">
                <motion.div
                  className="h-full bg-primary-500 rounded-full"
                  animate={{ width: `${Math.min((wavelength / 0.77) * 100, 100)}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>

            <motion.div
              animate={animateValues ? { scale: [1, 1.05, 1] } : {}}
              className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200 mb-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-medical-700">Max Penetration</span>
                <span className="text-blue-600 font-bold text-xl">
                  {penetration.toFixed(1)} cm
                </span>
              </div>
              <div className="text-xs text-medical-500">
                Based on {selectedTissue.name} attenuation: {selectedTissue.attenuation} dB/cm/MHz
              </div>
              <div className="mt-2 h-1 bg-blue-200 rounded-full">
                <motion.div
                  className="h-full bg-blue-500 rounded-full"
                  animate={{ width: `${Math.min((penetration / 30) * 100, 100)}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>

            <motion.div
              animate={animateValues ? { scale: [1, 1.05, 1] } : {}}
              className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 mb-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-medical-700">Axial Resolution</span>
                <span className="text-green-600 font-bold text-xl">
                  {axialResolution.toFixed(3)} mm
                </span>
              </div>
              <div className="text-xs text-medical-500">
                = λ/2 = {wavelength.toFixed(3)}/2 = {axialResolution.toFixed(3)} mm
              </div>
              <div className="mt-2 h-1 bg-green-200 rounded-full">
                <motion.div
                  className="h-full bg-green-500 rounded-full"
                  animate={{ width: `${Math.max(100 - (axialResolution * 1000), 20)}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>

            <motion.div
              animate={animateValues ? { scale: [1, 1.05, 1] } : {}}
              className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-medical-700">Lateral Resolution</span>
                <span className="text-yellow-600 font-bold text-xl">
                  {lateralResolution.toFixed(3)} mm
                </span>
              </div>
              <div className="text-xs text-medical-500">
                = (λ × depth) / aperture
              </div>
              <div className="mt-2 h-1 bg-yellow-200 rounded-full">
                <motion.div
                  className="h-full bg-yellow-500 rounded-full"
                  animate={{ width: `${Math.max(100 - (lateralResolution * 100), 20)}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave Visualization */}
        <div className="space-y-4">
          {showWaveAnimation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-slate-900 rounded-xl p-4 border border-slate-700"
            >
              <h3 className="font-semibold text-white mb-4">Wave Visualization</h3>
              <WaveAnimation frequency={frequency} wavelength={wavelength} />
            </motion.div>
          )}

          {/* Optimization Suggestions */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
            <h3 className="font-medium text-medical-900 mb-3 flex items-center">
              <SafeIcon icon={FiZap} className="mr-2 text-yellow-600" />
              Smart Recommendations
            </h3>
            <div className="space-y-2">
              {getOptimizationSuggestions().map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 rounded-lg ${
                    suggestion.type === 'warning' 
                      ? 'bg-red-100 border border-red-200 text-red-800'
                      : 'bg-blue-100 border border-blue-200 text-blue-800'
                  }`}
                >
                  <div className="font-medium mb-1">{suggestion.message}</div>
                  <div className="text-sm">{suggestion.suggestion}</div>
                </motion.div>
              ))}
              
              {getOptimizationSuggestions().length === 0 && (
                <div className="p-3 bg-green-100 border border-green-200 rounded-lg text-green-800">
                  <div className="flex items-center">
                    <SafeIcon icon={FiTarget} className="mr-2" />
                    <span className="font-medium">Optimal settings for current configuration!</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Clinical Applications */}
          <div className="bg-medical-50 rounded-xl p-4 border border-medical-200">
            <h3 className="font-medium text-medical-900 mb-3">Clinical Applications</h3>
            <div className="space-y-2">
              {frequency <= 3.5 && (
                <div className="flex items-center text-sm text-medical-700">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  Ideal for deep abdominal imaging
                </div>
              )}
              {frequency >= 5 && frequency <= 7.5 && (
                <div className="flex items-center text-sm text-medical-700">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                  General purpose imaging
                </div>
              )}
              {frequency >= 10 && (
                <div className="flex items-center text-sm text-medical-700">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Excellent for superficial structures
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Calculation History */}
      {calculationHistory.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-slate-50 rounded-xl p-4 border border-slate-200"
        >
          <h3 className="font-semibold text-medical-900 mb-3 flex items-center">
            <SafeIcon icon={FiActivity} className="mr-2 text-slate-600" />
            Recent Calculations
          </h3>
          <div className="space-y-2">
            {calculationHistory.map((calc) => (
              <div
                key={calc.id}
                className="p-3 bg-white rounded-lg border border-slate-200 text-sm"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{calc.frequency} MHz @ {calc.depth}cm in {calc.tissue}</span>
                  <span className="text-slate-500">{calc.timestamp}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                  <span>λ: {calc.wavelength}mm</span>
                  <span>Penetration: {calc.penetration}cm</span>
                  <span>Axial: {calc.axialResolution}mm</span>
                  <span>Lateral: {calc.lateralResolution}mm</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Wave Animation Component
function WaveAnimation({ frequency, wavelength }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(prev => (prev + 0.1) % (2 * Math.PI));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-32 bg-slate-800 rounded-lg overflow-hidden">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        
        {/* Wave Path */}
        <path
          d={`M 0 64 ${Array.from({ length: 100 }, (_, i) => {
            const x = (i / 100) * 400;
            const y = 64 + 30 * Math.sin((frequency / 5) * (x / 50) + phase);
            return `L ${x} ${y}`;
          }).join(' ')}`}
          fill="none"
          stroke="url(#waveGradient)"
          strokeWidth="3"
        />
        
        {/* Frequency indicator */}
        <text x="10" y="20" fill="#0ea5e9" fontSize="12" fontWeight="bold">
          {frequency} MHz
        </text>
        
        {/* Wavelength indicator */}
        <text x="10" y="110" fill="#10b981" fontSize="10">
          λ = {wavelength.toFixed(3)} mm
        </text>
      </svg>
    </div>
  );
}

export default PhysicsCalculator;