import React from 'react';
import Slide from '../layout/Slide';
import { motion } from 'framer-motion';

interface SlideDPIntroProps {
    id: string;
    active: boolean;
}

const SlideDPIntro = ({ id, active }: SlideDPIntroProps) => {
    return (
        <Slide
            id={id}
            title="Introduzione alla Programmazione Dinamica (DP)"
            subtitle="Un paradigma algoritmico per risolvere problemi complessi"
            active={active}
            backgroundColor="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-indigo-900"
        >
            <div className="flex flex-col h-full">
                <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <p className="text-lg text-gray-700 dark:text-gray-200 mb-4">
                        Cos'è la DP? Un paradigma algoritmico per risolvere problemi complessi scomponendoli in sotto-problemi più semplici e sovrapposti.
                    </p>
                </motion.div>

                <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                        Principi Chiave:
                    </h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-200">
                        <li>
                            <span className="font-medium">Sottostruttura Ottima:</span> La soluzione ottima al problema principale può essere costruita dalle soluzioni ottime dei suoi sotto-problemi.
                        </li>
                        <li>
                            <span className="font-medium">Sotto-problemi Sovrapposti:</span> Le stesse sotto-soluzioni sono necessarie più volte. La DP le calcola una sola volta e le memorizza (Memoization o approccio Bottom-Up).
                        </li>
                    </ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                        Confronto con altri approcci:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-700 rounded-lg shadow">
                            <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Greedy</h4>
                            <p className="text-gray-700 dark:text-gray-200">Scelte locali ottime, non sempre globalmente ottime.</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-700 rounded-lg shadow">
                            <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Divide and Conquer</h4>
                            <p className="text-gray-700 dark:text-gray-200">Divide in sotto-problemi indipendenti, poi combina.</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-700 rounded-lg shadow">
                            <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">DP</h4>
                            <p className="text-gray-700 dark:text-gray-200">Divide in sotto-problemi dipendenti/sovrapposti, costruisce la soluzione dal basso verso l'alto o con memoization.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Slide>
    );
};

export default SlideDPIntro; 