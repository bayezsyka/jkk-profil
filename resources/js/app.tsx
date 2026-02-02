import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'JKK';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        // Eager load Welcome/Index for faster LCP
        const eagerPages = import.meta.glob('./Pages/Welcome/Index.tsx', { eager: true });
        const eagerPage = eagerPages[`./Pages/${name}.tsx`] || eagerPages[`./Pages/${name}/Index.tsx`];
        
        if (eagerPage) {
            return (eagerPage as any).default;
        }

        // Lazy load all other pages
        const pages = import.meta.glob('./Pages/**/*.tsx');
        const page = pages[`./Pages/${name}.tsx`] || pages[`./Pages/${name}/Index.tsx`];

        if (!page) {
            throw new Error(`Page not found: ${name}`);
        }

        return page().then((module: any) => module.default);
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#0B2B5A',
    },
});
