import React, { useState } from 'react';
import Slide from '../layout/Slide';
import { motion } from 'framer-motion';

interface SlideBottomUpProps {
    id: string;
    active: boolean;
}

const SlideBottomUp = ({ id, active }: SlideBottomUpProps) => {
    // Stato per simulare l'algoritmo passo-passo
    const [step, setStep] = useState(0);
    const totalSteps = 5;

    const handleNextStep = () => {
        setStep((prev) => (prev < totalSteps ? prev + 1 : prev));
    };

    const handlePrevStep = () => {
        setStep((prev) => (prev > 0 ? prev - 1 : prev));
    };

    return (
        <Slide
            id={id}
            title="Algoritmo Bottom-Up"
            subtitle="Riempimento della tabella DP in modo iterativo"
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
                    <p className="text-lg text-gray-700 dark:text-gray-200">
                        <strong>Idea:</strong> Calcolare OPT(i, j) per valori crescenti di i e j, riempiendo una tabella M[0..m, 0..n].
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                    <motion.div
                        className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
                            Pseudocodice:
                        </h3>
                        <div className="font-mono text-sm bg-gray-100 dark:bg-slate-800 p-4 rounded overflow-y-auto max-h-[280px]">
                            <pre className="text-gray-700 dark:text-gray-300">
                                {`SEQUENCE-ALIGNMENT(X, Y, δ, α):
  m = length(X)
  n = length(Y)
  
  // Inizializza tabella M
  M[0, 0] = 0
  
  // Inizializza prima riga e colonna
  for i = 1 to m:
    M[i, 0] = i * δ
  
  for j = 1 to n:
    M[0, j] = j * δ
  
  // Riempi la tabella da sinistra a destra, dall'alto in basso
  for i = 1 to m:
    for j = 1 to n:
      match = α(X[i], Y[j]) + M[i-1, j-1]
      delete = δ + M[i-1, j]
      insert = δ + M[i, j-1]
      M[i, j] = min(match, delete, insert)
  
  return M[m, n]  // Costo dell'allineamento ottimo`}
                            </pre>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex flex-col"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                            Simulazione Visiva:
                        </h3>

                        <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow mb-3 flex-1">
                            <div className="flex justify-center">
                                <table className="border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="border border-gray-300 dark:border-gray-600 w-10 h-10 bg-gray-100 dark:bg-slate-800"></th>
                                            <th className="border border-gray-300 dark:border-gray-600 w-10 h-10 bg-gray-100 dark:bg-slate-800 text-center">-</th>
                                            <th className="border border-gray-300 dark:border-gray-600 w-10 h-10 bg-gray-100 dark:bg-slate-800 text-center">P</th>
                                            <th className="border border-gray-300 dark:border-gray-600 w-10 h-10 bg-gray-100 dark:bg-slate-800 text-center">A</th>
                                            <th className="border border-gray-300 dark:border-gray-600 w-10 h-10 bg-gray-100 dark:bg-slate-800 text-center">L</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 bg-gray-100 dark:bg-slate-800 text-center">-</td>
                                            <td className={`border border-gray-300 dark:border-gray-600 w-10 h-10 text-center ${step >= 1 ? 'bg-green-100 dark:bg-green-900/30' : ''}`}>0</td>
                                            <td className={`border border-gray-300 dark:border-gray-600 w-10 h-10 text-center ${step >= 1 ? 'bg-indigo-100 dark:bg-indigo-900/30' : ''}`}>δ</td>
                                            <td className={`border border-gray-300 dark:border-gray-600 w-10 h-10 text-center ${step >= 1 ? 'bg-indigo-100 dark:bg-indigo-900/30' : ''}`}>2δ</td>
                                            <td className={`border border-gray-300 dark:border-gray-600 w-10 h-10 text-center ${step >= 1 ? 'bg-indigo-100 dark:bg-indigo-900/30' : ''}`}>3δ</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 bg-gray-100 dark:bg-slate-800 text-center">P</td>
                                            <td className={`border border-gray-300 dark:border-gray-600 w-10 h-10 text-center ${step >= 1 ? 'bg-indigo-100 dark:bg-indigo-900/30' : ''}`}>δ</td>
                                            <td className={`border border-gray-300 dark:border-gray-600 w-10 h-10 text-center ${step >= 2 ? 'bg-green-100 dark:bg-green-900/30' : ''}`}>0</td>
                                            <td className={`border border-gray-300 dark:border-gray-600 w-10 h-10 text-center ${step >= 3 ? 'bg-indigo-100 dark:bg-indigo-900/30' : ''}`}>δ</td>
                                            <td className={`border border-gray-300 dark:border-gray-600 w-10 h-10 text-center ${step >= 3 ? 'bg-indigo-100 dark:bg-indigo-900/30' : ''}`}>2δ</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 bg-gray-100 dark:bg-slate-800 text-center">A</td>
                                            <td className={`border border-gray-300 dark:border-gray-600 w-10 h-10 text-center ${step >= 1 ? 'bg-indigo-100 dark:bg-indigo-900/30' : ''}`}>2δ</td>
                                            <td className={`border border-gray-300 dark:border-gray-600 w-10 h-10 text-center ${step >= 2 ? 'bg-indigo-100 dark:bg-indigo-900/30' : ''}`}>δ</td>
                                            <td className={`border border-gray-300 dark:border-gray-600 w-10 h-10 text-center ${step >= 4 ? 'bg-green-100 dark:bg-green-900/30' : ''}`}>0</td>
                                            <td className={`border border-gray-300 dark:border-gray-600 w-10 h-10 text-center ${step >= 5 ? 'bg-indigo-100 dark:bg-indigo-900/30' : ''}`}>δ</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 dark:border-gray-600 w-10 h-10 bg-gray-100 dark:bg-slate-800 text-center">L</td>
                                            <td className={`border border-gray-300 dark:border-gray-600 w-10 h-10 text-center ${step >= 1 ? 'bg-indigo-100 dark:bg-indigo-900/30' : ''}`}>3δ</td>
                                            <td className={`border border-gray-300 dark:border-gray-600 w-10 h-10 text-center ${step >= 2 ? 'bg-indigo-100 dark:bg-indigo-900/30' : ''}`}>2δ</td>
                                            <td className={`border border-gray-300 dark:border-gray-600 w-10 h-10 text-center ${step >= 4 ? 'bg-indigo-100 dark:bg-indigo-900/30' : ''}`}>δ</td>
                                            <td className={`border border-gray-300 dark:border-gray-600 w-10 h-10 text-center ${step >= 5 ? 'bg-green-100 dark:bg-green-900/30' : ''}`}>0</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <p className="mt-3 text-center text-gray-600 dark:text-gray-300 text-sm">
                                {step === 0 && "Clicca 'Avanti' per iniziare la simulazione"}
                                {step === 1 && "Passo 1: Inizializza prima riga e colonna con multipli di δ"}
                                {step === 2 && "Passo 2: Calcola M[1,1] (P-P) - Match esatto (costo 0)"}
                                {step === 3 && "Passo 3: Continua a riempire la prima riga"}
                                {step === 4 && "Passo 4: Procedi alla seconda riga, M[2,2] (A-A) - Match"}
                                {step === 5 && "Passo 5: Completa la tabella, M[3,3] (L-L) - Match"}
                            </p>
                        </div>

                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={handlePrevStep}
                                disabled={step === 0}
                                className={`px-4 py-2 rounded-full ${step === 0
                                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                        : 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800'
                                    }`}
                            >
                                Indietro
                            </button>
                            <button
                                onClick={handleNextStep}
                                disabled={step === totalSteps}
                                className={`px-4 py-2 rounded-full ${step === totalSteps
                                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                        : 'bg-indigo-500 dark:bg-indigo-600 text-white hover:bg-indigo-600 dark:hover:bg-indigo-500'
                                    }`}
                            >
                                Avanti
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Slide>
    );
};

export default SlideBottomUp; 