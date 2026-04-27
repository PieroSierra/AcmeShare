import { useEffect, useState } from "react";
import type { FlightOption, FlightPollArtifact } from "../data/artifacts";
import {
  getInitialVoteCounts,
  readHasSeenSignInPrompt,
  readSelectedOption,
  readVoteCounts,
  resetPrototypeState,
  saveHasSeenSignInPrompt,
  saveSelectedOption,
  saveVoteCounts,
  type VoteCounts,
} from "../lib/localStorage";
import { FlightOptionCard } from "./FlightOptionCard";
import { Modal } from "./Modal";
import { PrototypeNotice } from "./PrototypeNotice";
import { ShareActions } from "./ShareActions";
import { SignInPrompt } from "./SignInPrompt";
import { Toast } from "./Toast";
import { VoteSummary } from "./VoteSummary";
import { WhatsAppCta } from "./WhatsAppCta";

type FlightPollProps = {
  artifact: FlightPollArtifact;
};

type ActiveModal = "signin" | "whatsapp" | "whatsapp-unavailable" | null;

export function FlightPoll({ artifact }: FlightPollProps) {
  const fallbackVotes = getInitialVoteCounts(artifact.options);
  const [selectedOption, setSelectedOption] = useState<FlightOption["id"] | null>(
    () => readSelectedOption(),
  );
  const [votes, setVotes] = useState<VoteCounts>(() => readVoteCounts(fallbackVotes));
  const [showSignInPrompt, setShowSignInPrompt] = useState(() =>
    readHasSeenSignInPrompt(),
  );
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const totalVotes = Object.values(votes).reduce((total, count) => total + count, 0);

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timeout = window.setTimeout(() => setToastMessage(null), 2200);
    return () => window.clearTimeout(timeout);
  }, [toastMessage]);

  function handleVote(optionId: FlightOption["id"]) {
    if (selectedOption === optionId) {
      setToastMessage("Vote saved on this device.");
      return;
    }

    const nextVotes = { ...votes };

    if (selectedOption) {
      nextVotes[selectedOption] = Math.max(0, nextVotes[selectedOption] - 1);
    }

    nextVotes[optionId] += 1;
    setVotes(nextVotes);
    saveVoteCounts(nextVotes);
    setSelectedOption(optionId);
    saveSelectedOption(optionId);
    setShowSignInPrompt(true);
    saveHasSeenSignInPrompt();
    setToastMessage("Vote saved on this device.");
  }

  function handleReset() {
    resetPrototypeState();
    setSelectedOption(null);
    setVotes(fallbackVotes);
    setShowSignInPrompt(false);
    setToastMessage("Prototype state reset.");
  }

  return (
    <>
      <section className="poll-section" aria-label="Flight options">
        {artifact.options.map((option) => (
          <FlightOptionCard
            key={option.id}
            option={option}
            votes={votes[option.id]}
            totalVotes={totalVotes}
            isSelected={selectedOption === option.id}
            onVote={handleVote}
          />
        ))}
      </section>

      <VoteSummary
        options={artifact.options}
        votes={votes}
        selectedOption={selectedOption}
      />

      <ShareActions onToast={setToastMessage} />

      {showSignInPrompt ? (
        <SignInPrompt onOpen={() => setActiveModal("signin")} />
      ) : null}

      <WhatsAppCta onOpen={() => setActiveModal("whatsapp")} />

      <PrototypeNotice onReset={handleReset} />

      <StickyActions
        onShareWhatsApp={() => {
          document.querySelector<HTMLButtonElement>(".button--whatsapp")?.click();
        }}
        onTrack={() => setActiveModal("whatsapp")}
      />

      <Toast message={toastMessage} />

      {activeModal === "signin" ? (
        <Modal title="Sign-in prototype" onClose={() => setActiveModal(null)}>
          <p>
            In a real version, this would let you save your vote, sync across
            devices, and keep this trip with your group.
          </p>
          <button
            className="button button--primary"
            type="button"
            onClick={() => setActiveModal(null)}
          >
            Close
          </button>
        </Modal>
      ) : null}

      {activeModal === "whatsapp" ? (
        <Modal
          title="WhatsApp tracking prototype"
          onClose={() => setActiveModal(null)}
        >
          <p>
            In a real version, this would open a 1:1 WhatsApp chat with
            AcmeTravel.
          </p>
          <div className="example-message">
            “Track this Lisbon flight poll for me.”
          </div>
          <p>Then AcmeTravel could reply with buttons:</p>
          <div className="fake-replies" aria-label="Example WhatsApp replies">
            <span>Track price drops</span>
            <span>Notify when everyone votes</span>
            <span>Show cheaper dates</span>
          </div>
          <button
            className="button button--secondary"
            type="button"
            onClick={() => setActiveModal("whatsapp-unavailable")}
          >
            Continue to WhatsApp
          </button>
        </Modal>
      ) : null}

      {activeModal === "whatsapp-unavailable" ? (
        <Modal title="Not connected yet" onClose={() => setActiveModal(null)}>
          <p>This prototype only tests the shared artifact.</p>
          <button
            className="button button--primary"
            type="button"
            onClick={() => setActiveModal(null)}
          >
            Close
          </button>
        </Modal>
      ) : null}
    </>
  );
}

type StickyActionsProps = {
  onShareWhatsApp: () => void;
  onTrack: () => void;
};

function StickyActions({ onShareWhatsApp, onTrack }: StickyActionsProps) {
  return (
    <aside className="sticky-actions" aria-label="Quick actions">
      <button className="button button--whatsapp" type="button" onClick={onShareWhatsApp}>
        Share to WhatsApp
      </button>
      <button className="button button--primary" type="button" onClick={onTrack}>
        Track
      </button>
    </aside>
  );
}
