import type { Config } from "tailwindcss";

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        scene: token("scene"),
        surface: token("surface"),
        line: token("line"),
        ink: token("ink"),
        muted: token("muted"),
        accent: token("accent"),
      },
      fontFamily: {
        sans: ["var(--font-schibsted)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        page: "76rem",
        prose: "40rem",
      },
    },
  },
  plugins: [],
};
export default config;
