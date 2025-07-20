import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStudy } from '../context/StudyContext';
import SafeIcon from '../common/SafeIcon';
import ConversationStarters from '../components/ConversationStarters';
import NetworkingCard from '../components/NetworkingCard';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiBook, FiSearch, FiUsers, FiMessageSquare } = FiIcons;

function Knowledge() {
  const { state } = useStudy();
  const [activeTab, setActiveTab] = useState('resources');

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
        <h1 className="text-3xl font-bold text-medical-900 mb-2">Knowledge Center</h1>
        <p className="text-medical-600">
          Access resources, connect with peers, and find conversation starters
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex mb-8 border-b border-medical-200">
        <button
          onClick={() => setActiveTab('resources')}
          className={`px-6 py-3 font-medium ${
            activeTab === 'resources' 
              ? 'text-primary-600 border-b-2 border-primary-500' 
              : 'text-medical-600 hover:text-medical-900'
          }`}
        >
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiBook} />
            <span>Resources</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('networking')}
          className={`px-6 py-3 font-medium ${
            activeTab === 'networking' 
              ? 'text-primary-600 border-b-2 border-primary-500' 
              : 'text-medical-600 hover:text-medical-900'
          }`}
        >
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiUsers} />
            <span>Networking</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('conversations')}
          className={`px-6 py-3 font-medium ${
            activeTab === 'conversations' 
              ? 'text-primary-600 border-b-2 border-primary-500' 
              : 'text-medical-600 hover:text-medical-900'
          }`}
        >
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiMessageSquare} />
            <span>Conversation Starters</span>
          </div>
        </button>
      </div>

      {/* Resources Tab */}
      {activeTab === 'resources' && (
        <div className="space-y-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
            <h2 className="text-xl font-bold text-medical-900 mb-4 flex items-center">
              <SafeIcon icon={FiBook} className="mr-2 text-primary-600" />
              Recommended Study Resources
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "Ultrasound Physics and Instrumentation",
                  author: "Wayne R. Hedrick, PhD",
                  description: "Comprehensive textbook covering all aspects of ultrasound physics",
                  type: "Textbook"
                },
                {
                  title: "Understanding Ultrasound Physics",
                  author: "Sidney K. Edelman, PhD",
                  description: "Clear explanations of complex physics concepts with clinical applications",
                  type: "Textbook"
                },
                {
                  title: "Ultrasound Physics Review",
                  author: "Cindy Owen",
                  description: "Concise review with practice questions for registry preparation",
                  type: "Review Guide"
                },
                {
                  title: "Ultrasound Physics Registry Review",
                  author: "Davies Publishing",
                  description: "Comprehensive registry review with practice tests",
                  type: "Review Guide"
                }
              ].map((resource, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-medical-50 rounded-lg border border-medical-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-medical-900">{resource.title}</h3>
                    <span className="text-xs bg-medical-200 text-medical-700 px-2 py-1 rounded-full">
                      {resource.type}
                    </span>
                  </div>
                  <p className="text-sm text-medical-600 mb-1">{resource.author}</p>
                  <p className="text-sm text-medical-700">{resource.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
            <h2 className="text-xl font-bold text-medical-900 mb-4 flex items-center">
              <SafeIcon icon={FiSearch} className="mr-2 text-primary-600" />
              Online Resources
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "Society of Diagnostic Medical Sonography",
                  url: "https://www.sdms.org",
                  description: "Professional organization with educational resources and CME opportunities"
                },
                {
                  title: "American Institute of Ultrasound in Medicine",
                  url: "https://www.aium.org",
                  description: "Research, education, and practice guidelines for ultrasound"
                },
                {
                  title: "Ultrasound Cases",
                  url: "https://www.ultrasoundcases.info",
                  description: "Library of ultrasound cases with physics principles applied"
                },
                {
                  title: "Radiology Assistant",
                  url: "https://radiologyassistant.nl",
                  description: "Educational site with ultrasound physics tutorials"
                }
              ].map((resource, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-medical-50 rounded-lg border border-medical-200"
                >
                  <h3 className="font-medium text-medical-900 mb-1">{resource.title}</h3>
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 hover:text-primary-700 mb-2 inline-block"
                  >
                    {resource.url}
                  </a>
                  <p className="text-sm text-medical-700">{resource.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Networking Tab */}
      {activeTab === 'networking' && (
        <div className="space-y-8">
          <NetworkingCard />
          
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
            <h2 className="text-xl font-bold text-medical-900 mb-4 flex items-center">
              <SafeIcon icon={FiUsers} className="mr-2 text-primary-600" />
              Professional Organizations
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  name: "Society of Diagnostic Medical Sonography (SDMS)",
                  description: "Professional membership organization for sonographers and sonologists",
                  benefits: ["Networking events", "Continuing education", "Career resources"]
                },
                {
                  name: "American Registry for Diagnostic Medical Sonography (ARDMS)",
                  description: "Credentialing organization for ultrasound professionals",
                  benefits: ["Certification exams", "Registry maintenance", "Professional recognition"]
                },
                {
                  name: "Society for Vascular Ultrasound (SVU)",
                  description: "Professional society focused on vascular ultrasound",
                  benefits: ["Specialized education", "Vascular networking", "Research opportunities"]
                },
                {
                  name: "American Society of Echocardiography (ASE)",
                  description: "Organization dedicated to cardiovascular ultrasound",
                  benefits: ["Cardiac education", "Clinical guidelines", "Research journals"]
                }
              ].map((org, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-medical-50 rounded-lg border border-medical-200"
                >
                  <h3 className="font-medium text-medical-900 mb-2">{org.name}</h3>
                  <p className="text-sm text-medical-700 mb-3">{org.description}</p>
                  <div>
                    <h4 className="text-xs font-medium text-medical-600 mb-1">Benefits:</h4>
                    <ul className="text-xs text-medical-700">
                      {org.benefits.map((benefit, i) => (
                        <li key={i} className="mb-1 flex items-center">
                          <span className="mr-1 text-primary-600">•</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Conversation Starters Tab */}
      {activeTab === 'conversations' && (
        <div className="space-y-8">
          <ConversationStarters userInfo={state.user} />
          
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
            <h2 className="text-xl font-bold text-medical-900 mb-4 flex items-center">
              <SafeIcon icon={FiMessageSquare} className="mr-2 text-primary-600" />
              Conversation Topics by Context
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  context: "At Conferences",
                  topics: [
                    "What sessions are you most looking forward to?",
                    "Have you seen any interesting new technologies in the exhibit hall?",
                    "What's the most valuable thing you've learned so far?"
                  ]
                },
                {
                  context: "In Clinical Settings",
                  topics: [
                    "How do you approach optimizing settings for difficult-to-image patients?",
                    "What artifacts do you encounter most frequently in your practice?",
                    "How has your understanding of physics improved your scanning technique?"
                  ]
                },
                {
                  context: "With Instructors",
                  topics: [
                    "What do you think is the most commonly misunderstood physics concept?",
                    "How do you recommend visualizing wave propagation concepts?",
                    "What resources would you recommend for deeper understanding of Doppler principles?"
                  ]
                }
              ].map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-medical-50 rounded-lg border border-medical-200"
                >
                  <h3 className="font-medium text-medical-900 mb-3">{section.context}</h3>
                  <ul className="space-y-2">
                    {section.topics.map((topic, i) => (
                      <li key={i} className="text-sm text-medical-700 p-2 bg-white rounded border border-medical-100">
                        {topic}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default Knowledge;