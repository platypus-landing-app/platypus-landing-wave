import type { Config } from "tailwindcss";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const tailwindcssAnimate = require("tailwindcss-animate");

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
			fontFamily: {
				funnel: ['var(--font-funnel)', 'sans-serif'],
				domine: ['var(--font-domine)', 'Georgia', 'serif'],
				mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
				// Guttery retained for legacy pages (privacy/terms/etc) but NOT used on Direction D surfaces.
				guttery: ['Guttery', 'cursive'],
				segoe: ['"Segoe UI"', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Arial', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					hover: 'hsl(var(--primary-hover))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				brand: {
					// Direction D surfaces — two-tone: bone canvas + white card + cream secondary.
					bone: '#FBF9F3',         // scaffold canvas
					cream: '#F7F4EC',         // secondary elevated surface
					'cream-light': '#FBF9F3', // legacy alias -> bone (back-compat for older classes)
					'warm-bg': '#F7F4EC',     // legacy alias -> cream (back-compat)
					// Direction D ink + rule
					ink: '#0B0B0B',
					graphite: '#2B2B2B',
					slate: '#6B6B6B',
					muted: '#9A9A94',
					rule: '#E5E1D7',
					'rule-soft': '#EDEAE0',
					// Accent palette (retained — Direction D keeps blue for motion / GPS / links)
					blue: '#247AFD',
					'blue-dark': '#1A5BC4',
					'blue-light': '#5A9AFE',
					'blue-soft': '#E0EBFF',
					yellow: '#FFE135',
					'yellow-dark': '#E6CA2F',
					'yellow-soft': '#FFF4A6',
					green: '#2E7D5B',        // Direction D fresh green (darker, editorial)
					'green-soft': '#D7ECDF',
					purple: '#C071FE',
					'purple-soft': '#F0DFFF',
					orange: '#FF5B00',
					'orange-soft': '#FFDCC7',
				},
				golden: 'hsl(var(--golden))',
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
			boxShadow: {
				'brand': '0 4px 14px -3px rgba(36, 122, 253, 0.25)',
				'brand-lg': '0 10px 30px -5px rgba(36, 122, 253, 0.3)',
				'warm': '0 4px 14px -3px rgba(255, 225, 53, 0.35)',
			},
			backgroundImage: {
				'gradient-brand': 'var(--gradient-brand)',
				'gradient-hero': 'var(--gradient-hero)',
				// Direction D: warm gradients flattened to bone + white two-tone. No flood-fill yellow.
				'gradient-warm': 'linear-gradient(180deg, #FFFFFF 0%, #FBF9F3 50%, #FFFFFF 100%)',
				'gradient-warm-subtle': 'linear-gradient(180deg, #FBF9F3 0%, #FFFFFF 100%)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'wave': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'subtle-pulse': {
					'0%, 100%': { boxShadow: '0 0 0 0 rgba(36, 122, 253, 0.4)' },
					'50%': { boxShadow: '0 0 20px 4px rgba(36, 122, 253, 0.15)' }
				},
				'blob-float': {
					'0%, 100%': { transform: 'translate(0, 0) scale(1)' },
					'33%': { transform: 'translate(30px, -20px) scale(1.05)' },
					'66%': { transform: 'translate(-20px, 15px) scale(0.95)' }
				},
				'subtle-pulse-green': {
					'0%, 100%': { boxShadow: '0 0 0 0 rgba(105, 216, 79, 0.4)' },
					'50%': { boxShadow: '0 0 0 6px rgba(105, 216, 79, 0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'wave': 'wave 3s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'subtle-pulse': 'subtle-pulse 3s ease-in-out infinite',
				'blob-float': 'blob-float 8s ease-in-out infinite',
				'subtle-pulse-green': 'subtle-pulse-green 2s ease-in-out infinite'
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
