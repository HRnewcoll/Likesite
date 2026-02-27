// ===========================
// Dota2Items – Frontend Logic
// ===========================

const TYPE_COLORS = {
  Arcana: '#c94bdb', Immortal: '#e2a048', Legendary: '#a855f7',
  Rare: '#4d9fff', Courier: '#22c55e', Ward: '#60a5fa', Misc: '#8a9ab1'
};

const HEROES_LIST = ['All Heroes', 'Pudge', 'Invoker', 'Juggernaut', 'Phantom Assassin', 'Anti-Mage', 'Dragon Knight', 'Zeus', 'Lina', 'Earthshaker', 'Rubick'];
const HERO_EMOJIS = { 'Pudge':'🩸', 'Invoker':'✨', 'Juggernaut':'⚔️', 'Phantom Assassin':'🗡️', 'Anti-Mage':'🔮', 'Dragon Knight':'🐲', 'Zeus':'⚡', 'Lina':'🔥', 'Earthshaker':'🌍', 'Rubick':'🎭' };

const DOTA_ITEMS = [
  { id:1, name:'Arcana – Abscessment (Pudge)', hero:'Pudge', type:'Arcana', emoji:'🪝', price:32.50, seller:'PudgeMaster' },
  { id:2, name:'Arcana – Burning Shadow (Phantom Assassin)', hero:'Phantom Assassin', type:'Arcana', emoji:'🌹', price:28.00, seller:'PAKing' },
  { id:3, name:'Arcana – Thundergod\'s Wrath (Zeus)', hero:'Zeus', type:'Arcana', emoji:'⚡', price:24.99, seller:'ZeusMain' },
  { id:4, name:'Arcana – Dragon Flame (Dragon Knight)', hero:'Dragon Knight', type:'Arcana', emoji:'🐲', price:22.00, seller:'DragonLord' },
  { id:5, name:'Immortal – The Leveller (Juggernaut)', hero:'Juggernaut', type:'Immortal', emoji:'🔱', price:12.50, seller:'JuggFarm' },
  { id:6, name:'Immortal – Manifest Destiny (Anti-Mage)', hero:'Anti-Mage', type:'Immortal', emoji:'💠', price:8.99, seller:'AntiMageX' },
  { id:7, name:'Immortal – Inscription of Chaos (Rubick)', hero:'Rubick', type:'Immortal', emoji:'📖', price:18.00, seller:'RubickPro' },
  { id:8, name:'Immortal – Infernal Chieftain (Earthshaker)', hero:'Earthshaker', type:'Immortal', emoji:'🌋', price:6.50, seller:'EarthBreaker' },
  { id:9, name:'Legendary – Ember Flame (Lina)', hero:'Lina', type:'Legendary', emoji:'💃', price:14.00, seller:'LinaMain' },
  { id:10, name:'Legendary – Spellweaver (Invoker)', hero:'Invoker', type:'Legendary', emoji:'🌀', price:22.00, seller:'InvokerGod' },
  { id:11, name:'Legendary – Eldritch Crawler (Earthshaker)', hero:'Earthshaker', type:'Legendary', emoji:'🦂', price:9.50, seller:'ESHammer' },
  { id:12, name:'Rare – Crystal Crown (Anti-Mage)', hero:'Anti-Mage', type:'Rare', emoji:'👑', price:3.50, seller:'AMRare' },
  { id:13, name:'Rare – Haunted Hook (Pudge)', hero:'Pudge', type:'Rare', emoji:'🪝', price:4.20, seller:'PudgeHook' },
  { id:14, name:'Rare – Lina\'s Grace', hero:'Lina', type:'Rare', emoji:'🌸', price:2.80, seller:'LinaGrace' },
  { id:15, name:'Courier – Roshan Jr.', hero:'None', type:'Courier', emoji:'🪨', price:38.00, seller:'CourierKing' },
  { id:16, name:'Courier – Felyne Familiar', hero:'None', type:'Courier', emoji:'🐱', price:25.00, seller:'CatCourier' },
  { id:17, name:'Courier – Ethereal Weaver', hero:'None', type:'Courier', emoji:'🕷️', price:45.00, seller:'WebMaster' },
  { id:18, name:'Ward – Guildless Observer', hero:'None', type:'Ward', emoji:'👁️', price:1.50, seller:'WardSeller' },
  { id:19, name:'Ward – Crystal Seer', hero:'None', type:'Ward', emoji:'🔮', price:2.20, seller:'CrystalSeer' },
  { id:20, name:'Arcana – Invader from the Outside (Invoker)', hero:'Invoker', type:'Arcana', emoji:'🌟', price:35.00, seller:'InvokerArcana' },
  { id:21, name:'Immortal – Pincers of the Primeval Predator', hero:'Pudge', type:'Immortal', emoji:'🦞', price:14.50, seller:'PudgeImm' },
  { id:22, name:'Legendary – Codicil of the Veiled Ones (Rubick)', hero:'Rubick', type:'Legendary', emoji:'📜', price:11.00, seller:'RubickLeg' },
  { id:23, name:'Rare – Shadow Amulet (Phantom Assassin)', hero:'Phantom Assassin', type:'Rare', emoji:'💎', price:5.20, seller:'PAShadow' },
  { id:24, name:'Misc – Golden Baby Roshan', hero:'None', type:'Misc', emoji:'🥇', price:75.00, seller:'GoldenRoshan' },
];

const ARCANA_FEATURED = [
  { name:'Abscessment', hero:'Pudge', emoji:'🪝', price:'$32.50', id:1 },
  { name:'Burning Shadow', hero:'Phantom Assassin', emoji:'🌹', price:'$28.00', id:2 },
  { name:'Thundergod\'s Wrath', hero:'Zeus', emoji:'⚡', price:'$24.99', id:3 },
  { name:'Invader from the Outside', hero:'Invoker', emoji:'🌟', price:'$35.00', id:20 },
];

const IMMORTAL_FEATURED = [
  { name:'The Leveller', hero:'Juggernaut', emoji:'🔱', price:'$12.50', id:5 },
  { name:'Pincers of the Primeval Predator', hero:'Pudge', emoji:'🦞', price:'$14.50', id:21 },
  { name:'Inscription of Chaos', hero:'Rubick', emoji:'📖', price:'$18.00', id:7 },
  { name:'Eternal Testament (Dragon Knight)', hero:'Dragon Knight', emoji:'⚔️', price:'$9.00', id:5 },
];

const BANNER_HEROES = [
  { name:'Pudge', emoji:'🩸' },
  { name:'Invoker', emoji:'✨' },
  { name:'Juggernaut', emoji:'⚔️' },
  { name:'Phantom Assassin', emoji:'🗡️' },
];

let myInventory = [
  { id:501, name:'Immortal – Manifest Destiny', hero:'Anti-Mage', type:'Immortal', emoji:'💠', price:8.99 },
  { id:502, name:'Rare – Crystal Crown', hero:'Anti-Mage', type:'Rare', emoji:'👑', price:3.50 },
  { id:503, name:'Ward – Guildless Observer', hero:'None', type:'Ward', emoji:'👁️', price:1.50 },
];
let myListings = [];
let balance = 780.00;
let activeType = 'all';
let activeHero = 'All Heroes';
let selectedListItem = null;
let filteredItems = [...DOTA_ITEMS];

document.addEventListener('DOMContentLoaded', () => {
  renderBannerHeroes();
  renderHeroFilters();
  applyFilters();
  renderShowcase('arcanaGrid', ARCANA_FEATURED, 'arcana-card');
  renderShowcase('immortalGrid', IMMORTAL_FEATURED, 'immortal-card');
  renderInventory();
  updateBalance();
  document.getElementById('listingTotal').textContent = DOTA_ITEMS.length;
});

function updateBalance() {
  document.getElementById('balance').textContent =
    '$' + balance.toLocaleString('en-US', { minimumFractionDigits:2, maximumFractionDigits:2 });
}

// ---- BANNER ----
function renderBannerHeroes() {
  const container = document.getElementById('bannerHeroes');
  BANNER_HEROES.forEach(h => {
    const div = document.createElement('div');
    div.className = 'hero-bubble';
    div.innerHTML = `<span class="hero-emoji">${h.emoji}</span><div class="hero-hname">${h.name}</div>`;
    container.appendChild(div);
  });
}

// ---- HERO FILTERS ----
function renderHeroFilters() {
  const container = document.getElementById('heroFilterBtns');
  HEROES_LIST.forEach(hero => {
    const btn = document.createElement('button');
    btn.className = `hfb${hero === 'All Heroes' ? ' active' : ''}`;
    btn.textContent = (HERO_EMOJIS[hero] || '') + ' ' + hero;
    btn.onclick = () => {
      activeHero = hero;
      document.querySelectorAll('.hfb').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    };
    container.appendChild(btn);
  });
}

// ---- FILTERS ----
function filterType(type, btn) {
  activeType = type;
  document.querySelectorAll('.it-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  applyFilters();
}

function applyFilters() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const sort = document.getElementById('sortSel').value;
  const minP = parseFloat(document.getElementById('minPrice').value) || 0;
  const maxP = parseFloat(document.getElementById('maxPrice').value) || Infinity;

  filteredItems = DOTA_ITEMS.filter(item => {
    if (search && !item.name.toLowerCase().includes(search)) return false;
    if (activeType !== 'all' && item.type !== activeType) return false;
    if (activeHero !== 'All Heroes' && item.hero !== activeHero) return false;
    if (item.price < minP || item.price > maxP) return false;
    return true;
  });

  if (sort === 'price-desc') filteredItems.sort((a,b) => b.price - a.price);
  else if (sort === 'price-asc') filteredItems.sort((a,b) => a.price - b.price);
  else if (sort === 'name') filteredItems.sort((a,b) => a.name.localeCompare(b.name));

  document.getElementById('resCount').textContent = filteredItems.length;
  renderMarketGrid(filteredItems);
}

function renderMarketGrid(items) {
  const grid = document.getElementById('marketGrid');
  grid.innerHTML = '';
  if (items.length === 0) {
    grid.innerHTML = `<div class="empty-msg" style="grid-column:1/-1"><span>🔍</span><p>No items found.</p></div>`;
    return;
  }
  items.forEach(item => {
    const col = TYPE_COLORS[item.type] || '#8a9ab1';
    const div = document.createElement('div');
    div.className = `dota-card type-${item.type}`;
    div.innerHTML = `
      <div class="rarity-glow"></div>
      <span class="item-type-label">${item.type}</span>
      <span class="dota-item-emoji">${item.emoji}</span>
      <div class="dota-item-hero">${item.hero !== 'None' ? item.hero : 'Universal'}</div>
      <div class="dota-item-name">${item.name}</div>
      <div class="dota-item-footer">
        <span class="dota-item-price">$${item.price.toFixed(2)}</span>
        <span class="dota-item-seller">by ${item.seller}</span>
      </div>
      <button class="dota-buy-btn" onclick="buyItem(${item.id}, event)">Buy Now</button>
    `;
    div.addEventListener('click', () => openDetailModal(item.id));
    grid.appendChild(div);
  });
}

// ---- DETAIL MODAL ----
function openDetailModal(id) {
  const item = DOTA_ITEMS.find(i => i.id === id);
  if (!item) return;
  const col = TYPE_COLORS[item.type] || '#8a9ab1';
  document.getElementById('detailContent').innerHTML = `
    <div class="detail-layout">
      <div class="detail-visual">
        <span class="detail-emoji">${item.emoji}</span>
        <span class="detail-type-badge" style="background:${col}20;color:${col};border:1px solid ${col}50">${item.type}</span>
        <div class="detail-hero">${item.hero !== 'None' ? '🎮 ' + item.hero : 'Universal'}</div>
      </div>
      <div class="detail-info">
        <div class="detail-hero-sub">${item.type} • ${item.hero !== 'None' ? item.hero : 'Any Hero'}</div>
        <h2>${item.name}</h2>
        <div class="detail-price-big">$${item.price.toFixed(2)}</div>
        <div class="detail-attrs">
          <div class="da"><div class="da-l">Rarity</div><div class="da-v" style="color:${col}">${item.type}</div></div>
          <div class="da"><div class="da-l">Hero</div><div class="da-v">${item.hero !== 'None' ? item.hero : '–'}</div></div>
          <div class="da"><div class="da-l">Tradeable</div><div class="da-v" style="color:var(--green)">✓ Yes</div></div>
          <div class="da"><div class="da-l">Giftable</div><div class="da-v" style="color:var(--green)">✓ Yes</div></div>
        </div>
        <div class="detail-seller-box">
          <div class="d-sel-ava">👤</div>
          <div><div class="d-sel-name">${item.seller}</div><div class="d-sel-sub">Trusted Trader • 100% positive</div></div>
        </div>
        <div class="detail-btns">
          <button class="btn-d-buy" onclick="buyItem(${item.id})">Buy $${item.price.toFixed(2)}</button>
          <button class="btn-d-trade" onclick="closeDetailModal()">🔄 Trade Offer</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById('detailModal').classList.add('active');
}

function closeDetailModal(e) {
  if (e && e.target !== document.getElementById('detailModal')) return;
  document.getElementById('detailModal').classList.remove('active');
}

// ---- BUY ----
function buyItem(id, e) {
  if (e) e.stopPropagation();
  const item = DOTA_ITEMS.find(i => i.id === id);
  if (!item) return;
  if (balance < item.price) { showToast('❌ Insufficient balance!', 'error'); return; }
  balance -= item.price;
  updateBalance();
  myInventory.push({ ...item, id: Date.now() });
  renderInventory();
  document.getElementById('detailModal').classList.remove('active');
  showToast(`✅ Bought ${item.name} for $${item.price.toFixed(2)}!`, 'success');
}

// ---- LIST MODAL ----
function openListModal() {
  selectedListItem = null;
  document.getElementById('listForm').style.display = 'none';
  renderInvSelectGrid();
  document.getElementById('listModal').classList.add('active');
}

function closeListModal(e) {
  if (e && e.target !== document.getElementById('listModal')) return;
  document.getElementById('listModal').classList.remove('active');
}

function renderInvSelectGrid() {
  const grid = document.getElementById('invSelectGrid');
  if (myInventory.length === 0) {
    grid.innerHTML = `<div class="empty-msg" style="grid-column:1/-1"><span>🎒</span><p>Inventory empty.</p></div>`;
    return;
  }
  grid.innerHTML = '';
  myInventory.forEach(item => {
    const div = document.createElement('div');
    div.className = 'isg-card';
    div.innerHTML = `<span class="isg-emoji">${item.emoji}</span><div class="isg-name">${item.name.substring(0,28)}${item.name.length>28?'...':''}</div><div class="isg-price">$${item.price.toFixed(2)}</div>`;
    div.onclick = () => selectListItem(item, div);
    grid.appendChild(div);
  });
}

function selectListItem(item, el) {
  selectedListItem = item;
  document.querySelectorAll('.isg-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('listItemPreview').innerHTML = `
    <span class="lip-emoji">${item.emoji}</span>
    <div><div class="lip-name">${item.name}</div><div class="lip-meta">${item.type} • ${item.hero !== 'None' ? item.hero : 'Universal'}</div></div>
  `;
  document.getElementById('listPrice').value = item.price.toFixed(2);
  document.getElementById('suggestPrice').textContent = `Market avg: $${item.price.toFixed(2)}`;
  document.getElementById('listForm').style.display = 'block';
}

function submitListing() {
  if (!selectedListItem) { showToast('❌ Select an item!', 'error'); return; }
  const price = parseFloat(document.getElementById('listPrice').value);
  if (!price || price <= 0) { showToast('❌ Enter a valid price!', 'error'); return; }
  myListings.push({ ...selectedListItem, listPrice: price });
  renderMyTrades();
  showToast(`✅ Listed ${selectedListItem.name} for $${price.toFixed(2)}!`, 'success');
  document.getElementById('listModal').classList.remove('active');
}

// ---- MY TRADES ----
function renderMyTrades() {
  const container = document.getElementById('myTradesContainer');
  if (myListings.length === 0) {
    container.innerHTML = `<div class="empty-msg"><span>📭</span><p>No active listings.</p></div>`;
    return;
  }
  container.innerHTML = '';
  myListings.forEach((listing, idx) => {
    const col = TYPE_COLORS[listing.type] || '#8a9ab1';
    const div = document.createElement('div');
    div.className = 'trade-row';
    div.innerHTML = `
      <div class="tr-left">
        <span class="tr-emoji">${listing.emoji}</span>
        <div>
          <div class="tr-name">${listing.name}</div>
          <div class="tr-meta" style="color:${col}">${listing.type} • Listed just now</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:12px">
        <span class="tr-price">$${listing.listPrice.toFixed(2)}</span>
        <button class="btn-rm" onclick="removeListing(${idx})">Remove</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function removeListing(idx) {
  myListings.splice(idx, 1);
  renderMyTrades();
  showToast('✅ Listing removed.', 'success');
}

// ---- SHOWCASE ----
function renderShowcase(gridId, items, cardClass) {
  const grid = document.getElementById(gridId);
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = `showcase-card ${cardClass}`;
    div.innerHTML = `
      <span class="sc-emoji">${item.emoji}</span>
      <div class="sc-name">${item.name}</div>
      <div class="sc-hero">${item.hero}</div>
      <div class="sc-price">${item.price}</div>
    `;
    div.onclick = () => openDetailModal(item.id);
    grid.appendChild(div);
  });
}

// ---- INVENTORY ----
function renderInventory() {
  const grid = document.getElementById('inventoryGrid');
  const total = myInventory.reduce((s,i) => s + i.price, 0);
  document.getElementById('invValue').textContent = '$' + total.toFixed(2);
  if (myInventory.length === 0) {
    grid.innerHTML = `<div class="empty-msg" style="grid-column:1/-1"><span>🎒</span><p>Inventory is empty.</p></div>`;
    return;
  }
  grid.innerHTML = '';
  myInventory.forEach(item => {
    const col = TYPE_COLORS[item.type] || '#8a9ab1';
    const div = document.createElement('div');
    div.className = 'inv-card';
    div.style.borderColor = col + '50';
    div.innerHTML = `
      <span class="ic-emoji">${item.emoji}</span>
      <div class="ic-name">${item.name.substring(0,32)}${item.name.length>32?'...':''}</div>
      <div class="ic-price">$${item.price.toFixed(2)}</div>
      <div class="ic-type" style="color:${col}">${item.type}</div>
    `;
    grid.appendChild(div);
  });
}

function sellAllItems() {
  if (myInventory.length === 0) { showToast('🎒 Inventory is empty!', 'error'); return; }
  const total = myInventory.reduce((s,i) => s + i.price, 0);
  balance += total;
  updateBalance();
  myInventory = [];
  renderInventory();
  showToast(`💰 Sold all for $${total.toFixed(2)}!`, 'success');
}

// ---- TOAST ----
function showToast(msg, type='success') {
  let t = document.querySelector('.toast');
  if (!t) { t=document.createElement('div'); t.className='toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.className = `toast ${type}`;
  void t.offsetWidth;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}
