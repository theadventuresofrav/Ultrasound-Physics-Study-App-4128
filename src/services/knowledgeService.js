/**
 * Enhanced Knowledge Service for integrating with Google NotebookLM
 * This service provides methods to query NotebookLM notebooks as a knowledge base
 */

const NOTEBOOK_ID = 'ba6f8ec3-0c56-4ec0-b7b6-56f26ae100ed';
const API_ENDPOINT = 'https://notebooklm-api-proxy.questera.app';

/**
 * Query the NotebookLM notebook with a specific question
 * @param {string} question - The question to ask the knowledge base
 * @returns {Promise<Object>} - The response from NotebookLM
 */
export async function queryKnowledgeBase(question) {
  try {
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

    return await response.json();
  } catch (error) {
    console.error('Error querying knowledge base:', error);
    // Return fallback content for offline/error scenarios
    return {
      answer: generateFallbackContent(question),
      sources: [],
      confidence: 0.5
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
    console.error('Error getting related content:', error);
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
    console.error('Error searching knowledge base:', error);
    return [];
  }
}

/**
 * Generate course content using NotebookLM
 * @param {string} topic - The topic for content generation
 * @param {string} difficulty - The difficulty level
 * @returns {Promise<Object>} - Generated course content
 */
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

/**
 * Generate quiz questions based on topic content
 * @param {string} topic - The topic for quiz generation
 * @param {number} count - Number of questions to generate
 * @returns {Promise<Array>} - Array of quiz questions
 */
export async function generateQuizQuestions(topic, count = 5) {
  try {
    const prompt = `Generate ${count} multiple-choice questions for "${topic}" suitable for SPI exam preparation. Each question should have:
    1. Clear, concise question stem
    2. Four plausible answer choices (A, B, C, D)
    3. Correct answer indicated
    4. Detailed explanation of the correct answer
    5. Reference to relevant physics principles`;

    const response = await queryKnowledgeBase(prompt);
    return parseQuizQuestions(response.answer);
  } catch (error) {
    console.error('Error generating quiz questions:', error);
    return generateFallbackQuiz(topic, count);
  }
}

// Helper functions for content processing

function extractKeyPoints(content) {
  // Simple extraction logic - in production, use more sophisticated NLP
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

function parseQuizQuestions(content) {
  // Simple parser - in production, use more robust parsing
  const questions = [];
  const questionBlocks = content.split(/Question \d+:|Q\d+:/);
  
  questionBlocks.slice(1).forEach((block, index) => {
    const lines = block.trim().split('\n');
    if (lines.length >= 6) {
      const question = lines[0].trim();
      const options = lines.slice(1, 5).map(line => line.replace(/^[A-D][.)]?\s*/, '').trim());
      const answerLine = lines.find(line => line.toLowerCase().includes('answer'));
      const explanation = lines.slice(-2).join(' ').trim();
      
      if (question && options.length === 4) {
        questions.push({
          id: `nb-q${index + 1}`,
          question,
          options,
          correctAnswer: answerLine ? answerLine.match(/[A-D]/)?.[0]?.charCodeAt(0) - 65 || 0 : 0,
          explanation: explanation || 'Detailed explanation from NotebookLM content.'
        });
      }
    }
  });
  
  return questions;
}

// Fallback content generators for offline scenarios

function generateFallbackContent(question) {
  const fallbacks = {
    'ultrasound physics': 'Ultrasound physics involves the study of mechanical waves with frequencies above human hearing (>20 kHz). In medical applications, frequencies typically range from 2-20 MHz.',
    'doppler effect': 'The Doppler effect describes the change in frequency when there is relative motion between the sound source and observer. In ultrasound, this enables measurement of blood flow velocity.',
    'piezoelectric effect': 'The piezoelectric effect is the ability of certain materials to generate electrical charge when mechanically stressed, and conversely, to deform when electrical voltage is applied.',
    'acoustic impedance': 'Acoustic impedance is the product of tissue density and propagation speed (Z = ρc). Impedance differences determine how much ultrasound is reflected at tissue interfaces.'
  };
  
  const key = Object.keys(fallbacks).find(k => question.toLowerCase().includes(k));
  return key ? fallbacks[key] : 'This topic requires advanced ultrasound physics knowledge. Please refer to your textbook for detailed information.';
}

function generateRelatedFallback(topic) {
  return [
    {
      title: `Advanced ${topic} Concepts`,
      snippet: `Explore advanced applications and clinical considerations for ${topic} in diagnostic ultrasound.`
    },
    {
      title: `${topic} in Clinical Practice`,
      snippet: `Real-world applications and case studies demonstrating ${topic} principles in medical imaging.`
    }
  ];
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

function generateFallbackQuiz(topic, count) {
  const baseQuestion = {
    id: 'fallback-1',
    question: `What is a key principle of ${topic} in ultrasound physics?`,
    options: [
      'Fundamental concept A',
      'Fundamental concept B', 
      'Fundamental concept C',
      'Fundamental concept D'
    ],
    correctAnswer: 0,
    explanation: `This question tests understanding of ${topic} principles essential for the SPI exam.`
  };
  
  return Array(count).fill(null).map((_, index) => ({
    ...baseQuestion,
    id: `fallback-${index + 1}`,
    question: `Question ${index + 1}: ${baseQuestion.question}`
  }));
}

/**
 * Batch query multiple topics for course generation
 * @param {Array<string>} topics - Array of topics to query
 * @returns {Promise<Object>} - Batch results
 */
export async function batchQueryTopics(topics) {
  const results = {};
  
  // Process in batches to avoid overwhelming the API
  const batchSize = 3;
  for (let i = 0; i < topics.length; i += batchSize) {
    const batch = topics.slice(i, i + batchSize);
    const batchPromises = batch.map(async (topic) => {
      try {
        const content = await generateCourseContent(topic);
        return { topic, content };
      } catch (error) {
        console.error(`Error processing topic ${topic}:`, error);
        return { topic, content: generateFallbackCourseContent(topic) };
      }
    });
    
    const batchResults = await Promise.all(batchPromises);
    batchResults.forEach(({ topic, content }) => {
      results[topic] = content;
    });
    
    // Small delay between batches to be respectful to the API
    if (i + batchSize < topics.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  return results;
}