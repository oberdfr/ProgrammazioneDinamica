import SlideTitle from '../components/slides/SlideTitle';
import SlideDPIntro from '../components/slides/SlideDPIntro';
import SlideStringSimilarity from '../components/slides/SlideStringSimilarity';
import SlideEditDistance from '../components/slides/SlideEditDistance';
import SlideAlignmentFormal from '../components/slides/SlideAlignmentFormal';
import SlideDPSolution from '../components/slides/SlideDPSolution';
import SlideBottomUp from '../components/slides/SlideBottomUp';
import SlideExample from '../components/slides/SlideExample';
import SlideAnalysis from '../components/slides/SlideAnalysis';
import SlideHirschberg from '../components/slides/SlideHirschberg';
import SlideApplications from '../components/slides/SlideApplications';
import SlideSummary from '../components/slides/SlideSummary';
import SlideHistoryDP from '../components/slides/SlideHistoryDP';
import SlideNetworkDP from '../components/slides/SlideNetworkDP';
import SlideNetworkDetailsDP from '../components/slides/SlideNetworkDetailsDP';

// Define slide structure
export interface SlideConfig {
    id: string;
    title: string;
    component: React.ComponentType<{ id: string; active: boolean }>;
    path?: string;
}

// Define navigation item structure
export interface NavItem {
    title: string;
    path: string;
    icon?: string; // Icon identifier
}

// Central configuration for slides
export const slides: SlideConfig[] = [
    {
        id: 'slide1',
        title: 'Introduction',
        component: SlideTitle,
        path: '/presentation#slide1'
    },
    {
        id: 'slide2',
        title: 'Dynamic Programming Introduction',
        component: SlideDPIntro,
        path: '/presentation#slide2'
    },
    {
        id: 'slide3',
        title: 'Storia della Programmazione Dinamica',
        component: SlideHistoryDP,
        path: '/presentation#slide3'
    },
    {
        id: 'slide4',
        title: 'Allineamento di Sequenze nelle Reti',
        component: SlideNetworkDP,
        path: '/presentation#slide4'
    },
    {
        id: 'slide5',
        title: 'Tecniche di Allineamento nelle Reti',
        component: SlideNetworkDetailsDP,
        path: '/presentation#slide5'
    },
    {
        id: 'slide6',
        title: 'String Similarity',
        component: SlideStringSimilarity,
        path: '/presentation#slide6'
    },
    {
        id: 'slide7',
        title: 'Edit Distance',
        component: SlideEditDistance,
        path: '/presentation#slide7'
    },
    {
        id: 'slide8',
        title: 'Formal Alignment',
        component: SlideAlignmentFormal,
        path: '/presentation#slide8'
    },
    {
        id: 'slide9',
        title: 'DP Solution',
        component: SlideDPSolution,
        path: '/presentation#slide9'
    },
    {
        id: 'slide10',
        title: 'Bottom-Up Approach',
        component: SlideBottomUp,
        path: '/presentation#slide10'
    },
    {
        id: 'slide11',
        title: 'Example',
        component: SlideExample,
        path: '/presentation#slide11'
    },
    {
        id: 'slide12',
        title: 'Analysis',
        component: SlideAnalysis,
        path: '/presentation#slide12'
    },
    {
        id: 'slide13',
        title: 'Hirschberg Algorithm',
        component: SlideHirschberg,
        path: '/presentation#slide13'
    },
    {
        id: 'slide14',
        title: 'Applications',
        component: SlideApplications,
        path: '/presentation#slide14'
    },
    {
        id: 'slide15',
        title: 'Summary',
        component: SlideSummary,
        path: '/presentation#slide15'
    }
];

// Helper function to get slide IDs
export const getSlideIds = (): string[] => {
    return slides.map(slide => slide.id);
};

// Main navigation items
export const mainNavItems = [
    { title: 'Home', path: '/' },
    { title: 'Presentation', path: '/presentation' },
    { title: 'Interactive Demo', path: '/demo' }
];

// Full navigation items including those for sidebar
export const allNavItems = [
    { title: 'Home', path: '/', icon: 'Home' },
    { title: 'Presentation', path: '/presentation', icon: 'Presentation' },
    { title: 'Interactive Demo', path: '/demo', icon: 'Code' },
]; 