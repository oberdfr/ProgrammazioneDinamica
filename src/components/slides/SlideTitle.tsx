// components/slides/SlideTitle.jsx
import React from 'react';
import Slide from '../layout/Slide';
import { motion } from 'framer-motion';

const SlideTitle = ({ id, active }) => {
  return (
    <Slide 
      id={id}
      title="Programmazione Dinamica II: Allineamento di Sequenze"
      subtitle="Dal Concetto all'Ottimizzazione dello Spazio con Hirschberg"
      active={active}
      backgroundColor="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-indigo-900"
    >
      <div className="flex flex-col items-center justify-center h-full">
        <motion.div 
          className="mb-8 flex justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="p-6 bg-white dark:bg-slate-700 rounded-lg shadow-lg">
            <svg width="180" height="120" viewBox="0 0 180 120" className="mx-auto">
              <g stroke="currentColor" strokeWidth="2" fill="none" className="text-indigo-500 dark:text-indigo-400">
                <rect x="10" y="10" width="160" height="100" rx="5" />
                <line x1="40" y1="30" x2="140" y2="30" />
                <line x1="40" y1="50" x2="120" y2="50" />
                <line x1="40" y1="70" x2="130" y2="70" />
                <line x1="40" y1="90" x2="110" y2="90" />
                
                <path d="M40,30 L40,90 M60,30 L60,90 M80,30 L80,90 M100,30 L100,90 M120,30 L120,90 M140,30 L140,90" strokeDasharray="2,2" />
                
                <circle cx="60" cy="50" r="3" fill="currentColor" />
                <circle cx="80" cy="70" r="3" fill="currentColor" />
                <circle cx="100" cy="90" r="3" fill="currentColor" />
                <circle cx="120" cy="70" r="3" fill="currentColor" />
                <circle cx="140" cy="50" r="3" fill="currentColor" />
                
                <path d="M60,50 L80,70 L100,90 L120,70 L140,50" strokeWidth="3" className="text-blue-500 dark:text-blue-400" />
              </g>
            </svg>
          </div>
        </motion.div>
        
        <motion.div 
          className="text-center space-y-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Presentato da: [Nome dell'Autore]
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Fonte: Lecture slides by Kevin Wayne, Copyright © 2005 Pearson-Addison Wesley
            <br />
            (basato su Kleinberg & Tardos, Algorithm Design)
          </p>
        </motion.div>
      </div>
    </Slide>
  );
};

export default SlideTitle;