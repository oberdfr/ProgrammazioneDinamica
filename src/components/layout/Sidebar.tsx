// components/layout/Sidebar.jsx
import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronDown, Presentation, Code, BookOpen, Home, Info } from 'lucide-react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { slides, allNavItems } from '../../config/siteConfig';

// Define theme context type
interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme?: () => void;
}

// Define props for sidebar components
interface SidebarLinkProps {
    children: React.ReactNode;
    to: string;
    icon: React.ReactNode;
    currentPath: string;
}

interface SidebarIconOnlyProps {
    to: string;
    icon: React.ReactNode;
    currentPath: string;
}

interface ExpandedSections {
    presentation: boolean;
    project: boolean;
}

// Helper to get the correct icon component based on icon name
const getIconComponent = (iconName: string | undefined, size = 18) => {
    switch (iconName) {
        case 'Home':
            return <Home size={size} />;
        case 'Presentation':
            return <Presentation size={size} />;
        case 'Code':
            return <Code size={size} />;
        case 'BookOpen':
            return <BookOpen size={size} />;
        case 'Info':
            return <Info size={size} />;
        default:
            return <Info size={size} />;
    }
};

const Sidebar = () => {
    const { isDarkMode } = useContext(ThemeContext) as ThemeContextType;
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(true);
    const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
        presentation: true,
        project: false
    });

    const toggleSection = (section: keyof ExpandedSections) => {
        setExpandedSections({
            ...expandedSections,
            [section]: !expandedSections[section]
        });
    };

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

            <aside className={`${sidebarClasses} hidden sm:block h-[calc(100vh-4rem)] fixed top-16 bg-white dark:bg-slate-800 shadow-md transition-colors duration-300 overflow-hidden`}>
                <div className={`h-full overflow-y-auto ${isOpen ? 'px-3 py-4' : 'py-4'}`}>
                    {isOpen ? (
                        <nav className="space-y-1">
                            {/* Home link */}
                            {allNavItems.map((item) => {
                                // Handle presentation section differently
                                if (item.title === 'Presentation') {
                                    return (
                                        <div key={item.path}>
                                            <button
                                                className={`w-full flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${location.pathname.includes('/presentation')
                                                    ? 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30'
                                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30'
                                                    }`}
                                                onClick={() => toggleSection('presentation')}
                                            >
                                                <div className="flex items-center">
                                                    <span className="mr-3">{getIconComponent(item.icon)}</span>
                                                    <span>{item.title}</span>
                                                </div>
                                                {expandedSections.presentation ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                            </button>

                                            {expandedSections.presentation && (
                                                <div className="ml-6 mt-1 space-y-1">
                                                    {slides.map((slide, index) => (
                                                        <Link
                                                            key={slide.id}
                                                            to={slide.path || `/presentation#${slide.id}`}
                                                            className={`block px-2 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 ${location.hash === `#${slide.id}`
                                                                ? 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30'
                                                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30'
                                                                }`}
                                                        >
                                                            {index + 1}. {slide.title}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                } else {
                                    return (
                                        <SidebarLink
                                            key={item.path}
                                            to={item.path}
                                            icon={getIconComponent(item.icon)}
                                            currentPath={location.pathname}
                                        >
                                            {item.title}
                                        </SidebarLink>
                                    );
                                }
                            })}
                        </nav>
                    ) : (
                        <nav className="flex flex-col items-center space-y-4">
                            {allNavItems.map((item) => (
                                <SidebarIconOnly
                                    key={item.path}
                                    to={item.path}
                                    icon={getIconComponent(item.icon, 20)}
                                    currentPath={location.pathname}
                                />
                            ))}
                        </nav>
                    )}
                </div>
            </aside>
        </>
    );
};

const SidebarLink = ({ children, to, icon, currentPath }: SidebarLinkProps) => {
    const isActive = currentPath === to;
    return (
        <Link
            to={to}
            className={`flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${isActive
                ? 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30'
                }`}
        >
            <span className="mr-3">{icon}</span>
            {children}
        </Link>
    );
};

const SidebarIconOnly = ({ to, icon, currentPath }: SidebarIconOnlyProps) => {
    const isActive = currentPath === to;
    return (
        <Link
            to={to}
            className={`p-2 rounded-md transition-colors duration-200 ${isActive
                ? 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30'
                }`}
        >
            {icon}
        </Link>
    );
};

export default Sidebar;