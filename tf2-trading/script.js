// ===========================
// TF2Bazaar – Frontend Logic
// ===========================

const QUALITY_COLORS = {
  Unusual: '#8650AC', Strange: '#CF6A32', Genuine: '#4D7455',
  Vintage: '#476291', Unique: '#FFD700', Craft: '#8a7a60'
};

const TF2_ITEMS = [
  { id:1, name:'Unusual Burning Flames Team Captain', type:'Hat', quality:'Unusual', effect:'Burning Flames', emoji:'👒', priceKeys:45, priceRef:0, seller:'HatMasterX', craftNo:null },
  { id:2, name:'Unusual Miami Nights Soldier\'s Stash', type:'Hat', quality:'Unusual', effect:'Miami Nights', emoji:'🎓', priceKeys:28, priceRef:0, seller:'SunsetTrader', craftNo:null },
  { id:3, name:'Strange Minigun | Kills: 4,521', type:'Weapon', quality:'Strange', effect:null, emoji:'🔫', priceKeys:3, priceRef:11, seller:'HeavyMain', craftNo:null },
  { id:4, name:'Strange Black Box | Kills: 982', type:'Weapon', quality:'Strange', effect:null, emoji:'📦', priceKeys:1, priceRef:22, seller:'SoldierPro', craftNo:null },
  { id:5, name:'Genuine Pac-Mann', type:'Hat', quality:'Genuine', effect:null, emoji:'👾', priceKeys:0, priceRef:33, seller:'GenuineKing', craftNo:null },
  { id:6, name:'Vintage Connoisseur\'s Cap', type:'Hat', quality:'Vintage', effect:null, emoji:'🎩', priceKeys:0, priceRef:22.11, seller:'OldTimer99', craftNo:null },
  { id:7, name:'Unusual Sunbeams Attendant', type:'Cosmetic', quality:'Unusual', effect:'Sunbeams', emoji:'👔', priceKeys:55, priceRef:0, seller:'MannCoCollect', craftNo:null },
  { id:8, name:'Unusual Circling Hearts Reggaelator', type:'Hat', quality:'Unusual', effect:'Circling Hearts', emoji:'🎺', priceKeys:12, priceRef:0, seller:'LoveTrader', craftNo:null },
  { id:9, name:'Strange Scattergun | Kills: 12,400', type:'Weapon', quality:'Strange', effect:null, emoji:'🎯', priceKeys:2, priceRef:0, seller:'ScoutMain100', craftNo:null },
  { id:10, name:'Craft Hat #2814', type:'Hat', quality:'Craft', effect:null, emoji:'🧢', priceKeys:0, priceRef:1.33, seller:'HatFarmer', craftNo:2814 },
  { id:11, name:'Unique Mann Co. Supply Key', type:'Key', quality:'Unique', effect:null, emoji:'🔑', priceKeys:1, priceRef:0, seller:'KeySeller01', craftNo:null },
  { id:12, name:'Unusual Vivid Plasma Stainless Pot', type:'Hat', quality:'Unusual', effect:'Vivid Plasma', emoji:'🪣', priceKeys:8, priceRef:0, seller:'PotTrader', craftNo:null },
  { id:13, name:'Strange Rocket Launcher | Kills: 7,002', type:'Weapon', quality:'Strange', effect:null, emoji:'🚀', priceKeys:3, priceRef:0, seller:'RocketMann', craftNo:null },
  { id:14, name:'Genuine Horsemann\'s Hand-Me-Down', type:'Cosmetic', quality:'Genuine', effect:null, emoji:'🧤', priceKeys:0, priceRef:5.55, seller:'HalloweenTrade', craftNo:null },
  { id:15, name:'Strange Medigun | Heals: 1.2M', type:'Weapon', quality:'Strange', effect:null, emoji:'💉', priceKeys:15, priceRef:0, seller:'MedicMain', craftNo:null },
  { id:16, name:'Unusual Scorching Flames Noble Amassment', type:'Hat', quality:'Unusual', effect:'Scorching Flames', emoji:'🏆', priceKeys:180, priceRef:0, seller:'ScorchKing', craftNo:null },
  { id:17, name:'Unique Tour of Duty Ticket', type:'Misc', quality:'Unique', effect:null, emoji:'🎫', priceKeys:1, priceRef:0, seller:'MvMRunner', craftNo:null },
  { id:18, name:'Unusual Disco Beat Down El Jefe', type:'Hat', quality:'Unusual', effect:'Disco Beat Down', emoji:'🕺', priceKeys:22, priceRef:0, seller:'DiscoTrader', craftNo:null },
  { id:19, name:'Craft #5 – Refined Metal', type:'Misc', quality:'Craft', effect:null, emoji:'🔩', priceKeys:0, priceRef:0.11, seller:'ScrapMaster', craftNo:5 },
  { id:20, name:'Strange Ambassador | Kills: 3,800', type:'Weapon', quality:'Strange', effect:null, emoji:'🎭', priceKeys:4, priceRef:0, seller:'SpyMain', craftNo:null },
];

const UNUSUAL_FEATURED = [
  { name:'Burning Flames Team Captain', emoji:'👒', effect:'Burning Flames', price:'45 keys', id:1 },
  { name:'Sunbeams Attendant', emoji:'👔', effect:'Sunbeams', price:'55 keys', id:7 },
  { name:'Vivid Plasma Stainless Pot', emoji:'🪣', effect:'Vivid Plasma', price:'8 keys', id:12 },
  { name:'Scorching Flames Noble Amassment', emoji:'🏆', effect:'Scorching Flames', price:'180 keys', id:16 },
  { name:'Unusual Circling Hearts Reggaelator', emoji:'🎺', effect:'Circling Hearts', price:'12 keys', id:8 },
  { name:'Disco Beat Down El Jefe', emoji:'🕺', effect:'Disco Beat Down', price:'22 keys', id:18 },
];

const CLASS_CHARS = [
  { name:'Scout', emoji:'🏃' },
  { name:'Soldier', emoji:'🪖' },
  { name:'Pyro', emoji:'🔥' },
  { name:'Heavy', emoji:'💪' },
];

let myBackpack = [
  { id:301, name:'Unique Rocketeer\'s Rucksack', emoji:'🎒', priceKeys:0, priceRef:5.55, quality:'Unique', type:'Cosmetic' },
  { id:302, name:'Strange Sniper Rifle | Kills: 200', emoji:'🔭', priceKeys:1, priceRef:0, quality:'Strange', type:'Weapon' },
  { id:303, name:'Craft Hat #1234', emoji:'🧢', priceKeys:0, priceRef:1.33, quality:'Craft', type:'Hat' },
  { id:304, name:'Mann Co. Supply Key', emoji:'🔑', priceKeys:1, priceRef:0, quality:'Unique', type:'Key' },
  { id:305, name:'Tour of Duty Ticket', emoji:'🎫', priceKeys:1, priceRef:0, quality:'Unique', type:'Misc' },
];
let myListings = [];
let keyBalance = 12;
let refBalance = 45.33;
let activeTypeFilter = 'all';
let activeQualityFilter = '';
let selectedListItem = null;
let filtered = [...TF2_ITEMS];

document.addEventListener('DOMContentLoaded', () => {
  renderClassChars();
  renderUnusuals();
  renderBackpack();
  applyFilters();
  document.getElementById('totalItems').textContent = TF2_ITEMS.length;
  updateBalance();
});

function updateBalance() {
  document.getElementById('keyBalance').textContent = `${keyBalance} keys`;
  document.getElementById('refBalance').textContent = `${refBalance.toFixed(2)} ref`;
}

// ---- CLASS CHARS ----
function renderClassChars() {
  const container = document.getElementById('classEmojis');
  CLASS_CHARS.forEach(c => {
    const div = document.createElement('div');
    div.className = 'class-char';
    div.innerHTML = `<span class="char-emoji">${c.emoji}</span><div class="char-name">${c.name}</div>`;
    container.appendChild(div);
  });
}

// ---- FILTERS ----
function switchType(type, btn) {
  activeTypeFilter = type;
  document.querySelectorAll('.type-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  applyFilters();
}

function switchQuality(qual, btn) {
  activeQualityFilter = qual;
  document.querySelectorAll('.qual-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  applyFilters();
}

function applyFilters() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const sort = document.getElementById('sortSelect').value;
  const minK = parseFloat(document.getElementById('minKeys').value) || 0;
  const maxK = parseFloat(document.getElementById('maxKeys').value) || Infinity;

  filtered = TF2_ITEMS.filter(item => {
    if (search && !item.name.toLowerCase().includes(search)) return false;
    if (activeTypeFilter !== 'all' && item.type !== activeTypeFilter) return false;
    if (activeQualityFilter && item.quality !== activeQualityFilter) return false;
    if (item.priceKeys < minK || item.priceKeys > maxK) return false;
    return true;
  });

  if (sort === 'price-desc') filtered.sort((a,b) => b.priceKeys - a.priceKeys || b.priceRef - a.priceRef);
  else if (sort === 'price-asc') filtered.sort((a,b) => a.priceKeys - b.priceKeys || a.priceRef - b.priceRef);

  document.getElementById('resultCount').textContent = filtered.length;
  renderItemsGrid(filtered);
}

function renderItemsGrid(items) {
  const grid = document.getElementById('itemsGrid');
  grid.innerHTML = '';
  if (items.length === 0) {
    grid.innerHTML = `<div class="empty" style="grid-column:1/-1"><span>🔍</span><p>No items found.</p></div>`;
    return;
  }
  items.forEach(item => {
    const col = QUALITY_COLORS[item.quality] || '#8a7a60';
    const priceStr = formatPrice(item.priceKeys, item.priceRef);
    const div = document.createElement('div');
    div.className = `item-card quality-${item.quality}`;
    div.innerHTML = `
      <div class="quality-stripe"></div>
      <span class="item-type-tag">${item.type}</span>
      ${item.effect ? `<span class="unusual-effect-badge">⚡ ${item.effect}</span>` : ''}
      <span class="item-emoji">${item.emoji}</span>
      <div class="item-quality-label" style="color:${col}">${item.quality}${item.craftNo ? ` #${item.craftNo}` : ''}</div>
      <div class="item-name">${item.name}</div>
      <div class="item-meta">${item.seller}</div>
      <div class="item-price-row">
        <span class="item-price" style="color:${col}">${priceStr}</span>
        <span class="item-seller">by ${item.seller}</span>
      </div>
      <button class="buy-item-btn" onclick="buyItem(${item.id}, event)">Buy Now</button>
    `;
    div.addEventListener('click', () => openItemModal(item.id));
    grid.appendChild(div);
  });
}

function formatPrice(keys, ref) {
  if (keys > 0 && ref > 0) return `${keys} keys + ${ref} ref`;
  if (keys > 0) return `${keys} key${keys !== 1 ? 's' : ''}`;
  return `${ref.toFixed(2)} ref`;
}

// ---- ITEM MODAL ----
function openItemModal(id) {
  const item = TF2_ITEMS.find(i => i.id === id);
  if (!item) return;
  const col = QUALITY_COLORS[item.quality] || '#8a7a60';
  const priceStr = formatPrice(item.priceKeys, item.priceRef);
  document.getElementById('itemDetail').innerHTML = `
    <div class="item-modal-grid">
      <div class="item-modal-visual">
        <span class="item-modal-emoji">${item.emoji}</span>
        <div><span class="item-quality-pill" style="background:${col}20;color:${col};border:1px solid ${col}50">${item.quality}</span></div>
        ${item.effect ? `<div style="color:${col};font-size:0.8rem;margin-top:0.5rem">⚡ ${item.effect}</div>` : ''}
      </div>
      <div class="item-modal-info">
        <div class="item-modal-type">${item.type}</div>
        <h2>${item.name}</h2>
        <div class="item-modal-price" style="color:${col}">${priceStr}</div>
        <div class="item-modal-attrs">
          <div class="iattr"><div class="iattr-l">Quality</div><div class="iattr-v" style="color:${col}">${item.quality}</div></div>
          <div class="iattr"><div class="iattr-l">Type</div><div class="iattr-v">${item.type}</div></div>
          ${item.craftNo ? `<div class="iattr"><div class="iattr-l">Craft #</div><div class="iattr-v">#${item.craftNo}</div></div>` : ''}
          <div class="iattr"><div class="iattr-l">Tradeable</div><div class="iattr-v" style="color:var(--green)">✓ Yes</div></div>
        </div>
        <div class="seller-row">
          <div class="seller-ava">👤</div>
          <div><div class="seller-nm">${item.seller}</div><div class="seller-sub">Trusted Trader</div></div>
        </div>
        <div class="modal-btns">
          <button class="btn-buy-tf2" onclick="buyItem(${item.id})">Buy ${priceStr}</button>
          <button class="btn-offer-tf2" onclick="closeItemModal()">🔄 Make Offer</button>
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
  const item = TF2_ITEMS.find(i => i.id === id);
  if (!item) return;
  if (keyBalance < item.priceKeys) { showToast('❌ Not enough keys!', 'error'); return; }
  keyBalance -= item.priceKeys;
  refBalance -= item.priceRef;
  if (refBalance < 0) { refBalance += keyBalance * 66; keyBalance--; }
  updateBalance();
  myBackpack.push({ ...item, id: Date.now() });
  renderBackpack();
  document.getElementById('itemModal').classList.remove('active');
  showToast(`✅ Bought ${item.name}!`, 'success');
}

// ---- LIST MODAL ----
function openListModal() {
  selectedListItem = null;
  document.getElementById('listForm').style.display = 'none';
  renderListInv();
  document.getElementById('listModal').classList.add('active');
}

function closeListModal(e) {
  if (e && e.target !== document.getElementById('listModal')) return;
  document.getElementById('listModal').classList.remove('active');
}

function renderListInv() {
  const grid = document.getElementById('listInvGrid');
  if (myBackpack.length === 0) {
    grid.innerHTML = `<div class="empty" style="grid-column:1/-1"><span>🎒</span><p>Backpack empty.</p></div>`;
    return;
  }
  grid.innerHTML = '';
  myBackpack.forEach(item => {
    const div = document.createElement('div');
    div.className = 'list-inv-card';
    div.innerHTML = `<span class="lic-emoji">${item.emoji}</span><div class="lic-name">${item.name.substring(0,30)}${item.name.length>30?'...':''}</div>`;
    div.onclick = () => selectListItem(item, div);
    grid.appendChild(div);
  });
}

function selectListItem(item, el) {
  selectedListItem = item;
  document.querySelectorAll('.list-inv-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('listPreview').innerHTML = `
    <span class="lp-emoji">${item.emoji}</span>
    <div><div class="lp-name">${item.name}</div><div class="lp-meta">${item.quality} • ${item.type}</div></div>
  `;
  document.getElementById('listKeys').value = item.priceKeys || 0;
  document.getElementById('listRef').value = item.priceRef || 0;
  document.getElementById('listForm').style.display = 'block';
}

function submitListing() {
  if (!selectedListItem) { showToast('❌ Select an item!', 'error'); return; }
  const keys = parseInt(document.getElementById('listKeys').value) || 0;
  const ref = parseFloat(document.getElementById('listRef').value) || 0;
  if (keys === 0 && ref === 0) { showToast('❌ Enter a price!', 'error'); return; }
  myListings.push({ ...selectedListItem, listKeys: keys, listRef: ref });
  renderMyListings();
  showToast(`✅ Listed ${selectedListItem.name}!`, 'success');
  document.getElementById('listModal').classList.remove('active');
}

// ---- MY LISTINGS ----
function renderMyListings() {
  const container = document.getElementById('myListingsContainer');
  if (myListings.length === 0) {
    container.innerHTML = `<div class="empty"><span>📭</span><p>No active listings. Click "List Item" to start trading!</p></div>`;
    return;
  }
  container.innerHTML = '';
  myListings.forEach((listing, idx) => {
    const col = QUALITY_COLORS[listing.quality] || '#8a7a60';
    const priceStr = formatPrice(listing.listKeys, listing.listRef);
    const div = document.createElement('div');
    div.className = 'listing-row';
    div.innerHTML = `
      <div class="listing-left">
        <span class="lr-emoji">${listing.emoji}</span>
        <div>
          <div class="lr-name">${listing.name}</div>
          <div class="lr-meta" style="color:${col}">${listing.quality} • ${listing.type}</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:12px">
        <span class="lr-price">${priceStr}</span>
        <button class="btn-delist" onclick="delistItem(${idx})">Remove</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function delistItem(idx) {
  myListings.splice(idx, 1);
  renderMyListings();
  showToast('✅ Listing removed.', 'success');
}

// ---- UNUSUAL GRID ----
function renderUnusuals() {
  const grid = document.getElementById('unusualGrid');
  UNUSUAL_FEATURED.forEach(u => {
    const div = document.createElement('div');
    div.className = 'unusual-card';
    div.innerHTML = `
      <span class="unusual-emoji">${u.emoji}</span>
      <div class="unusual-name">${u.name}</div>
      <div class="unusual-effect">⚡ ${u.effect}</div>
      <div class="unusual-price">${u.price}</div>
    `;
    div.onclick = () => openItemModal(u.id);
    grid.appendChild(div);
  });
}

// ---- BACKPACK ----
function renderBackpack() {
  const grid = document.getElementById('backpackGrid');
  const totalKeys = myBackpack.reduce((s,i) => s + (i.priceKeys || 0), 0);
  document.getElementById('backpackValue').textContent = `~${totalKeys} keys`;
  if (myBackpack.length === 0) {
    grid.innerHTML = `<div class="empty" style="grid-column:1/-1"><span>🎒</span><p>Backpack is empty.</p></div>`;
    return;
  }
  grid.innerHTML = '';
  myBackpack.forEach(item => {
    const div = document.createElement('div');
    div.className = 'bp-slot';
    const col = QUALITY_COLORS[item.quality] || '#8a7a60';
    div.style.borderColor = col + '50';
    div.innerHTML = `
      <span class="bp-emoji">${item.emoji}</span>
      <div class="bp-name">${item.name.substring(0,24)}${item.name.length>24?'...':''}</div>
      <div class="bp-price" style="color:${col}">${formatPrice(item.priceKeys||0, item.priceRef||0)}</div>
    `;
    grid.appendChild(div);
  });
}

function openSteamTrade() {
  showToast('🎮 Steam trade link required. Connect Steam account to use this feature.', 'success');
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
