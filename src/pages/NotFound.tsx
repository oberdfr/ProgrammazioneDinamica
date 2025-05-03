import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] text-center px-4">
            <h1 className="text-6xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">404</h1>
            <p className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-6">Pagina non trovata</p>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
                La pagina che stai cercando potrebbe essere stata rimossa, rinominata o temporaneamente non disponibile.
            </p>
            <Link
                to="/"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
            >
                Torna alla Home
            </Link>
        </div>
    );
};

export default NotFound; 