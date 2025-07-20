/**
 * Knowledge Service for integrating with Google NotebookLM
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
    throw error;
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
    return [];
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