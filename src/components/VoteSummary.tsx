import type { FlightOption } from "../data/artifacts";
import type { VoteCounts } from "../lib/localStorage";

type VoteSummaryProps = {
  options: FlightOption[];
  votes: VoteCounts;
  selectedOption: FlightOption["id"] | null;
};

export function VoteSummary({ options, votes, selectedOption }: VoteSummaryProps) {
  const sortedOptions = [...options].sort((left, right) => votes[right.id] - votes[left.id]);
  const leader = sortedOptions[0];
  const totalVotes = Object.values(votes).reduce((total, count) => total + count, 0);

  return (
    <section className="summary-card" aria-labelledby="vote-summary-title">
      <div>
        <span className="section-kicker">Group pulse</span>
        <h2 id="vote-summary-title">
          {leader.tag} is leading with {votes[leader.id]} votes
        </h2>
      </div>
      <p>
        {selectedOption
          ? "Your vote is saved on this device. You can still change it."
          : "Vote once to add your preference to the local poll."}
      </p>
      <div className="summary-stack">
        {sortedOptions.map((option) => (
          <div className="summary-row" key={option.id}>
            <span>{option.tag}</span>
            <strong>
              {votes[option.id]} / {totalVotes}
            </strong>
          </div>
        ))}
      </div>
    </section>
  );
}
