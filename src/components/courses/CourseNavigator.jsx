import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { spiCoursesExpanded } from '../../data/spiCoursesExpanded';
import { queryKnowledgeBase } from '../../services/knowledgeService';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBook, FiClock, FiTarget, FiChevronRight, FiStar, FiBookOpen, FiZap } = FiIcons;

function CourseNavigator() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState({});

  useEffect(() => {
    // Load AI insights for courses
    loadCourseInsights();
  }, []);

  const loadCourseInsights = async () => {
    setLoading(true);
    try {
      const insights = {};
      for (const course of spiCoursesExpanded.courses) {
        const response = await queryKnowledgeBase(
          `What are the key learning objectives for ${course.title}?`
        );
        insights[course.id] = response.answer;
      }
      setAiInsights(insights);
    } catch (error) {
      console.error('Error loading course insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
      case 'beginner to intermediate':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'intermediate':
      case 'intermediate to advanced':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'advanced':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-medical-900 mb-2">
              SPI Course Library
            </h1>
            <p className="text-medical-600">
              Comprehensive courses powered by AI and current research
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-medical-500">
              Content sourced from NotebookLM
            </div>
            <a 
              href={`https://notebooklm.google.com/notebook/${spiCoursesExpanded.resources.notebookIntegration.notebookId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 text-sm flex items-center space-x-1"
            >
              <span>View Research Notebook</span>
              <SafeIcon icon={FiBookOpen} />
            </a>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {spiCoursesExpanded.courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <SafeIcon icon={FiBook} className="text-xl text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-medical-900">{course.title}</h3>
                  <p className="text-sm text-medical-600">{course.description}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(course.difficulty)}`}>
                {course.difficulty}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiClock} className="text-medical-500" />
                <span className="text-sm text-medical-700">{course.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiTarget} className="text-medical-500" />
                <span className="text-sm text-medical-700">
                  {course.modules?.length || 0} Modules
                </span>
              </div>
            </div>

            {/* AI Insights */}
            {aiInsights[course.id] && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <SafeIcon icon={FiZap} className="text-blue-600" />
                  <span className="text-xs font-medium text-blue-700">AI Insights</span>
                </div>
                <p className="text-xs text-blue-800 line-clamp-2">
                  {aiInsights[course.id]}
                </p>
              </div>
            )}

            {/* Module Preview */}
            {course.modules && course.modules.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-medical-900 mb-2">Course Modules:</h4>
                <div className="space-y-1">
                  {course.modules.slice(0, 3).map((module, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-medical-600">
                      <SafeIcon icon={FiChevronRight} className="text-xs" />
                      <span>{module.title}</span>
                    </div>
                  ))}
                  {course.modules.length > 3 && (
                    <div className="text-xs text-medical-500">
                      +{course.modules.length - 3} more modules
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex space-x-3">
              <Link
                to={`/courses/${course.id}`}
                className="flex-1 bg-primary-500 text-white text-center py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors font-medium"
              >
                Start Course
              </Link>
              <button
                onClick={() => setSelectedCourse(course)}
                className="px-4 py-2 bg-medical-100 text-medical-700 rounded-lg hover:bg-medical-200 transition-colors"
              >
                Preview
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Assessment Section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
        <h2 className="text-2xl font-bold text-medical-900 mb-4 flex items-center">
          <SafeIcon icon={FiStar} className="mr-2 text-primary-600" />
          Comprehensive Assessment
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-medical-900 mb-2">
              {spiCoursesExpanded.assessments.comprehensiveExam.title}
            </h3>
            <p className="text-medical-600 mb-4">
              {spiCoursesExpanded.assessments.comprehensiveExam.description}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-medical-50 p-3 rounded-lg">
                <div className="font-semibold text-medical-900">
                  {spiCoursesExpanded.assessments.comprehensiveExam.questionCount}
                </div>
                <div className="text-xs text-medical-600">Questions</div>
              </div>
              <div className="bg-medical-50 p-3 rounded-lg">
                <div className="font-semibold text-medical-900">
                  {spiCoursesExpanded.assessments.comprehensiveExam.timeLimit} min
                </div>
                <div className="text-xs text-medical-600">Time Limit</div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-medical-900 mb-3">Exam Sections:</h4>
            <div className="space-y-2">
              {spiCoursesExpanded.assessments.comprehensiveExam.sections.map((section, idx) => (
                <div key={idx} className="flex justify-between items-center p-2 bg-medical-50 rounded">
                  <span className="text-sm text-medical-800">{section.name}</span>
                  <span className="text-xs text-medical-600">{section.questions} questions</span>
                </div>
              ))}
            </div>
            
            <Link
              to="/comprehensive-exam"
              className="w-full mt-4 bg-primary-500 text-white text-center py-3 px-4 rounded-lg hover:bg-primary-600 transition-colors font-medium inline-block"
            >
              Take Comprehensive Exam
            </Link>
          </div>
        </div>
      </div>

      {/* Course Preview Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCourse(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-medical-900 mb-4">
                {selectedCourse.title}
              </h3>
              
              <p className="text-medical-600 mb-6">{selectedCourse.description}</p>

              {selectedCourse.modules && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-medical-900">Course Modules:</h4>
                  {selectedCourse.modules.map((module, idx) => (
                    <div key={idx} className="p-4 bg-medical-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-medical-900">{module.title}</h5>
                        <span className="text-xs text-medical-500">
                          {module.estimatedHours}h
                        </span>
                      </div>
                      <p className="text-sm text-medical-600 mb-3">{module.description}</p>
                      
                      {module.learningObjectives && (
                        <div>
                          <h6 className="text-sm font-medium text-medical-800 mb-1">
                            Learning Objectives:
                          </h6>
                          <ul className="text-xs text-medical-600 space-y-1">
                            {module.learningObjectives.slice(0, 3).map((obj, i) => (
                              <li key={i} className="flex items-start space-x-2">
                                <span>•</span>
                                <span>{obj}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex space-x-3 mt-6">
                <Link
                  to={`/courses/${selectedCourse.id}`}
                  className="flex-1 bg-primary-500 text-white text-center py-3 px-4 rounded-lg hover:bg-primary-600 transition-colors font-medium"
                >
                  Start Course
                </Link>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="px-6 py-3 bg-medical-100 text-medical-700 rounded-lg hover:bg-medical-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default CourseNavigator;