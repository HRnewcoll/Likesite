// ===========================
// RustTrade – Frontend Logic
// ===========================

const SKINS_DATA = [
  { id:1, name:'AK47 | Whiteout', category:'Weapon', quality:'Pristine', emoji:'🔫', price:85.00, seller:'RustKing', soldCount:142 },
  { id:2, name:'LR-300 | Tempered', category:'Weapon', quality:'Good', emoji:'🎯', price:34.00, seller:'DesertSurvivor', soldCount:89 },
  { id:3, name:'Thompson | Tundra', category:'Weapon', quality:'Worn', emoji:'🔧', price:18.50, seller:'IcePick', soldCount:60 },
  { id:4, name:'SAR | Snake Skin', category:'Weapon', quality:'Good', emoji:'🐍', price:12.00, seller:'SerpentKing', soldCount:210 },
  { id:5, name:'Double Barrel | Ironside', category:'Weapon', quality:'Rough', emoji:'💥', price:5.50, seller:'IronWolf', soldCount:300 },
  { id:6, name:'Hoodie | Camo Green', category:'Clothing', quality:'Pristine', emoji:'👕', price:28.00, seller:'CamoGhost', soldCount:77 },
  { id:7, name:'Pants | Tactical Brown', category:'Clothing', quality:'Good', emoji:'👖', price:15.00, seller:'TacOps', soldCount:95 },
  { id:8, name:'Boots | Military Grade', category:'Clothing', quality:'Pristine', emoji:'👢', price:22.00, seller:'SoldiersKing', soldCount:55 },
  { id:9, name:'Hat | Rust Bucket', category:'Clothing', quality:'Worn', emoji:'🎩', price:3.50, seller:'OldRusty', soldCount:480 },
  { id:10, name:'Jacket | Snow Camo', category:'Clothing', quality:'Pristine', emoji:'🧥', price:45.00, seller:'Frostbite', soldCount:33 },
  { id:11, name:'Pickaxe | Black Gold', category:'Tool', quality:'Pristine', emoji:'⛏️', price:60.00, seller:'GoldDigger', soldCount:28 },
  { id:12, name:'Hatchet | Blood Red', category:'Tool', quality:'Good', emoji:'🪓', price:25.00, seller:'WoodSplitter', soldCount:112 },
  { id:13, name:'Rock | Painted', category:'Tool', quality:'Rough', emoji:'🪨', price:0.50, seller:'Pebbler', soldCount:1000 },
  { id:14, name:'Hammer | Construction', category:'Tool', quality:'Good', emoji:'🔨', price:8.00, seller:'Builder99', soldCount:200 },
  { id:15, name:'Metal Chestplate | Drilled', category:'Armor', quality:'Pristine', emoji:'🛡️', price:42.00, seller:'IronHide', soldCount:44 },
  { id:16, name:'Helmet | Samurai', category:'Armor', quality:'Pristine', emoji:'⛩️', price:88.00, seller:'WarlordJP', soldCount:19 },
  { id:17, name:'Roadsign Vest | Tagged', category:'Armor', quality:'Worn', emoji:'🚧', price:7.00, seller:'ScrapMaster', soldCount:320 },
  { id:18, name:'Wooden Shield | Carved', category:'Armor', quality:'Good', emoji:'🪵', price:14.00, seller:'WoodCraft', soldCount:75 },
  { id:19, name:'MLRS Rocket | Painted', category:'Misc', quality:'Good', emoji:'🚀', price:9.50, seller:'RocketMan', soldCount:50 },
  { id:20, name:'Sign | Skull Art', category:'Misc', quality:'Pristine', emoji:'💀', price:30.00, seller:'ArtistRust', soldCount:22 },
  { id:21, name:'Sleeping Bag | Luxury', category:'Misc', quality:'Pristine', emoji:'🛏️', price:18.00, seller:'CampMaster', soldCount:38 },
  { id:22, name:'Storage Box | Reinforced', category:'Misc', quality:'Good', emoji:'📦', price:6.00, seller:'HoarderKing', soldCount:155 },
];

const TICKER_DATA = [
  { user:'RustKing', item:'AK47 | Whiteout', price:85, emoji:'🔫' },
  { user:'CamoGhost', item:'Hoodie | Camo Green', price:28, emoji:'👕' },
  { user:'GoldDigger', item:'Pickaxe | Black Gold', price:60, emoji:'⛏️' },
  { user:'WarlordJP', item:'Helmet | Samurai', price:88, emoji:'⛩️' },
  { user:'Frostbite', item:'Jacket | Snow Camo', price:45, emoji:'🧥' },
  { user:'IronHide', item:'Metal Chestplate', price:42, emoji:'🛡️' },
  { user:'ArtistRust', item:'Sign | Skull Art', price:30, emoji:'💀' },
  { user:'DesertSurvivor', item:'LR-300 | Tempered', price:34, emoji:'🎯' },
];

const FEATURED = [
  { name:'AK47 | Whiteout', emoji:'🔫', price:'$85' },
  { name:'Helmet | Samurai', emoji:'⛩️', price:'$88' },
  { name:'Pickaxe | Black Gold', emoji:'⛏️', price:'$60' },
];

let myInventory = [
  { id:201, name:'Thompson | Tundra', emoji:'🔧', price:18.50, quality:'Worn', category:'Weapon' },
  { id:202, name:'Pants | Tactical Brown', emoji:'👖', price:15.00, quality:'Good', category:'Clothing' },
  { id:203, name:'Rock | Painted', emoji:'🪨', price:0.50, quality:'Rough', category:'Tool' },
];
let myListings = [];
let balance = 850.00;
let currentPage = 1;
const PER_PAGE = 12;
let filtered = [...SKINS_DATA];
let selectedSellItem = null;

document.addEventListener('DOMContentLoaded', () => {
  renderBannerItems();
  renderTicker();
  filterSkins();
  renderInventory();
  document.getElementById('listingCount').textContent = SKINS_DATA.length;
  updateBalance();
});

function updateBalance() {
  document.getElementById('balance').textContent =
    '$' + balance.toLocaleString('en-US', { minimumFractionDigits:2, maximumFractionDigits:2 });
}

// ---- BANNER ----
function renderBannerItems() {
  const container = document.getElementById('bannerItems');
  FEATURED.forEach(f => {
    const div = document.createElement('div');
    div.className = 'banner-item';
    div.innerHTML = `<span class="banner-item-emoji">${f.emoji}</span><div class="banner-item-name">${f.name}</div><div class="banner-item-price">${f.price}</div>`;
    container.appendChild(div);
  });
}

// ---- TICKER ----
function renderTicker() {
  const track = document.getElementById('tickerTrack');
  const items = [...TICKER_DATA, ...TICKER_DATA];
  const container = document.createElement('div');
  container.className = 'ticker-items';
  items.forEach(t => {
    const span = document.createElement('span');
    span.className = 'ticker-item';
    span.innerHTML = `${t.emoji} <strong>${t.user}</strong> sold <em>${t.item}</em> for <span style="color:var(--green);font-weight:700">$${t.price}</span>`;
    container.appendChild(span);
  });
  track.appendChild(container);
}

// ---- FILTER / SORT ----
function filterCategory(cat, btn) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentPage = 1;
  filterSkins(cat);
}

function filterSkins(forceCat) {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const sort = document.getElementById('sortBy').value;
  const quality = document.getElementById('qualityFilter').value;
  const activeCat = forceCat !== undefined ? forceCat :
    [...document.querySelectorAll('.cat-btn')].find(b => b.classList.contains('active'))?.dataset?.cat || '';

  filtered = SKINS_DATA.filter(s => {
    if (search && !s.name.toLowerCase().includes(search)) return false;
    if (activeCat && !s.category.includes(activeCat)) return false;
    if (quality && s.quality !== quality) return false;
    return true;
  });

  if (sort === 'price-asc') filtered.sort((a,b) => a.price - b.price);
  else if (sort === 'price-desc') filtered.sort((a,b) => b.price - a.price);
  else if (sort === 'name') filtered.sort((a,b) => a.name.localeCompare(b.name));

  renderPage();
}

function renderPage() {
  const start = (currentPage - 1) * PER_PAGE;
  const pageItems = filtered.slice(start, start + PER_PAGE);
  renderGrid(pageItems);
  renderPagination();
}

function renderGrid(items) {
  const grid = document.getElementById('marketGrid');
  grid.innerHTML = '';
  if (items.length === 0) {
    grid.innerHTML = `<div class="empty" style="grid-column:1/-1"><span>🔍</span><p>No skins match your search.</p></div>`;
    return;
  }
  items.forEach(skin => {
    const div = document.createElement('div');
    div.className = `skin-card quality-${skin.quality}`;
    div.innerHTML = `
      <div class="skin-quality-bar"></div>
      <span class="skin-category-tag">${skin.category}</span>
      <span class="skin-emoji">${skin.emoji}</span>
      <div class="skin-name">${skin.name}</div>
      <div class="skin-quality">${skin.quality}</div>
      <div class="skin-footer">
        <span class="skin-price">$${skin.price.toFixed(2)}</span>
        <span class="skin-seller">by ${skin.seller}</span>
      </div>
      <button class="buy-btn" onclick="buySkin(${skin.id}, event)">Buy Now</button>
    `;
    div.addEventListener('click', () => openSkinModal(skin.id));
    grid.appendChild(div);
  });
}

function renderPagination() {
  const pages = Math.ceil(filtered.length / PER_PAGE);
  const pag = document.getElementById('pagination');
  pag.innerHTML = '';
  for (let i = 1; i <= pages; i++) {
    const btn = document.createElement('button');
    btn.className = `page-btn${i === currentPage ? ' active' : ''}`;
    btn.textContent = i;
    btn.onclick = () => { currentPage = i; renderPage(); };
    pag.appendChild(btn);
  }
}

// ---- SKIN MODAL ----
function openSkinModal(id) {
  const skin = SKINS_DATA.find(s => s.id === id);
  if (!skin) return;
  const qualColors = { Pristine:'#5a9e4a', Good:'#3a7bd5', Worn:'#d4a017', Rough:'#8a7a60' };
  const col = qualColors[skin.quality] || '#8a7a60';
  document.getElementById('skinDetail').innerHTML = `
    <div class="skin-detail-layout">
      <div class="skin-detail-visual">
        <span class="skin-detail-emoji">${skin.emoji}</span>
        <div style="margin-bottom:0.5rem">
          <span class="skin-detail-quality" style="background:${col}20;color:${col};border:1px solid ${col}50">${skin.quality}</span>
        </div>
        <div style="font-size:0.82rem;color:var(--muted)">${skin.category}</div>
      </div>
      <div class="skin-detail-info">
        <div class="skin-detail-cat">${skin.category}</div>
        <h2>${skin.name}</h2>
        <div class="detail-price">$${skin.price.toFixed(2)}</div>
        <div class="detail-attrs">
          <div class="dattr"><div class="dattr-label">Quality</div><div class="dattr-value" style="color:${col}">${skin.quality}</div></div>
          <div class="dattr"><div class="dattr-label">Category</div><div class="dattr-value">${skin.category}</div></div>
          <div class="dattr"><div class="dattr-label">Sold</div><div class="dattr-value">${skin.soldCount}×</div></div>
          <div class="dattr"><div class="dattr-label">Tradeable</div><div class="dattr-value" style="color:var(--green)">✓ Yes</div></div>
        </div>
        <div class="detail-seller">
          <div class="detail-seller-ava">👤</div>
          <div>
            <div class="detail-seller-name">${skin.seller}</div>
            <div class="detail-seller-sub">Trusted Seller</div>
          </div>
        </div>
        <div class="detail-actions">
          <button class="btn-buy-now" onclick="buySkin(${skin.id})">💵 Buy $${skin.price.toFixed(2)}</button>
          <button class="btn-trade-it" onclick="closeSkinModal()">🔄 Make Offer</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById('skinModal').classList.add('active');
}

function closeSkinModal(e) {
  if (e && e.target !== document.getElementById('skinModal')) return;
  document.getElementById('skinModal').classList.remove('active');
}

// ---- BUY ----
function buySkin(id, e) {
  if (e) e.stopPropagation();
  const skin = SKINS_DATA.find(s => s.id === id);
  if (!skin) return;
  if (balance < skin.price) { showToast('❌ Insufficient balance!', 'error'); return; }
  balance -= skin.price;
  updateBalance();
  myInventory.push({ ...skin, id: Date.now() });
  renderInventory();
  document.getElementById('skinModal').classList.remove('active');
  showToast(`✅ Bought ${skin.name} for $${skin.price.toFixed(2)}!`, 'success');
}

// ---- SELL MODAL ----
function openSellModal() {
  selectedSellItem = null;
  document.getElementById('sellConfig').style.display = 'none';
  renderSellInv();
  document.getElementById('sellModal').classList.add('active');
}

function closeSellModal(e) {
  if (e && e.target !== document.getElementById('sellModal')) return;
  document.getElementById('sellModal').classList.remove('active');
}

function renderSellInv() {
  const grid = document.getElementById('invGrid');
  if (myInventory.length === 0) {
    grid.innerHTML = `<div class="empty" style="grid-column:1/-1"><span>🎒</span><p>No items.</p></div>`;
    return;
  }
  grid.innerHTML = '';
  myInventory.forEach(item => {
    const div = document.createElement('div');
    div.className = 'inv-card';
    div.innerHTML = `<span class="ic-emoji">${item.emoji}</span><div class="ic-name">${item.name}</div><div class="ic-price">$${item.price.toFixed(2)}</div>`;
    div.onclick = () => selectSellItem(item, div);
    grid.appendChild(div);
  });
}

function selectSellItem(item, el) {
  selectedSellItem = item;
  document.querySelectorAll('.inv-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('sellPreview').innerHTML = `
    <span class="sp-emoji">${item.emoji}</span>
    <div><div class="sp-name">${item.name}</div><div class="sp-meta">${item.quality} • ${item.category}</div></div>
  `;
  document.getElementById('sellPrice').value = item.price.toFixed(2);
  document.getElementById('marketAvg').textContent = `Market avg: $${item.price.toFixed(2)}`;
  document.getElementById('sellConfig').style.display = 'block';
}

function submitListing() {
  if (!selectedSellItem) { showToast('❌ Select an item!', 'error'); return; }
  const price = parseFloat(document.getElementById('sellPrice').value);
  if (!price || price <= 0) { showToast('❌ Enter a valid price!', 'error'); return; }
  myListings.push({ ...selectedSellItem, listPrice: price });
  renderActiveListings();
  showToast(`✅ Listed ${selectedSellItem.name} for $${price.toFixed(2)}!`, 'success');
  document.getElementById('sellModal').classList.remove('active');
}

// ---- ACTIVE LISTINGS ----
function renderActiveListings() {
  const container = document.getElementById('activeTrades');
  if (myListings.length === 0) {
    container.innerHTML = `<div class="empty"><span>📦</span><p>You have no active listings.</p></div>`;
    return;
  }
  container.innerHTML = '';
  myListings.forEach((listing, idx) => {
    const div = document.createElement('div');
    div.className = 'trade-row';
    div.innerHTML = `
      <div class="trade-left">
        <span class="tr-emoji">${listing.emoji}</span>
        <div><div class="tr-name">${listing.name}</div><div class="tr-meta">${listing.quality} • Listed just now</div></div>
      </div>
      <div style="display:flex;align-items:center;gap:12px">
        <span class="tr-price">$${listing.listPrice.toFixed(2)}</span>
        <button class="btn-cancel-tr" onclick="cancelListing(${idx})">Cancel</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function cancelListing(idx) {
  myListings.splice(idx, 1);
  renderActiveListings();
  showToast('✅ Listing cancelled.', 'success');
}

// ---- INVENTORY ----
function renderInventory() {
  const grid = document.getElementById('invItemsGrid');
  const total = myInventory.reduce((s,i) => s+i.price, 0);
  document.getElementById('invTotal').textContent = '$' + total.toFixed(2);
  if (myInventory.length === 0) {
    grid.innerHTML = `<div class="empty" style="grid-column:1/-1"><span>🎒</span><p>Inventory empty.</p></div>`;
    return;
  }
  grid.innerHTML = '';
  myInventory.forEach(item => {
    const div = document.createElement('div');
    div.className = 'inv-item-card';
    div.innerHTML = `
      <span class="iic-emoji">${item.emoji}</span>
      <div class="iic-name">${item.name}</div>
      <div class="iic-price">$${item.price.toFixed(2)}</div>
      <div class="iic-quality">${item.quality}</div>
    `;
    grid.appendChild(div);
  });
}

function sellAllInventory() {
  if (myInventory.length === 0) { showToast('🎒 Inventory is empty!', 'error'); return; }
  const total = myInventory.reduce((s,i) => s+i.price, 0);
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
