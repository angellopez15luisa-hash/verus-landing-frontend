// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      borderRadius: {
        'none': '0px',
        'sm': '4px',
        DEFAULT: '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        'full': '9999px',
        'button': '8px'
      },
      colors: {
        primary: '#0066cc',
        secondary: '#1a3a52',
        lightblue: '#e6f2ff',
        navy: {
          800: "#1e293b",
          900: "#0f172a",
          950: "#090d16",
        },
        verus: {
          primary: '#0E3A5C',
          dark: '#082A43',
          gold: '#B9812A',
          red: '#AE3B2C',
          bg: '#EFF4F2',
          icons: '#026AA2',
        },
        vblue: {
          500: "#0284c7",
          600: "#026aa2",
          700: "#035380",
        },
        vaccent: {
          500: "#f97316",
          600: "#ea580c",
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
        pacifico: ['Pacifico', 'serif']
      }
    }
  },
  plugins: [],
} satisfies Config