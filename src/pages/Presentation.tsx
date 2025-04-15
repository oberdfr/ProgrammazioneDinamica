// pages/Presentation.jsx
import React, { useState, useEffect, useCallback } from 'react';
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
import SlideAlignmentFormal from '../components/slides/SlideAlignmentFormal';
import SlideDPSolution from '../components/slides/SlideDPSolution';
import SlideBottomUp from '../components/slides/SlideBottomUp';
import SlideExample from '../components/slides/SlideExample';
import SlideAnalysis from '../components/slides/SlideAnalysis';
import SlideHirschberg from '../components/slides/SlideHirschberg';
import SlideApplications from '../components/slides/SlideApplications';
import SlideSummary from '../components/slides/SlideSummary';

const Presentation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeSlide, setActiveSlide] = useState('slide1');
    const [availableSlides, setAvailableSlides] = useState([
        'slide1', 'slide2', 'slide3', 'slide4', 'slide5',
        'slide6', 'slide7', 'slide8', 'slide9', 'slide10', 'slide11', 'slide12'
    ]);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

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

    // Mouse movement handler
    const handleMouseMove = useCallback(() => {
        setShowControls(true);
        if (hideTimeout) {
            clearTimeout(hideTimeout);
        }
        const timeout = setTimeout(() => {
            setShowControls(false);
        }, 2000);
        setHideTimeout(timeout);
    }, [hideTimeout]);

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            if (hideTimeout) {
                clearTimeout(hideTimeout);
            }
        };
    }, [handleMouseMove, hideTimeout]);

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
                {activeSlide === 'slide5' && (
                    <SlideAlignmentFormal
                        id="slide5"
                        active={activeSlide === 'slide5'}
                    />
                )}
                {activeSlide === 'slide6' && (
                    <SlideDPSolution
                        id="slide6"
                        active={activeSlide === 'slide6'}
                    />
                )}
                {activeSlide === 'slide7' && (
                    <SlideBottomUp
                        id="slide7"
                        active={activeSlide === 'slide7'}
                    />
                )}
                {activeSlide === 'slide8' && (
                    <SlideExample
                        id="slide8"
                        active={activeSlide === 'slide8'}
                    />
                )}
                {activeSlide === 'slide9' && (
                    <SlideAnalysis
                        id="slide9"
                        active={activeSlide === 'slide9'}
                    />
                )}
                {activeSlide === 'slide10' && (
                    <SlideHirschberg
                        id="slide10"
                        active={activeSlide === 'slide10'}
                    />
                )}
                {activeSlide === 'slide11' && (
                    <SlideApplications
                        id="slide11"
                        active={activeSlide === 'slide11'}
                    />
                )}
                {activeSlide === 'slide12' && (
                    <SlideSummary
                        id="slide12"
                        active={activeSlide === 'slide12'}
                    />
                )}

                {/* Navigation Controls */}
                <div className={`absolute bottom-4 right-4 flex items-center space-x-4 bg-white dark:bg-slate-800 rounded-full shadow-lg p-2 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}>
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