type WhatsAppCtaProps = {
  onOpen: () => void;
};

export function WhatsAppCta({ onOpen }: WhatsAppCtaProps) {
  return (
    <section className="whatsapp-card" aria-labelledby="whatsapp-title">
      <div>
        <span className="section-kicker">Trip tracking</span>
        <h2 id="whatsapp-title">Ask AcmeTravel to track this on WhatsApp</h2>
        <p>Get a message if the price changes or when everyone has voted.</p>
      </div>
      <button className="button button--whatsapp" type="button" onClick={onOpen}>
        Track this trip on WhatsApp
      </button>
    </section>
  );
}
