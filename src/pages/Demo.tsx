// pages/Demo.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AlgorithmVisualizer from '../components/visualization/AlgorithmVisualizer';
import CodeViewer from '../components/common/CodeViewer';

const Demo = () => {
  const [sequence1, setSequence1] = useState('PALETTE');
  const [sequence2, setSequence2] = useState('PALATE');
  const [gapPenalty, setGapPenalty] = useState(2);
  const [mismatchPenalty, setMismatchPenalty] = useState(1);
  const [algorithm, setAlgorithm] = useState('dp');
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  
  // Standard Needleman-Wunsch algorithm code
  const needlemanWunschCode = `def needleman_wunsch(seq1, seq2, gap_penalty=1, mismatch_penalty=1):
    """Implements the Needleman-Wunsch algorithm for sequence alignment"""
    m, n = len(seq1), len(seq2)
    dp = [[0 for _ in range(n+1)] for _ in range(m+1)]
    
    # Initialize first row and column
    for i in range(m+1):
        dp[i][0] = i * gap_penalty
    for j in range(n+1):
        dp[0][j] = j * gap_penalty
    
    # Fill the DP table
    for i in range(1, m+1):
        for j in range(1, n+1):
            match = 0 if seq1[i-1] == seq2[j-1] else mismatch_penalty
            dp[i][j] = min(
                dp[i-1][j-1] + match,  # Match or mismatch
                dp[i-1][j] + gap_penalty,  # Gap in seq2
                dp[i][j-1] + gap_penalty   # Gap in seq1
            )
    
    # Traceback to find alignment
    alignment1, alignment2 = "", ""
    i, j = m, n
    
    while i > 0 or j > 0:
        if i > 0 and j > 0 and dp[i][j] == dp[i-1][j-1] + (0 if seq1[i-1] == seq2[j-1] else mismatch_penalty):
            alignment1 = seq1[i-1] + alignment1
            alignment2 = seq2[j-1] + alignment2
            i -= 1
            j -= 1
        elif j > 0 and dp[i][j] == dp[i][j-1] + gap_penalty:
            alignment1 = "-" + alignment1
            alignment2 = seq2[j-1] + alignment2
            j -= 1
        else:
            alignment1 = seq1[i-1] + alignment1
            alignment2 = "-" + alignment2
            i -= 1
    
    return dp[m][n], alignment1, alignment2`;
  
  // Hirschberg algorithm code
  const hirschbergCode = `def hirschberg(seq1, seq2, gap_penalty=1, mismatch_penalty=1):
    """Implements the Hirschberg algorithm for space-efficient sequence alignment"""
    if len(seq1) == 0:
        return len(seq2) * gap_penalty, "-" * len(seq2), seq2
    if len(seq2) == 0:
        return len(seq1) * gap_penalty, seq1, "-" * len(seq1)
    if len(seq1) == 1 or len(seq2) == 1:
        # Base case - use standard NW for small sequences
        return needleman_wunsch(seq1, seq2, gap_penalty, mismatch_penalty)
    
    # Divide: Find optimal midpoint
    mid = len(seq2) // 2
    
    # Forward pass - compute scores from start to mid column
    score_left = nw_score_last_row(seq1, seq2[:mid], gap_penalty, mismatch_penalty)
    
    # Backward pass - compute scores from end to mid column
    score_right = nw_score_last_row(seq1[::-1], seq2[mid:][::-1], gap_penalty, mismatch_penalty)
    score_right.reverse()
    
    # Find the optimal row that minimizes the combined score
    row = min(range(len(seq1) + 1), key=lambda i: score_left[i] + score_right[i])
    
    # Conquer: Solve subproblems recursively
    score_left_part, align1_left, align2_left = hirschberg(
        seq1[:row], seq2[:mid], gap_penalty, mismatch_penalty
    )
    score_right_part, align1_right, align2_right = hirschberg(
        seq1[row:], seq2[mid:], gap_penalty, mismatch_penalty
    )
    
    # Combine results
    return (
        score_left_part + score_right_part,
        align1_left + align1_right,
        align2_left + align2_right
    )

def nw_score_last_row(seq1, seq2, gap_penalty, mismatch_penalty):
    """
    Computes the last row of the Needleman-Wunsch score matrix
    using only O(len(seq2)) space.
    """
    m, n = len(seq1), len(seq2)
    
    # We only need two rows: previous and current
    prev_row = [j * gap_penalty for j in range(n + 1)]
    current_row = [0] * (n + 1)
    
    # Fill the rows
    for i in range(1, m + 1):
        current_row[0] = i * gap_penalty
        
        for j in range(1, n + 1):
            match = 0 if seq1[i-1] == seq2[j-1] else mismatch_penalty
            current_row[j] = min(
                prev_row[j-1] + match,  # Match/mismatch
                prev_row[j] + gap_penalty,  # Gap in seq2
                current_row[j-1] + gap_penalty  # Gap in seq1
            )
        
        # Swap rows
        prev_row, current_row = current_row, prev_row
    
    # Return the last computed row (which is now in prev_row)
    return prev_row`;
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setPlaying(true);
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Interactive Sequence Alignment Demo
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Visualize how the Needleman-Wunsch and Hirschberg algorithms work step-by-step.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Control Panel */}
        <motion.div 
          className="lg:col-span-1 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Algorithm Parameters
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="algorithm" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Algorithm
              </label>
              <select
                id="algorithm"
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200"
              >
                <option value="dp">Needleman-Wunsch (Standard DP)</option>
                <option value="hirschberg">Hirschberg (Space Efficient)</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="seq1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sequence 1
              </label>
              <input
                id="seq1"
                type="text"
                value={sequence1}
                onChange={(e) => setSequence1(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200"
                placeholder="Enter first sequence"
              />
            </div>
            
            <div>
              <label htmlFor="seq2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sequence 2
              </label>
              <input
                id="seq2"
                type="text"
                value={sequence2}
                onChange={(e) => setSequence2(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200"
                placeholder="Enter second sequence"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="gapPenalty" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Gap Penalty
                </label>
                <input
                  id="gapPenalty"
                  type="number"
                  min="1"
                  max="10"
                  value={gapPenalty}
                  onChange={(e) => setGapPenalty(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200"
                />
              </div>
              
              <div>
                <label htmlFor="mismatchPenalty" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mismatch Penalty
                </label>
                <input
                  id="mismatchPenalty"
                  type="number"
                  min="1"
                  max="10"
                  value={mismatchPenalty}
                  onChange={(e) => setMismatchPenalty(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200"
                />
              </div>
            </div>
            
            {/* Playback controls */}
            <div>
              <label htmlFor="speed" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Animation Speed
              </label>
              <input
                id="speed"
                type="range"
                min="0.5"
                max="3"
                step="0.5"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Slow</span>
                <span>Fast</span>
              </div>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200"
              >
                {playing ? "Restart Animation" : "Start Animation"}
              </button>
            </div>
          </form>
        </motion.div>
        
        {/* Visualization Area */}
        <motion.div 
          className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Visualization
          </h2>
          
          <AlgorithmVisualizer
            algorithm={algorithm}
            sequence1={sequence1}
            sequence2={sequence2}
            gapPenalty={gapPenalty}
            mismatchPenalty={mismatchPenalty}
            playing={playing}
            speed={speed}
          />
        </motion.div>
      </div>
      
      {/* Algorithm Code */}
      <motion.div 
        className="mt-8 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Algorithm Implementation
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Here's the Python implementation of the {algorithm === 'dp' ? 'Needleman-Wunsch' : 'Hirschberg'} algorithm:
          </p>
        </div>
        
        <CodeViewer 
          code={algorithm === 'dp' ? needlemanWunschCode : hirschbergCode}
          language="python"
          title={algorithm === 'dp' ? 'Needleman-Wunsch Algorithm' : 'Hirschberg Algorithm'}
        />
      </motion.div>
    </div>
  );
};

export default Demo;