import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import ReactDOMServer from 'react-dom/server';

const appName = import.meta.env.VITE_APP_NAME || 'JKK';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) => {
            const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true });
            const page = pages[`./Pages/${name}.tsx`] || pages[`./Pages/${name}/Index.tsx`];
            
            if (!page) {
                throw new Error(`Page not found: ${name}`);
            }

            // @ts-ignore
            return page.default;
        },
        setup: ({ App, props }) => <App {...props} />,
    })
);
