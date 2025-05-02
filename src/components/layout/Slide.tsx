// components/presentation/Slide.jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SlideProps {
    id: string;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    backgroundColor?: string;
    textColor?: string;
    active: boolean;
    onEnter?: () => void;
    onExit?: () => void;
}

const Slide = ({
    id,
    title,
    subtitle,
    children,
    backgroundColor = 'bg-white dark:bg-slate-800',
    textColor = 'text-slate-800 dark:text-white',
    active = false,
    onEnter = () => { },
    onExit = () => { }
}: SlideProps) => {
    const slideRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (active && slideRef.current) {
            onEnter();
        } else if (!active && slideRef.current) {
            onExit();
        }
    }, [active, onEnter, onExit]);

    // Animation variants
    const slideVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        },
        exit: {
            opacity: 0,
            y: -50,
            transition: { duration: 0.3 }
        }
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 }
        }
    };

    if (!active) return null;

    return (
        <motion.div
            id={id}
            ref={slideRef}
            className={`w-full h-full ${backgroundColor} ${textColor} rounded-xl shadow-xl overflow-hidden`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideVariants}
            style={{
                aspectRatio: '16/9',
                transform: 'scale(1)',
                transformOrigin: 'center center',
                // Optimize rendering
                willChange: 'transform',
            }}
        >
            {/* Fixed-size slide content container */}
            <div
                className="slide-content-scaler p-8 h-full flex flex-col"
                style={{
                    // Fixed reference sizing - this will be our "canonical" slide size
                    width: '1920px',
                    height: '1080px',
                    // Scale transform is dynamically calculated based on container size
                    transform: 'scale(var(--slide-scale-factor))',
                    transformOrigin: 'top left',
                    // High quality scaling
                    textRendering: 'geometricPrecision',
                }}
            >
                {/* Slide Header */}
                <div className="mb-8">
                    {title && (
                        <motion.h2
                            className="text-5xl font-bold tracking-tight mb-2"
                            variants={contentVariants}
                            style={{ fontSize: '64px', lineHeight: '1.2' }}
                        >
                            {title}
                        </motion.h2>
                    )}

                    {subtitle && (
                        <motion.h3
                            className="text-3xl text-gray-600 dark:text-gray-300"
                            variants={contentVariants}
                            style={{ fontSize: '36px', lineHeight: '1.3' }}
                        >
                            {subtitle}
                        </motion.h3>
                    )}
                </div>

                {/* Slide Content */}
                <motion.div
                    className="flex-1 overflow-hidden"
                    variants={contentVariants}
                >
                    {children}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Slide;