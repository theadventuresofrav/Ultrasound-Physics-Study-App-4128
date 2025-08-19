import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStudy } from '../context/StudyContext';
import ReactECharts from 'echarts-for-react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiClock, FiTarget, FiCalendar, FiActivity, FiPieChart } = FiIcons;

function Analytics() {
  const { state } = useStudy();
  const [timeRange, setTimeRange] = useState('week');

  // Calculate performance metrics
  const calculateMetrics = () => {
    const totalQuestions = state.progress.questionsAnswered.length;
    const correctAnswers = state.progress.correctAnswers.length;
    const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
    const studyTime = Math.round(state.progress.studyTime / 60); // Convert to minutes
    const streak = state.progress.streaks.current;

    return {
      totalQuestions,
      correctAnswers,
      accuracy,
      studyTime,
      streak
    };
  };

  const metrics = calculateMetrics();

  // Progress over time chart options
  const getProgressChartOptions = () => {
    const dates = state.quizResults.map(result => new Date(result.date).toLocaleDateString());
    const scores = state.quizResults.map(result => result.percentage);

    return {
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: {c}%'
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: {
          rotate: 45
        }
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 100,
        name: 'Score (%)'
      },
      series: [{
        data: scores,
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#0ea5e9'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: 'rgba(14, 165, 233, 0.3)'
            }, {
              offset: 1,
              color: 'rgba(14, 165, 233, 0.05)'
            }]
          }
        }
      }]
    };
  };

  // Topic performance chart options
  const getTopicChartOptions = () => {
    const topicData = state.progress.sectionsCompleted.map(section => ({
      value: section.accuracy,
      name: section.title
    }));

    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}%'
      },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false
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
        data: topicData
      }]
    };
  };

  // Study time distribution chart options
  const getStudyTimeChartOptions = () => {
    const timeData = [
      { value: 120, name: 'Basic Physics' },
      { value: 90, name: 'Transducers' },
      { value: 150, name: 'Doppler' },
      { value: 60, name: 'Artifacts' }
    ];

    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} minutes'
      },
      series: [{
        type: 'pie',
        radius: '70%',
        data: timeData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-medical-900 mb-2">Analytics Dashboard</h1>
        <p className="text-medical-600">Track your study progress and performance metrics</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex space-x-4">
        {['week', 'month', 'year'].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              timeRange === range
                ? 'bg-primary-500 text-white'
                : 'bg-white text-medical-700 hover:bg-medical-50'
            }`}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl p-6 border border-medical-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-primary-600">{metrics.accuracy}%</div>
              <div className="text-sm text-medical-600">Overall Accuracy</div>
            </div>
            <SafeIcon icon={FiTarget} className="text-2xl text-primary-600" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl p-6 border border-medical-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">{metrics.totalQuestions}</div>
              <div className="text-sm text-medical-600">Questions Answered</div>
            </div>
            <SafeIcon icon={FiActivity} className="text-2xl text-green-600" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl p-6 border border-medical-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600">{metrics.studyTime}min</div>
              <div className="text-sm text-medical-600">Total Study Time</div>
            </div>
            <SafeIcon icon={FiClock} className="text-2xl text-blue-600" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl p-6 border border-medical-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-600">{metrics.streak}</div>
              <div className="text-sm text-medical-600">Current Streak</div>
            </div>
            <SafeIcon icon={FiCalendar} className="text-2xl text-purple-600" />
          </div>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Progress Over Time */}
        <div className="bg-white rounded-xl p-6 border border-medical-200">
          <h2 className="text-xl font-bold text-medical-900 mb-4 flex items-center">
            <SafeIcon icon={FiTrendingUp} className="mr-2 text-primary-600" />
            Progress Over Time
          </h2>
          <ReactECharts option={getProgressChartOptions()} style={{ height: '300px' }} />
        </div>

        {/* Topic Performance */}
        <div className="bg-white rounded-xl p-6 border border-medical-200">
          <h2 className="text-xl font-bold text-medical-900 mb-4 flex items-center">
            <SafeIcon icon={FiPieChart} className="mr-2 text-primary-600" />
            Topic Performance
          </h2>
          <ReactECharts option={getTopicChartOptions()} style={{ height: '300px' }} />
        </div>
      </div>

      {/* Study Time Distribution */}
      <div className="bg-white rounded-xl p-6 border border-medical-200">
        <h2 className="text-xl font-bold text-medical-900 mb-4 flex items-center">
          <SafeIcon icon={FiClock} className="mr-2 text-primary-600" />
          Study Time Distribution
        </h2>
        <ReactECharts option={getStudyTimeChartOptions()} style={{ height: '300px' }} />
      </div>
    </motion.div>
  );
}

export default Analytics;