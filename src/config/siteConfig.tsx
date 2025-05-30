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
        title: 'Copertina',
        component: SlideTitle,
        path: '/presentation#slide1'
    },
    {
        id: 'slide2',
        title: 'Introduzione',
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
        title: 'Similarità tra stringhe',
        component: SlideStringSimilarity,
        path: '/presentation#slide4'
    },
    {
        id: 'slide5',
        title: 'Edit Distance',
        component: SlideEditDistance,
        path: '/presentation#slide5'
    },
    {
        id: 'slide6',
        title: 'Definizione formale',
        component: SlideAlignmentFormal,
        path: '/presentation#slide6'
    },
    {
        id: 'slide7',
        title: 'Sottostruttura',
        component: SlideDPSolution,
        path: '/presentation#slide7'
    },
    {
        id: 'slide8',
        title: 'ApproccioBottom-Up',
        component: SlideBottomUp,
        path: '/presentation#slide8'
    },
    {
        id: 'slide9',
        title: 'Esempio allineamento ottimale',
        component: SlideExample,
        path: '/presentation#slide9'
    },
    {
        id: 'slide10',
        title: 'Valutazione delle performance',
        component: SlideAnalysis,
        path: '/presentation#slide10'
    },
    {
        id: 'slide11',
        title: 'Algoritmo di Hirschberg',
        component: SlideHirschberg,
        path: '/presentation#slide11'
    },
    {
        id: 'slide12',
        title: 'Allineamento di Sequenze nelle Reti',
        component: SlideNetworkDP,
        path: '/presentation#slide12'
    },
    {
        id: 'slide13',
        title: 'Tecniche di Allineamento nelle Reti',
        component: SlideNetworkDetailsDP,
        path: '/presentation#slide13'
    },
];

// Helper function to get slide IDs
export const getSlideIds = (): string[] => {
    return slides.map(slide => slide.id);
};

// Main navigation items
export const mainNavItems = [
    { title: 'Presentation', path: '/presentation' },
    { title: 'Interactive Demo', path: '/demo' }
];

// Full navigation items including those for sidebar
export const allNavItems = [
    { title: 'Presentation', path: '/presentation', icon: 'Presentation' },
    { title: 'Interactive Demo', path: '/demo', icon: 'Code' },
]; 