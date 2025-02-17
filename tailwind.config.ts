import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          700: 'rgb(109, 40, 217)',
          600: 'rgb(124, 58, 237)',
          500: 'rgb(139, 92, 246)',
          400: 'rgb(167, 139, 250)'
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)'
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        serif: 'var(--font-serif)'
      }
    }
  },
  plugins: []
} satisfies Config
