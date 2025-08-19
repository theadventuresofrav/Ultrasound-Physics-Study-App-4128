import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSend, FiMessageSquare, FiUser, FiCpu, FiLoader, FiChevronDown, FiImage, FiBookOpen, FiHelpCircle } = FiIcons;

function ChatTutor() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Sample suggested topics
  const suggestedTopics = [
    "Explain acoustic impedance",
    "How does the Doppler effect work?",
    "What causes ultrasound artifacts?",
    "Describe the piezoelectric effect",
    "How do ultrasound transducers work?"
  ];

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial greeting message
  useEffect(() => {
    setMessages([
      {
        type: 'bot',
        content: "Hello! I'm your Ultrasound Physics Tutor. I'm here to help you understand ultrasound physics concepts and prepare for your exams. What would you like to learn about today?",
        suggestions: suggestedTopics
      }
    ]);
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { type: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulate bot response (replace with actual API call)
      const response = await simulateBotResponse(input);
      setMessages(prev => [
        ...prev,
        {
          type: 'bot',
          content: response.message,
          suggestions: response.suggestions,
          diagrams: response.diagrams
        }
      ]);
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages(prev => [
        ...prev,
        {
          type: 'bot',
          content: "I apologize, but I'm having trouble processing your request. Could you try rephrasing your question?",
          error: true
        }
      ]);
    }

    setIsLoading(false);
  };

  // Simulate bot response (replace with actual API integration)
  const simulateBotResponse = async (input) => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

    // Simple keyword matching for demo
    const response = { message: '', suggestions: [], diagrams: [] };

    if (input.toLowerCase().includes('acoustic impedance')) {
      response.message = `Acoustic impedance (Z) is a key concept in ultrasound physics. It's defined as the product of tissue density (ρ) and the speed of sound (c) in that tissue: Z=ρc

Key points about acoustic impedance:
1. Measured in kg/m²·s (rayls)
2. Determines reflection at tissue interfaces
3. Greater differences in impedance = stronger reflections
4. Important for image formation and artifact production

Would you like to learn more about how acoustic impedance affects image formation or tissue interfaces?`;
      response.suggestions = [
        "How does acoustic impedance affect reflection?",
        "What is the acoustic impedance of different tissues?",
        "Explain impedance matching in transducers"
      ];
      response.diagrams = [
        {
          title: "Acoustic Impedance at Tissue Interfaces",
          url: "https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe"
        }
      ];
    } else if (input.toLowerCase().includes('doppler')) {
      response.message = `The Doppler effect in ultrasound is based on the frequency shift of sound waves when they interact with moving objects (like blood cells). The Doppler shift equation is:

Δf=2f₀(v/c)cosθ

Where:
• Δf = frequency shift
• f₀ = transmitted frequency
• v = blood velocity
• c = speed of sound
• θ = angle between beam and flow

This principle is fundamental for:
- Color Doppler imaging
- Spectral Doppler analysis
- Blood flow measurement

Would you like to explore specific Doppler applications or calculations?`;
      response.suggestions = [
        "Explain Color Doppler imaging",
        "What is aliasing in Doppler?",
        "How do you optimize Doppler angle?"
      ];
    } else {
      response.message = "That's an interesting question! Let me help explain that concept. Could you be more specific about what aspect you'd like to understand better?";
      response.suggestions = suggestedTopics;
    }

    return response;
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm rounded-t-2xl p-4 border border-medical-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-primary-100">
            <SafeIcon icon={FiCpu} className="text-xl text-primary-600" />
          </div>
          <div>
            <h2 className="font-bold text-medical-900">Ultrasound Physics Tutor</h2>
            <p className="text-sm text-medical-600">Ask me anything about ultrasound physics</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto bg-medical-50 p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-primary-100 text-primary-600' : 'bg-white text-medical-600'}`}>
                  <SafeIcon icon={message.type === 'user' ? FiUser : FiCpu} />
                </div>
                <div className={`${message.type === 'user' ? 'bg-primary-500 text-white' : 'bg-white text-medical-800'} p-4 rounded-xl shadow-sm`}>
                  <ReactMarkdown className="prose prose-sm max-w-none">
                    {message.content}
                  </ReactMarkdown>

                  {/* Suggestions */}
                  {message.suggestions && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-sm px-3 py-1 rounded-full bg-medical-100 text-medical-700 hover:bg-medical-200 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Diagrams */}
                  {message.diagrams && message.diagrams.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-4">
                      {message.diagrams.map((diagram, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={diagram.url}
                            alt={diagram.title}
                            className="w-40 h-40 object-cover rounded-lg border border-medical-200"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <SafeIcon icon={FiImage} className="text-white text-xl" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-white text-medical-600">
                  <SafeIcon icon={FiCpu} />
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <SafeIcon icon={FiLoader} className="text-medical-400 animate-spin" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="bg-white/90 backdrop-blur-sm rounded-b-2xl p-4 border border-t-0 border-medical-200">
        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about ultrasound physics..."
              className="w-full p-3 pr-10 rounded-xl border border-medical-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-primary-500 hover:text-primary-600"
              disabled={isLoading}
            >
              <SafeIcon icon={FiSend} className={isLoading ? 'opacity-50' : ''} />
            </button>
          </div>
          <button
            type="button"
            className="p-3 rounded-xl bg-medical-100 text-medical-600 hover:bg-medical-200 transition-colors"
            title="View suggested topics"
          >
            <SafeIcon icon={FiHelpCircle} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatTutor;