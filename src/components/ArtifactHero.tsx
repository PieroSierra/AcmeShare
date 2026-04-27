import type { FlightPollArtifact } from "../data/artifacts";

type ArtifactHeroProps = {
  artifact: FlightPollArtifact;
};

export function ArtifactHero({ artifact }: ArtifactHeroProps) {
  return (
    <section className="hero" aria-labelledby="artifact-title">
      <div className="hero__eyebrow">
        <span>{artifact.route}</span>
        <span aria-hidden="true">•</span>
        <span>{artifact.travellers}</span>
      </div>
      <h1 id="artifact-title">{artifact.title}</h1>
      <p>{artifact.subtitle}</p>
      <dl className="trip-facts" aria-label="Trip details">
        <div>
          <dt>Route</dt>
          <dd>{artifact.route}</dd>
        </div>
        <div>
          <dt>Dates</dt>
          <dd>{artifact.dates}</dd>
        </div>
        <div>
          <dt>Group</dt>
          <dd>{artifact.travellers}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{artifact.lastChecked}</dd>
        </div>
      </dl>
    </section>
  );
}
