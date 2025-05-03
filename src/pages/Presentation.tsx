// pages/Presentation.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Maximize2, Minimize2 } from 'lucide-react';

// Import slide configuration
import { slides, getSlideIds } from '../config/siteConfig';

const Presentation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeSlide, setActiveSlide] = useState('slide1');
    const [availableSlides, setAvailableSlides] = useState(getSlideIds());
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

    // Ref for the slide container
    const slideContainerRef = useRef<HTMLDivElement>(null);

    // Function to calculate and apply the scale factor
    const updateSlideScale = useCallback(() => {
        if (!slideContainerRef.current) return;

        const container = slideContainerRef.current;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        // Calculate scale factor (our reference slide is 1920x1080)
        // We need to find the smaller of the two ratios to keep everything visible
        const widthRatio = containerWidth / 1920;
        const heightRatio = containerHeight / 1080;
        const scaleFactor = Math.min(widthRatio, heightRatio);

        // Set the CSS variable that our slides will use
        document.documentElement.style.setProperty('--slide-scale-factor', scaleFactor.toString());
    }, []);

    // Update scale when container size changes or fullscreen mode toggles
    useEffect(() => {
        updateSlideScale();

        // Set up resize observer to update scale when container changes size
        const resizeObserver = new ResizeObserver(() => {
            updateSlideScale();
        });

        if (slideContainerRef.current) {
            resizeObserver.observe(slideContainerRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, [updateSlideScale, isFullscreen]);

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
        <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-gray-900' : 'h-[calc(100vh-6rem)]'} flex items-center justify-center overflow-hidden`}>
            {/* 16:9 aspect ratio container that scales proportionally */}
            <div
                ref={slideContainerRef}
                className="relative w-full h-full flex items-center justify-center"
            >
                <div
                    className="relative"
                    style={{
                        width: 'min(100%, calc(100vh * 16/9))',
                        height: 'min(100%, calc(100vw * 9/16))',
                        maxWidth: '100%',
                        maxHeight: '100%',
                    }}
                >
                    {/* Slide container */}
                    <div className="w-full h-full">
                        {/* Render the active slide */}
                        {slides.map((slide) => {
                            const SlideComponent = slide.component;
                            return activeSlide === slide.id && (
                                <SlideComponent
                                    key={slide.id}
                                    id={slide.id}
                                    active={activeSlide === slide.id}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Navigation Controls - moved outside the slide scaling container */}
                <div className={`absolute bottom-4 right-4 flex items-center space-x-4 bg-white dark:bg-slate-800 rounded-full shadow-lg p-2 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
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