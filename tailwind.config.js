/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        muted: "var(--color-muted)",
        border: "var(--color-border)",
        accent: "var(--color-accent)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      spacing: {
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        5: "var(--space-5)",
        6: "var(--space-6)",
        7: "var(--space-7)",
        8: "var(--space-8)",
        9: "var(--space-9)",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        none: "0",
        full: "9999px",
      },
      maxWidth: {
        container: "var(--container-max)",
      },
      transitionDuration: {
        hover: "var(--duration-hover)",
        press: "var(--duration-press)",
      },
      transitionTimingFunction: {
        hover: "var(--ease-hover)",
      },
    },
  },
  plugins: [],
};
