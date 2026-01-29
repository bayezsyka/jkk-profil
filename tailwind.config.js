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
                // JKK Brand Colors - diambil dari logo
                'jkk': {
                    'primary': '#667BA3',      // Biru keabuan terang - warna batang logo
                    'primary-dark': '#526086', // Biru keabuan gelap - variasi
                    'primary-darker': '#4A5678', // Biru keabuan lebih gelap
                    'accent': '#3D3532',       // Coklat gelap - swoosh logo
                    'light': '#fdfdfe',        // Putih bersih - background
                    'dark': '#2D2926',         // Coklat sangat gelap - text
                },
                // Alias untuk kemudahan penggunaan
                'primary': '#667BA3',
                'primary-dark': '#526086',
                'secondary': '#4A5678',
                'accent': '#3D3532',
                'dark': '#2D2926',
                'light': '#fdfdfe',
            },
            fontFamily: {
                'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
