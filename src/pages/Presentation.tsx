// pages/Presentation.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Slide from '../components/layout/Slide';
import CodeViewer from '../components/common/CodeViewer';
import AlgorithmVisualizer from '../components/visualization/AlgorithmVisualizer';

// Import slide content components
import SlideTitle from '../components/slides/SlideTitle';

const Presentation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState('slide1');
  const [availableSlides, setAvailableSlides] = useState(['slide1']);
  
  // Parse the hash to determine current slide
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && availableSlides.includes(hash)) {
      setActiveSlide(hash);
    } else if (!hash && availableSlides.length > 0) {
      navigate(`/presentation#${availableSlides[0]}`, { replace: true });
    }
  }, [location, navigate, availableSlides]);
  
  // Initialize available slides based on what components are actually imported
  useEffect(() => {
    // In a real implementation, this might check which slide components actually exist
    // For now, we'll only include slide1 as you mentioned you'll create the others
    setAvailableSlides(['slide1']);
  }, []);
  
  // Navigation handlers
  const goToNextSlide = () => {
    const currentIndex = availableSlides.indexOf(activeSlide);
    if (currentIndex < availableSlides.length - 1) {
      navigate(`/presentation#${availableSlides[currentIndex + 1]}`);
    }
  };
  
  const goToPrevSlide = () => {
    const currentIndex = availableSlides.indexOf(activeSlide);
    if (currentIndex > 0) {
      navigate(`/presentation#${availableSlides[currentIndex - 1]}`);
    }
  };
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        goToNextSlide();
      } else if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlide, availableSlides]);
  
  // Current slide index information
  const currentIndex = availableSlides.indexOf(activeSlide);
  const totalSlides = availableSlides.length;
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="aspect-[16/9] max-h-[80vh] relative mx-auto overflow-hidden my-8">
        {/* Only render the active slide */}
        {activeSlide === 'slide1' && (
          <SlideTitle 
            id="slide1" 
            active={activeSlide === 'slide1'} 
          />
        )}
        
        {/* Navigation Controls */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {currentIndex + 1} / {totalSlides}
          </span>
          
          <button
            onClick={goToPrevSlide}
            disabled={currentIndex === 0}
            className={`p-2 rounded-full ${
              currentIndex === 0 
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            } transition-colors duration-200`}
            aria-label="Previous slide"
          >
            <ArrowLeft size={20} />
          </button>
          
          <button
            onClick={goToNextSlide}
            disabled={currentIndex === totalSlides - 1}
            className={`p-2 rounded-full ${
              currentIndex === totalSlides - 1
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            } transition-colors duration-200`}
            aria-label="Next slide"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Presentation;