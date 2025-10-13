import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    "./content/**/*.{md,mdx}",
  ],
  theme: { extend: {} },
  plugins: [typography],
}

export default config