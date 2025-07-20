import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMaximize2, FiX, FiChevronLeft, FiChevronRight, FiDownload, FiInfo } = FiIcons;

function DiagramViewer({ diagrams, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(true);

  const currentDiagram = diagrams[currentIndex];

  const nextDiagram = () => {
    setCurrentIndex((prev) => (prev + 1) % diagrams.length);
  };

  const prevDiagram = () => {
    setCurrentIndex((prev) => (prev - 1 + diagrams.length) % diagrams.length);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const downloadDiagram = () => {
    const link = document.createElement('a');
    link.href = currentDiagram.url;
    link.download = `ultrasound-physics-${currentDiagram.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`bg-white rounded-xl ${
            isFullscreen ? 'w-full h-full' : 'max-w-4xl max-h-[90vh]'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-medical-200">
            <h3 className="font-bold text-medical-900">{currentDiagram.title}</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleInfo}
                className="p-2 hover:bg-medical-100 rounded-lg transition-colors text-medical-600"
                title="Toggle description"
              >
                <SafeIcon icon={FiInfo} />
              </button>
              <button
                onClick={downloadDiagram}
                className="p-2 hover:bg-medical-100 rounded-lg transition-colors text-medical-600"
                title="Download diagram"
              >
                <SafeIcon icon={FiDownload} />
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-2 hover:bg-medical-100 rounded-lg transition-colors text-medical-600"
                title="Toggle fullscreen"
              >
                <SafeIcon icon={FiMaximize2} />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-medical-100 rounded-lg transition-colors text-medical-600"
                title="Close"
              >
                <SafeIcon icon={FiX} />
              </button>
            </div>
          </div>

          <div className="relative">
            {diagrams.length > 1 && (
              <>
                <button
                  onClick={prevDiagram}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 rounded-full hover:bg-white shadow-lg transition-colors"
                >
                  <SafeIcon icon={FiChevronLeft} className="text-xl text-medical-800" />
                </button>
                <button
                  onClick={nextDiagram}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 rounded-full hover:bg-white shadow-lg transition-colors"
                >
                  <SafeIcon icon={FiChevronRight} className="text-xl text-medical-800" />
                </button>
              </>
            )}

            <div 
              className="overflow-auto bg-medical-50" 
              style={{ 
                maxHeight: isFullscreen ? 'calc(100vh - 8rem)' : '70vh',
                minHeight: isFullscreen ? 'calc(100vh - 8rem)' : '400px'
              }}
            >
              <div className="flex flex-col items-center justify-center p-4">
                <motion.img
                  key={currentDiagram.url}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={currentDiagram.url}
                  alt={currentDiagram.title}
                  className="max-w-full h-auto shadow-lg rounded-lg border border-medical-200"
                />
                
                <AnimatePresence>
                  {showInfo && currentDiagram.description && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="mt-6 p-4 bg-white/90 backdrop-blur-sm rounded-lg border border-medical-200 shadow-md max-w-2xl"
                    >
                      <p className="text-medical-700 leading-relaxed">
                        {currentDiagram.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          
          {diagrams.length > 1 && (
            <div className="p-4 border-t border-medical-200 flex justify-center">
              <div className="flex space-x-2">
                {diagrams.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      idx === currentIndex 
                        ? 'bg-primary-500 scale-125' 
                        : 'bg-medical-300 hover:bg-medical-400'
                    }`}
                    aria-label={`Go to diagram ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default DiagramViewer;