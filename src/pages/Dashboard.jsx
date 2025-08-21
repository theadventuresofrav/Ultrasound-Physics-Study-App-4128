import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStudy } from '../context/StudyContext';
import { sections } from '../data/questions';
import StudySection from '../components/StudySection';
import DailyChallenges from '../components/DailyChallenges';
import StudyStreak from '../components/StudyStreak';
import AchievementPanel from '../components/AchievementPanel';
import Leaderboard from '../components/Leaderboard';
import RecommendedStudyMaterials from '../components/RecommendedEpisodes';
import AgainstAllOddsInspiration from '../components/AgainstAllOddsInspiration';
import GameNotifications from '../components/GameNotifications';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTarget, FiBook, FiCpu, FiClock, FiTool, FiCreditCard, FiGraduationCap, FiZap } = FiIcons;

function Dashboard() {
  const { state } = useStudy();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <GameNotifications />

      {/* Welcome Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-medical-900 mb-4">
          Welcome to Sonography School 2025 (SPI)
        </h1>
        <p className="text-lg text-medical-600 max-w-3xl mx-auto">
          Master ultrasound physics and SPI exam preparation with interactive tools, practice questions, and comprehensive educational content
        </p>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Link to="/courses" className="group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200 shadow-lg hover:shadow-xl transition-all group-hover:border-primary-300"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                <SafeIcon icon={FiGraduationCap} className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="font-bold text-medical-900">SPI Courses</h3>
                <p className="text-sm text-medical-600">AI-powered learning</p>
              </div>
            </div>
          </motion.div>
        </Link>

        <Link to="/physics-tools" className="group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200 shadow-lg hover:shadow-xl transition-all group-hover:border-primary-300"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
                <SafeIcon icon={FiTool} className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="font-bold text-medical-900">Physics Tools</h3>
                <p className="text-sm text-medical-600">Interactive calculators</p>
              </div>
            </div>
          </motion.div>
        </Link>

        <Link to="/comprehensive-exam" className="group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200 shadow-lg hover:shadow-xl transition-all group-hover:border-primary-300"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
                <SafeIcon icon={FiTarget} className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="font-bold text-medical-900">Comprehensive Exam</h3>
                <p className="text-sm text-medical-600">110-question test</p>
              </div>
            </div>
          </motion.div>
        </Link>

        <Link to="/chat-tutor" className="group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200 shadow-lg hover:shadow-xl transition-all group-hover:border-primary-300"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl">
                <SafeIcon icon={FiCpu} className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="font-bold text-medical-900">AI Tutor</h3>
                <p className="text-sm text-medical-600">Get instant help</p>
              </div>
            </div>
          </motion.div>
        </Link>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Study Sections */}
          <div>
            <h2 className="text-2xl font-bold text-medical-900 mb-6 flex items-center">
              <SafeIcon icon={FiBook} className="mr-3 text-primary-600" />
              Study Sections
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.map((section) => (
                <StudySection key={section.id} section={section} />
              ))}
            </div>
          </div>

          {/* Against All Odds Inspiration */}
          <AgainstAllOddsInspiration />

          {/* Recommended Study Materials */}
          <RecommendedStudyMaterials />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <StudyStreak />
          <DailyChallenges />
          <Leaderboard />
        </div>
      </div>

      {/* Achievement Panel */}
      <AchievementPanel />
    </motion.div>
  );
}

export default Dashboard;