export type ArtifactType =
  | "flight_poll"
  | "hotel_vote"
  | "trip_board"
  | "flight_status";

export type FlightOption = {
  id: "cheapest" | "best-times" | "flexible";
  tag: string;
  airline: string;
  outbound: string;
  returnFlight: string;
  duration: string;
  stops: string;
  price: string;
  note: string;
  initialVotes: number;
};

export type Artifact = {
  id: string;
  type: ArtifactType;
  title: string;
  subtitle: string;
  destinationLabel: string;
  shareTitle: string;
  shareDescription: string;
  ogImage: string;
};

export type FlightPollArtifact = Artifact & {
  type: "flight_poll";
  route: string;
  dates: string;
  travellers: string;
  lastChecked: string;
  options: FlightOption[];
};

export const lisbonWeekendArtifact: FlightPollArtifact = {
  id: "lisbon-weekend",
  type: "flight_poll",
  title: "Help us pick a flight to Lisbon",
  subtitle:
    "Three good options for the May weekend trip. Vote for the one that works best for you.",
  destinationLabel: "Lisbon",
  shareTitle: "Vote on these Lisbon flights",
  shareDescription:
    "Piero found 3 good options for Lisbon. Pick the one that works best for you.",
  ogImage: "/assets/og-flight-lisbon.png",
  route: "London → Lisbon",
  dates: "Fri 16 May – Mon 19 May",
  travellers: "4 travellers",
  lastChecked: "Last checked 4 minutes ago",
  options: [
    {
      id: "cheapest",
      tag: "Cheapest",
      airline: "Acme Air",
      outbound: "07:15 → 10:05",
      returnFlight: "18:40 → 21:25",
      duration: "2h 50m",
      stops: "Direct",
      price: "£148",
      note: "Early start, best price.",
      initialVotes: 2,
    },
    {
      id: "best-times",
      tag: "Best times",
      airline: "EuropaJet",
      outbound: "10:30 → 13:20",
      returnFlight: "17:10 → 19:55",
      duration: "2h 50m",
      stops: "Direct",
      price: "£172",
      note: "Civilised times, still direct.",
      initialVotes: 3,
    },
    {
      id: "flexible",
      tag: "Most flexible",
      airline: "Coastline",
      outbound: "14:05 → 16:55",
      returnFlight: "20:30 → 23:15",
      duration: "2h 50m",
      stops: "Direct",
      price: "£189",
      note: "Best for people working Friday morning.",
      initialVotes: 1,
    },
  ],
};

export const artifactTypePlaceholders: ArtifactType[] = [
  "hotel_vote",
  "trip_board",
  "flight_status",
];
