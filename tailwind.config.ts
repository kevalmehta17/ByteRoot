import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        headline: ['Inter', 'sans-serif'], // Updated to Inter
        body: ['Inter', 'sans-serif'],    // Updated to Inter
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)', // This is now 0.75rem, good for rounded-2xl effectively
        md: 'calc(var(--radius) - 2px)', // Will be 0.75rem - 2px
        sm: 'calc(var(--radius) - 4px)', // Will be 0.75rem - 4px
        '2xl': 'calc(var(--radius) * 2)', // For larger rounding like 1.5rem
      },
      boxShadow: {
        'soft-light': '6px 6px 12px hsla(var(--background), 0.6), -6px -6px 12px hsla(0, 0%, 100%, 0.8)', // For light mode neumorphism
        'soft-dark': '6px 6px 12px hsla(var(--background), 0.7), -6px -6px 12px hsla(var(--foreground), 0.05)', // For dark mode neumorphism
        'glow-primary-light': '0 0 15px 3px hsl(var(--primary) / 0.4)',
        'glow-primary-dark': '0 0 20px 5px hsl(var(--primary) / 0.5)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'pulse-strong': { // Existing pulse
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 hsl(var(--primary) / 0.7)' },
          '50%': { transform: 'scale(1.05)', boxShadow: '0 0 0 15px hsl(var(--primary) / 0)' },
        },
        'subtle-slide-up': { // Existing slide up
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-badge': { // New pulse for badges
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '.7', transform: 'scale(1.1)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-strong': 'pulse-strong 2s infinite',
        'subtle-slide-up': 'subtle-slide-up 0.5s ease-out forwards',
        'pulse-badge': 'pulse-badge 1.5s infinite ease-in-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
