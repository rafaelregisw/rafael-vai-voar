/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'azul-ceu': '#87CEEB',
        'azul-horizonte': '#5B9BD5',
        'dourado-suave': '#FFD700',
        'branco-nuvem': '#FFFFFF',
        'preto-suave': '#1a1a1a',
        'cinza-suave': '#F5F5F5'
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Crimson Text', 'Georgia', 'serif']
      },
      boxShadow: {
        '3xl': '0 35px 75px rgba(0, 0, 0, 0.35)'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        'gradient': 'gradient-shift 16s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'sky-gradient': 'linear-gradient(to bottom, #87CEEB 0%, #E0F6FF 50%, #FFFFFF 100%)'
      }
    },
  },
  plugins: [],
}

