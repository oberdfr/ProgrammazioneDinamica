import React from 'react';
import Slide from '../layout/Slide';
import { motion } from 'framer-motion';

interface SlideHistoryDPProps {
    id: string;
    active: boolean;
}

const SlideHistoryDP = ({ id, active }: SlideHistoryDPProps) => {
    return (
        <Slide
            id={id}
            title="Storia della Programmazione Dinamica"
            subtitle="Dal calcolo balistico alla moderna informatica"
            active={active}
            backgroundColor="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-amber-900"
        >
            <div className="flex flex-col">
                <motion.div
                    className=""
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <p className="text-lg text-gray-700 dark:text-gray-200">
                        <strong>Origini:</strong> Il termine "programmazione dinamica" fu coniato da Richard Bellman negli anni '50 mentre lavorava alla RAND Corporation.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <motion.div
                        className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
                            La Guerra Fredda e la Programmazione Dinamica
                        </h3>
                        <div className="prose dark:prose-invert max-w-none">
                            <div className="text-2xl">
                                Durante la Guerra Fredda (1947-1991), gli Stati Uniti investirono massicciamente nella ricerca matematica per scopi militari.
                            </div>
                            <div className="text-2xl mt-6">
                                <strong>1952:</strong> (Richard Bellman) programmazione dinamica x ottimizzazione per percorsi missilistici alla RAND Corporation.
                            </div>
                            <div className="text-2xl mt-6">
                                <strong>Curiosità storica:</strong> Bellman la chiamo' programmazione dinamica per nascondere la natura matematica del lavoro al Segretario della Difesa Charles Erwin Wilson, che era ostile ad essa.
                            </div>
                            <div className="text-2xl mt-6">
                                Il termine "dinamica" si riferiva alle variabili che cambiano nel tempo, mentre "programmazione" si riferiva alla pianificazione e ottimizzazione, non alla scrittura di codice come intendiamo oggi.
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex flex-col"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow mb-4">
                            <h3 className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
                                L'equazione di Bellman
                            </h3>
                            <p className="mb-3 text-gray-700 dark:text-gray-200">
                                L'equazione fondamentale che ha cambiato l'ottimizzazione:
                            </p>
                            <div className="bg-amber-50 dark:bg-slate-800 p-3 rounded mb-3 font-mono text-center">
                                <p className="text-xl">V(s) = max<sub>a</sub> {`{R(s,a) + γ∑V(s')}`}</p>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Questa equazione rappresenta il principio di ottimalità di Bellman: una soluzione ottimale contiene soluzioni ottimali dei sottoproblemi.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow">
                            <h3 className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
                                Impatto storico e applicazioni
                            </h3>
                            <div className='text-2xl mb-4'> <strong>Corsa allo spazio (1955-1972):</strong> Ottimizzazione delle traiettorie dei veicoli spaziali</div>
                            <div className='text-2xl mb-4'> <strong>Anni '70:</strong> Teoria del controllo ottimale e pianificazione economica </div>
                            <div className='text-2xl mb-4'> <strong>Anni '80-'90:</strong> Bioinformatica, allineamento di sequenze DNA </div>
                            <div className='text-2xl mb-4'> <strong>Oggi:</strong> Apprendimento per rinforzo nell'intelligenza artificiale </div>
                        </div>
                    </motion.div>
                </div >
            </div >
        </Slide >
    );
};

export default SlideHistoryDP; 