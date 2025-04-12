import React from 'react';
import Slide from '../layout/Slide';
import { motion } from 'framer-motion';

interface SlideAnalysisProps {
  id: string;
  active: boolean;
}

const SlideAnalysis = ({ id, active }: SlideAnalysisProps) => {
  return (
    <Slide 
      id={id}
      title="Analisi Algoritmo DP Standard"
      subtitle="Valutazione delle performance"
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
          <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg mb-6">
            <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
              Teorema:
            </h3>
            <p className="text-gray-700 dark:text-gray-200">
              L'algoritmo DP calcola la edit distance (e un allineamento ottimo tramite traceback) in:
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200">Tempo:</h4>
                    <p className="text-gray-700 dark:text-gray-300">Θ(mn)</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Ogni cella della tabella richiede tempo O(1)
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M10 4v4" />
                      <path d="M2 8h20" />
                      <path d="M6 12h4" />
                      <path d="M6 16h4" />
                      <path d="M14 12h4" />
                      <path d="M14 16h4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200">Spazio:</h4>
                    <p className="text-gray-700 dark:text-gray-300">Θ(mn)</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Per memorizzare la tabella M
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
              Problema con la Complessità Spaziale:
            </h3>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 p-4">
                <p className="text-gray-700 dark:text-gray-200 mb-4">
                  Lo spazio Θ(mn) può essere proibitivo per sequenze molto lunghe.
                </p>
                <p className="text-gray-700 dark:text-gray-200">
                  <span className="font-semibold">Esempio:</span> Per genomi con m, n ≈ 10<sup>9</sup> basi:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-200">
                  <li>Tabella: 10<sup>18</sup> celle</li>
                  <li>A 4 byte per cella = 4 × 10<sup>18</sup> byte ≈ 4 exabyte!</li>
                  <li>Impraticabile anche per i supercomputer moderni</li>
                </ul>
              </div>
              <div className="md:w-1/2 p-4 flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(40,1fr)] opacity-30">
                      {Array.from({ length: 1600 }).map((_, i) => (
                        <div key={i} className="border border-indigo-200 dark:border-indigo-700"></div>
                      ))}
                    </div>
                    <div className="z-10 p-4 bg-white/90 dark:bg-slate-800/90 rounded shadow-lg text-center">
                      <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                        Θ(mn) spazio
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Cresce rapidamente con la dimensione dell'input
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-red-500 text-white p-2 rounded-full w-12 h-12 flex items-center justify-center text-xs font-bold">
                    ⚠️
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-600 rounded-r-md">
              <p className="text-gray-700 dark:text-gray-200">
                <span className="font-semibold">Domanda:</span> Possiamo ridurre lo spazio senza compromettere significativamente il tempo di esecuzione?
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideAnalysis; 