import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-500': '#04B545',
        'lightGrey-500': '#d4d4d4',
        'darkGrey-500': '#d9d9d9',
      },
      fontFamily: {
        'audiowide': ['Audiowide']
      }
    },
  },
  plugins: [],
}
export default config
