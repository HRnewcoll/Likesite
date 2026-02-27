// ===========================
// ApexPacks – Frontend Logic
// ===========================

// ---- DATA ----
const PACK_TYPES = [
  {
    id: 'standard',
    name: 'Apex Pack',
    emoji: '📦',
    desc: 'Contains 3 items. At least one Rare or better guaranteed. No duplicate items!',
    price: 100,
    cssClass: 'pack-standard',
    odds: { 'Heirloom': '0.2%', 'Legendary': '7.4%', 'Epic': '14.8%', 'Rare': '77.6%' },
    weights: { heirloom:0.002, legendary:0.074, epic:0.148, rare:0.776 }
  },
  {
    id: 'apex',
    name: 'Apex Bundle Pack',
    emoji: '🔶',
    desc: 'Boosted odds! Contains 3 items with increased Legendary drop rate.',
    price: 200,
    cssClass: 'pack-apex',
    odds: { 'Heirloom': '0.5%', 'Legendary': '18%', 'Epic': '25%', 'Rare': '56.5%' },
    weights: { heirloom:0.005, legendary:0.18, epic:0.25, rare:0.565 }
  },
  {
    id: 'legendary',
    name: 'Legendary Pack',
    emoji: '⭐',
    desc: 'Guaranteed at least one Legendary item. Premium pack for serious collectors.',
    price: 450,
    cssClass: 'pack-legendary',
    odds: { 'Heirloom': '1%', 'Legendary': '100%', 'Epic': '50%', 'Rare': 'Rest' },
    weights: { heirloom:0.01, legendary:1.0, epic:0.5, rare:0.49 }
  },
  {
    id: 'heirloom',
    name: 'Heirloom Pack',
    emoji: '💠',
    desc: 'Ultra-rare Heirloom Shards guaranteed! Includes 3 bonus items.',
    price: 2000,
    cssClass: 'pack-heirloom',
    odds: { 'Heirloom': '100%', 'Legendary': '100%', 'Epic': '100%', 'Rare': '—' },
    weights: { heirloom:1.0, legendary:1.0, epic:1.0, rare:0 }
  },
];

const ITEMS_POOL = [
  // Wraith
  { name:'Wraith | Void Specialist', emoji:'👻', legend:'Wraith', rarity:'legendary', type:'Skin' },
  { name:'Wraith | Voidwalker', emoji:'🌀', legend:'Wraith', rarity:'legendary', type:'Skin' },
  { name:'Wraith | Dream Catcher', emoji:'💫', legend:'Wraith', rarity:'epic', type:'Skin' },
  { name:'Wraith | Fractal Weave', emoji:'🕸️', legend:'Wraith', rarity:'rare', type:'Banner Frame' },
  { name:'Wraith Heirloom Shards', emoji:'💠', legend:'Wraith', rarity:'heirloom', type:'Heirloom' },
  // Bloodhound
  { name:'Bloodhound | Imperial Warrior', emoji:'🐺', legend:'Bloodhound', rarity:'legendary', type:'Skin' },
  { name:'Bloodhound | Raven\'s Shadow', emoji:'🦅', legend:'Bloodhound', rarity:'epic', type:'Skin' },
  { name:'Bloodhound | Tracker', emoji:'🔍', legend:'Bloodhound', rarity:'rare', type:'Badge' },
  { name:'Bloodhound Heirloom Shards', emoji:'💠', legend:'Bloodhound', rarity:'heirloom', type:'Heirloom' },
  // Octane
  { name:'Octane | El Diablo', emoji:'🔥', legend:'Octane', rarity:'legendary', type:'Skin' },
  { name:'Octane | Speed Demon', emoji:'⚡', legend:'Octane', rarity:'epic', type:'Skin' },
  { name:'Octane | Adrenaline Rush', emoji:'💊', legend:'Octane', rarity:'rare', type:'Banner Pose' },
  // Lifeline
  { name:'Lifeline | Vital Signs', emoji:'❤️', legend:'Lifeline', rarity:'legendary', type:'Skin' },
  { name:'Lifeline | Combat Medic', emoji:'⚕️', legend:'Lifeline', rarity:'epic', type:'Skin' },
  { name:'Lifeline | First Responder', emoji:'🏥', legend:'Lifeline', rarity:'rare', type:'Intro Quip' },
  // Pathfinder
  { name:'Pathfinder | Forward Slash', emoji:'🤖', legend:'Pathfinder', rarity:'legendary', type:'Skin' },
  { name:'Pathfinder | Aviator', emoji:'✈️', legend:'Pathfinder', rarity:'epic', type:'Skin' },
  { name:'Pathfinder | Friendly Robot', emoji:'🦾', legend:'Pathfinder', rarity:'rare', type:'Badge' },
  // Bangalore
  { name:'Bangalore | Apex Overdrive', emoji:'🎖️', legend:'Bangalore', rarity:'legendary', type:'Skin' },
  { name:'Bangalore | Soldier of Fortune', emoji:'💂', legend:'Bangalore', rarity:'epic', type:'Skin' },
  { name:'Bangalore | Double Time Tracker', emoji:'⏱️', legend:'Bangalore', rarity:'rare', type:'Tracker' },
  // Mirage
  { name:'Mirage | Il Buffone', emoji:'🎭', legend:'Mirage', rarity:'legendary', type:'Skin' },
  { name:'Mirage | Prestidigitator', emoji:'🪄', legend:'Mirage', rarity:'epic', type:'Skin' },
  { name:'Mirage Heirloom Shards', emoji:'💠', legend:'Mirage', rarity:'heirloom', type:'Heirloom' },
  // Caustic
  { name:'Caustic | Philosopher\'s Stone', emoji:'☠️', legend:'Caustic', rarity:'legendary', type:'Skin' },
  { name:'Caustic | Blackheart', emoji:'🖤', legend:'Caustic', rarity:'epic', type:'Skin' },
  { name:'Caustic Heirloom Shards', emoji:'💠', legend:'Caustic', rarity:'heirloom', type:'Heirloom' },
  // Generic
  { name:'Gold Knockdown Shield', emoji:'🛡️', legend:'Universal', rarity:'epic', type:'Weapon Charm' },
  { name:'Rainbow Rocket Trail', emoji:'🌈', legend:'Universal', rarity:'rare', type:'Banner Frame' },
  { name:'Apex Coins Badge', emoji:'🏅', legend:'Universal', rarity:'rare', type:'Badge' },
  { name:'Season 22 Frame', emoji:'🖼️', legend:'Universal', rarity:'rare', type:'Banner Frame' },
  { name:'Music Pack: Champion', emoji:'🎵', legend:'Universal', rarity:'rare', type:'Music Pack' },
  { name:'Loading Screen: Arena', emoji:'🖼️', legend:'Universal', rarity:'common', type:'Loading Screen' },
];

const LIVE_DROPS = [
  { player:'NocturnalAim', item:'Wraith | Voidwalker', rarity:'legendary' },
  { player:'FlankMaster', item:'Bloodhound Heirloom Shards', rarity:'heirloom' },
  { player:'PredatorX', item:'Octane | El Diablo', rarity:'legendary' },
  { player:'SkyDropper', item:'Caustic Heirloom Shards', rarity:'heirloom' },
  { player:'ApexKing99', item:'Mirage | Il Buffone', rarity:'legendary' },
  { player:'SquadWipe', item:'Lifeline | Vital Signs', rarity:'legendary' },
  { player:'BoxFighter', item:'Pathfinder | Forward Slash', rarity:'legendary' },
  { player:'RingChaser', item:'Wraith Heirloom Shards', rarity:'heirloom' },
];

// ---- STATE ----
let balance = 3200;
let collection = [];
let currentPackType = null;
let legendFilter = 'all';

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  renderPacks();
  renderDropsFeed();
  renderLegendsFilter();
});

// ---- PACK STORE ----
function renderPacks() {
  const grid = document.getElementById('packsGrid');
  grid.innerHTML = PACK_TYPES.map(pack => `
    <div class="pack-card ${pack.cssClass}">
      <span class="pack-emoji">${pack.emoji}</span>
      <div class="pack-name">${pack.name}</div>
      <div class="pack-desc">${pack.desc}</div>
      <div class="pack-odds">
        ${Object.entries(pack.odds).map(([r,o]) => `<div class="odds-row"><span>${r}</span><span>${o}</span></div>`).join('')}
      </div>
      <div class="pack-price">${pack.price.toLocaleString()} Coins</div>
      <button class="btn-open-pack" onclick="startOpenPack('${pack.id}')">🎁 Open Pack</button>
    </div>
  `).join('');
}

// ---- OPEN PACK ----
function startOpenPack(packId) {
  const pack = PACK_TYPES.find(p => p.id === packId);
  if (!pack) return;
  if (balance < pack.price) { showToast(`❌ Not enough Coins! Need ${pack.price.toLocaleString()}`); return; }
  balance -= pack.price;
  updateBalance();
  currentPackType = pack;
  const items = generatePackItems(pack);
  showOpeningModal(pack, items);
}

function generatePackItems(pack) {
  const items = [];
  const count = 3;
  for (let i = 0; i < count; i++) {
    const rarity = rollRarity(pack, i, items);
    const pool = ITEMS_POOL.filter(item => item.rarity === rarity && !items.find(x => x.name === item.name));
    if (pool.length) {
      items.push(pool[Math.floor(Math.random() * pool.length)]);
    } else {
      // Fallback to rare
      const fallback = ITEMS_POOL.filter(item => item.rarity === 'rare');
      items.push(fallback[Math.floor(Math.random() * fallback.length)]);
    }
  }
  return items;
}

function rollRarity(pack, slotIndex, already) {
  const w = pack.weights;
  if (pack.id === 'heirloom') {
    if (slotIndex === 0) return 'heirloom';
    if (slotIndex === 1) return 'legendary';
    return 'epic';
  }
  if (pack.id === 'legendary' && slotIndex === 0) return 'legendary';
  const r = Math.random();
  if (r < w.heirloom) return 'heirloom';
  if (r < w.heirloom + w.legendary) return 'legendary';
  if (r < w.heirloom + w.legendary + w.epic) return 'epic';
  return 'rare';
}

function showOpeningModal(pack, items) {
  const overlay = document.getElementById('openingOverlay');
  const title = document.getElementById('openingTitle');
  const cardsEl = document.getElementById('revealCards');
  title.textContent = `Opening ${pack.name}…`;
  cardsEl.innerHTML = items.map((item, i) => `
    <div class="reveal-card" id="revCard${i}">
      <div style="font-size:2rem;margin-bottom:0.5rem;">❓</div>
      <div style="color:var(--text-secondary);font-size:0.82rem;">Revealing…</div>
    </div>
  `).join('');
  overlay.classList.add('open');
  items.forEach((item, i) => {
    setTimeout(() => {
      const card = document.getElementById(`revCard${i}`);
      card.classList.add('show', item.rarity);
      card.innerHTML = `
        <span class="reveal-emoji">${item.emoji}</span>
        <div class="reveal-name">${item.name}</div>
        <div style="color:var(--text-secondary);font-size:0.72rem;margin-bottom:0.4rem;">${item.type} · ${item.legend}</div>
        <span class="reveal-rarity rarity-${item.rarity}">${item.rarity}</span>
      `;
      if (item.rarity === 'legendary' || item.rarity === 'heirloom') {
        showToast(`${item.rarity === 'heirloom' ? '💠 HEIRLOOM' : '⭐ Legendary'}! ${item.name}`);
      }
      collection.push({ ...item });
      renderCollection();
    }, 600 * (i + 1));
  });
}

function closeOpening() {
  document.getElementById('openingOverlay').classList.remove('open');
}

function openAgain() {
  if (!currentPackType) return;
  closeOpening();
  setTimeout(() => startOpenPack(currentPackType.id), 200);
}

// ---- COLLECTION ----
function renderLegendsFilter() {
  const legends = ['all', ...new Set(ITEMS_POOL.map(i => i.legend))];
  document.getElementById('legendsFilter').innerHTML = legends.map(l => `
    <button class="filter-btn ${l === legendFilter ? 'active' : ''}" onclick="setLegendFilter('${l}',this)">${l === 'all' ? 'All' : l}</button>
  `).join('');
}

function setLegendFilter(legend, btn) {
  legendFilter = legend;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderCollection();
}

function renderCollection() {
  const grid = document.getElementById('collectionGrid');
  document.getElementById('collCount').textContent = `${collection.length} item${collection.length !== 1 ? 's' : ''}`;
  let items = collection;
  if (legendFilter !== 'all') items = items.filter(i => i.legend === legendFilter);
  if (!items.length) {
    grid.innerHTML = legendFilter !== 'all'
      ? `<div class="empty-state"><span>🎒</span>No ${legendFilter} items yet.</div>`
      : '<div class="empty-state"><span>🎒</span>Open some packs to start your collection!</div>';
    return;
  }
  grid.innerHTML = items.map(item => `
    <div class="coll-item">
      <span class="coll-emoji">${item.emoji}</span>
      <div class="coll-name">${item.name}</div>
      <div class="coll-legend">${item.legend} · ${item.type}</div>
      <div class="coll-rarity" style="color:${rarityColor(item.rarity)}">${item.rarity}</div>
    </div>
  `).join('');
}

function rarityColor(r) {
  return { legendary:'var(--gold)', epic:'var(--purple)', rare:'var(--blue)', common:'var(--text-secondary)', heirloom:'#c084fc' }[r] || 'var(--text-secondary)';
}

// ---- LIVE DROPS FEED ----
function renderDropsFeed() {
  const doubled = [...LIVE_DROPS, ...LIVE_DROPS];
  const html = doubled.map(d => `
    <div class="drop-item">
      <strong>${d.player}</strong> unlocked <strong>${d.item}</strong>
      <span class="drop-rarity drop-${d.rarity}">[${d.rarity}]</span>
    </div>
  `).join('');
  const el = document.getElementById('dropsScroll');
  el.innerHTML = html + html;
}

// ---- BALANCE ----
function updateBalance() { document.getElementById('balance').textContent = `${balance.toLocaleString()} Coins`; }
function showDeposit() { showToast('💡 Coin packages: 1,000 / 2,400 / 6,700 / 13,500 — demo mode active.'); }

// ---- TOAST ----
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}
