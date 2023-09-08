import type { Config } from 'tailwindcss'
import {categoryColors} from './app/lib/constants'
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
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
      fontFamily: {
        // 👇 Add CSS variables
        envR: ['var(--font-environmentR)'],
        scDreamLight: ['var(--font-SCDream-Light)'],
        scDreamRegular: ['var(--font-SCDream-Regular)'],
        scDreamMedium: ['var(--font-SCDream-Medium)'],
        scDreamExBold: ['var(--font-SCDream-ExBold)'],
      },
      colors: {
        ...categoryColors
      }
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
