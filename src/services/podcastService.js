/**
 * Study Resources Service
 * Manages educational content and study materials for ultrasound physics
 */

// Study resource categories
export const RESOURCE_CATEGORIES = [
  { id: 'physics', label: 'Physics Fundamentals', color: 'blue' },
  { id: 'transducers', label: 'Transducers', color: 'green' },
  { id: 'doppler', label: 'Doppler', color: 'red' },
  { id: 'artifacts', label: 'Artifacts', color: 'purple' },
  { id: 'safety', label: 'Safety & QA', color: 'orange' }
];

// Study materials data
export const STUDY_MATERIALS = [
  {
    id: 'physics-basics',
    title: 'Ultrasound Physics Fundamentals',
    description: 'Master the basic principles of ultrasound wave propagation, frequency, and wavelength relationships.',
    category: 'physics',
    type: 'Interactive Tutorial',
    difficulty: 'Beginner',
    estimatedTime: '30 minutes'
  },
  {
    id: 'transducer-types',
    title: 'Understanding Transducer Technology',
    description: 'Learn about different transducer types, their applications, and how they affect image quality.',
    category: 'transducers',
    type: 'Visual Guide',
    difficulty: 'Intermediate',
    estimatedTime: '25 minutes'
  },
  {
    id: 'doppler-principles',
    title: 'Doppler Effect in Medical Imaging',
    description: 'Learn how the Doppler effect enables blood flow measurement and color flow imaging.',
    category: 'doppler',
    type: 'Interactive Simulation',
    difficulty: 'Intermediate',
    estimatedTime: '35 minutes'
  },
  {
    id: 'artifact-recognition',
    title: 'Common Ultrasound Artifacts',
    description: 'Identify and understand the physics behind common ultrasound imaging artifacts.',
    category: 'artifacts',
    type: 'Case Studies',
    difficulty: 'Advanced',
    estimatedTime: '40 minutes'
  },
  {
    id: 'safety-bioeffects',
    title: 'Safety and Bioeffects',
    description: 'Understand ALARA principles, thermal and mechanical indices, and safe scanning practices.',
    category: 'safety',
    type: 'Comprehensive Guide',
    difficulty: 'Intermediate',
    estimatedTime: '30 minutes'
  }
];

/**
 * Fetches study materials based on category and difficulty
 * @param {string} category - Category to filter by
 * @param {string} difficulty - Difficulty level to filter by
 * @returns {Promise<Array>} Array of study materials
 */
export async function fetchStudyMaterials(category = 'all', difficulty = 'all') {
  // Simulate API call with delay
  await new Promise(resolve => setTimeout(resolve, 500));

  let materials = [...STUDY_MATERIALS];

  if (category !== 'all') {
    materials = materials.filter(material => material.category === category);
  }

  if (difficulty !== 'all') {
    materials = materials.filter(material => material.difficulty === difficulty);
  }

  return {
    materials,
    totalCount: materials.length,
    categories: RESOURCE_CATEGORIES
  };
}

/**
 * Searches study materials by query
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of matching study materials
 */
export async function searchStudyMaterials(query) {
  // Simulate API call with delay
  await new Promise(resolve => setTimeout(resolve, 300));

  if (!query || query.trim() === '') {
    return STUDY_MATERIALS;
  }

  const normalizedQuery = query.toLowerCase().trim();
  
  return STUDY_MATERIALS.filter(material => {
    return (
      material.title.toLowerCase().includes(normalizedQuery) ||
      material.description.toLowerCase().includes(normalizedQuery) ||
      material.category.toLowerCase().includes(normalizedQuery) ||
      material.type.toLowerCase().includes(normalizedQuery)
    );
  });
}

/**
 * Gets recommended study materials based on user progress
 * @param {Object} userProgress - User's study progress data
 * @returns {Array} Array of recommended materials
 */
export function getRecommendedMaterials(userProgress) {
  const recommendations = [];

  // If user is struggling with basic physics, recommend fundamentals
  if (userProgress?.weakAreas?.includes('basic-physics') || !userProgress?.sectionsCompleted?.length) {
    recommendations.push(...STUDY_MATERIALS.filter(material => 
      material.category === 'physics' && material.difficulty === 'Beginner'
    ));
  }

  // If user is studying Doppler, recommend Doppler materials
  if (userProgress?.currentSection?.includes('Doppler')) {
    recommendations.push(...STUDY_MATERIALS.filter(material => 
      material.category === 'doppler'
    ));
  }

  // If user is studying artifacts, recommend artifact materials
  if (userProgress?.currentSection?.includes('Artifact')) {
    recommendations.push(...STUDY_MATERIALS.filter(material => 
      material.category === 'artifacts'
    ));
  }

  // Remove duplicates and limit to 3-5 recommendations
  const uniqueRecommendations = recommendations.filter((material, index, self) => 
    index === self.findIndex(m => m.id === material.id)
  );

  return uniqueRecommendations.slice(0, 5);
}

/**
 * Gets study material by ID
 * @param {string} materialId - ID of the study material
 * @returns {Object|null} Study material or null if not found
 */
export function getStudyMaterialById(materialId) {
  return STUDY_MATERIALS.find(material => material.id === materialId) || null;
}

/**
 * Filters study materials by multiple criteria
 * @param {Object} filters - Filter criteria
 * @returns {Array} Filtered study materials
 */
export function filterStudyMaterials(filters = {}) {
  let materials = [...STUDY_MATERIALS];

  if (filters.category && filters.category !== 'all') {
    materials = materials.filter(material => material.category === filters.category);
  }

  if (filters.difficulty && filters.difficulty !== 'all') {
    materials = materials.filter(material => material.difficulty === filters.difficulty);
  }

  if (filters.type && filters.type !== 'all') {
    materials = materials.filter(material => material.type === filters.type);
  }

  if (filters.maxTime) {
    materials = materials.filter(material => {
      const timeInMinutes = parseInt(material.estimatedTime);
      return timeInMinutes <= filters.maxTime;
    });
  }

  return materials;
}