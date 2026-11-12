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

type OffersWindowProps = {
  copy: {
    eyebrow: string;
    title: string;
    description: string;
    recommended: string;
    setupLabel: string;
    monthlyLabel: string;
    includesLabel: string;
    excludesLabel: string;
    cta: string;
    packages: OfferPackage[];
  };
  onContactCta?: () => void;
};

export function OffersWindow({ copy, onContactCta }: OffersWindowProps) {
  return (
    <div className="offers-layout">
      <div className="offers-intro">
        <p className="offers-eyebrow">{copy.eyebrow}</p>
        <h3>{copy.title}</h3>
        <p>{copy.description}</p>
        <p className="offers-note">{copy.recommended}</p>
      </div>

      <div className="offers-grid">
        {copy.packages.map((pkg) => (
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
