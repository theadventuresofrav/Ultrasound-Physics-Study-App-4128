import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import ExamQuestion from './ExamQuestion';
import ReactECharts from 'echarts-for-react';

const { FiArrowRight, FiCheck, FiX, FiAlertCircle, FiCheckCircle, FiClock, FiTarget, FiFilter } = FiIcons;

function ExamResults({ answers, questions, timeSpent }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  // Calculate results
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = totalQuestions - answeredCount;

  // Count correct answers
  const correctAnswers = questions.filter(q => answers[q.id] === q.correctAnswer);
  const correctCount = correctAnswers.length;
  const incorrectCount = answeredCount - correctCount;

  // Calculate score
  const score = Math.round((correctCount / totalQuestions) * 100);
  const passed = score >= 75; // Passing threshold is 75%

  // Format time spent
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else {
      return `${minutes}m ${secs}s`;
    }
  };

  // Filter questions based on selected filter
  const getFilteredQuestions = () => {
    switch (selectedFilter) {
      case 'correct':
        return questions.filter(q => answers[q.id] === q.correctAnswer);
      case 'incorrect':
        return questions.filter(q => answers[q.id] !== undefined && answers[q.id] !== q.correctAnswer);
      case 'unanswered':
        return questions.filter(q => answers[q.id] === undefined);
      default:
        return questions;
    }
  };

  // Chart options
  const chartOptions = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center',
      textStyle: {
        color: '#64748b'
      }
    },
    series: [
      {
        name: 'Results',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          {
            value: correctCount,
            name: 'Correct',
            itemStyle: { color: '#10b981' }
          },
          {
            value: incorrectCount,
            name: 'Incorrect',
            itemStyle: { color: '#ef4444' }
          },
          {
            value: unansweredCount,
            name: 'Unanswered',
            itemStyle: { color: '#64748b' }
          }
        ]
      }
    ]
  };

  const filteredQuestions = getFilteredQuestions();
  const selectedQuestion = questions.find(q => q.id === selectedQuestionId) || filteredQuestions[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto"
    >
      {/* Results Summary */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-medical-200 shadow-lg mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-medical-900 mb-2">Exam Results</h1>
            <p className="text-medical-600">
              {passed
                ? "Congratulations! You've passed the Sonographer Aptitude Test."
                : "You did not pass this time, but keep practicing!"}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className={`text-4xl font-bold ${passed ? 'text-green-600' : 'text-red-600'}`}>
              {score}%
            </div>
            <div className="text-medical-500 text-sm">
              {passed ? 'Pass' : 'Fail'} (75% needed to pass)
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Results Chart */}
          <div className="h-80">
            <ReactECharts option={chartOptions} style={{ height: '100%' }} />
          </div>

          {/* Statistics */}
          <div className="space-y-4 flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                <div className="flex items-center space-x-2 mb-2">
                  <SafeIcon icon={FiCheckCircle} className="text-green-600" />
                  <h3 className="font-semibold text-medical-900">Correct</h3>
                </div>
                <div className="text-2xl font-bold text-green-600">{correctCount}</div>
                <div className="text-sm text-medical-500">questions</div>
              </div>

              <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                <div className="flex items-center space-x-2 mb-2">
                  <SafeIcon icon={FiX} className="text-red-600" />
                  <h3 className="font-semibold text-medical-900">Incorrect</h3>
                </div>
                <div className="text-2xl font-bold text-red-600">{incorrectCount}</div>
                <div className="text-sm text-medical-500">questions</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-medical-50 p-4 rounded-xl border border-medical-100">
                <div className="flex items-center space-x-2 mb-2">
                  <SafeIcon icon={FiAlertCircle} className="text-medical-600" />
                  <h3 className="font-semibold text-medical-900">Unanswered</h3>
                </div>
                <div className="text-2xl font-bold text-medical-600">{unansweredCount}</div>
                <div className="text-sm text-medical-500">questions</div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <div className="flex items-center space-x-2 mb-2">
                  <SafeIcon icon={FiClock} className="text-blue-600" />
                  <h3 className="font-semibold text-medical-900">Time Spent</h3>
                </div>
                <div className="text-2xl font-bold text-blue-600">{formatTime(timeSpent)}</div>
                <div className="text-sm text-medical-500">of 3 hours</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Link
            to="/"
            className="px-6 py-3 bg-medical-100 text-medical-700 font-medium rounded-xl hover:bg-medical-200 transition-colors"
          >
            Return to Dashboard
          </Link>
          <Link
            to="/quiz/practice"
            className="px-6 py-3 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-colors flex items-center space-x-2"
          >
            <span>Practice More Questions</span>
            <SafeIcon icon={FiArrowRight} />
          </Link>
        </div>
      </div>

      {/* Question Review */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-medical-200 shadow-lg">
        <h2 className="text-2xl font-bold text-medical-900 mb-6">Review Questions</h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-medical-50 p-4 rounded-xl border border-medical-100">
              <div className="flex items-center space-x-2 mb-4">
                <SafeIcon icon={FiFilter} className="text-medical-600" />
                <h3 className="font-semibold text-medical-900">Filters</h3>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedFilter('all')}
                  className={`w-full p-2 rounded-lg text-left ${
                    selectedFilter === 'all'
                      ? 'bg-medical-200 text-medical-800'
                      : 'bg-white text-medical-600 hover:bg-medical-100'
                  }`}
                >
                  All Questions ({totalQuestions})
                </button>
                <button
                  onClick={() => setSelectedFilter('correct')}
                  className={`w-full p-2 rounded-lg text-left ${
                    selectedFilter === 'correct'
                      ? 'bg-green-200 text-green-800'
                      : 'bg-white text-medical-600 hover:bg-medical-100'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiCheck} className="text-green-600" />
                    <span>Correct ({correctCount})</span>
                  </div>
                </button>
                <button
                  onClick={() => setSelectedFilter('incorrect')}
                  className={`w-full p-2 rounded-lg text-left ${
                    selectedFilter === 'incorrect'
                      ? 'bg-red-200 text-red-800'
                      : 'bg-white text-medical-600 hover:bg-medical-100'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiX} className="text-red-600" />
                    <span>Incorrect ({incorrectCount})</span>
                  </div>
                </button>
                <button
                  onClick={() => setSelectedFilter('unanswered')}
                  className={`w-full p-2 rounded-lg text-left ${
                    selectedFilter === 'unanswered'
                      ? 'bg-medical-200 text-medical-800'
                      : 'bg-white text-medical-600 hover:bg-medical-100'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiAlertCircle} className="text-medical-600" />
                    <span>Unanswered ({unansweredCount})</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Question List */}
            <div className="bg-white p-4 rounded-xl border border-medical-100 max-h-[400px] overflow-y-auto">
              <h3 className="font-semibold text-medical-900 mb-3">Questions</h3>
              <div className="space-y-2">
                {filteredQuestions.map((question, index) => {
                  const isSelected = selectedQuestionId === question.id;
                  const isAnswered = answers[question.id] !== undefined;
                  const isCorrect = answers[question.id] === question.correctAnswer;

                  let buttonClasses = "w-full p-2 rounded-lg text-left text-sm transition-all";
                  if (isSelected) {
                    buttonClasses += " bg-primary-100 border-l-4 border-primary-500 text-primary-800";
                  } else if (!isAnswered) {
                    buttonClasses += " text-medical-600 hover:bg-medical-50";
                  } else if (isCorrect) {
                    buttonClasses += " text-green-600 hover:bg-green-50";
                  } else {
                    buttonClasses += " text-red-600 hover:bg-red-50";
                  }

                  return (
                    <button
                      key={question.id}
                      onClick={() => setSelectedQuestionId(question.id)}
                      className={buttonClasses}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Q{questions.indexOf(question) + 1}.</span>
                        <span className="truncate">{question.question.substring(0, 40)}...</span>
                        {!isAnswered ? (
                          <SafeIcon icon={FiAlertCircle} className="text-medical-400 ml-auto" />
                        ) : isCorrect ? (
                          <SafeIcon icon={FiCheck} className="text-green-500 ml-auto" />
                        ) : (
                          <SafeIcon icon={FiX} className="text-red-500 ml-auto" />
                        )}
                      </div>
                    </button>
                  );
                })}
                {filteredQuestions.length === 0 && (
                  <div className="text-center py-4 text-medical-500">
                    No questions match the selected filter
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Question Detail */}
          <div className="lg:col-span-3">
            {selectedQuestion && (
              <div className="bg-white p-6 rounded-xl border border-medical-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-medical-900">
                    Question {questions.indexOf(selectedQuestion) + 1}
                  </h3>
                  {answers[selectedQuestion.id] !== undefined ? (
                    answers[selectedQuestion.id] === selectedQuestion.correctAnswer ? (
                      <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        Correct Answer
                      </div>
                    ) : (
                      <div className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                        Incorrect Answer
                      </div>
                    )
                  ) : (
                    <div className="px-3 py-1 bg-medical-100 text-medical-700 rounded-full text-sm font-medium">
                      Not Answered
                    </div>
                  )}
                </div>

                <ExamQuestion
                  question={selectedQuestion}
                  selectedAnswer={answers[selectedQuestion.id]}
                  onAnswerSelect={() => {}} // No-op since we're in review mode
                  showExplanation={true}
                />

                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => {
                      const currentIndex = filteredQuestions.findIndex(q => q.id === selectedQuestion.id);
                      if (currentIndex > 0) {
                        setSelectedQuestionId(filteredQuestions[currentIndex - 1].id);
                      }
                    }}
                    disabled={filteredQuestions.indexOf(selectedQuestion) === 0}
                    className={`px-4 py-2 rounded-lg ${
                      filteredQuestions.indexOf(selectedQuestion) === 0
                        ? 'bg-medical-100 text-medical-400 cursor-not-allowed'
                        : 'bg-medical-100 text-medical-700 hover:bg-medical-200'
                    }`}
                  >
                    Previous Question
                  </button>
                  <button
                    onClick={() => {
                      const currentIndex = filteredQuestions.findIndex(q => q.id === selectedQuestion.id);
                      if (currentIndex < filteredQuestions.length - 1) {
                        setSelectedQuestionId(filteredQuestions[currentIndex + 1].id);
                      }
                    }}
                    disabled={filteredQuestions.indexOf(selectedQuestion) === filteredQuestions.length - 1}
                    className={`px-4 py-2 rounded-lg ${
                      filteredQuestions.indexOf(selectedQuestion) === filteredQuestions.length - 1
                        ? 'bg-medical-100 text-medical-400 cursor-not-allowed'
                        : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                    }`}
                  >
                    Next Question
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ExamResults;