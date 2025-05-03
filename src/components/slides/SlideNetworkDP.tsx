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
            title="DP e Sistemi di Rete"
            subtitle="Interconnessioni tra algoritmi di allineamento e sistemi informatici"
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
                                <strong>Deep Packet Inspection:</strong> Utilizzo degli algoritmi di allineamento per identificare pattern specifici nei pacchetti di rete, cruciale per i sistemi IDS/IPS.
                            </div>

                            <div className="border-l-4 border-purple-400 dark:border-purple-600 pl-3 py-1 text-2xl">
                                <strong>Network Forensics:</strong> Ricostruzione e analisi del traffico di rete attraverso l'allineamento di frammenti di pacchetti.
                            </div>

                            <div className="border-l-4 border-purple-500 dark:border-purple-500 pl-3 py-1 text-2xl">
                                <strong>Load Balancing:</strong> L'ottimizzazione della distribuzione del carico utilizza algoritmi DP simili per massimizzare l'efficienza dei server.
                            </div>

                            <div className="border-l-4 border-purple-600 dark:border-purple-400 pl-3 py-1 text-2xl">
                                <strong>QoS (Quality of Service):</strong> Algoritmi per l'allocazione ottimale della larghezza di banda basati su principi di programmazione dinamica.
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
                                Deep Packet Inspection: Allineamento in Azione
                            </h3>

                            <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded overflow-hidden">
                                <div className="font-mono text-sm mb-3">
                                    <div className="text-2xl mb-2">Pattern matching su payload TCP/IP:</div>
                                    <div className="grid grid-cols-1 gap-1">
                                        <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded flex">
                                            <span className="font-bold w-24">Pattern:</span>
                                            <span className="flex-1 text-red-600 dark:text-red-400">POST /login.php HTTP/1.1</span>
                                        </div>
                                        <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded flex">
                                            <span className="font-bold w-24">Pacchetto:</span>
                                            <span className="flex-1">...<span className="text-red-600 dark:text-red-400">POST /login.php HTTP/1.1</span> Host: example.com...</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center text-2xl font-semibold mb-2">
                                    Sicurezza basata sull'allineamento
                                </div>

                                <div className="flex space-x-0">
                                    <div
                                        className={`flex-1 py-2 px-3 text-center cursor-pointer text-2xl ${activeTab === 0 ? 'bg-purple-200 dark:bg-purple-800 rounded-t font-medium' : 'bg-gray-100 dark:bg-gray-700'}`}
                                        onClick={() => setActiveTab(0)}
                                    >
                                        Normal
                                    </div>
                                    <div
                                        className={`flex-1 py-2 px-3 text-center cursor-pointer text-2xl ${activeTab === 1 ? 'bg-purple-200 dark:bg-purple-800 rounded-t font-medium' : 'bg-gray-100 dark:bg-gray-700'}`}
                                        onClick={() => setActiveTab(1)}
                                    >
                                        Evasione
                                    </div>
                                </div>

                                <div className="bg-purple-200 dark:bg-purple-800 p-3 rounded-b min-h-[120px]">
                                    {activeTab === 0 ? (
                                        <div className="text-gray-800 dark:text-gray-200 space-y-1">
                                            <div className="text-xl">
                                                <strong>Pacchetto HTTP:</strong>
                                            </div>
                                            <div className="font-mono text-sm bg-white dark:bg-gray-900 p-2 rounded">
                                                POST /login.php HTTP/1.1<br />
                                                Host: example.com<br />
                                                Content-Type: application/x-www-form-urlencoded<br />
                                                <span className="text-red-500">username=admin&password=123456</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-gray-800 dark:text-gray-200 space-y-1">
                                            <div className="text-xl">
                                                <strong>Evasione con frammentazione:</strong>
                                            </div>
                                            <div className="font-mono text-sm bg-white dark:bg-gray-900 p-2 rounded">
                                                P<span className="text-blue-500">[Frammento TCP 1]</span><br />
                                                OST /log<span className="text-blue-500">[Frammento TCP 2]</span><br />
                                                in.php HTTP/1<span className="text-blue-500">[Frammento TCP 3]</span><br />
                                                <span className="text-red-500 opacity-70">username=admin&password=123456</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow">
                            <h3 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
                                Algoritmi DP nei Sistemi Distribuiti
                            </h3>
                            <div className="relative">
                                <div className="flex justify-center mb-2">
                                    <svg width="280" height="140" viewBox="0 0 280 140" className="text-purple-600 dark:text-purple-400">
                                        {/* Server 1 */}
                                        <rect x="20" y="20" width="60" height="30" rx="4" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
                                        <text x="50" y="40" fontSize="12" textAnchor="middle" fill="currentColor">Server 1</text>

                                        {/* Server 2 */}
                                        <rect x="110" y="20" width="60" height="30" rx="4" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
                                        <text x="140" y="40" fontSize="12" textAnchor="middle" fill="currentColor">Server 2</text>

                                        {/* Server 3 */}
                                        <rect x="200" y="20" width="60" height="30" rx="4" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
                                        <text x="230" y="40" fontSize="12" textAnchor="middle" fill="currentColor">Server 3</text>

                                        {/* Load Balancer */}
                                        <rect x="110" y="90" width="60" height="30" rx="4" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
                                        <text x="140" y="110" fontSize="10" textAnchor="middle" fill="currentColor">Load Balancer</text>

                                        {/* Lines */}
                                        <line x1="50" y1="50" x2="125" y2="90" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4,2" />
                                        <line x1="140" y1="50" x2="140" y2="90" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4,2" />
                                        <line x1="230" y1="50" x2="155" y2="90" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4,2" />

                                        {/* Dynamic Programming */}
                                        <path d="M140,75 C130,65 150,65 140,55" stroke="currentColor" strokeWidth="1" fill="none" />
                                        <text x="152" y="70" fontSize="10" textAnchor="start" fill="currentColor">DP</text>
                                    </svg>
                                </div>
                                <div className="text-gray-700 dark:text-gray-200 text-center">
                                    <div className="text-2xl"><strong>Routing ottimale:</strong> La programmazione dinamica consente di calcolare i percorsi ottimali in base al carico di rete e alle latenze.</div>
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