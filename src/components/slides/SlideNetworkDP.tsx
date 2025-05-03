import React, { useState } from 'react';
import Slide from '../layout/Slide';
import { motion } from 'framer-motion';

interface SlideNetworkDPProps {
    id: string;
    active: boolean;
}

const SlideNetworkDP = ({ id, active }: SlideNetworkDPProps) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Slide
            id={id}
            title="Allineamento di Sequenze nelle Reti"
            subtitle="Applicazioni pratiche nei sistemi informatici moderni"
            active={active}
            backgroundColor="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-slate-800 dark:to-purple-900"
        >
            <div className="flex flex-col">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <motion.div
                        className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
                            Applicazioni nei Sistemi di Rete
                        </h3>

                        <div className="space-y-3 text-gray-700 dark:text-gray-200">
                            <div className="border-l-4 border-purple-300 dark:border-purple-700 pl-3 py-1 text-2xl">
                                <strong>Deep Packet Inspection:</strong> Gli algoritmi di allineamento identificano pattern nei pacchetti di rete, permettendo rilevamento di traffico malevolo.
                            </div>

                            <div className="border-l-4 border-purple-400 dark:border-purple-600 pl-3 py-1 text-2xl">
                                <strong>Ricostruzione Pacchetti:</strong> L'allineamento di frammenti TCP permette ricostruzione efficiente di sessioni di rete frammentate.
                            </div>

                            <div className="border-l-4 border-purple-500 dark:border-purple-500 pl-3 py-1 text-2xl">
                                <strong>Protocolli di Correzione Errori:</strong> I metodi di allineamento nei protocolli FEC (Forward Error Correction) ricostruiscono dati danneggiati.
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
                            <h3 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
                                Pattern Matching e Ricostruzione
                            </h3>

                            <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded overflow-hidden">
                                <div className="font-mono text-base mb-3">
                                    <div className="text-2xl mb-2 text-center">Esempi di allineamento dati:</div>

                                    <div className="grid grid-cols-2 gap-3 text-xl">
                                        <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded">
                                            <div className="font-bold mb-2 text-purple-700 dark:text-purple-300">Log di sistema</div>
                                            <div>
                                                <span className="bg-red-100 dark:bg-red-900/30 px-1">INFO</span>
                                                <span className="bg-green-100 dark:bg-green-900/30 px-1">Error</span>
                                                <span className="bg-blue-100 dark:bg-blue-900/30 px-1">Warn</span>
                                                <span className="bg-yellow-100 dark:bg-yellow-900/30 px-1">Debug</span>
                                                <span className="opacity-50">...</span>
                                            </div>
                                        </div>

                                        <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded">
                                            <div className="font-bold mb-2 text-purple-700 dark:text-purple-300">Pacchetti di rete</div>
                                            <div>
                                                <span className="bg-red-100 dark:bg-red-900/30 px-1">0x45</span>
                                                <span className="bg-green-100 dark:bg-green-900/30 px-1">0x00</span>
                                                <span className="bg-blue-100 dark:bg-blue-900/30 px-1">0x80</span>
                                                <span className="bg-yellow-100 dark:bg-yellow-900/30 px-1">0x24</span>
                                                <span className="opacity-50">...</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center text-2xl font-semibold mb-2">
                                    Allineamento in Azione
                                </div>

                                <div className="flex space-x-0">
                                    <div
                                        className={`flex-1 py-2 px-3 text-center cursor-pointer text-xl ${activeTab === 0 ? 'bg-purple-200 dark:bg-purple-800 rounded-t font-medium' : 'bg-gray-100 dark:bg-gray-700'}`}
                                        onClick={() => setActiveTab(0)}
                                    >
                                        Pacchetti TCP
                                    </div>
                                    <div
                                        className={`flex-1 py-2 px-3 text-center cursor-pointer text-xl ${activeTab === 1 ? 'bg-purple-200 dark:bg-purple-800 rounded-t font-medium' : 'bg-gray-100 dark:bg-gray-700'}`}
                                        onClick={() => setActiveTab(1)}
                                    >
                                        Allineamento
                                    </div>
                                </div>

                                <div className="bg-purple-200 dark:bg-purple-800 p-3 rounded-b min-h-[150px]">
                                    {activeTab === 0 ? (
                                        <div className="text-gray-800 dark:text-gray-200 space-y-2">
                                            <div className="text-xl">
                                                <strong>Frammenti di pacchetti IP:</strong>
                                            </div>
                                            <div className="font-mono text-sm bg-white dark:bg-gray-900 p-2 rounded">
                                                <div className="mb-1">Frammento #1: <span className="text-blue-600 dark:text-blue-400">45 00 00 3c 1c 4d 40 00 40 06 5c 3c c0 a8</span></div>
                                                <div className="mb-1">Frammento #2: <span className="text-blue-600 dark:text-blue-400">45 00 00 3c 1c 4d 40 00 40 06 5c 3c c0 a8 01 02</span></div>
                                                <div>Frammento #3: <span className="text-blue-600 dark:text-blue-400">00 3c 1c 4d 40 00 40 06 5c 3c c0 a8 01 02 ac 10</span></div>
                                            </div>
                                            <div className="text-sm italic">
                                                La ricostruzione dei pacchetti IP richiede l'identificazione e allineamento di sovrapposizioni
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-gray-800 dark:text-gray-200 space-y-2">
                                            <div className="text-xl">
                                                <strong>Algoritmo di allineamento applicato:</strong>
                                            </div>
                                            <div className="font-mono text-sm bg-white dark:bg-gray-900 p-2 rounded overflow-x-auto">
                                                <div className="mb-1">Allineamento ottimale:</div>
                                                <div className="mb-1">Frammento #1: <span className="text-blue-600 dark:text-blue-400">45 00 00 3c 1c 4d 40 00 40 06 5c 3c c0 a8</span><span className="text-gray-400 dark:text-gray-500">-- --</span></div>
                                                <div className="mb-1">Frammento #2: <span className="text-blue-600 dark:text-blue-400">45 00 00 3c 1c 4d 40 00 40 06 5c 3c c0 a8 01 02</span></div>
                                                <div>Frammento #3: <span className="text-gray-400 dark:text-gray-500">-- -- --</span><span className="text-blue-600 dark:text-blue-400">00 3c 1c 4d 40 00 40 06 5c 3c c0 a8 01 02</span><span className="text-red-500"> ac 10</span></div>
                                            </div>
                                            <div className="text-sm italic">
                                                Risultato ricostruito: <span className="font-mono">45 00 00 3c 1c 4d 40 00 40 06 5c 3c c0 a8 01 02 ac 10</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow">
                            <h3 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
                                Applicazioni in Sicurezza Informatica
                            </h3>
                            <div className="relative">
                                <div className="flex justify-center mb-4">
                                    <div className="text-center w-full">
                                        <svg width="280" height="140" viewBox="0 0 280 140" className="mx-auto text-purple-600 dark:text-purple-400">
                                            {/* Firewall */}
                                            <circle cx="80" cy="40" r="30" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
                                            <text x="80" y="44" fontSize="12" textAnchor="middle" fill="currentColor">Firewall</text>

                                            {/* IDS/IPS */}
                                            <circle cx="200" cy="40" r="30" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
                                            <text x="200" y="44" fontSize="12" textAnchor="middle" fill="currentColor">IDS/IPS</text>

                                            {/* Bottom Circle */}
                                            <circle cx="140" cy="100" r="30" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
                                            <text x="140" y="96" fontSize="12" textAnchor="middle" fill="currentColor">Algoritmi di</text>
                                            <text x="140" y="110" fontSize="12" textAnchor="middle" fill="currentColor">Allineamento</text>

                                            {/* Connecting Lines */}
                                            <line x1="98" y1="62" x2="126" y2="82" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4,2" />
                                            <line x1="182" y1="62" x2="154" y2="82" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4,2" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-gray-700 dark:text-gray-200 text-center">
                                    <div className="text-2xl"><strong>Sicurezza avanzata:</strong> Gli algoritmi di allineamento permettono di identificare attacchi evasivi e malware polimorfici che tentano di aggirare sistemi di rilevamento tradizionali.</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Slide>
    );
};

export default SlideNetworkDP; 