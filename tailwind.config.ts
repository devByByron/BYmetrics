import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				'border-elevated': 'hsl(var(--border-elevated))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				
				background: {
					DEFAULT: 'hsl(var(--background))',
					elevated: 'hsl(var(--background-elevated))',
					glass: 'hsl(var(--background-glass))'
				},
				foreground: {
					DEFAULT: 'hsl(var(--foreground))',
					muted: 'hsl(var(--foreground-muted))'
				},
				
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					bright: 'hsl(var(--primary-bright))',
					foreground: 'hsl(var(--primary-foreground))',
					glass: 'hsl(var(--primary-glass))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					elevated: 'hsl(var(--secondary-elevated))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					bright: 'hsl(var(--accent-bright))',
					foreground: 'hsl(var(--accent-foreground))',
					glass: 'hsl(var(--accent-glass))'
				},
				
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
					glass: 'hsl(var(--destructive-glass))'
				},
				
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					elevated: 'hsl(var(--muted-elevated))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					elevated: 'hsl(var(--card-elevated))',
					foreground: 'hsl(var(--card-foreground))',
					glass: 'hsl(var(--card-glass))'
				},
				
				sentiment: {
					positive: {
						DEFAULT: 'hsl(var(--sentiment-positive))',
						bright: 'hsl(var(--sentiment-positive-bright))',
						glass: 'hsl(var(--sentiment-positive-glass))',
						glow: 'hsl(var(--sentiment-positive-glow))'
					},
					negative: {
						DEFAULT: 'hsl(var(--sentiment-negative))',
						bright: 'hsl(var(--sentiment-negative-bright))',
						glass: 'hsl(var(--sentiment-negative-glass))',
						glow: 'hsl(var(--sentiment-negative-glow))'
					},
					neutral: {
						DEFAULT: 'hsl(var(--sentiment-neutral))',
						bright: 'hsl(var(--sentiment-neutral-bright))',
						glass: 'hsl(var(--sentiment-neutral-glass))',
						glow: 'hsl(var(--sentiment-neutral-glow))'
					}
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
			
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-primary-glow': 'var(--gradient-primary-glow)',
				'gradient-accent': 'var(--gradient-accent)',
				'gradient-sentiment': 'var(--gradient-sentiment)',
				'gradient-card': 'var(--gradient-card)',
				'gradient-glass': 'var(--gradient-glass)',
				'gradient-elevated': 'var(--gradient-elevated)'
			},
			
			boxShadow: {
				'subtle': 'var(--shadow-subtle)',
				'medium': 'var(--shadow-medium)',
				'large': 'var(--shadow-large)',
				'glow': 'var(--shadow-glow)',
				'accent-glow': 'var(--shadow-accent-glow)'
			},
			
			transitionTimingFunction: {
				'fast': 'var(--transition-fast)',
				'smooth': 'var(--transition-smooth)',
				'slow': 'var(--transition-slow)'
			},
			
			backdropBlur: {
				'glass': '16px'
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
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
