# Spec: AcmeTravel WhatsApp-Shared Flight Poll Prototype

## 1. Vision

Build a small public prototype that demonstrates how a travel-planning artifact can be shared into a WhatsApp group and feel like a lightweight, live, collaborative object.

The core idea:

> A traveller finds a few flight options, shares a good-looking link into WhatsApp, and friends can open the page, vote, see fake group state, and optionally tap a fake WhatsApp CTA to “track this trip.”

This is **not** a production app. It is a believable prototype to test the mechanics of:

- WhatsApp link previews via Open Graph metadata.
- A mobile-first shared flight poll experience.
- Lightweight voting using `localStorage`.
- “Sign in for more” as a fake conversion prompt.
- A fake “Ask AcmeTravel to track this on WhatsApp” CTA.
- A structure that can later support hotel voting, trip boards, flight-status sharing, and a real WhatsApp Business 1:1 handoff.

Brand must be **AcmeTravel**, not Skyscanner.

Hosting will be **personal GitHub Pages**.

---

## 2. Product goals

### Phase 1 goal

Create one shareable public page:

```text
/acmetravel-whatsapp-prototype/flights/lisbon-weekend/
```

This page should look good when pasted into WhatsApp and should behave like a flight poll after opening.

### User story

As a traveller planning a group trip, I want to share a flight shortlist into WhatsApp so my friends can vote without signing in.

As a recipient, I want to quickly understand the options, vote, and see what the group prefers.

As a product tester, I want to tap a fake “track this on WhatsApp” CTA and understand how a later WhatsApp Business handoff might work.

---

## 3. Non-goals

Do not build:

- Real authentication.
- Real backend.
- Real database.
- Real flight search.
- Real prices.
- Real WhatsApp Business API integration.
- Real analytics unless trivial/static.
- Any Skyscanner branding, copy, logos, internal APIs, internal product logic, or private assets.
- Any dependency that requires server-side runtime.

The prototype must be safe to host publicly.

---

## 4. Hosting

Use **GitHub Pages** from a personal GitHub repo.

Recommended setup:

```text
repo: acmetravel-whatsapp-prototype
branch: main
deploy: GitHub Pages from /docs or gh-pages branch
```

Preferred output URL shape:

```text
https://<github-username>.github.io/acmetravel-whatsapp-prototype/
https://<github-username>.github.io/acmetravel-whatsapp-prototype/flights/lisbon-weekend/
```

The flight page must be statically generated or plain static HTML so that WhatsApp can crawl the Open Graph metadata from the initial HTML response.

---

## 5. Tech stack

Use a simple static frontend. Recommended options:

### Preferred

```text
Vite + React + TypeScript
```

Build output deployed to GitHub Pages.

### Acceptable

```text
Plain HTML/CSS/JavaScript
```

Do not use Next.js unless configured for static export only. Avoid anything that requires SSR or a hosted Node process.

---

## 6. Visual language

Use **AcmeTravel** as the brand, but borrow the general visual language of Backpack: crisp cards, rounded corners, strong blue CTAs, generous spacing, accessible contrast, clear hierarchy, mobile-first layout.

Backpack is Skyscanner’s design system and public repo for web components; it is described as a collection of design resources, reusable components, and guidelines for creating Skyscanner products. The web package is installable as `@skyscanner/backpack-web`, though for this prototype it is fine to approximate the style with static CSS rather than importing the full component system.

Use a blue-led palette inspired by the public Skyscanner brand color `#0770E3`, but do not use the Skyscanner name or logo.

### Suggested design tokens

```css
:root {
  --color-primary: #0770e3;
  --color-primary-dark: #042759;
  --color-accent: #00a698;
  --color-warning: #ffb700;
  --color-danger: #d1435b;

  --color-surface: #ffffff;
  --color-surface-alt: #f1f5f9;
  --color-border: #d9e2ec;
  --color-text-primary: #0b1f3a;
  --color-text-secondary: #526173;
  --color-text-muted: #697586;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 18px;
  --shadow-card: 0 8px 24px rgba(15, 23, 42, 0.08);

  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
```

### Look and feel

- Mobile-first, but also decent on desktop.
- Page max width around `720px`.
- Large title, compact subtitle.
- Flight option cards with price, times, duration, stop count, tag, and voting CTA.
- Sticky or prominent bottom CTA on mobile.
- Friendly microcopy.
- Clear “prototype / fake” footer so colleagues understand the test.

---

## 7. Information architecture

Design the app so more artifact types can be added later.

Recommended structure:

```text
/src
  /data
    artifacts.ts
  /components
    Layout.tsx
    ArtifactHero.tsx
    FlightPoll.tsx
    FlightOptionCard.tsx
    VoteSummary.tsx
    WhatsAppCta.tsx
    SignInPrompt.tsx
    ShareActions.tsx
    PrototypeNotice.tsx
  /lib
    localStorage.ts
    share.ts
    urlState.ts
  /pages or /routes
    flights/lisbon-weekend
```

If using plain HTML, still keep equivalent separation:

```text
/docs
  index.html
  /flights/lisbon-weekend/index.html
  /assets
    styles.css
    app.js
    og-flight-lisbon.png
```

Design the data model so new artifacts can be added:

```ts
type ArtifactType = "flight_poll" | "hotel_vote" | "trip_board" | "flight_status";

type Artifact = {
  id: string;
  type: ArtifactType;
  title: string;
  subtitle: string;
  destinationLabel: string;
  shareTitle: string;
  shareDescription: string;
  ogImage: string;
};
```

For Phase 1, only implement:

```ts
type: "flight_poll"
id: "lisbon-weekend"
```

But keep placeholders or TODOs for:

```ts
"hotel_vote"
"trip_board"
"flight_status"
```

---

## 8. Phase 1 page: Flight Poll

### Page title

```text
Help us pick a flight to Lisbon
```

### Subtitle

```text
Three good options for the May weekend trip. Vote for the one that works best for you.
```

### Fake trip details

```text
London → Lisbon
Fri 16 May – Mon 19 May
4 travellers
Last checked 4 minutes ago
```

### Flight options

Use realistic but fictional data.

#### Option A: Cheapest

```text
Tag: Cheapest
Airline: Acme Air
Outbound: 07:15 → 10:05
Return: 18:40 → 21:25
Duration: 2h 50m
Stops: Direct
Price: £148
Note: Early start, best price.
Initial fake votes: 2
```

#### Option B: Best times

```text
Tag: Best times
Airline: EuropaJet
Outbound: 10:30 → 13:20
Return: 17:10 → 19:55
Duration: 2h 50m
Stops: Direct
Price: £172
Note: Civilised times, still direct.
Initial fake votes: 3
```

#### Option C: Flexible

```text
Tag: Most flexible
Airline: Coastline
Outbound: 14:05 → 16:55
Return: 20:30 → 23:15
Duration: 2h 50m
Stops: Direct
Price: £189
Note: Best for people working Friday morning.
Initial fake votes: 1
```

---

## 9. Interactivity

Use `localStorage`.

### Requirements

A user can:

- Vote for one flight.
- Change their vote.
- See their selected option highlighted.
- See vote counts update locally.
- Refresh and still see their vote.
- Reset prototype state via a small footer/debug button.
- Click “Share updated poll” to open native share if available, or copy current URL.

### localStorage keys

Use namespaced keys:

```text
acmetravel.flightPoll.lisbonWeekend.selectedOption
acmetravel.flightPoll.lisbonWeekend.votes
acmetravel.flightPoll.lisbonWeekend.hasSeenSignInPrompt
```

### Vote behaviour

Initial vote counts come from static data.

When the user votes:

1. If no previous vote:
   - increment selected option by 1.
2. If changing vote:
   - decrement previous option by 1.
   - increment new option by 1.
3. Persist selected option and current vote counts in `localStorage`.
4. Show a confirmation toast:

```text
Vote saved on this device.
```

5. Show or reveal the “Sign in for more” prompt.

### Important caveat

Make it clear in the footer or prototype notice:

```text
Prototype only: votes are stored locally on this device and are not shared with other people.
```

But do not overemphasise this in the main experience. The main UI should feel real enough for user testing.

---

## 10. Fake sign-in prompt

After the user votes, show a card:

```text
Want to keep this trip in sync?
Sign in to save your vote, see group updates, and get price alerts.
[Sign in for more]
```

Clicking the button should open a fake modal:

```text
Sign-in prototype
In a real version, this would let you save your vote, sync across devices, and keep this trip with your group.
[Close]
```

No real auth.

---

## 11. Fake WhatsApp CTA

Add a prominent CTA card below the vote summary.

### Copy

```text
Ask AcmeTravel to track this on WhatsApp
Get a message if the price changes or when everyone has voted.
[Track this trip on WhatsApp]
```

### Behaviour for Phase 1

Click opens a fake modal, not real WhatsApp.

Modal copy:

```text
WhatsApp tracking prototype

In a real version, this would open a 1:1 WhatsApp chat with AcmeTravel.

Example first message:
"Track this Lisbon flight poll for me."

Then AcmeTravel could reply with buttons:
[Track price drops] [Notify when everyone votes] [Show cheaper dates]
```

Add a secondary disabled or fake link:

```text
Continue to WhatsApp
```

For now, clicking it can show:

```text
Not connected yet. This prototype only tests the shared artifact.
```

### Future hook

Implement the component so later we can replace fake modal behaviour with a real `wa.me` link:

```ts
const whatsappText = encodeURIComponent(
  "Track this Lisbon flight poll for me: " + window.location.href
);

const whatsappUrl = `https://wa.me/<BUSINESS_NUMBER>?text=${whatsappText}`;
```

Keep `<BUSINESS_NUMBER>` absent/configurable for now.

---

## 12. Sharing mechanics

Add two share controls:

### Primary

```text
Share to WhatsApp
```

Use:

```ts
const text = "Vote on these Lisbon flights";
const url = window.location.href;
const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
window.open(whatsappShareUrl, "_blank");
```

### Secondary

```text
Copy link
```

Use Clipboard API with fallback.

### Optional

If `navigator.share` exists, use native share sheet:

```ts
navigator.share({
  title: "Vote on these Lisbon flights",
  text: "Piero found 3 good options for Lisbon. Pick the one that works best for you.",
  url: window.location.href
});
```

But always keep an explicit WhatsApp button because that is the mechanic being tested.

---

## 13. Open Graph requirements

The page must include Open Graph metadata in the initial HTML.

Do not rely on client-side React to inject OG tags after load. WhatsApp must be able to fetch the HTML and see the tags immediately.

### Required tags

```html
<meta property="og:type" content="website" />
<meta property="og:site_name" content="AcmeTravel" />
<meta property="og:title" content="Vote on these Lisbon flights" />
<meta property="og:description" content="Piero found 3 good flight options for a May weekend in Lisbon. Pick the one that works best for you." />
<meta property="og:image" content="https://<github-username>.github.io/acmetravel-whatsapp-prototype/assets/og-flight-lisbon.png" />
<meta property="og:url" content="https://<github-username>.github.io/acmetravel-whatsapp-prototype/flights/lisbon-weekend/" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Vote on these Lisbon flights" />
<meta name="twitter:description" content="Pick the flight that works best for the group." />
<meta name="twitter:image" content="https://<github-username>.github.io/acmetravel-whatsapp-prototype/assets/og-flight-lisbon.png" />
```

### OG image

I will provide final assets as needed.

For now, create a placeholder image:

```text
/assets/og-flight-lisbon.png
```

Recommended dimensions:

```text
1200 × 630
```

Image content should include:

```text
AcmeTravel
Vote on these Lisbon flights
London → Lisbon
3 options from £148
```

Use simple high-contrast design. No Skyscanner logo.

### OG checklist

Before considering the prototype ready:

- URL is public.
- URL uses HTTPS.
- OG tags are in the initial HTML.
- OG image URL is absolute HTTPS.
- OG image is public.
- OG image is not blocked by robots/auth.
- Page title and OG title are action-oriented.
- WhatsApp preview tested by sending URL to at least one iOS and one Android WhatsApp user if possible.
- Create a new URL or query string when changing OG metadata, because WhatsApp may cache previews.

---

## 14. Accessibility

Minimum requirements:

- All buttons are real `<button>` or `<a>` elements.
- Focus states visible.
- Text contrast AA where practical.
- Cards have clear headings.
- Vote buttons have accessible labels, e.g.:

```text
Vote for cheapest flight, £148
```

- Modal traps focus or at least returns focus on close.
- No information conveyed only by colour.
- Page works at mobile widths around 360px.

---

## 15. Responsive behaviour

### Mobile

Primary test surface.

- Single-column layout.
- Sticky bottom action area optional:
  - “Share to WhatsApp”
  - “Track on WhatsApp”
- Cards full width.
- Vote buttons large enough for thumb use.

### Desktop

- Centred page.
- Max width around `720px`.
- Cards remain readable.
- No need for complex grid.

---

## 16. Content tone

Brand: AcmeTravel.

Tone:

- Clear.
- Friendly.
- Lightweight.
- Utility-led.
- No overclaiming.

Avoid:

```text
Book now
Guaranteed lowest price
Official Skyscanner
Powered by Skyscanner
```

Use:

```text
Vote
Track
Share
Save
Prototype
```

---

## 17. Suggested page layout

```text
[AcmeTravel logo/text]

Hero card
  Help us pick a flight to Lisbon
  London → Lisbon · Fri 16 May – Mon 19 May · 4 travellers
  Last checked 4 minutes ago

Share card
  Planning in WhatsApp?
  Share this poll with your group.
  [Share to WhatsApp] [Copy link]

Flight options
  [Option A card]
  [Option B card]
  [Option C card]

Vote summary
  Current favourite: EuropaJet 10:30
  3 people prefer this option
  Your vote: Best times

Sign-in prompt
  Want to keep this trip in sync?
  [Sign in for more]

WhatsApp tracking CTA
  Ask AcmeTravel to track this on WhatsApp
  [Track this trip on WhatsApp]

Prototype notice
  This is a prototype. Votes are stored locally on this device.
  [Reset prototype]
```

---

## 18. Acceptance criteria

Phase 1 is complete when:

1. A public GitHub Pages URL exists.
2. The flight poll page loads on mobile and desktop.
3. The WhatsApp preview displays a title, description, and image when pasted into WhatsApp.
4. The user can vote for a flight.
5. The selected vote persists after refresh via `localStorage`.
6. Vote counts update locally.
7. The user can change their vote.
8. The user sees a fake sign-in prompt after voting.
9. The fake WhatsApp tracking CTA opens an explanatory modal.
10. The user can share the URL to WhatsApp.
11. The user can copy the URL.
12. The code is structured so a hotel-vote artifact can be added later without rewriting the app.
13. No Skyscanner brand, APIs, internal data, internal assets, or private logic are present.
14. README explains how to run, build, deploy, and update OG assets.

---

## 19. README requirements

Add a `README.md` with:

```text
# AcmeTravel WhatsApp Artifact Prototype

## Purpose
A static prototype for testing WhatsApp-shared travel planning artifacts.

## Phase 1
Flight poll only.

## Run locally
npm install
npm run dev

## Build
npm run build

## Deploy
GitHub Pages instructions.

## Prototype limitations
- No backend
- No real auth
- No real WhatsApp Business integration
- Votes stored in localStorage only
- Public-safe fictional content only

## Updating Open Graph metadata
Explain where title, description, URL, and image live.

## Adding a new artifact
Explain how to add hotel_vote later.
```

---

## 20. Future phases to keep in mind

Do not build these now, but leave the architecture ready.

### Phase 2: Hotel vote

Artifact type:

```text
hotel_vote
```

Use cases:

- Vote on hotels.
- Preference dimensions: location, price, vibe, refundable, family-friendly.
- WhatsApp CTA: “Tell me if prices or availability change.”

### Phase 3: Trip board

Artifact type:

```text
trip_board
```

Use cases:

- Group collection of ideas.
- Flights, hotels, neighbourhoods, notes.
- Fake “summarise this plan” CTA.

### Phase 4: Real WhatsApp handoff

Replace fake modal with:

```text
https://wa.me/<BUSINESS_NUMBER>?text=<encoded artifact intent>
```

Then later integrate with a real WhatsApp Business account / Braze / BSP flow.

Potential first real WhatsApp buttons:

```text
[Track price drops]
[Notify when everyone votes]
[Show cheaper dates]
```

---

## 21. Implementation note

Prioritise getting the shared link and Open Graph preview working before polishing the UI. The core experiment fails if the WhatsApp preview does not render.

Build the smallest high-quality version of the Flight Poll first, then iterate visually.
