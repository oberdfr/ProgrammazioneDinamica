import React from 'react';
import Slide from '../layout/Slide';
import { motion } from 'framer-motion';

interface SlideDPSolutionProps {
    id: string;
    active: boolean;
}

const SlideDPSolution = ({ id, active }: SlideDPSolutionProps) => {
    return (
        <Slide
            id={id}
            title="Soluzione con Programmazione Dinamica"
            subtitle="Sfruttando la sottostruttura ottima del problema"
            active={active}
            backgroundColor="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-indigo-900"
        >
            <div className="flex flex-col">
                <motion.div
                    className="mb-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                        Sottostruttura Ottima:
                    </h3>
                    <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow mb-3">
                        <p className="text-gray-700 dark:text-gray-200 mb-2 text-sm">
                            Definiamo <span className="font-bold">OPT(i, j)</span> = costo minimo per allineare i prefissi X[1..i] e Y[1..j].
                        </p>
                        <p className="text-gray-700 dark:text-gray-200 text-sm">
                            <span className="font-bold">Obiettivo finale:</span> OPT(m, n)
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex-1"
                >
                    <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                        Relazione Ricorrente (Equazione di Bellman):
                    </h3>
                    <div className="bg-white dark:bg-slate-700 p-5 rounded-lg shadow-lg mb-3">
                        <p className="text-gray-700 dark:text-gray-200 mb-3 text-sm">
                            OPT(i, j) è il <span className="font-bold">minimo</span> tra tre casi:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                            <motion.div
                                className="border border-indigo-200 dark:border-indigo-800 rounded-lg p-2 bg-indigo-50 dark:bg-indigo-900/30"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <p className="text-center text-gray-700 dark:text-gray-200 mb-1 text-sm">
                                    α<sub>xi,yj</sub> + OPT(i-1, j-1)
                                </p>
                                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                                    (x<sub>i</sub> allineato con y<sub>j</sub>)
                                </p>
                                <div className="mt-2 flex justify-center">
                                    <svg width="72" height="72" viewBox="0 0 80 80" className="text-indigo-500">
                                        <g fill="none" stroke="currentColor" strokeWidth="1">
                                            <rect x="20" y="20" width="20" height="20" fill="none" stroke="currentColor" />
                                            <rect x="40" y="20" width="20" height="20" fill="none" stroke="currentColor" />
                                            <rect x="20" y="40" width="20" height="20" fill="none" stroke="currentColor" />
                                            <rect x="40" y="40" width="20" height="20" fill="rgba(79, 70, 229, 0.2)" stroke="currentColor" />
                                            <line x1="30" y1="30" x2="50" y2="50" strokeWidth="2" />
                                        </g>
                                    </svg>
                                </div>
                            </motion.div>

                            <motion.div
                                className="border border-indigo-200 dark:border-indigo-800 rounded-lg p-2 bg-indigo-50 dark:bg-indigo-900/30"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <p className="text-center text-gray-700 dark:text-gray-200 mb-1 text-sm">
                                    δ + OPT(i-1, j)
                                </p>
                                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                                    (x<sub>i</sub> allineato con un gap)
                                </p>
                                <div className="mt-2 flex justify-center">
                                    <svg width="72" height="72" viewBox="0 0 80 80" className="text-indigo-500">
                                        <g fill="none" stroke="currentColor" strokeWidth="1">
                                            <rect x="20" y="20" width="20" height="20" fill="none" stroke="currentColor" />
                                            <rect x="40" y="20" width="20" height="20" fill="none" stroke="currentColor" />
                                            <rect x="20" y="40" width="20" height="20" fill="none" stroke="currentColor" />
                                            <rect x="40" y="40" width="20" height="20" fill="rgba(79, 70, 229, 0.2)" stroke="currentColor" />
                                            <line x1="30" y1="50" x2="50" y2="50" strokeWidth="2" />
                                        </g>
                                    </svg>
                                </div>
                            </motion.div>

                            <motion.div
                                className="border border-indigo-200 dark:border-indigo-800 rounded-lg p-2 bg-indigo-50 dark:bg-indigo-900/30"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <p className="text-center text-gray-700 dark:text-gray-200 mb-1 text-sm">
                                    δ + OPT(i, j-1)
                                </p>
                                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                                    (y<sub>j</sub> allineato con un gap)
                                </p>
                                <div className="mt-2 flex justify-center">
                                    <svg width="72" height="72" viewBox="0 0 80 80" className="text-indigo-500">
                                        <g fill="none" stroke="currentColor" strokeWidth="1">
                                            <rect x="20" y="20" width="20" height="20" fill="none" stroke="currentColor" />
                                            <rect x="40" y="20" width="20" height="20" fill="none" stroke="currentColor" />
                                            <rect x="20" y="40" width="20" height="20" fill="none" stroke="currentColor" />
                                            <rect x="40" y="40" width="20" height="20" fill="rgba(79, 70, 229, 0.2)" stroke="currentColor" />
                                            <line x1="50" y1="30" x2="50" y2="50" strokeWidth="2" />
                                        </g>
                                    </svg>
                                </div>
                            </motion.div>
                        </div>

                        <div className="bg-gray-100 dark:bg-slate-800 p-2 rounded">
                            <p className="text-gray-700 dark:text-gray-300 font-semibold text-sm pl-2 pt-2">
                                Casi Base:
                            </p>
                            <ul className="list-disc pl-12 text-gray-700 dark:text-gray-300 text-sm">
                                <li>OPT(i, 0) = i * δ</li>
                                <li>OPT(0, j) = j * δ</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Slide>
    );
};

export default SlideDPSolution; 