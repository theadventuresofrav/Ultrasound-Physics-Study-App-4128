import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import PodcastPlayer from './PodcastPlayer';
import { fetchPodcastEpisodes, filterEpisodes, getUniqueCategories } from '../services/podcastService';
import * as FiIcons from 'react-icons/fi';

const { FiHeadphones, FiPlay, FiLoader, FiAlertTriangle, FiExternalLink, FiSearch, FiFilter, FiRefreshCw } = FiIcons;

function PodcastList() {
  const [podcastData, setPodcastData] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [minimizedPlayer, setMinimizedPlayer] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    loadPodcastEpisodes();
  }, []);

  const loadPodcastEpisodes = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchPodcastEpisodes();
      setPodcastData(data.podcastInfo);
      setEpisodes(data.episodes);
    } catch (err) {
      console.error('Error loading podcast episodes:', err);
      setError('Failed to load podcast episodes. Displaying cached episodes.');
      
      // Still try to load fallback data
      try {
        const { getEchoMastersFallbackData } = await import('../services/podcastService');
        const fallbackData = getEchoMastersFallbackData();
        setPodcastData(fallbackData.podcastInfo);
        setEpisodes(fallbackData.episodes);
      } catch (fallbackErr) {
        setError('Failed to load podcast episodes.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayEpisode = (episode) => {
    setSelectedEpisode(episode);
    setMinimizedPlayer(false);
  };

  const handleClosePlayer = () => {
    setSelectedEpisode(null);
    setMinimizedPlayer(false);
  };

  const handleToggleMinimize = () => {
    setMinimizedPlayer(!minimizedPlayer);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleRefresh = () => {
    loadPodcastEpisodes();
  };

  // Get unique categories from episodes
  const allCategories = getUniqueCategories(episodes);

  // Filter episodes based on search term and category
  const filteredEpisodes = filterEpisodes(episodes, searchTerm, filterCategory);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <SafeIcon icon={FiHeadphones} className="text-2xl text-primary-600" />
          <div>
            <h2 className="text-2xl font-bold text-medical-900">EchoMasters Podcast</h2>
            <p className="text-medical-600">
              {podcastData?.description || 'Expert discussions on ultrasound physics and techniques'}
            </p>
            {podcastData?.totalEpisodes && (
              <p className="text-sm text-medical-500">
                {podcastData.totalEpisodes} episodes available
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            disabled={isLoading}
            className="p-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors disabled:opacity-50"
            title="Refresh episodes"
          >
            <SafeIcon icon={FiRefreshCw} className={isLoading ? 'animate-spin' : ''} />
          </motion.button>
          <a 
            href="http://echomasters.podbean.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 flex items-center space-x-1"
          >
            <span>Visit website</span>
            <SafeIcon icon={FiExternalLink} className="text-sm" />
          </a>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex-1 min-w-[280px]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search episodes..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-3 pl-10 bg-medical-50 border border-medical-200 rounded-lg text-medical-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <SafeIcon 
              icon={FiSearch} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-medical-500" 
            />
          </div>
        </div>
        
        {allCategories.length > 0 && (
          <div className="relative">
            <select
              value={filterCategory}
              onChange={handleFilterChange}
              className="p-3 pl-10 bg-medical-50 border border-medical-200 rounded-lg text-medical-900 focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none"
            >
              <option value="all">All Categories</option>
              {allCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <SafeIcon 
              icon={FiFilter} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-medical-500" 
            />
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start space-x-3">
          <SafeIcon icon={FiAlertTriangle} className="text-yellow-600 mt-0.5" />
          <div>
            <p className="text-yellow-800 font-medium">Notice</p>
            <p className="text-yellow-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <SafeIcon icon={FiLoader} className="text-3xl text-primary-500 animate-spin mx-auto mb-4" />
          <p className="text-medical-600">Loading EchoMasters podcast episodes...</p>
        </div>
      )}

      {/* Episodes List */}
      {!isLoading && filteredEpisodes.length > 0 && (
        <div className="space-y-4">
          {filteredEpisodes.map((episode, index) => (
            <motion.div
              key={episode.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-white rounded-xl border border-medical-200 hover:border-primary-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary-100 rounded-md flex-shrink-0 overflow-hidden">
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
                    <SafeIcon icon={FiHeadphones} className="text-xl" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-medical-900 mb-1 line-clamp-2">
                    {episode.title}
                  </h3>
                  <p className="text-sm text-medical-600 line-clamp-2 mb-2">
                    {episode.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-medical-500">
                      {episode.publishDate && new Date(episode.publishDate).toLocaleDateString()} • {episode.duration}
                    </div>
                    <div className="flex space-x-2">
                      {episode.categories && episode.categories.slice(0, 2).map(category => (
                        <span 
                          key={category}
                          className="text-xs px-2 py-1 bg-primary-50 text-primary-700 rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => handlePlayEpisode(episode)}
                  className="w-12 h-12 flex items-center justify-center bg-primary-500 text-white rounded-full hover:bg-primary-600 flex-shrink-0 transition-colors"
                  title="Play episode"
                >
                  <SafeIcon icon={FiPlay} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* No Results */}
      {!isLoading && filteredEpisodes.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiHeadphones} className="text-3xl text-medical-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-medical-900 mb-2">No episodes found</h3>
          <p className="text-medical-600 mb-4">
            {episodes.length === 0 ? 
              'No episodes could be loaded at this time.' :
              'Try adjusting your search criteria'
            }
          </p>
          {episodes.length === 0 && (
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      )}

      {/* Podcast Player */}
      <AnimatePresence>
        {selectedEpisode && (
          <PodcastPlayer
            episode={selectedEpisode}
            onClose={handleClosePlayer}
            minimized={minimizedPlayer}
            onToggleMinimize={handleToggleMinimize}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default PodcastList;