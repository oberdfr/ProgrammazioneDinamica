import React, { useState } from 'react';
import Slide from '../layout/Slide';
import { motion } from 'framer-motion';

interface SlideExampleProps {
    id: string;
    active: boolean;
}

const SlideExample = ({ id, active }: SlideExampleProps) => {
    const [showTraceback, setShowTraceback] = useState(false);

    return (
        <Slide
            id={id}
            title="Esempio e Traceback"
            subtitle="Ricostruzione dell'allineamento ottimale"
            active={active}
            backgroundColor="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-indigo-900"
        >
            <div className="flex flex-col h-full">
                <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <p className="text-lg text-gray-700 dark:text-gray-200 mb-2">
                        <strong>Esempio:</strong> Allineamento delle stringhe "PALETTE" e "PALATE"
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Supponiamo che il costo del gap (δ) sia 1 e il costo di mismatch (α) sia 1, mentre il match ha costo 0.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
                    <motion.div
                        className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4 text-center">
                            Tabella DP completa:
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="border-collapse mx-auto">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 dark:border-gray-600 w-10 h-10 bg-gray-100 dark:bg-slate-800"></th>
                                        <th className="border border-gray-300 dark:border-gray-600 w-10 h-10 bg-gray-100 dark:bg-slate-800 text-center">-</th>
                                        <th className="border border-gray-300 dark:border-gray-600 w-10 h-10 bg-gray-100 dark:bg-slate-800 text-center">P</th>
                                        <th className="border border-gray-300 dark:border-gray-600 w-10 h-10 bg-gray-100 dark:bg-slate-800 text-center">A</th>
                                        <th className="border border-gray-300 dark:border-gray-600 w-10 h-10 bg-gray-100 dark:bg-slate-800 text-center">L</th>
                                        <th className="border border-gray-300 dark:border-gray-600 w-10 h-10 bg-gray-100 dark:bg-slate-800 text-center">A</th>
                                        <th className="border border-gray-300 dark:border-gray-600 w-10 h-10 bg-gray-100 dark:bg-slate-800 text-center">T</th>
                                        <th className="border border-gray-300 dark:border-gray-600 w-10 h-10 bg-gray-100 dark:bg-slate-800 text-center">E</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 bg-gray-100 dark:bg-slate-800 text-center">-</td>
                                        <td className={`border border-gray-300 dark:border-gray-600 w-10 h-10 text-center ${showTraceback ? 'bg-green-100 dark:bg-green-900/30' : ''}`}>0</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">1</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">2</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">3</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">4</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">5</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">6</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 bg-gray-100 dark:bg-slate-800 text-center">P</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">1</td>
                                        <td className={`border border-gray-300 dark:border-gray-600 w-10 h-10 text-center ${showTraceback ? 'bg-green-100 dark:bg-green-900/30' : ''}`}>0</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">1</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">2</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">3</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">4</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">5</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 bg-gray-100 dark:bg-slate-800 text-center">A</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">2</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">1</td>
                                        <td className={`border border-gray-300 dark:border-gray-600 w-10 h-10 text-center ${showTraceback ? 'bg-green-100 dark:bg-green-900/30' : ''}`}>0</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">1</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">2</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">3</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">4</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 bg-gray-100 dark:bg-slate-800 text-center">L</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">3</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">2</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">1</td>
                                        <td className={`border border-gray-300 dark:border-gray-600 w-10 h-10 text-center ${showTraceback ? 'bg-green-100 dark:bg-green-900/30' : ''}`}>0</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">1</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">2</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">3</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 bg-gray-100 dark:bg-slate-800 text-center">E</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">4</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">3</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">2</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">1</td>
                                        <td className={`border border-gray-300 dark:border-gray-600 w-10 h-10 text-center ${showTraceback ? 'bg-green-100 dark:bg-green-900/30' : ''}`}>1</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">2</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">2</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 bg-gray-100 dark:bg-slate-800 text-center">T</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">5</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">4</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">3</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">2</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">2</td>
                                        <td className={`border border-gray-300 dark:border-gray-600 w-10 h-10 text-center ${showTraceback ? 'bg-green-100 dark:bg-green-900/30' : ''}`}>1</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">2</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 bg-gray-100 dark:bg-slate-800 text-center">T</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">6</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">5</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">4</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">3</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">3</td>
                                        <td className={`border border-gray-300 dark:border-gray-600 w-10 h-10 text-center ${showTraceback ? 'bg-green-100 dark:bg-green-900/30' : ''}`}>2</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">2</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 bg-gray-100 dark:bg-slate-800 text-center">E</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">7</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">6</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">5</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">4</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">4</td>
                                        <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 text-center">3</td>
                                        <td className={`border border-gray-300 dark:border-gray-600 w-10 h-10 text-center ${showTraceback ? 'bg-blue-100 dark:bg-blue-900/30 font-bold' : ''}`}>2</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-3 text-center text-gray-600 dark:text-gray-300 text-sm">
                            Valore ottimo: <span className="font-bold">1</span> (elemento M[7,7] in basso a destra)
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex flex-col space-y-6"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow flex-1">
                            <h3 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
                                Trovare l'Allineamento (Traceback):
                            </h3>
                            <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-200">
                                <li>Parti da M[m, n] (l'elemento in basso a destra).</li>
                                <li>Risali seguendo le scelte che hanno portato al valore minimo in ogni cella:
                                    <ul className="list-disc pl-6 mt-2 space-y-1">
                                        <li><span className="font-semibold">Diagonale:</span> x<sub>i</sub> allineato con y<sub>j</sub></li>
                                        <li><span className="font-semibold">Su:</span> x<sub>i</sub> allineato con gap</li>
                                        <li><span className="font-semibold">Sinistra:</span> y<sub>j</sub> allineato con gap</li>
                                    </ul>
                                </li>
                                <li>Questo percorso inverso ricostruisce l'allineamento ottimo.</li>
                            </ol>
                        </div>

                        <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow flex flex-col items-center">
                            <button
                                onClick={() => setShowTraceback(!showTraceback)}
                                className="px-4 py-2 bg-indigo-500 text-white rounded-full mb-4 hover:bg-indigo-600 transition-colors"
                            >
                                {showTraceback ? "Nascondi Traceback" : "Mostra Traceback"}
                            </button>

                            {showTraceback && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="w-full"
                                >
                                    <h4 className="text-center font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                                        Allineamento Ottimo:
                                    </h4>
                                    <div className="flex justify-center space-y-1 flex-col items-center">
                                        <div className="font-mono text-lg tracking-wide text-gray-700 dark:text-gray-200">P A L E T T E</div>
                                        <div className="font-mono text-lg text-gray-700 dark:text-gray-200">│ │ │ │ │ │ │</div>
                                        <div className="font-mono text-lg tracking-wide text-gray-700 dark:text-gray-200">P A L A T - E</div>
                                    </div>
                                    <p className="mt-3 text-center text-gray-600 dark:text-gray-300">
                                        Costo: 1 (Un gap per la lettera mancante)
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </Slide>
    );
};

export default SlideExample; 