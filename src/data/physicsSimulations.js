// Physics simulation parameters and calculations
export const physicsSimulations = {
  soundWaves: {
    frequencies: [2, 3.5, 5, 7.5, 10, 12, 15], // MHz
    tissues: [
      { name: 'Skin', impedance: 1.99, attenuation: 0.6 },
      { name: 'Fat', impedance: 1.34, attenuation: 0.5 },
      { name: 'Muscle', impedance: 1.65, attenuation: 1.3 },
      { name: 'Blood', impedance: 1.61, attenuation: 0.18 },
      { name: 'Bone', impedance: 7.8, attenuation: 5 }
    ],
    calculations: {
      wavelength: (frequency) => 1540 / (frequency * 1e6), // mm
      penetration: (frequency, tissue) => {
        const attenuationCoeff = tissue.attenuation;
        return 20 / (frequency * attenuationCoeff); // cm
      },
      reflectionCoeff: (z1, z2) => {
        return Math.pow((z2 - z1) / (z2 + z1), 2);
      }
    }
  },
  resolution: {
    axial: (wavelength) => wavelength / 2, // mm
    lateral: (wavelength, aperture, depth) => {
      return (wavelength * depth) / aperture; // mm
    }
  },
  transducers: {
    types: [
      {
        name: 'Linear Array',
        frequencies: [5, 7.5, 10, 12, 15],
        applications: ['Small Parts', 'Vascular', 'MSK'],
        characteristics: {
          fieldOfView: 'Rectangular',
          penetration: 'Shallow to Medium',
          resolution: 'High'
        }
      },
      {
        name: 'Curved Array',
        frequencies: [2, 3.5, 5, 7.5],
        applications: ['Abdominal', 'OB/GYN', 'Deep Vascular'],
        characteristics: {
          fieldOfView: 'Curvilinear',
          penetration: 'Deep',
          resolution: 'Medium to High'
        }
      },
      {
        name: 'Phased Array',
        frequencies: [2, 2.5, 3.5, 5],
        applications: ['Cardiac', 'Transcranial'],
        characteristics: {
          fieldOfView: 'Sector',
          penetration: 'Deep',
          resolution: 'Medium'
        }
      }
    ]
  },
  artifacts: [
    {
      name: 'Acoustic Shadowing',
      cause: 'Strong attenuation or reflection',
      appearance: 'Dark area distal to strongly reflecting/attenuating structure',
      solutions: [
        'Change scanning angle',
        'Use different frequency',
        'Adjust focal zones'
      ]
    },
    {
      name: 'Enhancement',
      cause: 'Reduced attenuation through fluid',
      appearance: 'Increased echogenicity deep to fluid-filled structures',
      solutions: [
        'Adjust TGC',
        'Recognize as normal artifact',
        'Use as diagnostic tool'
      ]
    },
    {
      name: 'Reverberation',
      cause: 'Multiple reflections between parallel interfaces',
      appearance: 'Multiple equally spaced echoes',
      solutions: [
        'Change scanning angle',
        'Adjust gain',
        'Use harmonic imaging'
      ]
    }
  ]
};

export const optimizationPresets = {
  abdominal: {
    normal: {
      frequency: 3.5,
      focusZones: 2,
      gainAdjustments: {
        near: -2,
        mid: 0,
        far: +2
      }
    },
    difficult: {
      frequency: 2.5,
      focusZones: 3,
      gainAdjustments: {
        near: -3,
        mid: +1,
        far: +4
      }
    }
  },
  vascular: {
    normal: {
      frequency: 7.5,
      focusZones: 1,
      gainAdjustments: {
        near: -1,
        mid: 0,
        far: +1
      }
    },
    difficult: {
      frequency: 5,
      focusZones: 2,
      gainAdjustments: {
        near: -2,
        mid: +1,
        far: +2
      }
    }
  },
  cardiac: {
    normal: {
      frequency: 3.5,
      focusZones: 1,
      gainAdjustments: {
        near: 0,
        mid: +1,
        far: +2
      }
    },
    difficult: {
      frequency: 2.5,
      focusZones: 2,
      gainAdjustments: {
        near: -1,
        mid: +2,
        far: +4
      }
    }
  }
};