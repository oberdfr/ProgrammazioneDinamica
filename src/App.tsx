// App.jsx - Componente principale
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componenti di layout
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

// Pagine
import Home from './pages/Home';
import Presentation from './pages/Presentation';
import Demo from './pages/Demo';
//import Project from './pages/Project';
//import About from './pages/About';

// Tema e stile globale
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          <Navbar />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-4 sm:p-6 md:p-8">
              <Routes>
                <Route path="/" element={<Home />} />
                               <Route path="/presentation" element={<Presentation />} /> 
                               <Route path="/demo" element={<Demo />} /> 
                {/* <Route path="/project" element={<Project />} />*/}
                {/* <Route path="/about" element={<About />} />*/}
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
    </ThemeProvider>
  );
}

export default App;