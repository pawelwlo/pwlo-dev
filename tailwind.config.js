/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        bg: "var(--color-bg, var(--bg))",
        surface: {
          DEFAULT: "var(--color-surface, var(--surface))",
          elevated: "var(--color-surface-elevated, var(--surface-strong))",
        },
        border: {
          DEFAULT: "var(--color-border, var(--border))",
          subtle: "var(--color-border-subtle, var(--border))",
        },
        text: {
          DEFAULT: "var(--color-text, var(--text))",
          secondary: "var(--color-text-secondary, var(--text-soft))",
          muted: "var(--color-text-muted, var(--text-tertiary))",
          disabled: "var(--color-text-disabled)",
        },
        accent: {
          DEFAULT: "var(--color-accent, var(--primary))",
          hover: "var(--color-accent-hover, var(--accent))",
          active: "var(--color-accent-active)",
          secondary: "var(--color-accent-secondary)",
          subtle: "var(--color-accent-subtle)",
        },
        success: {
          DEFAULT: "var(--color-success, var(--success))",
          subtle: "var(--color-success-subtle)",
        },
        warning: {
          DEFAULT: "var(--color-warning)",
          subtle: "var(--color-warning-subtle)",
        },
        danger: {
          DEFAULT: "var(--color-danger)",
          subtle: "var(--color-danger-subtle)",
        },
        category: "var(--color-category, var(--color-accent))",
        metadata: "var(--color-metadata, var(--color-text-muted))",
        icon: {
          projects: "var(--icon-projects)",
          tech: "var(--icon-tech)",
          seo: "var(--icon-seo)",
          contact: "var(--icon-contact)",
          neutral: "var(--icon-neutral)",
        },
      },
      boxShadow: {
        window: "var(--window-shadow-inactive)",
        "window-active": "var(--window-shadow-active)",
        "dock-active": "var(--dock-glow-active)",
        card: "var(--card-hover-shadow)",
      },
    },
  },
  plugins: [],
};
