import { useState, useEffect, useRef } from 'react';

export function useVoiceReader() {
  const [isSupported, setIsSupported] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(0.8);
  const utteranceRef = useRef(null);

  useEffect(() => {
    // Check if speech synthesis is supported
    if ('speechSynthesis' in window) {
      setIsSupported(true);
      
      // Load voices
      const loadVoices = () => {
        const availableVoices = speechSynthesis.getVoices();
        setVoices(availableVoices);
        
        // Select a good default voice (prefer English voices)
        const englishVoices = availableVoices.filter(voice => 
          voice.lang.startsWith('en')
        );
        
        if (englishVoices.length > 0) {
          // Prefer female voices for educational content
          const femaleVoice = englishVoices.find(voice => 
            voice.name.toLowerCase().includes('female') ||
            voice.name.toLowerCase().includes('woman') ||
            voice.name.toLowerCase().includes('samantha') ||
            voice.name.toLowerCase().includes('karen')
          );
          
          setSelectedVoice(femaleVoice || englishVoices[0]);
        } else if (availableVoices.length > 0) {
          setSelectedVoice(availableVoices[0]);
        }
      };

      // Load voices immediately
      loadVoices();
      
      // Also load when voices change (some browsers load asynchronously)
      speechSynthesis.addEventListener('voiceschanged', loadVoices);
      
      return () => {
        speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      };
    }
  }, []);

  const speak = (text, options = {}) => {
    if (!isSupported || !text) return;

    // Stop any current speech
    stop();

    // Clean up text for better speech
    const cleanText = cleanTextForSpeech(text);
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utteranceRef.current = utterance;

    // Set voice properties
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.rate = options.rate || rate;
    utterance.pitch = options.pitch || pitch;
    utterance.volume = options.volume || volume;

    // Event listeners
    utterance.onstart = () => {
      setIsReading(true);
      options.onStart && options.onStart();
    };

    utterance.onend = () => {
      setIsReading(false);
      utteranceRef.current = null;
      options.onEnd && options.onEnd();
    };

    utterance.onerror = (event) => {
      setIsReading(false);
      utteranceRef.current = null;
      console.error('Speech synthesis error:', event);
      options.onError && options.onError(event);
    };

    utterance.onpause = () => {
      options.onPause && options.onPause();
    };

    utterance.onresume = () => {
      options.onResume && options.onResume();
    };

    // Start speaking
    speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    setIsReading(false);
    utteranceRef.current = null;
  };

  const pause = () => {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
      speechSynthesis.pause();
    }
  };

  const resume = () => {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
    }
  };

  const isPaused = speechSynthesis.paused;

  return {
    isSupported,
    isReading,
    isPaused,
    voices,
    selectedVoice,
    setSelectedVoice,
    rate,
    setRate,
    pitch,
    setPitch,
    volume,
    setVolume,
    speak,
    stop,
    pause,
    resume
  };
}

// Helper function to clean text for better speech synthesis
function cleanTextForSpeech(text) {
  return text
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Replace common abbreviations
    .replace(/\bMHz\b/g, 'megahertz')
    .replace(/\bkHz\b/g, 'kilohertz')
    .replace(/\bdB\b/g, 'decibels')
    .replace(/\bcm\b/g, 'centimeters')
    .replace(/\bmm\b/g, 'millimeters')
    .replace(/\bμm\b/g, 'micrometers')
    .replace(/\bPRF\b/g, 'pulse repetition frequency')
    .replace(/\bTGC\b/g, 'time gain compensation')
    .replace(/\bSPI\b/g, 'sonography principles and instrumentation')
    .replace(/\bARDMS\b/g, 'American Registry for Diagnostic Medical Sonography')
    // Replace mathematical symbols
    .replace(/λ/g, 'lambda')
    .replace(/θ/g, 'theta')
    .replace(/ρ/g, 'rho')
    .replace(/°/g, ' degrees')
    .replace(/²/g, ' squared')
    .replace(/³/g, ' cubed')
    // Replace special characters
    .replace(/&/g, 'and')
    .replace(/\+/g, 'plus')
    .replace(/=/g, 'equals')
    .replace(/×/g, 'times')
    .replace(/÷/g, 'divided by')
    // Clean up multiple spaces and line breaks
    .replace(/\s+/g, ' ')
    .replace(/\n+/g, '. ')
    .trim();
}