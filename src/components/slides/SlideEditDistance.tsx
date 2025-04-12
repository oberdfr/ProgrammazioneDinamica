import React from 'react';
import Slide from '../layout/Slide';
import { motion } from 'framer-motion';

interface SlideEditDistanceProps {
    id: string;
    active: boolean;
}

const SlideEditDistance = ({ id, active }: SlideEditDistanceProps) => {
    return (
        <Slide
            id={id}
            title="Edit Distance"
            subtitle="Distanza di Levenshtein/Needleman-Wunsch"
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
                        Obiettivo: Misurare la "distanza" tra due stringhe come il costo minimo per trasformare una nell'altra.
                    </p>
                </motion.div>

                <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                        Operazioni Consentite:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-700 rounded-lg shadow">
                            <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Mismatch</h4>
                            <p className="text-gray-700 dark:text-gray-200">
                                Sostituzione di un carattere con un altro
                                <br />
                                <span className="text-sm">(costo: α<sub>pq</sub>)</span>
                            </p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-700 rounded-lg shadow">
                            <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Gap</h4>
                            <p className="text-gray-700 dark:text-gray-200">
                                Inserimento/Cancellazione di un carattere "-"
                                <br />
                                <span className="text-sm">(costo: δ)</span>
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                        Esempio: Allineamento DNA
                    </h3>
                    <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow">
                        <div className="font-mono text-center space-y-2">
                            <div className="text-gray-700 dark:text-gray-200">CTACCG</div>
                            <div className="text-gray-700 dark:text-gray-200">TACATG</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Slide>
    );
};

export default SlideEditDistance; 