import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiStar, FiTrendingUp, FiAward, FiSun, FiChevronLeft, FiChevronRight, FiQuote } = FiIcons;

const inspirationalStories = [
  {
    id: 1,
    title: "From High School Dropout to Chief Sonographer",
    story: "Maria dropped out of high school at 16 to work and support her family. At 28, she earned her GED and enrolled in sonography school. Despite struggling with physics concepts that seemed impossible, she formed study groups, sought tutoring, and never gave up. Today, she's the Chief Sonographer at a major medical center and mentors students facing similar challenges.",
    lesson: "Your starting point doesn't determine your destination. Every expert was once a beginner.",
    category: "Education",
    author: "Maria Rodriguez, RDMS"
  },
  {
    id: 2,
    title: "Overcoming Learning Disabilities in Physics",
    story: "James was told he'd never succeed in a technical field due to his dyslexia and dyscalculia. Understanding wave physics and mathematical concepts felt impossible. He developed unique visual learning techniques, used color-coding for formulas, and practiced problems hundreds of times. He now teaches ultrasound physics and has developed learning aids for students with similar challenges.",
    lesson: "Different doesn't mean less capable. Your unique perspective can become your greatest strength.",
    category: "Learning Differences",
    author: "James Chen, MS, RDMS"
  },
  {
    id: 3,
    title: "Single Mother's Journey to Certification",
    story: "Sarah was a single mother of three, working two jobs when she decided to pursue sonography. Studying physics while managing children's schedules seemed impossible. She studied at 4 AM before work, during lunch breaks, and after kids went to bed. Her children became her biggest cheerleaders, even helping her practice with homemade transducer models. She passed her registry on the first try.",
    lesson: "When you have a strong 'why,' you'll find a way. Your struggles can become your strength.",
    category: "Work-Life Balance",
    author: "Sarah Thompson, RDMS"
  },
  {
    id: 4,
    title: "From Failed Attempts to Physics Excellence",
    story: "After failing his SPI exam twice, David considered giving up on his sonography career. The physics concepts felt foreign and overwhelming. Instead of quitting, he changed his approach entirely - he started teaching physics concepts to other struggling students. By explaining concepts to others, he finally understood them himself. He not only passed on his third attempt but scored in the 95th percentile.",
    lesson: "Failure is not falling down; it's staying down. Sometimes helping others helps us help ourselves.",
    category: "Persistence",
    author: "David Kim, RDMS, RVT"
  },
  {
    id: 5,
    title: "English as Second Language Success",
    story: "Elena immigrated to the US with limited English and no medical background. The technical terminology in ultrasound physics seemed like learning two foreign languages at once. She created flashcards with pictures, translated key concepts into her native language, and found study partners who could explain concepts simply. Her multilingual skills now help her connect with diverse patients and colleagues.",
    lesson: "Your background is not a barrier; it's a bridge to understanding others who face similar challenges.",
    category: "Language Barriers",
    author: "Elena Vasquez, RDMS"
  },
  {
    id: 6,
    title: "Returning to School After 20 Years",
    story: "At 45, Robert decided to change careers from construction to sonography after a back injury. He hadn't been in a classroom for 20 years and felt intimidated by younger classmates who seemed to grasp physics concepts quickly. He leveraged his practical experience, relating ultrasound wave behavior to sound in construction environments. His life experience became an asset in patient care and problem-solving.",
    lesson: "It's never too late to start over. Your life experience is valuable preparation for new challenges.",
    category: "Career Change",
    author: "Robert Johnson, RDMS"
  },
  {
    id: 7,
    title: "Overcoming Test Anxiety",
    story: "Lisa was an excellent student in clinical rotations but froze during exams. Her test anxiety was so severe she failed multiple practice tests despite knowing the material. She worked with counselors, learned breathing techniques, and practiced mindfulness. She also discovered that explaining her answers out loud helped her think clearly. She developed a pre-exam routine that calmed her nerves and passed her registry with confidence.",
    lesson: "Your mind is powerful. Learning to manage anxiety is as important as learning physics concepts.",
    category: "Mental Health",
    author: "Lisa Park, RDMS"
  },
  {
    id: 8,
    title: "From Minimum Wage to Medical Professional",
    story: "Working minimum wage jobs since high school, Marcus felt trapped in a cycle of low-paying work. At 30, he used every available resource - grants, scholarships, and student loans - to pursue sonography. The financial stress was overwhelming, and physics seemed impossibly complex. He worked nights, studied during breaks, and reminded himself daily that education was his path to a better life. Today, he owns his own mobile ultrasound business.",
    lesson: "Education is the most powerful tool for changing your circumstances. Every hour of study is an investment in your future.",
    category: "Financial Hardship",
    author: "Marcus Williams, RDMS"
  }
];

const motivationalQuotes = [
  {
    quote: "The expert in anything was once a beginner who refused to give up.",
    author: "Helen Hayes"
  },
  {
    quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    quote: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins"
  },
  {
    quote: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson"
  },
  {
    quote: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  }
];

const studyTips = [
  {
    title: "Break It Down",
    tip: "Complex physics concepts become manageable when broken into smaller pieces. Master one concept at a time.",
    icon: FiTrendingUp
  },
  {
    title: "Use Analogies",
    tip: "Relate ultrasound concepts to everyday experiences. Sound waves are like ripples in water.",
    icon: FiSun
  },
  {
    title: "Teach Someone Else",
    tip: "Explaining concepts to others helps solidify your own understanding. Start a study group.",
    icon: FiHeart
  },
  {
    title: "Practice Daily",
    tip: "Consistent daily practice, even for 15 minutes, is more effective than cramming.",
    icon: FiStar
  }
];

function AgainstAllOddsInspiration() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('stories');

  // Auto-rotate quotes every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const nextStory = () => {
    setCurrentStoryIndex((prev) => (prev + 1) % inspirationalStories.length);
  };

  const prevStory = () => {
    setCurrentStoryIndex((prev) => (prev - 1 + inspirationalStories.length) % inspirationalStories.length);
  };

  const currentStory = inspirationalStories[currentStoryIndex];
  const currentQuote = motivationalQuotes[currentQuoteIndex];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <SafeIcon icon={FiHeart} className="text-2xl text-red-500" />
          <div>
            <h2 className="text-2xl font-bold text-medical-900">Against All Odds</h2>
            <p className="text-medical-600">Inspirational stories from sonographers who overcame challenges</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex mb-6 border-b border-medical-200">
        <button
          onClick={() => setActiveTab('stories')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'stories'
              ? 'text-primary-600 border-b-2 border-primary-500'
              : 'text-medical-600 hover:text-medical-900'
          }`}
        >
          Success Stories
        </button>
        <button
          onClick={() => setActiveTab('quotes')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'quotes'
              ? 'text-primary-600 border-b-2 border-primary-500'
              : 'text-medical-600 hover:text-medical-900'
          }`}
        >
          Daily Motivation
        </button>
        <button
          onClick={() => setActiveTab('tips')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'tips'
              ? 'text-primary-600 border-b-2 border-primary-500'
              : 'text-medical-600 hover:text-medical-900'
          }`}
        >
          Study Tips
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* Success Stories Tab */}
        {activeTab === 'stories' && (
          <motion.div
            key="stories"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="relative">
              <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6 border border-primary-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
                      {currentStory.category}
                    </span>
                    <span className="text-sm text-medical-600">
                      Story {currentStoryIndex + 1} of {inspirationalStories.length}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={prevStory}
                      className="p-2 bg-white rounded-full hover:bg-primary-100 transition-colors"
                      title="Previous story"
                    >
                      <SafeIcon icon={FiChevronLeft} className="text-primary-600" />
                    </button>
                    <button
                      onClick={nextStory}
                      className="p-2 bg-white rounded-full hover:bg-primary-100 transition-colors"
                      title="Next story"
                    >
                      <SafeIcon icon={FiChevronRight} className="text-primary-600" />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-medical-900 mb-4">{currentStory.title}</h3>
                
                <div className="prose prose-medical max-w-none mb-4">
                  <p className="text-medical-700 leading-relaxed">{currentStory.story}</p>
                </div>

                <div className="bg-white/70 rounded-lg p-4 border-l-4 border-primary-500 mb-4">
                  <div className="flex items-start space-x-2">
                    <SafeIcon icon={FiStar} className="text-primary-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-medical-900 mb-1">Key Lesson</h4>
                      <p className="text-medical-700 italic">{currentStory.lesson}</p>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-medical-600">— {currentStory.author}</p>
                </div>
              </div>

              {/* Story Navigation Dots */}
              <div className="flex justify-center mt-4 space-x-2">
                {inspirationalStories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStoryIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentStoryIndex
                        ? 'bg-primary-500 scale-125'
                        : 'bg-medical-300 hover:bg-medical-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Daily Motivation Tab */}
        {activeTab === 'quotes' && (
          <motion.div
            key="quotes"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <motion.div
                key={currentQuoteIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-200"
              >
                <SafeIcon icon={FiQuote} className="text-4xl text-purple-400 mx-auto mb-4" />
                <blockquote className="text-2xl font-medium text-medical-900 mb-4 italic">
                  "{currentQuote.quote}"
                </blockquote>
                <p className="text-medical-600">— {currentQuote.author}</p>
              </motion.div>
            </div>

            {/* Mini Motivation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <SafeIcon icon={FiTrendingUp} className="text-green-600" />
                  <h4 className="font-semibold text-medical-900">Progress Mindset</h4>
                </div>
                <p className="text-sm text-medical-700">
                  Every question you answer, every concept you grasp, is progress toward your goal.
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <SafeIcon icon={FiAward} className="text-blue-600" />
                  <h4 className="font-semibold text-medical-900">Future Impact</h4>
                </div>
                <p className="text-sm text-medical-700">
                  Your dedication to learning physics will help you provide better patient care tomorrow.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Study Tips Tab */}
        {activeTab === 'tips' && (
          <motion.div
            key="tips"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {studyTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-medical-50 rounded-lg p-4 border border-medical-200 hover:border-primary-300 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <SafeIcon icon={tip.icon} className="text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-medical-900 mb-1">{tip.title}</h4>
                    <p className="text-medical-700">{tip.tip}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200 mt-6">
              <div className="flex items-center space-x-2 mb-2">
                <SafeIcon icon={FiHeart} className="text-orange-500" />
                <h4 className="font-semibold text-medical-900">Remember</h4>
              </div>
              <p className="text-medical-700">
                Every expert was once a beginner. Every professional was once an amateur. 
                Your current struggles are temporary, but your determination will create lasting success.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AgainstAllOddsInspiration;