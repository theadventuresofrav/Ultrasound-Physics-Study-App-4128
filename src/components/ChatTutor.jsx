import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { queryKnowledgeBase, getRelatedContent } from '../services/knowledgeService';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSend, FiMessageSquare, FiUser, FiCpu, FiLoader, FiBookOpen, FiHelpCircle, FiAlertTriangle, FiStar, FiZap } = FiIcons;

function ChatTutor() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Enhanced suggested topics with categories
  const suggestedTopics = {
    basics: [
      "Explain acoustic impedance",
      "How does the Doppler effect work?",
      "What is the piezoelectric effect?",
      "Describe ultrasound wave propagation"
    ],
    advanced: [
      "What causes ultrasound artifacts?",
      "How do ultrasound transducers work?",
      "Explain beam focusing in ultrasound",
      "How does TGC work in ultrasound?"
    ],
    clinical: [
      "How to optimize image quality?",
      "When to use different transducer types?",
      "How to minimize artifacts?",
      "Best practices for Doppler imaging"
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced initial greeting message
  useEffect(() => {
    setMessages([
      {
        type: 'bot',
        content: "Hello! I'm your **Ultrasound Physics AI Tutor** 🎯\n\nI'm here to help you master ultrasound physics concepts and prepare for your SPI exam. I can explain complex topics, solve physics problems, and provide personalized study guidance.\n\n**What would you like to learn about today?**",
        suggestions: Object.values(suggestedTopics).flat().slice(0, 6),
        isWelcome: true
      }
    ]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await queryKnowledgeBase(currentInput);
      const relatedContent = await getRelatedContent(currentInput);
      const suggestions = generateContextualSuggestions(currentInput);

      setMessages(prev => [
        ...prev,
        {
          type: 'bot',
          content: response.answer || "I apologize, but I couldn't find specific information about that topic in my knowledge base. Could you try rephrasing your question or asking about a more specific ultrasound physics concept?",
          suggestions: suggestions,
          relatedContent: relatedContent.slice(0, 3),
          sources: response.sources || []
        }
      ]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setError('Unable to connect to the knowledge base. Please check your connection and try again.');
      setMessages(prev => [
        ...prev,
        {
          type: 'bot',
          content: "I'm having trouble accessing my knowledge base right now. Here are some key ultrasound physics concepts you might be interested in learning about:",
          suggestions: Object.values(suggestedTopics).flat().slice(0, 6),
          error: true
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateContextualSuggestions = (input) => {
    const inputLower = input.toLowerCase();
    
    if (inputLower.includes('acoustic impedance') || inputLower.includes('impedance')) {
      return [
        "How does acoustic impedance affect reflection?",
        "What is the acoustic impedance of different tissues?",
        "Explain impedance matching in transducers",
        "How do you calculate reflection coefficient?"
      ];
    }
    
    if (inputLower.includes('doppler') || inputLower.includes('flow')) {
      return [
        "Explain Color Doppler imaging",
        "What is aliasing in Doppler?",
        "How do you optimize Doppler angle?",
        "What is the Doppler equation?"
      ];
    }
    
    if (inputLower.includes('transducer') || inputLower.includes('piezo')) {
      return [
        "What are the different types of transducers?",
        "How does electronic focusing work?",
        "Explain transducer bandwidth",
        "What causes transducer artifacts?"
      ];
    }
    
    return [
      "Tell me about beam focusing",
      "Explain frequency and penetration relationship",
      "What is TGC and why is it needed?",
      "How do you optimize image quality?"
    ];
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-5xl mx-auto">
      {/* Enhanced Header */}
      <div className="glass-card rounded-t-3xl p-6 border-2 border-primary-200/50 bg-gradient-to-r from-primary-50 to-blue-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-primary-500 to-blue-500 rounded-2xl shadow-lg animate-glow">
              <SafeIcon icon={FiCpu} className="text-2xl text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Ultrasound Physics AI Tutor</h2>
              <p className="text-sm text-gray-600 flex items-center space-x-2">
                <SafeIcon icon={FiZap} className="text-primary-500" />
                <span>Ask me anything about ultrasound physics • Powered by AI</span>
              </p>
            </div>
          </div>
          <div className="status-dot status-online"></div>
        </div>
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl flex items-center space-x-3 shadow-md"
          >
            <SafeIcon icon={FiAlertTriangle} className="text-red-600" />
            <span className="text-red-700 font-medium">{error}</span>
          </motion.div>
        )}
      </div>

      {/* Enhanced Chat Messages */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 p-6 space-y-6 custom-scrollbar">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-4 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {/* Enhanced Avatar */}
                <div className={`p-3 rounded-2xl shadow-lg ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-primary-500 to-blue-500 text-white' 
                    : 'bg-gradient-to-r from-gray-700 to-gray-800 text-white'
                }`}>
                  <SafeIcon icon={message.type === 'user' ? FiUser : FiCpu} className="text-lg" />
                </div>

                {/* Enhanced Message Bubble */}
                <div className={`relative p-6 rounded-2xl shadow-xl border-2 transition-all duration-300 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-primary-500 to-blue-500 text-white border-primary-300/50'
                    : 'glass-card text-gray-800 border-white/50 hover:shadow-2xl'
                } ${message.isWelcome ? 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-primary-300' : ''}`}>
                  
                  {/* Welcome message special styling */}
                  {message.isWelcome && (
                    <div className="absolute -top-2 -right-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <SafeIcon icon={FiStar} className="text-white text-xs" />
                      </div>
                    </div>
                  )}

                  <ReactMarkdown className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-strong:text-gray-900">
                    {message.content}
                  </ReactMarkdown>

                  {/* Error indicator */}
                  {message.error && (
                    <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center space-x-2">
                      <SafeIcon icon={FiAlertTriangle} className="text-yellow-600" />
                      <span className="text-yellow-800 text-sm font-medium">Connection issue - showing offline suggestions</span>
                    </div>
                  )}

                  {/* Enhanced Suggestions */}
                  {message.suggestions && (
                    <div className="mt-6">
                      <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                        <SafeIcon icon={FiHelpCircle} className="mr-2 text-primary-600" />
                        Try asking about:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {message.suggestions.map((suggestion, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-sm px-4 py-2 bg-gradient-to-r from-primary-100 to-blue-100 text-primary-700 hover:from-primary-200 hover:to-blue-200 rounded-xl border border-primary-200 font-medium shadow-md hover:shadow-lg transition-all duration-200"
                          >
                            {suggestion}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Enhanced Related Content */}
                  {message.relatedContent && message.relatedContent.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-2 mb-3">
                        <SafeIcon icon={FiBookOpen} className="text-primary-600" />
                        <span className="text-sm font-semibold text-primary-700">Related Topics:</span>
                      </div>
                      <div className="space-y-3">
                        {message.relatedContent.map((item, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => handleSuggestionClick(item.title)}
                            className="block w-full text-left p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                          >
                            <div className="font-semibold text-blue-800 text-sm mb-1">{item.title}</div>
                            <div className="text-blue-600 text-xs">{item.snippet}</div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sources */}
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <div className="text-xs text-gray-500 font-medium">
                        📚 Sources: {message.sources.join(', ')}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Enhanced Loading State */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-2xl shadow-lg">
                  <SafeIcon icon={FiCpu} className="text-lg" />
                </div>
                <div className="glass-card p-6 rounded-2xl shadow-xl border-2 border-white/50">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiLoader} className="text-primary-500 animate-spin text-lg" />
                    <span className="text-gray-700 font-medium">AI is thinking...</span>
                    <div className="flex space-x-1">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Input Form */}
      <div className="glass-card rounded-b-3xl p-6 border-2 border-t-0 border-primary-200/50 bg-gradient-to-r from-white to-gray-50">
        <form onSubmit={handleSubmit} className="flex items-end space-x-4">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about ultrasound physics... (e.g., 'Explain the Doppler equation')"
              className="w-full p-4 pr-12 rounded-2xl border-2 border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none resize-none transition-all duration-200 bg-white shadow-md"
              rows="1"
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-3 bottom-3 p-2.5 bg-gradient-to-r from-primary-500 to-blue-500 text-white rounded-xl hover:from-primary-600 hover:to-blue-600 disabled:opacity-50 shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={isLoading || !input.trim()}
            >
              <SafeIcon icon={FiSend} className={`text-lg ${isLoading ? 'opacity-50' : ''}`} />
            </motion.button>
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const allTopics = Object.values(suggestedTopics).flat();
              const randomSuggestion = allTopics[Math.floor(Math.random() * allTopics.length)];
              handleSuggestionClick(randomSuggestion);
            }}
            className="p-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 hover:from-gray-200 hover:to-gray-300 hover:text-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200"
            title="Get a random suggestion"
          >
            <SafeIcon icon={FiHelpCircle} className="text-xl" />
          </motion.button>
        </form>
        
        {/* Enhanced Quick Suggestions */}
        <div className="mt-4">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center">
              <SafeIcon icon={FiStar} className="mr-1" />
              Quick Topics:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.values(suggestedTopics).flat().slice(0, 6).map((topic, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSuggestionClick(topic)}
                className="px-4 py-2 bg-gradient-to-r from-primary-50 to-blue-50 text-primary-700 hover:from-primary-100 hover:to-blue-100 rounded-xl border border-primary-200 font-medium shadow-md hover:shadow-lg transition-all duration-200 text-sm"
              >
                {topic}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatTutor;