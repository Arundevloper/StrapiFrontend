import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'custom-light': '#DCF2F1',
			  'custom-blue-light': '#7FC7D9',
			  'custom-blue': '#365486',
			  'custom-dark': '#0F1035',
			  'custom-green':'#42a2a2'
      },
    },
  },
  plugins: [],
};
export default config;
