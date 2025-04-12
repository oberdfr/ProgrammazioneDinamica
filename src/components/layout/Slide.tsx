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
        >
            <div className="p-8 md:p-12 h-full flex flex-col">
                {/* Slide Header */}
                <div className="mb-8">
                    {title && (
                        <motion.h2
                            className="text-4xl md:text-5xl font-bold tracking-tight mb-2"
                            variants={contentVariants}
                        >
                            {title}
                        </motion.h2>
                    )}

                    {subtitle && (
                        <motion.h3
                            className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300"
                            variants={contentVariants}
                        >
                            {subtitle}
                        </motion.h3>
                    )}
                </div>

                {/* Slide Content */}
                <motion.div
                    className="flex-1 overflow-y-auto"
                    variants={contentVariants}
                >
                    {children}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Slide;