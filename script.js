// Load JSON dynamically
fetch("data.json")
  .then(response => response.json())
  .then(data => {
    loadStats(data.stats);
    loadProblems(data.problems);
    loadChallenge(data.challenge);
  })
  .catch(err => console.error("Error loading JSON:", err));

// ================== Stats ==================
function loadStats(stats) {
  const statsContainer = document.querySelector(".stats");
  statsContainer.innerHTML = ""; // clear old static

  for (const [key, item] of Object.entries(stats)) {
    const div = document.createElement("div");
    div.className = "stat-card";
    div.innerHTML = `
      ${key.replace(/([A-Z])/g, " $1").trim()}
      <h2>${item.value}</h2>
      <span>${item.trend}</span>
    `;
    statsContainer.appendChild(div);
  }
}

// ================== Problems ==================
function loadProblems(problems) {
  const grid = document.querySelector(".problem-grid");
  grid.innerHTML = "";

  problems.forEach(p => {
    const card = document.createElement("div");
    card.className = "problem-card";
    card.innerHTML = `
      <div class="tags"><span class="tag ${p.difficulty}">${p.difficulty.charAt(0).toUpperCase() + p.difficulty.slice(1)}</span></div>
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <p>${p.solved} solved • ${p.time}</p>
      <p>⭐ ${p.rating}</p>
      <small>Contributed by <b>${p.contributor}</b> - ${p.badge}</small>
      <button class="btn small">Solve Problem</button>
    `;
    grid.appendChild(card);
  });
}

// ================== Challenge ==================
function loadChallenge(challenge) {
  const container = document.querySelector(".challenge");
  container.innerHTML = `
    <h2>🔥 60-Day Challenge</h2>
    <p>Current Streak: <b>${challenge.currentStreak} days</b></p>
    <div class="progress">
      <div class="progress-bar" style="width:${(challenge.progress / challenge.total) * 100}%"></div>
    </div>
    <p>${challenge.progress}/${challenge.total} days completed</p>
    <p>Longest Streak: ${challenge.longestStreak} | Total Active Days: ${challenge.activeDays}</p>
    <p class="${challenge.completedToday ? "success" : "danger"}">
      ${challenge.completedToday ? "✅ Today's challenge completed!" : "❌ Not completed today"}
    </p>
    <small>Next milestone: ${challenge.nextMilestone} days</small>
  `;
}
