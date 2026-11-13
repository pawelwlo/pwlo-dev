import { ChevronRight, Mail } from "lucide-react";

export type NeonHeroCopy = {
  tagline: [string, string, string];
  introLine1: string;
  introLine2: string;
  explore: string;
  contact: string;
  scrollLabel: string;
};

type NeonHeroProps = {
  copy: NeonHeroCopy;
  variant?: "desktop" | "mobile";
  onExplore: () => void;
  onContact: () => void;
};

const PARTICLE_POSITIONS = [
  { top: "12%", left: "18%", size: 2, delay: "0s" },
  { top: "22%", left: "72%", size: 3, delay: "1.2s" },
  { top: "38%", left: "12%", size: 2, delay: "2.4s" },
  { top: "48%", left: "86%", size: 2, delay: "0.6s" },
  { top: "64%", left: "28%", size: 3, delay: "1.8s" },
  { top: "70%", left: "78%", size: 2, delay: "3s" },
  { top: "18%", left: "48%", size: 2, delay: "2.1s" },
  { top: "82%", left: "58%", size: 2, delay: "0.9s" },
] as const;

export function NeonHero({
  copy,
  variant = "desktop",
  onExplore,
  onContact,
}: NeonHeroProps) {
  const particleCount = variant === "mobile" ? 4 : PARTICLE_POSITIONS.length;

  return (
    <section
      className={`neon-hero neon-hero--${variant}`}
      aria-label="pwlo.dev"
    >
      <div className="neon-hero__atmosphere" aria-hidden="true">
        <div className="neon-hero__glow neon-hero__glow--left" />
        <div className="neon-hero__glow neon-hero__glow--right" />
        <div className="neon-hero__mist neon-hero__mist--bottom" />
        <svg
          className="neon-hero__ribbons"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <defs>
            <linearGradient id="neon-ribbon-left" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6c8494" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#f3e308" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#2c4c5c" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="neon-ribbon-right" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#b8bfc1" stopOpacity="0.85" />
              <stop offset="40%" stopColor="#f3e308" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#6c8494" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <g className="neon-hero__ribbon neon-hero__ribbon--left">
            <path
              fill="url(#neon-ribbon-left)"
              d="M-80 120 C 80 40, 180 220, 120 360 C 60 500, 220 560, 160 720 C 110 840, 40 880, -40 900 L -120 900 Z"
            />
            <path
              fill="url(#neon-ribbon-left)"
              opacity="0.55"
              d="M-40 40 C 160 120, 240 40, 280 200 C 320 360, 160 400, 220 560 C 280 720, 120 780, 40 860 L -80 860 Z"
            />
          </g>
          <g className="neon-hero__ribbon neon-hero__ribbon--right">
            <path
              fill="url(#neon-ribbon-right)"
              d="M1520 80 C 1280 20, 1180 180, 1240 320 C 1300 460, 1140 520, 1200 680 C 1250 800, 1380 840, 1480 900 L 1560 900 Z"
            />
            <path
              fill="url(#neon-ribbon-right)"
              opacity="0.5"
              d="M1480 160 C 1320 80, 1200 200, 1260 340 C 1320 480, 1180 560, 1240 700 C 1290 820, 1420 860, 1520 920 L 1580 920 Z"
            />
          </g>
        </svg>
        <div className="neon-hero__particles">
          {PARTICLE_POSITIONS.slice(0, particleCount).map((particle, index) => (
            <span
              key={index}
              className="neon-hero__particle"
              style={{
                top: particle.top,
                left: particle.left,
                width: particle.size,
                height: particle.size,
                animationDelay: particle.delay,
              }}
            />
          ))}
        </div>
      </div>

      <div className="neon-hero__content">
        <div className="neon-hero__icon" aria-hidden="true">
          <span>&lt;/&gt;</span>
        </div>

        <h1 className="neon-hero__brand">
          <span className="neon-hero__brand-name">pwlo</span>
          <span className="neon-hero__brand-tld">.dev</span>
        </h1>

        <div className="neon-hero__actions">
          <button
            type="button"
            className="neon-hero__btn neon-hero__btn--primary"
            onClick={onExplore}
          >
            <span>{copy.explore}</span>
            <ChevronRight size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="neon-hero__btn neon-hero__btn--secondary"
            onClick={onContact}
          >
            <Mail size={16} aria-hidden="true" />
            <span>{copy.contact}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
