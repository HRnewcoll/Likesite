// ===========================
// FUTPacks – FIFA FUT Logic
// ===========================

// ---- DATA ----
const PACK_TYPES = [
  {
    id:'bronze', name:'Bronze Pack', emoji:'🥉', cssClass:'pack-bronze',
    desc:'A pack of 12 Bronze items. Great for SBCs and consumables.',
    price:400, playerCount:3, consumableCount:9,
    tier:'bronze',
    contents:['3 Bronze Players','9 Consumables'],
  },
  {
    id:'silver', name:'Silver Pack', emoji:'🥈', cssClass:'pack-silver',
    desc:'Contains 12 Silver items including a minimum of 3 Silver players.',
    price:1500, playerCount:3, consumableCount:9,
    tier:'silver',
    contents:['3 Silver Players','9 Consumables'],
  },
  {
    id:'gold', name:'Gold Pack', emoji:'🥇', cssClass:'pack-gold',
    desc:'12 Gold items. At least 3 Gold players. Your gateway to the ultimate team.',
    price:5000, playerCount:3, consumableCount:9,
    tier:'gold',
    contents:['3 Gold Players','9 Consumables'],
  },
  {
    id:'premium-gold', name:'Premium Gold Pack', emoji:'⭐', cssClass:'pack-gold',
    desc:'12 Gold items with a higher chance of Rare players.',
    price:7500, playerCount:3, consumableCount:9,
    tier:'gold', premiumRare:true,
    contents:['3 Gold Players (Rare ↑)','9 Consumables'],
  },
  {
    id:'mega', name:'Mega Pack', emoji:'💎', cssClass:'pack-mega',
    desc:'24 items including at least 3 Rare Gold players. More chances for top players!',
    price:20000, playerCount:12, consumableCount:12,
    tier:'gold', mega:true,
    contents:['12 Gold Players','12 Consumables','Rare chance ↑↑'],
  },
  {
    id:'tots', name:'TOTS Pack', emoji:'🌟', cssClass:'pack-tots',
    desc:'Team of the Season items guaranteed! Contains the best in-form players.',
    price:50000, playerCount:5, consumableCount:7,
    tier:'tots',
    contents:['5 TOTS Players','7 Consumables'],
    badge:'Limited',
  },
  {
    id:'toty', name:'TOTY Pack', emoji:'🏆', cssClass:'pack-toty',
    desc:'Team of the Year — the most coveted cards in FUT. Extremely rare!',
    price:100000, playerCount:3, consumableCount:9,
    tier:'toty',
    contents:['3 TOTY Nominees','9 Consumables'],
    badge:'RARE',
  },
];

const PLAYERS = {
  gold: [
    { name:'M. Salah', pos:'RW', rating:90, club:'Liverpool', nation:'🇪🇬', emoji:'⚡', variant:'gold' },
    { name:'K. Mbappé', pos:'ST', rating:91, club:'Real Madrid', nation:'🇫🇷', emoji:'🚀', variant:'gold' },
    { name:'E. Haaland', pos:'ST', rating:91, club:'Man City', nation:'🇳🇴', emoji:'💥', variant:'gold' },
    { name:'V. van Dijk', pos:'CB', rating:89, club:'Liverpool', nation:'🇳🇱', emoji:'🛡️', variant:'gold' },
    { name:'K. De Bruyne', pos:'CM', rating:91, club:'Man City', nation:'🇧🇪', emoji:'🎯', variant:'gold' },
    { name:'T. Alexander-Arnold', pos:'RB', rating:87, club:'Liverpool', nation:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', emoji:'🏃', variant:'gold' },
    { name:'B. Saka', pos:'RM', rating:86, club:'Arsenal', nation:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', emoji:'🌟', variant:'gold' },
    { name:'L. Martinez', pos:'GK', rating:88, club:'Inter Milan', nation:'🇦🇷', emoji:'🧤', variant:'gold' },
    { name:'J. Bellingham', pos:'CAM', rating:88, club:'Real Madrid', nation:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', emoji:'💫', variant:'gold' },
    { name:'R. Lewandowski', pos:'ST', rating:90, club:'Barcelona', nation:'🇵🇱', emoji:'⚽', variant:'gold' },
    { name:'F. Valverde', pos:'CM', rating:88, club:'Real Madrid', nation:'🇺🇾', emoji:'🌀', variant:'gold' },
    { name:'P. Dybala', pos:'ST', rating:87, club:'Roma', nation:'🇦🇷', emoji:'🎪', variant:'gold' },
    { name:'H. Kane', pos:'ST', rating:90, club:'Bayern Munich', nation:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', emoji:'🔫', variant:'gold' },
    { name:'R. Benzema', pos:'ST', rating:89, club:'Al-Ittihad', nation:'🇫🇷', emoji:'👑', variant:'gold' },
    { name:'C. Pulisic', pos:'LM', rating:84, club:'AC Milan', nation:'🇺🇸', emoji:'🦅', variant:'gold' },
  ],
  silver: [
    { name:'J. Ward-Prowse', pos:'CM', rating:80, club:'West Ham', nation:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', emoji:'🎯', variant:'silver' },
    { name:'C. Nkunku', pos:'CAM', rating:79, club:'Chelsea', nation:'🇫🇷', emoji:'⚡', variant:'silver' },
    { name:'D. Calvert-Lewin', pos:'ST', rating:79, club:'Everton', nation:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', emoji:'🎪', variant:'silver' },
    { name:'M. Rashford', pos:'LW', rating:81, club:'Man Utd', nation:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', emoji:'🌟', variant:'silver' },
    { name:'T. Abraham', pos:'ST', rating:79, club:'Roma', nation:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', emoji:'💪', variant:'silver' },
  ],
  bronze: [
    { name:'H. Mkhitaryan', pos:'CAM', rating:76, club:'Inter Milan', nation:'🇦🇲', emoji:'🎭', variant:'bronze' },
    { name:'B. Mendez', pos:'LM', rating:72, club:'Various', nation:'🌍', emoji:'🏃', variant:'bronze' },
    { name:'K. Denayer', pos:'CB', rating:74, club:'Free', nation:'🇧🇪', emoji:'🛡️', variant:'bronze' },
    { name:'J. Shelvey', pos:'CM', rating:71, club:'Notts County', nation:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', emoji:'🎯', variant:'bronze' },
    { name:'W. Igboananike', pos:'ST', rating:68, club:'Various', nation:'🌍', emoji:'⚽', variant:'bronze' },
  ],
  tots: [
    { name:'TOTS Salah', pos:'RW', rating:96, club:'Liverpool', nation:'🇪🇬', emoji:'🔥', variant:'tots' },
    { name:'TOTS Haaland', pos:'ST', rating:97, club:'Man City', nation:'🇳🇴', emoji:'💥', variant:'tots' },
    { name:'TOTS Mbappé', pos:'ST', rating:97, club:'Real Madrid', nation:'🇫🇷', emoji:'🚀', variant:'tots' },
    { name:'TOTS De Bruyne', pos:'CM', rating:95, club:'Man City', nation:'🇧🇪', emoji:'🎯', variant:'tots' },
    { name:'TOTS Bellingham', pos:'CAM', rating:95, club:'Real Madrid', nation:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', emoji:'💫', variant:'tots' },
    { name:'TOTS Vinicius Jr.', pos:'LW', rating:97, club:'Real Madrid', nation:'🇧🇷', emoji:'⚡', variant:'tots' },
  ],
  toty: [
    { name:'TOTY Mbappé', pos:'ST', rating:99, club:'Real Madrid', nation:'🇫🇷', emoji:'🏆', variant:'toty' },
    { name:'TOTY Haaland', pos:'ST', rating:99, club:'Man City', nation:'🇳🇴', emoji:'🏆', variant:'toty' },
    { name:'TOTY Vinicius', pos:'LW', rating:99, club:'Real Madrid', nation:'🇧🇷', emoji:'🏆', variant:'toty' },
    { name:'TOTY Rodri', pos:'CDM', rating:99, club:'Man City', nation:'🇪🇸', emoji:'🏆', variant:'toty' },
    { name:'TOTY Ter Stegen', pos:'GK', rating:98, club:'Barcelona', nation:'🇩🇪', emoji:'🧤', variant:'toty' },
  ],
};

const CONSUMABLES = [
  { name:'Position Change CAM→ST', pos:'CONS', rating:'—', club:'Consumable', nation:'', emoji:'📌', variant:'bronze' },
  { name:'Chemistry Style: Anchor', pos:'CONS', rating:'—', club:'Consumable', nation:'', emoji:'⚗️', variant:'silver' },
  { name:'Fitness Card ×7', pos:'CONS', rating:'—', club:'Consumable', nation:'', emoji:'💊', variant:'bronze' },
  { name:'Contract: 7 Matches', pos:'CONS', rating:'—', club:'Consumable', nation:'', emoji:'📄', variant:'bronze' },
  { name:'Squad Fitness', pos:'CONS', rating:'—', club:'Consumable', nation:'', emoji:'💪', variant:'silver' },
  { name:'Manager League Card', pos:'CONS', rating:'—', club:'Consumable', nation:'', emoji:'👔', variant:'bronze' },
];

const TICKER_DATA = [
  { user:'Golazo99', card:'TOTY Mbappé 99', pack:'TOTY Pack' },
  { user:'FutChampion', card:'TOTS Haaland 97', pack:'TOTS Pack' },
  { user:'DraftMaster', card:'Rare Salah 90', pack:'Mega Pack' },
  { user:'WL_Winner', card:'TOTS De Bruyne 95', pack:'TOTS Pack' },
  { user:'PackLuck', card:'Rare Mbappé 91', pack:'Premium Gold Pack' },
  { user:'CoinFlip', card:'TOTY Vinicius 99', pack:'TOTY Pack' },
  { user:'FullChem', card:'Rare Haaland 91', pack:'Mega Pack' },
];

// ---- STATE ----
let balance = 75000;
let club = [];
let pendingCards = [];
let currentPackId = null;

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  renderPacks();
  renderTicker();
  renderMarket();
});

// ---- PACK STORE ----
function renderPacks() {
  const grid = document.getElementById('packsGrid');
  grid.innerHTML = PACK_TYPES.map(pack => `
    <div class="pack-card ${pack.cssClass}" style="position:relative;">
      ${pack.badge ? `<div class="pack-badge">${pack.badge}</div>` : ''}
      <span class="pack-emoji">${pack.emoji}</span>
      <div class="pack-name">${pack.name}</div>
      <div class="pack-desc">${pack.desc}</div>
      <div class="pack-contents">
        ${pack.contents.map(c => `<span><span>${c}</span></span>`).join('')}
      </div>
      <div class="pack-price">${pack.price.toLocaleString()} Coins</div>
      <button class="btn-open-pack" onclick="openPack('${pack.id}')">⚽ Open Pack</button>
    </div>
  `).join('');
}

// ---- OPEN PACK ----
function openPack(packId) {
  const pack = PACK_TYPES.find(p => p.id === packId);
  if (!pack) return;
  if (balance < pack.price) { showToast(`❌ Need ${pack.price.toLocaleString()} coins!`); return; }
  balance -= pack.price;
  updateBalance();
  currentPackId = packId;

  const cards = generatePackCards(pack);
  pendingCards = cards;

  // Show modal
  const overlay = document.getElementById('openingOverlay');
  const title = document.getElementById('openingTitle');
  const reveal = document.getElementById('playersReveal');

  title.textContent = `Opening ${pack.name}…`;
  const total = cards.length;
  reveal.innerHTML = cards.map((c, i) => `<div class="player-card" id="fc${i}"></div>`).join('');
  overlay.classList.add('open');

  cards.forEach((card, i) => {
    setTimeout(() => {
      const el = document.getElementById(`fc${i}`);
      if (!el) return;
      el.classList.add('show', card.variant);
      const ratingHTML = card.pos === 'CONS'
        ? `<div class="player-emoji">${card.emoji}</div><div class="player-name" style="font-size:0.7rem;">${card.name}</div>`
        : `<div class="player-rating">${card.rating}</div>
           <div class="player-pos">${card.pos}</div>
           <div class="player-emoji">${card.emoji}</div>
           <div class="player-name">${card.name}</div>
           <div class="player-club">${card.nation} ${card.club}</div>`;
      el.innerHTML = ratingHTML;

      if (['tots','toty'].includes(card.variant)) {
        showToast(`🌟 ${card.variant.toUpperCase()} ${card.name} (${card.rating})!`);
      }
    }, 300 * (i + 1));
  });
}

function generatePackCards(pack) {
  const cards = [];
  const playerPool = PLAYERS[pack.tier] || PLAYERS.gold;
  const shuffledPlayers = [...playerPool].sort(() => Math.random() - 0.5);

  for (let i = 0; i < pack.playerCount && i < shuffledPlayers.length; i++) {
    cards.push(shuffledPlayers[i]);
  }

  // Fill remaining with consumables
  const shuffledCons = [...CONSUMABLES].sort(() => Math.random() - 0.5);
  for (let i = 0; i < pack.consumableCount && i < shuffledCons.length; i++) {
    cards.push(shuffledCons[i]);
  }
  return cards;
}

function closeOpening() { document.getElementById('openingOverlay').classList.remove('open'); }

function addAllToSquad() {
  const players = pendingCards.filter(c => c.pos !== 'CONS');
  club.push(...players);
  renderSquad();
  closeOpening();
  showToast(`✅ Added ${players.length} player${players.length !== 1 ? 's' : ''} to your club!`);
}

function openAgain() {
  if (!currentPackId) return;
  closeOpening();
  setTimeout(() => openPack(currentPackId), 200);
}

// ---- SQUAD ----
function renderSquad() {
  const grid = document.getElementById('squadGrid');
  document.getElementById('squadCount').textContent = `(${club.length} players)`;
  if (!club.length) {
    grid.innerHTML = '<div class="empty-state"><span>⚽</span>Open packs to add players to your club!</div>';
    return;
  }
  const sorted = [...club].sort((a,b) => (b.rating || 0) - (a.rating || 0));
  grid.innerHTML = sorted.map(p => `
    <div class="squad-card ${p.variant}">
      <div class="player-rating">${p.rating}</div>
      <div class="player-pos">${p.pos}</div>
      <div class="player-emoji">${p.emoji}</div>
      <div class="player-name">${p.name}</div>
      <div class="player-club" style="font-size:0.62rem;">${p.nation} ${p.club}</div>
    </div>
  `).join('');
}

// ---- MARKET ----
function renderMarket() {
  const grid = document.getElementById('marketGrid');
  const featured = [...PLAYERS.gold, ...PLAYERS.tots].sort(() => Math.random() - 0.5).slice(0, 12);
  grid.innerHTML = featured.map(p => {
    const marketVal = p.variant === 'tots' ? Math.floor(Math.random()*500000+50000) : Math.floor(Math.random()*50000+5000);
    return `
      <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:1.25rem;display:flex;align-items:center;gap:1rem;">
        <div class="squad-card ${p.variant}" style="min-width:80px;padding:0.6rem;text-align:center;">
          <div class="player-rating">${p.rating}</div>
          <div class="player-pos">${p.pos}</div>
          <div class="player-emoji">${p.emoji}</div>
          <div class="player-name" style="font-size:0.65rem;">${p.name.split(' ').pop()}</div>
        </div>
        <div style="flex:1;min-width:0;">
          <div style="font-weight:700;font-size:0.9rem;margin-bottom:0.25rem;">${p.name}</div>
          <div style="font-size:0.75rem;color:var(--text-secondary);margin-bottom:0.5rem;">${p.pos} · ${p.nation} ${p.club}</div>
          <div style="font-size:1rem;font-weight:800;color:var(--gold);margin-bottom:0.5rem;">${marketVal.toLocaleString()} 💰</div>
          <button onclick="buyFromMarket(${JSON.stringify(p).replace(/"/g,"'")} ,${marketVal})" style="background:var(--accent);color:#fff;border:none;border-radius:7px;padding:6px 14px;font-weight:700;font-size:0.8rem;cursor:pointer;">Buy Now</button>
        </div>
      </div>
    `;
  }).join('');
}

function buyFromMarket(player, price) {
  if (balance < price) { showToast(`❌ Need ${price.toLocaleString()} coins!`); return; }
  balance -= price;
  updateBalance();
  club.push(player);
  renderSquad();
  showToast(`✅ Signed ${player.name} for ${price.toLocaleString()} coins!`);
}

// ---- TICKER ----
function renderTicker() {
  const doubled = [...TICKER_DATA, ...TICKER_DATA];
  const html = doubled.map(t => `
    <div class="ticker-item">
      <strong>${t.user}</strong> packed <span class="ticker-gold">${t.card}</span> from <strong>${t.pack}</strong>
    </div>
  `).join('');
  const el = document.getElementById('tickerScroll');
  el.innerHTML = html + html;
}

// ---- BALANCE ----
function updateBalance() { document.getElementById('balance').textContent = `${balance.toLocaleString()} Coins`; }
function showDeposit() { showToast('💡 Coin packages: 12,000 / 28,000 / 65,000 / 110,000 — demo mode active.'); }

// ---- TOAST ----
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}
