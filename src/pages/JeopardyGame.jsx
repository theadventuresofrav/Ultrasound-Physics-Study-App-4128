import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudy } from '../context/StudyContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiCheckCircle, FiXCircle, FiClock, FiDollarSign, FiAward } = FiIcons;

function JeopardyGame() {
  const { dispatch } = useStudy();
  const [gameState, setGameState] = useState('start'); // start, playing, question, result
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [gameStats, setGameStats] = useState({
    correct: 0,
    incorrect: 0,
    total: 0,
  });

  // Define categories
  const categories = [
    { id: 'basics', name: 'Basic Physics', color: 'from-blue-500 to-blue-600' },
    { id: 'transducers', name: 'Transducers', color: 'from-green-500 to-green-600' },
    { id: 'doppler', name: 'Doppler', color: 'from-red-500 to-red-600' },
    { id: 'artifacts', name: 'Artifacts', color: 'from-purple-500 to-purple-600' },
    { id: 'safety', name: 'Safety & QA', color: 'from-yellow-500 to-yellow-600' },
  ];

  // Define values - now 10 levels instead of 5
  const values = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

  // Expanded questions for each category and value
  const questions = {
    basics: {
      100: {
        question: 'This property of ultrasound waves is measured in MHz and determines resolution',
        options: ['Frequency', 'Amplitude', 'Wavelength', 'Power'],
        answer: 0,
        explanation: 'Frequency (measured in MHz) determines resolution. Higher frequencies provide better resolution but less penetration depth.'
      },
      200: {
        question: 'Sound travels fastest through this medium',
        options: ['Air', 'Fat', 'Soft tissue', 'Bone'],
        answer: 3,
        explanation: 'Sound travels fastest in bone (~4080 m/s), followed by soft tissue (~1540 m/s), fat (~1450 m/s), and slowest in air (~330 m/s).'
      },
      300: {
        question: 'Acoustic impedance is defined as the product of these two properties',
        options: ['Frequency and wavelength', 'Density and propagation speed', 'Amplitude and attenuation', 'Reflection and refraction'],
        answer: 1,
        explanation: 'Acoustic impedance (Z) = density (ρ) × propagation speed (c). It determines how much ultrasound is reflected at tissue interfaces.'
      },
      400: {
        question: 'This physical principle states that sound intensity decreases by approximately 0.5 dB/cm/MHz as it travels through tissue',
        options: ['Attenuation coefficient', 'Half-value layer', 'Acoustic enhancement', 'Impedance mismatch'],
        answer: 0,
        explanation: 'The attenuation coefficient describes how ultrasound intensity decreases with depth in tissue, approximately 0.5 dB/cm/MHz.'
      },
      500: {
        question: 'The wavelength of a 5 MHz ultrasound wave in soft tissue (1540 m/s) is',
        options: ['0.31 mm', '0.62 mm', '1.54 mm', '3.08 mm'],
        answer: 0,
        explanation: 'Wavelength = Speed/Frequency = 1540 m/s ÷ 5,000,000 Hz = 0.000308 m = 0.31 mm'
      },
      600: {
        question: 'What percentage of ultrasound is reflected at a soft tissue-air interface?',
        options: ['1%', '50%', '90%', '99.9%'],
        answer: 3,
        explanation: 'Due to the large acoustic impedance mismatch between soft tissue and air, approximately 99.9% of ultrasound is reflected.'
      },
      700: {
        question: 'The half-value layer is the depth at which ultrasound intensity is reduced to what percentage?',
        options: ['10%', '37%', '50%', '90%'],
        answer: 2,
        explanation: 'The half-value layer (HVL) is the depth at which ultrasound intensity is reduced to 50% of its original value due to attenuation.'
      },
      800: {
        question: 'Rayleigh scattering occurs when the scatterer size is',
        options: ['Much larger than the wavelength', 'Equal to the wavelength', 'Much smaller than the wavelength', 'Twice the wavelength'],
        answer: 2,
        explanation: 'Rayleigh scattering occurs when the scatterer (like red blood cells) is much smaller than the wavelength.'
      },
      900: {
        question: 'The decibel (dB) is what type of scale?',
        options: ['Linear scale', 'Logarithmic scale', 'Exponential scale', 'Square root scale'],
        answer: 1,
        explanation: 'The decibel is a logarithmic scale used to express ratios of power or intensity. dB = 10 log₁₀(I₁/I₂) for intensity ratios.'
      },
      1000: {
        question: 'Snell\'s law describes which ultrasound phenomenon?',
        options: ['Reflection at interfaces', 'Refraction at interfaces', 'Absorption in tissues', 'Scattering from particles'],
        answer: 1,
        explanation: 'Snell\'s law describes refraction: sin(θ₁)/sin(θ₂) = c₁/c₂, where θ is the angle and c is the speed of sound.'
      }
    },
    transducers: {
      100: {
        question: 'This effect allows ultrasound transducers to convert electrical energy to sound waves and vice versa',
        options: ['Photoelectric effect', 'Piezoelectric effect', 'Doppler effect', 'Hall effect'],
        answer: 1,
        explanation: 'The piezoelectric effect is the ability of certain materials to generate an electric charge in response to mechanical stress and vice versa.'
      },
      200: {
        question: 'This type of array transducer produces a rectangular image format',
        options: ['Phased array', 'Linear array', 'Curved array', 'Vector array'],
        answer: 1,
        explanation: 'Linear arrays fire groups of elements sequentially, creating parallel scan lines and a rectangular image format.'
      },
      300: {
        question: 'This material is commonly used as the backing material in transducers',
        options: ['Ceramic', 'Tungsten-epoxy', 'Aluminum', 'Plastic'],
        answer: 1,
        explanation: 'Tungsten-epoxy composite is commonly used as backing material to absorb unwanted sound waves and dampen the transducer element.'
      },
      400: {
        question: 'This type of transducer is best for cardiac imaging',
        options: ['Linear array', 'Curved array', 'Phased array', 'Mechanical sector'],
        answer: 2,
        explanation: 'Phased arrays create sector images from a small footprint, ideal for imaging through intercostal spaces in cardiac applications.'
      },
      500: {
        question: 'Grating lobes in array transducers occur when element spacing is',
        options: ['Less than λ/2', 'Equal to λ/2', 'Greater than λ/2', 'Equal to λ'],
        answer: 2,
        explanation: 'When array elements are spaced more than λ/2 apart, grating lobes create artifacts by sending energy in unintended directions.'
      },
      600: {
        question: 'The natural frequency of a piezoelectric element is determined by its',
        options: ['Thickness', 'Width', 'Length', 'Applied voltage'],
        answer: 0,
        explanation: 'The resonant frequency is inversely proportional to thickness: f₀ = c/(2t), where c is the speed of sound in the material and t is thickness.'
      },
      700: {
        question: 'What is the purpose of the matching layer in a transducer?',
        options: ['To focus the ultrasound beam', 'To improve transmission of ultrasound into tissue', 'To dampen the piezoelectric element', 'To protect the piezoelectric element'],
        answer: 1,
        explanation: 'The matching layer reduces acoustic impedance mismatch between the piezoelectric element and tissue, improving energy transmission.'
      },
      800: {
        question: 'Apodization is used to reduce',
        options: ['Sensitivity', 'Side lobes', 'Penetration', 'Frequency'],
        answer: 1,
        explanation: 'Apodization involves varying the amplitude of excitation across the transducer aperture to reduce side lobe levels and improve beam quality.'
      },
      900: {
        question: 'The Curie temperature is the temperature at which',
        options: ['Optimal operation occurs', 'Piezoelectric properties are lost', 'Maximum sensitivity is achieved', 'Room temperature calibration is done'],
        answer: 1,
        explanation: 'The Curie temperature is the temperature above which a piezoelectric material loses its piezoelectric properties permanently.'
      },
      1000: {
        question: 'What happens to beam divergence in the far field as frequency increases?',
        options: ['Increases', 'Decreases', 'Remains constant', 'Becomes zero'],
        answer: 1,
        explanation: 'Beam divergence angle decreases with increasing frequency (θ ∝ λ/D). Higher frequencies have smaller wavelengths, resulting in less beam divergence.'
      }
    },
    doppler: {
      100: {
        question: 'This type of Doppler displays blood flow information as an audible signal and spectral display',
        options: ['Color Doppler', 'Power Doppler', 'Spectral Doppler', 'B-flow'],
        answer: 2,
        explanation: 'Spectral Doppler provides audible output and displays flow information as a spectrum of frequencies or velocities over time.'
      },
      200: {
        question: 'The Doppler angle is the angle between',
        options: ['Transducer face and skin', 'Ultrasound beam and vessel wall', 'Ultrasound beam and direction of blood flow', 'Vessel wall and skin surface'],
        answer: 2,
        explanation: 'The Doppler angle is between the ultrasound beam and the direction of blood flow. Optimal angle is 60° or less.'
      },
      300: {
        question: 'Maximum Doppler shift occurs at this angle',
        options: ['0 degrees', '45 degrees', '60 degrees', '90 degrees'],
        answer: 0,
        explanation: 'Cos(0°) = 1, giving maximum Doppler shift when flow is directly toward/away from the transducer.'
      },
      400: {
        question: 'This Doppler mode is most sensitive for detecting slow flow or small vessels',
        options: ['Color Doppler', 'Power Doppler', 'Continuous wave Doppler', 'Pulsed wave Doppler'],
        answer: 1,
        explanation: 'Power Doppler is more sensitive for detecting slow or weak flow but does not provide directional information.'
      },
      500: {
        question: 'The Nyquist limit in pulsed wave Doppler is equal to',
        options: ['PRF × 2', 'PRF ÷ 2', 'PRF × frequency', 'PRF ÷ frequency'],
        answer: 1,
        explanation: 'The Nyquist limit equals PRF ÷ 2. Velocities exceeding this limit will alias and appear to flow in the wrong direction.'
      },
      600: {
        question: 'Aliasing in pulsed wave Doppler occurs when',
        options: ['The Doppler angle is 90 degrees', 'The PRF is too low for the velocity being measured', 'The sample volume is too large', 'The transmit frequency is too high'],
        answer: 1,
        explanation: 'Aliasing occurs when the Doppler shift frequency exceeds the Nyquist limit (PRF/2). Velocities above this limit appear to wrap around.'
      },
      700: {
        question: 'The main advantage of continuous wave Doppler over pulsed wave Doppler is',
        options: ['Better angle correction', 'No aliasing limitation for high velocities', 'Range resolution (depth specificity)', 'Better visualization of slow flow'],
        answer: 1,
        explanation: 'CW Doppler has no PRF limitation and thus no Nyquist limit, allowing measurement of very high velocities without aliasing.'
      },
      800: {
        question: 'Spectral broadening in Doppler waveforms indicates',
        options: ['Laminar flow', 'Turbulent flow or large sample volume', 'Slow flow', 'Perpendicular flow'],
        answer: 1,
        explanation: 'Spectral broadening (filling in of the spectral window) occurs with turbulent flow, large sample volumes, or vessel wall motion.'
      },
      900: {
        question: 'What parameter is NOT displayed in a typical spectral Doppler waveform?',
        options: ['Velocity', 'Time', 'Flow volume', 'Frequency shift'],
        answer: 2,
        explanation: 'Spectral Doppler displays velocity (or frequency shift) versus time. Flow volume requires additional information about vessel diameter.'
      },
      1000: {
        question: 'The autocorrelation technique is primarily used in',
        options: ['Spectral Doppler only', 'Color Doppler only', 'Both spectral and color Doppler', 'Power Doppler only'],
        answer: 1,
        explanation: 'Autocorrelation is the primary technique used in color Doppler to estimate mean frequency shift from multiple pulse-echo samples.'
      }
    },
    artifacts: {
      100: {
        question: 'This artifact appears as multiple equally spaced echoes',
        options: ['Enhancement', 'Shadowing', 'Reverberation', 'Mirror image'],
        answer: 2,
        explanation: 'Reverberations occur when sound bounces repeatedly between parallel reflectors, creating equally spaced echoes.'
      },
      200: {
        question: 'This artifact appears as a dark area behind a strongly reflecting or attenuating structure',
        options: ['Enhancement', 'Shadowing', 'Reverberation', 'Side lobe'],
        answer: 1,
        explanation: 'Strong attenuators (stones) or reflectors (gas) prevent sound transmission, creating shadows.'
      },
      300: {
        question: 'This artifact appears as increased echogenicity deep to a weakly attenuating structure',
        options: ['Enhancement', 'Shadowing', 'Reverberation', 'Mirror image'],
        answer: 0,
        explanation: 'Enhancement (or posterior acoustic enhancement) occurs when sound travels through a fluid-filled structure with less attenuation.'
      },
      400: {
        question: 'This artifact creates a duplicate image of a structure in an incorrect location',
        options: ['Reverberation', 'Mirror image', 'Refraction', 'Side lobe'],
        answer: 1,
        explanation: 'Mirror image artifacts occur when sound reflects off a strong reflector and creates a virtual image on the opposite side.'
      },
      500: {
        question: 'This artifact occurs due to improper velocity calibration in the ultrasound machine',
        options: ['Aliasing', 'Speed displacement', 'Refraction', 'Range ambiguity'],
        answer: 1,
        explanation: 'Speed displacement artifacts occur when the assumed speed of sound (1540 m/s) differs from the actual speed in the tissue being imaged.'
      },
      600: {
        question: 'Side lobe artifacts are caused by',
        options: ['Main beam echoes', 'Unwanted energy in side lobes detecting off-axis reflectors', 'Multiple reflections', 'Speed errors'],
        answer: 1,
        explanation: 'Side lobe artifacts occur when side lobe energy detects strong reflectors outside the main beam path.'
      },
      700: {
        question: 'Range ambiguity artifacts appear as',
        options: ['Structures at incorrect shallow depths', 'Multiple reflections', 'Curved structures', 'Missing structures'],
        answer: 0,
        explanation: 'Range ambiguity occurs when echoes from deep structures arrive after the next pulse is sent, causing them to be displayed at incorrect shallow depths.'
      },
      800: {
        question: 'Multipath artifacts result from',
        options: ['Direct path echoes only', 'Sound taking longer indirect paths to reflectors', 'Electronic interference', 'Gain settings'],
        answer: 1,
        explanation: 'Multipath artifacts occur when sound reaches a reflector via an indirect path, causing the reflector to appear deeper than its true location.'
      },
      900: {
        question: 'Beam width artifacts affect',
        options: ['Axial resolution only', 'Lateral resolution only', 'Both axial and lateral resolution', 'Temporal resolution only'],
        answer: 1,
        explanation: 'Beam width artifacts affect lateral resolution by causing structures outside the main beam axis to be displayed as if they were within the beam.'
      },
      1000: {
        question: 'What artifact is most likely to be confused with pathology?',
        options: ['Reverberation', 'Side lobe', 'Mirror image', 'All of the above'],
        answer: 3,
        explanation: 'All these artifacts can mimic pathology: reverberations can look like septations, side lobes can create false masses, and mirror images can show non-existent structures.'
      }
    },
    safety: {
      100: {
        question: 'This safety principle means using the lowest possible ultrasound output for the minimum time necessary',
        options: ['ALARP', 'ALARA', 'AIUM', 'BMUS'],
        answer: 1,
        explanation: 'ALARA stands for "As Low As Reasonably Achievable" and guides safe use of ultrasound energy.'
      },
      200: {
        question: 'This bioeffect of ultrasound results from gas bubble oscillation and collapse in the sound field',
        options: ['Thermal effect', 'Cavitation', 'Streaming', 'Radiation force'],
        answer: 1,
        explanation: 'Cavitation occurs when ultrasound causes gas bubbles to oscillate and potentially collapse, which can damage tissues.'
      },
      300: {
        question: 'This on-screen display shows the relative risk of bioeffects during an ultrasound examination',
        options: ['MI and TI values', 'dB values', 'PRF values', 'Gain values'],
        answer: 0,
        explanation: 'Mechanical Index (MI) and Thermal Index (TI) values display the relative risks of mechanical and thermal bioeffects.'
      },
      400: {
        question: 'The quality assurance test that measures the minimum detectable signal level is called',
        options: ['Spatial resolution', 'Contrast resolution', 'Temporal resolution', 'Sensitivity'],
        answer: 3,
        explanation: 'Sensitivity testing determines the minimum detectable signal level or the system ability to detect weak echoes.'
      },
      500: {
        question: 'The maximum recommended exposure time for an obstetric examination according to AIUM guidelines is',
        options: ['There is no limit', '30 minutes', 'As short as possible while obtaining necessary diagnostic information', '60 minutes'],
        answer: 2,
        explanation: 'AIUM recommends keeping exposure "as short as possible while obtaining the needed diagnostic information" with no specific time limit.'
      },
      600: {
        question: 'The mechanical index (MI) is primarily associated with',
        options: ['Thermal bioeffects', 'Cavitation bioeffects', 'Electrical safety', 'Image quality'],
        answer: 1,
        explanation: 'The mechanical index (MI) indicates the potential for cavitation bioeffects. It is calculated from peak rarefactional pressure and frequency.'
      },
      700: {
        question: 'The thermal index (TI) represents',
        options: ['Actual temperature rise', 'Potential for temperature rise', 'Acoustic power only', 'Frequency content'],
        answer: 1,
        explanation: 'The thermal index represents the potential for tissue heating under worst-case conditions. TIS, TIB, and TIC are specific thermal indices.'
      },
      800: {
        question: 'Cavitation is more likely to occur at',
        options: ['Higher frequencies', 'Lower frequencies', 'In gas-free tissues only', 'Only with contrast agents'],
        answer: 1,
        explanation: 'Cavitation is more likely at lower frequencies because the rarefactional phase lasts longer, giving gas bubbles more time to grow.'
      },
      900: {
        question: 'Which imaging mode typically has the highest acoustic output?',
        options: ['B-mode', 'Color Doppler', 'Spectral Doppler', 'M-mode'],
        answer: 2,
        explanation: 'Spectral Doppler typically has the highest acoustic output because it uses focused, high-intensity pulses at a fixed location for extended periods.'
      },
      1000: {
        question: 'The FDA limit for MI in diagnostic ultrasound is',
        options: ['0.5', '1.0', '1.9', '3.0'],
        answer: 2,
        explanation: 'The FDA limit for mechanical index is 1.9 for diagnostic ultrasound applications. This limit is based on the threshold for potential cavitation bioeffects.'
      }
    }
  };

  // Timer effect
  useEffect(() => {
    let timer;
    if (gameState === 'question' && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'question') {
      handleTimeout();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameState]);

  // Start a new game
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setAnsweredQuestions([]);
    setGameStats({
      correct: 0,
      incorrect: 0,
      total: 0,
    });
  };

  // Select a question
  const selectQuestion = (category, value) => {
    const questionId = `${category}-${value}`;
    if (answeredQuestions.includes(questionId)) return;

    setSelectedCategory(category);
    setSelectedValue(value);
    setCurrentQuestion(questions[category][value]);
    setTimeLeft(30); // 30 seconds to answer
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowAnswer(false);
    setGameState('question');
  };

  // Handle answer selection
  const handleAnswerSelect = (index) => {
    if (selectedAnswer !== null) return; // Already answered

    setSelectedAnswer(index);
    const correct = index === currentQuestion.answer;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + selectedValue);
      setGameStats(prev => ({
        ...prev,
        correct: prev.correct + 1,
        total: prev.total + 1
      }));
      
      // Celebration effect - using native confetti if available
      if (typeof window !== 'undefined' && window.confetti) {
        window.confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } else {
      setGameStats(prev => ({
        ...prev,
        incorrect: prev.incorrect + 1,
        total: prev.total + 1
      }));
    }

    // Show correct answer
    setTimeout(() => {
      setShowAnswer(true);
    }, 1000);

    // Return to board after 3 seconds
    setTimeout(() => {
      const questionId = `${selectedCategory}-${selectedValue}`;
      setAnsweredQuestions([...answeredQuestions, questionId]);
      setGameState('playing');

      // Check if all questions are answered
      const newAnsweredCount = answeredQuestions.length + 1;
      if (newAnsweredCount >= categories.length * values.length) {
        endGame();
      }
    }, 4000);
  };

  // Handle timeout
  const handleTimeout = () => {
    setSelectedAnswer(null);
    setIsCorrect(false);
    setShowAnswer(true);
    setGameStats(prev => ({
      ...prev,
      incorrect: prev.incorrect + 1,
      total: prev.total + 1
    }));

    // Return to board after 3 seconds
    setTimeout(() => {
      const questionId = `${selectedCategory}-${selectedValue}`;
      setAnsweredQuestions([...answeredQuestions, questionId]);
      setGameState('playing');

      // Check if all questions are answered
      const newAnsweredCount = answeredQuestions.length + 1;
      if (newAnsweredCount >= categories.length * values.length) {
        endGame();
      }
    }, 3000);
  };

  // End the game
  const endGame = () => {
    setGameState('result');

    // Save results to study context
    dispatch({
      type: 'SAVE_QUIZ_RESULT',
      payload: {
        date: new Date().toISOString(),
        score,
        total: categories.length * values.length,
        percentage: Math.round((gameStats.correct / gameStats.total) * 100),
        timeElapsed: 0, // Not tracking total time
        results: []
      }
    });
  };

  // Format time
  const formatTime = (seconds) => {
    return `${seconds}s`;
  };

  // Start Screen
  if (gameState === 'start') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-4">
            <SafeIcon icon={FiArrowLeft} />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl font-bold text-medical-900 mb-2">Ultrasound Physics Jeopardy!</h1>
          <p className="text-medical-600">
            Test your knowledge with this Jeopardy!-style game of ultrasound physics
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-medical-200 text-center">
          <div className="mb-8">
            <div className="w-32 h-32 bg-primary-500 rounded-full mx-auto flex items-center justify-center mb-4">
              <SafeIcon icon={FiAward} className="text-5xl text-white" />
            </div>
            <h2 className="text-2xl font-bold text-medical-900 mb-2">Welcome to Ultrasound Physics Jeopardy!</h2>
            <p className="text-medical-600 max-w-lg mx-auto">
              Choose from 5 categories and 10 difficulty levels. Answer correctly to earn points! Can you master all 50 questions?
            </p>
          </div>

          <div className="bg-primary-50 rounded-xl p-6 border border-primary-200 mb-8 max-w-lg mx-auto">
            <h3 className="font-bold text-medical-900 mb-4">How to Play</h3>
            <ul className="text-left text-medical-700 space-y-2">
              <li>• Select a category and point value</li>
              <li>• Answer the question within 30 seconds</li>
              <li>• Earn points for correct answers</li>
              <li>• Complete all questions to finish the game</li>
            </ul>
          </div>

          <div className="grid grid-cols-5 gap-3 mb-8 max-w-4xl mx-auto">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`bg-gradient-to-r ${category.color} text-white p-2 rounded-lg text-center`}
              >
                <p className="font-medium text-sm">{category.name}</p>
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="px-8 py-4 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors shadow-lg"
          >
            Start Game
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // Result Screen
  if (gameState === 'result') {
    const accuracy = gameStats.total > 0 ? Math.round((gameStats.correct / gameStats.total) * 100) : 0;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-4">
            <SafeIcon icon={FiArrowLeft} />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl font-bold text-medical-900 mb-2">Game Results</h1>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-medical-200 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
              accuracy >= 80 ? 'bg-green-100' : accuracy >= 60 ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              <SafeIcon icon={accuracy >= 60 ? FiCheckCircle : FiXCircle} className={`text-3xl ${
                accuracy >= 80 ? 'text-green-600' : accuracy >= 60 ? 'text-yellow-600' : 'text-red-600'
              }`} />
            </div>
          </motion.div>

          <h2 className="text-3xl font-bold text-medical-900 mb-2">Game Complete!</h2>
          <p className="text-medical-600 mb-8">
            Here's how you performed
          </p>

          <div className="grid grid-cols-3 gap-6 mb-8 max-w-xl mx-auto">
            <div>
              <div className="text-2xl font-bold text-primary-600">${score}</div>
              <div className="text-sm text-medical-600">Final Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-600">{accuracy}%</div>
              <div className="text-sm text-medical-600">Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-600">{gameStats.correct}/{gameStats.total}</div>
              <div className="text-sm text-medical-600">Correct Answers</div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="flex items-center space-x-2 bg-primary-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-600 transition-colors"
            >
              <span>Play Again</span>
            </motion.button>
            <Link
              to="/"
              className="flex items-center space-x-2 bg-white text-medical-700 px-6 py-3 rounded-xl font-medium hover:bg-medical-50 border border-medical-200 transition-colors"
            >
              <span>Dashboard</span>
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  // Question Screen
  if (gameState === 'question' && currentQuestion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 bg-gradient-to-r ${categories.find(c => c.id === selectedCategory)?.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                ${selectedValue}
              </div>
              <h2 className="text-xl font-bold text-medical-900">
                {categories.find(c => c.id === selectedCategory)?.name}
              </h2>
            </div>
            <div className="flex items-center space-x-2 bg-medical-100 px-3 py-1 rounded-lg">
              <SafeIcon icon={FiClock} className="text-medical-600" />
              <span className="font-medium text-medical-900">{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-lg text-medical-900 font-medium mb-6">
              {currentQuestion.question}
            </p>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isAnswer = currentQuestion.answer === index;

                let buttonClasses = "w-full p-4 rounded-xl border-2 text-left transition-all";

                if (showAnswer) {
                  if (isAnswer) {
                    buttonClasses += " bg-green-50 border-green-500 text-green-800";
                  } else if (isSelected) {
                    buttonClasses += " bg-red-50 border-red-500 text-red-800";
                  } else {
                    buttonClasses += " bg-white border-medical-200 text-medical-700";
                  }
                } else {
                  if (isSelected) {
                    buttonClasses += " bg-primary-50 border-primary-500 text-primary-800";
                  } else {
                    buttonClasses += " bg-white border-medical-200 hover:border-primary-300 text-medical-700";
                  }
                }

                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                    whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
                    onClick={() => selectedAnswer === null && handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                    className={buttonClasses}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      {showAnswer && isAnswer && (
                        <SafeIcon icon={FiCheckCircle} className="text-green-600 text-xl" />
                      )}
                      {showAnswer && isSelected && !isAnswer && (
                        <SafeIcon icon={FiXCircle} className="text-red-600 text-xl" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {showAnswer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-blue-50 p-4 rounded-xl border border-blue-200"
            >
              <h3 className="font-semibold text-medical-900 mb-2">Explanation</h3>
              <p className="text-medical-700">{currentQuestion.explanation}</p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    );
  }

  // Game Board
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-4">
          <SafeIcon icon={FiArrowLeft} />
          <span>Back to Dashboard</span>
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-medical-900">Ultrasound Physics Jeopardy!</h1>
          <div className="flex items-center space-x-2 bg-primary-100 px-4 py-2 rounded-lg">
            <SafeIcon icon={FiDollarSign} className="text-primary-600" />
            <span className="text-xl font-bold text-primary-700">{score}</span>
          </div>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
        {/* Category Headers */}
        <div className="grid grid-cols-5 gap-3 mb-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`bg-gradient-to-r ${category.color} text-white p-3 rounded-lg text-center h-24 flex items-center justify-center`}
            >
              <p className="font-bold">{category.name}</p>
            </div>
          ))}
        </div>

        {/* Value Grid */}
        {values.map((value) => (
          <div key={value} className="grid grid-cols-5 gap-3 mb-3">
            {categories.map((category) => {
              const questionId = `${category.id}-${value}`;
              const isAnswered = answeredQuestions.includes(questionId);

              return (
                <motion.button
                  key={`${category.id}-${value}`}
                  whileHover={{ scale: isAnswered ? 1 : 1.02 }}
                  whileTap={{ scale: isAnswered ? 1 : 0.98 }}
                  onClick={() => !isAnswered && selectQuestion(category.id, value)}
                  disabled={isAnswered}
                  className={`p-6 rounded-lg flex items-center justify-center ${
                    isAnswered
                      ? 'bg-medical-200 text-medical-400 cursor-not-allowed opacity-60'
                      : 'bg-primary-100 text-primary-700 hover:bg-primary-200 cursor-pointer shadow-md'
                  } transition-all`}
                >
                  <span className="text-2xl font-bold">${value}</span>
                </motion.button>
              );
            })}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default JeopardyGame;