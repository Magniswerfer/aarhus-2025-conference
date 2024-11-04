// tailwind.config.ts
import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aarhus-red': '#b00000',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'roboto-condensed': ['"Roboto Condensed"', 'sans-serif'],
      },
      fontSize: {
        'hero': '9.375rem', // matches the original 150px size
      },
    },
  },
} as Config;
