import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Vivid Light palette
        'bg': 'var(--bg)',
        'bg-off': 'var(--bg-off)',
        'bg-card': 'var(--bg-card)',
        'violet': 'var(--violet)',
        'violet-2': 'var(--violet-2)',
        'violet-pale': 'var(--violet-pale)',
        'coral': 'var(--coral)',
        'coral-2': 'var(--coral-2)',
        'coral-pale': 'var(--coral-pale)',
        'gold': 'var(--gold)',
        'gold-pale': 'var(--gold-pale)',
        'ink': 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        'muted': 'var(--muted)',
        'border': 'var(--border)',
        'success': '#22c55e',
        'warning': '#D97706',
        /* Compatibility (map old tokens to Vivid Light) */
        'accent-blue': 'var(--violet)',
        'accent-violet': 'var(--violet-2)',
        'accent-cyan': 'var(--coral-2)',
        'accent-emerald': 'var(--gold)',
        'border-subtle': 'var(--border)',
        'text-primary': 'var(--ink)',
        'text-secondary': 'var(--muted)',
        'text-muted': 'var(--muted)',
        'bg-elevated': 'var(--bg-off)',
        'bg-hover': 'var(--bg-off)',
        'border-default': 'var(--border)',
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #2f81f7 0%, #a855f7 100%)',
        'gradient-card': 'linear-gradient(180deg, rgba(47,129,247,0.05) 0%, transparent 100%)',
        'gradient-text': 'linear-gradient(90deg, #f0f6fc 0%, #8b949e 100%)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Syne', 'sans-serif'],
        body: ['var(--font-body)', 'Instrument Sans', 'sans-serif'],
        sans: ['var(--font-body)', 'Instrument Sans', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'h1': ['clamp(2rem, 4vw, 3.5rem)', {}],
        'h2': ['clamp(1.5rem, 3vw, 2.25rem)', {}],
        'h3': ['clamp(1.125rem, 2vw, 1.5rem)', {}],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.7' }],
        'mono': ['0.875rem', {}],
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '48': '48px',
        '64': '64px',
        '96': '96px',
        '128': '128px',
        '192': '192px',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'violet': 'var(--shadow-violet)',
        'coral': 'var(--shadow-coral)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': 'var(--radius-lg)',
        'xl': '24px',
        'full': 'var(--radius-pill)',
        'radius': 'var(--radius)',
        'radius-pill': 'var(--radius-pill)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s infinite',
        'float': 'float 8s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite',
        'gradient-x': 'gradientX 8s ease infinite',
        'gradient-rotate': 'gradientRotate 15s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)', filter: 'blur(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0px)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(47, 129, 247, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(47, 129, 247, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradientRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
