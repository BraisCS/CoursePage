import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
    theme: {
      colors: {
        'Light-Green': '#a3f165',
        'Light-Purple': '#ae8cf1',
        'Light-Orange': '#eb9718',
        'Dark': '#242323',
        'Light': '#F5F5F5',
      },
      fontFamily: {
        DMSans : [ "DM+Sans"],
      },
    extend: {
      backdropFilter: { 'none': 'none', 'blur': 'blur(20px)' },
      backgroundImages: {
        'fade-to-t': 'linear-gradient(to top, #ae8cf1)',   
        'fade-to-b': 'linear-gradient(to bottom, transparent, #ae8cf1)' 
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(90deg,rgba(220,134,101,1) 30%, rgba(83,70,102,1) 90%)',
      },
    },
  },
  plugins: [],
};
export default config;