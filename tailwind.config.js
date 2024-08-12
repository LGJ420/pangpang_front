/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'noto-sans-kr': ['Noto Sans KR', 'sans-serif'],
        'poor-story': ['Poor Story', 'system-ui'],
        'ibm-plex-sans-kr': ['IBM Plex Sans KR', 'sans-serif'],
        'do-hyeon': ['Do Hyeon', 'sans-serif'],
      }
    },
  },
  plugins: [],
  important: true,
}

