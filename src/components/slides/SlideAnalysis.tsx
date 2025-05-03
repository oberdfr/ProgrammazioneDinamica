import React from 'react';
import Slide from '../layout/Slide';
import { motion } from 'framer-motion';

interface SlideAnalysisProps {
    id: string;
    active: boolean;
}

const SlideAnalysis = ({ id, active }: SlideAnalysisProps) => {
    return (
        <Slide
            id={id}
            title="Analisi Algoritmo DP Standard"
            subtitle="Valutazione delle performance"
            active={active}
            backgroundColor="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-indigo-900"
        >
            <div className="flex flex-col h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                    {/* Complessità Teorema Sezione */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="h-full"
                    >
                        <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow-lg h-full">
                            <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                                Teorema:
                            </h3>
                            <p className="text-gray-700 dark:text-gray-200 text-sm">
                                L'algoritmo DP calcola la edit distance (e un allineamento ottimo tramite traceback) in:
                            </p>
                            <div className="mt-2 grid grid-cols-2 gap-2">
                                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10" />
                                                <path d="M12 6v6l4 2" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-700 dark:text-gray-200 text-sm">Tempo:</h4>
                                            <p className="text-gray-700 dark:text-gray-300 text-lg">Θ(mn)</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Ogni cella: tempo O(1)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                                <path d="M10 4v4" />
                                                <path d="M2 8h20" />
                                                <path d="M6 12h4" />
                                                <path d="M6 16h4" />
                                                <path d="M14 12h4" />
                                                <path d="M14 16h4" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-700 dark:text-gray-200 text-sm">Spazio:</h4>
                                            <p className="text-gray-700 dark:text-gray-300 text-lg">Θ(mn)</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Per tabella M
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3">
                                <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                                    Problema con la Complessità Spaziale:
                                </h3>
                                <p className="text-gray-700 dark:text-gray-200 text-sm mb-2">
                                    Lo spazio Θ(mn) può essere proibitivo per sequenze molto lunghe.
                                </p>
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-600 rounded-r-md p-2 mt-2">
                                    <p className="text-gray-700 dark:text-gray-200 text-sm">
                                        <span className="font-semibold">Domanda:</span> Possiamo ridurre lo spazio senza compromettere significativamente il tempo?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Esempio Sezione */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="h-full"
                    >
                        <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow-lg h-full">
                            <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                                Esempio con Genomi Lunghi:
                            </h3>
                            <div className="text-gray-700 dark:text-gray-200 text-sm mt-1">
                                <p className="mb-1">
                                    <span className="font-semibold">Per genomi con m, n ≈ 10<sup>9</sup> basi:</span>
                                </p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Tabella: 10<sup>18</sup> celle</li>
                                    <li>A 4 byte per cella = 4 × 10<sup>18</sup> byte ≈ 4 exabyte!</li>
                                    <li>Impraticabile anche per i supercomputer moderni</li>
                                </ul>
                            </div>

                            <div className="mt-3 flex justify-center">
                                <div className="relative">
                                    <div className="w-60 h-60 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center overflow-hidden">
                                        <div className="absolute inset-0 grid grid-cols-[repeat(30,1fr)] grid-rows-[repeat(30,1fr)] opacity-30">
                                            {Array.from({ length: 900 }).map((_, i) => (
                                                <div key={i} className="border border-indigo-200 dark:border-indigo-700"></div>
                                            ))}
                                        </div>
                                        <div className="z-10 p-3 bg-white/90 dark:bg-slate-800/90 rounded shadow-lg text-center">
                                            <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                                                Θ(mn) spazio
                                            </p>
                                            <div className="text-xl text-gray-500 dark:text-gray-400">
                                                Cresce rapidamente con la dimensione dell'input
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-red-500 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center text-xs font-bold">
                                        ⚠️
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 text-gray-700 dark:text-gray-200 text-base">
                                <p className="italic font-medium text-center">
                                    "La complessità spaziale quadratica è il principale limite dell'algoritmo DP standard"
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Slide>
    );
};

export default SlideAnalysis; 