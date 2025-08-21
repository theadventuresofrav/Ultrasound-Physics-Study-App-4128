/**
 * Expanded SPI Course Data with NotebookLM Integration
 * Based on content from: https://notebooklm.google.com/notebook/ba6f8ec3-0c56-4ec0-b7b6-56f26ae100ed
 */

export const spiCoursesExpanded = {
  title: "Comprehensive SPI Exam Preparation",
  description: "Complete curriculum based on current ultrasound physics research and clinical practice",
  notebookSource: "ba6f8ec3-0c56-4ec0-b7b6-56f26ae100ed",
  
  courses: [
    {
      id: "physics-fundamentals",
      title: "Ultrasound Physics Fundamentals",
      description: "Master the core physics principles underlying diagnostic ultrasound",
      duration: "6 weeks",
      difficulty: "Beginner to Intermediate",
      modules: [
        {
          id: 1,
          title: "Wave Properties and Propagation",
          description: "Understanding sound waves and their behavior in biological tissues",
          estimatedHours: 8,
          learningObjectives: [
            "Define frequency, wavelength, period, and amplitude",
            "Calculate wave properties using fundamental equations",
            "Understand the relationship between frequency and penetration",
            "Explain how sound waves propagate through different media"
          ],
          topics: [
            {
              id: "1.1",
              title: "Sound Wave Fundamentals",
              content: `Sound waves are mechanical vibrations that propagate through matter. In diagnostic ultrasound, we use frequencies between 2-20 MHz, which are far above the audible range (20 Hz - 20 kHz).

Key Properties:
- Frequency (f): Number of cycles per second, measured in Hertz (Hz)
- Wavelength (λ): Distance between two consecutive points in phase
- Period (T): Time for one complete cycle (T = 1/f)
- Amplitude: Maximum displacement from equilibrium position

The fundamental wave equation relates these properties:
c = fλ (speed = frequency × wavelength)

In soft tissue, the average propagation speed is 1540 m/s, which forms the basis for all ultrasound calculations.`,
              keyPoints: [
                "Ultrasound frequencies range from 2-20 MHz for medical applications",
                "Higher frequencies provide better resolution but less penetration",
                "The wave equation c = fλ is fundamental to all ultrasound physics",
                "Propagation speed in soft tissue averages 1540 m/s",
                "Amplitude relates to intensity and acoustic power"
              ],
              examFocus: "Expect calculations involving frequency, wavelength, and propagation speed. Know the average speed in soft tissue (1540 m/s) and be able to calculate wavelength for different frequencies.",
              notebookQueries: [
                "What are the fundamental properties of ultrasound waves?",
                "How does frequency affect ultrasound penetration and resolution?",
                "What is the relationship between wavelength and frequency in ultrasound?"
              ]
            },
            {
              id: "1.2",
              title: "Acoustic Impedance and Tissue Interactions",
              content: `Acoustic impedance (Z) is a fundamental property that determines how ultrasound interacts with tissues. It's defined as the product of tissue density (ρ) and propagation speed (c):

Z = ρc

Measured in rayls (kg/m²·s), acoustic impedance determines:
- How much sound is reflected at tissue boundaries
- The strength of echoes returned to the transducer
- Image contrast between different tissue types

Reflection Coefficient:
The percentage of ultrasound reflected at an interface depends on the impedance difference:
R = [(Z₂ - Z₁)/(Z₂ + Z₁)]²

Where Z₁ and Z₂ are the impedances of the two tissues.

Clinical Significance:
- Large impedance differences create strong reflections (bone/soft tissue)
- Small differences allow good transmission (organ boundaries)
- Gas/tissue interfaces reflect nearly 100% of ultrasound`,
              keyPoints: [
                "Acoustic impedance Z = density × speed (ρc)",
                "Impedance mismatches determine reflection strength",
                "Reflection coefficient formula: R = [(Z₂-Z₁)/(Z₂+Z₁)]²",
                "Air/tissue interface reflects ~99.9% of ultrasound",
                "Coupling gel eliminates air to improve transmission"
              ],
              examFocus: "Know the impedance formula and reflection coefficient calculation. Understand why gel is necessary and which tissue interfaces create the strongest reflections.",
              notebookQueries: [
                "How is acoustic impedance calculated and why is it important?",
                "What causes ultrasound reflection at tissue interfaces?",
                "Why is coupling gel necessary for ultrasound imaging?"
              ]
            }
          ],
          quiz: {
            id: "quiz-physics-1",
            questions: [
              {
                id: "pf1-1",
                question: "If an ultrasound wave has a frequency of 5 MHz and travels through soft tissue at 1540 m/s, what is its wavelength?",
                options: [
                  "0.31 mm",
                  "0.62 mm", 
                  "1.54 mm",
                  "3.08 mm"
                ],
                correctAnswer: 0,
                explanation: "Using λ = c/f: λ = 1540 m/s ÷ 5,000,000 Hz = 0.000308 m = 0.31 mm"
              },
              {
                id: "pf1-2", 
                question: "What happens to wavelength when frequency increases in the same medium?",
                options: [
                  "Wavelength increases proportionally",
                  "Wavelength decreases inversely",
                  "Wavelength remains constant", 
                  "Wavelength increases exponentially"
                ],
                correctAnswer: 1,
                explanation: "Wavelength and frequency are inversely related (λ = c/f). When frequency increases, wavelength decreases proportionally."
              }
            ]
          }
        },
        {
          id: 2,
          title: "Attenuation and Tissue Characterization", 
          description: "How ultrasound energy decreases with depth and tissue-specific properties",
          estimatedHours: 6,
          topics: [
            {
              id: "2.1",
              title: "Attenuation Mechanisms",
              content: `Attenuation is the decrease in ultrasound intensity as it travels through tissue. It occurs through several mechanisms:

1. Absorption (Primary mechanism ~80%):
   - Ultrasound energy converted to heat
   - Increases with frequency
   - Tissue-dependent (muscle > fat > blood)

2. Scattering (~13%):
   - Rayleigh scattering (particles << λ)
   - Non-Rayleigh scattering (particles ≈ λ)
   - Backscattering creates image texture

3. Beam Divergence (~5%):
   - Natural spreading of the ultrasound beam
   - Geometric effect, not tissue interaction

4. Reflection (~2%):
   - Specular reflection from large interfaces
   - Creates strong echoes but removes energy

Attenuation Coefficient:
- Measured in dB/cm/MHz
- Average in soft tissue: 0.5 dB/cm/MHz
- Varies significantly between tissue types`,
              keyPoints: [
                "Attenuation = absorption + scattering + beam divergence + reflection",
                "Absorption is the dominant mechanism (~80%)",
                "Attenuation coefficient averages 0.5 dB/cm/MHz in soft tissue",
                "Higher frequencies attenuate more rapidly",
                "Scattering provides image texture and diagnostic information"
              ],
              examFocus: "Know the attenuation coefficient for soft tissue and understand how frequency affects penetration depth.",
              notebookQueries: [
                "What are the main mechanisms of ultrasound attenuation?",
                "How does frequency affect ultrasound attenuation in tissue?",
                "What is the typical attenuation coefficient for soft tissue?"
              ]
            }
          ]
        }
      ]
    },
    {
      id: "transducer-technology",
      title: "Transducer Technology and Beam Physics",
      description: "Comprehensive study of ultrasound transducers and beam characteristics",
      duration: "4 weeks", 
      difficulty: "Intermediate",
      modules: [
        {
          id: 1,
          title: "Piezoelectric Principles and Materials",
          description: "Understanding the fundamental transduction mechanism",
          estimatedHours: 6,
          topics: [
            {
              id: "1.1",
              title: "The Piezoelectric Effect",
              content: `The piezoelectric effect is the foundation of ultrasound transduction, discovered by Pierre and Jacques Curie in 1880. It describes the ability of certain materials to generate electric charge when mechanically stressed, and conversely, to deform when an electric field is applied.

Direct Piezoelectric Effect (Receive Mode):
- Mechanical pressure generates electrical voltage
- Returning ultrasound echoes create pressure waves
- Piezoelectric element converts pressure to electrical signals
- Signal amplitude proportional to pressure magnitude

Inverse Piezoelectric Effect (Transmit Mode):
- Applied voltage causes mechanical deformation
- Rapid voltage changes create vibrations
- Vibrations generate ultrasound waves
- Frequency determined by element thickness and material properties

Modern Piezoelectric Materials:
1. Lead Zirconate Titanate (PZT):
   - Most common in medical transducers
   - High piezoelectric sensitivity
   - Stable over temperature ranges

2. Composite Materials:
   - PZT ceramic in polymer matrix
   - Improved acoustic matching
   - Reduced acoustic crosstalk
   - Better bandwidth characteristics

3. Single Crystal Materials (PMN-PT):
   - Superior electromechanical coupling
   - Higher sensitivity than PZT
   - Used in premium transducers`,
              keyPoints: [
                "Piezoelectric effect enables both transmission and reception",
                "Direct effect: pressure → voltage (receive mode)",
                "Inverse effect: voltage → mechanical deformation (transmit mode)",
                "PZT is the most common piezoelectric material",
                "Composite materials improve performance characteristics"
              ],
              examFocus: "Understand both direct and inverse piezoelectric effects and their roles in ultrasound transduction.",
              notebookQueries: [
                "How does the piezoelectric effect work in ultrasound transducers?",
                "What are the advantages of composite piezoelectric materials?",
                "How do single crystal materials compare to traditional PZT?"
              ]
            }
          ]
        }
      ]
    },
    {
      id: "doppler-hemodynamics",
      title: "Doppler Ultrasound and Hemodynamics", 
      description: "Comprehensive study of Doppler principles and blood flow assessment",
      duration: "5 weeks",
      difficulty: "Intermediate to Advanced",
      modules: [
        {
          id: 1,
          title: "Doppler Physics and Mathematics",
          description: "Mathematical foundations of the Doppler effect in ultrasound",
          estimatedHours: 8,
          topics: [
            {
              id: "1.1",
              title: "The Doppler Equation and Its Applications",
              content: `The Doppler effect, first described by Christian Doppler in 1842, describes the frequency change that occurs when there is relative motion between a source and observer. In medical ultrasound, this principle enables measurement of blood flow velocity.

The Ultrasound Doppler Equation:
Δf = 2f₀(v cos θ)/c

Where:
- Δf = Doppler shift frequency
- f₀ = transmitted frequency
- v = velocity of moving reflector (blood)
- θ = angle between ultrasound beam and flow direction
- c = speed of sound in tissue (1540 m/s)

Key Factors:

1. Factor of 2:
   - Accounts for round-trip propagation
   - Sound travels to moving target and back
   - Each leg contributes to frequency shift

2. Cosine Factor (cos θ):
   - Maximum shift at 0° (parallel to flow)
   - Zero shift at 90° (perpendicular to flow)
   - Optimal clinical angle: 45-60°

3. Frequency Dependence:
   - Higher transmit frequencies → larger Doppler shifts
   - Better sensitivity to slow flow
   - Increased attenuation limits depth

Velocity Calculation:
Rearranging the Doppler equation to solve for velocity:
v = (Δf × c)/(2f₀ × cos θ)

Clinical Applications:
- Blood velocity measurement
- Flow direction determination
- Volume flow calculation (when combined with vessel area)
- Pressure gradient estimation (using Bernoulli equation)`,
              keyPoints: [
                "Doppler shift is proportional to both frequency and velocity",
                "The factor of 2 accounts for round-trip propagation",
                "Angle correction is critical for accurate velocity measurement",
                "Maximum sensitivity occurs at 0° angle (parallel flow)",
                "No Doppler shift occurs at 90° (perpendicular flow)"
              ],
              examFocus: "Master the Doppler equation and be able to calculate velocity from Doppler shift. Understand angle dependence and clinical angle optimization.",
              notebookQueries: [
                "How is the Doppler equation derived and what do each of its components represent?",
                "Why is angle correction necessary in Doppler ultrasound?",
                "How does the Doppler angle affect measurement accuracy?"
              ]
            },
            {
              id: "1.2",
              title: "Spectral Doppler Analysis",
              content: `Spectral Doppler provides detailed analysis of flow characteristics by displaying the frequency spectrum over time. This technique reveals information about flow patterns, turbulence, and vascular pathology.

Spectral Display Components:

1. Frequency/Velocity Axis (Vertical):
   - Displays range of frequencies present
   - Can be converted to velocity with angle correction
   - Scale adjusted based on PRF and angle

2. Time Axis (Horizontal):
   - Shows changes in flow over cardiac cycle
   - Sweep speed adjustable for detail or overview
   - Typically 1-4 seconds displayed

3. Amplitude/Power (Brightness):
   - Brightness indicates number of cells at each velocity
   - Darker = more cells moving at that velocity
   - Creates the spectral envelope

Waveform Analysis Parameters:

1. Peak Systolic Velocity (PSV):
   - Maximum velocity during systole
   - Indicates degree of stenosis when elevated
   - Normal values vary by vessel and age

2. End Diastolic Velocity (EDV):
   - Velocity at end of diastole
   - Reflects downstream resistance
   - May be absent in high-resistance beds

3. Resistivity Index (RI):
   - RI = (PSV - EDV)/PSV
   - Range: 0-1.0
   - Higher values indicate increased resistance

4. Pulsatility Index (PI):
   - PI = (PSV - EDV)/Mean velocity
   - More sensitive to changes in resistance
   - Useful in cerebral and renal circulation

Flow Pattern Recognition:

1. Laminar Flow:
   - Narrow spectral band
   - Clear spectral window
   - Smooth velocity profile

2. Turbulent Flow:
   - Spectral broadening
   - Filled spectral window
   - Multiple velocities simultaneously

3. Plug Flow:
   - Uniform velocity across vessel
   - Occurs in large vessels with high flow
   - Narrow spectral band with blunt profile`,
              keyPoints: [
                "Spectral Doppler displays frequency spectrum over time",
                "PSV and EDV are key velocity measurements",
                "RI and PI quantify vascular resistance",
                "Spectral broadening indicates turbulence",
                "Clear spectral window suggests laminar flow"
              ],
              examFocus: "Know how to calculate RI and PI from spectral waveforms. Understand the difference between laminar and turbulent flow patterns.",
              notebookQueries: [
                "What information can be obtained from spectral Doppler analysis?",
                "How do resistivity index and pulsatility index differ?",
                "What causes spectral broadening in Doppler waveforms?"
              ]
            }
          ]
        }
      ]
    },
    {
      id: "artifacts-qa",
      title: "Artifacts and Quality Assurance",
      description: "Recognition, understanding, and management of ultrasound artifacts",
      duration: "3 weeks",
      difficulty: "Intermediate to Advanced", 
      modules: [
        {
          id: 1,
          title: "Physics-Based Artifact Analysis",
          description: "Understanding artifacts through their underlying physics",
          estimatedHours: 10,
          topics: [
            {
              id: "1.1",
              title: "Assumption-Based Artifacts",
              content: `Ultrasound imaging systems make several assumptions about sound propagation that, when violated, create artifacts. Understanding these assumptions is crucial for artifact recognition and management.

System Assumptions:

1. Constant Propagation Speed (1540 m/s):
   - Reality: Speed varies with tissue type
   - Fat: ~1450 m/s (slower)
   - Muscle: ~1580 m/s (faster)
   - Bone: ~4080 m/s (much faster)

2. Straight-Line Propagation:
   - Reality: Sound can bend (refraction) or take indirect paths
   - Refraction occurs at tissue boundaries
   - Multipath propagation possible

3. Single Scattering Events:
   - Reality: Multiple reflections can occur
   - Reverberations between strong reflectors
   - Creates false echoes at incorrect depths

Speed Displacement Artifacts:

When actual propagation speed differs from assumed 1540 m/s:
- Faster media: structures appear deeper than actual
- Slower media: structures appear shallower than actual
- Common in fatty tissue (appears closer)
- Significant in bone imaging (appears much deeper)

Range Ambiguity:
Occurs when PRF is too high for imaging depth:
- Deep echoes arrive after next pulse transmitted
- Mapped to incorrect shallow depths
- "Wraparound" artifact in deep imaging
- Solution: Reduce PRF or imaging depth

Multipath Artifacts:
Sound takes indirect path to target:
- Longer path = greater time delay
- Structure appears deeper than actual location
- Common near curved interfaces (diaphragm)
- Creates duplicate images at wrong depths`,
              keyPoints: [
                "Ultrasound systems assume constant 1540 m/s propagation speed",
                "Speed variations cause depth measurement errors", 
                "Range ambiguity occurs with excessive PRF for depth",
                "Multipath creates false images at incorrect locations",
                "Understanding assumptions helps predict artifact occurrence"
              ],
              examFocus: "Know the basic assumptions made by ultrasound systems and how their violation creates specific artifacts.",
              notebookQueries: [
                "What assumptions do ultrasound systems make about sound propagation?",
                "How do variations in propagation speed affect image accuracy?",
                "What causes range ambiguity artifacts and how can they be avoided?"
              ]
            },
            {
              id: "1.2", 
              title: "Attenuation-Related Artifacts",
              content: `Attenuation variations create some of the most commonly encountered artifacts in diagnostic ultrasound. These artifacts can either obscure pathology or mimic disease processes.

Acoustic Shadowing:

Mechanism:
- Strong attenuation or reflection blocks sound transmission
- Reduced or absent echoes distal to attenuating structure
- Creates hypoechoic or anechoic regions

Causes:
1. Gallstones and kidney stones (high attenuation)
2. Bone interfaces (strong reflection)
3. Gas bubbles (impedance mismatch)
4. Calcifications (increased attenuation)

Clinical Significance:
- Can obscure pathology behind shadowing structure
- May be used diagnostically (gallstone detection)
- Edge shadows can mimic cystic structures

Acoustic Enhancement (Through-Transmission):

Mechanism:
- Low-attenuating structures preserve sound energy
- Increased echo amplitude distal to structure
- Creates hyperechoic regions behind fluid

Causes:
1. Fluid-filled structures (cysts, bladder, gallbladder)
2. Blood vessels
3. Amniotic fluid
4. Any homogeneous fluid collection

Clinical Applications:
- Confirms fluid nature of structures
- Helps differentiate cysts from solid masses
- Enhances visualization of deep structures

Focal Enhancement/Banding:
- Occurs at natural focus or electronic focal zones
- Increased brightness at focal depth
- Normal phenomenon, not pathological
- Can be minimized with proper TGC adjustment

Attenuation Compensation Errors:
- TGC settings inappropriate for tissue
- Over-compensation: excessive deep gain
- Under-compensation: inadequate deep gain
- Affects image uniformity and diagnosis`,
              keyPoints: [
                "Shadowing occurs behind highly attenuating structures",
                "Enhancement occurs behind low-attenuating (fluid) structures", 
                "Both artifacts can be diagnostically useful",
                "Proper TGC adjustment minimizes attenuation artifacts",
                "Understanding tissue attenuation properties predicts artifact occurrence"
              ],
              examFocus: "Distinguish between shadowing and enhancement artifacts. Know which structures cause each type and their diagnostic significance.",
              notebookQueries: [
                "What causes acoustic shadowing and how can it be minimized?",
                "How does acoustic enhancement help in ultrasound diagnosis?", 
                "What is the relationship between tissue attenuation and artifact formation?"
              ]
            }
          ]
        }
      ]
    },
    {
      id: "advanced-techniques",
      title: "Advanced Imaging Techniques and Emerging Technologies",
      description: "Modern ultrasound technologies and future developments",
      duration: "4 weeks",
      difficulty: "Advanced",
      modules: [
        {
          id: 1,
          title: "Harmonic Imaging and Contrast Agents",
          description: "Non-linear imaging techniques and microbubble contrast",
          estimatedHours: 8,
          topics: [
            {
              id: "1.1",
              title: "Tissue Harmonic Imaging",
              content: `Tissue Harmonic Imaging (THI) exploits the non-linear propagation properties of ultrasound in tissue to improve image quality. This technique has become standard in many clinical applications due to its superior image quality.

Non-Linear Propagation:
At diagnostic intensities, ultrasound exhibits non-linear behavior:
- Compression phases travel faster than rarefaction phases
- Waveform distortion increases with depth
- Harmonic frequencies generated within tissue
- Second harmonic (2f₀) most commonly used

Harmonic Generation Mechanism:
1. Fundamental frequency (f₀) transmitted
2. Non-linear propagation distorts waveform
3. Harmonic frequencies (2f₀, 3f₀, etc.) created
4. Receive only at harmonic frequency
5. Fundamental frequency filtered out

Advantages of THI:
1. Improved Lateral Resolution:
   - Harmonic beam narrower than fundamental
   - Better focusing characteristics
   - Reduced side lobe artifacts

2. Reduced Clutter:
   - Near-field artifacts minimized
   - Reverberations reduced
   - Cleaner image appearance

3. Better Penetration in Difficult Patients:
   - Improved SNR in challenging body habitus
   - Reduced aberration effects
   - Enhanced contrast resolution

Technical Considerations:
- Requires broader bandwidth transducers
- Pulse inversion or filtered harmonic techniques
- Reduced frame rate (multiple pulses required)
- Optimal at intermediate depths (2-8 cm)

Clinical Applications:
- Abdominal imaging in obese patients
- Cardiac imaging through lung interference
- Improved visualization of subtle pathology
- Enhanced border definition`,
              keyPoints: [
                "Harmonic imaging uses frequencies generated by non-linear propagation",
                "Second harmonic (2f₀) most commonly utilized",
                "Provides improved lateral resolution and reduced artifacts", 
                "Particularly beneficial in challenging patients",
                "Requires specialized pulse sequences and processing"
              ],
              examFocus: "Understand the physics of harmonic generation and the advantages of harmonic imaging over fundamental imaging.",
              notebookQueries: [
                "How does tissue harmonic imaging improve image quality?",
                "What causes the generation of harmonic frequencies in tissue?",
                "What are the technical requirements for harmonic imaging?"
              ]
            }
          ]
        }
      ]
    }
  ],

  assessments: {
    comprehensiveExam: {
      id: "spi-comprehensive-2025",
      title: "SPI Comprehensive Practice Examination",
      description: "Full-length examination based on expanded course content",
      timeLimit: 150, // minutes
      passingScore: 75,
      questionCount: 110,
      sections: [
        {
          name: "Physics Fundamentals", 
          questions: 30,
          topics: ["Wave properties", "Acoustic impedance", "Attenuation", "Reflection/Refraction"]
        },
        {
          name: "Transducer Technology",
          questions: 25, 
          topics: ["Piezoelectric effect", "Beam characteristics", "Array technologies", "Focusing"]
        },
        {
          name: "Doppler and Hemodynamics",
          questions: 25,
          topics: ["Doppler equation", "Spectral analysis", "Flow patterns", "Hemodynamic calculations"]
        },
        {
          name: "Artifacts and QA",
          questions: 20,
          topics: ["Artifact physics", "Quality assurance", "Performance testing", "Safety"]
        },
        {
          name: "Advanced Techniques", 
          questions: 10,
          topics: ["Harmonic imaging", "3D/4D", "Elastography", "Contrast agents"]
        }
      ]
    }
  },

  resources: {
    notebookIntegration: {
      notebookId: "ba6f8ec3-0c56-4ec0-b7b6-56f26ae100ed",
      description: "Google NotebookLM integration for enhanced learning",
      features: [
        "AI-powered question answering",
        "Dynamic content generation", 
        "Personalized study recommendations",
        "Real-time content updates"
      ]
    },
    supplementaryMaterials: [
      {
        title: "Interactive Physics Calculators",
        type: "Tool",
        description: "Web-based calculators for ultrasound physics problems"
      },
      {
        title: "3D Beam Visualization", 
        type: "Simulation",
        description: "Interactive 3D models of ultrasound beam propagation"
      },
      {
        title: "Artifact Recognition Trainer",
        type: "Interactive",
        description: "AI-powered artifact identification and explanation system"
      }
    ]
  }
};