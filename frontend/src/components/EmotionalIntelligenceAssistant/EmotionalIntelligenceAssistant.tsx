import React, { useState, useEffect, useRef } from 'react';

// Placeholder messages - replace with dynamic/LLM generation later
const mindfulnessMessages = [
  "Take a deep breath. Inhale calm, exhale stress.",
  "Remember to be patient, both with the customer and yourself.",
  "A brief pause can help reset your perspective.",
  "Focus on what you *can* control in this situation.",
  "Empathy is key. Try to understand the customer's frustration."
];

// Placeholder audio source
const audioSrc = "/placeholder-calm-sound.mp3"; // Replace with actual audio file path or URL

const EmotionalIntelligenceAssistant: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const visibilityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const showWidget = () => {
    console.log("Showing Mindfulness Moment");
    const newIndex = Math.floor(Math.random() * mindfulnessMessages.length);
    setCurrentMessage(mindfulnessMessages[newIndex]);
    setIsVisible(true);

    // Automatically hide after a duration (e.g., 5 minutes)
    if (visibilityTimeoutRef.current) clearTimeout(visibilityTimeoutRef.current);
    visibilityTimeoutRef.current = setTimeout(() => {
      handleClose();
    }, 10000); // 10 seconds for testing (intended: 300000 for 5 minutes)
  };

  const handleClose = () => {
    console.log("Hiding Mindfulness Moment");
    setIsVisible(false);
    if (isPlaying) {
        togglePlay(); // Stop audio on close
    }
    if (visibilityTimeoutRef.current) clearTimeout(visibilityTimeoutRef.current);
  };

  const handleNext = () => {
    const newIndex = Math.floor(Math.random() * mindfulnessMessages.length);
    setCurrentMessage(mindfulnessMessages[newIndex]);
    // Optionally change audio source here too
    if (isPlaying) {
        // If playing, restart with new content (or just continue)
        if(audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Attempt to play, handle potential errors (e.g., user interaction needed)
      audioRef.current.play().catch(error => console.error("Audio play failed:", error));
    }
    setIsPlaying(!isPlaying);
  };

  // Setup interval timer to show the widget periodically
  useEffect(() => {
     // Immediately show on mount for testing, remove this line for production
    // showWidget(); 

    // Set interval (e.g., every hour)
    intervalRef.current = setInterval(() => {
      showWidget();
    }, 15000); // 15 seconds for testing (intended: 3600000 for 1 hour)

    // Cleanup interval and timeout on unmount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (visibilityTimeoutRef.current) clearTimeout(visibilityTimeoutRef.current);
    };
  }, []); // Run only on mount

   // Effect to handle audio element state changes
  useEffect(() => {
    const audioElement = audioRef.current;
    const handleAudioEnd = () => setIsPlaying(false);
    if (audioElement) {
      audioElement.addEventListener('ended', handleAudioEnd);
      return () => {
        audioElement.removeEventListener('ended', handleAudioEnd);
      };
    }
  }, []);

  return (
    <div 
      className={`fixed top-4 right-4 z-50 w-72 md:w-80 lg:w-96 p-4 bg-teal-50 border border-teal-200 rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform ${isVisible ? 'translate-x-0' : 'translate-x-full mr-4'}`}
      // Apply transform based on isVisible state for slide-in/out
    >
       <button 
        onClick={handleClose} 
        className="absolute top-1 right-1 text-teal-500 hover:text-teal-700 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400"
        aria-label="Close mindfulness moment"
      >
        {/* Simple 'X' icon */}
        <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>

      <h3 className="text-lg font-semibold text-teal-800 mb-3">Mindfulness Moment</h3>
      
      <p className="text-teal-700 italic mb-4">
        {currentMessage}
      </p>

      {/* Placeholder for future LLM Integration */}
      <p className="text-xs text-teal-600 mb-3">
        (Future: AI-powered suggestions based on conversation sentiment. Requires LLM API Key.)
      </p>
      
      {/* Audio Player */}
      <audio ref={audioRef} src={audioSrc} loop={false}></audio> 
      <div className="mt-3 flex justify-between items-center space-x-2">
          <button 
            onClick={togglePlay} 
            className="px-3 py-1 text-sm font-medium text-white bg-teal-500 rounded hover:bg-teal-600"
          >
            {isPlaying ? 'Pause Sound' : 'Play Sound'}
          </button>
          <button 
            onClick={handleNext} 
            className="px-3 py-1 text-sm font-medium text-white bg-teal-500 rounded hover:bg-teal-600"
          >
            Next Quote
          </button>
      </div>
    </div>
  );
};

export default EmotionalIntelligenceAssistant;
