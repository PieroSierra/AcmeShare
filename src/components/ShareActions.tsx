import { copyLink, openWhatsAppShare, shareUpdatedPoll } from "../lib/share";

type ShareActionsProps = {
  onToast: (message: string) => void;
};

export function ShareActions({ onToast }: ShareActionsProps) {
  async function handleNativeShare() {
    try {
      onToast(await shareUpdatedPoll());
    } catch {
      onToast("Share cancelled.");
    }
  }

  async function handleCopyLink() {
    await copyLink();
    onToast("Link copied.");
  }

  return (
    <section className="share-panel" aria-label="Share this poll">
      <button className="button button--whatsapp" type="button" onClick={openWhatsAppShare}>
        Share to WhatsApp
      </button>
      <button className="button button--secondary" type="button" onClick={handleNativeShare}>
        Share updated poll
      </button>
      <button className="button button--ghost" type="button" onClick={handleCopyLink}>
        Copy link
      </button>
    </section>
  );
}
