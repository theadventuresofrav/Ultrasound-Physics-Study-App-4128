/**
 * SPI Mock Exam Questions 2025-2026
 * 110 questions covering all major SPI exam topics
 * 2.5 hours (150 minutes) time limit
 */

export const mockExamQuestions = [
  // Section 1: Basic Ultrasound Physics (Questions 1-25)
  {
    id: 'spi-001',
    question: 'What is the typical frequency range for diagnostic ultrasound?',
    options: [
      '1-20 kHz',
      '2-20 MHz',
      '20-200 MHz',
      '200-2000 MHz'
    ],
    correctAnswer: 1,
    explanation: 'Diagnostic ultrasound typically uses frequencies between 2-20 MHz. Lower frequencies (2-5 MHz) are used for deeper penetration in abdominal imaging, while higher frequencies (5-20 MHz) are used for superficial structures with better resolution.',
    category: 'Basic Physics',
    difficulty: 'Easy'
  },
  {
    id: 'spi-002',
    question: 'Sound propagation speed is fastest in which medium?',
    options: [
      'Air',
      'Fat',
      'Soft tissue',
      'Bone'
    ],
    correctAnswer: 3,
    explanation: 'Sound travels fastest in bone (~4080 m/s), followed by soft tissue (~1540 m/s), fat (~1450 m/s), and slowest in air (~330 m/s). The speed increases with material stiffness.',
    category: 'Basic Physics',
    difficulty: 'Easy'
  },
  {
    id: 'spi-003',
    question: 'What is the wavelength of a 5 MHz ultrasound wave in soft tissue?',
    options: [
      '0.31 mm',
      '0.62 mm',
      '1.54 mm',
      '3.08 mm'
    ],
    correctAnswer: 0,
    explanation: 'Wavelength = Speed/Frequency = 1540 m/s ÷ 5,000,000 Hz = 0.000308 m = 0.31 mm',
    category: 'Basic Physics',
    difficulty: 'Medium'
  },
  {
    id: 'spi-004',
    question: 'Acoustic impedance is defined as:',
    options: [
      'Density × frequency',
      'Density × propagation speed',
      'Frequency × wavelength',
      'Power × area'
    ],
    correctAnswer: 1,
    explanation: 'Acoustic impedance (Z) = density (ρ) × propagation speed (c). It determines how much ultrasound is reflected at tissue interfaces.',
    category: 'Basic Physics',
    difficulty: 'Easy'
  },
  {
    id: 'spi-005',
    question: 'The percentage of ultrasound reflected at an interface depends on:',
    options: [
      'Frequency only',
      'Wavelength only',
      'Difference in acoustic impedances',
      'Transducer diameter'
    ],
    correctAnswer: 2,
    explanation: 'Reflection coefficient = [(Z2-Z1)/(Z2+Z1)]². The greater the impedance mismatch, the more reflection occurs.',
    category: 'Basic Physics',
    difficulty: 'Medium'
  },
  {
    id: 'spi-006',
    question: 'Attenuation in soft tissue is approximately:',
    options: [
      '0.5 dB/cm/MHz',
      '1.0 dB/cm/MHz',
      '2.0 dB/cm/MHz',
      '5.0 dB/cm/MHz'
    ],
    correctAnswer: 0,
    explanation: 'The average attenuation coefficient in soft tissue is 0.5 dB/cm/MHz. This means a 5 MHz beam loses 2.5 dB per cm of travel.',
    category: 'Basic Physics',
    difficulty: 'Medium'
  },
  {
    id: 'spi-007',
    question: 'Which phenomenon causes ultrasound beam divergence in the far field?',
    options: [
      'Refraction',
      'Diffraction',
      'Absorption',
      'Scattering'
    ],
    correctAnswer: 1,
    explanation: 'Diffraction causes the ultrasound beam to spread out in the far field. This divergence angle depends on the transducer diameter and frequency.',
    category: 'Basic Physics',
    difficulty: 'Medium'
  },
  {
    id: 'spi-008',
    question: 'The Doppler shift frequency is proportional to:',
    options: [
      'Transmitted frequency only',
      'Reflector velocity only',
      'Both transmitted frequency and reflector velocity',
      'Neither transmitted frequency nor reflector velocity'
    ],
    correctAnswer: 2,
    explanation: 'Doppler shift = 2 × f₀ × v × cos(θ) / c, where f₀ is transmitted frequency and v is reflector velocity.',
    category: 'Basic Physics',
    difficulty: 'Medium'
  },
  {
    id: 'spi-009',
    question: 'What is the purpose of acoustic coupling gel?',
    options: [
      'Cool the transducer',
      'Eliminate air between transducer and skin',
      'Increase ultrasound frequency',
      'Reduce patient discomfort'
    ],
    correctAnswer: 1,
    explanation: 'Gel eliminates air pockets that would cause nearly 100% reflection due to the large impedance mismatch between air and tissue.',
    category: 'Basic Physics',
    difficulty: 'Easy'
  },
  {
    id: 'spi-010',
    question: 'Snell\'s law describes:',
    options: [
      'Reflection angle',
      'Refraction angle',
      'Attenuation rate',
      'Doppler shift'
    ],
    correctAnswer: 1,
    explanation: 'Snell\'s law (sin θ₁/c₁ = sin θ₂/c₂) describes how ultrasound bends when passing between media with different propagation speeds.',
    category: 'Basic Physics',
    difficulty: 'Medium'
  },
  {
    id: 'spi-011',
    question: 'The intensity of an ultrasound beam is measured in:',
    options: [
      'Watts',
      'Watts/cm²',
      'Decibels',
      'Hertz'
    ],
    correctAnswer: 1,
    explanation: 'Intensity is power per unit area, measured in W/cm² or mW/cm². It\'s important for bioeffects considerations.',
    category: 'Basic Physics',
    difficulty: 'Easy'
  },
  {
    id: 'spi-012',
    question: 'Rayleigh scattering occurs when:',
    options: [
      'Reflector >> wavelength',
      'Reflector << wavelength',
      'Reflector = wavelength',
      'At all reflector sizes'
    ],
    correctAnswer: 1,
    explanation: 'Rayleigh scattering occurs with very small reflectors (like red blood cells). Scattered intensity is proportional to frequency⁴.',
    category: 'Basic Physics',
    difficulty: 'Hard'
  },
  {
    id: 'spi-013',
    question: 'The near field length (focal distance) of an unfocused transducer is:',
    options: [
      'D²/4λ',
      'D/2λ',
      'λ/D',
      '2λD'
    ],
    correctAnswer: 0,
    explanation: 'Near field length = D²/4λ, where D is transducer diameter and λ is wavelength. This is where natural focusing occurs.',
    category: 'Basic Physics',
    difficulty: 'Hard'
  },
  {
    id: 'spi-014',
    question: 'Constructive interference occurs when waves are:',
    options: [
      '90° out of phase',
      '180° out of phase',
      'In phase',
      'Random phase'
    ],
    correctAnswer: 2,
    explanation: 'Constructive interference happens when waves are in phase, resulting in increased amplitude. Destructive interference occurs at 180° phase difference.',
    category: 'Basic Physics',
    difficulty: 'Medium'
  },
  {
    id: 'spi-015',
    question: 'The Q-factor of a transducer indicates:',
    options: [
      'Sensitivity',
      'Bandwidth',
      'Power output',
      'Beam width'
    ],
    correctAnswer: 1,
    explanation: 'Q-factor = center frequency/bandwidth. Lower Q means broader bandwidth, better axial resolution, but lower sensitivity.',
    category: 'Basic Physics',
    difficulty: 'Hard'
  },
  {
    id: 'spi-016',
    question: 'Harmonic imaging uses:',
    options: [
      'Fundamental frequency',
      'Half the transmitted frequency',
      'Twice the transmitted frequency',
      'Random frequencies'
    ],
    correctAnswer: 2,
    explanation: 'Harmonic imaging receives at 2× the transmitted frequency, utilizing nonlinear propagation to improve image quality.',
    category: 'Basic Physics',
    difficulty: 'Hard'
  },
  {
    id: 'spi-017',
    question: 'The mechanical index (MI) is related to:',
    options: [
      'Thermal effects',
      'Cavitation potential',
      'Doppler sensitivity',
      'Frame rate'
    ],
    correctAnswer: 1,
    explanation: 'MI = peak negative pressure/√frequency. It indicates the potential for mechanical bioeffects like cavitation.',
    category: 'Basic Physics',
    difficulty: 'Medium'
  },
  {
    id: 'spi-018',
    question: 'Absorption of ultrasound energy causes:',
    options: [
      'Reflection',
      'Refraction',
      'Heat',
      'Ionization'
    ],
    correctAnswer: 2,
    explanation: 'Absorbed ultrasound energy is converted to heat. This is the primary mechanism for thermal bioeffects.',
    category: 'Basic Physics',
    difficulty: 'Easy'
  },
  {
    id: 'spi-019',
    question: 'The piezoelectric effect converts:',
    options: [
      'Heat to electricity',
      'Mechanical to electrical energy',
      'Light to sound',
      'Chemical to electrical energy'
    ],
    correctAnswer: 1,
    explanation: 'Piezoelectric materials convert mechanical pressure to electrical voltage (receive) and electrical voltage to mechanical vibration (transmit).',
    category: 'Basic Physics',
    difficulty: 'Easy'
  },
  {
    id: 'spi-020',
    question: 'Lateral resolution is determined by:',
    options: [
      'Pulse length',
      'Beam width',
      'Frequency only',
      'PRF'
    ],
    correctAnswer: 1,
    explanation: 'Lateral resolution equals beam width. It\'s best at the focal zone where the beam is narrowest.',
    category: 'Basic Physics',
    difficulty: 'Medium'
  },
  {
    id: 'spi-021',
    question: 'Axial resolution equals:',
    options: [
      'Wavelength',
      'Half the spatial pulse length',
      'Beam width',
      'PRF'
    ],
    correctAnswer: 1,
    explanation: 'Axial resolution = ½ × spatial pulse length = ½ × (# cycles × wavelength). Shorter pulses give better resolution.',
    category: 'Basic Physics',
    difficulty: 'Medium'
  },
  {
    id: 'spi-022',
    question: 'The thermal index (TI) indicates:',
    options: [
      'Transducer temperature',
      'Tissue heating potential',
      'Room temperature',
      'Gel temperature'
    ],
    correctAnswer: 1,
    explanation: 'TI estimates temperature rise potential. TI = 1 suggests possible 1°C rise under worst-case conditions.',
    category: 'Basic Physics',
    difficulty: 'Medium'
  },
  {
    id: 'spi-023',
    question: 'Specular reflection occurs when:',
    options: [
      'Surface roughness >> wavelength',
      'Surface smooth and >> wavelength',
      'Surface << wavelength',
      'Never in tissue'
    ],
    correctAnswer: 1,
    explanation: 'Specular (mirror-like) reflection occurs from smooth surfaces much larger than the wavelength, following angle of incidence = angle of reflection.',
    category: 'Basic Physics',
    difficulty: 'Medium'
  },
  {
    id: 'spi-024',
    question: 'The decibel is a unit of:',
    options: [
      'Frequency',
      'Intensity ratio',
      'Absolute power',
      'Impedance'
    ],
    correctAnswer: 1,
    explanation: 'Decibels express ratios: dB = 10 log(I₂/I₁). A 3 dB change represents doubling/halving of intensity.',
    category: 'Basic Physics',
    difficulty: 'Medium'
  },
  {
    id: 'spi-025',
    question: 'Focusing can be achieved by:',
    options: [
      'Curved elements',
      'Electronic delays',
      'Acoustic lenses',
      'All of the above'
    ],
    correctAnswer: 3,
    explanation: 'Focusing improves lateral resolution and can be achieved mechanically (curved elements/lenses) or electronically (phased delays).',
    category: 'Basic Physics',
    difficulty: 'Easy'
  },

  // Section 2: Transducers and Sound Beams (Questions 26-45)
  {
    id: 'spi-026',
    question: 'Linear array transducers produce what type of image format?',
    options: [
      'Sector',
      'Rectangular',
      'Trapezoidal',
      'Circular'
    ],
    correctAnswer: 1,
    explanation: 'Linear arrays fire groups of elements sequentially, creating parallel scan lines and a rectangular image format.',
    category: 'Transducers',
    difficulty: 'Easy'
  },
  {
    id: 'spi-027',
    question: 'Phased array transducers are primarily used for:',
    options: [
      'Superficial imaging',
      'Cardiac imaging',
      'Vascular only',
      '3D only'
    ],
    correctAnswer: 1,
    explanation: 'Phased arrays create sector images from a small footprint, ideal for imaging through intercostal spaces in cardiac applications.',
    category: 'Transducers',
    difficulty: 'Easy'
  },
  {
    id: 'spi-028',
    question: 'Grating lobes are caused by:',
    options: [
      'Element spacing > λ/2',
      'Too much power',
      'Damaged elements',
      'Patient motion'
    ],
    correctAnswer: 0,
    explanation: 'When array elements are spaced more than λ/2 apart, grating lobes create artifacts by sending energy in unintended directions.',
    category: 'Transducers',
    difficulty: 'Medium'
  },
  {
    id: 'spi-029',
    question: 'Electronic focusing in arrays uses:',
    options: [
      'Curved elements',
      'Time delays',
      'Mechanical movement',
      'Higher voltage'
    ],
    correctAnswer: 1,
    explanation: 'Electronic focusing applies different time delays to array elements so waves arrive at the focal point simultaneously.',
    category: 'Transducers',
    difficulty: 'Medium'
  },
  {
    id: 'spi-030',
    question: 'Apodization refers to:',
    options: [
      'Focusing technique',
      'Varying element sensitivity',
      'Beam steering',
      'Frequency selection'
    ],
    correctAnswer: 1,
    explanation: 'Apodization reduces side lobes by varying the amplitude across array elements, typically lower at edges.',
    category: 'Transducers',
    difficulty: 'Hard'
  },
  {
    id: 'spi-031',
    question: 'The matching layer in a transducer:',
    options: [
      'Protects the element',
      'Improves impedance matching',
      'Provides focusing',
      'Generates harmonics'
    ],
    correctAnswer: 1,
    explanation: 'The λ/4 matching layer has intermediate impedance between the element and tissue, improving energy transfer.',
    category: 'Transducers',
    difficulty: 'Medium'
  },
  {
    id: 'spi-032',
    question: 'Backing material in a transducer:',
    options: [
      'Increases sensitivity',
      'Narrows bandwidth',
      'Dampens vibration',
      'Focuses the beam'
    ],
    correctAnswer: 2,
    explanation: 'Backing material (high attenuation) dampens element vibration, creating shorter pulses for better axial resolution.',
    category: 'Transducers',
    difficulty: 'Medium'
  },
  {
    id: 'spi-033',
    question: 'Convex (curved) arrays are used to:',
    options: [
      'Improve penetration',
      'Create wider field of view',
      'Increase frequency',
      'Reduce artifacts'
    ],
    correctAnswer: 1,
    explanation: 'Convex arrays create a diverging scan format, providing a wider field of view at depth than linear arrays.',
    category: 'Transducers',
    difficulty: 'Easy'
  },
  {
    id: 'spi-034',
    question: 'Side lobes can cause:',
    options: [
      'Improved resolution',
      'False echoes',
      'Better penetration',
      'Increased frame rate'
    ],
    correctAnswer: 1,
    explanation: 'Side lobes send/receive energy off-axis, potentially creating artifacts by detecting echoes from incorrect locations.',
    category: 'Transducers',
    difficulty: 'Medium'
  },
  {
    id: 'spi-035',
    question: 'Beam steering in phased arrays is achieved by:',
    options: [
      'Mechanical rotation',
      'Sequential delays',
      'Frequency changes',
      'Power variation'
    ],
    correctAnswer: 1,
    explanation: 'Progressive time delays across elements steer the beam. The delay pattern determines beam direction.',
    category: 'Transducers',
    difficulty: 'Medium'
  },
  {
    id: 'spi-036',
    question: 'The focal zone is where:',
    options: [
      'Beam is widest',
      'Beam is narrowest',
      'Frequency is highest',
      'Attenuation is maximum'
    ],
    correctAnswer: 1,
    explanation: 'The focal zone has the narrowest beam width, providing the best lateral resolution at that depth.',
    category: 'Transducers',
    difficulty: 'Easy'
  },
  {
    id: 'spi-037',
    question: 'Multiple transmit focal zones:',
    options: [
      'Increase frame rate',
      'Decrease frame rate',
      'Don\'t affect frame rate',
      'Improve axial resolution'
    ],
    correctAnswer: 1,
    explanation: 'Each transmit focal zone requires a separate pulse, multiplying the time needed per image and reducing frame rate.',
    category: 'Transducers',
    difficulty: 'Medium'
  },
  {
    id: 'spi-038',
    question: 'Dynamic receive focusing:',
    options: [
      'Requires multiple pulses',
      'Continuously adjusts delays during reception',
      'Only works in color Doppler',
      'Reduces penetration'
    ],
    correctAnswer: 1,
    explanation: 'Dynamic receive focusing continuously changes delays as echoes arrive from different depths, maintaining focus throughout.',
    category: 'Transducers',
    difficulty: 'Hard'
  },
  {
    id: 'spi-039',
    question: 'Elevational resolution is determined by:',
    options: [
      'Frequency',
      'Slice thickness',
      'PRF',
      'Power'
    ],
    correctAnswer: 1,
    explanation: 'Elevational resolution (perpendicular to scan plane) depends on beam thickness, often focused with an acoustic lens.',
    category: 'Transducers',
    difficulty: 'Medium'
  },
  {
    id: 'spi-040',
    question: 'Subdicing in array transducers:',
    options: [
      'Improves elevational resolution',
      'Increases frequency',
      'Reduces power',
      'Eliminates harmonics'
    ],
    correctAnswer: 0,
    explanation: 'Subdicing divides elements in the elevation direction, allowing electronic focusing to improve slice thickness.',
    category: 'Transducers',
    difficulty: 'Hard'
  },
  {
    id: 'spi-041',
    question: 'The bandwidth of a transducer affects:',
    options: [
      'Lateral resolution only',
      'Axial resolution',
      'Frame rate',
      'Doppler shift'
    ],
    correctAnswer: 1,
    explanation: 'Broader bandwidth allows shorter pulses, improving axial resolution. It also enables harmonic imaging.',
    category: 'Transducers',
    difficulty: 'Medium'
  },
  {
    id: 'spi-042',
    question: 'Matrix array transducers enable:',
    options: [
      'Higher frequency',
      '3D/4D imaging',
      'Better penetration',
      'Continuous wave only'
    ],
    correctAnswer: 1,
    explanation: 'Matrix arrays have elements in 2D grid pattern, allowing beam steering in both dimensions for volumetric imaging.',
    category: 'Transducers',
    difficulty: 'Hard'
  },
  {
    id: 'spi-043',
    question: 'Annular arrays provide:',
    options: [
      'Rectangular format',
      'Symmetric focusing',
      'Electronic steering',
      'Higher frequency'
    ],
    correctAnswer: 1,
    explanation: 'Annular (ring-shaped) arrays provide symmetric focusing in all directions but require mechanical scanning.',
    category: 'Transducers',
    difficulty: 'Hard'
  },
  {
    id: 'spi-044',
    question: 'The F-number of a focused transducer is:',
    options: [
      'Frequency/bandwidth',
      'Focal length/aperture',
      'Power/area',
      'Depth/time'
    ],
    correctAnswer: 1,
    explanation: 'F-number = focal length/aperture size. Lower F-numbers indicate tighter focusing but limited depth of field.',
    category: 'Transducers',
    difficulty: 'Hard'
  },
  {
    id: 'spi-045',
    question: 'Transducer sensitivity is measured in:',
    options: [
      'MHz',
      'Watts',
      'Volts/Pascal',
      'cm/s'
    ],
    correctAnswer: 2,
    explanation: 'Sensitivity indicates electrical output per unit pressure input, determining how well weak echoes are detected.',
    category: 'Transducers',
    difficulty: 'Hard'
  },

  // Section 3: Pulse-Echo Instrumentation (Questions 46-70)
  {
    id: 'spi-046',
    question: 'The pulse repetition frequency (PRF) determines:',
    options: [
      'Axial resolution',
      'Maximum imaging depth',
      'Lateral resolution',
      'Frequency'
    ],
    correctAnswer: 1,
    explanation: 'PRF = c/(2 × depth). Higher PRF allows faster imaging but limits maximum depth to avoid range ambiguity.',
    category: 'Pulse-Echo',
    difficulty: 'Medium'
  },
  {
    id: 'spi-047',
    question: 'Time gain compensation (TGC) corrects for:',
    options: [
      'Refraction',
      'Attenuation',
      'Patient motion',
      'Electronic noise'
    ],
    correctAnswer: 1,
    explanation: 'TGC amplifies deeper echoes more to compensate for attenuation, creating uniform brightness throughout the image.',
    category: 'Pulse-Echo',
    difficulty: 'Easy'
  },
  {
    id: 'spi-048',
    question: 'Dynamic range in ultrasound refers to:',
    options: [
      'Frequency bandwidth',
      'Range of intensities displayed',
      'Scanning speed',
      'Penetration depth'
    ],
    correctAnswer: 1,
    explanation: 'Dynamic range (in dB) is the ratio between the largest and smallest signals that can be processed/displayed.',
    category: 'Pulse-Echo',
    difficulty: 'Medium'
  },
  {
    id: 'spi-049',
    question: 'Compression reduces:',
    options: [
      'Frame rate',
      'Dynamic range',
      'Frequency',
      'Penetration'
    ],
    correctAnswer: 1,
    explanation: 'Compression maps a wide range of echo amplitudes into the limited grayscale range of the display.',
    category: 'Pulse-Echo',
    difficulty: 'Medium'
  },
  {
    id: 'spi-050',
    question: 'The analog-to-digital converter (ADC):',
    options: [
      'Amplifies signals',
      'Digitizes echo signals',
      'Transmits pulses',
      'Focuses the beam'
    ],
    correctAnswer: 1,
    explanation: 'The ADC converts continuous analog echo signals into discrete digital values for computer processing.',
    category: 'Pulse-Echo',
    difficulty: 'Medium'
  },
  {
    id: 'spi-051',
    question: 'Demodulation extracts:',
    options: [
      'Frequency information',
      'Amplitude information',
      'Phase information',
      'Doppler shift'
    ],
    correctAnswer: 1,
    explanation: 'Demodulation removes the carrier frequency, extracting the amplitude envelope for B-mode imaging.',
    category: 'Pulse-Echo',
    difficulty: 'Hard'
  },
  {
    id: 'spi-052',
    question: 'Rejection (threshold) eliminates:',
    options: [
      'Strong echoes',
      'Weak noise',
      'All echoes',
      'Doppler signals'
    ],
    correctAnswer: 1,
    explanation: 'Rejection suppresses low-level signals below a threshold, reducing noise but potentially losing weak echoes.',
    category: 'Pulse-Echo',
    difficulty: 'Medium'
  },
  {
    id: 'spi-053',
    question: 'Frame rate equals:',
    options: [
      'PRF × lines per frame',
      'PRF ÷ lines per frame',
      'PRF × depth',
      'Frequency × PRF'
    ],
    correctAnswer: 1,
    explanation: 'Frame rate = PRF ÷ (lines per frame × focal zones). More lines or focal zones reduce frame rate.',
    category: 'Pulse-Echo',
    difficulty: 'Hard'
  },
  {
    id: 'spi-054',
    question: 'Preprocessing includes:',
    options: [
      'TGC only',
      'Operations before scan conversion',
      'Display adjustments',
      'Annotation'
    ],
    correctAnswer: 1,
    explanation: 'Preprocessing (TGC, compression, edge enhancement) occurs before scan conversion and cannot be changed on stored images.',
    category: 'Pulse-Echo',
    difficulty: 'Hard'
  },
  {
    id: 'spi-055',
    question: 'Scan conversion:',
    options: [
      'Converts to digital',
      'Converts to image format',
      'Converts frequency',
      'Converts to color'
    ],
    correctAnswer: 1,
    explanation: 'Scan conversion transforms echo data from acquisition format (polar/vector) to rectangular display format.',
    category: 'Pulse-Echo',
    difficulty: 'Hard'
  },
  {
    id: 'spi-056',
    question: 'Postprocessing affects:',
    options: [
      'Raw data',
      'Display only',
      'Frequency',
      'PRF'
    ],
    correctAnswer: 1,
    explanation: 'Postprocessing (contrast, brightness) only changes display appearance without altering the underlying data.',
    category: 'Pulse-Echo',
    difficulty: 'Medium'
  },
  {
    id: 'spi-057',
    question: 'Write zoom provides:',
    options: [
      'Better resolution',
      'Magnification only',
      'Higher frame rate',
      'More penetration'
    ],
    correctAnswer: 0,
    explanation: 'Write zoom concentrates scan lines in a smaller area, improving line density and resolution.',
    category: 'Pulse-Echo',
    difficulty: 'Medium'
  },
  {
    id: 'spi-058',
    question: 'Read zoom provides:',
    options: [
      'Better resolution',
      'Magnification only',
      'Higher frame rate',
      'More focal zones'
    ],
    correctAnswer: 1,
    explanation: 'Read zoom simply enlarges pixels without adding information, providing magnification but not improved resolution.',
    category: 'Pulse-Echo',
    difficulty: 'Medium'
  },
  {
    id: 'spi-059',
    question: 'Persistence (frame averaging):',
    options: [
      'Increases frame rate',
      'Reduces noise',
      'Improves resolution',
      'Increases penetration'
    ],
    correctAnswer: 1,
    explanation: 'Persistence averages multiple frames, reducing random noise but potentially causing motion blur.',
    category: 'Pulse-Echo',
    difficulty: 'Medium'
  },
  {
    id: 'spi-060',
    question: 'The transmitter determines:',
    options: [
      'Echo amplitude',
      'Pulse characteristics',
      'Display brightness',
      'Demodulation'
    ],
    correctAnswer: 1,
    explanation: 'The transmitter controls pulse amplitude, frequency, duration, and timing - fundamental imaging parameters.',
    category: 'Pulse-Echo',
    difficulty: 'Medium'
  },
  {
    id: 'spi-061',
    question: 'Coded excitation improves:',
    options: [
      'Lateral resolution',
      'Penetration',
      'Frame rate',
      'Elevational resolution'
    ],
    correctAnswer: 1,
    explanation: 'Coded excitation uses long coded pulses for better penetration, then compresses them for maintained resolution.',
    category: 'Pulse-Echo',
    difficulty: 'Hard'
  },
  {
    id: 'spi-062',
    question: 'Spatial compounding:',
    options: [
      'Increases frame rate',
      'Reduces speckle',
      'Improves color flow',
      'Increases frequency'
    ],
    correctAnswer: 1,
    explanation: 'Spatial compounding averages images from different angles, reducing speckle and improving border definition.',
    category: 'Pulse-Echo',
    difficulty: 'Hard'
  },
  {
    id: 'spi-063',
    question: 'The beamformer:',
    options: [
      'Amplifies signals',
      'Controls delays for focusing',
      'Digitizes signals',
      'Displays images'
    ],
    correctAnswer: 1,
    explanation: 'The beamformer applies precise delays to array elements for transmit/receive focusing and steering.',
    category: 'Pulse-Echo',
    difficulty: 'Hard'
  },
  {
    id: 'spi-064',
    question: 'Quadrature detection provides:',
    options: [
      'Amplitude only',
      'Phase and amplitude',
      'Frequency only',
      'Power only'
    ],
    correctAnswer: 1,
    explanation: 'Quadrature detection preserves both amplitude and phase information, essential for Doppler processing.',
    category: 'Pulse-Echo',
    difficulty: 'Hard'
  },
  {
    id: 'spi-065',
    question: 'The Nyquist limit in sampling is:',
    options: [
      'Half the sampling frequency',
      'Twice the signal frequency',
      'Equal to PRF',
      'Maximum velocity'
    ],
    correctAnswer: 0,
    explanation: 'The Nyquist limit is half the sampling frequency - the maximum frequency that can be accurately sampled.',
    category: 'Pulse-Echo',
    difficulty: 'Hard'
  },
  {
    id: 'spi-066',
    question: 'Edge enhancement:',
    options: [
      'Reduces noise',
      'Sharpens boundaries',
      'Improves penetration',
      'Increases frame rate'
    ],
    correctAnswer: 1,
    explanation: 'Edge enhancement amplifies rapid changes in echo amplitude, making tissue boundaries appear sharper.',
    category: 'Pulse-Echo',
    difficulty: 'Medium'
  },
  {
    id: 'spi-067',
    question: 'The cine loop stores:',
    options: [
      'Single images',
      'Multiple frames',
      'Patient data',
      'Measurements only'
    ],
    correctAnswer: 1,
    explanation: 'Cine loop memory stores recent frames for review of dynamic events like cardiac motion.',
    category: 'Pulse-Echo',
    difficulty: 'Easy'
  },
  {
    id: 'spi-068',
    question: 'PACS stands for:',
    options: [
      'Power and Control System',
      'Picture Archiving and Communication System',
      'Pulse Amplitude Coding System',
      'Patient Access Control System'
    ],
    correctAnswer: 1,
    explanation: 'PACS enables digital storage, retrieval, and distribution of medical images across networks.',
    category: 'Pulse-Echo',
    difficulty: 'Easy'
  },
  {
    id: 'spi-069',
    question: 'DICOM ensures:',
    options: [
      'Image quality',
      'Standardized image format',
      'Patient safety',
      'Faster scanning'
    ],
    correctAnswer: 1,
    explanation: 'DICOM (Digital Imaging and Communications in Medicine) standardizes medical image format and communication.',
    category: 'Pulse-Echo',
    difficulty: 'Easy'
  },
  {
    id: 'spi-070',
    question: 'Harmonic imaging requires:',
    options: [
      'Linear processing',
      'Nonlinear propagation',
      'Higher PRF',
      'Special gel'
    ],
    correctAnswer: 1,
    explanation: 'Harmonic frequencies are generated by nonlinear propagation in tissue, not present in the transmitted pulse.',
    category: 'Pulse-Echo',
    difficulty: 'Hard'
  },

  // Section 4: Doppler Instrumentation and Hemodynamics (Questions 71-95)
  {
    id: 'spi-071',
    question: 'The Doppler equation includes all except:',
    options: [
      'Transmit frequency',
      'Velocity',
      'Angle',
      'Amplitude'
    ],
    correctAnswer: 3,
    explanation: 'Doppler shift = 2f₀v cos θ/c depends on frequency, velocity, and angle, but not echo amplitude.',
    category: 'Doppler',
    difficulty: 'Easy'
  },
  {
    id: 'spi-072',
    question: 'Maximum Doppler shift occurs at:',
    options: [
      '0 degrees',
      '45 degrees',
      '60 degrees',
      '90 degrees'
    ],
    correctAnswer: 0,
    explanation: 'Cos(0°) = 1, giving maximum Doppler shift when flow is directly toward/away from the transducer.',
    category: 'Doppler',
    difficulty: 'Easy'
  },
  {
    id: 'spi-073',
    question: 'No Doppler shift occurs at:',
    options: [
      '0 degrees',
      '45 degrees',
      '60 degrees',
      '90 degrees'
    ],
    correctAnswer: 3,
    explanation: 'Cos(90°) = 0, so perpendicular flow produces no Doppler shift regardless of velocity.',
    category: 'Doppler',
    difficulty: 'Easy'
  },
  {
    id: 'spi-074',
    question: 'Color Doppler displays:',
    options: [
      'Velocity magnitude only',
      'Mean frequency shift',
      'Power only',
      'Maximum velocity'
    ],
    correctAnswer: 1,
    explanation: 'Color Doppler calculates and displays the mean frequency shift at each pixel location.',
    category: 'Doppler',
    difficulty: 'Medium'
  },
  {
    id: 'spi-075',
    question: 'Power Doppler displays:',
    options: [
      'Velocity information',
      'Signal strength',
      'Direction',
      'Acceleration'
    ],
    correctAnswer: 1,
    explanation: 'Power Doppler displays the strength (power) of Doppler signals without directional information.',
    category: 'Doppler',
    difficulty: 'Medium'
  },
  {
    id: 'spi-076',
    question: 'Aliasing in pulsed Doppler occurs when:',
    options: [
      'Doppler shift > PRF/2',
      'Angle > 60°',
      'Power too high',
      'Gain too low'
    ],
    correctAnswer: 0,
    explanation: 'When Doppler shift exceeds the Nyquist limit (PRF/2), aliasing wraps high velocities to appear reversed.',
    category: 'Doppler',
    difficulty: 'Medium'
  },
  {
    id: 'spi-077',
    question: 'Continuous wave Doppler can measure:',
    options: [
      'Depth information',
      'Very high velocities',
      'Specific locations',
      'Tissue motion only'
    ],
    correctAnswer: 1,
    explanation: 'CW Doppler has no velocity limit but cannot determine depth, detecting all flow along the beam.',
    category: 'Doppler',
    difficulty: 'Medium'
  },
  {
    id: 'spi-078',
    question: 'The wall filter removes:',
    options: [
      'High frequencies',
      'Low frequencies',
      'All Doppler',
      'Noise only'
    ],
    correctAnswer: 1,
    explanation: 'Wall filters (high-pass) remove low-frequency signals from slowly moving tissue walls.',
    category: 'Doppler',
    difficulty: 'Medium'
  },
  {
    id: 'spi-079',
    question: 'Spectral broadening indicates:',
    options: [
      'Laminar flow',
      'Turbulent flow',
      'No flow',
      'Reversed flow'
    ],
    correctAnswer: 1,
    explanation: 'Turbulent flow has many velocities present simultaneously, creating a broad spectrum versus narrow laminar flow.',
    category: 'Doppler',
    difficulty: 'Medium'
  },
  {
    id: 'spi-080',
    question: 'The baseline in spectral Doppler represents:',
    options: [
      'Maximum velocity',
      'Zero frequency shift',
      'Mean velocity',
      'Minimum velocity'
    ],
    correctAnswer: 1,
    explanation: 'The baseline represents zero Doppler shift (no flow). Flow toward/away appears above/below baseline.',
    category: 'Doppler',
    difficulty: 'Easy'
  },
  {
    id: 'spi-081',
    question: 'PRF in color Doppler affects:',
    options: [
      'Penetration only',
      'Velocity scale',
      'Image size',
      'Frequency'
    ],
    correctAnswer: 1,
    explanation: 'PRF determines the Nyquist limit and thus the velocity scale. Higher PRF allows higher velocities without aliasing.',
    category: 'Doppler',
    difficulty: 'Medium'
  },
  {
    id: 'spi-082',
    question: 'Packet size in color Doppler affects:',
    options: [
      'Velocity accuracy and frame rate',
      'Penetration only',
      'Frequency',
      'Power'
    ],
    correctAnswer: 0,
    explanation: 'More pulses per packet improve velocity estimates but reduce frame rate due to increased acquisition time.',
    category: 'Doppler',
    difficulty: 'Hard'
  },
  {
    id: 'spi-083',
    question: 'Angle correction in Doppler:',
    options: [
      'Is automatic',
      'Must be set by operator',
      'Is unnecessary',
      'Only for CW'
    ],
    correctAnswer: 1,
    explanation: 'The operator must align the angle cursor with flow direction for accurate velocity calculations.',
    category: 'Doppler',
    difficulty: 'Easy'
  },
  {
    id: 'spi-084',
    question: 'Tissue Doppler imaging displays:',
    options: [
      'Blood flow',
      'Tissue motion',
      'Temperature',
      'Stiffness'
    ],
    correctAnswer: 1,
    explanation: 'TDI uses low wall filter settings to detect low-velocity, high-amplitude signals from moving tissue.',
    category: 'Doppler',
    difficulty: 'Hard'
  },
  {
    id: 'spi-085',
    question: 'The Reynolds number predicts:',
    options: [
      'Doppler shift',
      'Turbulence onset',
      'Attenuation',
      'Reflection'
    ],
    correctAnswer: 1,
    explanation: 'Reynolds number >2000 indicates likely turbulent flow based on velocity, vessel diameter, and fluid properties.',
    category: 'Doppler',
    difficulty: 'Hard'
  },
  {
    id: 'spi-086',
    question: 'Pulsatility index (PI) equals:',
    options: [
      '(Peak-end diastolic)/mean',
      'Peak/mean',
      'Mean/peak',
      'Systolic/diastolic'
    ],
    correctAnswer: 0,
    explanation: 'PI = (peak systolic - end diastolic)/mean velocity, indicating downstream resistance.',
    category: 'Doppler',
    difficulty: 'Hard'
  },
  {
    id: 'spi-087',
    question: 'Resistance index (RI) equals:',
    options: [
      '(Peak-end diastolic)/peak',
      'Peak/mean',
      'Mean/diastolic',
      'Systolic+diastolic'
    ],
    correctAnswer: 0,
    explanation: 'RI = (peak systolic - end diastolic)/peak systolic, ranging 0-1 to indicate vascular resistance.',
    category: 'Doppler',
    difficulty: 'Hard'
  },
  {
    id: 'spi-088',
    question: 'Bernoulli equation estimates:',
    options: [
      'Volume flow',
      'Pressure gradient',
      'Vessel diameter',
      'Blood viscosity'
    ],
    correctAnswer: 1,
    explanation: 'Simplified Bernoulli: ΔP = 4v² estimates pressure gradients across stenoses from peak velocity.',
    category: 'Doppler',
    difficulty: 'Hard'
  },
  {
    id: 'spi-089',
    question: 'Volume flow calculation requires:',
    options: [
      'Peak velocity only',
      'Vessel area and mean velocity',
      'Doppler angle only',
      'Pressure gradient'
    ],
    correctAnswer: 1,
    explanation: 'Volume flow = area × mean velocity. Requires accurate vessel diameter and velocity measurements.',
    category: 'Doppler',
    difficulty: 'Medium'
  },
  {
    id: 'spi-090',
    question: 'Spectral mirroring can be caused by:',
    options: [
      'Gain too high',
      'Angle near 0°',
      'Low PRF',
      'All of the above'
    ],
    correctAnswer: 3,
    explanation: 'Mirroring appears from excessive gain, perpendicular incidence creating bidirectional signals, or aliasing.',
    category: 'Doppler',
    difficulty: 'Hard'
  },
  {
    id: 'spi-091',
    question: 'Color box steering affects:',
    options: [
      'Doppler angle',
      'Frame rate only',
      'Frequency',
      'Power'
    ],
    correctAnswer: 0,
    explanation: 'Steering the color box changes the Doppler angle between flow and beam, affecting sensitivity.',
    category: 'Doppler',
    difficulty: 'Medium'
  },
  {
    id: 'spi-092',
    question: 'Flash artifact in color Doppler is caused by:',
    options: [
      'High velocity',
      'Tissue motion',
      'Aliasing',
      'Low gain'
    ],
    correctAnswer: 1,
    explanation: 'Sudden tissue/transducer motion creates color flash across the entire color box.',
    category: 'Doppler',
    difficulty: 'Medium'
  },
  {
    id: 'spi-093',
    question: 'Blooming artifact in color Doppler results from:',
    options: [
      'Gain too high',
      'PRF too low',
      'Wrong angle',
      'Deep imaging'
    ],
    correctAnswer: 0,
    explanation: 'Excessive color gain causes color to "bloom" beyond vessel boundaries into surrounding tissue.',
    category: 'Doppler',
    difficulty: 'Medium'
  },
  {
    id: 'spi-094',
    question: 'Autocorrelation in color Doppler:',
    options: [
      'Measures peak velocity',
      'Estimates mean frequency',
      'Removes noise',
      'Corrects angle'
    ],
    correctAnswer: 1,
    explanation: 'Autocorrelation quickly estimates mean frequency shift and variance for color Doppler processing.',
    category: 'Doppler',
    difficulty: 'Hard'
  },
  {
    id: 'spi-095',
    question: 'Directional information in Doppler requires:',
    options: [
      'High PRF',
      'Quadrature detection',
      'High frequency',
      'CW mode'
    ],
    correctAnswer: 1,
    explanation: 'Quadrature detection preserves phase information needed to determine flow direction (toward/away).',
    category: 'Doppler',
    difficulty: 'Hard'
  },

  // Section 5: Artifacts, Bioeffects, and Quality Assurance (Questions 96-110)
  {
    id: 'spi-096',
    question: 'Reverberation artifact appears as:',
    options: [
      'Single bright echo',
      'Multiple equally spaced echoes',
      'Curved line',
      'Missing echoes'
    ],
    correctAnswer: 1,
    explanation: 'Reverberations occur when sound bounces repeatedly between parallel reflectors, creating equally spaced echoes.',
    category: 'Artifacts',
    difficulty: 'Easy'
  },
  {
    id: 'spi-097',
    question: 'Acoustic shadowing is caused by:',
    options: [
      'Low attenuation',
      'High attenuation or reflection',
      'Refraction',
      'High gain'
    ],
    correctAnswer: 1,
    explanation: 'Strong attenuators (stones) or reflectors (gas) prevent sound transmission, creating shadows.',
    category: 'Artifacts',
    difficulty: 'Easy'
  },
  {
    id: 'spi-098',
    question: 'Enhancement artifact appears:',
    options: [
      'Behind low attenuators',
      'In front of reflectors',
      'At focal zone',
      'Near field only'
    ],
    correctAnswer: 0,
    explanation: 'Structures with low attenuation (cysts) cause less sound loss, making tissues behind appear brighter.',
    category: 'Artifacts',
    difficulty: 'Easy'
  },
  {
    id: 'spi-099',
    question: 'Mirror artifact is caused by:',
    options: [
      'Refraction',
      'Strong specular reflector',
      'Attenuation',
      'Electronic noise'
    ],
    correctAnswer: 1,
    explanation: 'Strong reflectors (diaphragm) act as mirrors, creating false images of structures on the opposite side.',
    category: 'Artifacts',
    difficulty: 'Medium'
  },
  {
    id: 'spi-100',
    question: 'Side lobe artifact appears as:',
    options: [
      'Bright echoes in wrong location',
      'Dark regions',
      'Shadow',
      'No artifact'
    ],
    correctAnswer: 0,
    explanation: 'Side lobes create false echoes that appear to originate from the main beam axis but actually come from off-axis.',
    category: 'Artifacts',
    difficulty: 'Medium'
  },
  {
    id: 'spi-101',
    question: 'Speed error artifact causes:',
    options: [
      'Object displacement',
      'Missing structures',
      'Extra echoes',
      'Color changes'
    ],
    correctAnswer: 0,
    explanation: 'When propagation speed differs from 1540 m/s, structures appear at incorrect depths (closer if slower, deeper if faster).',
    category: 'Artifacts',
    difficulty: 'Medium'
  },
  {
    id: 'spi-102',
    question: 'Range ambiguity artifact occurs when:',
    options: [
      'PRF too high',
      'PRF too low for depth',
      'Frequency too high',
      'Gain too low'
    ],
    correctAnswer: 1,
    explanation: 'If PRF is too low, echoes from deep structures arrive after the next pulse, appearing at shallow depths.',
    category: 'Artifacts',
    difficulty: 'Medium'
  },
  {
    id: 'spi-103',
    question: 'The ALARA principle means:',
    options: [
      'Always use maximum power',
      'As Low As Reasonably Achievable',
      'Automatic Level Adjustment',
      'Advanced Linear Array'
    ],
    correctAnswer: 1,
    explanation: 'ALARA guides safe scanning by using the lowest acoustic output that produces diagnostic images.',
    category: 'Bioeffects',
    difficulty: 'Easy'
  },
  {
    id: 'spi-104',
    question: 'The mechanical index should be kept below:',
    options: [
      '0.3 for ophthalmic imaging',
      '1.0 for general imaging',
      '1.9 for all imaging',
      'All of the above'
    ],
    correctAnswer: 3,
    explanation: 'MI limits vary by application: <0.3 for eye, <1.0 for general use, always <1.9 (FDA limit).',
    category: 'Bioeffects',
    difficulty: 'Medium'
  },
  {
    id: 'spi-105',
    question: 'Thermal index in fetal scanning should be:',
    options: [
      'As high as possible',
      'Below 1.0',
      'Exactly 2.0',
      'Not monitored'
    ],
    correctAnswer: 1,
    explanation: 'TI should be kept <1.0 in obstetric scanning, especially in first trimester, to minimize heating risk.',
    category: 'Bioeffects',
    difficulty: 'Medium'
  },
  {
    id: 'spi-106',
    question: 'Quality assurance testing should include:',
    options: [
      'Penetration depth',
      'Dead elements',
      'Image uniformity',
      'All of the above'
    ],
    correctAnswer: 3,
    explanation: 'Comprehensive QA includes testing penetration, checking for dead elements, uniformity, resolution, and accuracy.',
    category: 'Quality Assurance',
    difficulty: 'Easy'
  },
  {
    id: 'spi-107',
    question: 'Vertical distance accuracy should be within:',
    options: [
      '±1%',
      '±2%',
      '±5%',
      '±10%'
    ],
    correctAnswer: 1,
    explanation: 'Distance measurement accuracy should be within ±2% vertically and horizontally for clinical reliability.',
    category: 'Quality Assurance',
    difficulty: 'Medium'
  },
  {
    id: 'spi-108',
    question: 'Doppler sensitivity testing uses:',
    options: [
      'Tissue phantom',
      'Flow phantom',
      'Resolution phantom',
      'No phantom needed'
    ],
    correctAnswer: 1,
    explanation: 'Flow phantoms with known velocities test Doppler accuracy, sensitivity, and penetration capabilities.',
    category: 'Quality Assurance',
    difficulty: 'Medium'
  },
  {
    id: 'spi-109',
    question: 'Dead zone measurement indicates:',
    options: [
      'Maximum depth',
      'Minimum imaging depth',
      'Focal depth',
      'Penetration limit'
    ],
    correctAnswer: 1,
    explanation: 'The dead zone is the shallow region where imaging is poor due to transducer ringing and near-field artifacts.',
    category: 'Quality Assurance',
    difficulty: 'Medium'
  },
  {
    id: 'spi-110',
    question: 'Preventive maintenance includes:',
    options: [
      'Cleaning air filters',
      'Transducer inspection',
      'Cable checking',
      'All of the above'
    ],
    correctAnswer: 3,
    explanation: 'Regular maintenance prevents failures and includes cleaning filters, inspecting transducers/cables, and system checks.',
    category: 'Quality Assurance',
    difficulty: 'Easy'
  }
];

// Export exam statistics
export const examStats = {
  totalQuestions: mockExamQuestions.length,
  timeLimit: 150, // minutes (2.5 hours)
  passingScore: 75, // percentage
  categories: {
    'Basic Physics': 25,
    'Transducers': 20,
    'Pulse-Echo': 25,
    'Doppler': 25,
    'Artifacts': 10,
    'Quality Assurance': 5
  }
};