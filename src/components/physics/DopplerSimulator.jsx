import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiActivity, FiVolume2, FiPlay, FiPause, FiSettings } = FiIcons;

function DopplerSimulator() {
  const [velocity, setVelocity] = useState(50); // cm/s
  const [angle, setAngle] = useState(60); // degrees
  const [frequency, setFrequency] = useState(5); // MHz
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [oscillator, setOscillator] = useState(null);
  const [bloodCellPositions, setBloodCellPositions] = useState([]);

  // Initialize blood cell positions
  useEffect(() => {
    const positions = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 50 + i * 40,
      y: 150,
      phase: i * 0.5
    }));
    setBloodCellPositions(positions);
  }, []);

  // Animate blood cells
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setBloodCellPositions(prev => 
          prev.map(cell => ({
            ...cell,
            x: (cell.x + velocity * 0.1) % 400,
            phase: cell.phase + 0.1
          }))
        );
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying, velocity]);

  // Calculate Doppler shift
  const calculateDopplerShift = () => {
    const speedOfSound = 154000; // cm/s
    const angleRad = (angle * Math.PI) / 180;
    const dopplerShift = (2 * frequency * 1000000 * velocity * Math.cos(angleRad)) / speedOfSound;
    return dopplerShift;
  };

  // Play Doppler audio
  const playDopplerAudio = async () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(ctx);

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      const baseFreq = 440; // A4 note
      const dopplerShift = calculateDopplerShift();
      const audioFreq = baseFreq + (dopplerShift / 1000); // Scale for audible range

      osc.frequency.setValueAtTime(audioFreq, ctx.currentTime);
      osc.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      setOscillator(osc);
      setIsPlaying(true);
    } catch (error) {
      console.warn('Audio not supported:', error);
    }
  };

  const stopDopplerAudio = () => {
    if (oscillator) {
      oscillator.stop();
      setOscillator(null);
    }
    if (audioContext) {
      audioContext.close();
      setAudioContext(null);
    }
    setIsPlaying(false);
  };

  const dopplerShift = calculateDopplerShift();
  const velocityFromDoppler = Math.abs(dopplerShift * 154000 / (2 * frequency * 1000000 * Math.cos((angle * Math.PI) / 180)));

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <SafeIcon icon={FiActivity} className="text-2xl text-red-600" />
          <div>
            <h2 className="text-xl font-bold text-medical-900">Doppler Effect Simulator</h2>
            <p className="text-sm text-medical-600">Interactive blood flow visualization</p>
          </div>
        </div>
        <button
          onClick={isPlaying ? stopDopplerAudio : playDopplerAudio}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            isPlaying
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          <SafeIcon icon={isPlaying ? FiPause : FiPlay} className="mr-2" />
          {isPlaying ? 'Stop Audio' : 'Play Doppler Audio'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          {/* Presets */}
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <h3 className="font-semibold text-medical-900 mb-3">Clinical Scenarios</h3>
            <div className="space-y-2">
              {Object.entries(presets).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => applyPreset(key)}
                  className={`w-full p-2 text-sm rounded-lg transition-colors ${
                    selectedPreset === key
                      ? 'bg-red-500 text-white'
                      : 'bg-white text-medical-700 hover:bg-red-100'
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
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-medical-700">
                  Blood Velocity
                </label>
                <span className="text-red-600 font-bold">{velocity} cm/s</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                step="5"
                value={velocity}
                onChange={(e) => setVelocity(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-medical-700">
                  Doppler Angle
                </label>
                <span className="text-blue-600 font-bold">{angle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                step="5"
                value={angle}
                onChange={(e) => setAngle(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-medical-500 mt-1">
                <span>0° (Max)</span>
                <span>60° (Optimal)</span>
                <span>90° (None)</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-medical-700">
                  Frequency
                </label>
                <span className="text-purple-600 font-bold">{frequency} MHz</span>
              </div>
              <input
                type="range"
                min="2"
                max="10"
                step="0.5"
                value={frequency}
                onChange={(e) => setFrequency(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="lg:col-span-2">
          <div className="bg-slate-800 rounded-xl p-4 h-80 relative overflow-hidden">
            <svg width="100%" height="100%" className="absolute inset-0">
              {/* Blood vessel */}
              <rect
                x="50"
                y="140"
                width="300"
                height="20"
                fill="#dc2626"
                rx="10"
                opacity="0.8"
              />
              
              {/* Vessel walls */}
              <line x1="50" y1="140" x2="350" y2="140" stroke="#991b1b" strokeWidth="2" />
              <line x1="50" y1="160" x2="350" y2="160" stroke="#991b1b" strokeWidth="2" />

              {/* Transducer */}
              <rect
                x="180"
                y="50"
                width="40"
                height="20"
                fill="#0ea5e9"
                rx="5"
              />

              {/* Ultrasound beam */}
              <path
                d={`
                  M 200 70
                  L ${200 - 30 * Math.sin((angle * Math.PI) / 180)} ${140 - 30 * Math.cos((angle * Math.PI) / 180)}
                  L ${200 + 30 * Math.sin((angle * Math.PI) / 180)} ${140 - 30 * Math.cos((angle * Math.PI) / 180)}
                  Z
                `}
                fill="rgba(6, 182, 212, 0.3)"
                stroke="#06b6d4"
                strokeWidth="1"
              />

              {/* Angle indicator */}
              <path
                d={`
                  M 200 70
                  A 30 30 0 0 1 ${200 + 30 * Math.sin((angle * Math.PI) / 180)} ${140 - 30 * Math.cos((angle * Math.PI) / 180)}
                `}
                fill="none"
                stroke="#fbbf24"
                strokeWidth="2"
                strokeDasharray="3,3"
              />

              {/* Blood cells */}
              {bloodCellPositions.map((cell) => (
                <motion.circle
                  key={cell.id}
                  cx={cell.x}
                  cy={cell.y}
                  r="4"
                  fill="#b91c1c"
                  animate={{
                    x: [0, 5, 0, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: cell.phase
                  }}
                />
              ))}

              {/* Flow direction arrow */}
              <path
                d="M 280 150 L 320 150 M 315 145 L 320 150 L 315 155"
                stroke="#fbbf24"
                strokeWidth="2"
                fill="none"
              />

              {/* Labels */}
              <text x="200" y="45" textAnchor="middle" fill="#0ea5e9" fontSize="12" fontWeight="bold">
                Transducer
              </text>
              <text x="325" y="135" fill="#fbbf24" fontSize="10">
                Flow Direction
              </text>
              <text x="230" y="110" fill="#fbbf24" fontSize="10">
                θ = {angle}°
              </text>
            </svg>
          </div>

          {/* Doppler Calculations */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            <motion.div
              animate={{ scale: isPlaying ? [1, 1.05, 1] : 1 }}
              transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0 }}
              className="bg-red-50 rounded-lg p-3 border border-red-200"
            >
              <div className="text-sm text-red-600 mb-1">Doppler Shift</div>
              <div className="font-bold text-red-800">
                {Math.abs(dopplerShift).toFixed(0)} Hz
              </div>
            </motion.div>
            
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <div className="text-sm text-blue-600 mb-1">Calculated Velocity</div>
              <div className="font-bold text-blue-800">
                {velocityFromDoppler.toFixed(1)} cm/s
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
              <div className="text-sm text-purple-600 mb-1">Cos(θ) Factor</div>
              <div className="font-bold text-purple-800">
                {Math.cos((angle * Math.PI) / 180).toFixed(3)}
              </div>
            </div>
          </div>

          {/* Doppler Equation */}
          <div className="mt-4 bg-slate-100 rounded-lg p-4 border border-slate-200">
            <h4 className="font-semibold text-medical-900 mb-2">Doppler Equation</h4>
            <div className="font-mono text-sm text-medical-800 text-center">
              Δf = 2f₀(v·cos θ)/c
            </div>
            <div className="text-xs text-medical-600 text-center mt-1">
              {dopplerShift.toFixed(0)} Hz = 2×{frequency}MHz×{velocity}cm/s×cos({angle}°)/1540m/s
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DopplerSimulator;