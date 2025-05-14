/** @type {import('tailwindcss').Config} */
const daisyui = require('daisyui');

module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['light', 'dark', 'forest', 'dracula', 'cupcake', 'synthwave', 'corporate'], // Forzamos temas visibles
  },
  safelist: [
    'btn',
    'btn-primary',
    'btn-secondary',
    'btn-accent',
    'bg-base-100',
    'text-base-content',
    'card',
    'shadow-xl',
    'alert',
    'alert-info',
    'alert-success'
  ],
};
