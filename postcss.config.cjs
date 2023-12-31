const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

// const postcssPresetEnv = require('postcss-preset-env'); // Tailwind handles nesing..

const config = {
    plugins: {
        // Tailwind handles nesing..
        // postcssPresetEnv({
        //     features: { 'nesting-rules': true },
        // }),
        'tailwindcss/nesting': {},
        //Some plugins, like tailwindcss/nesting, need to run before Tailwind,
        'tailwindcss': tailwindcss(),
        //But others, like autoprefixer, need to run after,
        'autoprefixer': autoprefixer,

    },
};

module.exports = config;
