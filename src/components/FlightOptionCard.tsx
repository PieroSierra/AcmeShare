import type { FlightOption } from "../data/artifacts";

type FlightOptionCardProps = {
  option: FlightOption;
  votes: number;
  totalVotes: number;
  isSelected: boolean;
  onVote: (optionId: FlightOption["id"]) => void;
};

export function FlightOptionCard({
  option,
  votes,
  totalVotes,
  isSelected,
  onVote,
}: FlightOptionCardProps) {
  const votePercentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;

  return (
    <article className={`flight-card ${isSelected ? "flight-card--selected" : ""}`}>
      <div className="flight-card__header">
        <div>
          <span className="tag">{option.tag}</span>
          <h3>{option.airline}</h3>
        </div>
        <p className="price">{option.price}</p>
      </div>

      <div className="flight-times" aria-label={`${option.airline} flight times`}>
        <div>
          <span>Outbound</span>
          <strong>{option.outbound}</strong>
        </div>
        <div>
          <span>Return</span>
          <strong>{option.returnFlight}</strong>
        </div>
      </div>

      <div className="flight-meta">
        <span>{option.duration}</span>
        <span>{option.stops}</span>
      </div>

      <p className="flight-note">{option.note}</p>

      <div className="vote-meter" aria-label={`${votes} votes, ${votePercentage}%`}>
        <span style={{ width: `${votePercentage}%` }} />
      </div>

      <div className="flight-card__footer">
        <span className="vote-count">
          {votes} {votes === 1 ? "vote" : "votes"} · {votePercentage}%
        </span>
        <button
          className={isSelected ? "button button--selected" : "button button--primary"}
          type="button"
          onClick={() => onVote(option.id)}
          aria-label={`Vote for ${option.tag.toLowerCase()} flight, ${option.price}`}
        >
          {isSelected ? "Selected" : "Vote"}
        </button>
      </div>
    </article>
  );
}
