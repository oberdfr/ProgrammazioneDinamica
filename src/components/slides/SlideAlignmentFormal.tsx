import React from 'react';
import Slide from '../layout/Slide';
import { motion } from 'framer-motion';

interface SlideAlignmentFormalProps {
    id: string;
    active: boolean;
}

const SlideAlignmentFormal = ({ id, active }: SlideAlignmentFormalProps) => {
    return (
        <Slide
            id={id}
            title="Allineamento di Sequenze: Definizione Formale"
            subtitle="Formalizzazione matematica del problema"
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
                        <strong>Obiettivo:</strong> Date due stringhe X = x<sub>1</sub>...x<sub>m</sub> e Y = y<sub>1</sub>...y<sub>n</sub>, trovare un allineamento M di costo minimo.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                        Definizione di Allineamento (M):
                    </h3>
                    <p className="text-gray-700 dark:text-gray-200 mb-4">
                        Un insieme di coppie ordinate x<sub>i</sub>-y<sub>j</sub> tale che:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-200">
                        <li>Ogni carattere appare <span className="font-semibold">al massimo in una coppia</span>.</li>
                        <li>
                            <span className="font-semibold">Nessun incrocio</span>: Se x<sub>i</sub>-y<sub>j</sub> e x<sub>i'</sub>-y<sub>j'</sub> sono in M con i &lt; i', allora deve essere j &lt; j'.
                        </li>
                    </ul>

                    <div className="mt-4 flex justify-center">
                        <svg width="320" height="120" viewBox="0 0 320 120" className="text-indigo-600 dark:text-indigo-400">
                            <g fill="none" stroke="currentColor" strokeWidth="2">
                                {/* Stringhe di esempio */}
                                <text x="30" y="30" className="text-lg font-mono" fill="currentColor">P A L E T T E</text>
                                <text x="30" y="90" className="text-lg font-mono" fill="currentColor">P A L A T E -</text>

                                {/* Linee di allineamento */}
                                <line x1="35" y1="35" x2="35" y2="85" stroke="currentColor" />
                                <line x1="55" y1="35" x2="55" y2="85" stroke="currentColor" />
                                <line x1="75" y1="35" x2="75" y2="85" stroke="currentColor" />
                                <line x1="95" y1="35" x2="95" y2="85" stroke="currentColor" />
                                <line x1="115" y1="35" x2="115" y2="85" stroke="currentColor" />
                                <line x1="135" y1="35" x2="175" y2="85" stroke="currentColor" strokeDasharray="4" />
                                <line x1="155" y1="35" x2="155" y2="85" stroke="currentColor" />

                                {/* X incrocio non valido */}
                                <line x1="220" y1="30" x2="280" y2="90" stroke="red" strokeWidth="2" />
                                <line x1="220" y1="90" x2="280" y2="30" stroke="red" strokeWidth="2" />
                                <circle cx="250" cy="60" r="30" stroke="red" strokeWidth="2" fill="none" />
                                <text x="240" y="65" fill="red" className="text-sm">Non valido</text>
                            </g>
                        </svg>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                        Costo di un Allineamento:
                    </h3>
                    <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow">
                        <p className="text-center font-semibold text-indigo-600 dark:text-indigo-400">
                            Costo(M) = <span className="ml-2">Σ α<sub>xi,yj</sub> (per coppie allineate) + Σ δ (per caratteri non allineati - gap)</span>
                        </p>
                    </div>
                </motion.div>
            </div>
        </Slide>
    );
};

export default SlideAlignmentFormal; 