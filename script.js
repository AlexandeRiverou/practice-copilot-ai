const elements = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
  targetDate: document.querySelector("#target-date"),
};

const pad = (value) => String(value).padStart(2, "0");

function getNextChristmas() {
  const now = new Date();
  const christmas = new Date(now.getFullYear(), 11, 25);
  return now < christmas ? christmas : new Date(now.getFullYear() + 1, 11, 25);
}

function updateCountdown() {
  const target = getNextChristmas();
  const now = new Date();
  const remaining = Math.max(0, target.getTime() - now.getTime());
  const totalSeconds = Math.floor(remaining / 1000);

  elements.days.textContent = Math.floor(totalSeconds / 86400);
  elements.hours.textContent = pad(Math.floor((totalSeconds % 86400) / 3600));
  elements.minutes.textContent = pad(Math.floor((totalSeconds % 3600) / 60));
  elements.seconds.textContent = pad(totalSeconds % 60);
  elements.targetDate.textContent = target.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);
