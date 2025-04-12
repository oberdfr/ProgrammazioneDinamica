// pages/Presentation.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Maximize2, Minimize2 } from 'lucide-react';
import Slide from '../components/layout/Slide';
import CodeViewer from '../components/common/CodeViewer';
import AlgorithmVisualizer from '../components/visualization/AlgorithmVisualizer';

// Import slide content components
import SlideTitle from '../components/slides/SlideTitle';
import SlideDPIntro from '../components/slides/SlideDPIntro';
import SlideStringSimilarity from '../components/slides/SlideStringSimilarity';
import SlideEditDistance from '../components/slides/SlideEditDistance';

const Presentation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeSlide, setActiveSlide] = useState('slide1');
    const [availableSlides, setAvailableSlides] = useState(['slide1', 'slide2', 'slide3', 'slide4']);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Parse the hash to determine current slide
    useEffect(() => {
        const hash = location.hash.replace('#', '');
        if (hash && availableSlides.includes(hash)) {
            setActiveSlide(hash);
        } else if (!hash && availableSlides.length > 0) {
            navigate(`/presentation#${availableSlides[0]}`, { replace: true });
        }
    }, [location, navigate, availableSlides]);

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

    // Fullscreen handlers
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Prevent scrolling
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') {
                goToNextSlide();
            } else if (e.key === 'ArrowLeft') {
                goToPrevSlide();
            } else if (e.key === 'f' || e.key === 'F') {
                toggleFullscreen();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeSlide, availableSlides]);

    // Current slide index information
    const currentIndex = availableSlides.indexOf(activeSlide);
    const totalSlides = availableSlides.length;

    return (
        <div className={` ${isFullscreen ? 'fixed inset-0 z-50 bg-gray-900' : 'h-[calc(100vh-6rem)]'}`}>
            <div className={`w-full h-full ${isFullscreen ? 'p-4' : 'p-6'} relative`}>
                {/* Render the active slide */}
                {activeSlide === 'slide1' && (
                    <SlideTitle
                        id="slide1"
                        active={activeSlide === 'slide1'}
                    />
                )}
                {activeSlide === 'slide2' && (
                    <SlideDPIntro
                        id="slide2"
                        active={activeSlide === 'slide2'}
                    />
                )}
                {activeSlide === 'slide3' && (
                    <SlideStringSimilarity
                        id="slide3"
                        active={activeSlide === 'slide3'}
                    />
                )}
                {activeSlide === 'slide4' && (
                    <SlideEditDistance
                        id="slide4"
                        active={activeSlide === 'slide4'}
                    />
                )}

                {/* Navigation Controls */}
                <div className="absolute bottom-4 right-4 flex items-center space-x-4 bg-white dark:bg-slate-800 rounded-full shadow-lg p-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400 px-2">
                        {currentIndex + 1} / {totalSlides}
                    </span>

                    <button
                        onClick={goToPrevSlide}
                        disabled={currentIndex === 0}
                        className={`p-2 rounded-full ${currentIndex === 0
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
                        className={`p-2 rounded-full ${currentIndex === totalSlides - 1
                            ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            } transition-colors duration-200`}
                        aria-label="Next slide"
                    >
                        <ArrowRight size={20} />
                    </button>

                    <button
                        onClick={toggleFullscreen}
                        className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                    >
                        {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Presentation;