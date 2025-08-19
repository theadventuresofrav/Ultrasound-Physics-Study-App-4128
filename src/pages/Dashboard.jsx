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
import VoiceReadingBanner from '../components/VoiceReadingBanner';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTarget, FiBook, FiCpu, FiClock, FiTool, FiCreditCard } = FiIcons;

function Dashboard() {
  const { state } = useStudy();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <GameNotifications />
      <VoiceReadingBanner />

      {/* Welcome Section */}
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-slate-100 mb-4"
        >
          Welcome to Sonography School 2025 (SPI)
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-400 max-w-3xl mx-auto"
        >
          Master ultrasound physics and SPI exam preparation with interactive tools, practice questions, 
          and comprehensive educational content. Now with voice reading for enhanced accessibility!
        </motion.p>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Link to="/quiz/practice" className="group">
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="dark-card dark-card-hover rounded-2xl p-6 shadow-lg group-hover:shadow-2xl group-hover:shadow-primary-500/20"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-500/20 rounded-xl border border-primary-500/30">
                <SafeIcon icon={FiTarget} className="text-2xl text-primary-400" />
              </div>
              <div>
                <h3 className="font-bold text-slate-200 group-hover:text-primary-400 transition-colors">Practice Quiz</h3>
                <p className="text-sm text-slate-400">Test your knowledge</p>
              </div>
            </div>
          </motion.div>
        </Link>

        <Link to="/physics-tools" className="group">
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="dark-card dark-card-hover rounded-2xl p-6 shadow-lg group-hover:shadow-2xl group-hover:shadow-green-500/20"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-500/20 rounded-xl border border-green-500/30">
                <SafeIcon icon={FiTool} className="text-2xl text-green-400" />
              </div>
              <div>
                <h3 className="font-bold text-slate-200 group-hover:text-green-400 transition-colors">Physics Tools</h3>
                <p className="text-sm text-slate-400">Interactive calculators</p>
              </div>
            </div>
          </motion.div>
        </Link>

        <Link to="/spi-mock-exam" className="group">
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="dark-card dark-card-hover rounded-2xl p-6 shadow-lg group-hover:shadow-2xl group-hover:shadow-purple-500/20"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-500/30">
                <SafeIcon icon={FiClock} className="text-2xl text-purple-400" />
              </div>
              <div>
                <h3 className="font-bold text-slate-200 group-hover:text-purple-400 transition-colors">SPI Mock Exam</h3>
                <p className="text-sm text-slate-400">Full practice test</p>
              </div>
            </div>
          </motion.div>
        </Link>

        <Link to="/pricing" className="group">
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="dark-card dark-card-hover rounded-2xl p-6 shadow-lg group-hover:shadow-2xl group-hover:shadow-orange-500/20"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-500/20 rounded-xl border border-orange-500/30">
                <SafeIcon icon={FiCreditCard} className="text-2xl text-orange-400" />
              </div>
              <div>
                <h3 className="font-bold text-slate-200 group-hover:text-orange-400 transition-colors">Subscribe</h3>
                <p className="text-sm text-slate-400">Get full access</p>
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
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-slate-100 mb-6 flex items-center"
            >
              <SafeIcon icon={FiBook} className="mr-3 text-primary-400" />
              Study Sections
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <StudySection section={section} />
                </motion.div>
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