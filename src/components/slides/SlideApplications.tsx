import React, { useState } from 'react';
import Slide from '../layout/Slide';
import { motion } from 'framer-motion';

interface SlideApplicationsProps {
    id: string;
    active: boolean;
}

const SlideApplications = ({ id, active }: SlideApplicationsProps) => {
    const [selectedApp, setSelectedApp] = useState<string | null>(null);

    const applications = [
        {
            id: 'bioinformatics',
            title: 'Bioinformatica',
            description: 'Allineamento di sequenze di DNA e proteine per identificare regioni conservate, mutazioni e relazioni evolutive.',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-indigo-500 dark:text-indigo-400">
                    <path d="M12 2a10 10 0 1 0 10 10H12V2Z" />
                    <path d="M12 2a10 10 0 0 1 10 10h-10V2Z" />
                    <path d="M12 12 2.1 7.1" />
                    <path d="m12 12 9.9-4.9" />
                </svg>
            ),
            example: 'ATCGAATTCGCGTA → ATCGA--TTCGCGTA\nATCGATTTCGCGTA → ATCGATT-CGCGTA--',
        },
        {
            id: 'nlp',
            title: 'Elaborazione del Linguaggio Naturale',
            description: 'Correzione ortografica, riconoscimento di entità e analisi di similarità tra testi.',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-indigo-500 dark:text-indigo-400">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    <line x1="9" y1="10" x2="15" y2="10" />
                    <line x1="12" y1="7" x2="12" y2="13" />
                </svg>
            ),
            example: '"programmazione" → "programazione"\n(Correzione automatica con distanza di edit = 1)',
        },
        {
            id: 'plagiarism',
            title: 'Rilevamento Plagio',
            description: 'Identificazione di similarità sospette tra documenti, codice sorgente o altri contenuti.',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-indigo-500 dark:text-indigo-400">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M9 15v-6" />
                    <path d="M12 12h.01" />
                    <path d="M12 18h.01" />
                </svg>
            ),
            example: 'Confronto di frammenti di codice:\nfor(int i=0; i<n; i++) { sum += arr[i]; }\nfor(int j=0; j<size; j++) { total += array[j]; }',
        },
        {
            id: 'music',
            title: 'Analisi Musicale',
            description: 'Confronto di sequenze melodiche per identificare motivi ricorrenti, variazioni e influenze tra composizioni.',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-indigo-500 dark:text-indigo-400">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                </svg>
            ),
            example: 'Sequenza di note: C-D-E-F-G-A-B\nVariazione: C-D-E-G-A-B\n(Identificazione di pattern melodici simili)',
        },
    ];

    return (
        <Slide
            id={id}
            title="Applicazioni Pratiche"
            subtitle="Dove l'allineamento di sequenze risolve problemi reali"
            active={active}
            backgroundColor="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-indigo-900"
        >
            <div className="flex flex-col h-full">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {applications.map((app) => (
                        <motion.div
                            key={app.id}
                            className={`bg-white dark:bg-slate-700 p-4 rounded-lg shadow-md cursor-pointer transition-all duration-200 ${selectedApp === app.id ? 'ring-2 ring-indigo-500 dark:ring-indigo-400' : ''
                                }`}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setSelectedApp(app.id)}
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-3">{app.icon}</div>
                                <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                                    {app.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {app.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {selectedApp && (
                    <motion.div
                        className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg flex-1"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                    >
                        {applications.map((app) => (
                            app.id === selectedApp && (
                                <div key={`detail-${app.id}`} className="h-full">
                                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
                                        {app.title} in Azione
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                                        <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg">
                                            <h4 className="font-medium text-indigo-700 dark:text-indigo-300 mb-2">Esempio:</h4>
                                            <pre className="font-mono text-sm whitespace-pre-wrap text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-black/20 p-3 rounded">
                                                {app.example}
                                            </pre>
                                        </div>

                                        <div className="flex flex-col justify-between">
                                            <div>
                                                <h4 className="font-medium text-indigo-700 dark:text-indigo-300 mb-2">Vantaggi dell'approccio DP:</h4>
                                                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                                                    <li>Trova l'allineamento ottimale garantito</li>
                                                    <li>Gestisce inserimenti, cancellazioni e sostituzioni</li>
                                                    <li>Personalizzabile con diverse funzioni di costo</li>
                                                    <li>Applicabile a sequenze di qualsiasi natura</li>
                                                </ul>
                                            </div>

                                            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-600 rounded-r-md">
                                                <p className="text-sm text-gray-700 dark:text-gray-200">
                                                    <span className="font-semibold">Nota:</span> Per sequenze molto lunghe, l'algoritmo di Hirschberg è preferibile per l'ottimizzazione dello spazio.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}
                    </motion.div>
                )}

                {!selectedApp && (
                    <motion.div
                        className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg shadow-lg text-center flex-1 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <p className="text-lg text-indigo-600 dark:text-indigo-400">
                            Seleziona un'applicazione per vedere i dettagli
                        </p>
                    </motion.div>
                )}
            </div>
        </Slide>
    );
};

export default SlideApplications;