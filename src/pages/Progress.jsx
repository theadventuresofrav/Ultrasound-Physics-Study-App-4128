import React from 'react';
import { motion } from 'framer-motion';
import { useStudy } from '../context/StudyContext';
import { sections } from '../data/questions';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiTarget, FiClock, FiAward, FiBookOpen, FiCheckCircle } = FiIcons;

function Progress() {
  const { state } = useStudy();
  const { progress, quizResults } = state;

  const totalQuestions = sections.reduce((sum, section) => sum + section.questions.length, 0);
  const completionRate = Math.round((progress.correctAnswers.length / Math.max(progress.questionsAnswered.length, 1)) * 100);
  const overallProgress = Math.round((progress.questionsAnswered.length / totalQuestions) * 100);

  const getSectionStats = () => {
    return sections.map(section => {
      const sectionQuestions = section.questions.map(q => q.id);
      const answered = progress.questionsAnswered.filter(id => sectionQuestions.includes(id)).length;
      const correct = progress.correctAnswers.filter(id => sectionQuestions.includes(id)).length;
      const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;
      const completion = Math.round((answered / sectionQuestions.length) * 100);
      
      return {
        ...section,
        answered,
        correct,
        accuracy,
        completion,
        total: sectionQuestions.length
      };
    });
  };

  const getRecentQuizzes = () => {
    return quizResults.slice(-5).reverse();
  };

  const sectionStats = getSectionStats();
  const recentQuizzes = getRecentQuizzes();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-medical-900 mb-2">Your Progress</h1>
        <p className="text-medical-600">Track your learning journey and identify areas for improvement</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: 'Overall Progress',
            value: `${overallProgress}%`,
            icon: FiTrendingUp,
            color: 'text-blue-600',
            bg: 'bg-blue-50'
          },
          {
            label: 'Accuracy Rate',
            value: `${completionRate}%`,
            icon: FiTarget,
            color: 'text-green-600',
            bg: 'bg-green-50'
          },
          {
            label: 'Study Time',
            value: `${Math.round(progress.studyTime / 60)}min`,
            icon: FiClock,
            color: 'text-purple-600',
            bg: 'bg-purple-50'
          },
          {
            label: 'Best Streak',
            value: progress.streaks.longest,
            icon: FiAward,
            color: 'text-orange-600',
            bg: 'bg-orange-50'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${stat.bg} rounded-xl p-6 border border-opacity-20`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-medical-600">{stat.label}</div>
              </div>
              <SafeIcon icon={stat.icon} className={`text-2xl ${stat.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Section Progress */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-medical-200">
        <h2 className="text-2xl font-bold text-medical-900 mb-6">Section Progress</h2>
        <div className="space-y-4">
          {sectionStats.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-white rounded-xl border border-medical-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${section.color} text-white`}>
                    <SafeIcon icon={FiBookOpen} className="text-sm" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-medical-900">{section.title}</h3>
                    <p className="text-sm text-medical-600">
                      {section.answered}/{section.total} questions answered
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-medical-900">{section.completion}%</div>
                  <div className="text-sm text-medical-600">Complete</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-700">{section.accuracy}%</div>
                  <div className="text-xs text-green-600">Accuracy</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-700">{section.correct}</div>
                  <div className="text-xs text-blue-600">Correct</div>
                </div>
              </div>
              
              <div className="h-2 bg-medical-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${section.completion}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`h-full ${section.color} rounded-full`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Quiz Results */}
      {recentQuizzes.length > 0 && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-medical-200">
          <h2 className="text-2xl font-bold text-medical-900 mb-6">Recent Quiz Results</h2>
          <div className="space-y-4">
            {recentQuizzes.map((quiz, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-white rounded-xl border border-medical-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      quiz.percentage >= 80 ? 'bg-green-100' : 
                      quiz.percentage >= 60 ? 'bg-yellow-100' : 'bg-red-100'
                    }`}>
                      <SafeIcon 
                        icon={FiCheckCircle} 
                        className={`text-sm ${
                          quiz.percentage >= 80 ? 'text-green-600' : 
                          quiz.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
                        }`} 
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-medical-900">
                        Quiz - {new Date(quiz.date).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-medical-600">
                        {quiz.score}/{quiz.total} questions correct
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-medical-900">{quiz.percentage}%</div>
                    <div className="text-sm text-medical-600">
                      {Math.floor(quiz.timeElapsed / 60)}:{(quiz.timeElapsed % 60).toString().padStart(2, '0')}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default Progress;