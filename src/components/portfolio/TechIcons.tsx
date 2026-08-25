import type { ReactNode } from "react";

export type TechIconId =
  | "react"
  | "nextjs"
  | "tailwind"
  | "typescript"
  | "nodejs"
  | "supabase"
  | "ai"
  | "vercel"
  | "git"
  | "figma"
  | "google"
  | "responsive"
  | "a11y";

type TechIconProps = {
  id: TechIconId;
  className?: string;
};

function IconShell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={className ?? "tech-item-icon"} aria-hidden="true">
      {children}
    </span>
  );
}

export function TechIcon({ id, className }: TechIconProps) {
  switch (id) {
    case "react":
      return (
        <IconShell className={className}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
            <ellipse cx="12" cy="12" rx="10" ry="4.2" />
            <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
          </svg>
        </IconShell>
      );
    case "nextjs":
      return (
        <IconShell className={className}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm4.2 14.7h-1.7l-4.3-6.4v6.4H8.6V7.3h1.8l4.2 6.3V7.3h1.6Z" />
          </svg>
        </IconShell>
      );
    case "tailwind":
      return (
        <IconShell className={className}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 6.5c-2.6 0-4.2 1.3-4.8 3.9 1-1.3 2.1-1.8 3.4-1.5.8.2 1.3.7 1.9 1.3.9 1 2 2.1 4.3 2.1 2.6 0 4.2-1.3 4.8-3.9-1 1.3-2.1 1.8-3.4 1.5-.8-.2-1.3-.7-1.9-1.3-.9-1-2-2.1-4.3-2.1Zm-4.8 5.7c-2.6 0-4.2 1.3-4.8 3.9 1-1.3 2.1-1.8 3.4-1.5.8.2 1.3.7 1.9 1.3.9 1 2 2.1 4.3 2.1 2.6 0 4.2-1.3 4.8-3.9-1 1.3-2.1 1.8-3.4 1.5-.8-.2-1.3-.7-1.9-1.3-.9-1-2-2.1-4.3-2.1Z" />
          </svg>
        </IconShell>
      );
    case "typescript":
      return (
        <IconShell className={className}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 3h18v18H3V3Zm9.4 8.3H9.2v1.4h1.6v5.1h1.7v-5.1h1.6v-1.4h-1.7Zm5.7 2.1c-.3-.6-.9-1-1.8-1-1.3 0-2.2.7-2.2 1.9 0 1.3 1.1 1.8 1.9 2.1l.4.1c.5.2.8.3.8.7 0 .4-.4.6-.9.6-.7 0-1.2-.3-1.4-.9l-1.4.4c.3 1.2 1.4 1.9 2.8 1.9 1.5 0 2.5-.8 2.5-2.1 0-1.2-.8-1.8-1.9-2.2l-.4-.1c-.5-.2-.8-.3-.8-.6 0-.3.3-.6.9-.6.5 0 .9.2 1.1.6l1.4-.4Z" />
          </svg>
        </IconShell>
      );
    case "nodejs":
      return (
        <IconShell className={className}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.2 3.8 6.9v10.2L12 21.8l8.2-4.7V6.9L12 2.2Zm0 2.3 6 3.4v6.8l-6 3.4-6-3.4V8l6-3.5Zm-.9 3.7H8.8v6.2h1.6V12h.6c1.5 0 2.5-.8 2.5-2.1 0-1.3-1-2.7-2.4-2.7Zm0 1.3c.6 0 1 .4 1 1.1s-.4 1-1 1h-.6V9.5h.6Z" />
          </svg>
        </IconShell>
      );
    case "supabase":
      return (
        <IconShell className={className}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.4 3.1c.4-.7 1.4-.4 1.4.5v9.1h4.1c.8 0 1.2 1 .6 1.5l-8.5 7.7c-.7.6-1.8.1-1.6-.8l1.5-6.8H6.7c-.8 0-1.2-1-.6-1.5l7.3-9.7Z" />
          </svg>
        </IconShell>
      );
    case "ai":
      return (
        <IconShell className={className}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            <path d="M12 3v3M12 18v3M4.9 6.5l2.1 2.1M17 15.4l2.1 2.1M3 12h3M18 12h3M4.9 17.5 7 15.4M17 8.6l2.1-2.1" />
            <circle cx="12" cy="12" r="3.2" />
          </svg>
        </IconShell>
      );
    case "vercel":
      return (
        <IconShell className={className}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4 21 20H3L12 4Z" />
          </svg>
        </IconShell>
      );
    case "git":
      return (
        <IconShell className={className}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            <circle cx="7" cy="7" r="2.2" />
            <circle cx="17" cy="7" r="2.2" />
            <circle cx="12" cy="17" r="2.2" />
            <path d="M7 9.2V15a2 2 0 0 0 2 2h1M17 9.2v1.5A2.3 2.3 0 0 1 14.7 13H12" />
          </svg>
        </IconShell>
      );
    case "figma":
      return (
        <IconShell className={className}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 3h3v4.5H9A2.25 2.25 0 1 1 9 3Zm0 6h3v4.5H9A2.25 2.25 0 1 1 9 9Zm0 6h3v3a2.25 2.25 0 1 1-3-2.12A2.24 2.24 0 0 1 9 15Zm6-12h-3v4.5h3A2.25 2.25 0 1 0 15 3Zm0 6h-3v4.5h1.5A2.25 2.25 0 1 0 15 9Z" />
          </svg>
        </IconShell>
      );
    case "google":
      return (
        <IconShell className={className}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16 21 21" />
            <path d="M8.5 11h5M11 8.5v5" />
          </svg>
        </IconShell>
      );
    case "responsive":
      return (
        <IconShell className={className}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            <rect x="7" y="3.5" width="10" height="17" rx="2" />
            <path d="M10.5 18h3" />
          </svg>
        </IconShell>
      );
    case "a11y":
      return (
        <IconShell className={className}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            <circle cx="12" cy="5.5" r="1.8" />
            <path d="M7 10h10M12 10v5M9.5 21 12 15l2.5 6" />
          </svg>
        </IconShell>
      );
    default:
      return null;
  }
}
