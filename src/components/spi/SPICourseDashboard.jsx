import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { spiCourse } from '../../data/spiCourseData';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBook, FiCheckCircle, FiClock, FiBarChart2, FiCalendar, FiAward, FiTrendingUp, FiArrowRight } = FiIcons;

function SPICourseDashboard() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState({
    moduleProgress: {},
    quizScores: {},
    studyTime: {},
    completedTopics: [],
    finalExamScore: null,
    finalExamAttempts: 0
  });
  const [activeModule, setActiveModule] = useState(null);

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('spi-course-progress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Calculate overall course progress
  const calculateOverallProgress = () => {
    const totalTopics = spiCourse.modules.reduce(
      (sum, module) => sum + module.topics.length,
      0
    );
    const completedTopics = progress.completedTopics.length;
    return Math.round((completedTopics / totalTopics) * 100);
  };

  // Calculate study time
  const totalStudyTime = Object.values(progress.studyTime).reduce(
    (sum, time) => sum + time,
    0
  );

  // Calculate average quiz score
  const calculateAverageQuizScore = () => {
    const scores = Object.values(progress.quizScores);
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  };

  const handleModuleSelect = (moduleId) => {
    navigate(`/spi-course/module/${moduleId}`);
  };

  const handleFinalExam = () => {
    navigate('/spi-course/final-exam');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-medical-900 mb-2">
          SPI Exam Preparation Course
        </h1>
        <p className="text-medical-600">
          Comprehensive preparation for the ARDMS Sonography Principles & Instrumentation exam
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200 mb-8">
        <h2 className="text-xl font-bold text-medical-900 mb-4 flex items-center">
          <SafeIcon icon={FiBarChart2} className="mr-2 text-primary-600" />
          Course Progress
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-primary-50 rounded-xl p-4 border border-primary-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-primary-600">{calculateOverallProgress()}%</div>
                <div className="text-sm text-medical-600">Course Completion</div>
              </div>
              <SafeIcon icon={FiTrendingUp} className="text-2xl text-primary-600" />
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{calculateAverageQuizScore()}%</div>
                <div className="text-sm text-medical-600">Average Quiz Score</div>
              </div>
              <SafeIcon icon={FiCheckCircle} className="text-2xl text-green-600" />
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{totalStudyTime} min</div>
                <div className="text-sm text-medical-600">Total Study Time</div>
              </div>
              <SafeIcon icon={FiClock} className="text-2xl text-blue-600" />
            </div>
          </div>

          <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {progress.finalExamScore ? `${progress.finalExamScore}%` : 'Not taken'}
                </div>
                <div className="text-sm text-medical-600">Final Exam Score</div>
              </div>
              <SafeIcon icon={FiAward} className="text-2xl text-purple-600" />
            </div>
          </div>
        </div>

        <div className="h-4 bg-medical-100 rounded-full overflow-hidden mb-1">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${calculateOverallProgress()}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-primary-500 rounded-full"
          />
        </div>
        <div className="flex justify-between text-sm text-medical-500">
          <span>Progress: {calculateOverallProgress()}% complete</span>
          <span>
            {progress.completedTopics.length} of {spiCourse.modules.reduce((sum, module) => sum + module.topics.length, 0)} topics completed
          </span>
        </div>
      </div>

      {/* Course Modules */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200 mb-8">
        <h2 className="text-xl font-bold text-medical-900 mb-4 flex items-center">
          <SafeIcon icon={FiBook} className="mr-2 text-primary-600" />
          Course Modules
        </h2>

        <div className="space-y-4">
          {spiCourse.modules.map((module) => {
            // Calculate module progress
            const totalTopics = module.topics.length;
            const completedTopics = module.topics.filter(topic =>
              progress.completedTopics.includes(topic.id)
            ).length;
            const moduleProgress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

            return (
              <motion.div
                key={module.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => handleModuleSelect(module.id)}
                className="p-4 bg-white rounded-xl border border-medical-200 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-3 font-bold">
                        {module.id}
                      </div>
                      <h3 className="text-lg font-semibold text-medical-900">{module.title}</h3>
                    </div>
                    <p className="text-sm text-medical-600 mt-1 ml-11">{module.description}</p>
                    <div className="flex items-center space-x-4 mt-2 ml-11">
                      <div className="flex items-center text-sm text-medical-500">
                        <SafeIcon icon={FiClock} className="mr-1" />
                        <span>{module.estimatedHours} hrs</span>
                      </div>
                      <div className="flex items-center text-sm text-medical-500">
                        <SafeIcon icon={FiBook} className="mr-1" />
                        <span>{module.topics.length} topics</span>
                      </div>
                      {progress.quizScores[`quiz-module${module.id}`] && (
                        <div className="flex items-center text-sm text-green-600">
                          <SafeIcon icon={FiCheckCircle} className="mr-1" />
                          <span>Quiz: {progress.quizScores[`quiz-module${module.id}`]}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary-600">{moduleProgress}%</div>
                    <div className="w-16 h-2 bg-medical-100 rounded-full mt-1">
                      <div
                        className="h-full bg-primary-500 rounded-full"
                        style={{ width: `${moduleProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Final Exam and Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
          <h2 className="text-xl font-bold text-medical-900 mb-4 flex items-center">
            <SafeIcon icon={FiAward} className="mr-2 text-primary-600" />
            Final Practice Exam
          </h2>
          <p className="text-medical-600 mb-4">
            Test your knowledge with our comprehensive final practice exam, designed to simulate the actual SPI exam experience.
          </p>
          
          {progress.finalExamScore ? (
            <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-medical-900">Your best score</div>
                  <div className="text-sm text-medical-600">Attempts: {progress.finalExamAttempts}</div>
                </div>
                <div className="text-2xl font-bold text-green-600">{progress.finalExamScore}%</div>
              </div>
            </div>
          ) : (
            <div className="mb-4 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
              <div className="text-yellow-800">
                You haven't taken the final exam yet. Complete all modules first for best results.
              </div>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleFinalExam}
            className="w-full py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
          >
            {progress.finalExamScore ? 'Retake Final Exam' : 'Start Final Exam'}
          </motion.button>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
          <h2 className="text-xl font-bold text-medical-900 mb-4 flex items-center">
            <SafeIcon icon={FiBook} className="mr-2 text-primary-600" />
            Recommended Resources
          </h2>
          
          <div className="space-y-3">
            {spiCourse.resources.slice(0, 4).map((resource, index) => (
              <div key={index} className="p-3 bg-medical-50 rounded-lg">
                <div className="font-medium text-medical-900">{resource.title}</div>
                <div className="text-sm text-medical-600">{resource.author}</div>
                <div className="text-xs text-primary-600 mt-1">{resource.type}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/spi-course/resources')}
            className="mt-4 text-primary-600 hover:text-primary-700 text-sm flex items-center"
          >
            View all resources
            <SafeIcon icon={FiArrowRight} className="ml-1 text-xs" />
          </button>
        </div>
      </div>

      {/* Exam Information */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
        <h2 className="text-xl font-bold text-medical-900 mb-4 flex items-center">
          <SafeIcon icon={FiCalendar} className="mr-2 text-primary-600" />
          SPI Exam Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-medical-50 rounded-lg">
            <div className="font-medium text-medical-900">Format</div>
            <div className="text-medical-600">{spiCourse.examInfo.format}</div>
          </div>
          <div className="p-4 bg-medical-50 rounded-lg">
            <div className="font-medium text-medical-900">Questions</div>
            <div className="text-medical-600">{spiCourse.examInfo.questions} multiple choice</div>
          </div>
          <div className="p-4 bg-medical-50 rounded-lg">
            <div className="font-medium text-medical-900">Passing Score</div>
            <div className="text-medical-600">{spiCourse.examInfo.passingScore} (scaled)</div>
          </div>
          <div className="p-4 bg-medical-50 rounded-lg">
            <div className="font-medium text-medical-900">Time Limit</div>
            <div className="text-medical-600">{spiCourse.examInfo.timeLimit}</div>
          </div>
        </div>
        
        <p className="mt-4 text-sm text-medical-600">
          The SPI examination is a prerequisite to all ARDMS specialty examinations. Your SPI examination requirement is valid for five years from the date of examination.
        </p>
      </div>
    </motion.div>
  );
}

export default SPICourseDashboard;