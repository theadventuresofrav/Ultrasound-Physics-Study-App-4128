export const sections = [
  {
    id: 1,
    title: "Basic Ultrasound Physics",
    description: "Fundamental principles of ultrasound physics including frequency, wavelength, and propagation",
    color: "bg-blue-500",
    icon: "FiZap",
    questions: [
      {
        id: 1,
        question: "What is the typical frequency range for diagnostic ultrasound?",
        options: [
          "1-20 kHz",
          "2-20 MHz",
          "20-200 MHz",
          "200-2000 MHz"
        ],
        correct: 1,
        explanation: "Diagnostic ultrasound typically uses frequencies between 2-20 MHz. Lower frequencies (2-5 MHz) are used for deeper penetration in abdominal imaging, while higher frequencies (5-20 MHz) are used for superficial structures with better resolution."
      },
      {
        id: 2,
        question: "Sound propagation speed is fastest in which medium?",
        options: [
          "Air",
          "Fat",
          "Soft tissue",
          "Bone"
        ],
        correct: 3,
        explanation: "Sound travels fastest in bone (~4080 m/s), followed by soft tissue (~1540 m/s), fat (~1450 m/s), and slowest in air (~330 m/s). The speed increases with material stiffness."
      },
      {
        id: 3,
        question: "What is the wavelength of a 5 MHz ultrasound wave in soft tissue?",
        options: [
          "0.31 mm",
          "0.62 mm",
          "1.54 mm",
          "3.08 mm"
        ],
        correct: 0,
        explanation: "Wavelength = Speed/Frequency = 1540 m/s ÷ 5,000,000 Hz = 0.000308 m = 0.31 mm"
      },
      {
        id: 4,
        question: "Acoustic impedance is defined as:",
        options: [
          "Density × frequency",
          "Density × propagation speed",
          "Frequency × wavelength",
          "Power × area"
        ],
        correct: 1,
        explanation: "Acoustic impedance (Z) = density (ρ) × propagation speed (c). It determines how much ultrasound is reflected at tissue interfaces."
      },
      {
        id: 5,
        question: "The percentage of ultrasound reflected at an interface depends on:",
        options: [
          "Frequency only",
          "Wavelength only",
          "Difference in acoustic impedances",
          "Transducer diameter"
        ],
        correct: 2,
        explanation: "Reflection coefficient = [(Z2-Z1)/(Z2+Z1)]². The greater the impedance mismatch, the more reflection occurs."
      }
    ]
  },
  {
    id: 2,
    title: "Transducers and Sound Beams",
    description: "Transducer types, beam characteristics, focusing, and array technologies",
    color: "bg-green-500",
    icon: "FiRadio",
    questions: [
      {
        id: 26,
        question: "Linear array transducers produce what type of image format?",
        options: [
          "Sector",
          "Rectangular",
          "Trapezoidal",
          "Circular"
        ],
        correct: 1,
        explanation: "Linear arrays fire groups of elements sequentially, creating parallel scan lines and a rectangular image format."
      },
      {
        id: 27,
        question: "Phased array transducers are primarily used for:",
        options: [
          "Superficial imaging",
          "Cardiac imaging",
          "Vascular only",
          "3D only"
        ],
        correct: 1,
        explanation: "Phased arrays create sector images from a small footprint, ideal for imaging through intercostal spaces in cardiac applications."
      },
      {
        id: 28,
        question: "Grating lobes are caused by:",
        options: [
          "Element spacing > λ/2",
          "Too much power",
          "Damaged elements",
          "Patient motion"
        ],
        correct: 0,
        explanation: "When array elements are spaced more than λ/2 apart, grating lobes create artifacts by sending energy in unintended directions."
      }
    ]
  },
  {
    id: 3,
    title: "Pulse-Echo Instrumentation",
    description: "System components, signal processing, and image formation",
    color: "bg-purple-500",
    icon: "FiSettings",
    questions: [
      {
        id: 46,
        question: "The pulse repetition frequency (PRF) determines:",
        options: [
          "Axial resolution",
          "Maximum imaging depth",
          "Lateral resolution",
          "Frequency"
        ],
        correct: 1,
        explanation: "PRF = c/(2 × depth). Higher PRF allows faster imaging but limits maximum depth to avoid range ambiguity."
      },
      {
        id: 47,
        question: "Time gain compensation (TGC) corrects for:",
        options: [
          "Refraction",
          "Attenuation",
          "Patient motion",
          "Electronic noise"
        ],
        correct: 1,
        explanation: "TGC amplifies deeper echoes more to compensate for attenuation, creating uniform brightness throughout the image."
      }
    ]
  },
  {
    id: 4,
    title: "Doppler Instrumentation",
    description: "Doppler principles, hemodynamics, and flow measurements",
    color: "bg-red-500",
    icon: "FiActivity",
    questions: [
      {
        id: 71,
        question: "The Doppler equation includes all except:",
        options: [
          "Transmit frequency",
          "Velocity",
          "Angle",
          "Amplitude"
        ],
        correct: 3,
        explanation: "Doppler shift = 2f₀v cos θ/c depends on frequency, velocity, and angle, but not echo amplitude."
      },
      {
        id: 72,
        question: "Maximum Doppler shift occurs at:",
        options: [
          "0 degrees",
          "45 degrees",
          "60 degrees",
          "90 degrees"
        ],
        correct: 0,
        explanation: "Cos(0°) = 1, giving maximum Doppler shift when flow is directly toward/away from the transducer."
      }
    ]
  },
  {
    id: 5,
    title: "Artifacts and Quality Assurance",
    description: "Common artifacts, bioeffects, safety, and QA procedures",
    color: "bg-orange-500",
    icon: "FiShield",
    questions: [
      {
        id: 96,
        question: "Reverberation artifact appears as:",
        options: [
          "Single bright echo",
          "Multiple equally spaced echoes",
          "Curved line",
          "Missing echoes"
        ],
        correct: 1,
        explanation: "Reverberations occur when sound bounces repeatedly between parallel reflectors, creating equally spaced echoes."
      },
      {
        id: 97,
        question: "Acoustic shadowing is caused by:",
        options: [
          "Low attenuation",
          "High attenuation or reflection",
          "Refraction",
          "High gain"
        ],
        correct: 1,
        explanation: "Strong attenuators (stones) or reflectors (gas) prevent sound transmission, creating shadows."
      }
    ]
  }
];

export const allQuestions = sections.flatMap(section => 
  section.questions.map(q => ({ ...q, sectionId: section.id }))
);