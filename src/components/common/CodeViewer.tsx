// components/common/CodeViewer.jsx
import React, { useState, useEffect } from 'react';
import { Clipboard, Check, ChevronDown, ChevronUp, Play, Pause, Maximize2, Minimize2, ZoomIn, ZoomOut } from 'lucide-react';
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  
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

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 1, 24)); // Max 24px
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 1, 10)); // Min 10px
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Close fullscreen when pressing ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Prevent body scrolling when in fullscreen mode
  useEffect(() => {
    if (isFullscreen) {
      // Disable scrolling on the body when fullscreen is active
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when exiting fullscreen
      document.body.style.overflow = '';
    }
    
    return () => {
      // Cleanup function to ensure scrolling is re-enabled
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  const renderCodeViewer = () => (
    <motion.div 
      className={`rounded-lg overflow-hidden shadow-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 mb-6 ${
        isFullscreen ? 'fixed inset-0 z-50 m-4 flex flex-col' : 'relative'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      layout
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
          {/* Zoom Controls */}
          <div className="flex items-center space-x-1 bg-gray-200 dark:bg-slate-600 rounded-md p-0.5">
            <button
              onClick={decreaseFontSize}
              className="p-1 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-300 dark:hover:bg-slate-500 transition-colors duration-200"
              aria-label="Decrease font size"
              disabled={fontSize <= 10}
            >
              <ZoomOut size={16} />
            </button>
            <span className="text-xs text-gray-700 dark:text-gray-200 px-1">
              {fontSize}px
            </span>
            <button
              onClick={increaseFontSize}
              className="p-1 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-300 dark:hover:bg-slate-500 transition-colors duration-200"
              aria-label="Increase font size"
              disabled={fontSize >= 24}
            >
              <ZoomIn size={16} />
            </button>
          </div>
          
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
            {isCopied ? <Check size={16} /> : <Clipboard size={18} />}
          </button>
          
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-200"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>

        </div>
      </div>
      
      {/* Code Container - Use flex-1 to allow it to expand and scroll properly in fullscreen */}
      <div className={`relative overflow-auto flex-1 ${isFullscreen ? 'h-full' : ''}`}>
        <SyntaxHighlighter
          language={language}
          style={isDarkMode ? atomOneDark : atomOneLight}
          wrapLines={true}
          showLineNumbers={true}
          customStyle={{
            margin: 0,
            padding: '1rem',
            fontSize: `${fontSize}px`,
            lineHeight: '1.5',
            borderRadius: '0',
            height: isFullscreen ? '100%' : undefined,
            overflow: 'auto'
          }}
          codeTagProps={{
            style: {
              display: 'block'
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
        
        {!isFullscreen && (
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

  return (
    <>
      {isFullscreen ? (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          {renderCodeViewer()}
        </div>
      ) : (
        renderCodeViewer()
      )}
    </>
  );
};

export default CodeViewer;