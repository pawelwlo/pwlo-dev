import { useMemo, useState } from "react";

type OfferPackage = {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  setup: string;
  monthly: string;
  includes: string[];
  excludes: string[];
};

type OfferTrack = {
  id: string;
  label: string;
  title: string;
  description: string;
  recommended: string;
  packages: OfferPackage[];
};

type OffersWindowProps = {
  copy: {
    eyebrow: string;
    setupLabel: string;
    monthlyLabel: string;
    includesLabel: string;
    excludesLabel: string;
    cta: string;
    tracks: OfferTrack[];
  };
  onContactCta?: () => void;
};

export function OffersWindow({ copy, onContactCta }: OffersWindowProps) {
  const [activeTrackId, setActiveTrackId] = useState(copy.tracks[0]?.id ?? "");
  const activeTrack = useMemo(
    () => copy.tracks.find((track) => track.id === activeTrackId) ?? copy.tracks[0],
    [activeTrackId, copy.tracks],
  );

  if (!activeTrack) {
    return null;
  }

  return (
    <div className="offers-layout">
      <div className="offers-intro">
        <p className="offers-eyebrow">{copy.eyebrow}</p>
        {copy.tracks.length > 1 ? (
          <div className="offers-track-switch" role="tablist" aria-label={copy.eyebrow}>
            {copy.tracks.map((track) => (
              <button
                key={track.id}
                type="button"
                role="tab"
                aria-selected={track.id === activeTrack.id}
                className={`offers-track-button${track.id === activeTrack.id ? " active" : ""}`}
                onClick={() => setActiveTrackId(track.id)}
              >
                {track.label}
              </button>
            ))}
          </div>
        ) : null}
        <h3>{activeTrack.title}</h3>
        <p>{activeTrack.description}</p>
        <p className="offers-note">{activeTrack.recommended}</p>
      </div>

      <div className="offers-grid">
        {activeTrack.packages.map((pkg) => (
          <article key={pkg.id} className={`offer-card${pkg.badge ? " offer-card-featured" : ""}`}>
            <div className="offer-card-top">
              <h4>{pkg.name}</h4>
              {pkg.badge ? <span className="offer-badge">{pkg.badge}</span> : null}
            </div>
            <p className="offer-tagline">{pkg.tagline}</p>
            <div className="offer-prices">
              <div>
                <span className="offer-price-label">{copy.setupLabel}</span>
                <strong>{pkg.setup}</strong>
              </div>
              <div>
                <span className="offer-price-label">{copy.monthlyLabel}</span>
                <strong>{pkg.monthly}</strong>
              </div>
            </div>
            <p className="offer-list-label">{copy.includesLabel}</p>
            <ul className="offer-list">
              {pkg.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="offer-list-label">{copy.excludesLabel}</p>
            <ul className="offer-list offer-list-muted">
              {pkg.excludes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {onContactCta ? (
              <button className="primary-button" type="button" onClick={onContactCta}>
                {copy.cta}
              </button>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
