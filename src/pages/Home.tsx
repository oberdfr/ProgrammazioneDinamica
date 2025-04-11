// pages/Home.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Code, Presentation, BookOpen } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <motion.section 
        className="py-12 md:py-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Sequence Alignment Explorer
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Understand and visualize dynamic programming techniques for sequence alignment, 
            from the Needleman-Wunsch algorithm to Hirschberg's space-efficient approach.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Link
              to="/presentation"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg shadow-sm transition-colors duration-200"
            >
              Start Presentation
              <ChevronRight size={20} className="ml-2" />
            </Link>
            
            <Link
              to="/demo"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:text-lg shadow-sm transition-colors duration-200 dark:bg-slate-800 dark:text-indigo-400 dark:hover:bg-slate-700"
            >
              Try Interactive Demo
              <Code size={20} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Features */}
      <motion.section 
        className="py-12 px-4 bg-gray-50 dark:bg-slate-800/30 rounded-xl shadow-inner"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Project Overview
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Dynamic Programming 101" 
              description="Learn the fundamentals of DP, from optimal substructure to memoization and tabulation."
              icon={<Presentation />}
              delay={0.2}
            />
            
            <FeatureCard 
              title="Algorithm Visualization" 
              description="See the algorithms in action with step-by-step visualizations of matrix filling and traceback."
              icon={<Code />}
              delay={0.4}
            />
            
            <FeatureCard 
              title="Space-Efficient Solutions" 
              description="Discover how Hirschberg's algorithm reduces space requirements without sacrificing accuracy."
              icon={<BookOpen />}
              delay={0.6}
            />
          </div>
        </div>
      </motion.section>
      
      {/* Application Preview */}
      <motion.section 
        className="py-12 md:py-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            Explore the Algorithms
          </h2>
          
          <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-12">
            From DNA sequence alignment to spell checking, these algorithms are fundamental to computational biology and more.
          </p>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden">
            <div className="p-4 bg-gray-100 dark:bg-slate-700 border-b border-gray-200 dark:border-gray-600">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="bg-gray-100 dark:bg-slate-700 rounded-lg p-4 font-mono text-sm text-gray-800 dark:text-gray-200 mb-4">
                <div>def needleman_wunsch(seq1, seq2, gap_penalty=1, mismatch_penalty=1):</div>
                <div className="pl-4">"""Implements the Needleman-Wunsch algorithm for sequence alignment"""</div>
                <div className="pl-4">m, n = len(seq1), len(seq2)</div>
                <div className="pl-4">dp = [[0 for _ in range(n+1)] for _ in range(m+1)]</div>
                <div className="pl-4"></div>
                <div className="pl-4"># Initialize first row and column</div>
                <div className="pl-4">for i in range(m+1):</div>
                <div className="pl-8">dp[i][0] = i * gap_penalty</div>
                <div className="pl-4">for j in range(n+1):</div>
                <div className="pl-8">dp[0][j] = j * gap_penalty</div>
                <div className="pl-4"></div>
                <div className="pl-4"># Fill the DP table</div>
                <div className="pl-4">for i in range(1, m+1):</div>
                <div className="pl-8">for j in range(1, n+1):</div>
                <div className="pl-12">match = 0 if seq1[i-1] == seq2[j-1] else mismatch_penalty</div>
                <div className="pl-12">dp[i][j] = min(</div>
                <div className="pl-16">dp[i-1][j-1] + match,  # Match or mismatch</div>
                <div className="pl-16">dp[i-1][j] + gap_penalty,  # Gap in seq2</div>
                <div className="pl-16">dp[i][j-1] + gap_penalty   # Gap in seq1</div>
                <div className="pl-12">)</div>
              </div>
              
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 text-sm">
                <p className="font-medium text-gray-800 dark:text-gray-200 mb-2">Example:</p>
                <div className="font-mono">
                  <div>seq1 = "PALETTE"</div>
                  <div>seq2 = "PALATE"</div>
                  <div>score = 2</div>
                  <div className="mt-2">Alignment:</div>
                  <div>PALETTE</div>
                  <div>PAL-ATE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* CTA */}
      <motion.section 
        className="py-12 px-4 mt-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Ready to dive deeper?
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Explore our interactive presentation and demos to understand these powerful algorithms.
        </p>
        
        <Link
          to="/presentation"
          className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-colors duration-200"
        >
          Start Learning
          <ChevronRight size={20} className="ml-2" />
        </Link>
      </motion.section>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ title, description, icon, delay = 0 }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
        {icon}
      </div>
      
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        {title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </motion.div>
  );
};

export default Home;