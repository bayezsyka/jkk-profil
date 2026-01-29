/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
        './resources/js/**/*.ts',
    ],
    theme: {
        extend: {
            colors: {
                // JKK Brand Colors
                'jkk': {
                    'primary': '#59658c',      // Biru keabuan - warna utama
                    'light': '#fdfdfe',        // Putih bersih - background
                    'dark': '#322c2b',         // Coklat gelap - text
                    'secondary': '#003366',    // Biru gelap - accent
                },
                // Alias untuk kemudahan penggunaan
                'primary': '#59658c',
                'secondary': '#003366',
                'dark': '#322c2b',
                'light': '#fdfdfe',
            },
            fontFamily: {
                'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
