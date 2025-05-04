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
                        <h3 className="text-3xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
                            Allineamento nei Firewall
                        </h3>

                        <div className="space-y-3 text-gray-700 dark:text-gray-200">
                            <div className="border-l-4 border-purple-300 dark:border-purple-700 pl-3 py-1 text-2xl">
                                <strong>Ispezione Stateful:</strong> I firewall di nuova generazione utilizzano l'allineamento per tracciare lo stato delle connessioni e identificare sequenze di traffico anomale.
                            </div>

                            <div className="border-l-4 border-purple-400 dark:border-purple-600 pl-3 py-1 text-2xl">
                                <strong>Filtri di Payload:</strong> Tecniche di allineamento consentono ai firewall di analizzare il contenuto dei pacchetti per bloccare traffico malevolo indipendentemente dal formato.
                            </div>

                            <div className="border-l-4 border-purple-500 dark:border-purple-500 pl-3 py-1 text-2xl">
                                <strong>Tecnologia WAF:</strong> I Web Application Firewall usano algoritmi di allineamento per identificare e bloccare attacchi web come XSS e SQL Injection.
                            </div>

                            <div className="border-l-4 border-purple-600 dark:border-purple-400 pl-3 py-1 text-2xl">
                                <strong>Firewall di Prossima Generazione:</strong> Uniscono allineamento di sequenze con machine learning per identificare pattern di traffico malevolo emergenti.
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex flex-col"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow">
                            <h3 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
                                Pattern Matching e Ricostruzione
                            </h3>

                            <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded overflow-hidden">

                                <div className="text-center text-2xl font-semibold mb-2">
                                    Allineamento in Azione
                                </div>

                                <div className="bg-purple-200 dark:bg-purple-800 p-3 rounded-b min-h-[150px]">
                                    <div className="text-gray-800 dark:text-gray-200 space-y-2">
                                        <div className="text-xl">
                                            <strong>Rilevamento di malware polimorfico:</strong>
                                        </div>
                                        <div className="font-mono text-sm bg-white dark:bg-gray-900 p-2 rounded overflow-x-auto">
                                            <div className="mb-1 font-semibold text-green-600 dark:text-green-400">// Firma di malware nota (Emotet)</div>
                                            <div className="mb-3">{`PE32 executable -> Imports: RegOpenKeyExA, CreateServiceA, StartServiceA`} <span className="text-red-500">{`-> Sezione .text: 48 8B 40 08 48 C1 E8 0F A8 01 75 05`}</span></div>
                                            <div className="mb-1 font-semibold text-green-600 dark:text-green-400">// Variante polimorfica rilevata</div>
                                            <div className="mb-3">{`PE32 executable -> Imports: RegOpenKeyExW, CreateServiceW, StartServiceW`} <span className="text-red-500">{`-> Sezione .text: 48 8B 04 DE 48 C1 EB 0F A8 01 0F 85 FB 00`}</span></div>
                                            <div className="mb-1 font-semibold text-green-600 dark:text-green-400">// Allineamento delle sequenze</div>
                                            <div className="mb-1">{`RegOpenKeyExA <-> RegOpenKeyExW (distanza = 1)`}</div>
                                            <div className="mb-1">{`48 8B 40 08 48 C1 E8 0F A8 01 75`}</div>
                                            <div>{`48 8B 04 DE 48 C1 EB 0F A8 01 0F 85`} <span className="text-purple-600 dark:text-purple-400">(similarità = 72%)</span></div>
                                        </div>
                                        <div className="text-sm italic">
                                            Gli algoritmi di allineamento calcolano distanze di edit tra firme note e codice sospetto, rilevando varianti anche quando il malware usa tecniche di offuscamento come sostituzione di istruzioni e librerie.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative mt-16">
                                <div className="flex justify-center mb-2">
                                    <div className="text-center w-full">
                                        <svg width="240" height="120" viewBox="0 0 280 140" className="mx-auto text-purple-600 dark:text-purple-400">
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
                                <div className="text-gray-700 dark:text-gray-200 text-center mt-6">
                                    <div className="text-xl"><strong>Sicurezza avanzata:</strong> Gli algoritmi di allineamento permettono di identificare attacchi evasivi e malware polimorfici che tentano di aggirare sistemi di rilevamento tradizionali.</div>
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