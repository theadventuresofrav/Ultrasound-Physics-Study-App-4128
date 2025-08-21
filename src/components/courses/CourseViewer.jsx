import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { spiCoursesExpanded } from '../../data/spiCoursesExpanded';
import { queryKnowledgeBase, getRelatedContent } from '../../services/knowledgeService';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiArrowLeft, FiBook, FiCheckCircle, FiClock, FiTarget, 
  FiChevronRight, FiPlay, FiPause, FiZap, FiBookOpen, FiMessageSquare 
} = FiIcons;

function CourseViewer() {
  const { courseId, moduleId, topicId } = useParams();
  const [course, setCourse] = useState(null);
  const [currentModule, setCurrentModule] = useState(null);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [progress, setProgress] = useState({});
  const [aiContent, setAiContent] = useState({});
  const [relatedContent, setRelatedContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourse();
  }, [courseId]);

  useEffect(() => {
    if (course && moduleId) {
      loadModule();
    }
  }, [course, moduleId]);

  useEffect(() => {
    if (currentModule && topicId) {
      loadTopic();
    }
  }, [currentModule, topicId]);

  const loadCourse = () => {
    const foundCourse = spiCoursesExpanded.courses.find(c => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
      // Load first module if no specific module requested
      if (!moduleId && foundCourse.modules?.length > 0) {
        setCurrentModule(foundCourse.modules[0]);
        if (foundCourse.modules[0].topics?.length > 0) {
          setCurrentTopic(foundCourse.modules[0].topics[0]);
        }
      }
    }
    setLoading(false);
  };

  const loadModule = () => {
    const module = course.modules.find(m => m.id === parseInt(moduleId));
    if (module) {
      setCurrentModule(module);
      if (!topicId && module.topics?.length > 0) {
        setCurrentTopic(module.topics[0]);
      }
    }
  };

  const loadTopic = async () => {
    const topic = currentModule.topics.find(t => t.id === topicId);
    if (topic) {
      setCurrentTopic(topic);
      
      // Load AI-enhanced content
      if (topic.notebookQueries) {
        setLoading(true);
        try {
          const aiEnhancedContent = {};
          for (const query of topic.notebookQueries) {
            const response = await queryKnowledgeBase(query);
            aiEnhancedContent[query] = response.answer;
          }
          setAiContent(aiEnhancedContent);
          
          // Get related content
          const related = await getRelatedContent(topic.title);
          setRelatedContent(related);
        } catch (error) {
          console.error('Error loading AI content:', error);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const markTopicComplete = (topicId) => {
    setProgress(prev => ({
      ...prev,
      [topicId]: { completed: true, completedAt: new Date().toISOString() }
    }));
  };

  const getNextTopic = () => {
    if (!currentModule || !currentTopic) return null;
    
    const currentTopicIndex = currentModule.topics.findIndex(t => t.id === currentTopic.id);
    if (currentTopicIndex < currentModule.topics.length - 1) {
      return currentModule.topics[currentTopicIndex + 1];
    }
    
    // Check next module
    const currentModuleIndex = course.modules.findIndex(m => m.id === currentModule.id);
    if (currentModuleIndex < course.modules.length - 1) {
      const nextModule = course.modules[currentModuleIndex + 1];
      return nextModule.topics?.[0] || null;
    }
    
    return null;
  };

  const getPreviousTopic = () => {
    if (!currentModule || !currentTopic) return null;
    
    const currentTopicIndex = currentModule.topics.findIndex(t => t.id === currentTopic.id);
    if (currentTopicIndex > 0) {
      return currentModule.topics[currentTopicIndex - 1];
    }
    
    // Check previous module
    const currentModuleIndex = course.modules.findIndex(m => m.id === currentModule.id);
    if (currentModuleIndex > 0) {
      const prevModule = course.modules[currentModuleIndex - 1];
      const topics = prevModule.topics || [];
      return topics[topics.length - 1] || null;
    }
    
    return null;
  };

  if (loading && !course) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-medical-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-medical-900 mb-4">Course not found</h2>
        <Link to="/courses" className="text-primary-600 hover:text-primary-700">
          Return to Course Library
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      {/* Breadcrumb Navigation */}
      <div className="mb-8">
        <nav className="flex items-center space-x-2 text-sm text-medical-600 mb-4">
          <Link to="/courses" className="hover:text-primary-600">Courses</Link>
          <SafeIcon icon={FiChevronRight} className="text-xs" />
          <span className="text-medical-900 font-medium">{course.title}</span>
          {currentModule && (
            <>
              <SafeIcon icon={FiChevronRight} className="text-xs" />
              <span className="text-medical-900 font-medium">{currentModule.title}</span>
            </>
          )}
          {currentTopic && (
            <>
              <SafeIcon icon={FiChevronRight} className="text-xs" />
              <span className="text-medical-900 font-medium">{currentTopic.title}</span>
            </>
          )}
        </nav>
        
        <Link 
          to="/courses" 
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700"
        >
          <SafeIcon icon={FiArrowLeft} />
          <span>Back to Course Library</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - Course Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-medical-200 sticky top-20">
            <h3 className="font-bold text-medical-900 mb-4 flex items-center">
              <SafeIcon icon={FiBook} className="mr-2 text-primary-600" />
              Course Modules
            </h3>
            
            <div className="space-y-2">
              {course.modules?.map((module) => (
                <div key={module.id} className="border-b border-medical-100 last:border-0 pb-2">
                  <button
                    onClick={() => setCurrentModule(module)}
                    className={`w-full text-left p-2 rounded-lg transition-colors ${
                      currentModule?.id === module.id 
                        ? 'bg-primary-100 text-primary-700' 
                        : 'hover:bg-medical-50'
                    }`}
                  >
                    <div className="font-medium text-sm">{module.title}</div>
                    <div className="text-xs text-medical-500">{module.estimatedHours}h</div>
                  </button>
                  
                  {currentModule?.id === module.id && module.topics && (
                    <div className="ml-4 mt-2 space-y-1">
                      {module.topics.map((topic) => (
                        <Link
                          key={topic.id}
                          to={`/courses/${courseId}/${module.id}/${topic.id}`}
                          className={`block p-2 rounded text-xs transition-colors ${
                            currentTopic?.id === topic.id
                              ? 'bg-primary-50 text-primary-700 border-l-2 border-primary-500'
                              : 'text-medical-600 hover:bg-medical-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{topic.title}</span>
                            {progress[topic.id]?.completed && (
                              <SafeIcon icon={FiCheckCircle} className="text-green-500" />
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {currentTopic ? (
            <motion.div
              key={currentTopic.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Topic Header */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold text-medical-900">{currentTopic.title}</h1>
                  {!progress[currentTopic.id]?.completed && (
                    <button
                      onClick={() => markTopicComplete(currentTopic.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <SafeIcon icon={FiCheckCircle} />
                      <span>Mark Complete</span>
                    </button>
                  )}
                </div>

                {/* Key Points */}
                {currentTopic.keyPoints && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-medical-900 mb-3 flex items-center">
                      <SafeIcon icon={FiTarget} className="mr-2 text-primary-600" />
                      Key Learning Points
                    </h3>
                    <ul className="space-y-2">
                      {currentTopic.keyPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-medical-700">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Topic Content */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
                <div className="prose prose-medical max-w-none">
                  {currentTopic.content.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4 text-medical-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* AI-Enhanced Content */}
              {Object.keys(aiContent).length > 0 && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
                  <h3 className="font-semibold text-medical-900 mb-4 flex items-center">
                    <SafeIcon icon={FiZap} className="mr-2 text-blue-600" />
                    AI-Enhanced Insights
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(aiContent).map(([query, answer], idx) => (
                      <div key={idx} className="bg-white/70 rounded-lg p-4">
                        <h4 className="font-medium text-blue-900 mb-2">{query}</h4>
                        <p className="text-blue-800 text-sm leading-relaxed">{answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Exam Focus */}
              {currentTopic.examFocus && (
                <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
                  <h3 className="font-semibold text-medical-900 mb-3 flex items-center">
                    <SafeIcon icon={FiTarget} className="mr-2 text-yellow-600" />
                    SPI Exam Focus
                  </h3>
                  <p className="text-yellow-800">{currentTopic.examFocus}</p>
                </div>
              )}

              {/* Related Content */}
              {relatedContent.length > 0 && (
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
                  <h3 className="font-semibold text-medical-900 mb-4 flex items-center">
                    <SafeIcon icon={FiBookOpen} className="mr-2 text-primary-600" />
                    Related Resources
                  </h3>
                  <div className="grid gap-3">
                    {relatedContent.map((item, idx) => (
                      <div key={idx} className="p-3 bg-medical-50 rounded-lg">
                        <h4 className="font-medium text-medical-900 text-sm">{item.title}</h4>
                        <p className="text-xs text-medical-600 mt-1">{item.snippet}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <div>
                  {getPreviousTopic() && (
                    <Link
                      to={`/courses/${courseId}/${currentModule.id}/${getPreviousTopic().id}`}
                      className="flex items-center space-x-2 px-4 py-2 bg-medical-100 text-medical-700 rounded-lg hover:bg-medical-200 transition-colors"
                    >
                      <SafeIcon icon={FiArrowLeft} />
                      <span>Previous</span>
                    </Link>
                  )}
                </div>
                
                <div>
                  {getNextTopic() && (
                    <Link
                      to={`/courses/${courseId}/${currentModule.id}/${getNextTopic().id}`}
                      className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      <span>Next</span>
                      <SafeIcon icon={FiChevronRight} />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ) : currentModule ? (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
              <h2 className="text-2xl font-bold text-medical-900 mb-4">{currentModule.title}</h2>
              <p className="text-medical-600 mb-6">{currentModule.description}</p>
              
              {currentModule.learningObjectives && (
                <div className="mb-6">
                  <h3 className="font-semibold text-medical-900 mb-3">Learning Objectives:</h3>
                  <ul className="space-y-2">
                    {currentModule.learningObjectives.map((objective, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <SafeIcon icon={FiTarget} className="text-primary-600 mt-1" />
                        <span className="text-medical-700">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {currentModule.topics && (
                <div>
                  <h3 className="font-semibold text-medical-900 mb-3">Topics in this Module:</h3>
                  <div className="grid gap-3">
                    {currentModule.topics.map((topic) => (
                      <Link
                        key={topic.id}
                        to={`/courses/${courseId}/${currentModule.id}/${topic.id}`}
                        className="p-4 bg-medical-50 rounded-lg hover:bg-medical-100 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-medical-900">{topic.title}</h4>
                          <SafeIcon icon={FiChevronRight} className="text-primary-600" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
              <h2 className="text-2xl font-bold text-medical-900 mb-4">{course.title}</h2>
              <p className="text-medical-600 mb-6">{course.description}</p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-medical-50 p-4 rounded-lg">
                  <SafeIcon icon={FiClock} className="text-primary-600 mb-2" />
                  <div className="font-semibold text-medical-900">{course.duration}</div>
                  <div className="text-sm text-medical-600">Course Duration</div>
                </div>
                <div className="bg-medical-50 p-4 rounded-lg">
                  <SafeIcon icon={FiBook} className="text-primary-600 mb-2" />
                  <div className="font-semibold text-medical-900">{course.modules?.length || 0}</div>
                  <div className="text-sm text-medical-600">Modules</div>
                </div>
              </div>

              <p className="text-medical-600">
                Select a module from the sidebar to begin your learning journey.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default CourseViewer;