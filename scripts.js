const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");
const resetBtn = document.getElementById("resetBtn");
const hint = document.getElementById("hint");
const hearts = document.getElementById("hearts");
const card = document.getElementById("card");

let noDodges = 0;

function rand(min, max){ return Math.random() * (max - min) + min; }

function moveNoButton() {
  // Place NO somewhere inside the card area (so it doesn't fly off-screen)
  const cardRect = card.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const padding = 14;
  const minX = padding;
  const maxX = cardRect.width - btnRect.width - padding;
  const minY = padding;
  const maxY = cardRect.height - btnRect.height - padding;

  const x = rand(minX, maxX);
  const y = rand(minY, maxY);

  // Make it "escape": switch to absolute positioning within card
  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  noDodges++;
  if (noDodges === 2) hint.textContent = "Okay okay… you can stop trying 😅";
  if (noDodges === 4) hint.textContent = "This button is undefeated 🏃‍♂️💨";
  if (noDodges >= 6) hint.textContent = "Just press YES, don’t be shy 💖";
}

function spawnHearts(count = 18) {
  const rect = card.getBoundingClientRect();
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.className = "heart";
    el.textContent = ["💖","💘","💗","💞","💓"][Math.floor(Math.random()*5)];
    el.style.left = `${rand(rect.left + 20, rect.right - 20)}px`;
    el.style.top = `${rand(rect.top + rect.height*0.55, rect.bottom - 20)}px`;
    el.style.animationDelay = `${rand(0, 0.25)}s`;
    el.style.fontSize = `${rand(16, 26)}px`;
    hearts.appendChild(el);

    // cleanup
    setTimeout(() => el.remove(), 2200);
  }
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});

yesBtn.addEventListener("click", () => {
  result.hidden = false;
  spawnHearts(26);

  // Make NO harmless after YES
  noBtn.disabled = true;
  noBtn.style.opacity = 0.35;
  noBtn.style.cursor = "not-allowed";
  hint.textContent = "Best choice 😌";
});

resetBtn.addEventListener("click", () => {
  result.hidden = true;
  noDodges = 0;
  hint.textContent = "Tip: try clicking “NO” 😈";
  noBtn.disabled = false;
  noBtn.style.opacity = 1;
  noBtn.style.cursor = "pointer";
  noBtn.style.position = "";
  noBtn.style.left = "";
  noBtn.style.top = "";
});
