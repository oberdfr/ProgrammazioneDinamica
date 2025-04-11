// components/common/CodeEditor.jsx
import React, { useState } from 'react';
import { Clipboard, Check, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { useTheme } from 'next-themes';

const CodeEditor = ({ 
  code, 
  language = 'python',
  filename = 'algorithm.py',
  onChange = () => {},
  onRun = () => {},
  isRunning = false
}) => {
  const { theme } = useTheme();
  const [isCopied, setIsCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <motion.div 
      className="rounded-lg overflow-hidden shadow-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-slate-700 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{filename}</span>
          <span className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-300">
            {language}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onRun}
            disabled={isRunning}
            className={`p-1.5 rounded-md transition-colors duration-200 ${
              isRunning 
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-600'
            }`}
            aria-label={isRunning ? "Running..." : "Run code"}
          >
            {isRunning ? <Pause size={16} /> : <Play size={16} />}
          </button>
          
          <button
            onClick={copyToClipboard}
            className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-200"
            aria-label="Copy code"
          >
            {isCopied ? <Check size={16} /> : <Clipboard size={16} />}
          </button>
        </div>
      </div>
      
      {/* Editor */}
      <div className="h-96">
        <Editor
          height="100%"
          defaultLanguage={language}
          language={language}
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
          value={code}
          onChange={onChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
            automaticLayout: true,
            scrollBeyondLastLine: false
          }}
        />
      </div>
    </motion.div>
  );
};

export default CodeEditor;