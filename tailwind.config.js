/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                charcoal: '#353535',
                'purple-dark': '#581B98',
                'purple-light': '#9C1DE7',
                crimson: '#FF073A',
                yellow: '#FFF707',
                offwhite: '#F7F7F7',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Rubik', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};