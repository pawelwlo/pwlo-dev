type HeroProps = {
  time: string;
  date: string;
  welcome: string;
};

export function Hero({ time, date, welcome }: HeroProps) {
  return (
    <div className="hero-lockscreen" aria-label="Welcome screen">
      <div className="hero-lockscreen-time" aria-live="polite">
        {time}
      </div>
      <div className="hero-lockscreen-date">{date}</div>
      <div className="hero-lockscreen-welcome">{welcome}</div>
    </div>
  );
}
