import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import PodcastList from '../components/PodcastList';
import { fetchPodcastEpisodes } from '../services/podcastService';
import { useStudy } from '../context/StudyContext';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiHeadphones, FiRss, FiExternalLink, FiGlobe } = FiIcons;

function Podcast() {
  const { state } = useStudy();
  const [podcastInfo, setPodcastInfo] = useState({
    title: 'EchoMasters Podcast',
    description: 'Expert discussions on ultrasound physics and techniques',
    imageUrl: '',
    totalEpisodes: 0,
    website: 'http://echomasters.podbean.com'
  });

  useEffect(() => {
    loadPodcastInfo();
  }, []);

  const loadPodcastInfo = async () => {
    try {
      const data = await fetchPodcastEpisodes();
      setPodcastInfo(data.podcastInfo);
    } catch (error) {
      console.error('Error loading podcast info:', error);
      // Keep default values
    }
  };

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
        <h1 className="text-3xl font-bold text-medical-900 mb-2">EchoMasters Podcast</h1>
        <p className="text-medical-600">
          Listen to the EchoMasters podcast for in-depth discussions on ultrasound physics and techniques
        </p>
      </div>

      {/* Podcast Banner */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl p-8 mb-8 text-white">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="w-32 h-32 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
            {podcastInfo.imageUrl ? (
              <img 
                src={podcastInfo.imageUrl} 
                alt={podcastInfo.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div className="w-full h-full flex items-center justify-center">
              <SafeIcon icon={FiHeadphones} className="text-5xl text-white/70" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">{podcastInfo.title}</h2>
            <p className="text-white/80 mb-4">{podcastInfo.description}</p>
            {podcastInfo.totalEpisodes > 0 && (
              <p className="text-white/70 text-sm mb-4">
                {podcastInfo.totalEpisodes} episodes available
              </p>
            )}
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <a 
                href={podcastInfo.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiGlobe} />
                <span>Visit Website</span>
              </a>
              <a 
                href="http://echomasters.podbean.com/feed.xml" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiRss} />
                <span>RSS Feed</span>
              </a>
              <a 
                href="https://podcasts.apple.com/search?term=echomasters" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <span>Apple Podcasts</span>
                <SafeIcon icon={FiExternalLink} className="text-sm" />
              </a>
              <a 
                href="https://open.spotify.com/search/echomasters" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <span>Spotify</span>
                <SafeIcon icon={FiExternalLink} className="text-sm" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Podcast Episodes */}
      <PodcastList />

      {/* Educational Value */}
      <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
        <h2 className="text-xl font-bold text-medical-900 mb-4">Why Listen to EchoMasters?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 bg-primary-50 rounded-lg border border-primary-100">
            <h3 className="font-semibold text-medical-900 mb-2">Enhance Your Understanding</h3>
            <p className="text-sm text-medical-700">
              Deepen your knowledge of ultrasound physics concepts through expert discussions and real-world explanations from experienced professionals.
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="font-semibold text-medical-900 mb-2">Clinical Applications</h3>
            <p className="text-sm text-medical-700">
              Learn how theoretical physics concepts translate into practical clinical applications and improved patient care techniques.
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-100">
            <h3 className="font-semibold text-medical-900 mb-2">Exam Preparation</h3>
            <p className="text-sm text-medical-700">
              Supplement your study with podcast episodes that cover key topics featured in ultrasound physics certification and registry exams.
            </p>
          </div>
        </div>
      </div>

      {/* About EchoMasters */}
      <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
        <h2 className="text-xl font-bold text-medical-900 mb-4">About EchoMasters</h2>
        <div className="prose prose-medical max-w-none">
          <p className="text-medical-700 mb-4">
            EchoMasters is dedicated to providing high-quality educational content for ultrasound professionals, 
            students, and anyone interested in medical imaging physics. Our podcast features expert discussions, 
            practical tips, and deep dives into the science behind ultrasound technology.
          </p>
          <p className="text-medical-700">
            Whether you're preparing for certification exams, looking to expand your knowledge, or staying 
            current with the latest developments in ultrasound physics, EchoMasters provides the insights 
            and expertise you need to excel in your career.
          </p>
        </div>
        
        <div className="mt-6 pt-4 border-t border-medical-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-medical-900">Stay Connected</h3>
              <p className="text-sm text-medical-600">
                Visit the EchoMasters website for more resources and updates
              </p>
            </div>
            <a 
              href={podcastInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Visit EchoMasters
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Podcast;