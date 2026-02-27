// ===========================
// CS2Crash – Game Logic
// ===========================

// ---- STATE ----
let balance = 1000;
let roundId = 8421;
let gameState = 'waiting'; // 'waiting' | 'running' | 'crashed'
let currentMult = 1.00;
let crashPoint = 1.00;
let betPlaced = false;
let betAmount = 0;
let cashedOut = false;
let cashoutMult = 0;
let animFrame = null;
let startTime = 0;
let waitTimer = null;
let prevRounds = [];
let myHistory = [];
let totalWon = 0;
let totalLost = 0;
let bestMult = 0;
let roundsPlayed = 0;

// ---- FAKE PLAYERS ----
const BOT_NAMES = ['xXShadowXx','ProPlayer99','NightOwl','TopFragger','CS2King','FragMaster','GhostSniper','TitaniumX','EliteOps','Striker47','AimGod','SmokeBoy','FlashPop','WallBang','DropShot'];
const BOT_AVATARS = BOT_NAMES.map(n => `https://api.dicebear.com/7.x/avataaars/svg?seed=${n}`);
let roundPlayers = [];

// ---- CANVAS ----
const canvas = document.getElementById('crashCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  const wrap = canvas.parentElement;
  canvas.width = wrap.clientWidth;
  canvas.height = 380;
}
window.addEventListener('resize', () => { resizeCanvas(); drawGraph(); });
resizeCanvas();

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  updateBalance();
  renderPrevRounds();
  updateBetProfit();
  document.getElementById('betAmount').addEventListener('input', updateBetProfit);
  document.getElementById('autoCashout').addEventListener('input', updateBetProfit);
  startWaiting();
});

// ---- GAME FLOW ----
function startWaiting() {
  gameState = 'waiting';
  currentMult = 1.00;
  betPlaced = false;
  cashedOut = false;
  cashoutMult = 0;
  roundId++;
  crashPoint = generateCrashPoint();
  generateBotPlayers();
  updateRoundUI();
  updateBetBtn();
  let countdown = 5;
  document.getElementById('statusBadge').textContent = `Starting in ${countdown}s…`;
  document.getElementById('statusBadge').className = 'status-badge status-waiting';
  document.getElementById('multLabel').textContent = 'WAITING';
  document.getElementById('multValue').textContent = '1.00×';
  document.getElementById('multValue').style.color = 'var(--gold)';
  drawGraph();

  waitTimer = setInterval(() => {
    countdown--;
    document.getElementById('statusBadge').textContent = countdown > 0 ? `Starting in ${countdown}s…` : 'Launching…';
    if (countdown <= 0) {
      clearInterval(waitTimer);
      startRound();
    }
  }, 1000);
}

function startRound() {
  gameState = 'running';
  startTime = performance.now();
  document.getElementById('multLabel').textContent = 'MULTIPLIER';
  document.getElementById('multValue').style.color = 'var(--green)';
  document.getElementById('statusBadge').textContent = '🟢 Live';
  document.getElementById('statusBadge').className = 'status-badge status-running';
  updateBetBtn();
  animFrame = requestAnimationFrame(tick);
}

function tick(now) {
  const elapsed = (now - startTime) / 1000; // seconds
  // Exponential growth formula similar to real crash games
  currentMult = parseFloat(Math.pow(Math.E, 0.08 * elapsed).toFixed(2));
  document.getElementById('multValue').textContent = currentMult.toFixed(2) + '×';

  // Update profit display for placed bet
  if (betPlaced && !cashedOut) {
    const profit = (betAmount * currentMult - betAmount).toFixed(2);
    document.getElementById('betProfit').innerHTML = `Current win: <strong style="color:var(--gold);">+$${profit}</strong>`;
  }

  // Auto cashout
  if (betPlaced && !cashedOut && document.getElementById('autoEnabled').checked) {
    const autoAt = parseFloat(document.getElementById('autoCashout').value);
    if (currentMult >= autoAt) {
      performCashout();
    }
  }

  // Update bot cashouts
  roundPlayers.forEach(p => {
    if (!p.cashedOut && p.autoCashout && currentMult >= p.autoCashout) {
      p.cashedOut = true;
      p.cashoutMult = currentMult;
    }
  });
  renderPlayers();
  drawGraph();

  if (currentMult >= crashPoint) {
    crash();
  } else {
    animFrame = requestAnimationFrame(tick);
  }
}

function crash() {
  gameState = 'crashed';
  cancelAnimationFrame(animFrame);
  document.getElementById('multValue').style.color = 'var(--red)';
  document.getElementById('multValue').textContent = currentMult.toFixed(2) + '×';
  document.getElementById('multLabel').textContent = 'CRASHED';
  document.getElementById('statusBadge').textContent = `💥 Crashed at ${currentMult.toFixed(2)}×`;
  document.getElementById('statusBadge').className = 'status-badge status-crashed';
  updateBetBtn();
  drawGraph(true);

  // Resolve bet
  if (betPlaced && !cashedOut) {
    balance -= betAmount;
    updateBalance();
    totalLost += betAmount;
    document.getElementById('totalLost').textContent = `$${totalLost.toFixed(0)}`;
    addHistory(roundId, betAmount, currentMult, null, 'Lost');
    showToast(`💥 Crashed at ${currentMult.toFixed(2)}× — Lost $${betAmount}`);
    roundsPlayed++;
    document.getElementById('roundsPlayed').textContent = roundsPlayed;
  }

  // Mark remaining bots as lost
  roundPlayers.forEach(p => { if (!p.cashedOut) p.lost = true; });
  renderPlayers();

  prevRounds.unshift(currentMult);
  if (prevRounds.length > 12) prevRounds.pop();
  renderPrevRounds();

  setTimeout(() => startWaiting(), 3500);
}

// ---- BET / CASHOUT ----
function handleBetBtn() {
  if (gameState === 'crashed') return;
  if (gameState === 'running' && betPlaced && !cashedOut) {
    performCashout();
    return;
  }
  if (gameState === 'running' && !betPlaced) return; // too late to bet mid-round (simplified)
  if (gameState === 'waiting') {
    const amount = parseFloat(document.getElementById('betAmount').value);
    if (!amount || amount < 1) { showToast('❌ Enter a valid bet amount'); return; }
    if (amount > balance) { showToast('❌ Not enough coins!'); return; }
    betAmount = amount;
    betPlaced = true;
    // Add self to players list
    roundPlayers.unshift({ name:'Player123', avatar:`https://api.dicebear.com/7.x/avataaars/svg?seed=CrashPlayer`, bet:betAmount, autoCashout:null, cashedOut:false, lost:false, isMe:true });
    renderPlayers();
    showToast(`✅ Bet of $${betAmount} placed!`);
    updateBetBtn();
    updateBetProfit();
  }
}

function performCashout() {
  if (!betPlaced || cashedOut) return;
  cashedOut = true;
  cashoutMult = currentMult;
  const winnings = betAmount * cashoutMult;
  balance += winnings;
  updateBalance();
  const profit = winnings - betAmount;
  totalWon += profit;
  document.getElementById('totalWon').textContent = `$${totalWon.toFixed(0)}`;
  if (cashoutMult > bestMult) {
    bestMult = cashoutMult;
    document.getElementById('bestMult').textContent = bestMult.toFixed(2) + '×';
  }
  roundsPlayed++;
  document.getElementById('roundsPlayed').textContent = roundsPlayed;
  addHistory(roundId, betAmount, null, cashoutMult, 'Won');
  showToast(`🎉 Cashed out at ${cashoutMult.toFixed(2)}× — Won +$${profit.toFixed(2)}!`);
  document.getElementById('betProfit').innerHTML = `Won: <strong style="color:var(--green);">+$${profit.toFixed(2)}</strong>`;
  // mark self as cashed out in players
  const me = roundPlayers.find(p => p.isMe);
  if (me) { me.cashedOut = true; me.cashoutMult = cashoutMult; }
  renderPlayers();
  updateBetBtn();
}

function updateBetBtn() {
  const btn = document.getElementById('betBtn');
  if (gameState === 'waiting') {
    if (betPlaced) {
      btn.textContent = '✅ Bet Queued — Waiting…';
      btn.className = 'btn-bet waiting';
    } else {
      btn.textContent = '🚀 Place Bet';
      btn.className = 'btn-bet place';
    }
  } else if (gameState === 'running') {
    if (betPlaced && !cashedOut) {
      btn.textContent = '💰 Cash Out Now!';
      btn.className = 'btn-bet cashout';
    } else if (cashedOut) {
      btn.textContent = `✅ Cashed Out at ${cashoutMult.toFixed(2)}×`;
      btn.className = 'btn-bet waiting';
    } else {
      btn.textContent = '⏳ Round Running…';
      btn.className = 'btn-bet waiting';
    }
  } else {
    btn.textContent = '💥 Crashed!';
    btn.className = 'btn-bet waiting';
  }
}

// ---- QUICK BET HELPERS ----
function setQuickBet(v) { document.getElementById('betAmount').value = v; updateBetProfit(); }
function halfBet() { const v = parseFloat(document.getElementById('betAmount').value) || 50; document.getElementById('betAmount').value = Math.max(1, Math.floor(v/2)); updateBetProfit(); }
function doubleBet() { const v = parseFloat(document.getElementById('betAmount').value) || 50; document.getElementById('betAmount').value = Math.min(balance, v*2); updateBetProfit(); }
function maxBet() { document.getElementById('betAmount').value = Math.floor(balance); updateBetProfit(); }
function updateBetProfit() {
  const bet = parseFloat(document.getElementById('betAmount').value) || 0;
  const mult = parseFloat(document.getElementById('autoCashout').value) || 2;
  const win = (bet * mult - bet).toFixed(2);
  document.getElementById('betProfit').innerHTML = `Potential win at ${mult}×: <strong>+$${win}</strong>`;
}

// ---- CRASH POINT GENERATOR (house edge ~4%) ----
function generateCrashPoint() {
  const r = Math.random();
  if (r < 0.04) return 1.00; // instant crash 4%
  const e = 0.96;
  return parseFloat(Math.max(1.01, (1 / (1 - r * e))).toFixed(2));
}

// ---- DRAW GRAPH ----
function drawGraph(crashed = false) {
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const pad = { left:50, bottom:40, right:20, top:20 };
  const gW = W - pad.left - pad.right;
  const gH = H - pad.top - pad.bottom;

  // Background grid
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 5; i++) {
    const y = pad.top + (gH / 5) * i;
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();
  }
  for (let i = 0; i <= 6; i++) {
    const x = pad.left + (gW / 6) * i;
    ctx.beginPath(); ctx.moveTo(x, pad.top); ctx.lineTo(x, H - pad.bottom); ctx.stroke();
  }

  if (gameState === 'waiting') {
    ctx.fillStyle = 'rgba(240,180,41,0.6)';
    ctx.font = 'bold 18px Segoe UI, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Next round starting soon…', W/2, H/2);
    return;
  }

  // Build graph points based on currentMult
  const maxMult = Math.max(currentMult + 0.5, 2.5);
  const elapsed = (Math.log(currentMult) / 0.08); // inverse of pow(E, 0.08*t)
  const maxTime = Math.max(elapsed + 2, 8);

  const points = [];
  const steps = 80;
  for (let i = 0; i <= steps; i++) {
    const t = (elapsed * i) / steps;
    const m = Math.pow(Math.E, 0.08 * t);
    if (m > currentMult + 0.01) break;
    const px = pad.left + (t / maxTime) * gW;
    const py = H - pad.bottom - ((m - 1) / (maxMult - 1)) * gH;
    points.push([px, py]);
  }

  if (points.length < 2) return;

  // Gradient fill
  const grad = ctx.createLinearGradient(0, pad.top, 0, H - pad.bottom);
  if (crashed) {
    grad.addColorStop(0, 'rgba(239,68,68,0.35)');
    grad.addColorStop(1, 'rgba(239,68,68,0.02)');
  } else {
    grad.addColorStop(0, 'rgba(34,197,94,0.3)');
    grad.addColorStop(1, 'rgba(34,197,94,0.02)');
  }

  ctx.beginPath();
  ctx.moveTo(points[0][0], H - pad.bottom);
  points.forEach(([px,py]) => ctx.lineTo(px, py));
  ctx.lineTo(points[points.length-1][0], H - pad.bottom);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  points.forEach(([px,py]) => ctx.lineTo(px, py));
  ctx.strokeStyle = crashed ? '#ef4444' : '#22c55e';
  ctx.lineWidth = 3;
  ctx.lineJoin = 'round';
  ctx.stroke();

  // Y axis labels
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.font = '11px Segoe UI';
  ctx.textAlign = 'right';
  for (let m = 1; m <= Math.ceil(maxMult); m++) {
    const y = H - pad.bottom - ((m - 1) / (maxMult - 1)) * gH;
    if (y > pad.top && y < H - pad.bottom) {
      ctx.fillText(m + '×', pad.left - 6, y + 4);
    }
  }
}

// ---- PREV ROUNDS ----
function renderPrevRounds() {
  const container = document.getElementById('prevRounds');
  const all = [currentMult, ...prevRounds].slice(1); // skip current
  if (!all.length) { container.innerHTML = '<span style="color:var(--text-secondary);font-size:0.8rem;">No previous rounds</span>'; return; }
  container.innerHTML = prevRounds.map(m => {
    let cls = m < 1.5 ? 'crashed' : m < 3 ? 'mid' : 'safe';
    return `<span class="prev-round ${cls}">${m.toFixed(2)}×</span>`;
  }).join('');
}

// ---- BOT PLAYERS ----
function generateBotPlayers() {
  const count = Math.floor(Math.random() * 8) + 5;
  roundPlayers = Array.from({ length: count }, (_, i) => {
    const bet = parseFloat((Math.random() * 200 + 5).toFixed(2));
    const autoCashout = Math.random() > 0.3 ? parseFloat((Math.random() * 4 + 1.2).toFixed(2)) : null;
    return { name: BOT_NAMES[i % BOT_NAMES.length], avatar: BOT_AVATARS[i % BOT_AVATARS.length], bet, autoCashout, cashedOut: false, lost: false, isMe: false };
  });
  renderPlayers();
}

function renderPlayers() {
  const list = document.getElementById('playersList');
  document.getElementById('playerCount').textContent = roundPlayers.length;
  list.innerHTML = roundPlayers.map(p => {
    let cashoutHTML;
    if (p.lost) cashoutHTML = `<span class="player-cashout lost">💥 Lost</span>`;
    else if (p.cashedOut) cashoutHTML = `<span class="player-cashout won">✅ ${p.cashoutMult ? p.cashoutMult.toFixed(2)+'×' : ''}</span>`;
    else cashoutHTML = `<span class="player-cashout playing">${gameState === 'running' ? (currentMult.toFixed(2)+'×') : '—'}</span>`;
    return `
      <div class="player-row">
        <img class="player-avatar-sm" src="${p.avatar}" onerror="this.style.display='none'" alt="" />
        <span class="player-name">${p.name}${p.isMe ? ' <span style="color:var(--accent);font-size:0.75rem;">(you)</span>' : ''}</span>
        <span class="player-bet">$${p.bet.toFixed(0)}</span>
        ${cashoutHTML}
      </div>
    `;
  }).join('');
}

// ---- HISTORY ----
function addHistory(round, bet, crashedAt, cashedOutAt, result) {
  myHistory.unshift({ round, bet, crashedAt, cashedOutAt, result, time: new Date().toLocaleTimeString() });
  renderHistory();
}
function renderHistory() {
  const body = document.getElementById('historyBody');
  if (!myHistory.length) {
    body.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--text-secondary);">No bets yet.</td></tr>';
    return;
  }
  body.innerHTML = myHistory.slice(0,20).map(h => `
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px 12px;">#${h.round}</td>
      <td style="padding:10px 12px;color:var(--text-secondary);">$${h.bet}</td>
      <td style="padding:10px 12px;">${h.crashedAt ? h.crashedAt.toFixed(2)+'×' : '—'}</td>
      <td style="padding:10px 12px;">${h.cashedOutAt ? h.cashedOutAt.toFixed(2)+'×' : '—'}</td>
      <td style="padding:10px 12px;font-weight:700;color:${h.result==='Won'?'var(--green)':'var(--red)'};">${h.result==='Won'?'✅ Won':'💥 Lost'}</td>
      <td style="padding:10px 12px;color:var(--text-secondary);">${h.time}</td>
    </tr>
  `).join('');
}

// ---- UPDATE UI ----
function updateBalance() { document.getElementById('balance').textContent = balance.toFixed(2); }
function updateRoundUI() {
  document.getElementById('roundId').textContent = '#' + roundId;
  const hash = Math.random().toString(36).substring(2,10);
  document.getElementById('roundHash').textContent = hash + '…';
}

// ---- TOAST ----
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}
function showDeposit() { showToast('💡 Deposit feature coming soon — this is a demo!'); }
