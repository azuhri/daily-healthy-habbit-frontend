import type { Config } from 'tailwindcss'

const config: Config = {
  mode: 'jit',
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
      fontFamily: {
        'sans': 'Poppins',
      },
      colors: {
        ds: {
          cyan10: '#4ED0C8',
          cyan20: '#00B0A5',
          pink10: '#FFE2F2',
          pink20: '#FFB1D9',
          donker: '#233563',
          gray: '#848484',
          orange: '#EF9610',
          white: {
            "100": '#F4F4F4',
          },
          tosca: {
           '100': '#287F89',
           '200': '#1D5B63',
          },
          blue: {
            "50": "#77B8F5",
            "100": "#2D92F0",
          }
        }
      },
    },
  },
  plugins: [],
}
export default config
