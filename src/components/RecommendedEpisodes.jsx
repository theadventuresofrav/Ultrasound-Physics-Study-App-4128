import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useStudy } from '../context/StudyContext';
import { fetchPodcastEpisodes, getRecommendedEpisodes } from '../services/podcastService';

const { FiHeadphones, FiPlay, FiArrowRight } = FiIcons;

function RecommendedEpisodes() {
  const { state } = useStudy();
  const [recommendedEpisodes, setRecommendedEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRecommendations();
  }, [state.progress]);

  const loadRecommendations = async () => {
    setIsLoading(true);
    try {
      const podcastData = await fetchPodcastEpisodes();
      const recommendations = getRecommendedEpisodes(state.progress, podcastData.episodes);
      setRecommendedEpisodes(recommendations.slice(0, 3)); // Show top 3 recommendations
    } catch (error) {
      console.error('Error loading recommendations:', error);
      // Use fallback recommendations
      setRecommendedEpisodes([
        {
          id: 'echomasters-01',
          title: 'Introduction to Ultrasound Physics',
          description: 'Fundamental principles of ultrasound physics, covering wave propagation and basic concepts.',
          duration: '45:32',
          publishDate: 'Mon, 15 Jan 2024 10:00:00 GMT',
          audioUrl: 'http://echomasters.podbean.com/mf/play/w8vx9q/EchoMasters_Episode_01.mp3',
          imageUrl: 'https://images.unsplash.com/photo-1581595218907-3ff752a49386?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          relevantSection: 'Basic Ultrasound Physics'
        },
        {
          id: 'echomasters-04',
          title: 'Doppler Physics Explained',
          description: 'Master the Doppler effect in ultrasound imaging and learn how we measure blood flow.',
          duration: '51:22',
          publishDate: 'Mon, 26 Feb 2024 10:00:00 GMT',
          audioUrl: 'http://echomasters.podbean.com/mf/play/u5sw6n/EchoMasters_Episode_04.mp3',
          imageUrl: 'https://images.unsplash.com/photo-1583912267550-aae5320e4f67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          relevantSection: 'Doppler Instrumentation'
        },
        {
          id: 'echomasters-05',
          title: 'Artifacts: Friend or Foe?',
          description: 'Learn to recognize and interpret common ultrasound artifacts.',
          duration: '47:15',
          publishDate: 'Mon, 11 Mar 2024 10:00:00 GMT',
          audioUrl: 'http://echomasters.podbean.com/mf/play/t4rv5m/EchoMasters_Episode_05.mp3',
          imageUrl: 'https://images.unsplash.com/photo-1581595218717-5a03a58d9c86?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          relevantSection: 'Artifacts and Quality Assurance'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayEpisode = (episode) => {
    setSelectedEpisode(episode);
  };

  if (isLoading) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
        <div className="flex items-center space-x-3 mb-4">
          <SafeIcon icon={FiHeadphones} className="text-2xl text-primary-600" />
          <div>
            <h2 className="text-2xl font-bold text-medical-900">Recommended Episodes</h2>
            <p className="text-medical-600">Loading personalized recommendations...</p>
          </div>
        </div>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 bg-medical-100 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <SafeIcon icon={FiHeadphones} className="text-2xl text-primary-600" />
          <div>
            <h2 className="text-2xl font-bold text-medical-900">Recommended Episodes</h2>
            <p className="text-medical-600">Listen to episodes related to your current studies</p>
          </div>
        </div>
        <Link to="/podcast" className="text-primary-600 hover:text-primary-700 flex items-center space-x-1">
          <span>View all episodes</span>
          <SafeIcon icon={FiArrowRight} className="text-sm" />
        </Link>
      </div>

      <div className="space-y-4">
        {recommendedEpisodes.map((episode, index) => (
          <motion.div
            key={episode.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl border border-primary-100 hover:shadow-md transition-all"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-md flex-shrink-0 overflow-hidden">
                {episode.imageUrl ? (
                  <img 
                    src={episode.imageUrl} 
                    alt={episode.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="w-full h-full flex items-center justify-center bg-primary-200 text-primary-600">
                  <SafeIcon icon={FiHeadphones} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-medical-900 line-clamp-2">{episode.title}</h3>
                <p className="text-xs text-medical-600">
                  {episode.duration} • Related to: <span className="text-primary-700">{episode.relevantSection || 'General Physics'}</span>
                </p>
              </div>
              <button
                onClick={() => handlePlayEpisode(episode)}
                className="w-8 h-8 flex items-center justify-center bg-primary-500 text-white rounded-full hover:bg-primary-600 flex-shrink-0 transition-colors"
                title="Play episode"
              >
                <SafeIcon icon={FiPlay} className="text-sm" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {recommendedEpisodes.length === 0 && (
        <div className="text-center py-8">
          <SafeIcon icon={FiHeadphones} className="text-3xl text-medical-400 mx-auto mb-4" />
          <p className="text-medical-600">No recommendations available at this time.</p>
          <Link to="/podcast" className="text-primary-600 hover:text-primary-700 text-sm">
            Browse all episodes →
          </Link>
        </div>
      )}
    </div>
  );
}

export default RecommendedEpisodes;