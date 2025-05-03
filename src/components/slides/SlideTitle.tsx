// components/slides/SlideTitle.jsx
import React from 'react';
import Slide from '../layout/Slide';
import { motion } from 'framer-motion';

interface SlideTitleProps {
    id: string;
    active: boolean;
}

const SlideTitle = ({ id, active }: SlideTitleProps) => {
    return (
        <Slide
            id={id}
            title="Programmazione Dinamica II: Allineamento di Sequenze"
            subtitle="Dal Concetto all'Ottimizzazione dello Spazio con Hirschberg"
            active={active}
            backgroundColor="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-indigo-900"
        >
            <div className="flex flex-col items-center justify-center h-full relative">
                {/* DNA Helix Background */}
                <motion.div
                    className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    transition={{ delay: 0.2, duration: 1 }}
                >
                    <div className="absolute top-0 right-0 w-1/3 h-full">
                        <svg viewBox="0 0 200 800" className="w-full h-full">
                            <path
                                d="M100,0 C150,40 50,80 100,120 C150,160 50,200 100,240 C150,280 50,320 100,360 C150,400 50,440 100,480 C150,520 50,560 100,600 C150,640 50,680 100,720 C150,760 50,800 100,840"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                className="text-indigo-700 dark:text-indigo-300"
                            />
                            <path
                                d="M100,0 C50,40 150,80 100,120 C50,160 150,200 100,240 C50,280 150,320 100,360 C50,400 150,440 100,480 C50,520 150,560 100,600 C50,640 150,680 100,720 C50,760 150,800 100,840"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                className="text-blue-600 dark:text-blue-400"
                            />

                            {/* DNA Base Pairs */}
                            {[0, 40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480, 520, 560, 600, 640, 680, 720, 760].map((y, i) => (
                                <line
                                    key={i}
                                    x1="70"
                                    y1={y + 20}
                                    x2="130"
                                    y2={y + 20}
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    className={i % 4 === 0 ? "text-red-500" : i % 4 === 1 ? "text-green-500" : i % 4 === 2 ? "text-yellow-500" : "text-purple-500"}
                                />
                            ))}
                        </svg>
                    </div>

                    <div className="absolute bottom-0 left-0 w-1/3 h-full">
                        <svg viewBox="0 0 200 800" className="w-full h-full">
                            <path
                                d="M100,0 C150,40 50,80 100,120 C150,160 50,200 100,240 C150,280 50,320 100,360 C150,400 50,440 100,480 C150,520 50,560 100,600 C150,640 50,680 100,720 C150,760 50,800 100,840"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                className="text-indigo-700 dark:text-indigo-300"
                            />
                            <path
                                d="M100,0 C50,40 150,80 100,120 C50,160 150,200 100,240 C50,280 150,320 100,360 C50,400 150,440 100,480 C50,520 150,560 100,600 C50,640 150,680 100,720 C50,760 150,800 100,840"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                className="text-blue-600 dark:text-blue-400"
                            />

                            {/* DNA Base Pairs */}
                            {[0, 40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480, 520, 560, 600, 640, 680, 720, 760].map((y, i) => (
                                <line
                                    key={i}
                                    x1="70"
                                    y1={y + 20}
                                    x2="130"
                                    y2={y + 20}
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    className={i % 4 === 2 ? "text-red-500" : i % 4 === 3 ? "text-green-500" : i % 4 === 0 ? "text-yellow-500" : "text-purple-500"}
                                />
                            ))}
                        </svg>
                    </div>
                </motion.div>

                {/* Sequence Alignment Visualization */}
                <motion.div
                    className="mb-8 flex justify-center relative z-10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <div className="p-6 bg-white/90 dark:bg-slate-700/90 rounded-lg shadow-lg backdrop-blur-sm">
                        <div className="font-mono text-lg mb-4 text-center">
                            <div className="flex justify-center items-center mb-1">
                                <span className="mr-3 font-semibold">Seq A:</span>
                                <span className="flex">
                                    {'ATCGTACG'.split('').map((char, i) => (
                                        <span key={i} className={`w-8 h-8 flex items-center justify-center rounded 
                                            ${char === 'A' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                                                char === 'T' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                                                    char === 'C' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                                                        'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'}`}>
                                            {char}
                                        </span>
                                    ))}
                                </span>
                            </div>
                            <div className="flex justify-center items-center mb-1">
                                <span className="mr-3 font-semibold">Match:</span>
                                <span className="flex">
                                    {'| || |  '.split('').map((char, i) => (
                                        <span key={i} className="w-8 h-8 flex items-center justify-center">
                                            {char}
                                        </span>
                                    ))}
                                </span>
                            </div>
                            <div className="flex justify-center items-center">
                                <span className="mr-3 font-semibold">Seq B:</span>
                                <span className="flex">
                                    {'A-CGTA-G'.split('').map((char, i) => (
                                        <span key={i} className={`w-8 h-8 flex items-center justify-center rounded
                                            ${char === '-' ? 'bg-gray-100 dark:bg-gray-800 text-gray-400' :
                                                char === 'A' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                                                    char === 'T' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                                                        char === 'C' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                                                            'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'}`}>
                                            {char}
                                        </span>
                                    ))}
                                </span>
                            </div>
                        </div>

                        <div className="mt-5 border-t border-gray-200 dark:border-gray-600 pt-4">
                            <div className="flex justify-center">
                                <div className="grid grid-cols-5 gap-0.5 text-xs font-mono">
                                    <div className="w-6 h-6 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-semibold">DP</div>
                                    <div className="w-6 h-6 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">-</div>
                                    <div className="w-6 h-6 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">A</div>
                                    <div className="w-6 h-6 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">T</div>
                                    <div className="w-6 h-6 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">C</div>

                                    <div className="w-6 h-6 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">-</div>
                                    <div className="w-6 h-6 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-bold">0</div>
                                    <div className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">1</div>
                                    <div className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">2</div>
                                    <div className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">3</div>

                                    <div className="w-6 h-6 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">A</div>
                                    <div className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">1</div>
                                    <div className="w-6 h-6 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-bold">0</div>
                                    <div className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">1</div>
                                    <div className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">2</div>

                                    <div className="w-6 h-6 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">C</div>
                                    <div className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">2</div>
                                    <div className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">1</div>
                                    <div className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">2</div>
                                    <div className="w-6 h-6 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-bold">1</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="text-center space-y-2 relative z-10"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <p className="text-lg text-gray-600 dark:text-gray-300 bg-white/70 dark:bg-slate-800/70 px-4 py-2 rounded-full backdrop-blur-sm">
                        Bennella Alessandro, Caricari Lorenzo
                    </p>
                </motion.div>
            </div>
        </Slide>
    );
};

export default SlideTitle;