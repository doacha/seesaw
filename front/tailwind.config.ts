import type { Config } from 'tailwindcss'
import { categoryColors } from './app/lib/constants'
const colors = require('tailwindcss/colors')

const config: Config = {
  mode: 'jit',

  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(70px)' },
          '100%': { transform: 'traslateY(0)' },
        },
        heartBeat: {
          '0%': { transform: 'scale(0);' },
          '30%': { transform: 'scale(1);' },
          '60%': { transform: 'scale(1);' },
        },
      },
      animation: {
        heartBeat: 'heartBeat 3s',
        slideUp: 'slideUp 1s ease-in-out 1',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: '#001B2A',
        white: colors.white,
        gray: '#C7C7C7',
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
        slate: colors.slate,
        zinc: colors.zinc,
        neutral: colors.neutral,
        stone: colors.stone,
        red: colors.red,
        orange: colors.orange,
        amber: colors.amber,
        lime: colors.lime,
        green: colors.green,
        teal: colors.teal,
        cyan: colors.cyan,
        sky: colors.sky,
        blue: colors.blue,
        violet: colors.violet,
        fuchsia: colors.fuchsia,
        pink: colors.pink,
        rose: colors.rose,

        primary: '#7091F5',
        'primary-container': '#C6D3FB',
        secondary: '#B0D44D',
        'secondary-container': '#DFEEB8',
        error: '#ED3A50',
        'error-container': '#FFD0D0',
        'point-pink': '#FFD1BF',
        // neutral: '#2b3440',
        'background-fill': '#F3F4F8',
        background: '#FFFFFF',
        outline: '#787D85',
        'outline-container': '#DCE1E9',
        surface: '#001B2A',
        'seesaw-blue-100': '#E2E9FD',
        'seesaw-red-100': '#FFE8DF',
        'seesaw-purple-600': '#6132B2',
        'seesaw-red-700': '#99543A',
        ...categoryColors,
      },
      fontFamily: {
        // 👇 Add CSS variables
        envR: ['var(--font-environmentR)'],
        scDreamLight: ['var(--font-SCDream-Light)'],
        scDreamRegular: ['var(--font-SCDream-Regular)'],
        scDreamMedium: ['var(--font-SCDream-Medium)'],
        scDreamExBold: ['var(--font-SCDream-ExBold)'],
        robotoM: ['var(--font-roboto-Middle)'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#7091F5',
          'primary-container': '#C6D3FB',
          secondary: '#B0D44D',
          'secondary-container': '#DFEEB8',
          error: '#ED3A50',
          'error-container': '#FFD0D0',
          'point-pink': '#FFD1BF',
          neutral: '#2b3440',
          'background-fill': '#F3F4F8',
          background: '#FAFCFF',
          outline: '#787D85',
          'outline-container': '#DCE1E9',
          surface: '#001B2A',
        },
      },
    ],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    rtl: false,
    prefix: '',
    logs: true,
  },
}
export default config
