// ===========================
// CS2Market – Trading Logic
// ===========================

const SKINS = [
  { id:1, name:'Karambit | Fade', category:'Knife', wear:'Factory New', emoji:'🔪', price:425.00, rarity:'gold', seller:'xXShadowXx', listed:'2h ago', popular:true },
  { id:2, name:'AWP | Dragon Lore', category:'Sniper', wear:'Field-Tested', emoji:'🐉', price:890.00, rarity:'gold', seller:'DragonMaster', listed:'5h ago', popular:true },
  { id:3, name:'M4A4 | Howl', category:'Rifle', wear:'Minimal Wear', emoji:'🐺', price:182.00, rarity:'gold', seller:'CS2King', listed:'1h ago', popular:true },
  { id:4, name:'AK-47 | Fire Serpent', category:'Rifle', wear:'Field-Tested', emoji:'🐍', price:98.00, rarity:'purple', seller:'ProPlayer99', listed:'30m ago', popular:true },
  { id:5, name:'Butterfly Knife | Marble Fade', category:'Knife', wear:'Factory New', emoji:'🦋', price:658.00, rarity:'gold', seller:'KnifeKing', listed:'3h ago', popular:false },
  { id:6, name:'Desert Eagle | Blaze', category:'Pistol', wear:'Factory New', emoji:'🔥', price:122.00, rarity:'gold', seller:'Striker47', listed:'45m ago', popular:true },
  { id:7, name:'Glock-18 | Fade', category:'Pistol', wear:'Factory New', emoji:'💫', price:40.00, rarity:'purple', seller:'Fragmaster', listed:'2h ago', popular:false },
  { id:8, name:'AK-47 | Neon Rider', category:'Rifle', wear:'Minimal Wear', emoji:'🏍️', price:29.00, rarity:'purple', seller:'NightOwl', listed:'4h ago', popular:false },
  { id:9, name:'M4A4 | Neo-Noir', category:'Rifle', wear:'Field-Tested', emoji:'🌃', price:46.00, rarity:'purple', seller:'ShadowOps', listed:'6h ago', popular:false },
  { id:10, name:'USP-S | Kill Confirmed', category:'Pistol', wear:'Factory New', emoji:'💀', price:15.00, rarity:'blue', seller:'EliteSniper', listed:'1h ago', popular:false },
  { id:11, name:'M4A1-S | Hyper Beast', category:'Rifle', wear:'Well-Worn', emoji:'🦁', price:9.00, rarity:'blue', seller:'FragKing', listed:'8h ago', popular:false },
  { id:12, name:'Shadow Daggers | Doppler', category:'Knife', wear:'Factory New', emoji:'🗡️', price:86.00, rarity:'purple', seller:'DaggerPro', listed:'2h ago', popular:false },
  { id:13, name:'P250 | See Ya Later', category:'Pistol', wear:'Battle-Scarred', emoji:'🦎', price:0.85, rarity:'gray', seller:'QuickSell', listed:'10m ago', popular:false },
  { id:14, name:'AWP | Chromatic Aberration', category:'Sniper', wear:'Field-Tested', emoji:'🌈', price:12.50, rarity:'blue', seller:'ColorBlind', listed:'3h ago', popular:false },
  { id:15, name:'AK-47 | Asiimov', category:'Rifle', wear:'Battle-Scarred', emoji:'🤖', price:3.80, rarity:'blue', seller:'RobotKiller', listed:'5h ago', popular:false },
  { id:16, name:'M9 Bayonet | Crimson Web', category:'Knife', wear:'Minimal Wear', emoji:'🕸️', price:322.00, rarity:'gold', seller:'WebCrawler', listed:'1h ago', popular:true },
  { id:17, name:'Stiletto Knife | Tiger Tooth', category:'Knife', wear:'Factory New', emoji:'🐅', price:215.00, rarity:'gold', seller:'TigerStripe', listed:'2h ago', popular:false },
  { id:18, name:'MP9 | Bioleak', category:'SMG', wear:'Field-Tested', emoji:'☣️', price:0.65, rarity:'gray', seller:'BioChem', listed:'6h ago', popular:false },
  { id:19, name:'Five-SeveN | Kami', category:'Pistol', wear:'Factory New', emoji:'⛩️', price:1.60, rarity:'gray', seller:'SpiritBlade', listed:'4h ago', popular:false },
  { id:20, name:'AK-47 | Wild Lotus', category:'Rifle', wear:'Factory New', emoji:'🪷', price:55.00, rarity:'purple', seller:'LotusGrower', listed:'3h ago', popular:false },
  { id:21, name:'Sport Gloves | Pandora\'s Box', category:'Gloves', wear:'Field-Tested', emoji:'🧤', price:540.00, rarity:'gold', seller:'GloveGod', listed:'7h ago', popular:true },
  { id:22, name:'Specialist Gloves | Crimson Kimono', category:'Gloves', wear:'Minimal Wear', emoji:'🥊', price:320.00, rarity:'gold', seller:'KimonoMaster', listed:'2h ago', popular:false },
];

const HISTORY_DATA = [
  { item:'AK-47 | Neon Rider 🏍️', type:'buy', price:'$29.00', counterparty:'NightOwl', date:'2024-01-15', status:'completed' },
  { item:'USP-S | Kill Confirmed 💀', type:'sell', price:'$14.50', counterparty:'EliteSniper', date:'2024-01-14', status:'completed' },
  { item:'Glock-18 | Fade 💫', type:'trade', price:'~$38.00', counterparty:'Fragmaster', date:'2024-01-13', status:'completed' },
  { item:'P250 | See Ya Later 🦎', type:'sell', price:'$0.80', counterparty:'QuickSell', date:'2024-01-12', status:'completed' },
  { item:'M4A1-S | Hyper Beast 🦁', type:'buy', price:'$8.50', counterparty:'FragKing', date:'2024-01-10', status:'cancelled' },
];

let balance = 1250.00;
let page = 1;
const PER_PAGE = 12;
let allListings = [...SKINS];
let visibleListings = [];
let myInventory = [
  { id:101, name:'AK-47 | Redline', emoji:'❤️', price:12.50, rarity:'blue', category:'Rifle', wear:'Field-Tested' },
  { id:102, name:'P90 | Asiimov', emoji:'🤖', price:4.20, rarity:'blue', category:'SMG', wear:'Battle-Scarred' },
  { id:103, name:'MP9 | Bioleak', emoji:'☣️', price:0.65, rarity:'gray', category:'SMG', wear:'Field-Tested' },
  { id:104, name:'Karambit | Case Hardened', emoji:'💠', price:240.00, rarity:'gold', category:'Knife', wear:'Minimal Wear' },
  { id:105, name:'Glock-18 | Water Elemental', emoji:'💧', price:5.80, rarity:'blue', category:'Pistol', wear:'Field-Tested' },
];
let myListings = [];
let selectedSellItem = null;
let tradeTargetItem = null;
let selectedTradeItems = [];
let currentView = 'grid';

document.addEventListener('DOMContentLoaded', () => {
  applyFilters();
  renderHistory();
  updateBalance();
});

function updateBalance() {
  document.getElementById('balance').textContent =
    '$' + balance.toLocaleString('en-US', { minimumFractionDigits:2, maximumFractionDigits:2 });
}

// ---- FILTERS ----
function applyFilters() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  const rarity = document.getElementById('rarityFilter').value;
  const sort = document.getElementById('sortFilter').value;
  const minP = parseFloat(document.getElementById('minPrice').value) || 0;
  const maxP = parseFloat(document.getElementById('maxPrice').value) || Infinity;

  let result = SKINS.filter(s => {
    if (search && !s.name.toLowerCase().includes(search)) return false;
    if (category && !s.category.includes(category)) return false;
    if (rarity && s.rarity !== rarity) return false;
    if (s.price < minP || s.price > maxP) return false;
    return true;
  });

  if (sort === 'price-asc') result.sort((a,b) => a.price - b.price);
  else if (sort === 'price-desc') result.sort((a,b) => b.price - a.price);
  else if (sort === 'popular') result.sort((a,b) => b.popular - a.popular);

  allListings = result;
  page = 1;
  document.getElementById('resultCount').textContent = result.length;
  document.getElementById('totalListings').textContent = result.length;
  visibleListings = result.slice(0, PER_PAGE);
  renderListings(visibleListings, false);
}

function loadMore() {
  page++;
  const more = allListings.slice(0, page * PER_PAGE);
  visibleListings = more;
  renderListings(more, false);
}

// ---- RENDER LISTINGS ----
function renderListings(items, append) {
  const grid = document.getElementById('listingsGrid');
  if (!append) grid.innerHTML = '';

  if (items.length === 0) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><span>🔍</span><p>No items match your filters.</p></div>`;
    return;
  }

  items.forEach(item => {
    const div = document.createElement('div');
    div.className = `listing-card rarity-${item.rarity}${currentView === 'list' ? ' list-view' : ''}`;
    div.innerHTML = `
      <div class="item-visual"><span class="item-emoji">${item.emoji}</span></div>
      <div class="rarity-bar"></div>
      <div class="item-category">${item.category}</div>
      <div class="item-name">${item.name}</div>
      <div class="item-wear">${item.wear}</div>
      <div class="item-footer">
        <span class="item-price">$${item.price.toFixed(2)}</span>
        <span class="item-seller">by ${item.seller}</span>
      </div>
      <div style="display:flex;gap:6px;margin-top:10px">
        <button class="btn-buy" onclick="buyItem(${item.id}, event)">Buy Now</button>
        <button class="btn-trade-offer" onclick="openTradeModal(${item.id}, event)">Trade</button>
      </div>
    `;
    div.addEventListener('click', () => openItemModal(item.id));
    grid.appendChild(div);
  });
}

function setView(view, btn) {
  currentView = view;
  document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const grid = document.getElementById('listingsGrid');
  if (view === 'list') grid.classList.add('list-view');
  else grid.classList.remove('list-view');
  renderListings(visibleListings, false);
}

// ---- ITEM MODAL ----
function openItemModal(id) {
  const item = SKINS.find(s => s.id === id);
  if (!item) return;
  const rarityColors = { gold:'#f0b429', purple:'#a855f7', blue:'#4d9fff', gray:'#6b7280' };
  const rarityLabels = { gold:'Legendary', purple:'Rare', blue:'Uncommon', gray:'Common' };
  const color = rarityColors[item.rarity];
  const delta = (Math.random() * 10 - 5).toFixed(1);
  const deltaClass = delta >= 0 ? 'price-up' : 'price-down';
  const deltaText = delta >= 0 ? `+${delta}%` : `${delta}%`;

  document.getElementById('itemDetail').innerHTML = `
    <div class="item-modal-layout">
      <div class="item-modal-visual">
        <div class="item-modal-emoji">${item.emoji}</div>
        <span class="item-modal-rarity" style="background:${color}20;color:${color};border:1px solid ${color}50">
          ${rarityLabels[item.rarity]}
        </span>
        <div style="font-size:0.85rem;color:var(--muted);margin-top:0.5rem">${item.wear}</div>
      </div>
      <div class="item-modal-info">
        <div class="item-modal-category">${item.category}</div>
        <h2>${item.name}</h2>
        <div class="price-row">
          <span class="modal-price">$${item.price.toFixed(2)}</span>
          <span class="price-delta ${deltaClass}">${deltaText} 24h</span>
        </div>
        <div class="seller-info">
          <div class="seller-avatar">👤</div>
          <div>
            <div class="seller-name">${item.seller}</div>
            <div class="seller-label">Listed ${item.listed}</div>
          </div>
        </div>
        <div class="item-attributes">
          <div class="attr"><div class="attr-label">Category</div><div class="attr-value">${item.category}</div></div>
          <div class="attr"><div class="attr-label">Wear</div><div class="attr-value">${item.wear}</div></div>
          <div class="attr"><div class="attr-label">Rarity</div><div class="attr-value" style="color:${color}">${rarityLabels[item.rarity]}</div></div>
          <div class="attr"><div class="attr-label">Tradeable</div><div class="attr-value" style="color:var(--green)">✓ Yes</div></div>
        </div>
        <div class="modal-actions">
          <button class="btn-modal-buy" onclick="buyItem(${item.id})">💵 Buy for $${item.price.toFixed(2)}</button>
          <button class="btn-modal-trade" onclick="openTradeModal(${item.id})">🔄 Trade</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById('itemModal').classList.add('active');
}

function closeItemModal(e) {
  if (e && e.target !== document.getElementById('itemModal')) return;
  document.getElementById('itemModal').classList.remove('active');
}

// ---- BUY ----
function buyItem(id, e) {
  if (e) e.stopPropagation();
  const item = SKINS.find(s => s.id === id);
  if (!item) return;
  if (balance < item.price) { showToast('❌ Insufficient balance!', 'error'); return; }
  balance -= item.price;
  updateBalance();
  myInventory.push({ ...item, id: Date.now() });
  document.getElementById('itemModal').classList.remove('active');
  showToast(`✅ Purchased ${item.name} for $${item.price.toFixed(2)}!`, 'success');
  addHistoryEntry(item, 'buy');
}

// ---- SELL MODAL ----
function openSellModal() {
  selectedSellItem = null;
  document.getElementById('sellForm').style.display = 'none';
  renderSellInventory();
  document.getElementById('sellModal').classList.add('active');
}

function closeSellModal(e) {
  if (e && e.target !== document.getElementById('sellModal')) return;
  document.getElementById('sellModal').classList.remove('active');
}

function renderSellInventory() {
  const container = document.getElementById('sellInventory');
  if (myInventory.length === 0) {
    container.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><span>🎒</span><p>No items to sell.</p></div>`;
    return;
  }
  container.innerHTML = '';
  myInventory.forEach(item => {
    const div = document.createElement('div');
    div.className = 'sell-inv-item';
    div.innerHTML = `<span class="s-emoji">${item.emoji}</span><div class="s-name">${item.name}</div><div class="s-price">$${item.price.toFixed(2)}</div>`;
    div.onclick = () => selectSellItem(item, div);
    container.appendChild(div);
  });
}

function selectSellItem(item, el) {
  selectedSellItem = item;
  document.querySelectorAll('.sell-inv-item').forEach(e => e.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('selectedItemPreview').innerHTML = `
    <span class="prev-emoji">${item.emoji}</span>
    <div class="prev-info"><h4>${item.name}</h4><p>${item.wear || ''} • ${item.category}</p></div>
  `;
  document.getElementById('listPrice').value = item.price.toFixed(2);
  document.getElementById('priceSuggestion').textContent = `Suggested: $${item.price.toFixed(2)} (market avg)`;
  document.getElementById('sellForm').style.display = 'block';
}

function setTradeType(type, btn) {
  document.querySelectorAll('.trade-type-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function listItem() {
  if (!selectedSellItem) { showToast('❌ Select an item!', 'error'); return; }
  const price = parseFloat(document.getElementById('listPrice').value);
  if (!price || price <= 0) { showToast('❌ Enter a valid price!', 'error'); return; }
  myListings.push({ ...selectedSellItem, listPrice: price, listedAt: new Date() });
  renderMyTrades();
  addHistoryEntry({ ...selectedSellItem, price }, 'sell');
  showToast(`✅ Listed ${selectedSellItem.name} for $${price.toFixed(2)}!`, 'success');
  document.getElementById('sellModal').classList.remove('active');
}

function cancelSell() { document.getElementById('sellModal').classList.remove('active'); }

// ---- TRADE MODAL ----
function openTradeModal(id, e) {
  if (e) e.stopPropagation();
  const item = SKINS.find(s => s.id === id);
  if (!item) return;
  tradeTargetItem = item;
  selectedTradeItems = [];
  document.getElementById('tradeTargetItem').innerHTML = `
    <div style="text-align:center;padding:1rem">
      <span style="font-size:3rem">${item.emoji}</span>
      <div style="font-weight:700;margin-top:0.5rem">${item.name}</div>
      <div style="color:var(--green);font-weight:800">$${item.price.toFixed(2)}</div>
    </div>
  `;
  renderTradeInventory();
  document.getElementById('itemModal').classList.remove('active');
  document.getElementById('tradeModal').classList.add('active');
}

function closeTradeModal(e) {
  if (e && e.target !== document.getElementById('tradeModal')) return;
  document.getElementById('tradeModal').classList.remove('active');
}

function renderTradeInventory() {
  const container = document.getElementById('tradeYourInv');
  container.innerHTML = '';
  myInventory.forEach(item => {
    const div = document.createElement('div');
    div.className = 'trade-mini-item';
    div.innerHTML = `<span class="tm-emoji">${item.emoji}</span><div style="font-size:0.6rem">${item.price.toFixed(2)}</div>`;
    div.onclick = () => toggleTradeItem(item, div);
    container.appendChild(div);
  });
}

function toggleTradeItem(item, el) {
  const idx = selectedTradeItems.findIndex(i => i.id === item.id);
  if (idx === -1) {
    selectedTradeItems.push(item);
    el.style.borderColor = 'var(--accent)';
  } else {
    selectedTradeItems.splice(idx, 1);
    el.style.borderColor = '';
  }
  updateTradeOffer();
}

function updateTradeOffer() {
  const yourZone = document.getElementById('yourItems');
  yourZone.innerHTML = '';
  if (selectedTradeItems.length === 0) {
    yourZone.innerHTML = '<p class="drop-hint">Select items from your inventory</p>';
  } else {
    selectedTradeItems.forEach(item => {
      const div = document.createElement('div');
      div.style.cssText = 'display:inline-flex;flex-direction:column;align-items:center;gap:4px;background:var(--card);border-radius:8px;padding:8px;margin:4px';
      div.innerHTML = `<span style="font-size:1.8rem">${item.emoji}</span><span style="font-size:0.7rem">$${item.price.toFixed(2)}</span>`;
      yourZone.appendChild(div);
    });
  }
  const yourValue = selectedTradeItems.reduce((s,i) => s+i.price, 0);
  const theirValue = tradeTargetItem ? tradeTargetItem.price : 0;
  const diff = theirValue - yourValue;
  const diffEl = document.getElementById('tradeValueDiff');
  if (diff > 0) {
    diffEl.innerHTML = `<span style="color:var(--red)">You need $${diff.toFixed(2)} more</span>`;
  } else if (diff < 0) {
    diffEl.innerHTML = `<span style="color:var(--green)">You overpay by $${Math.abs(diff).toFixed(2)}</span>`;
  } else {
    diffEl.innerHTML = `<span style="color:var(--green)">✓ Fair trade!</span>`;
  }
}

function sendTradeOffer() {
  if (selectedTradeItems.length === 0) { showToast('❌ Select items to offer!', 'error'); return; }
  showToast(`🔄 Trade offer sent to ${tradeTargetItem?.seller || 'seller'}!`, 'success');
  document.getElementById('tradeModal').classList.remove('active');
}

// ---- MY TRADES ----
function renderMyTrades() {
  const container = document.getElementById('tradesList');
  if (myListings.length === 0) {
    container.innerHTML = `<div class="empty-state"><span>🔄</span><p>No active trades. List an item or send a trade offer!</p></div>`;
    return;
  }
  container.innerHTML = '';
  myListings.forEach((listing, idx) => {
    const div = document.createElement('div');
    div.className = 'trade-item';
    div.innerHTML = `
      <div class="trade-item-left">
        <span class="trade-item-emoji">${listing.emoji}</span>
        <div>
          <div class="trade-item-name">${listing.name}</div>
          <div class="trade-item-meta">Listed just now</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:12px">
        <span class="trade-item-price">$${listing.listPrice.toFixed(2)}</span>
        <button class="btn-cancel-trade" onclick="cancelListing(${idx})">Cancel</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function cancelListing(idx) {
  myListings.splice(idx, 1);
  renderMyTrades();
  showToast('✅ Listing cancelled.', 'success');
}

// ---- HISTORY ----
function renderHistory() {
  const tbody = document.getElementById('historyBody');
  tbody.innerHTML = '';
  HISTORY_DATA.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.item}</td>
      <td><span class="type-${row.type}">${row.type.toUpperCase()}</span></td>
      <td style="color:var(--green);font-weight:700">${row.price}</td>
      <td>${row.counterparty}</td>
      <td style="color:var(--muted)">${row.date}</td>
      <td><span class="status-badge status-${row.status}">${row.status}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

function addHistoryEntry(item, type) {
  const tbody = document.getElementById('historyBody');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${item.emoji} ${item.name}</td>
    <td><span class="type-${type}">${type.toUpperCase()}</span></td>
    <td style="color:var(--green);font-weight:700">$${item.price.toFixed(2)}</td>
    <td>${item.seller || 'You'}</td>
    <td style="color:var(--muted)">Just now</td>
    <td><span class="status-badge status-completed">completed</span></td>
  `;
  tbody.insertBefore(tr, tbody.firstChild);
}

// ---- TOAST ----
function showToast(message, type='success') {
  let toast = document.querySelector('.toast');
  if (!toast) { toast = document.createElement('div'); toast.className='toast'; document.body.appendChild(toast); }
  toast.textContent = message;
  toast.className = `toast ${type}`;
  void toast.offsetWidth;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}
