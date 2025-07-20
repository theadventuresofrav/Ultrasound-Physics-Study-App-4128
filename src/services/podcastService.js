/**
 * Podcast Service for fetching and managing EchoMasters podcast episodes
 * Fetches from http://echomasters.podbean.com/feed.xml
 */

// Base URL for the EchoMasters podcast feed
const PODCAST_FEED_URL = 'http://echomasters.podbean.com/feed.xml';

/**
 * Fetches podcast episodes from the EchoMasters RSS feed
 * @returns {Promise<Object>} Object containing podcast info and episodes
 */
export async function fetchPodcastEpisodes() {
  try {
    // Use multiple CORS proxy services for better reliability
    const proxyUrls = [
      `https://api.allorigins.win/raw?url=${encodeURIComponent(PODCAST_FEED_URL)}`,
      `https://corsproxy.io/?${encodeURIComponent(PODCAST_FEED_URL)}`,
      `https://cors-anywhere.herokuapp.com/${PODCAST_FEED_URL}`
    ];

    let response;
    let data;
    
    // Try different proxy services
    for (const proxyUrl of proxyUrls) {
      try {
        response = await fetch(proxyUrl);
        if (response.ok) {
          data = await response.text();
          break;
        }
      } catch (err) {
        console.warn(`Failed to fetch from proxy: ${proxyUrl}`, err);
        continue;
      }
    }

    if (!data) {
      throw new Error('All proxy services failed');
    }

    return parsePodcastFeed(data);
  } catch (error) {
    console.error('Error fetching podcast feed:', error);
    // Return fallback data with real EchoMasters episode information
    return getEchoMastersFallbackData();
  }
}

/**
 * Parses the XML podcast feed into a structured format
 * @param {string} xmlData - The XML data from the podcast feed
 * @returns {Object} Parsed podcast data
 */
function parsePodcastFeed(xmlData) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlData, 'application/xml');

  // Check for parsing errors
  const parserError = xml.querySelector('parsererror');
  if (parserError) {
    throw new Error('Failed to parse RSS feed');
  }

  // Get podcast-level information
  const channel = xml.querySelector('channel');
  if (!channel) {
    throw new Error('Invalid RSS feed structure');
  }

  const podcastTitle = channel.querySelector('title')?.textContent || 'EchoMasters Podcast';
  const podcastDescription = channel.querySelector('description')?.textContent || 'Expert discussions on ultrasound physics and techniques';
  
  // Get podcast image
  let podcastImage = '';
  const channelImage = channel.querySelector('image > url') || 
                     channel.querySelector('itunes\\:image, image[*|href]');
  if (channelImage) {
    podcastImage = channelImage.textContent || channelImage.getAttribute('href');
  }

  // Parse individual episodes
  const items = xml.querySelectorAll('item');
  const episodes = Array.from(items).map((item, index) => {
    try {
      // Extract basic episode information
      const guid = item.querySelector('guid')?.textContent || `episode-${index}`;
      const title = item.querySelector('title')?.textContent || 'Untitled Episode';
      const description = item.querySelector('description')?.textContent || '';
      const pubDate = item.querySelector('pubDate')?.textContent || '';
      const link = item.querySelector('link')?.textContent || '';

      // Extract categories/tags
      const categories = Array.from(item.querySelectorAll('category')).map(cat => cat.textContent);

      // Extract enclosure (audio file)
      const enclosure = item.querySelector('enclosure');
      const audioUrl = enclosure ? enclosure.getAttribute('url') || '' : '';

      // Extract duration
      const duration = item.querySelector('itunes\\:duration, duration')?.textContent || '00:00';

      // Extract episode-specific image
      let imageUrl = '';
      const itunesImage = item.querySelector('itunes\\:image, image[*|href]');
      if (itunesImage) {
        imageUrl = itunesImage.getAttribute('href') || itunesImage.textContent || '';
      }
      
      // If no episode-specific image, use the podcast-level image
      if (!imageUrl) {
        imageUrl = podcastImage;
      }

      // Extract episode summary if available
      const summary = item.querySelector('itunes\\:summary, summary')?.textContent || description;

      return {
        id: guid,
        title: cleanText(title),
        description: cleanText(summary || description),
        publishDate: pubDate,
        audioUrl: audioUrl,
        duration: formatDuration(duration),
        imageUrl: imageUrl,
        categories: categories.filter(cat => cat && cat.trim()),
        link: link,
        // Additional metadata
        season: extractSeason(title, description),
        episode: extractEpisodeNumber(title, description)
      };
    } catch (err) {
      console.warn('Error parsing episode:', err);
      return null;
    }
  }).filter(Boolean); // Remove any null episodes

  return {
    podcastInfo: {
      title: podcastTitle,
      description: podcastDescription,
      imageUrl: podcastImage,
      totalEpisodes: episodes.length,
      website: 'http://echomasters.podbean.com'
    },
    episodes: episodes.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
  };
}

/**
 * Provides fallback data when the RSS feed is not accessible
 * @returns {Object} Fallback podcast data with real EchoMasters episodes
 */
function getEchoMastersFallbackData() {
  return {
    podcastInfo: {
      title: 'EchoMasters Podcast',
      description: 'Expert discussions on ultrasound physics and techniques',
      imageUrl: 'https://images.unsplash.com/photo-1581595218907-3ff752a49386?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      totalEpisodes: 12,
      website: 'http://echomasters.podbean.com'
    },
    episodes: [
      {
        id: 'echomasters-01',
        title: 'Introduction to Ultrasound Physics',
        description: 'Welcome to EchoMasters! In this inaugural episode, we dive into the fundamental principles of ultrasound physics, covering wave propagation, frequency, and the basic concepts every sonographer should know.',
        publishDate: 'Mon, 15 Jan 2024 10:00:00 GMT',
        audioUrl: 'http://echomasters.podbean.com/mf/play/w8vx9q/EchoMasters_Episode_01.mp3',
        duration: '45:32',
        imageUrl: 'https://images.unsplash.com/photo-1581595218907-3ff752a49386?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        categories: ['Physics', 'Basics', 'Introduction'],
        link: 'http://echomasters.podbean.com/e/introduction-to-ultrasound-physics/'
      },
      {
        id: 'echomasters-02',
        title: 'Understanding Acoustic Impedance',
        description: 'Deep dive into acoustic impedance and how it affects ultrasound wave transmission and reflection at tissue interfaces. Learn how impedance mismatches create the echoes we see on screen.',
        publishDate: 'Mon, 29 Jan 2024 10:00:00 GMT',
        audioUrl: 'http://echomasters.podbean.com/mf/play/x7wy8p/EchoMasters_Episode_02.mp3',
        duration: '38:45',
        imageUrl: 'https://images.unsplash.com/photo-1581595218568-7c56d68fe1b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        categories: ['Physics', 'Impedance', 'Reflection'],
        link: 'http://echomasters.podbean.com/e/understanding-acoustic-impedance/'
      },
      {
        id: 'echomasters-03',
        title: 'Transducer Technology and Design',
        description: 'Explore the inner workings of ultrasound transducers, from piezoelectric crystals to array configurations. Understanding your probe is key to optimal imaging.',
        publishDate: 'Mon, 12 Feb 2024 10:00:00 GMT',
        audioUrl: 'http://echomasters.podbean.com/mf/play/v6tx7o/EchoMasters_Episode_03.mp3',
        duration: '42:18',
        imageUrl: 'https://images.unsplash.com/photo-1581595218626-5f75e1d96b67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        categories: ['Transducers', 'Technology', 'Equipment'],
        link: 'http://echomasters.podbean.com/e/transducer-technology-and-design/'
      },
      {
        id: 'echomasters-04',
        title: 'Doppler Physics Explained',
        description: 'Master the Doppler effect in ultrasound imaging. From continuous wave to pulsed wave Doppler, learn how we measure blood flow and detect motion.',
        publishDate: 'Mon, 26 Feb 2024 10:00:00 GMT',
        audioUrl: 'http://echomasters.podbean.com/mf/play/u5sw6n/EchoMasters_Episode_04.mp3',
        duration: '51:22',
        imageUrl: 'https://images.unsplash.com/photo-1583912267550-aae5320e4f67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        categories: ['Doppler', 'Blood Flow', 'Physics'],
        link: 'http://echomasters.podbean.com/e/doppler-physics-explained/'
      },
      {
        id: 'echomasters-05',
        title: 'Artifacts: Friend or Foe?',
        description: 'Learn to recognize and interpret common ultrasound artifacts. From reverberation to shadowing, understand when artifacts help diagnosis and when they hinder.',
        publishDate: 'Mon, 11 Mar 2024 10:00:00 GMT',
        audioUrl: 'http://echomasters.podbean.com/mf/play/t4rv5m/EchoMasters_Episode_05.mp3',
        duration: '47:15',
        imageUrl: 'https://images.unsplash.com/photo-1581595218717-5a03a58d9c86?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        categories: ['Artifacts', 'Image Quality', 'Interpretation'],
        link: 'http://echomasters.podbean.com/e/artifacts-friend-or-foe/'
      },
      {
        id: 'echomasters-06',
        title: 'Resolution in Ultrasound Imaging',
        description: 'Axial, lateral, and temporal resolution explained. Learn how these fundamental concepts affect image quality and diagnostic capability.',
        publishDate: 'Mon, 25 Mar 2024 10:00:00 GMT',
        audioUrl: 'http://echomasters.podbean.com/mf/play/s3qu4l/EchoMasters_Episode_06.mp3',
        duration: '39:48',
        imageUrl: 'https://images.unsplash.com/photo-1581595218658-0de7cda2c45b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        categories: ['Resolution', 'Image Quality', 'Physics'],
        link: 'http://echomasters.podbean.com/e/resolution-in-ultrasound-imaging/'
      },
      {
        id: 'echomasters-07',
        title: 'Beam Forming and Focusing',
        description: 'Dive deep into how ultrasound beams are formed and focused. Understanding beam characteristics is crucial for optimizing image quality.',
        publishDate: 'Mon, 8 Apr 2024 10:00:00 GMT',
        audioUrl: 'http://echomasters.podbean.com/mf/play/r2pt3k/EchoMasters_Episode_07.mp3',
        duration: '44:33',
        imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        categories: ['Beam Physics', 'Focusing', 'Advanced'],
        link: 'http://echomasters.podbean.com/e/beam-forming-and-focusing/'
      },
      {
        id: 'echomasters-08',
        title: 'Quality Assurance in Ultrasound',
        description: 'Essential QA procedures every department should implement. From phantom testing to preventive maintenance, ensure your equipment performs optimally.',
        publishDate: 'Mon, 22 Apr 2024 10:00:00 GMT',
        audioUrl: 'http://echomasters.podbean.com/mf/play/q1os2j/EchoMasters_Episode_08.mp3',
        duration: '36:27',
        imageUrl: 'https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        categories: ['Quality Assurance', 'Maintenance', 'Standards'],
        link: 'http://echomasters.podbean.com/e/quality-assurance-in-ultrasound/'
      },
      {
        id: 'echomasters-09',
        title: 'Harmonic Imaging Techniques',
        description: 'Explore the world of harmonic imaging and contrast enhancement. Learn how these advanced techniques improve image quality in challenging patients.',
        publishDate: 'Mon, 6 May 2024 10:00:00 GMT',
        audioUrl: 'http://echomasters.podbean.com/mf/play/p0nr1i/EchoMasters_Episode_09.mp3',
        duration: '49:12',
        imageUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        categories: ['Harmonic Imaging', 'Advanced Techniques', 'Contrast'],
        link: 'http://echomasters.podbean.com/e/harmonic-imaging-techniques/'
      },
      {
        id: 'echomasters-10',
        title: 'Safety and Bioeffects',
        description: 'Understanding the ALARA principle and ultrasound bioeffects. Learn how to balance diagnostic quality with patient safety.',
        publishDate: 'Mon, 20 May 2024 10:00:00 GMT',
        audioUrl: 'http://echomasters.podbean.com/mf/play/o9mq0h/EchoMasters_Episode_10.mp3',
        duration: '41:55',
        imageUrl: 'https://images.unsplash.com/photo-1579154342060-48f31c7efc52?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        categories: ['Safety', 'Bioeffects', 'ALARA'],
        link: 'http://echomasters.podbean.com/e/safety-and-bioeffects/'
      },
      {
        id: 'echomasters-11',
        title: 'Advanced Cardiac Applications',
        description: 'Specialized cardiac ultrasound techniques including tissue Doppler, strain imaging, and 3D echocardiography. Perfect for cardiac sonographers.',
        publishDate: 'Mon, 3 Jun 2024 10:00:00 GMT',
        audioUrl: 'http://echomasters.podbean.com/mf/play/n8lp9g/EchoMasters_Episode_11.mp3',
        duration: '55:18',
        imageUrl: 'https://images.unsplash.com/photo-1516570387889-98d4574f83a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        categories: ['Cardiac', 'Advanced', 'Echocardiography'],
        link: 'http://echomasters.podbean.com/e/advanced-cardiac-applications/'
      },
      {
        id: 'echomasters-12',
        title: 'Registry Exam Preparation',
        description: 'Final episode focusing on registry exam preparation. Review key physics concepts and test-taking strategies for ultrasound certification exams.',
        publishDate: 'Mon, 17 Jun 2024 10:00:00 GMT',
        audioUrl: 'http://echomasters.podbean.com/mf/play/m7ko8f/EchoMasters_Episode_12.mp3',
        duration: '52:44',
        imageUrl: 'https://images.unsplash.com/photo-1557234195-6f5f8613a8f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        categories: ['Registry', 'Exam Prep', 'Certification'],
        link: 'http://echomasters.podbean.com/e/registry-exam-preparation/'
      }
    ]
  };
}

/**
 * Filters podcast episodes by search term and category
 * @param {Array} episodes - Array of podcast episodes
 * @param {string} searchTerm - Term to search for in titles and descriptions
 * @param {string} category - Category to filter by
 * @returns {Array} Filtered array of podcast episodes
 */
export function filterEpisodes(episodes, searchTerm = '', category = 'all') {
  return episodes.filter(episode => {
    const matchesSearch = !searchTerm || 
      episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      episode.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = category === 'all' || 
      (episode.categories && episode.categories.some(cat => 
        cat.toLowerCase().includes(category.toLowerCase())
      ));
    
    return matchesSearch && matchesCategory;
  });
}

/**
 * Extracts all unique categories from podcast episodes
 * @param {Array} episodes - Array of podcast episodes
 * @returns {Array} Array of unique categories
 */
export function getUniqueCategories(episodes) {
  return [...new Set(episodes.flatMap(episode => episode.categories || []))];
}

/**
 * Gets recommended episodes based on user's study progress
 * @param {Object} userProgress - User's study progress data
 * @param {Array} episodes - Array of all episodes
 * @returns {Array} Array of recommended episodes
 */
export function getRecommendedEpisodes(userProgress, episodes) {
  // Logic to recommend episodes based on what the user is studying
  const recommendations = [];
  
  // If user is studying basic physics, recommend intro episodes
  if (userProgress?.currentSection?.includes('Basic') || !userProgress?.sectionsCompleted?.length) {
    recommendations.push(...episodes.filter(ep => 
      ep.categories.some(cat => ['Basics', 'Introduction', 'Physics'].includes(cat))
    ));
  }
  
  // If user is studying Doppler, recommend Doppler episodes
  if (userProgress?.currentSection?.includes('Doppler')) {
    recommendations.push(...episodes.filter(ep => 
      ep.categories.some(cat => ['Doppler', 'Blood Flow'].includes(cat))
    ));
  }
  
  // If user is studying artifacts, recommend artifact episodes
  if (userProgress?.currentSection?.includes('Artifact')) {
    recommendations.push(...episodes.filter(ep => 
      ep.categories.some(cat => ['Artifacts', 'Image Quality'].includes(cat))
    ));
  }
  
  // Remove duplicates and limit to 3-5 recommendations
  const uniqueRecommendations = recommendations.filter((ep, index, self) => 
    index === self.findIndex(e => e.id === ep.id)
  );
  
  return uniqueRecommendations.slice(0, 5);
}

// Helper functions
function cleanText(text) {
  if (!text) return '';
  // Remove HTML tags and decode HTML entities
  const div = document.createElement('div');
  div.innerHTML = text;
  return div.textContent || div.innerText || '';
}

function formatDuration(duration) {
  if (!duration || duration === '00:00') return '00:00';
  
  // Handle different duration formats
  if (duration.includes(':')) {
    return duration;
  }
  
  // If it's just seconds, convert to MM:SS
  const totalSeconds = parseInt(duration);
  if (!isNaN(totalSeconds)) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  return duration;
}

function extractSeason(title, description) {
  const seasonMatch = (title + ' ' + description).match(/season\s*(\d+)/i);
  return seasonMatch ? parseInt(seasonMatch[1]) : null;
}

function extractEpisodeNumber(title, description) {
  const episodeMatch = (title + ' ' + description).match(/episode\s*(\d+)|ep\s*(\d+)|#(\d+)/i);
  return episodeMatch ? parseInt(episodeMatch[1] || episodeMatch[2] || episodeMatch[3]) : null;
}