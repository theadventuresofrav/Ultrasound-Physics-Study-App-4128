/**
 * Enhanced Knowledge Service for integrating with Google NotebookLM
 * This service provides methods to query NotebookLM notebooks as a knowledge base
 */

const NOTEBOOK_ID = 'ba6f8ec3-0c56-4ec0-b7b6-56f26ae100ed';
const API_ENDPOINT = 'https://notebooklm-api-proxy.questera.app';

// Fallback responses for common ultrasound physics topics
const FALLBACK_RESPONSES = {
  'acoustic impedance': {
    answer: `Acoustic impedance (Z) is a fundamental property that determines how ultrasound interacts with tissues. It's calculated as:

Z = ρ × c (density × propagation speed)

Key points:
• Measured in rayls (kg/m²·s)
• Determines reflection at tissue interfaces
• Large impedance differences = strong reflections
• Air/tissue interface reflects ~99.9% of ultrasound
• This is why coupling gel is essential

The reflection coefficient formula is:
R = [(Z₂ - Z₁)/(Z₂ + Z₁)]²

Clinical significance: Understanding impedance helps explain why certain structures appear bright (strong reflectors) or why shadows form behind gas or bone.`,
    sources: ['Ultrasound Physics Fundamentals']
  },
  
  'doppler effect': {
    answer: `The Doppler effect describes frequency changes when there's relative motion between sound source and observer.

The Doppler equation for ultrasound is:
Δf = 2f₀(v cos θ)/c

Where:
• Δf = Doppler shift frequency
• f₀ = transmitted frequency  
• v = velocity of moving reflector (blood)
• θ = angle between beam and flow
• c = speed of sound (1540 m/s)

Key concepts:
• Maximum shift at 0° (parallel flow)
• No shift at 90° (perpendicular flow)
• Factor of 2 accounts for round-trip
• Higher frequencies = greater sensitivity

Clinical applications: Blood flow measurement, direction determination, stenosis assessment.`,
    sources: ['Doppler Ultrasound Principles']
  },

  'piezoelectric effect': {
    answer: `The piezoelectric effect is the foundation of ultrasound transduction. It works in two ways:

Direct Effect (Receive Mode):
• Mechanical pressure → electrical voltage
• Returning echoes create pressure waves
• Crystal converts pressure to electrical signals

Inverse Effect (Transmit Mode):
• Electrical voltage → mechanical deformation
• Voltage changes create vibrations
• Vibrations generate ultrasound waves

Materials:
• PZT (Lead Zirconate Titanate) - most common
• Composite materials - improved performance
• Single crystal materials - premium transducers

The element thickness determines resonant frequency:
f₀ = c/(2t)

This effect enables both transmission and reception of ultrasound waves in medical imaging.`,
    sources: ['Transducer Technology']
  },

  'transducer': {
    answer: `Ultrasound transducers convert electrical energy to sound waves and vice versa using the piezoelectric effect.

Key components:
• Piezoelectric element - active component
• Backing material - dampens vibrations
• Matching layer - improves transmission
• Acoustic lens - focuses beam

Types of transducers:
• Linear arrays - rectangular images, high frequency
• Curved arrays - wider field of view, medium frequency  
• Phased arrays - sector images, cardiac imaging
• Matrix arrays - 3D/4D imaging

Selection factors:
• Frequency (resolution vs penetration)
• Field of view requirements
• Clinical application
• Patient body habitus

Proper care includes cleaning, inspection, and appropriate storage to maintain performance.`,
    sources: ['Transducer Design and Applications']
  },

  'artifacts': {
    answer: `Ultrasound artifacts are structures that appear in images but don't correspond to actual anatomy. Understanding their physics helps distinguish them from pathology.

Common artifacts:

Reverberation:
• Multiple reflections between parallel surfaces
• Appears as equally spaced echoes
• Reduce by changing angle or using harmonics

Acoustic Shadowing:
• Strong attenuation blocks sound transmission
• Dark area behind stones, gas, bone
• Can be diagnostic (gallstones)

Acoustic Enhancement:
• Low attenuation preserves sound energy
• Bright area behind fluid structures
• Confirms fluid nature of masses

Mirror Image:
• Strong reflector acts as mirror
• Creates duplicate image
• Common with diaphragm

Side Lobe Artifacts:
• Off-axis energy detects strong reflectors
• False echoes in wrong locations
• Reduce with apodization

Understanding artifact physics improves diagnostic accuracy.`,
    sources: ['Ultrasound Artifacts and Physics']
  },

  'resolution': {
    answer: `Resolution in ultrasound refers to the ability to distinguish between two closely spaced objects.

Types of Resolution:

Axial Resolution:
• Along the beam axis (depth)
• Equals ½ × spatial pulse length
• Improved by: higher frequency, shorter pulses, broader bandwidth
• Typical values: 0.1-1.0 mm

Lateral Resolution:
• Perpendicular to beam axis
• Equals beam width
• Best at focal zone
• Improved by: higher frequency, focusing, larger aperture

Elevational Resolution:
• Perpendicular to scan plane (slice thickness)
• Determined by beam thickness
• Often focused with acoustic lens
• Affects volume averaging

Temporal Resolution:
• Ability to track motion over time
• Determined by frame rate
• Trade-off with line density and depth

Contrast Resolution:
• Ability to distinguish between tissues with similar echogenicity
• Improved by: optimal gain settings, proper TGC, harmonic imaging`,
    sources: ['Resolution in Ultrasound Imaging']
  }
};

/**
 * Query the NotebookLM notebook with a specific question
 * @param {string} question - The question to ask the knowledge base
 * @returns {Promise<Object>} - The response from NotebookLM
 */
export async function queryKnowledgeBase(question) {
  try {
    // First, try the actual API
    const response = await fetch(`${API_ENDPOINT}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notebookId: NOTEBOOK_ID,
        query: question,
      }),
    });

    if (!response.ok) {
      throw new Error(`NotebookLM API returned ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.warn('NotebookLM API unavailable, using fallback content:', error);
    
    // Use fallback content based on question keywords
    const questionLower = question.toLowerCase();
    
    for (const [key, content] of Object.entries(FALLBACK_RESPONSES)) {
      if (questionLower.includes(key) || questionLower.includes(key.replace(/\s+/g, ''))) {
        return content;
      }
    }
    
    // Generic fallback if no specific match
    return {
      answer: `I'd be happy to help you understand ultrasound physics concepts! Your question about "${question}" touches on important principles in diagnostic ultrasound.

For comprehensive information on this topic, I recommend:

• Reviewing your ultrasound physics textbook
• Using our interactive physics tools
• Practicing with related quiz questions
• Consulting the SPI exam content outline

Would you like me to explain a specific ultrasound physics concept instead? I can help with topics like:
- Wave propagation and tissue interactions
- Transducer technology and beam characteristics  
- Doppler principles and hemodynamics
- Common artifacts and their causes
- Safety principles and bioeffects`,
      sources: ['General Ultrasound Physics Knowledge']
    };
  }
}

/**
 * Get related content from NotebookLM for a specific topic
 * @param {string} topic - The topic to find related content for
 * @returns {Promise<Array>} - Array of related content items
 */
export async function getRelatedContent(topic) {
  try {
    const response = await fetch(`${API_ENDPOINT}/related`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notebookId: NOTEBOOK_ID,
        topic: topic,
      }),
    });

    if (!response.ok) {
      throw new Error(`NotebookLM API returned ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn('Related content API unavailable, using fallback:', error);
    return generateRelatedFallback(topic);
  }
}

/**
 * Search the knowledge base for specific terms
 * @param {string} searchTerm - The term to search for
 * @returns {Promise<Array>} - Search results
 */
export async function searchKnowledgeBase(searchTerm) {
  try {
    const response = await fetch(`${API_ENDPOINT}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notebookId: NOTEBOOK_ID,
        term: searchTerm,
      }),
    });

    if (!response.ok) {
      throw new Error(`NotebookLM API returned ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn('Search API unavailable:', error);
    return [];
  }
}

// Helper functions remain the same...
function generateRelatedFallback(topic) {
  const topicLower = topic.toLowerCase();
  
  if (topicLower.includes('impedance')) {
    return [
      { title: 'Reflection Coefficients', snippet: 'How impedance differences affect ultrasound reflection' },
      { title: 'Tissue Interfaces', snippet: 'Understanding acoustic properties of different tissues' },
      { title: 'Coupling and Matching', snippet: 'Importance of acoustic coupling in imaging' }
    ];
  }
  
  if (topicLower.includes('doppler')) {
    return [
      { title: 'Color Flow Imaging', snippet: 'Principles of color Doppler display' },
      { title: 'Spectral Analysis', snippet: 'Interpreting Doppler waveforms' },
      { title: 'Aliasing and Artifacts', snippet: 'Common Doppler imaging artifacts' }
    ];
  }
  
  return [
    { title: `Advanced ${topic} Concepts`, snippet: `Explore advanced applications of ${topic}` },
    { title: `${topic} in Clinical Practice`, snippet: `Real-world applications of ${topic}` },
    { title: `${topic} Physics Principles`, snippet: `Fundamental physics underlying ${topic}` }
  ];
}

// Additional helper functions for course generation remain the same...
export async function generateCourseContent(topic, difficulty = 'intermediate') {
  try {
    const prompt = `Generate comprehensive course content for "${topic}" at ${difficulty} level for SPI exam preparation. Include:
1. Learning objectives
2. Key concepts and explanations  
3. Clinical applications
4. Common exam questions
5. Study tips`;

    const response = await queryKnowledgeBase(prompt);
    
    return {
      content: response.answer,
      keyPoints: extractKeyPoints(response.answer),
      examFocus: extractExamFocus(response.answer),
      clinicalApplications: extractClinicalApplications(response.answer)
    };
  } catch (error) {
    console.error('Error generating course content:', error);
    return generateFallbackCourseContent(topic);
  }
}

function extractKeyPoints(content) {
  const lines = content.split('\n');
  return lines
    .filter(line => line.includes('•') || line.includes('-') || /^\d+[.]/.test(line))
    .map(line => line.replace(/^[•\-\d.]\s*/, '').trim())
    .filter(line => line.length > 0)
    .slice(0, 5);
}

function extractExamFocus(content) {
  const examKeywords = ['exam', 'test', 'important', 'key', 'remember', 'focus'];
  const sentences = content.split(/[.!?]+/);
  const examSentences = sentences.filter(sentence =>
    examKeywords.some(keyword => sentence.toLowerCase().includes(keyword))
  );
  return examSentences.slice(0, 2).join('. ') + '.';
}

function extractClinicalApplications(content) {
  const clinicalKeywords = ['clinical', 'patient', 'diagnosis', 'imaging', 'application'];
  const sentences = content.split(/[.!?]+/);
  const clinicalSentences = sentences.filter(sentence =>
    clinicalKeywords.some(keyword => sentence.toLowerCase().includes(keyword))
  );
  return clinicalSentences.slice(0, 3).join('. ') + '.';
}

function generateFallbackCourseContent(topic) {
  return {
    content: `This section covers the fundamental principles of ${topic} in diagnostic ultrasound. Understanding these concepts is essential for the SPI examination and clinical practice.`,
    keyPoints: [
      `Understand the basic principles of ${topic}`,
      `Apply knowledge to clinical scenarios`,
      `Recognize common applications and limitations`,
      `Prepare for SPI exam questions on this topic`
    ],
    examFocus: `Focus on understanding the fundamental relationships and practical applications of ${topic} for the SPI examination.`,
    clinicalApplications: `${topic} has important applications in diagnostic ultrasound and patient care.`
  };
}