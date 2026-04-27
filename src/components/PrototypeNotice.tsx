import { artifactTypePlaceholders } from "../data/artifacts";

type PrototypeNoticeProps = {
  onReset: () => void;
};

export function PrototypeNotice({ onReset }: PrototypeNoticeProps) {
  return (
    <footer className="prototype-notice">
      <p>
        Prototype only: votes are stored locally on this device and are not shared
        with other people.
      </p>
      <p>
        Next artifact slots:{" "}
        {artifactTypePlaceholders
          .map((type) => type.replace("_", " "))
          .join(", ")}
        .
      </p>
      <button className="button-reset" type="button" onClick={onReset}>
        Reset prototype state
      </button>
    </footer>
  );
}
