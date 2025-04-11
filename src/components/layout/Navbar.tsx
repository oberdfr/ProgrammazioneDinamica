// components/layout/Navbar.jsx
import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className="bg-white dark:bg-slate-800 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  DynAlign
                </span>
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink to="/" currentPath={location.pathname}>Home</NavLink>
              <NavLink to="/presentation" currentPath={location.pathname}>Presentation</NavLink>
              <NavLink to="/demo" currentPath={location.pathname}>Interactive Demo</NavLink>
              <NavLink to="/project" currentPath={location.pathname}>Project</NavLink>
              <NavLink to="/about" currentPath={location.pathname}>About</NavLink>
            </div>
          </div>
          
          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white focus:outline-none transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {/* Mobile menu button */}
            <div className="sm:hidden ml-3">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white focus:outline-none"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          <MobileNavLink to="/" currentPath={location.pathname}>Home</MobileNavLink>
          <MobileNavLink to="/presentation" currentPath={location.pathname}>Presentation</MobileNavLink>
          <MobileNavLink to="/demo" currentPath={location.pathname}>Interactive Demo</MobileNavLink>
          <MobileNavLink to="/project" currentPath={location.pathname}>Project</MobileNavLink>
          <MobileNavLink to="/about" currentPath={location.pathname}>About</MobileNavLink>
        </div>
      </div>
    </nav>
  );
};

// Desktop Navigation Link
const NavLink = ({ children, to, currentPath }) => {
  const isActive = currentPath === to;
  return (
    <Link
      to={to}
      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-16 transition-colors duration-200 ${
        isActive
          ? 'border-indigo-500 text-gray-900 dark:text-white'
          : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-100'
      }`}
    >
      {children}
    </Link>
  );
};

// Mobile Navigation Link
const MobileNavLink = ({ children, to, currentPath }) => {
  const isActive = currentPath === to;
  return (
    <Link
      to={to}
      className={`block pl-3 pr-4 py-2 text-base font-medium transition-colors duration-200 ${
        isActive
          ? 'bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-500 text-indigo-700 dark:text-indigo-300'
          : 'border-l-4 border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-white'
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;