import type { FlightOption } from "../data/artifacts";

export type VoteCounts = Record<FlightOption["id"], number>;

const storageKeys = {
  selectedOption: "acmetravel.flightPoll.lisbonWeekend.selectedOption",
  votes: "acmetravel.flightPoll.lisbonWeekend.votes",
  hasSeenSignInPrompt:
    "acmetravel.flightPoll.lisbonWeekend.hasSeenSignInPrompt",
} as const;

export function getInitialVoteCounts(options: FlightOption[]): VoteCounts {
  return options.reduce((counts, option) => {
    counts[option.id] = option.initialVotes;
    return counts;
  }, {} as VoteCounts);
}

export function readSelectedOption(): FlightOption["id"] | null {
  return readString(storageKeys.selectedOption) as FlightOption["id"] | null;
}

export function saveSelectedOption(optionId: FlightOption["id"]) {
  window.localStorage.setItem(storageKeys.selectedOption, optionId);
}

export function readVoteCounts(fallback: VoteCounts): VoteCounts {
  const rawValue = readString(storageKeys.votes);

  if (!rawValue) {
    return fallback;
  }

  try {
    return { ...fallback, ...JSON.parse(rawValue) };
  } catch {
    return fallback;
  }
}

export function saveVoteCounts(votes: VoteCounts) {
  window.localStorage.setItem(storageKeys.votes, JSON.stringify(votes));
}

export function readHasSeenSignInPrompt(): boolean {
  return readString(storageKeys.hasSeenSignInPrompt) === "true";
}

export function saveHasSeenSignInPrompt() {
  window.localStorage.setItem(storageKeys.hasSeenSignInPrompt, "true");
}

export function resetPrototypeState() {
  Object.values(storageKeys).forEach((key) => window.localStorage.removeItem(key));
}

function readString(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
