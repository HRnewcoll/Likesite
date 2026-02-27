// ===========================
// ValorantNight – Frontend Logic
// ===========================

// ---- DATA ----
const ALL_SKINS = [
  { id:1, name:'Phantom | Prime', emoji:'🔫', collection:'Prime', type:'rifle', price:1775, tier:'premium' },
  { id:2, name:'Vandal | Elderflame', emoji:'🐉', collection:'Elderflame', type:'rifle', price:2475, tier:'exclusive' },
  { id:3, name:'Operator | Reaver', emoji:'☠️', collection:'Reaver', type:'sniper', price:1775, tier:'premium' },
  { id:4, name:'Sheriff | Reaver', emoji:'🔴', collection:'Reaver', type:'pistol', price:1775, tier:'premium' },
  { id:5, name:'Phantom | Reaver', emoji:'💀', collection:'Reaver', type:'rifle', price:1775, tier:'premium' },
  { id:6, name:'Vandal | Protocol 781-A', emoji:'🤖', collection:'Protocol 781-A', type:'rifle', price:2675, tier:'exclusive' },
  { id:7, name:'Ghost | VALORANT GO! Vol.1', emoji:'🎮', collection:'VALORANT GO!', type:'pistol', price:875, tier:'deluxe' },
  { id:8, name:'Classic | Glitchpop', emoji:'⚡', collection:'Glitchpop', type:'pistol', price:1775, tier:'premium' },
  { id:9, name:'Knife | Prime//2.0', emoji:'🔪', collection:'Prime//2.0', type:'melee', price:3550, tier:'ultra' },
  { id:10, name:'Spectre | Sakura', emoji:'🌸', collection:'Sakura', type:'smg', price:875, tier:'select' },
  { id:11, name:'Bulldog | Nunca Olvidados', emoji:'💐', collection:'Nunca Olvidados', type:'rifle', price:875, tier:'select' },
  { id:12, name:'Guardian | Spline', emoji:'🌀', collection:'Spline', type:'rifle', price:1275, tier:'deluxe' },
  { id:13, name:'Phantom | Glitchpop', emoji:'🎆', collection:'Glitchpop', type:'rifle', price:2475, tier:'exclusive' },
  { id:14, name:'Vandal | Glitchpop', emoji:'💥', collection:'Glitchpop', type:'rifle', price:2475, tier:'exclusive' },
  { id:15, name:'Operator | Glitchpop', emoji:'🎯', collection:'Glitchpop', type:'sniper', price:2475, tier:'exclusive' },
  { id:16, name:'Knife | Glitchpop', emoji:'⚔️', collection:'Glitchpop', type:'melee', price:4350, tier:'ultra' },
  { id:17, name:'Phantom | Spectrum', emoji:'🌈', collection:'Spectrum', type:'rifle', price:2175, tier:'exclusive' },
  { id:18, name:'Vandal | Forsaken', emoji:'🌑', collection:'Forsaken', type:'rifle', price:1775, tier:'premium' },
  { id:19, name:'Ares | Origin', emoji:'🔧', collection:'Origin', type:'rifle', price:875, tier:'select' },
  { id:20, name:'Stinger | Depth', emoji:'🌊', collection:'Depth', type:'smg', price:875, tier:'select' },
  { id:21, name:'Marshal | Oni', emoji:'👹', collection:'Oni', type:'sniper', price:1775, tier:'premium' },
  { id:22, name:'Ghost | Oni', emoji:'👺', collection:'Oni', type:'pistol', price:1775, tier:'premium' },
  { id:23, name:'Knife | Oni', emoji:'🗡️', collection:'Oni', type:'melee', price:3550, tier:'ultra' },
  { id:24, name:'Phantom | Ion', emoji:'⚛️', collection:'Ion', type:'rifle', price:1775, tier:'premium' },
  { id:25, name:'Operator | Ion', emoji:'💫', collection:'Ion', type:'sniper', price:1775, tier:'premium' },
  { id:26, name:'Sheriff | Ion', emoji:'🔵', collection:'Ion', type:'pistol', price:1775, tier:'premium' },
  { id:27, name:'Frenzy | Celestial', emoji:'✨', collection:'Celestial', type:'pistol', price:1275, tier:'deluxe' },
  { id:28, name:'Judge | Celestial', emoji:'🌟', collection:'Celestial', type:'rifle', price:1275, tier:'deluxe' },
];

const TIER_DISCOUNTS = {
  ultra: [35, 40, 45, 50, 55],
  exclusive: [30, 35, 40, 45],
  premium: [25, 30, 35, 40],
  deluxe: [20, 25, 30, 35],
  select: [15, 20, 25]
};

// ---- STATE ----
let balance = 4750;
let nightMarket = [];
let allRevealedItems = [];
let inventory = [];
let currentFilter = 'all';
let currentSort = 'price-desc';
let currentSearch = '';

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  generateNightMarket();
  renderSkinsGrid();
  renderInventory();
  startTimers();
});

// ---- NIGHT MARKET ----
function generateNightMarket() {
  const shuffled = [...ALL_SKINS].sort(() => Math.random() - 0.5);
  nightMarket = shuffled.slice(0, 6).map(skin => {
    const discounts = TIER_DISCOUNTS[skin.tier] || [20, 25, 30];
    const discount = discounts[Math.floor(Math.random() * discounts.length)];
    const salePrice = Math.round(skin.price * (1 - discount / 100));
    return { ...skin, discount, salePrice, revealed: false, purchased: false };
  });
  renderNightMarket();
}

function renderNightMarket() {
  const container = document.getElementById('nmCards');
  container.innerHTML = nightMarket.map((item, i) => `
    <div class="nm-card ${item.revealed ? 'revealed' : 'locked'}" id="nmCard${i}" onclick="${item.revealed ? '' : `revealCard(${i})`}">
      ${item.revealed ? `
        <span class="nm-card-tier tier-${item.tier}">${item.tier}</span>
        <span class="nm-card-emoji">${item.emoji}</span>
        <div class="nm-card-name">${item.name}</div>
        <div class="nm-card-collection">${item.collection} Collection</div>
        <div class="nm-card-prices">
          <span class="original-price">${item.price.toLocaleString()} VP</span>
          <span class="sale-price">${item.salePrice.toLocaleString()} VP</span>
        </div>
        <div class="discount-badge">-${item.discount}% OFF</div><br/>
        ${item.purchased
          ? '<div style="color:var(--teal);font-weight:700;font-size:0.85rem;margin-top:0.5rem;">✓ Purchased</div>'
          : `<button class="btn-buy" onclick="buyNMSkin(${i},event)">Buy ${item.salePrice.toLocaleString()} VP</button>`
        }
      ` : `<div style="padding:3rem 0;color:var(--text-secondary);font-size:0.85rem;">Tap to reveal</div>`}
    </div>
  `).join('');
}

function revealCard(index) {
  nightMarket[index].revealed = true;
  renderNightMarket();
}

function revealAll() {
  nightMarket.forEach(item => item.revealed = true);
  renderNightMarket();
  showToast('✨ All Night Market offers revealed!');
}

function rerollMarket() {
  if (balance < 500) { showToast('❌ Not enough VP to re-roll (500 VP required)'); return; }
  balance -= 500;
  updateBalance();
  generateNightMarket();
  showToast('🎲 Night Market re-rolled!');
}

function buyNMSkin(index, event) {
  event.stopPropagation();
  const item = nightMarket[index];
  if (balance < item.salePrice) { showToast('❌ Not enough VP!'); return; }
  balance -= item.salePrice;
  updateBalance();
  nightMarket[index].purchased = true;
  inventory.push({ ...item });
  renderNightMarket();
  renderInventory();
  // show win banner
  document.getElementById('winSection').style.display = 'block';
  document.getElementById('winItemName').textContent = `${item.emoji} ${item.name}`;
  showToast(`🎉 Purchased ${item.name}!`);
}

// ---- SKIN STORE ----
function renderSkinsGrid() {
  let skins = [...ALL_SKINS];
  if (currentFilter !== 'all') skins = skins.filter(s => s.type === currentFilter);
  if (currentSearch) skins = skins.filter(s => s.name.toLowerCase().includes(currentSearch.toLowerCase()) || s.collection.toLowerCase().includes(currentSearch.toLowerCase()));
  if (currentSort === 'price-desc') skins.sort((a,b) => b.price - a.price);
  else if (currentSort === 'price-asc') skins.sort((a,b) => a.price - b.price);
  else skins.sort((a,b) => a.name.localeCompare(b.name));

  const grid = document.getElementById('skinsGrid');
  grid.innerHTML = skins.map(skin => `
    <div class="skin-card">
      <span class="skin-emoji">${skin.emoji}</span>
      <div class="skin-name">${skin.name}</div>
      <div class="skin-collection">${skin.collection} · <span style="color:var(--accent);text-transform:capitalize;">${skin.tier}</span></div>
      <div class="skin-price">${skin.price.toLocaleString()} VP</div>
      <div class="skin-footer">
        <span class="nm-card-tier tier-${skin.tier}">${skin.tier}</span>
        <button class="btn-skin-buy" onclick="buySkin(${skin.id})">Buy</button>
      </div>
    </div>
  `).join('') || '<p style="color:var(--text-secondary);grid-column:1/-1;">No skins found.</p>';
}

function buySkin(id) {
  const skin = ALL_SKINS.find(s => s.id === id);
  if (!skin) return;
  if (balance < skin.price) { showToast('❌ Not enough VP!'); return; }
  balance -= skin.price;
  updateBalance();
  inventory.push({ ...skin });
  renderInventory();
  showToast(`🎉 Purchased ${skin.name}!`);
}

function filterSkins(type, btn) {
  currentFilter = type;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderSkinsGrid();
}
function searchSkins() { currentSearch = document.getElementById('skinSearch').value; renderSkinsGrid(); }
function sortSkins(val) { currentSort = val; renderSkinsGrid(); }

// ---- INVENTORY ----
function renderInventory() {
  const grid = document.getElementById('inventoryGrid');
  document.getElementById('collectionCount').textContent = `${inventory.length} skin${inventory.length !== 1 ? 's' : ''}`;
  if (!inventory.length) {
    grid.innerHTML = '<div class="empty-state"><span>🎒</span>No skins yet. Buy from the Night Market or Store!</div>';
    return;
  }
  grid.innerHTML = inventory.map((item, i) => `
    <div class="inv-item">
      <span class="inv-item-emoji">${item.emoji}</span>
      <div class="inv-item-name">${item.name}</div>
      <div class="inv-item-val">${(item.salePrice || item.price).toLocaleString()} VP</div>
    </div>
  `).join('');
}

// ---- TIMERS ----
function startTimers() {
  let nmSeconds = 5 * 86400 + 14 * 3600 + 22 * 60;
  let storeSeconds = 10 * 3600 + 33 * 60;
  setInterval(() => {
    nmSeconds = Math.max(0, nmSeconds - 1);
    storeSeconds = Math.max(0, storeSeconds - 1);
    document.getElementById('nmTimer').textContent = `Resets in: ${formatTime(nmSeconds)}`;
    document.getElementById('storeTimer').textContent = `Resets in: ${formatTime(storeSeconds)}`;
  }, 1000);
}
function formatTime(s) {
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m ${s % 60}s`;
  return `${m}m ${s % 60}s`;
}

// ---- BALANCE ----
function updateBalance() {
  document.getElementById('balance').textContent = `${balance.toLocaleString()} VP`;
}

// ---- DEPOSIT ----
function showDeposit() { document.getElementById('depositModal').classList.add('open'); }
function closeDeposit() { document.getElementById('depositModal').classList.remove('open'); }
function selectVP(amount) { document.getElementById('vpAmount').value = amount; }
function confirmDeposit() {
  const amount = parseInt(document.getElementById('vpAmount').value);
  if (!amount || amount < 1) { showToast('❌ Enter a valid amount'); return; }
  balance += amount;
  updateBalance();
  closeDeposit();
  showToast(`✅ Added ${amount.toLocaleString()} VP to your account!`);
}

// ---- WIN SECTION ----
function closeWin() {
  document.getElementById('winSection').style.display = 'none';
  document.getElementById('inventory').scrollIntoView({ behavior: 'smooth' });
}

// ---- TOAST ----
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}
