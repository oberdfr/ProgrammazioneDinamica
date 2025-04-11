// components/common/CodeViewer.jsx
import React, { useState } from 'react';
import { Clipboard, Check, ChevronDown, ChevronUp, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ThemeContext } from '../../contexts/ThemeContext';

const CodeViewer = ({ 
  code, 
  language = 'javascript', 
  title = 'Code Snippet',
  runnable = false,
  onRun = () => {},
  visualizer = null,
  explanation = '',
  outputExample = ''
}) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  const [isCopied, setIsCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  const handleRun = () => {
    if (runnable) {
      setIsPlaying(!isPlaying);
      onRun(isPlaying);
    }
  };

  return (
    <motion.div 
      className="rounded-lg overflow-hidden shadow-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-slate-700 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{title}</span>
          <span className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-300">
            {language}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {runnable && (
            <button
              onClick={handleRun}
              className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-200"
              aria-label={isPlaying ? "Pause execution" : "Run code"}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
          )}
          
          {explanation && (
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-200"
              aria-label="Show explanation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </button>
          )}
          
          <button
            onClick={copyToClipboard}
            className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-200"
            aria-label="Copy code"
          >
            {isCopied ? <Check size={16} /> : <Clipboard size={16} />}
          </button>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-200"
            aria-label={isExpanded ? "Collapse code" : "Expand code"}
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>
      
      {/* Code Container */}
      <div className={`relative overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-screen' : 'max-h-96'}`}>
        <SyntaxHighlighter
          language={language}
          style={isDarkMode ? atomOneDark : atomOneLight}
          wrapLines={true}
          showLineNumbers={true}
          customStyle={{
            margin: 0,
            padding: '1rem',
            fontSize: '0.9rem',
            borderRadius: '0',
            maxHeight: isExpanded ? 'none' : '24rem',
          }}
        >
          {code}
        </SyntaxHighlighter>
        
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-slate-800 to-transparent pointer-events-none"></div>
        )}
      </div>
      
      {/* Visualization Area */}
      {visualizer && isPlaying && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-slate-900">
          <div className="font-medium text-sm mb-2 text-gray-700 dark:text-gray-300">Visualization</div>
          {visualizer}
        </div>
      )}
      
      {/* Output Example */}
      {outputExample && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-slate-900">
          <div className="font-medium text-sm mb-2 text-gray-700 dark:text-gray-300">Example Output</div>
          <pre className="text-sm p-3 rounded bg-gray-100 dark:bg-slate-800 overflow-x-auto">
            {outputExample}
          </pre>
        </div>
      )}
      
      {/* Explanation */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div 
            className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-slate-900"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="font-medium text-sm mb-2 text-gray-700 dark:text-gray-300">Explanation</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 prose dark:prose-invert max-w-none">
              {explanation}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CodeViewer;