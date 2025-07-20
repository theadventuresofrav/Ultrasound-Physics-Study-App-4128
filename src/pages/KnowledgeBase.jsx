import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { queryKnowledgeBase, getRelatedContent, searchKnowledgeBase } from '../services/knowledgeService';
import { getDiagrams, generateDiagram } from '../services/diagramService';
import { useStudy } from '../context/StudyContext';
import SafeIcon from '../common/SafeIcon';
import DiagramViewer from '../components/DiagramViewer';
import * as FiIcons from 'react-icons/fi';

const { 
  FiSearch, 
  FiBook, 
  FiLoader, 
  FiArrowLeft,
  FiBookmark,
  FiExternalLink,
  FiHelpCircle,
  FiImage,
  FiAlertTriangle
} = FiIcons;

function KnowledgeBase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [relatedContent, setRelatedContent] = useState([]);
  const [diagrams, setDiagrams] = useState([]);
  const [showDiagrams, setShowDiagrams] = useState(false);
  const [error, setError] = useState(null);
  const { state } = useStudy();

  // Suggested questions based on user's study progress
  const getSuggestedQuestions = () => {
    // Find sections with lowest completion rate
    const weakestSections = state.progress.sectionsCompleted
      .sort((a, b) => a.completionRate - b.completionRate)
      .slice(0, 2);
    
    return [
      "How do ultrasound waves propagate through tissue?",
      "What is acoustic impedance and how does it affect image quality?",
      "Explain the difference between continuous and pulsed wave Doppler",
      "What causes acoustic shadowing artifacts?",
      "How does the piezoelectric effect work in ultrasound transducers?"
    ];
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const results = await searchKnowledgeBase(searchTerm);
      setSearchResults(results);
    } catch (err) {
      setError("Failed to search knowledge base. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionClick = async (question) => {
    setActiveQuestion(question);
    setAnswer(null);
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await queryKnowledgeBase(question);
      setAnswer(response.answer);
      
      // Get related content
      const related = await getRelatedContent(question);
      setRelatedContent(related);
      
      // Get relevant diagrams for the question
      const relevantDiagrams = getDiagrams(question);
      setDiagrams(relevantDiagrams);
    } catch (err) {
      setError("Failed to get answer. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

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
        <h1 className="text-3xl font-bold text-medical-900 mb-2">Knowledge Base</h1>
        <p className="text-medical-600">
          Search through comprehensive ultrasound physics resources powered by Google NotebookLM
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-medical-200 mb-8">
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <div className="relative flex-1">
            <SafeIcon
              icon={FiSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-medical-500"
            />
            <input
              type="text"
              placeholder="Search the knowledge base or ask a question..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-medical-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Search
          </motion.button>
        </form>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Questions/Results */}
        <div className="md:col-span-1">
          {/* Suggested Questions */}
          {!searchResults.length && !isLoading && (
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-medical-200 mb-6">
              <h2 className="font-bold text-medical-900 mb-4 flex items-center">
                <SafeIcon icon={FiHelpCircle} className="mr-2 text-primary-500" />
                Suggested Questions
              </h2>
              <ul className="space-y-3">
                {getSuggestedQuestions().map((question, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 4 }}
                  >
                    <button
                      onClick={() => handleQuestionClick(question)}
                      className="text-left w-full p-3 rounded-lg hover:bg-medical-50 text-medical-800 transition-colors"
                    >
                      {question}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Search Results */}
          {searchResults.length > 0 && !isLoading && (
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-medical-200">
              <h2 className="font-bold text-medical-900 mb-4 flex items-center">
                <SafeIcon icon={FiSearch} className="mr-2 text-primary-500" />
                Search Results
              </h2>
              <ul className="space-y-3">
                {searchResults.map((result, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-medical-100 last:border-b-0 pb-3 last:pb-0"
                  >
                    <button
                      onClick={() => handleQuestionClick(result.title)}
                      className="text-left w-full"
                    >
                      <h3 className="font-medium text-medical-800 hover:text-primary-600 transition-colors">
                        {result.title}
                      </h3>
                      <p className="text-sm text-medical-600 line-clamp-2 mt-1">
                        {result.snippet}
                      </p>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-medical-200 flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full mb-4"></div>
              <p className="text-medical-600">Searching knowledge base...</p>
            </div>
          )}
        </div>

        {/* Right Column - Answer */}
        <div className="md:col-span-2">
          <AnimatePresence mode="wait">
            {activeQuestion && answer ? (
              <motion.div
                key="answer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-medical-200"
              >
                <div className="border-b border-medical-200 pb-4 mb-6">
                  <h2 className="font-bold text-xl text-medical-900">{activeQuestion}</h2>
                </div>
                
                <div className="prose prose-medical max-w-none">
                  <p className="text-medical-800 leading-relaxed whitespace-pre-line">
                    {answer}
                  </p>
                </div>

                {/* Diagrams Section */}
                {diagrams.length > 0 && (
                  <div className="mt-4">
                    <button
                      onClick={() => setShowDiagrams(true)}
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
                    >
                      <SafeIcon icon={FiImage} />
                      <span>View Related Diagrams ({diagrams.length})</span>
                    </button>
                  </div>
                )}

                {/* Related Content */}
                {relatedContent.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-medical-200">
                    <h3 className="font-bold text-medical-900 mb-4 flex items-center">
                      <SafeIcon icon={FiBookmark} className="mr-2 text-primary-500" />
                      Related Content
                    </h3>
                    <ul className="space-y-3">
                      {relatedContent.map((item, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <SafeIcon icon={FiBook} className="text-medical-500 mt-1" />
                          <div>
                            <h4 className="font-medium text-medical-800">{item.title}</h4>
                            <p className="text-sm text-medical-600 line-clamp-2">
                              {item.snippet}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ) : activeQuestion && !answer && !isLoading ? (
              <motion.div
                key="no-answer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-medical-200 text-center"
              >
                <SafeIcon icon={FiHelpCircle} className="text-4xl text-medical-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-medical-800 mb-2">No Answer Found</h3>
                <p className="text-medical-600 mb-6">
                  We couldn't find information for this question in our knowledge base.
                </p>
                <button
                  onClick={() => setActiveQuestion(null)}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Try another question
                </button>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-red-200 text-center"
              >
                <SafeIcon icon={FiAlertTriangle} className="text-4xl text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-red-700 mb-2">Error</h3>
                <p className="text-red-600 mb-6">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Try again
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-8 border border-dashed border-medical-300 text-center"
              >
                <div className="w-20 h-20 bg-medical-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <SafeIcon icon={FiBook} className="text-3xl text-medical-500" />
                </div>
                <h2 className="text-xl font-bold text-medical-800 mb-2">
                  Search the Knowledge Base
                </h2>
                <p className="text-medical-600 mb-6 max-w-md mx-auto">
                  Ask questions about ultrasound physics or search for specific topics to enhance your understanding.
                </p>
                <div className="flex justify-center">
                  <a 
                    href="https://notebooklm.google.com/notebook/ba6f8ec3-0c56-4ec0-b7b6-56f26ae100ed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                  >
                    <span>View Original Notebook</span>
                    <SafeIcon icon={FiExternalLink} />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Diagram Viewer Modal */}
      {showDiagrams && (
        <DiagramViewer
          diagrams={diagrams}
          onClose={() => setShowDiagrams(false)}
        />
      )}
    </motion.div>
  );
}

export default KnowledgeBase;