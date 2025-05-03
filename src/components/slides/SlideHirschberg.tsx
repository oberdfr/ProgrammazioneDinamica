import React, { useState } from 'react';
import Slide from '../layout/Slide';
import { motion } from 'framer-motion';

interface SlideHirschbergProps {
    id: string;
    active: boolean;
}

const SlideHirschberg = ({ id, active }: SlideHirschbergProps) => {
    const [activeTab, setActiveTab] = useState<'idea1' | 'idea2'>('idea1');

    return (
        <Slide
            id={id}
            title="Ottimizzazione Spazio: Algoritmo di Hirschberg"
            subtitle="Ridurre lo spazio senza sacrificare il tempo"
            active={active}
            backgroundColor="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-indigo-900"
        >
            <div className="flex flex-col h-full">
                <motion.div
                    className="mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="text-base text-gray-700 dark:text-gray-200 mb-2">
                        <strong>Domanda:</strong> Possiamo ridurre lo spazio preservando la qualità della soluzione?
                    </div>
                </motion.div>

                <div className="flex border-b border-gray-200 dark:border-gray-700">
                    <button
                        className={`py-1 px-3 font-medium text-sm focus:outline-none ${activeTab === 'idea1'
                            ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                            }`}
                        onClick={() => setActiveTab('idea1')}
                    >
                        Idea 1: Spazio Lineare per Distanza
                    </button>
                    <button
                        className={`py-1 px-3 font-medium text-sm focus:outline-none ${activeTab === 'idea2'
                            ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                            }`}
                        onClick={() => setActiveTab('idea2')}
                    >
                        Idea 2: Algoritmo di Hirschberg
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {activeTab === 'idea1' && (
                        <motion.div
                            className="mt-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-lg mb-3">
                                <h3 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                                    Idea 1: Spazio Lineare per Distanza
                                </h3>
                                <p className="text-sm text-gray-700 dark:text-gray-200 mb-2">
                                    Per calcolare <strong>solo</strong> la distanza OPT(m, n), possiamo memorizzare solo le ultime due righe della tabella DP.
                                </p>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                    <div>
                                        <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-1 text-2xl">
                                            Osservazione:
                                        </h4>
                                        <span className="text-gray-600 dark:text-gray-300 text-2xl">
                                            Per calcolare OPT(i, j) servono solo i valori:
                                        </span>
                                        <div className="list-disc pl-5 mt-1 space-y-0 text-2xl text-gray-600 dark:text-gray-300">
                                            - OPT(i-1, j-1)<br />
                                            - OPT(i-1, j)<br />
                                            - OPT(i, j-1)<br />
                                        </div>
                                        <div className="mt-4 text-gray-600 dark:text-gray-300 text-2xl">
                                            Quindi possiamo memorizzare solo:
                                        </div>
                                        <div className="list-disc pl-5 mt-1 space-y-0 text-2xl text-gray-600 dark:text-gray-300">
                                            - La riga corrente<br />
                                            - La riga precedente<br />
                                        </div>
                                        <div className="mt-6 p-1 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r-md">
                                            <div className="text-3xl text-gray-700 dark:text-gray-200 m-4">
                                                Spazio: O(min(m, n))
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg h-full flex flex-col justify-center">
                                            <div className="flex justify-center mb-2">
                                                <svg width="180" height="180" viewBox="0 0 200 200">
                                                    <g fill="none" stroke="currentColor">
                                                        <rect x="20" y="20" width="160" height="160" strokeWidth="1" className="text-gray-300 dark:text-gray-600" />

                                                        {/* Griglia */}
                                                        {Array.from({ length: 7 }).map((_, i) => (
                                                            <line
                                                                key={`vl-${i}`}
                                                                x1={20 + (i + 1) * 20}
                                                                y1="20"
                                                                x2={20 + (i + 1) * 20}
                                                                y2="180"
                                                                strokeWidth="1"
                                                                className="text-gray-300 dark:text-gray-600"
                                                            />
                                                        ))}
                                                        {Array.from({ length: 7 }).map((_, i) => (
                                                            <line
                                                                key={`hl-${i}`}
                                                                x1="20"
                                                                y1={20 + (i + 1) * 20}
                                                                x2="180"
                                                                y2={20 + (i + 1) * 20}
                                                                strokeWidth="1"
                                                                className="text-gray-300 dark:text-gray-600"
                                                            />
                                                        ))}

                                                        {/* Righe evidenziate */}
                                                        <rect x="20" y="100" width="160" height="20" fill="rgba(79, 70, 229, 0.2)" />
                                                        <rect x="20" y="120" width="160" height="20" fill="rgba(79, 70, 229, 0.3)" />
                                                    </g>
                                                    <text x="190" y="110" className="text-xs fill-current text-gray-700 dark:text-gray-300">i-1</text>
                                                    <text x="190" y="130" className="text-xs fill-current text-gray-700 dark:text-gray-300">i</text>
                                                </svg>
                                            </div>
                                            <p className="text-center text-gray-600 dark:text-gray-300 text-xs">
                                                Memorizzando solo due righe alla volta, possiamo calcolare l'intera tabella
                                            </p>
                                            <p className="mt-2 text-center text-red-500 dark:text-red-400 font-semibold text-xs">
                                                Problema: Perdiamo l'informazione per il traceback!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'idea2' && (
                        <motion.div
                            className="mt-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="bg-white dark:bg-slate-700 p-3 rounded-lg shadow-lg mb-3">
                                <h3 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                                    Idea 2: Algoritmo di Hirschberg
                                </h3>
                                <div className="text-2xl text-gray-700 dark:text-gray-200 mb-6">
                                    Combinare DP e Divide and Conquer per ottenere l'allineamento in spazio lineare.
                                </div>

                                <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-2xl mb-3">
                                    <div className="bg-indigo-50 dark:bg-indigo-900 p-2 rounded-2xl mb-3 w-1/4 m-auto">
                                        <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2 text-xl text-center">
                                            Teorema (Hirschberg, 1975):
                                        </h4>
                                    </div>
                                    <div className="text-center text-gray-700 dark:text-gray-200 text-2xl mb-4 mt-6">
                                        Esiste un algoritmo che trova l'allineamento ottimo in:
                                    </div>
                                    <div className="flex justify-center space-x-8 mt-2">
                                        <div className="text-center bg-indigo-50 dark:bg-indigo-900 p-4 rounded-2xl">
                                            <span className="font-bold text-indigo-600 dark:text-indigo-400 text-2xl">Tempo
                                                <span className="text-gray-700 dark:text-gray-200">O(mn)</span>
                                            </span>
                                        </div>
                                        <div className="text-center bg-indigo-50 dark:bg-indigo-900 p-4 rounded-2xl">
                                            <span className="font-bold text-indigo-600 dark:text-indigo-400 text-2xl">Spazio
                                                <span className="text-gray-700 dark:text-gray-200">O(m+n)</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-1 text-2xl mt-4">
                                            Intuizione:
                                        </h4>
                                        <div className="list-disc pl-5 space-y-1 text-2xl text-gray-600 dark:text-gray-300">
                                            - Usa <strong>divide-et-impera</strong> per scomporre il problema<br />
                                            - Calcola le <strong>direzioni ottimali</strong> senza memorizzare l'intera tabella<br />
                                            - Esegue <strong>passate forward/backward</strong> per trovare punto ottimale di divisione<br />
                                            - Risolve ricorsivamente i sottoproblemi<br />
                                        </div>
                                        <div className="mt-8 p-1 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r-md">
                                            <div className="text-3xl text-gray-700 dark:text-gray-200 m-4">
                                                Il trucco è combinare riduzione dello spazio con divide-et-impera
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <div className="relative">
                                            <svg width="180" height="180" viewBox="0 0 200 200">
                                                <g fill="none" stroke="currentColor">
                                                    {/* Griglia di base */}
                                                    <rect x="20" y="20" width="160" height="160" strokeWidth="1" className="text-gray-300 dark:text-gray-600" />

                                                    {/* Punto di divisione */}
                                                    <circle cx="100" cy="100" r="6" fill="rgba(79, 70, 229, 0.8)" />

                                                    {/* Linee di divisione */}
                                                    <line x1="20" y1="100" x2="180" y2="100" strokeWidth="2" strokeDasharray="4" className="text-indigo-500" />
                                                    <line x1="100" y1="20" x2="100" y2="180" strokeWidth="2" strokeDasharray="4" className="text-indigo-500" />

                                                    {/* Cammino ottimale */}
                                                    <path d="M20,20 L60,80 L100,100 L140,120 L180,180" strokeWidth="3" className="text-green-500" />

                                                    {/* Etichette */}
                                                    <text x="10" y="15" className="text-xs fill-current text-gray-700 dark:text-gray-300">(0,0)</text>
                                                    <text x="180" y="195" className="text-xs fill-current text-gray-700 dark:text-gray-300">(m,n)</text>
                                                </g>
                                            </svg>
                                            <text x="100" y="110" className="text-[10px] fill-current text-gray-700 dark:text-gray-300 absolute top-[110px] left-[65px]">Punto divisione</text>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 p-1 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded text-center">
                                    <div className="text-3xl italic text-gray-700 dark:text-gray-200 m-6">
                                        "Ottimizza memoria mantenendo tempo O(mn) e spazio O(m+n)"
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </Slide>
    );
};

export default SlideHirschberg; 