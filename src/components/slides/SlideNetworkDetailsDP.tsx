import React, { useState } from 'react';
import Slide from '../layout/Slide';
import { motion } from 'framer-motion';

interface SlideNetworkDetailsDPProps {
    id: string;
    active: boolean;
}

const SlideNetworkDetailsDP = ({ id, active }: SlideNetworkDetailsDPProps) => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { title: "Deep Packet", key: 0 },
        { title: "Ricostruzione", key: 1 },
        { title: "Correzione Err.", key: 2 },
    ];

    return (
        <Slide
            id={id}
            title="Tecniche di Allineamento nelle Reti"
            subtitle="Dettagli applicativi e casi di studio"
            active={active}
            backgroundColor="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-slate-800 dark:to-purple-900"
        >
            <div className="flex flex-col h-full">
                <div className="flex justify-center mb-4">
                    <div className="inline-flex bg-white dark:bg-slate-700 rounded-lg shadow-md overflow-hidden">
                        {tabs.map(tab => (
                            <button
                                key={tab.key}
                                className={`px-5 py-2 text-lg font-medium ${activeTab === tab.key
                                    ? 'bg-indigo-500 dark:bg-indigo-600 text-white'
                                    : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-600'
                                    }`}
                                onClick={() => setActiveTab(tab.key)}
                            >
                                {tab.title}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-700 rounded-lg shadow-lg p-6 flex-grow overflow-auto">
                    {/* DPI Tab */}
                    {activeTab === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="h-full"
                        >
                            <h3 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
                                Deep Packet Inspection (DPI)
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="text-2xl text-gray-700 dark:text-gray-200">
                                        <p className="mb-2">Gli algoritmi di allineamento permettono l'ispezione del payload di rete per identificare pattern specifici:</p>
                                        <ul className="list-disc pl-6 space-y-2 text-xl">
                                            <li>Identificazione di firme di malware anche con piccole variazioni</li>
                                            <li>Rilevazione di pattern di attacco nei pacchetti HTTP/HTTPS</li>
                                            <li>Monitoraggio di traffico di rete sospetto</li>
                                        </ul>
                                    </div>

                                    <div className="text-2xl text-gray-700 dark:text-gray-200 mt-4">
                                        <p className="text-indigo-600 dark:text-indigo-400 font-semibold">Esempio pratico:</p>
                                        <p>Rilevamento di un attacco SQL Injection in una richiesta HTTP nonostante tentativi di evasione.</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
                                    <div className="text-lg font-semibold mb-2 text-center">Allineamento pattern di attacco</div>
                                    <div className="font-mono text-sm overflow-x-auto bg-white dark:bg-gray-900 p-3 rounded-lg">
                                        <div className="mb-1"><span className="text-purple-600 dark:text-purple-400">/* Pattern malware conosciuto */</span></div>
                                        <div className="mb-3">SELECT * FROM users WHERE id = <span className="text-red-500">'1' OR '1'='1'</span></div>

                                        <div className="mb-1"><span className="text-purple-600 dark:text-purple-400">/* Variante evasiva in traffico */</span></div>
                                        <div className="mb-3">SELECT * FROM users WHERE id = <span className="text-red-500">'1'/**/OR/**/1=1</span></div>

                                        <div className="mb-1"><span className="text-purple-600 dark:text-purple-400">/* Allineamento delle sequenze */</span></div>
                                        <div>1' OR '1'='1 <span className="text-green-500">→ 99% match con</span> 1'/**/OR/**/1=1</div>
                                    </div>

                                    <div className="mt-4 text-center text-gray-600 dark:text-gray-400 text-sm italic">
                                        I sistemi DPI utilizzano algoritmi come Aho-Corasick modificati con tecniche di allineamento per identificare anche varianti di pattern noti.
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Ricostruzione Tab */}
                    {activeTab === 1 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="h-full"
                        >
                            <h3 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
                                Ricostruzione Pacchetti
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="text-2xl text-gray-700 dark:text-gray-200">
                                        <p className="mb-2">Gli algoritmi di allineamento consentono di:</p>
                                        <ul className="list-disc pl-6 space-y-2 text-xl">
                                            <li>Ricostruire flussi TCP/IP da pacchetti frammentati</li>
                                            <li>Identificare comunicazioni malevole anche se suddivise tra più pacchetti</li>
                                            <li>Rilevare tecniche di evasione come la frammentazione intenzionale</li>
                                        </ul>
                                    </div>

                                    <div className="text-2xl text-gray-700 dark:text-gray-200 mt-4">
                                        <p className="text-indigo-600 dark:text-indigo-400 font-semibold">Caso d'uso reale:</p>
                                        <p>Rilevamento di attacco frammentato che tenta di aggirare i normali sistemi IDS/IPS dividendo un payload malevolo in multipli pacchetti.</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
                                    <div className="text-lg font-semibold mb-2 text-center">Evasione tramite frammentazione TCP/IP</div>
                                    <div className="font-mono text-sm bg-white dark:bg-gray-900 p-3 rounded-lg">
                                        <div className="mb-2 text-green-600 dark:text-green-400">/* Attack payload if sent in a single packet */</div>
                                        <div className="mb-4"><span className="text-red-600 dark:text-red-400">GET /login.php HTTP/1.1\r\nHost: example.com\r\nUser-Agent: Mozilla/5.0\r\n\r\nusername=admin'--&password=anything</span></div>

                                        <div className="mb-2 text-green-600 dark:text-green-400">/* Attacco frammentato in pacchetti distinti */</div>
                                        <div className="mb-1">Pacchetto #1: <span className="text-blue-600 dark:text-blue-400">GET /login.php HTTP/1.1\r\n</span></div>
                                        <div className="mb-1">Pacchetto #2: <span className="text-blue-600 dark:text-blue-400">Host: example.com\r\n</span></div>
                                        <div className="mb-1">Pacchetto #3: <span className="text-blue-600 dark:text-blue-400">User-Agent: Mozilla/5.0\r\n\r\n</span></div>
                                        <div className="mb-4">Pacchetto #4: <span className="text-red-600 dark:text-red-400">username=admin'--&password=anything</span></div>

                                        <div className="mb-2 text-green-600 dark:text-green-400">/* Ricostruzione con algoritmi di allineamento */</div>
                                        <div>Signature: <span className="text-red-600 dark:text-red-400">username=admin'--</span> <span className="text-purple-600 dark:text-purple-400">(SQL Injection)</span></div>
                                        <div>Similarity Score: <span className="text-green-600 dark:text-green-400">100% match</span> dopo ricostruzione del flusso TCP</div>
                                    </div>

                                    <div className="mt-4 text-center text-gray-600 dark:text-gray-400 text-sm italic">
                                        I moderni firewall applicano algoritmi di allineamento per ricostruire sessioni HTTP/TCP/IP complete nonostante tentativi di evasione tramite frammentazione. Snort e Suricata utilizzano algoritmi di stream reassembly basati su principi di allineamento ottimale.
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* FEC Tab */}
                    {activeTab === 2 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="h-full"
                        >
                            <h3 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
                                Protocolli di Correzione Errori (FEC)
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="text-2xl text-gray-700 dark:text-gray-200">
                                        <p className="mb-2">I protocolli FEC utilizzano allineamento per:</p>
                                        <ul className="list-disc pl-6 space-y-2 text-xl">
                                            <li>Ricostruire dati danneggiati durante la trasmissione</li>
                                            <li>Garantire l'integrità del segnale in condizioni di rete instabili</li>
                                            <li>Recuperare informazioni da pacchetti corrotti senza ritrasmissione</li>
                                        </ul>
                                    </div>

                                    <div className="text-2xl text-gray-700 dark:text-gray-200 mt-4">
                                        <p className="text-indigo-600 dark:text-indigo-400 font-semibold">Applicazione:</p>
                                        <p>Streaming video in tempo reale su reti instabili o comunicazioni satellitari con alta latenza.</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
                                    <div className="text-lg font-semibold mb-2 text-center">Reed-Solomon con allineamento</div>
                                    <div className="p-3 rounded-lg">
                                        <div className="mb-4">
                                            <div className="text-center mb-2 font-semibold">Pacchetto originale</div>
                                            <div className="grid grid-cols-8 gap-1">
                                                {Array(8).fill(0).map((_, i) => (
                                                    <div key={i} className="h-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded">
                                                        D{i + 1}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <div className="text-center mb-2 font-semibold">Pacchetto con FEC</div>
                                            <div className="grid grid-cols-12 gap-1">
                                                {Array(8).fill(0).map((_, i) => (
                                                    <div key={i} className="h-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded">
                                                        D{i + 1}
                                                    </div>
                                                ))}
                                                {Array(4).fill(0).map((_, i) => (
                                                    <div key={i} className="h-8 flex items-center justify-center bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs rounded">
                                                        P{i + 1}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-center mb-2 font-semibold">Ricostruzione dati danneggiati</div>
                                            <div className="grid grid-cols-12 gap-1">
                                                {Array(8).fill(0).map((_, i) => (
                                                    <div key={i} className={`h-8 flex items-center justify-center ${i === 1 || i === 4 ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'} text-xs rounded`}>
                                                        {i === 1 || i === 4 ? 'X' : `D${i + 1}`}
                                                    </div>
                                                ))}
                                                {Array(4).fill(0).map((_, i) => (
                                                    <div key={i} className="h-8 flex items-center justify-center bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs rounded">
                                                        P{i + 1}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 text-center text-gray-600 dark:text-gray-400 text-sm italic">
                                        Gli algoritmi FEC utilizzano tecniche di allineamento per determinare la posizione dei dati danneggiati e ricostruirli dai blocchi di parità.
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

export default SlideNetworkDetailsDP; 