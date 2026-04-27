const canonicalUrl =
  "https://pierosierra.github.io/AcmeShare/flights/lisbon-weekend/";

export function getCurrentShareUrl() {
  if (window.location.protocol.startsWith("http")) {
    return window.location.href;
  }

  return canonicalUrl;
}

export async function shareUpdatedPoll() {
  const shareUrl = getCurrentShareUrl();

  if (navigator.share) {
    await navigator.share({
      title: "Vote on these Lisbon flights",
      text: "Piero found 3 good options for Lisbon. Pick the one that works best for you.",
      url: shareUrl,
    });
    return "Shared poll.";
  }

  await copyLink(shareUrl);
  return "Link copied.";
}

export function openWhatsAppShare() {
  const text = `Vote on these Lisbon flights ${getCurrentShareUrl()}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(whatsappShareUrl, "_blank", "noopener,noreferrer");
}

export async function copyLink(url = getCurrentShareUrl()) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(url);
    return;
  }

  const input = document.createElement("input");
  input.value = url;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  input.remove();
}

export function getFutureWhatsAppTrackingUrl() {
  const businessNumber = "";
  const whatsappText = encodeURIComponent(
    `Track this Lisbon flight poll for me: ${getCurrentShareUrl()}`,
  );

  if (!businessNumber) {
    return null;
  }

  return `https://wa.me/${businessNumber}?text=${whatsappText}`;
}
