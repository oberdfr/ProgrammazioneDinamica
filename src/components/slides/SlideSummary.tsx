import React from 'react';
import Slide from '../layout/Slide';
import { motion } from 'framer-motion';

interface SlideSummaryProps {
    id: string;
    active: boolean;
}

const SlideSummary = ({ id, active }: SlideSummaryProps) => {
    return (
        <Slide
            id={id}
            title="Riepilogo Allineamento Sequenze"
            subtitle="Dalla teoria alla pratica"
            active={active}
            backgroundColor="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-indigo-900"
        >
            <div className="flex flex-col h-full">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg">
                        <h3 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                            Problema fondamentale
                        </h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Allineamento di sequenze: fondamentale in bioinformatica, linguistica e altre discipline</li>
                            <li>Distanza di edit: misura la similarità tra stringhe</li>
                            <li>Operazioni: match/mismatch, gap (inserimenti/cancellazioni)</li>
                            <li>Obiettivo: trovare l'allineamento di costo minimo</li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg">
                        <h3 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                            Soluzione DP standard
                        </h3>
                        <div className="space-y-2 text-gray-600 dark:text-gray-300">
                            <p><span className="font-semibold">Tempo:</span> O(mn)</p>
                            <p><span className="font-semibold">Spazio:</span> O(mn)</p>
                            <p><span className="font-semibold">Pro:</span> Semplice da implementare, intuitivo</p>
                            <p><span className="font-semibold">Contro:</span> Lo spazio è un limite per sequenze lunghe</p>
                            <p className="mt-3">Riempie una tabella m×n e usa traceback per ricostruire l'allineamento</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                        Algoritmo di Hirschberg
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2 text-gray-600 dark:text-gray-300 md:col-span-2">
                            <p><span className="font-semibold">Tempo:</span> O(mn) - Stessa complessità della soluzione DP standard</p>
                            <p><span className="font-semibold">Spazio:</span> O(m+n) - Miglioramento drastico per sequenze lunghe</p>
                            <p className="mt-3">
                                <span className="font-semibold">Tecnica:</span> Combina programmazione dinamica e divide-et-impera
                            </p>
                            <ol className="list-decimal pl-6 mt-2 space-y-1">
                                <li>Calcolo forward/backward per trovare il punto di divisione ottimale</li>
                                <li>Divisione ricorsiva del problema in sottoproblemi più piccoli</li>
                                <li>Usa solo spazio lineare in ogni passo</li>
                            </ol>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="relative w-32 h-32">
                                <div className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg border-2 border-indigo-300 dark:border-indigo-700 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 dark:text-indigo-400">
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                    </svg>
                                </div>
                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 dark:bg-green-600 rounded-full text-white flex items-center justify-center text-xs font-bold">
                                    ✓
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg shadow mt-auto text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <h3 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                        Grazie per l'attenzione!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        Domande?
                    </p>
                </motion.div>
            </div>
        </Slide>
    );
};

export default SlideSummary; 