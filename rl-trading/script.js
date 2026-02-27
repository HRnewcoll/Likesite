// ===========================
// RLExchange – Frontend Logic
// ===========================

// ---- DATA ----
const PAINTS = ['Crimson','Titanium White','Sky Blue','Cobalt','Orange','Lime','Forest Green','Purple','Pink','Grey','Black','Burnt Sienna','Saffron'];
const PAINT_COLORS = { 'Crimson':'#ef4444','Titanium White':'#fff','Sky Blue':'#38bdf8','Cobalt':'#6366f1','Orange':'#f97316','Lime':'#84cc16','Forest Green':'#16a34a','Purple':'#a855f7','Pink':'#ec4899','Grey':'#6b7280','Black':'#1f2937','Burnt Sienna':'#92400e','Saffron':'#fbbf24' };

const ITEMS = [
  // Black Market Decals
  { id:1, name:'Fennec | Black Market', emoji:'🚗', type:'car', rarity:'black-market', paint:'Titanium White', cert:'Scorer', price:12000 },
  { id:2, name:'20XX', emoji:'💥', type:'decal', rarity:'black-market', paint:'Crimson', cert:'Playmaker', price:1800 },
  { id:3, name:'Dissolver', emoji:'🌀', type:'decal', rarity:'black-market', paint:'Sky Blue', cert:'Guardian', price:1400 },
  { id:4, name:'Heatwave', emoji:'🔥', type:'decal', rarity:'black-market', paint:'Orange', cert:null, price:900 },
  { id:5, name:'Dueling Dragons', emoji:'🐉', type:'goal', rarity:'black-market', paint:null, cert:null, price:2200 },
  { id:6, name:'Hellfire', emoji:'🌋', type:'decal', rarity:'black-market', paint:'Saffron', cert:null, price:750 },
  { id:7, name:'Mainframe', emoji:'💻', type:'decal', rarity:'black-market', paint:'Purple', cert:'Tactician', price:850 },
  { id:8, name:'Storm Watch', emoji:'⛈️', type:'decal', rarity:'black-market', paint:'Cobalt', cert:null, price:600 },

  // Exotic Wheels
  { id:9, name:'Draco', emoji:'⚙️', type:'wheel', rarity:'exotic', paint:'Titanium White', cert:null, price:1600 },
  { id:10, name:'Zomba', emoji:'🟣', type:'wheel', rarity:'exotic', paint:'Crimson', cert:null, price:1200 },
  { id:11, name:'Voltaic', emoji:'⚡', type:'wheel', rarity:'exotic', paint:'Titanium White', cert:null, price:2200 },
  { id:12, name:'Apex', emoji:'🔶', type:'wheel', rarity:'exotic', paint:'Orange', cert:null, price:1800 },
  { id:13, name:'Fire God', emoji:'🔥', type:'goal', rarity:'black-market', paint:null, cert:null, price:1600 },

  // Import Cars/Bodies
  { id:14, name:'Octane ZSR', emoji:'🏎️', type:'car', rarity:'import', paint:'Lime', cert:'Scorer', price:500 },
  { id:15, name:'Breakout Type-S', emoji:'🚗', type:'car', rarity:'import', paint:'Purple', cert:null, price:450 },
  { id:16, name:'Dominus GT', emoji:'🚙', type:'car', rarity:'import', paint:'Crimson', cert:'Sweeper', price:480 },
  { id:17, name:'Centio V17', emoji:'🏁', type:'car', rarity:'import', paint:'Sky Blue', cert:null, price:420 },

  // Rare/Uncommon Boosts
  { id:18, name:'Interstellar', emoji:'🌌', type:'boost', rarity:'black-market', paint:null, cert:null, price:1100 },
  { id:19, name:'Bubbly', emoji:'🫧', type:'boost', rarity:'exotic', paint:'Cobalt', cert:null, price:400 },
  { id:20, name:'Toon Smoke', emoji:'💨', type:'boost', rarity:'rare', paint:'Pink', cert:null, price:200 },
  { id:21, name:'Ion Boost', emoji:'⚛️', type:'boost', rarity:'rare', paint:'Orange', cert:null, price:150 },

  // Toppers
  { id:22, name:'Panda Ears', emoji:'🐼', type:'topper', rarity:'rare', paint:null, cert:null, price:300 },
  { id:23, name:'Wizard Hat', emoji:'🧙', type:'topper', rarity:'uncommon', paint:'Purple', cert:null, price:120 },
  { id:24, name:'Camo Bucket Hat', emoji:'🎩', type:'topper', rarity:'uncommon', paint:null, cert:null, price:90 },
  { id:25, name:'Devil Horns', emoji:'😈', type:'topper', rarity:'rare', paint:'Crimson', cert:null, price:250 },

  // Wheels (more)
  { id:26, name:'Cristiano', emoji:'🔵', type:'wheel', rarity:'uncommon', paint:'Sky Blue', cert:null, price:80 },
  { id:27, name:'Equalizer', emoji:'🔶', type:'wheel', rarity:'rare', paint:'Titanium White', cert:null, price:320 },
  { id:28, name:'NeYoNeon', emoji:'🌈', type:'wheel', rarity:'import', paint:'Lime', cert:null, price:550 },
];

const TICKER_ITEMS = [
  { player:'SonicBoost', item:'Titanium White Octane', price:12000 },
  { player:'AerialKing', item:'Crimson Fennec', price:8500 },
  { player:'WallRider99', item:'20XX Decal', price:1800 },
  { player:'FlipResetPro', item:'Dissolver Decal', price:1400 },
  { player:'MustyFakes', item:'Dueling Dragons', price:2200 },
  { player:'GrandChamp', item:'Voltaic Wheels TW', price:2200 },
  { player:'SkyHighShots', item:'Crimson Zomba', price:1200 },
  { player:'PinchMaster', item:'Interstellar Boost', price:1100 },
  { player:'CeilingShot', item:'Hellfire Decal', price:750 },
  { player:'DropShot_X', item:'Draco TW Wheels', price:1600 },
];

// ---- STATE ----
let balance = 3200;
let inventory = [];
let tradeHistory = [];
let currentFilter = 'all';
let currentSort = 'price-desc';
let currentSearch = '';
let offerItems = [null, null, null];
let requestItems = [null, null, null];

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  renderItemsGrid();
  renderTicker();
  updateListingCount();
  document.getElementById('resultCount').textContent = `${ITEMS.length} items listed`;
});

// ---- TICKER ----
function renderTicker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  const html = doubled.map(t => `
    <div class="ticker-item">
      <strong>${t.player}</strong> sold <strong>${t.item}</strong> for <span class="ticker-price">${t.price.toLocaleString()} CR</span>
    </div>
  `).join('');
  const el = document.getElementById('tickerScroll');
  el.innerHTML = html + html; // doubled for seamless loop
}

function updateListingCount() {
  document.getElementById('listingCount').textContent = ITEMS.length;
}

// ---- MARKET ----
function getFilteredItems() {
  let items = [...ITEMS];
  if (currentFilter !== 'all') items = items.filter(i => i.type === currentFilter);
  if (currentSearch) items = items.filter(i => i.name.toLowerCase().includes(currentSearch.toLowerCase()));
  if (currentSort === 'price-desc') items.sort((a,b) => b.price - a.price);
  else if (currentSort === 'price-asc') items.sort((a,b) => a.price - b.price);
  else items.sort((a,b) => a.name.localeCompare(b.name));
  return items;
}

function renderItemsGrid() {
  const items = getFilteredItems();
  document.getElementById('resultCount').textContent = `${items.length} items listed`;
  const grid = document.getElementById('itemsGrid');
  grid.innerHTML = items.map(item => {
    const paintColor = item.paint ? PAINT_COLORS[item.paint] || '#fff' : null;
    return `
      <div class="item-card rarity-${item.rarity}">
        <span class="item-emoji">${item.emoji}</span>
        <div class="item-name">${item.name}</div>
        <div class="item-meta">
          ${item.paint ? `<span style="display:flex;align-items:center;gap:4px;"><span class="paint-dot" style="background:${paintColor};border:1px solid rgba(255,255,255,0.3)"></span>${item.paint}</span>` : ''}
          ${item.cert ? `<span style="color:var(--purple);">✦ ${item.cert}</span>` : ''}
          <span style="text-transform:capitalize;">${item.rarity.replace('-',' ')}</span>
        </div>
        <div class="item-price">${item.price.toLocaleString()} CR</div>
        <div class="item-footer">
          <span class="cert-badge" style="text-transform:capitalize;">${item.type}</span>
          <button class="btn-buy" onclick="buyItem(${item.id})">Buy</button>
        </div>
      </div>
    `;
  }).join('') || '<p style="color:var(--text-secondary);grid-column:1/-1;text-align:center;padding:2rem;">No items found.</p>';
}

function buyItem(id) {
  const item = ITEMS.find(i => i.id === id);
  if (!item) return;
  if (balance < item.price) { showToast('❌ Not enough Credits!'); return; }
  balance -= item.price;
  updateBalance();
  inventory.push({ ...item });
  addHistory(item.name, item.type, item.price, 'Bought');
  renderInventory();
  showToast(`✅ Purchased ${item.name} for ${item.price.toLocaleString()} CR!`);
}

function filterItems(type, btn) {
  currentFilter = type;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderItemsGrid();
}
function searchItems() { currentSearch = document.getElementById('itemSearch').value; renderItemsGrid(); }
function sortItems(val) { currentSort = val; renderItemsGrid(); }

// ---- INVENTORY ----
function renderInventory() {
  const grid = document.getElementById('invGrid');
  const total = inventory.reduce((s,i) => s + i.price, 0);
  document.getElementById('invTotal').textContent = `Total: ${total.toLocaleString()} Credits`;
  if (!inventory.length) {
    grid.innerHTML = '<div class="empty-state"><span>🚗</span>No items yet. Buy from the market!</div>';
    return;
  }
  grid.innerHTML = inventory.map((item, idx) => `
    <div class="inv-card ${offerItems.includes(idx) ? 'selected' : ''}" onclick="selectInvItem(${idx})">
      <span class="inv-card-emoji">${item.emoji}</span>
      <div class="inv-card-name">${item.name}</div>
      <div class="inv-card-val">${item.price.toLocaleString()} CR</div>
    </div>
  `).join('');
}

function selectInvItem(idx) {
  const slot = offerItems.findIndex(s => s === null);
  if (slot === -1) { showToast('Trade offer slots full!'); return; }
  if (offerItems.includes(idx)) { showToast('Item already in offer!'); return; }
  offerItems[slot] = idx;
  updateTradeUI();
  showToast(`Added ${inventory[idx].name} to offer`);
}

// ---- TRADE ----
function addToOffer(slot) {
  showToast('💡 Select an item from your inventory below to add to the offer.');
  document.getElementById('inventory').scrollIntoView({ behavior:'smooth' });
}
function addToRequest(slot) {
  const randomItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];
  requestItems[slot] = randomItem;
  updateTradeUI();
  showToast(`Added ${randomItem.name} to request`);
}
function updateTradeUI() {
  const offerSlots = document.getElementById('offerSlots');
  offerSlots.innerHTML = offerItems.map((idx, s) => {
    if (idx !== null && inventory[idx]) {
      const item = inventory[idx];
      return `<div class="trade-slot filled" onclick="removeOffer(${s})">${item.emoji} ${item.name} — ${item.price.toLocaleString()} CR <span style="color:var(--red);margin-left:4px;">✕</span></div>`;
    }
    return `<div class="trade-slot" onclick="addToOffer(${s})">+ Add item from inventory</div>`;
  }).join('');
  const reqSlots = document.getElementById('requestSlots');
  reqSlots.innerHTML = requestItems.map((item, s) => {
    if (item) {
      return `<div class="trade-slot filled" onclick="removeRequest(${s})">${item.emoji} ${item.name} — ${item.price.toLocaleString()} CR <span style="color:var(--red);margin-left:4px;">✕</span></div>`;
    }
    return `<div class="trade-slot" onclick="addToRequest(${s})">+ Add item from market</div>`;
  }).join('');
  const offerVal = offerItems.reduce((s,idx) => s + (idx !== null && inventory[idx] ? inventory[idx].price : 0), 0);
  const reqVal = requestItems.reduce((s,item) => s + (item ? item.price : 0), 0);
  document.getElementById('offerVal').textContent = `${offerVal.toLocaleString()} Credits`;
  document.getElementById('requestVal').textContent = `${reqVal.toLocaleString()} Credits`;
}
function removeOffer(slot) { offerItems[slot] = null; updateTradeUI(); renderInventory(); }
function removeRequest(slot) { requestItems[slot] = null; updateTradeUI(); }

function sendTrade() {
  const hasOffer = offerItems.some(i => i !== null);
  const hasRequest = requestItems.some(i => i !== null);
  if (!hasOffer || !hasRequest) { showToast('❌ Add items to both sides of the trade!'); return; }
  const reqItems = requestItems.filter(i => i !== null);
  const totalCost = reqItems.reduce((s,i) => s + i.price, 0);
  if (balance < totalCost) { showToast(`❌ Not enough Credits! Need ${totalCost.toLocaleString()} CR`); return; }
  balance -= totalCost;
  updateBalance();
  reqItems.forEach(item => { inventory.push({...item}); addHistory(item.name, item.type, item.price, 'Traded'); });
  offerItems = [null, null, null];
  requestItems = [null, null, null];
  updateTradeUI();
  renderInventory();
  showToast('🤝 Trade completed!');
}

// ---- HISTORY ----
function addHistory(name, type, price, action) {
  tradeHistory.unshift({ name, type, price, action, time: new Date().toLocaleTimeString() });
  renderHistory();
}
function renderHistory() {
  const body = document.getElementById('historyBody');
  if (!tradeHistory.length) {
    body.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-secondary);">No trade history yet.</td></tr>';
    return;
  }
  body.innerHTML = tradeHistory.slice(0,20).map(h => `
    <tr style="border-bottom:1px solid var(--border);">
      <td style="padding:10px 12px;">${h.name}</td>
      <td style="padding:10px 12px;text-transform:capitalize;color:var(--text-secondary);">${h.type}</td>
      <td style="padding:10px 12px;color:var(--accent);font-weight:700;">${h.price.toLocaleString()} CR</td>
      <td style="padding:10px 12px;color:${h.action==='Bought'?'var(--green)':'#a855f7'};font-weight:600;">${h.action}</td>
      <td style="padding:10px 12px;color:var(--text-secondary);">${h.time}</td>
    </tr>
  `).join('');
}

// ---- BALANCE ----
function updateBalance() { document.getElementById('balance').textContent = `${balance.toLocaleString()} Credits`; }
function showDeposit() { showToast('💡 Deposit feature: Select a package to add Credits.'); }

// ---- TOAST ----
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}
