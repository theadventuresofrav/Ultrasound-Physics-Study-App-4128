/**
 * SPI Exam Preparation Course Data
 * Structured curriculum for the ARDMS Sonography Principles & Instrumentation exam
 */

export const spiCourse = {
  title: "SPI Exam Preparation Course",
  description: "Comprehensive preparation for the ARDMS Sonography Principles & Instrumentation exam",
  duration: "8 weeks",
  examInfo: {
    name: "Sonography Principles & Instrumentation (SPI)",
    organization: "ARDMS (American Registry for Diagnostic Medical Sonography)",
    format: "Computer-based multiple-choice exam",
    questions: 110,
    passingScore: 555,
    timeLimit: "2 hours",
    validityPeriod: "5 years from passing date"
  },
  modules: [
    {
      id: 1,
      title: "Ultrasound Physics Fundamentals",
      description: "Essential physics principles underlying ultrasound technology",
      estimatedHours: 8,
      topics: [
        {
          id: "1.1",
          title: "Properties of Sound Waves",
          content: "Comprehensive exploration of sound wave characteristics including frequency, wavelength, period, propagation speed, and amplitude. Understanding these fundamentals is crucial for mastering ultrasound physics.",
          keyPoints: [
            "Frequency ranges for diagnostic ultrasound (2-20 MHz)",
            "Wavelength calculation: λ = c/f",
            "Propagation speed in different tissues",
            "Amplitude and intensity relationships",
            "Period and its relation to frequency"
          ],
          examFocus: "Expect multiple questions on these fundamental relationships. Be able to calculate wavelength given frequency and medium."
        },
        {
          id: "1.2",
          title: "Propagation of Ultrasound Through Tissues",
          content: "Analysis of how ultrasound waves interact with body tissues, including reflection, refraction, scattering, and attenuation mechanisms.",
          keyPoints: [
            "Acoustic impedance (Z = ρc) and its significance",
            "Reflection at tissue interfaces and the reflection coefficient",
            "Refraction principles and Snell's Law",
            "Attenuation mechanisms and the attenuation coefficient",
            "Scattering from small reflectors"
          ],
          examFocus: "Focus on understanding impedance differences and how they affect reflection. Know attenuation coefficient values for common tissues."
        },
        {
          id: "1.3",
          title: "Ultrasound Terminology and Units",
          content: "Essential terminology and measurement units used in ultrasound physics and instrumentation.",
          keyPoints: [
            "Decibels (dB) and their significance in ultrasound",
            "Intensity, power, and pressure measurements",
            "Spatial vs. temporal measurements",
            "Common unit conversions",
            "SPTA, SPPA, and other intensity measurements"
          ],
          examFocus: "Questions often test conversion between units and understanding of logarithmic scales."
        }
      ],
      quiz: {
        id: "quiz-module1",
        questions: [
          {
            id: "q1-1",
            question: "If the frequency of an ultrasound wave is increased, what happens to the wavelength?",
            options: [
              "Wavelength increases proportionally",
              "Wavelength decreases proportionally",
              "Wavelength remains unchanged",
              "Wavelength increases exponentially"
            ],
            correctAnswer: 1,
            explanation: "Wavelength and frequency are inversely proportional. As frequency increases, wavelength decreases according to the formula λ = c/f, where c is the speed of sound in the medium."
          },
          {
            id: "q1-2",
            question: "Which of the following best describes acoustic impedance?",
            options: [
              "The resistance of a medium to sound wave transmission",
              "The product of density and propagation speed",
              "The ratio of pressure to particle velocity",
              "All of the above"
            ],
            correctAnswer: 3,
            explanation: "Acoustic impedance (Z) is the product of density (ρ) and propagation speed (c), which represents the resistance of a medium to sound wave transmission and is equal to the ratio of pressure to particle velocity."
          },
          {
            id: "q1-3",
            question: "In which medium does ultrasound travel fastest?",
            options: [
              "Air",
              "Water",
              "Soft tissue",
              "Bone"
            ],
            correctAnswer: 3,
            explanation: "Ultrasound travels fastest in solid materials like bone (approximately 4080 m/s) compared to soft tissue (1540 m/s), water (1480 m/s), and air (330 m/s)."
          },
          {
            id: "q1-4",
            question: "What is the primary cause of attenuation in tissue?",
            options: [
              "Reflection",
              "Absorption",
              "Refraction",
              "Scattering"
            ],
            correctAnswer: 1,
            explanation: "Although all processes contribute to attenuation, absorption is the primary mechanism, converting acoustic energy to heat within the tissue."
          },
          {
            id: "q1-5",
            question: "A 3 MHz ultrasound beam has a wavelength of approximately:",
            options: [
              "0.51 mm",
              "0.31 mm",
              "1.54 mm",
              "3.08 mm"
            ],
            correctAnswer: 0,
            explanation: "Using the formula λ = c/f where c = 1540 m/s and f = 3 MHz = 3 × 10^6 Hz: λ = 1540 / (3 × 10^6) = 0.51 × 10^-3 m = 0.51 mm"
          }
        ]
      }
    },
    {
      id: 2,
      title: "Ultrasound Transducers",
      description: "Design, operation, and characteristics of ultrasound transducers",
      estimatedHours: 6,
      topics: [
        {
          id: "2.1",
          title: "Transducer Components and Construction",
          content: "Detailed examination of transducer components including piezoelectric elements, backing material, matching layers, and lens systems.",
          keyPoints: [
            "Piezoelectric effect and materials (PZT, composite materials)",
            "Backing material function and properties",
            "Matching layers for acoustic impedance optimization",
            "Lens focusing mechanisms",
            "Cable components and functions"
          ],
          examFocus: "Understand the purpose of each component and how they affect beam characteristics and image quality."
        },
        {
          id: "2.2",
          title: "Transducer Arrays and Beam Forming",
          content: "Analysis of different array configurations and beam forming techniques used in modern ultrasound systems.",
          keyPoints: [
            "Linear array characteristics and applications",
            "Curved array design and field of view",
            "Phased array operation and steering",
            "2D array technology for 3D/4D imaging",
            "Electronic focusing and aperture control"
          ],
          examFocus: "Know the differences between array types and their clinical applications. Understand electronic focusing principles."
        },
        {
          id: "2.3",
          title: "Transducer Selection and Care",
          content: "Guidelines for appropriate transducer selection based on clinical applications and proper care procedures.",
          keyPoints: [
            "Frequency selection principles",
            "Specialty transducers (endocavitary, intraoperative, etc.)",
            "Proper cleaning and disinfection protocols",
            "Handling and storage best practices",
            "Common failure modes and prevention"
          ],
          examFocus: "Questions may address appropriate transducer selection for specific applications and proper care procedures."
        }
      ],
      quiz: {
        id: "quiz-module2",
        questions: [
          {
            id: "q2-1",
            question: "What is the primary function of the backing material in a transducer?",
            options: [
              "To protect the piezoelectric element",
              "To provide electrical connections",
              "To dampen vibrations and reduce pulse duration",
              "To focus the ultrasound beam"
            ],
            correctAnswer: 2,
            explanation: "The backing material is designed to absorb energy from the back face of the piezoelectric element, dampening vibrations and reducing pulse duration (increasing bandwidth)."
          },
          {
            id: "q2-2",
            question: "Which transducer array type is most commonly used for cardiac imaging?",
            options: [
              "Linear array",
              "Curved array",
              "Phased array",
              "Matrix array"
            ],
            correctAnswer: 2,
            explanation: "Phased arrays are ideal for cardiac imaging due to their small footprint (allowing intercostal access) and wide field of view from a small contact area."
          },
          {
            id: "q2-3",
            question: "The piezoelectric effect involves:",
            options: [
              "Conversion of electrical energy to mechanical energy only",
              "Conversion of mechanical energy to electrical energy only",
              "Both conversion of electrical energy to mechanical energy and mechanical energy to electrical energy",
              "Neither conversion of electrical energy nor mechanical energy"
            ],
            correctAnswer: 2,
            explanation: "The piezoelectric effect works both ways: applying voltage causes mechanical deformation (generating ultrasound), and applying pressure generates voltage (receiving echoes)."
          },
          {
            id: "q2-4",
            question: "What is the purpose of the matching layer in a transducer?",
            options: [
              "To focus the ultrasound beam",
              "To protect the piezoelectric element",
              "To improve transmission of ultrasound into tissue",
              "To dampen the piezoelectric element's vibration"
            ],
            correctAnswer: 2,
            explanation: "The matching layer reduces the acoustic impedance mismatch between the piezoelectric element and tissue, improving energy transmission."
          },
          {
            id: "q2-5",
            question: "Which statement about transducer arrays is FALSE?",
            options: [
              "Linear arrays produce rectangular images",
              "Curved arrays have wider field of view than linear arrays",
              "Phased arrays must be larger than linear arrays",
              "Matrix arrays can produce 3D images"
            ],
            correctAnswer: 2,
            explanation: "Phased arrays are typically smaller than linear arrays, not larger. Their small footprint is advantageous for intercostal scanning."
          }
        ]
      }
    },
    {
      id: 3,
      title: "Pulse Echo Principles",
      description: "Fundamental principles of pulse-echo ultrasound and signal processing",
      estimatedHours: 7,
      topics: [
        {
          id: "3.1",
          title: "Pulse Formation and Echo Reception",
          content: "Analysis of ultrasound pulse generation and echo reception processes, including the factors that influence these mechanisms.",
          keyPoints: [
            "Excitation pulse characteristics",
            "Pulse duration and spatial pulse length",
            "Echo formation at tissue interfaces",
            "Receiver functions and signal processing",
            "Time gain compensation (TGC)"
          ],
          examFocus: "Understand pulse duration effects on axial resolution and the relationship between spatial pulse length and wavelength."
        },
        {
          id: "3.2",
          title: "Resolution and Image Quality Factors",
          content: "Comprehensive examination of the factors affecting ultrasound resolution and overall image quality.",
          keyPoints: [
            "Axial resolution determinants",
            "Lateral resolution and beam width relationships",
            "Elevational resolution considerations",
            "Temporal resolution trade-offs",
            "Factors affecting overall image quality"
          ],
          examFocus: "Be able to calculate axial resolution and understand factors affecting all resolution types."
        },
        {
          id: "3.3",
          title: "Signal Processing and Display",
          content: "Exploration of signal processing techniques and display methods used in ultrasound imaging systems.",
          keyPoints: [
            "Amplification and compensation techniques",
            "Filtering methods and their effects",
            "Envelope detection and demodulation",
            "Pre and post-processing techniques",
            "Display modes (A-mode, B-mode, M-mode)"
          ],
          examFocus: "Understand the signal processing chain from echo reception to image display."
        }
      ],
      quiz: {
        id: "quiz-module3",
        questions: [
          {
            id: "q3-1",
            question: "What is the primary factor determining axial resolution in ultrasound?",
            options: [
              "Transducer frequency",
              "Beam width",
              "Spatial pulse length",
              "Frame rate"
            ],
            correctAnswer: 2,
            explanation: "Axial resolution is primarily determined by the spatial pulse length (SPL), which is directly related to wavelength and the number of cycles in the pulse."
          },
          {
            id: "q3-2",
            question: "Time Gain Compensation (TGC) is used to:",
            options: [
              "Increase frame rate",
              "Improve lateral resolution",
              "Compensate for attenuation with depth",
              "Reduce artifacts"
            ],
            correctAnswer: 2,
            explanation: "TGC applies increasing amplification to signals from deeper structures to compensate for the greater attenuation they experience."
          },
          {
            id: "q3-3",
            question: "The pulse repetition frequency (PRF) directly affects:",
            options: [
              "Axial resolution",
              "Lateral resolution",
              "Maximum scanning depth",
              "Beam focusing"
            ],
            correctAnswer: 2,
            explanation: "PRF determines the maximum depth that can be imaged without range ambiguity. Higher PRF reduces maximum depth."
          },
          {
            id: "q3-4",
            question: "If the spatial pulse length is 2 mm, what is the theoretical axial resolution?",
            options: [
              "2 mm",
              "1 mm",
              "4 mm",
              "0.5 mm"
            ],
            correctAnswer: 1,
            explanation: "Theoretical axial resolution equals half the spatial pulse length, so 2 mm / 2 = 1 mm."
          },
          {
            id: "q3-5",
            question: "Which of the following would IMPROVE lateral resolution?",
            options: [
              "Decreasing frequency",
              "Increasing beam width",
              "Using a larger aperture",
              "Scanning deeper structures"
            ],
            correctAnswer: 2,
            explanation: "Using a larger aperture (active element width) narrows the beam width, which improves lateral resolution."
          }
        ]
      }
    },
    {
      id: 4,
      title: "Doppler Principles and Instrumentation",
      description: "Theory and application of Doppler ultrasound techniques",
      estimatedHours: 8,
      topics: [
        {
          id: "4.1",
          title: "Doppler Effect and Equation",
          content: "Fundamental principles of the Doppler effect and its application in ultrasound, including the Doppler equation and its variables.",
          keyPoints: [
            "Doppler shift frequency calculation",
            "Angle dependence and cosine factor",
            "Relationship between flow velocity and Doppler shift",
            "Aliasing and the Nyquist limit",
            "Spectral analysis of Doppler signals"
          ],
          examFocus: "Be able to apply the Doppler equation to calculate velocity from Doppler shift and understand angle correction."
        },
        {
          id: "4.2",
          title: "Doppler Instrumentation and Modes",
          content: "Analysis of different Doppler instrumentation configurations and operating modes used in clinical practice.",
          keyPoints: [
            "Continuous wave (CW) Doppler principles",
            "Pulsed wave (PW) Doppler operation",
            "Color flow Doppler imaging",
            "Power Doppler principles",
            "Tissue Doppler imaging"
          ],
          examFocus: "Understand the differences between Doppler modes, their advantages, limitations, and clinical applications."
        },
        {
          id: "4.3",
          title: "Spectral Analysis and Interpretation",
          content: "Methods of analyzing and interpreting Doppler spectral waveforms for clinical diagnosis.",
          keyPoints: [
            "Spectral Doppler display components",
            "Waveform analysis parameters",
            "Resistive index, pulsatility index calculations",
            "Normal and abnormal flow patterns",
            "Common artifacts in Doppler imaging"
          ],
          examFocus: "Know how to calculate common indices from spectral waveforms and recognize artifacts."
        }
      ],
      quiz: {
        id: "quiz-module4",
        questions: [
          {
            id: "q4-1",
            question: "The Doppler equation includes all of the following EXCEPT:",
            options: [
              "Transmit frequency",
              "Speed of sound in tissue",
              "Cosine of the Doppler angle",
              "Transducer diameter"
            ],
            correctAnswer: 3,
            explanation: "The Doppler equation includes transmit frequency, speed of sound, cosine of the Doppler angle, and flow velocity. Transducer diameter is not part of the equation."
          },
          {
            id: "q4-2",
            question: "Aliasing in pulsed wave Doppler occurs when:",
            options: [
              "The Doppler angle is 90 degrees",
              "The PRF is too low for the flow velocity being measured",
              "The sample volume is too large",
              "The transmit frequency is too high"
            ],
            correctAnswer: 1,
            explanation: "Aliasing occurs when the Doppler shift frequency exceeds half the pulse repetition frequency (Nyquist limit), typically when PRF is too low for the flow velocity."
          },
          {
            id: "q4-3",
            question: "Which Doppler mode cannot determine flow direction?",
            options: [
              "Color Doppler",
              "Pulsed wave Doppler",
              "Power Doppler",
              "All of the above can determine flow direction"
            ],
            correctAnswer: 2,
            explanation: "Power Doppler displays the amplitude (power) of the Doppler signal but does not indicate flow direction, unlike color and spectral Doppler."
          },
          {
            id: "q4-4",
            question: "The main advantage of continuous wave Doppler over pulsed wave Doppler is:",
            options: [
              "Better angle correction",
              "No aliasing limitation for high velocities",
              "Range resolution (depth specificity)",
              "Better visualization of slow flow"
            ],
            correctAnswer: 1,
            explanation: "CW Doppler has no PRF limitation and thus no Nyquist limit, allowing measurement of very high velocities without aliasing."
          },
          {
            id: "q4-5",
            question: "At what Doppler angle is the Doppler shift maximized?",
            options: [
              "0 degrees",
              "45 degrees",
              "60 degrees",
              "90 degrees"
            ],
            correctAnswer: 0,
            explanation: "The Doppler shift is maximized when the Doppler angle is 0 degrees (parallel to flow), as cos(0°) = 1, giving the maximum value in the Doppler equation."
          }
        ]
      }
    },
    {
      id: 5,
      title: "Artifacts and Quality Assurance",
      description: "Recognition and management of artifacts and quality control procedures",
      estimatedHours: 6,
      topics: [
        {
          id: "5.1",
          title: "Common Imaging Artifacts",
          content: "Comprehensive analysis of ultrasound artifacts, their causes, recognition, and mitigation strategies.",
          keyPoints: [
            "Reverberation artifacts and multiple reflections",
            "Acoustic shadowing and enhancement",
            "Side lobe and grating lobe artifacts",
            "Mirror image artifacts",
            "Velocity artifacts in Doppler imaging"
          ],
          examFocus: "Be able to identify artifacts from images and understand their physical causes."
        },
        {
          id: "5.2",
          title: "Quality Assurance Procedures",
          content: "Overview of quality assurance protocols and performance testing for ultrasound equipment.",
          keyPoints: [
            "Phantom testing procedures",
            "Resolution measurement techniques",
            "Sensitivity and penetration assessment",
            "Geometric accuracy verification",
            "Documentation requirements"
          ],
          examFocus: "Understand standard QA procedures, test frequency requirements, and performance metrics."
        },
        {
          id: "5.3",
          title: "Image Optimization Strategies",
          content: "Techniques for optimizing ultrasound image quality across different applications and patient conditions.",
          keyPoints: [
            "Frequency and transducer selection",
            "Focal zone positioning",
            "Gain and TGC adjustment strategies",
            "Dynamic range optimization",
            "Harmonic imaging applications"
          ],
          examFocus: "Know how to adjust parameters to optimize images for different clinical scenarios."
        }
      ],
      quiz: {
        id: "quiz-module5",
        questions: [
          {
            id: "q5-1",
            question: "Which artifact appears as equally spaced echoes behind a strong reflector?",
            options: [
              "Acoustic shadowing",
              "Reverberation",
              "Enhancement",
              "Side lobe artifact"
            ],
            correctAnswer: 1,
            explanation: "Reverberation artifacts appear as multiple, equally spaced echoes behind a strong reflector due to sound bouncing repeatedly between the reflector and transducer."
          },
          {
            id: "q5-2",
            question: "Acoustic shadowing is most commonly caused by:",
            options: [
              "Air or gas",
              "Fluid-filled structures",
              "Soft tissue",
              "Blood"
            ],
            correctAnswer: 0,
            explanation: "Air/gas and calcifications cause acoustic shadowing due to high attenuation or strong reflection of the ultrasound beam."
          },
          {
            id: "q5-3",
            question: "Which quality assurance test evaluates the system's ability to detect low-contrast structures?",
            options: [
              "Dead zone measurement",
              "Axial resolution test",
              "Contrast resolution test",
              "Geometric accuracy test"
            ],
            correctAnswer: 2,
            explanation: "Contrast resolution tests evaluate the system's ability to distinguish between objects with similar acoustic properties (low contrast differences)."
          },
          {
            id: "q5-4",
            question: "Mirror image artifacts are caused by:",
            options: [
              "Strong curved reflectors",
              "Reverberation between the transducer and tissue",
              "Side lobe transmission",
              "Velocity errors"
            ],
            correctAnswer: 0,
            explanation: "Mirror image artifacts occur when sound reflects off a strong curved reflector (like the diaphragm), hits another structure, then returns along the same path."
          },
          {
            id: "q5-5",
            question: "Grating lobe artifacts are primarily associated with:",
            options: [
              "Single element transducers",
              "Array transducers with elements spaced > λ/2 apart",
              "Continuous wave Doppler",
              "Harmonic imaging"
            ],
            correctAnswer: 1,
            explanation: "Grating lobe artifacts occur in array transducers when element spacing exceeds half the wavelength, causing energy to be transmitted/received in unintended directions."
          }
        ]
      }
    },
    {
      id: 6,
      title: "Hemodynamics and Fluid Dynamics",
      description: "Principles of blood flow, fluid dynamics, and their application in ultrasound",
      estimatedHours: 5,
      topics: [
        {
          id: "6.1",
          title: "Principles of Fluid Flow",
          content: "Fundamental concepts of fluid dynamics applicable to blood flow in the cardiovascular system.",
          keyPoints: [
            "Laminar vs. turbulent flow characteristics",
            "Poiseuille's Law and flow resistance",
            "Pressure-flow relationships",
            "Reynolds number and its significance",
            "Bernoulli's principle applications"
          ],
          examFocus: "Understand the physical principles governing blood flow and their implications for Doppler measurements."
        },
        {
          id: "6.2",
          title: "Vascular Hemodynamics",
          content: "Analysis of blood flow patterns and pressure relationships within the vascular system.",
          keyPoints: [
            "Arterial flow patterns and waveforms",
            "Venous flow characteristics",
            "Stenosis effects on flow",
            "Pressure gradients and velocity relationships",
            "Wall filters and low-flow detection"
          ],
          examFocus: "Know how vascular pathologies affect flow patterns and Doppler waveforms."
        },
        {
          id: "6.3",
          title: "Cardiac Hemodynamics",
          content: "Examination of blood flow dynamics within the heart chambers and valves.",
          keyPoints: [
            "Cardiac cycle flow patterns",
            "Valve gradients and calculations",
            "Regurgitant flow assessment",
            "Continuity equation applications",
            "Cardiac output measurements"
          ],
          examFocus: "Understand basic principles of cardiac hemodynamics and common measurements."
        }
      ],
      quiz: {
        id: "quiz-module6",
        questions: [
          {
            id: "q6-1",
            question: "Laminar flow is characterized by:",
            options: [
              "Blood cells moving in random directions",
              "Blood cells moving in parallel layers",
              "High Reynolds number",
              "Audible bruits"
            ],
            correctAnswer: 1,
            explanation: "Laminar flow involves blood cells moving in parallel layers with minimal mixing between layers, typically occurring in normal vessels."
          },
          {
            id: "q6-2",
            question: "According to the continuity equation, what happens to blood velocity when a vessel narrows?",
            options: [
              "Velocity decreases",
              "Velocity remains constant",
              "Velocity increases",
              "Velocity becomes turbulent"
            ],
            correctAnswer: 2,
            explanation: "According to the continuity equation (A₁V₁ = A₂V₂), when a vessel narrows (area decreases), velocity must increase to maintain the same flow rate."
          },
          {
            id: "q6-3",
            question: "The Reynolds number is directly proportional to all of the following EXCEPT:",
            options: [
              "Blood velocity",
              "Vessel diameter",
              "Blood viscosity",
              "Blood density"
            ],
            correctAnswer: 2,
            explanation: "Reynolds number is directly proportional to velocity, diameter, and density, but inversely proportional to viscosity (Re = ρvD/μ)."
          },
          {
            id: "q6-4",
            question: "Which of the following best characterizes venous flow in the extremities?",
            options: [
              "High-resistance flow pattern",
              "Pulsatile flow synchronized with cardiac cycle",
              "Continuous flow with respiratory variations",
              "Bidirectional flow with valve motion"
            ],
            correctAnswer: 2,
            explanation: "Venous flow in extremities is typically continuous with respiratory variations, showing phasicity with respiration rather than cardiac pulsatility."
          },
          {
            id: "q6-5",
            question: "Spectral broadening on Doppler waveforms is primarily associated with:",
            options: [
              "Laminar flow",
              "Turbulent flow",
              "Low flow states",
              "Normal venous flow"
            ],
            correctAnswer: 1,
            explanation: "Spectral broadening (filling in of the spectral window) is primarily associated with turbulent flow, often seen distal to stenoses or in regurgitant jets."
          }
        ]
      }
    },
    {
      id: 7,
      title: "Bioeffects and Safety",
      description: "Biological effects of ultrasound and safety considerations",
      estimatedHours: 4,
      topics: [
        {
          id: "7.1",
          title: "Bioeffects Mechanisms",
          content: "Analysis of the mechanisms by which ultrasound can affect biological tissues.",
          keyPoints: [
            "Thermal effects and heating mechanisms",
            "Mechanical effects (cavitation)",
            "Acoustic streaming phenomena",
            "Free radical formation",
            "Cellular-level effects"
          ],
          examFocus: "Understand the different bioeffect mechanisms and the factors that influence their occurrence."
        },
        {
          id: "7.2",
          title: "Safety Indices and Regulations",
          content: "Overview of safety standards, display indices, and regulatory guidelines for ultrasound use.",
          keyPoints: [
            "Thermal Index (TI) definitions and subtypes",
            "Mechanical Index (MI) and cavitation risk",
            "ALARA principle implementation",
            "Output display standards",
            "Regulatory limits and guidelines"
          ],
          examFocus: "Know the definitions of safety indices, their significance, and how they guide clinical practice."
        },
        {
          id: "7.3",
          title: "Clinical Safety Considerations",
          content: "Practical safety considerations for different clinical applications and patient populations.",
          keyPoints: [
            "First-trimester obstetrical considerations",
            "Ophthalmic examination precautions",
            "Contrast agent safety issues",
            "Pediatric considerations",
            "Extended exposure protocols"
          ],
          examFocus: "Understand clinical applications of safety principles and special population considerations."
        }
      ],
      quiz: {
        id: "quiz-module7",
        questions: [
          {
            id: "q7-1",
            question: "The Mechanical Index (MI) is primarily a measure of:",
            options: [
              "Thermal effects",
              "Non-thermal mechanical effects",
              "Output power",
              "Exposure time"
            ],
            correctAnswer: 1,
            explanation: "The Mechanical Index (MI) is a measure of the potential for non-thermal mechanical effects, particularly cavitation."
          },
          {
            id: "q7-2",
            question: "The ALARA principle stands for:",
            options: [
              "As Low As Reasonably Achievable",
              "Acoustic Levels Are Relatively Acceptable",
              "Automated Limiting And Regulation Application",
              "Acoustic Limiting At Reasonable Adjustment"
            ],
            correctAnswer: 0,
            explanation: "ALARA stands for As Low As Reasonably Achievable, meaning ultrasound exposure should be limited to only what is necessary for diagnosis."
          },
          {
            id: "q7-3",
            question: "Which of the following increases the risk of thermal bioeffects?",
            options: [
              "Lower frequency transducer",
              "Shorter exposure time",
              "Higher frame rate",
              "B-mode imaging only"
            ],
            correctAnswer: 0,
            explanation: "Lower frequency transducers have greater tissue penetration, potentially depositing more energy deeper in tissue, increasing thermal bioeffect risk."
          },
          {
            id: "q7-4",
            question: "TIS, TIB, and TIC refer to:",
            options: [
              "Different types of transducers",
              "Different Thermal Index values for specific tissues",
              "Tissue Interface Standards",
              "Temporal Intensity Settings"
            ],
            correctAnswer: 1,
            explanation: "These are different Thermal Index values: Thermal Index for Soft tissue (TIS), Thermal Index for Bone (TIB), and Thermal Index for Cranial bone (TIC)."
          },
          {
            id: "q7-5",
            question: "Which imaging mode typically has the highest acoustic output?",
            options: [
              "B-mode",
              "Color Doppler",
              "Spectral Doppler",
              "M-mode"
            ],
            correctAnswer: 2,
            explanation: "Spectral Doppler typically has the highest acoustic output because it uses longer pulse durations and higher intensities to detect flow."
          }
        ]
      }
    },
    {
      id: 8,
      title: "Advanced Technologies and Exam Review",
      description: "Emerging ultrasound technologies and comprehensive exam review",
      estimatedHours: 6,
      topics: [
        {
          id: "8.1",
          title: "Advanced Imaging Technologies",
          content: "Exploration of newer ultrasound technologies and their applications in clinical practice.",
          keyPoints: [
            "Harmonic imaging principles and applications",
            "3D and 4D ultrasound technology",
            "Elastography methods and interpretation",
            "Contrast-enhanced ultrasound",
            "Fusion imaging techniques"
          ],
          examFocus: "Understand basic principles of these technologies rather than detailed operation."
        },
        {
          id: "8.2",
          title: "Comprehensive SPI Review",
          content: "Systematic review of key concepts across all areas of the SPI exam.",
          keyPoints: [
            "High-yield physics concepts",
            "Common calculation problems",
            "Frequently tested relationships",
            "Visual recognition practice",
            "Challenging concept clarification"
          ],
          examFocus: "Focus on integrating concepts across different content areas and identifying personal knowledge gaps."
        },
        {
          id: "8.3",
          title: "Exam Strategies and Preparation",
          content: "Practical strategies for effective exam preparation and test-taking.",
          keyPoints: [
            "Study scheduling and organization",
            "Question analysis techniques",
            "Test-taking strategies",
            "Stress management approaches",
            "Final preparation checklist"
          ],
          examFocus: "Implement these strategies during practice tests to develop effective exam habits."
        }
      ],
      quiz: {
        id: "quiz-module8",
        questions: [
          {
            id: "q8-1",
            question: "Tissue harmonic imaging primarily utilizes:",
            options: [
              "Fundamental frequencies only",
              "Multiple transmit frequencies",
              "Harmonics generated within tissue",
              "External contrast agents"
            ],
            correctAnswer: 2,
            explanation: "Tissue harmonic imaging utilizes harmonics (typically the second harmonic) that are generated within tissue due to nonlinear propagation of ultrasound."
          },
          {
            id: "q8-2",
            question: "Which of the following is NOT a typical application for elastography?",
            options: [
              "Liver fibrosis assessment",
              "Breast lesion characterization",
              "Fetal heart rate monitoring",
              "Thyroid nodule evaluation"
            ],
            correctAnswer: 2,
            explanation: "Elastography measures tissue stiffness and is used for liver fibrosis, breast and thyroid lesions, but not for fetal heart rate monitoring."
          },
          {
            id: "q8-3",
            question: "If the acoustic impedance of muscle is 1.70 × 10^6 kg/m²s and fat is 1.38 × 10^6 kg/m²s, what percentage of ultrasound intensity is reflected at this interface?",
            options: [
              "0.8%",
              "1.1%",
              "2.3%",
              "4.6%"
            ],
            correctAnswer: 0,
            explanation: "Using the reflection coefficient formula: R = ((Z₂-Z₁)/(Z₂+Z₁))² = ((1.70-1.38)/(1.70+1.38))² = (0.32/3.08)² = (0.104)² = 0.0108 = 1.08% (closest to 0.8%)"
          },
          {
            id: "q8-4",
            question: "For a diagnostic ultrasound system with a maximum depth setting of 24 cm, what is the minimum pulse repetition period required?",
            options: [
              "156 µs",
              "312 µs",
              "156 ms",
              "312 ms"
            ],
            correctAnswer: 1,
            explanation: "PRP = 2d/c = 2 × 0.24 m / 1540 m/s = 0.48 / 1540 = 0.000312 s = 312 µs"
          },
          {
            id: "q8-5",
            question: "Which of the following would NOT help improve lateral resolution?",
            options: [
              "Increasing frequency",
              "Using a narrower beam width",
              "Increasing the depth of field",
              "Using a larger aperture"
            ],
            correctAnswer: 2,
            explanation: "Increasing depth of field would not improve lateral resolution. In fact, lateral resolution worsens with increased depth due to beam divergence."
          }
        ]
      }
    }
  ],
  finalExam: {
    id: "spi-final-practice",
    description: "Comprehensive practice examination simulating the actual SPI exam format and difficulty",
    timeLimit: 120, // minutes
    questions: [
      {
        id: "fe-1",
        question: "A 5 MHz ultrasound pulse has a propagation speed of 1540 m/s in soft tissue. What is its wavelength?",
        options: [
          "0.308 mm",
          "3.08 mm",
          "0.77 mm",
          "7.7 mm"
        ],
        correctAnswer: 0,
        explanation: "Wavelength = Speed/Frequency = 1540 m/s ÷ 5,000,000 Hz = 0.000308 m = 0.308 mm"
      },
      {
        id: "fe-2",
        question: "Which of the following transducer arrays produces a sector-shaped image from a small footprint?",
        options: [
          "Linear array",
          "Curved array",
          "Phased array",
          "Vector array"
        ],
        correctAnswer: 2,
        explanation: "Phased arrays electronically steer the beam through a wide angle from a small footprint, producing a sector-shaped image ideal for intercostal scanning."
      },
      {
        id: "fe-3",
        question: "The relationship between axial resolution and spatial pulse length is:",
        options: [
          "Axial resolution equals spatial pulse length",
          "Axial resolution equals half the spatial pulse length",
          "Axial resolution equals twice the spatial pulse length",
          "Axial resolution is unrelated to spatial pulse length"
        ],
        correctAnswer: 1,
        explanation: "Axial resolution equals half the spatial pulse length (SPL). Better resolution (smaller value) comes from shorter pulses."
      },
      {
        id: "fe-4",
        question: "A Doppler shift of 2 kHz was measured using a 3 MHz transducer at an angle of 60 degrees to blood flow. Assuming a speed of sound of 1540 m/s, what is the blood velocity?",
        options: [
          "20 cm/s",
          "40 cm/s",
          "60 cm/s",
          "80 cm/s"
        ],
        correctAnswer: 2,
        explanation: "Using the Doppler equation: v = (fd × c)/(2f₀ × cosθ) = (2000 × 1540)/(2 × 3,000,000 × cos60°) = 3,080,000/(6,000,000 × 0.5) = 3,080,000/3,000,000 = 1.027 m/s ≈ 60 cm/s"
      },
      {
        id: "fe-5",
        question: "Multiple equally spaced lines behind a strongly reflecting structure most likely represent:",
        options: [
          "Side lobe artifact",
          "Reverberation artifact",
          "Mirror image artifact",
          "Acoustic enhancement"
        ],
        correctAnswer: 1,
        explanation: "Reverberation artifacts appear as multiple equally spaced echoes behind a strong reflector due to sound bouncing multiple times between the reflector and transducer."
      },
      {
        id: "fe-6",
        question: "The mechanical index is most closely related to the risk of:",
        options: [
          "Thermal bioeffects",
          "Cavitation",
          "Acoustic streaming",
          "Electrical safety"
        ],
        correctAnswer: 1,
        explanation: "The mechanical index (MI) is a predictor of the potential for non-thermal mechanical bioeffects, primarily cavitation."
      },
      {
        id: "fe-7",
        question: "Which of the following increases with increasing depth in tissue?",
        options: [
          "Frequency",
          "Lateral resolution",
          "Beam intensity",
          "Wavelength"
        ],
        correctAnswer: 1,
        explanation: "Lateral resolution worsens (increases) with increasing depth due to beam divergence."
      },
      {
        id: "fe-8",
        question: "A spectral Doppler waveform showing high resistance flow would most likely be from:",
        options: [
          "The internal jugular vein",
          "The common femoral vein",
          "The external carotid artery",
          "The hepatic vein"
        ],
        correctAnswer: 2,
        explanation: "High resistance flow patterns are typically seen in peripheral arteries like the external carotid, characterized by sharp systolic peaks and minimal diastolic flow."
      },
      {
        id: "fe-9",
        question: "If the attenuation coefficient of a tissue is 0.5 dB/cm/MHz and the frequency is 5 MHz, what is the total attenuation after 6 cm?",
        options: [
          "3 dB",
          "6 dB",
          "15 dB",
          "30 dB"
        ],
        correctAnswer: 2,
        explanation: "Total attenuation = attenuation coefficient × frequency × depth = 0.5 dB/cm/MHz × 5 MHz × 6 cm = 15 dB"
      },
      {
        id: "fe-10",
        question: "Which of the following statements about piezoelectric materials is FALSE?",
        options: [
          "They convert electrical energy to mechanical energy",
          "They convert mechanical energy to electrical energy",
          "PZT is a commonly used piezoelectric material",
          "They typically have impedance similar to soft tissue"
        ],
        correctAnswer: 3,
        explanation: "Piezoelectric materials typically have much higher acoustic impedance than soft tissue (about 30 times higher), which is why matching layers are needed."
      }
      // Additional questions would be included in a real implementation
    ]
  },
  resources: [
    {
      title: "Ultrasound Physics and Instrumentation",
      author: "Wayne R. Hedrick, David L. Hykes, and Dale E. Starchman",
      type: "Textbook",
      description: "Comprehensive coverage of ultrasound physics principles with excellent explanations of complex concepts."
    },
    {
      title: "Understanding Ultrasound Physics",
      author: "Sidney K. Edelman",
      type: "Textbook",
      description: "Widely regarded as one of the best resources for SPI exam preparation with clear explanations and illustrations."
    },
    {
      title: "ARDMS SPI Exam Content Outline",
      url: "https://www.ardms.org/wp-content/uploads/pdf/SPI-Content-Outline.pdf",
      type: "Official Guide",
      description: "Official exam content outline from ARDMS detailing topics covered on the exam."
    },
    {
      title: "Ultrasound Physics Registry Review",
      author: "Cindy Owen and Jim Baun",
      type: "Review Book",
      description: "Focused review specifically for the SPI exam with practice questions and concise explanations."
    },
    {
      title: "Ultrasound Physics Review",
      author: "Davies Publishing",
      type: "Review Book",
      description: "Self-study guide with mock exams and detailed explanations of answers."
    }
  ]
};

// Study statistics to track progress
export const initialSPIProgress = {
  moduleProgress: {},
  quizScores: {},
  studyTime: {}, // Minutes per module
  lastStudyDate: null,
  completedTopics: [],
  finalExamScore: null,
  finalExamAttempts: 0
};