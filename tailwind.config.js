import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        // Covers: Components, Layouts, Pages, and any other subdirectories in js
        './resources/js/**/*.{js,jsx,ts,tsx}', 
    ],
    theme: {
        extend: {
            colors: {
                'jkk': {
                    'primary': '#667BA3',      
                    'primary-dark': '#526086', 
                    'primary-darker': '#4A5678', 
                    'accent': '#3D3532',       
                    'light': '#fdfdfe',        
                    'dark': '#2D2926',         
                },
                'primary': '#667BA3',
                'primary-dark': '#526086',
                'secondary': '#4A5678',
                'accent': '#3D3532',
                'dark': '#2D2926',
                'light': '#fdfdfe',
            },
            fontFamily: {
                'sans': ['Inter', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [
        forms,
        require('@tailwindcss/typography'),
    ],
};