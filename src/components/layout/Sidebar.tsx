// components/layout/Sidebar.jsx
import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronDown, Presentation, Code, BookOpen, Home, Info } from 'lucide-react';
import { ThemeContext } from '../../contexts/ThemeContext';

const Sidebar = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    presentation: true,
    project: false
  });

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  const presentationItems = [
    { id: 'slide1', title: 'Titolo e Introduzione', path: '/presentation#slide1' },
    { id: 'slide2', title: 'Introduzione alla DP', path: '/presentation#slide2' },
    { id: 'slide3', title: 'Similarità tra Stringhe', path: '/presentation#slide3' },
    { id: 'slide4', title: 'Edit Distance', path: '/presentation#slide4' },
    { id: 'slide5', title: 'Definizione Formale', path: '/presentation#slide5' },
    { id: 'slide6', title: 'Soluzione DP', path: '/presentation#slide6' },
    { id: 'slide7', title: 'Algoritmo Bottom-Up', path: '/presentation#slide7' },
    { id: 'slide8', title: 'Esempio e Traceback', path: '/presentation#slide8' },
    { id: 'slide9', title: 'Analisi Standard', path: '/presentation#slide9' },
    { id: 'slide10', title: 'Algoritmo di Hirschberg', path: '/presentation#slide10' },
    { id: 'slide11', title: 'Divide et Impera', path: '/presentation#slide11' },
    { id: 'slide12', title: 'Analisi di Hirschberg', path: '/presentation#slide12' },
    { id: 'slide13', title: 'Riepilogo', path: '/presentation#slide13' },
    { id: 'slide14', title: 'Proposta di Progetto', path: '/presentation#slide14' },
    { id: 'slide15', title: 'Connessioni Interdisciplinari', path: '/presentation#slide15' },
    { id: 'slide16', title: 'Conclusioni', path: '/presentation#slide16' },
    { id: 'slide17', title: 'Domande', path: '/presentation#slide17' }
  ];

  // Handling responsive visibility
  const sidebarClasses = isOpen
    ? 'w-64 transform translate-x-0 transition-all duration-300 ease-in-out'
    : 'w-0 sm:w-12 transform -translate-x-full sm:translate-x-0 transition-all duration-300 ease-in-out';

  return (
    <>
      {/* Sidebar toggle button - visible only on mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed sm:hidden z-40 bottom-4 left-4 p-2 rounded-full bg-indigo-600 text-white shadow-lg transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      >
        <ChevronRight size={24} />
      </button>
    
      <aside className={`${sidebarClasses} hidden sm:block h-screen sticky top-16 bg-white dark:bg-slate-800 shadow-md transition-colors duration-300 overflow-hidden`}>
        <div className={`h-full overflow-y-auto ${isOpen ? 'px-3 py-4' : 'py-4'}`}>
          {isOpen ? (
            <nav className="space-y-1">
              <SidebarLink to="/" icon={<Home size={18} />} currentPath={location.pathname}>
                Home
              </SidebarLink>
              
              <div>
                <button
                  className={`w-full flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    location.pathname.includes('/presentation')
                      ? 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30'
                  }`}
                  onClick={() => toggleSection('presentation')}
                >
                  <div className="flex items-center">
                    <Presentation size={18} className="mr-3" />
                    <span>Presentation</span>
                  </div>
                  {expandedSections.presentation ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                
                {expandedSections.presentation && (
                  <div className="ml-6 mt-1 space-y-1">
                    {presentationItems.map(item => (
                      <Link
                        key={item.id}
                        to={item.path}
                        className={`block px-2 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 ${
                          location.hash === `#${item.id}`
                            ? 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30'
                        }`}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              <SidebarLink to="/demo" icon={<Code size={18} />} currentPath={location.pathname}>
                Interactive Demo
              </SidebarLink>
              
              <SidebarLink to="/project" icon={<BookOpen size={18} />} currentPath={location.pathname}>
                Project
              </SidebarLink>
              
              <SidebarLink to="/about" icon={<Info size={18} />} currentPath={location.pathname}>
                About
              </SidebarLink>
            </nav>
          ) : (
            <nav className="flex flex-col items-center space-y-4">
              <SidebarIconOnly to="/" icon={<Home size={20} />} currentPath={location.pathname} />
              <SidebarIconOnly to="/presentation" icon={<Presentation size={20} />} currentPath={location.pathname} />
              <SidebarIconOnly to="/demo" icon={<Code size={20} />} currentPath={location.pathname} />
              <SidebarIconOnly to="/project" icon={<BookOpen size={20} />} currentPath={location.pathname} />
              <SidebarIconOnly to="/about" icon={<Info size={20} />} currentPath={location.pathname} />
            </nav>
          )}
        </div>
      </aside>
    </>
  );
};

const SidebarLink = ({ children, to, icon, currentPath }) => {
  const isActive = currentPath === to;
  return (
    <Link
      to={to}
      className={`flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
        isActive
          ? 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30'
      }`}
    >
      <span className="mr-3">{icon}</span>
      {children}
    </Link>
  );
};

const SidebarIconOnly = ({ to, icon, currentPath }) => {
  const isActive = currentPath === to;
  return (
    <Link
      to={to}
      className={`p-2 rounded-md transition-colors duration-200 ${
        isActive
          ? 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30'
      }`}
    >
      {icon}
    </Link>
  );
};

export default Sidebar;