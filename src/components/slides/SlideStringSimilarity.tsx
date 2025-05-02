import React from 'react';
import Slide from '../layout/Slide';
import { motion } from 'framer-motion';

interface SlideStringSimilarityProps {
    id: string;
    active: boolean;
}

const SlideStringSimilarity = ({ id, active }: SlideStringSimilarityProps) => {
    return (
        <Slide
            id={id}
            title="Il Problema: Similarità tra Stringhe"
            subtitle="Quanto sono simili due stringhe?"
            active={active}
            backgroundColor="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-indigo-900"
        >
            <div className="flex flex-col h-full">
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg mb-6">
                        <h3 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
                            Esempio:
                        </h3>
                        <div className="flex items-center justify-center space-x-4 text-3xl font-mono">
                            <span className="text-gray-700 dark:text-gray-200">ocurrance</span>
                            <span className="text-gray-500">vs</span>
                            <span className="text-gray-700 dark:text-gray-200">occurrence</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
                        Applicazioni:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-700 rounded-lg shadow">
                            <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Bioinformatica</h4>
                            <p className="text-gray-700 dark:text-gray-200">Confronto DNA/proteine (fondamentale!)</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-700 rounded-lg shadow">
                            <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Correzione ortografica</h4>
                            <p className="text-gray-700 dark:text-gray-200">Spell checking</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-700 rounded-lg shadow">
                            <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Traduzione automatica</h4>
                            <p className="text-gray-700 dark:text-gray-200">Allineamento di frasi e parole</p>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-700 rounded-lg shadow">
                            <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Altri usi</h4>
                            <p className="text-gray-700 dark:text-gray-200">Riconoscimento vocale, Information extraction, Plagio, Diff...</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Slide>
    );
};

export default SlideStringSimilarity; 