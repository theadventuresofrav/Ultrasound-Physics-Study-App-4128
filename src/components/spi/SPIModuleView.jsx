import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { spiCourse } from '../../data/spiCourseData';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiBook, FiCheck, FiClock, FiCheckCircle, FiChevronRight, FiTarget } = FiIcons;

function SPIModuleView() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const moduleNum = parseInt(moduleId, 10);
  
  const module = spiCourse.modules.find(m => m.id === moduleNum);
  const [activeTopic, setActiveTopic] = useState(null);
  const [progress, setProgress] = useState({
    moduleProgress: {},
    quizScores: {},
    studyTime: {},
    completedTopics: [],
    lastStudyDate: null
  });
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('spi-course-progress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
    
    // Set first topic as active if none selected
    if (module && !activeTopic) {
      setActiveTopic(module.topics[0]);
    }
    
    // Start timer for study time tracking
    setStartTime(Date.now());
    
    // Save study time on unmount
    return () => {
      const studyTime = Math.round((Date.now() - startTime) / 60000); // Convert to minutes
      
      const savedProgress = localStorage.getItem('spi-course-progress');
      let updatedProgress = savedProgress ? JSON.parse(savedProgress) : {
        moduleProgress: {},
        quizScores: {},
        studyTime: {},
        completedTopics: [],
        lastStudyDate: new Date().toISOString()
      };
      
      // Update study time
      updatedProgress.studyTime[moduleNum] = (updatedProgress.studyTime[moduleNum] || 0) + studyTime;
      updatedProgress.lastStudyDate = new Date().toISOString();
      
      localStorage.setItem('spi-course-progress', JSON.stringify(updatedProgress));
    };
  }, [moduleId, module, activeTopic]);

  if (!module) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-medical-900 mb-4">Module not found</h2>
        <button 
          onClick={() => navigate('/spi-course')}
          className="px-6 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
        >
          Return to Course Dashboard
        </button>
      </div>
    );
  }

  const handleTopicSelect = (topic) => {
    setActiveTopic(topic);
    // Record start time for the new topic
    setStartTime(Date.now());
  };

  const handleTopicComplete = (topicId) => {
    // Update progress
    const updatedProgress = {...progress};
    if (!updatedProgress.completedTopics.includes(topicId)) {
      updatedProgress.completedTopics.push(topicId);
    }
    
    // Save to localStorage
    localStorage.setItem('spi-course-progress', JSON.stringify(updatedProgress));
    setProgress(updatedProgress);
  };

  const handleQuizStart = () => {
    navigate(`/spi-course/quiz/${moduleNum}`);
  };

  const isTopicCompleted = (topicId) => {
    return progress.completedTopics.includes(topicId);
  };

  // Calculate module progress
  const totalTopics = module.topics.length;
  const completedTopics = module.topics.filter(topic => 
    progress.completedTopics.includes(topic.id)
  ).length;
  const moduleProgress = totalTopics > 0 
    ? Math.round((completedTopics / totalTopics) * 100) 
    : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="mb-8">
        <button 
          onClick={() => navigate('/spi-course')}
          className="flex items-center text-primary-600 hover:text-primary-700 mb-4"
        >
          <SafeIcon icon={FiArrowLeft} className="mr-1" />
          <span>Back to Course Dashboard</span>
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-medical-900 mb-2">
              Module {module.id}: {module.title}
            </h1>
            <p className="text-medical-600">{module.description}</p>
          </div>
          
          <div className="text-right">
            <div className="text-xl font-bold text-primary-600">{moduleProgress}% Complete</div>
            <div className="flex items-center text-sm text-medical-500">
              <SafeIcon icon={FiClock} className="mr-1" />
              <span>Est. {module.estimatedHours} hours</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Topics Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-medical-200 sticky top-20">
            <h2 className="font-bold text-medical-900 mb-4 flex items-center">
              <SafeIcon icon={FiBook} className="mr-2 text-primary-600" />
              Module Topics
            </h2>
            
            <div className="space-y-2">
              {module.topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => handleTopicSelect(topic)}
                  className={`w-full p-3 rounded-lg text-left flex items-center transition-all ${
                    activeTopic?.id === topic.id 
                      ? 'bg-primary-100 text-primary-700 border-l-4 border-primary-500' 
                      : isTopicCompleted(topic.id)
                        ? 'bg-green-50 text-medical-800 hover:bg-green-100'
                        : 'bg-medical-50 text-medical-700 hover:bg-medical-100'
                  }`}
                >
                  {isTopicCompleted(topic.id) ? (
                    <SafeIcon icon={FiCheckCircle} className="text-green-500 mr-2 flex-shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-current mr-2 flex-shrink-0" />
                  )}
                  <span className="flex-1">{topic.title}</span>
                </button>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-medical-200">
              <button
                onClick={handleQuizStart}
                disabled={moduleProgress < 100}
                className={`w-full py-3 rounded-lg font-medium flex items-center justify-center ${
                  moduleProgress === 100
                    ? 'bg-primary-500 text-white hover:bg-primary-600'
                    : 'bg-medical-100 text-medical-400 cursor-not-allowed'
                }`}
              >
                <SafeIcon icon={FiTarget} className="mr-2" />
                <span>{moduleProgress === 100 ? 'Take Module Quiz' : 'Complete All Topics First'}</span>
              </button>
              
              {progress.quizScores[`quiz-module${module.id}`] && (
                <div className="mt-3 text-center text-sm text-green-600">
                  <SafeIcon icon={FiCheck} className="inline-block mr-1" />
                  Quiz Score: {progress.quizScores[`quiz-module${module.id}`]}%
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Topic Content */}
        <div className="lg:col-span-2">
          {activeTopic && (
            <motion.div
              key={activeTopic.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200"
            >
              <h2 className="text-2xl font-bold text-medical-900 mb-4">{activeTopic.title}</h2>
              
              <div className="prose prose-medical max-w-none mb-8">
                <p className="text-medical-700 mb-6">{activeTopic.content}</p>
                
                <h3 className="text-xl font-semibold text-medical-800 mb-3">Key Points</h3>
                <ul className="space-y-2 mb-6">
                  {activeTopic.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <div className="text-primary-600 mr-2 mt-1">•</div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6">
                  <h4 className="font-semibold text-medical-800 flex items-center mb-2">
                    <SafeIcon icon={FiTarget} className="mr-2 text-yellow-600" />
                    Exam Focus
                  </h4>
                  <p className="text-medical-700">{activeTopic.examFocus}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-8 pt-4 border-t border-medical-200">
                <button
                  onClick={() => {
                    const currentIndex = module.topics.findIndex(t => t.id === activeTopic.id);
                    if (currentIndex > 0) {
                      handleTopicSelect(module.topics[currentIndex - 1]);
                    }
                  }}
                  disabled={module.topics.indexOf(activeTopic) === 0}
                  className={`px-4 py-2 rounded-lg ${
                    module.topics.indexOf(activeTopic) === 0
                      ? 'bg-medical-100 text-medical-400 cursor-not-allowed'
                      : 'bg-medical-100 text-medical-700 hover:bg-medical-200'
                  }`}
                >
                  Previous Topic
                </button>
                
                {isTopicCompleted(activeTopic.id) ? (
                  <div className="flex items-center text-green-600 font-medium">
                    <SafeIcon icon={FiCheckCircle} className="mr-2" />
                    Completed
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTopicComplete(activeTopic.id)}
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center"
                  >
                    <span>Mark as Completed</span>
                    <SafeIcon icon={FiCheck} className="ml-2" />
                  </motion.button>
                )}
                
                <button
                  onClick={() => {
                    const currentIndex = module.topics.findIndex(t => t.id === activeTopic.id);
                    if (currentIndex < module.topics.length - 1) {
                      handleTopicSelect(module.topics[currentIndex + 1]);
                    }
                  }}
                  disabled={module.topics.indexOf(activeTopic) === module.topics.length - 1}
                  className={`px-4 py-2 rounded-lg flex items-center ${
                    module.topics.indexOf(activeTopic) === module.topics.length - 1
                      ? 'bg-medical-100 text-medical-400 cursor-not-allowed'
                      : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                  }`}
                >
                  <span>Next Topic</span>
                  <SafeIcon icon={FiChevronRight} className="ml-1" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default SPIModuleView;