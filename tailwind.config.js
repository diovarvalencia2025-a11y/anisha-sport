/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#070707',
        surface: '#111111',
        'surface-elevated': '#1A1A1A',
        'surface-border': '#262626',
        primary: {
          DEFAULT: '#FFFFFF',
          dark: '#E5E5E5',
          muted: '#8E8E93'
        },
        volt: {
          DEFAULT: '#CCFF00',
          dark: '#A6CF00',
          glow: 'rgba(204, 255, 0, 0.35)'
        },
        crimson: {
          DEFAULT: '#FF2A4B',
          glow: 'rgba(255, 42, 75, 0.35)'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Syne"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      letterSpacing: {
        'ultra-wide': '0.3em',
        'mega-wide': '0.5em'
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 25s linear infinite',
        'float': 'float 6s ease-in-out infinite'
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    },
  },
  plugins: [],
}
