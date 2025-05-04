// App.jsx - Componente principale
import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Presentation from './pages/Presentation';
import Demo from './pages/Demo';
import NotFound from './pages/NotFound';

const App = () => {
    const location = useLocation();
    const showSidebar = true;

    return (
        <ThemeProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
                <Navbar />

                <div className="flex">
                    {showSidebar && <Sidebar />}

                    <main className={`flex-1 p-4 ${showSidebar ? 'sm:ml-64' : ''}`}>
                        <Routes>
                            <Route path="/" element={<Navigate to="/presentation" replace />} />
                            <Route path="/presentation" element={<Presentation />} />
                            <Route path="/demo" element={<Demo />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default App;