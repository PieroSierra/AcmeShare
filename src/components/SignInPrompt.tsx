type SignInPromptProps = {
  onOpen: () => void;
};

export function SignInPrompt({ onOpen }: SignInPromptProps) {
  return (
    <section className="conversion-card" aria-labelledby="signin-title">
      <span className="section-kicker">Keep it moving</span>
      <h2 id="signin-title">Want to keep this trip in sync?</h2>
      <p>Sign in to save your vote, see group updates, and get price alerts.</p>
      <button className="button button--primary" type="button" onClick={onOpen}>
        Sign in for more
      </button>
    </section>
  );
}
