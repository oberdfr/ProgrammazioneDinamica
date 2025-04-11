// components/visualization/AlgorithmVisualizer.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const AlgorithmVisualizer = ({ 
  data = [], 
  algorithm = 'dp',
  speed = 1,
  playing = false,
  sequence1 = '',
  sequence2 = '',
  gapPenalty = 2,
  mismatchPenalty = 1
}) => {
  const [matrix, setMatrix] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [path, setPath] = useState([]);
  const [alignment, setAlignment] = useState({ seq1: '', seq2: '', score: 0 });
  const animationRef = useRef(null);
  
  // Initialize the visualization matrix and steps
  useEffect(() => {
    if (sequence1 && sequence2) {
      const m = sequence1.length;
      const n = sequence2.length;
      
      // Create initial empty matrix
      const initialMatrix = Array(m + 1).fill().map(() => Array(n + 1).fill(null));
      
      // Initialize first row and column with gap penalties
      for (let i = 0; i <= m; i++) {
        initialMatrix[i][0] = i * gapPenalty;
      }
      for (let j = 0; j <= n; j++) {
        initialMatrix[0][j] = j * gapPenalty;
      }
      
      setMatrix(initialMatrix);
      
      // Generate steps for animation
      const simulationSteps = [];
      const pathTrace = [];
      
      // Fill the matrix using DP
      for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
          const match = sequence1[i-1] === sequence2[j-1] ? 0 : mismatchPenalty;
          
          const diagonal = initialMatrix[i-1][j-1] + match;
          const left = initialMatrix[i][j-1] + gapPenalty;
          const up = initialMatrix[i-1][j] + gapPenalty;
          
          initialMatrix[i][j] = Math.min(diagonal, left, up);
          
          simulationSteps.push({
            i,
            j,
            value: initialMatrix[i][j],
            diagonal,
            left,
            up,
            match
          });
        }
      }
      
      // Trace back the alignment path
      let i = m;
      let j = n;
      
      while (i > 0 || j > 0) {
        pathTrace.push([i, j]);
        
        if (i > 0 && j > 0 && initialMatrix[i][j] === initialMatrix[i-1][j-1] + (sequence1[i-1] === sequence2[j-1] ? 0 : mismatchPenalty)) {
          i--;
          j--;
        } else if (j > 0 && initialMatrix[i][j] === initialMatrix[i][j-1] + gapPenalty) {
          j--;
        } else {
          i--;
        }
      }
      
      // Generate the alignment
      i = m;
      j = n;
      let alignedSeq1 = '';
      let alignedSeq2 = '';
      
      while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && initialMatrix[i][j] === initialMatrix[i-1][j-1] + (sequence1[i-1] === sequence2[j-1] ? 0 : mismatchPenalty)) {
          alignedSeq1 = sequence1[i-1] + alignedSeq1;
          alignedSeq2 = sequence2[j-1] + alignedSeq2;
          i--;
          j--;
        } else if (j > 0 && initialMatrix[i][j] === initialMatrix[i][j-1] + gapPenalty) {
          alignedSeq1 = '-' + alignedSeq1;
          alignedSeq2 = sequence2[j-1] + alignedSeq2;
          j--;
        } else {
          alignedSeq1 = sequence1[i-1] + alignedSeq1;
          alignedSeq2 = '-' + alignedSeq2;
          i--;
        }
      }
      
      setAlignment({
        seq1: alignedSeq1,
        seq2: alignedSeq2,
        score: initialMatrix[m][n]
      });
      
      setSteps(simulationSteps);
      setPath(pathTrace);
    }
  }, [sequence1, sequence2, gapPenalty, mismatchPenalty]);
  
  // Animation effect
  useEffect(() => {
    if (playing && currentStep < steps.length) {
      animationRef.current = setTimeout(() => {
        setCurrentStep(prev => {
          const nextStep = prev + 1;
          
          if (nextStep < steps.length) {
            const step = steps[nextStep];
            
            setMatrix(prevMatrix => {
              const newMatrix = [...prevMatrix];
              newMatrix[step.i][step.j] = step.value;
              return newMatrix;
            });
          }
          
          return nextStep;
        });
      }, 1000 / speed);
    } else if (!playing) {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    }
    
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [playing, currentStep, steps, speed]);
  
  // Reset when animation completes
  useEffect(() => {
    if (currentStep >= steps.length) {
      setTimeout(() => {
        setCurrentStep(0);
      }, 2000);
    }
  }, [currentStep, steps]);
  
  // Cell variant for animation
  const cellVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
    highlight: { 
      scale: 1.1, 
      backgroundColor: 'rgba(79, 70, 229, 0.2)',
      transition: { duration: 0.3 }
    }
  };
  
  if (!sequence1 || !sequence2) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500 dark:text-gray-400">
        Please enter two sequences to visualize the algorithm.
      </div>
    );
  }
  
  return (
    <div className="overflow-auto">
      <div className="mb-3 text-sm text-gray-600 dark:text-gray-300">
        <div className="font-medium mb-1">Parameters:</div>
        <div>Sequence 1: <span className="font-mono">{sequence1}</span></div>
        <div>Sequence 2: <span className="font-mono">{sequence2}</span></div>
        <div>Gap Penalty: {gapPenalty}, Mismatch Penalty: {mismatchPenalty}</div>
      </div>
      
      {/* Matrix visualization */}
      <div className="overflow-x-auto mb-6">
        <div className="inline-block min-w-full">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="w-10 h-10 text-center"></th>
                <th className="w-10 h-10 text-center"></th>
                {sequence2.split('').map((char, j) => (
                  <th key={j} className="w-10 h-10 text-center font-mono text-gray-700 dark:text-gray-300">
                    {char}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.map((row, i) => (
                <tr key={i}>
                  <td className="w-10 h-10 text-center font-mono text-gray-700 dark:text-gray-300">
                    {i === 0 ? '' : sequence1[i-1]}
                  </td>
                  {row.map((cell, j) => {
                    const isCurrentCell = currentStep < steps.length && 
                                         steps[currentStep] && 
                                         i === steps[currentStep].i && 
                                         j === steps[currentStep].j;
                    
                    const isPath = path.some(([pi, pj]) => pi === i && pj === j);
                    
                    return (
                      <motion.td 
                        key={j}
                        variants={cellVariants}
                        initial="initial"
                        animate={isCurrentCell ? "highlight" : cell !== null ? "animate" : "initial"}
                        className={`w-10 h-10 text-center border ${
                          isPath 
                            ? 'border-indigo-500 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30' 
                            : 'border-gray-200 dark:border-gray-700'
                        } ${
                          i === 0 || j === 0 
                            ? 'bg-gray-100 dark:bg-slate-700'
                            : ''
                        }`}
                      >
                        {cell !== null ? cell : ''}
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
      {currentStep >= steps.length && (
        <motion.div 
          className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="font-medium mb-2 text-gray-700 dark:text-gray-200">Optimal Alignment</div>
          <div className="font-mono text-sm">
            <div>{alignment.seq1}</div>
            <div>
              {alignment.seq1.split('').map((char, idx) => 
                char === alignment.seq2[idx] && char !== '-' ? '|' : ' '
              ).join('')}
            </div>
            <div>{alignment.seq2}</div>
          </div>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Score: {alignment.score}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AlgorithmVisualizer;