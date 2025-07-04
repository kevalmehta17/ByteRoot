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
				headline: [
					'Inter',
					'sans-serif'
				],
				body: [
					'Inter',
					'sans-serif'
				],
				code: [
					'monospace'
				]
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'gradient-rainbow': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				'gradient-sunset': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
				'gradient-ocean': 'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)',
				'gradient-forest': 'linear-gradient(135deg, #134E5E 0%, #71B280 100%)',
				'gradient-fire': 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)',
				'gradient-aurora': 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
				'gradient-medical': 'linear-gradient(135deg, hsl(158, 85%, 45%) 0%, hsl(180, 85%, 55%) 50%, hsl(200, 85%, 65%) 100%)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'2xl': 'calc(var(--radius) * 2)',
				'3xl': 'calc(var(--radius) * 3)',
				'4xl': 'calc(var(--radius) * 4)'
			},
			boxShadow: {
				'soft-light': '6px 6px 12px hsla(var(--background), 0.6), -6px -6px 12px hsla(0, 0%, 100%, 0.8)',
				'soft-dark': '6px 6px 12px hsla(var(--background), 0.7), -6px -6px 12px hsla(var(--foreground), 0.05)',
				'glow-primary-light': '0 0 15px 3px hsl(var(--primary) / 0.4)',
				'glow-primary-dark': '0 0 20px 5px hsl(var(--primary) / 0.5)',
				'glow-sm': '0 0 10px 2px hsl(var(--primary) / 0.3)',
				'glow-md': '0 0 20px 4px hsl(var(--primary) / 0.4)',
				'glow-lg': '0 0 30px 6px hsl(var(--primary) / 0.5)',
				'glow-xl': '0 0 40px 8px hsl(var(--primary) / 0.6)',
				'glow-2xl': '0 0 50px 10px hsl(var(--primary) / 0.7)',
				'inner-glow': 'inset 0 0 20px hsl(var(--primary) / 0.2)',
				'neon': '0 0 5px hsl(var(--primary)), 0 0 10px hsl(var(--primary)), 0 0 15px hsl(var(--primary)), 0 0 20px hsl(var(--primary))',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-strong': {
					'0%, 100%': {
						transform: 'scale(1)',
						boxShadow: '0 0 0 0 hsl(var(--primary) / 0.7)'
					},
					'50%': {
						transform: 'scale(1.05)',
						boxShadow: '0 0 0 15px hsl(var(--primary) / 0)'
					}
				},
				slideUp: {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				'subtle-slide-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'pulse-badge': {
					'0%, 100%': {
						opacity: '1',
						transform: 'scale(1)'
					},
					'50%': {
						opacity: '.7',
						transform: 'scale(1.1)'
					}
				},
				'gradient-x': {
					'0%, 100%': {
						'background-size': '200% 200%',
						'background-position': 'left center'
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'right center'
					}
				},
				'gradient-y': {
					'0%, 100%': {
						'background-size': '200% 200%',
						'background-position': 'center top'
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'center bottom'
					}
				},
				'gradient-xy': {
					'0%, 100%': {
						'background-size': '400% 400%',
						'background-position': 'left center'
					},
					'50%': {
						'background-size': '400% 400%',
						'background-position': 'right center'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'bounce-subtle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' },
				},
				'wiggle': {
					'0%, 100%': { transform: 'rotate(-2deg)' },
					'50%': { transform: 'rotate(2deg)' },
				},
				'glow-pulse': {
					'0%, 100%': { 
						boxShadow: '0 0 20px hsl(var(--primary) / 0.4)' 
					},
					'50%': { 
						boxShadow: '0 0 40px hsl(var(--primary) / 0.8)' 
					}
				},
				'scale-in': {
					'0%': { 
						transform: 'scale(0.8)', 
						opacity: '0' 
					},
					'100%': { 
						transform: 'scale(1)', 
						opacity: '1' 
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-strong': 'pulse-strong 2s infinite',
				'pulse-badge': 'pulse-badge 1.5s infinite ease-in-out',
				'subtle-slide-up': 'slideUp 0.5s ease-out',
				'gradient-x': 'gradient-x 15s ease infinite',
				'gradient-y': 'gradient-y 15s ease infinite',
				'gradient-xy': 'gradient-xy 15s ease infinite',
				'float': 'float 3s ease-in-out infinite',
				'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
				'wiggle': 'wiggle 1s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'scale-in': 'scale-in 0.5s ease-out',
			},
			backdropBlur: {
				'xs': '2px',
			},
			scale: {
				'102': '1.02',
				'103': '1.03',
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'128': '32rem',
			}
		}
	},
	plugins: [require('tailwindcss-animate')],
} satisfies Config;
