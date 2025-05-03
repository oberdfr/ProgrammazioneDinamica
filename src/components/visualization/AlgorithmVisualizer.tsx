import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

// Define proper types for execution data
interface Cell {
    value: number;
    source?: string;
}

interface Step {
    i: number;
    j: number;
    value: number;
    source: string;
    diagVal?: number;
    leftVal?: number;
    upVal?: number;
    matchScore?: number;
}

interface ExecutionData {
    matrix: Cell[][];
    steps: Step[];
    path: [number, number][];
    alignedSeq1: string;
    alignedSeq2: string;
    score: number;
}

const AlgorithmVisualizer = ({
    speed = 1,
    playing = false,
    sequence1 = '',
    sequence2 = '',
    gapPenalty = 2,
    mismatchPenalty = 1,
    executionData = null as ExecutionData | null,
}) => {
    const [matrix, setMatrix] = useState<Cell[][]>([]);
    const [currentStep, setCurrentStep] = useState(-1);
    const [steps, setSteps] = useState<Step[]>([]);
    const [path, setPath] = useState<[number, number][]>([]);
    const [alignment, setAlignment] = useState({ seq1: '', seq2: '', score: null as number | null });
    const [isCalculationComplete, setIsCalculationComplete] = useState(false);
    const [isAnimationComplete, setIsAnimationComplete] = useState(false);

    const animationRef = useRef<NodeJS.Timeout | null>(null);

    // Process execution data when it changes
    useEffect(() => {
        if (executionData) {
            setMatrix(executionData.matrix);
            setSteps(executionData.steps);
            setPath(executionData.path);
            setAlignment({
                seq1: executionData.alignedSeq1,
                seq2: executionData.alignedSeq2,
                score: executionData.score
            });
            setIsCalculationComplete(true);
            setCurrentStep(0);
        } else {
            // Reset state if no execution data
            setMatrix([]);
            setSteps([]);
            setPath([]);
            setAlignment({ seq1: '', seq2: '', score: null });
            setCurrentStep(-1);
            setIsCalculationComplete(false);
            setIsAnimationComplete(false);
        }

        return () => {
            if (animationRef.current) {
                clearTimeout(animationRef.current);
            }
        };
    }, [executionData]);

    // Animation effect
    useEffect(() => {
        if (playing && isCalculationComplete && !isAnimationComplete && currentStep < steps.length) {
            animationRef.current = setTimeout(() => {
                setCurrentStep(prev => prev + 1);
            }, Math.max(50, 1000 / speed));
        } else if (currentStep >= steps.length && isCalculationComplete) {
            setIsAnimationComplete(true);
        }

        return () => {
            if (animationRef.current) {
                clearTimeout(animationRef.current);
            }
        };
    }, [playing, currentStep, steps, speed, isCalculationComplete, isAnimationComplete]);

    // Memoized display matrix - now shows all values without hiding them
    const displayMatrix = useMemo(() => {
        if (!matrix.length) return [];

        const m = matrix.length;
        const n = matrix[0].length;

        // Create a matrix to track which cells should be visible - now include ALL cells
        const visibleMatrix = Array(m).fill(null).map((_, i) =>
            Array(n).fill(null).map((_, j) => matrix[i][j]?.value)
        );

        // We track visited cells separately for styling, but all values remain visible
        return visibleMatrix;
    }, [matrix]);

    // Cell animation variants
    const cellVariants = {
        initial: { scale: 0.5, opacity: 0 },
        animate: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
        highlight: {
            scale: 1.1,
            backgroundColor: 'rgba(99, 102, 241, 0.4)',
            borderColor: 'rgba(79, 70, 229, 1)',
            transition: { duration: 0.15 },
            zIndex: 10,
            opacity: 1,
        },
        path: {
            backgroundColor: 'rgba(165, 243, 195, 0.3)',
            scale: 1,
            opacity: 1,
        },
        pathHighlight: {
            scale: 1.1,
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            borderColor: 'rgba(79, 70, 229, 1)',
            borderWidth: '2px',
            transition: { duration: 0.15 },
            zIndex: 10,
            opacity: 1,
        }
    };

    if (!sequence1 || !sequence2) {
        return (
            <div className="flex items-center justify-center p-8 text-gray-500 dark:text-gray-400">
                Please enter two sequences to visualize the algorithm.
            </div>
        );
    }

    if (!executionData) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-gray-500 dark:text-gray-400">
                <p className="mb-4">Click the "Run Algorithm" button to start the visualization.</p>
                <div className="w-24 h-24 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isCalculationComplete || !matrix.length) {
        return (
            <div className="flex items-center justify-center p-8 text-gray-500 dark:text-gray-400">
                <svg className="animate-spin mr-3 h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing execution data...
            </div>
        );
    }

    const currentHighlightCell = (currentStep >= 0 && currentStep < steps.length) ? steps[currentStep] : null;

    // Calculate which cells have been visited up to the current step
    const visitedCells = new Set();
    for (let i = 0; i < currentStep && i < steps.length; i++) {
        const step = steps[i];
        visitedCells.add(`${step.i},${step.j}`);
    }

    return (
        <div className="space-y-6">
            {/* Status display */}
            <div className="text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 p-3 rounded-md bg-gray-50 dark:bg-slate-800">
                <div className="font-medium mb-1">Parameters:</div>
                <div className="font-mono break-all">Seq 1: {sequence1}</div>
                <div className="font-mono break-all">Seq 2: {sequence2}</div>
                <div>Gap Penalty: {gapPenalty}, Mismatch Penalty: {mismatchPenalty}</div>
            </div>

            {/* Matrix visualization */}
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <table className="border-collapse relative">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-slate-700">
                                <th className="sticky left-0 top-0 z-20 bg-gray-100 dark:bg-slate-700 w-10 h-10 min-w-[2.5rem] text-center border border-gray-300 dark:border-gray-600"></th>
                                <th className="sticky top-0 z-10 bg-gray-100 dark:bg-slate-700 w-10 h-10 min-w-[2.5rem] text-center border border-gray-300 dark:border-gray-600">ε</th>
                                {sequence2.split('').map((char, j) => (
                                    <th key={j} className="sticky top-0 z-10 bg-gray-100 dark:bg-slate-700 w-10 h-10 min-w-[2.5rem] text-center font-mono text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                                        {char}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {displayMatrix.map((row, i) => (
                                <tr key={i}>
                                    <td className="sticky left-0 z-10 bg-gray-100 dark:bg-slate-700 w-10 h-10 min-w-[2.5rem] text-center font-mono text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
                                        {i === 0 ? 'ε' : sequence1[i - 1]}
                                    </td>
                                    {row.map((cellValue, j) => {
                                        const isCurrent = currentHighlightCell && i === currentHighlightCell.i && j === currentHighlightCell.j;
                                        const isOnPath = isCalculationComplete && path.some(([pi, pj]) => pi === i && pj === j);
                                        const isVisited = visitedCells.has(`${i},${j}`);

                                        // Determine styling based on state, not visibility
                                        let variant = 'animate';

                                        if (isAnimationComplete && isOnPath) variant = 'path';
                                        if (isCurrent) variant = isOnPath ? 'pathHighlight' : 'highlight';

                                        const baseCellStyle = `w-10 h-10 min-w-[2.5rem] text-center border text-xs md:text-sm ${i === 0 || j === 0
                                            ? 'font-semibold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-700/50 border-gray-300 dark:border-gray-600'
                                            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800'
                                            }`;

                                        const pathCellStyle = (isAnimationComplete && isOnPath && !isCurrent)
                                            ? 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700'
                                            : '';

                                        const visitedCellStyle = isVisited && !isCurrent && !isOnPath
                                            ? 'bg-gray-50 dark:bg-gray-800/50'
                                            : '';

                                        // Determine if we should show the value yet (for animation)
                                        const shouldShowValue = (i === 0 || j === 0 || isVisited || isAnimationComplete);

                                        return (
                                            <motion.td
                                                key={j}
                                                variants={cellVariants}
                                                initial="animate"
                                                animate={variant}
                                                className={`${baseCellStyle} ${pathCellStyle} ${visitedCellStyle} relative`}
                                            >
                                                <span className="relative z-10">
                                                    {shouldShowValue && cellValue !== null ? cellValue : ''}
                                                </span>
                                            </motion.td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Alignment result */}
            {isCalculationComplete && alignment.seq1 && (
                <motion.div
                    className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-700 mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="font-medium mb-3 text-gray-800 dark:text-gray-100">
                        Optimal Alignment
                    </div>
                    <div className="overflow-x-auto pb-2">
                        <table className="border-collapse w-full">
                            <tbody>
                                <tr className="font-mono text-sm text-gray-700 dark:text-gray-300">
                                    <td className="pr-2 py-1 font-sans font-medium text-xs text-gray-500 dark:text-gray-400">Seq1</td>
                                    {alignment.seq1.split('').map((char, idx) => (
                                        <td key={`s1-${idx}`} className="w-6 min-w-[1.5rem] text-center py-1 border-b border-indigo-100 dark:border-indigo-800">
                                            {char}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="font-mono text-sm text-indigo-600 dark:text-indigo-400">
                                    <td className="pr-2 py-1"></td>
                                    {alignment.seq1.split('').map((char1, idx) => {
                                        const char2 = alignment.seq2[idx];
                                        const isMatch = char1 !== '-' && char2 !== '-' && char1 === char2;
                                        return (
                                            <td key={`match-${idx}`} className="w-6 min-w-[1.5rem] text-center py-1 border-b border-indigo-100 dark:border-indigo-800">
                                                {isMatch ? '|' : ' '}
                                            </td>
                                        );
                                    })}
                                </tr>
                                <tr className="font-mono text-sm text-gray-700 dark:text-gray-300">
                                    <td className="pr-2 py-1 font-sans font-medium text-xs text-gray-500 dark:text-gray-400">Seq2</td>
                                    {alignment.seq2.split('').map((char, idx) => (
                                        <td key={`s2-${idx}`} className="w-6 min-w-[1.5rem] text-center py-1">
                                            {char}
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-3 text-sm text-gray-700 dark:text-gray-200">
                        Alignment Score: <span className="font-semibold">{alignment.score}</span>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default AlgorithmVisualizer;