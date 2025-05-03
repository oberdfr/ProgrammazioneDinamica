import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AlgorithmVisualizer from '../components/visualization/AlgorithmVisualizer';
import CodeEditor from '../components/common/CodeEditor';
import { calcola } from '../algorithms/js/algorithm';
import algorithmCode from '../algorithms/js/algorithm?raw';
import CodeViewer from '@/components/common/CodeViewer';
import fs from 'fs';

const Demo = () => {
    const [sequence1, setSequence1] = useState('PALETTE');
    const [sequence2, setSequence2] = useState('PALATE');
    const [gapPenalty, setGapPenalty] = useState(2);
    const [mismatchPenalty, setMismatchPenalty] = useState(1);
    const [currentCode, setCurrentCode] = useState('');
    const [codeOutput, setCodeOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [visualizerKey, setVisualizerKey] = useState(0);
    const [visualizationData, setVisualizationData] = useState(null);

    // Load code from file
    useEffect(() => {
        setCurrentCode(algorithmCode);
    }, []);

    // Execution Logic
    const handleRunCode = async () => {
        setCodeOutput('');
        setIsRunning(true);
        setVisualizerKey(prev => prev + 1);
        setVisualizationData(null);

        try {
            // Execute code and collect execution data
            const executionSteps = [];

            // Parse the sequence alignment algorithm from currentCode
            // This is a simplified approach - in a real implementation, you might need to handle this differently
            const funcModule = {
                exports: {}
            };

            // Create a function that will capture the execution steps
            const getExecutionSteps = (seq1, seq2, gapPenalty, mismatchPenalty) => {
                const m = seq1.length;
                const n = seq2.length;

                // Initialize matrix
                const dp = Array(m + 1).fill(null).map(() =>
                    Array(n + 1).fill(null).map(() => ({ value: 0, source: null }))
                );

                // Initialize first row and column
                for (let i = 1; i <= m; i++) dp[i][0] = { value: i * gapPenalty, source: 'up' };
                for (let j = 1; j <= n; j++) dp[0][j] = { value: j * gapPenalty, source: 'left' };

                const steps = [];

                // Fill DP table
                for (let i = 1; i <= m; i++) {
                    for (let j = 1; j <= n; j++) {
                        const matchScore = seq1[i - 1] === seq2[j - 1] ? 0 : mismatchPenalty;
                        const diag = dp[i - 1][j - 1].value + matchScore;
                        const up = dp[i - 1][j].value + gapPenalty;
                        const left = dp[i][j - 1].value + gapPenalty;

                        let bestVal = diag;
                        let bestSource = 'diag';

                        if (up < bestVal) {
                            bestVal = up;
                            bestSource = 'up';
                        } else if (up === bestVal) {
                            bestSource = 'up';
                        }

                        if (left < bestVal) {
                            bestVal = left;
                            bestSource = 'left';
                        } else if (left === bestVal && bestSource !== 'up') {
                            bestSource = 'left';
                        }

                        dp[i][j] = { value: bestVal, source: bestSource };

                        // Record this step
                        steps.push({
                            i,
                            j,
                            value: bestVal,
                            source: bestSource,
                            diagVal: diag,
                            leftVal: left,
                            upVal: up,
                            matchScore
                        });
                    }
                }

                // Traceback
                const path = [];
                let i = m;
                let j = n;

                while (i > 0 || j > 0) {
                    path.push([i, j]);

                    if (i === 0) {
                        j--;
                    } else if (j === 0) {
                        i--;
                    } else {
                        const source = dp[i][j].source;
                        if (source === 'diag') {
                            i--;
                            j--;
                        } else if (source === 'up') {
                            i--;
                        } else {
                            j--;
                        }
                    }
                }
                path.push([0, 0]);

                return {
                    matrix: dp,
                    steps,
                    path: path.reverse()
                };
            };

            // Run calculation
            const result = calcola(sequence1, sequence2, gapPenalty, mismatchPenalty);

            // Get execution steps for visualization
            const executionData = getExecutionSteps(sequence1, sequence2, gapPenalty, mismatchPenalty);

            // Add alignment results to execution data
            executionData.alignedSeq1 = result.alignedSeq1;
            executionData.alignedSeq2 = result.alignedSeq2;
            executionData.score = result.score;

            // Update visualization data
            setVisualizationData(executionData);

            // Set output text
            setCodeOutput(
                `Language: JavaScript\nScore: ${result.score}\nSeq1: ${result.alignedSeq1}\nSeq2: ${result.alignedSeq2}`
            );
        } catch (error) {
            console.error("JS Execution Error:", error);
            setCodeOutput(`Language: JavaScript\nError: ${error.message}`);
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
                className="mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                    Sequence Alignment (Needleman-Wunsch)
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    Visualize, edit, and execute the algorithm in JavaScript.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                    className="lg:col-span-1 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                >
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                        Parameters & Execution
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="seq1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sequence 1</label>
                            <input id="seq1" type="text" value={sequence1} onChange={(e) => setSequence1(e.target.value.toUpperCase())} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 font-mono" placeholder="E.g., GATTACA" />
                        </div>
                        <div>
                            <label htmlFor="seq2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sequence 2</label>
                            <input id="seq2" type="text" value={sequence2} onChange={(e) => setSequence2(e.target.value.toUpperCase())} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 font-mono" placeholder="E.g., GCATGCU" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="gapPenalty" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gap Penalty</label>
                                <input id="gapPenalty" type="number" min="0" value={gapPenalty} onChange={(e) => setGapPenalty(Math.max(0, Number(e.target.value)))} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200" />
                            </div>
                            <div>
                                <label htmlFor="mismatchPenalty" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mismatch Penalty</label>
                                <input id="mismatchPenalty" type="number" min="0" value={mismatchPenalty} onChange={(e) => setMismatchPenalty(Math.max(0, Number(e.target.value)))} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200" />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                onClick={handleRunCode}
                                disabled={isRunning}
                                className={`w-full flex justify-center items-center py-2 px-4 rounded-md transition-colors duration-200 text-white ${isRunning
                                    ? 'bg-gray-400 dark:bg-gray-600 cursor-wait'
                                    : 'bg-indigo-600 hover:bg-indigo-700'
                                    }`}
                            >
                                {isRunning ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Executing...
                                    </>
                                ) : 'Run Algorithm'}
                            </button>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Execution Output</h3>
                            <div className="bg-gray-100 dark:bg-slate-900 p-4 rounded-md font-mono text-sm min-h-[100px] max-h-64 overflow-y-auto whitespace-pre-wrap break-words">
                                {codeOutput || <span className="text-gray-500 dark:text-gray-400">Output will appear here after running...</span>}
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                        Algorithm Visualization
                    </h2>
                    <AlgorithmVisualizer
                        key={visualizerKey}
                        sequence1={sequence1}
                        sequence2={sequence2}
                        gapPenalty={gapPenalty}
                        mismatchPenalty={mismatchPenalty}
                        playing={true}
                        speed={500}
                        executionData={visualizationData}
                    />
                </motion.div>
            </div>

            <motion.div
                className="mt-8 bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >

                { /*
        <CodeEditor
          code={currentCode}
          language="javascript"
          filename="algorithm.js"
          onChange={setCurrentCode}
          onRun={handleRunCode}
          isRunning={isRunning}
              /> 
        */}

                <CodeViewer
                    code={currentCode}
                    language="javascript"
                    title={'Needleman-Wunsch Algorithm'}
                />
            </motion.div>
        </div>
    );
};

export default Demo;