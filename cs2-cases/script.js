// ===========================
// CS2Cases – Frontend Logic
// ===========================

// ---- DATA ----
const CASES = [
  {
    id: 'operation-dreams',
    name: 'Operation Dreams',
    desc: 'Contains exclusive knives & gloves',
    emoji: '💼',
    price: 2.99,
    badge: 'featured',
    items: [
      { name: 'Karambit | Fade', emoji: '🔪', price: 420.00, rarity: 'gold', chance: '0.26%' },
      { name: 'M4A4 | Howl', emoji: '🐺', price: 180.00, rarity: 'gold', chance: '0.64%' },
      { name: 'AK-47 | Fire Serpent', emoji: '🐍', price: 95.00, rarity: 'purple', chance: '1.8%' },
      { name: 'AWP | Dragon Lore', emoji: '🐉', price: 890.00, rarity: 'gold', chance: '0.10%' },
      { name: 'Glock-18 | Fade', emoji: '💫', price: 38.00, rarity: 'purple', chance: '3.2%' },
      { name: 'USP-S | Kill Confirmed', emoji: '💀', price: 14.00, rarity: 'blue', chance: '12.0%' },
      { name: 'M4A1-S | Hyper Beast', emoji: '🦁', price: 8.50, rarity: 'blue', chance: '16.8%' },
      { name: 'P250 | See Ya Later', emoji: '🦎', price: 0.80, rarity: 'gray', chance: '65.3%' },
    ]
  },
  {
    id: 'neon-revolution',
    name: 'Neon Revolution',
    desc: 'Vibrant neon skins for all weapons',
    emoji: '⚡',
    price: 1.99,
    badge: 'new',
    items: [
      { name: 'AK-47 | Neon Rider', emoji: '🏍️', price: 28.00, rarity: 'purple', chance: '2.4%' },
      { name: 'M4A4 | Neo-Noir', emoji: '🌃', price: 45.00, rarity: 'purple', chance: '1.6%' },
      { name: 'AWP | Chromatic Aberration', emoji: '🌈', price: 12.00, rarity: 'blue', chance: '10.2%' },
      { name: 'Glock-18 | Vogue', emoji: '💃', price: 6.00, rarity: 'blue', chance: '18.4%' },
      { name: 'AK-47 | Asiimov', emoji: '🤖', price: 3.50, rarity: 'blue', chance: '22.0%' },
      { name: 'P90 | Run and Hide', emoji: '🏃', price: 1.20, rarity: 'gray', chance: '45.4%' },
    ]
  },
  {
    id: 'ancient-ruins',
    name: 'Ancient Ruins',
    desc: 'Discover rare archaeological skins',
    emoji: '🏛️',
    price: 3.49,
    badge: 'hot',
    items: [
      { name: 'Butterfly Knife | Marble Fade', emoji: '🦋', price: 650.00, rarity: 'gold', chance: '0.18%' },
      { name: 'Desert Eagle | Blaze', emoji: '🔥', price: 120.00, rarity: 'gold', chance: '0.52%' },
      { name: 'AK-47 | Hydroponic', emoji: '🌿', price: 55.00, rarity: 'purple', chance: '2.1%' },
      { name: 'M4A1-S | Golden Coil', emoji: '🐍', price: 22.00, rarity: 'purple', chance: '4.8%' },
      { name: 'AWP | Phobos', emoji: '🌌', price: 9.00, rarity: 'blue', chance: '14.2%' },
      { name: 'CZ75-Auto | Tigris', emoji: '🐯', price: 2.00, rarity: 'gray', chance: '78.2%' },
    ]
  },
  {
    id: 'cyber-siege',
    name: 'Cyber Siege',
    desc: 'High-tech futuristic weapon finishes',
    emoji: '🤖',
    price: 2.49,
    badge: null,
    items: [
      { name: 'M4A4 | Cyber Security', emoji: '🔒', price: 75.00, rarity: 'purple', chance: '1.4%' },
      { name: 'AK-47 | Neon Revolution', emoji: '💡', price: 30.00, rarity: 'purple', chance: '3.2%' },
      { name: 'Glock-18 | Bullet Queen', emoji: '👑', price: 16.00, rarity: 'blue', chance: '11.0%' },
      { name: 'UMP-45 | Wild Child', emoji: '🐆', price: 5.00, rarity: 'blue', chance: '20.0%' },
      { name: 'Five-SeveN | Kami', emoji: '⛩️', price: 1.50, rarity: 'gray', chance: '64.4%' },
    ]
  },
  {
    id: 'golden-vault',
    name: 'Golden Vault',
    desc: 'Ultra-rare gold-tier only case',
    emoji: '🏆',
    price: 9.99,
    badge: 'featured',
    items: [
      { name: 'Karambit | Doppler', emoji: '🌊', price: 480.00, rarity: 'gold', chance: '0.8%' },
      { name: 'M9 Bayonet | Crimson Web', emoji: '🕸️', price: 320.00, rarity: 'gold', chance: '1.2%' },
      { name: 'Stiletto Knife | Tiger Tooth', emoji: '🐅', price: 210.00, rarity: 'gold', chance: '2.1%' },
      { name: 'Gut Knife | Autotronic', emoji: '⚙️', price: 145.00, rarity: 'gold', chance: '3.4%' },
      { name: 'AWP | Desert Hydra', emoji: '🐲', price: 98.00, rarity: 'gold', chance: '5.5%' },
      { name: 'AK-47 | Wild Lotus', emoji: '🪷', price: 52.00, rarity: 'purple', chance: '86.0%' },
    ]
  },
  {
    id: 'shadow-case',
    name: 'Shadow Case',
    desc: 'Dark themed military-grade skins',
    emoji: '🌑',
    price: 1.49,
    badge: 'new',
    items: [
      { name: 'Shadow Daggers | Doppler', emoji: '🗡️', price: 85.00, rarity: 'purple', chance: '1.9%' },
      { name: 'AK-47 | Phantom Disruptor', emoji: '👻', price: 18.00, rarity: 'blue', chance: '8.5%' },
      { name: 'M4A1-S | Guardian', emoji: '🛡️', price: 7.00, rarity: 'blue', chance: '16.0%' },
      { name: 'P2000 | Imperial Dragon', emoji: '🐲', price: 2.50, rarity: 'blue', chance: '25.0%' },
      { name: 'MP9 | Bioleak', emoji: '☣️', price: 0.60, rarity: 'gray', chance: '48.6%' },
    ]
  }
];

const RARITIES = {
  gold: { color: '#f0b429', label: 'Legendary' },
  purple: { color: '#a855f7', label: 'Rare' },
  blue: { color: '#4d9fff', label: 'Uncommon' },
  gray: { color: '#6b7280', label: 'Common' }
};

const LIVE_DROPS = [
  { user: 'xXShadowXx', item: 'Karambit | Fade', rarity: 'gold', price: 420 },
  { user: 'ProPlayer99', item: 'AK-47 | Fire Serpent', rarity: 'purple', price: 95 },
  { user: 'TopFragger', item: 'M4A4 | Howl', rarity: 'gold', price: 180 },
  { user: 'CS2King', item: 'AWP | Dragon Lore', rarity: 'gold', price: 890 },
  { user: 'Striker47', item: 'Butterfly Knife | Marble Fade', rarity: 'gold', price: 650 },
  { user: 'NightOwl', item: 'Glock-18 | Fade', rarity: 'purple', price: 38 },
  { user: 'GhostSniper', item: 'Desert Eagle | Blaze', rarity: 'gold', price: 120 },
  { user: 'FragMaster', item: 'M4A4 | Neo-Noir', rarity: 'purple', price: 45 },
  { user: 'TitaniumX', item: 'USP-S | Kill Confirmed', rarity: 'blue', price: 14 },
  { user: 'EliteOps', item: 'AK-47 | Neon Rider', rarity: 'purple', price: 28 },
];

// ---- STATE ----
let balance = 2500.00;
let currentCase = null;
let currentQty = 1;
let inventory = [];
let lastWonItem = null;
let depositAmount = 0;
let isSpinning = false;

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  renderCases(CASES);
  initLiveFeed();
  updateBalance();
});

// ---- BALANCE ----
function updateBalance() {
  document.getElementById('balance').textContent = balance.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// ---- LIVE FEED ----
function initLiveFeed() {
  const feedItems = document.getElementById('feedItems');
  const items = [...LIVE_DROPS, ...LIVE_DROPS]; // duplicate for seamless loop
  items.forEach(drop => {
    const div = document.createElement('div');
    div.className = 'feed-item';
    const rarityColor = RARITIES[drop.rarity]?.color || '#6b7280';
    div.innerHTML = `
      <span class="feed-rarity" style="background:${rarityColor}"></span>
      <strong>${drop.user}</strong> won
      <span style="color:${rarityColor};font-weight:700">${drop.item}</span>
      <span style="color:#22c55e">$${drop.price}</span>
    `;
    feedItems.appendChild(div);
  });
}

// ---- RENDER CASES ----
function renderCases(cases) {
  const grid = document.getElementById('casesGrid');
  grid.innerHTML = '';
  cases.forEach(c => {
    const card = document.createElement('div');
    card.className = 'case-card';
    card.dataset.filter = c.badge || 'all';
    const badgeHtml = c.badge
      ? `<span class="case-badge badge-${c.badge}">${c.badge}</span>` : '';
    card.innerHTML = `
      ${badgeHtml}
      <span class="case-emoji">${c.emoji}</span>
      <div class="case-name">${c.name}</div>
      <div class="case-desc">${c.desc}</div>
      <div class="case-footer">
        <span class="case-price">$${c.price.toFixed(2)}</span>
        <button class="btn-open-case" onclick="openCase('${c.id}')">Open</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ---- FILTER CASES ----
function filterCases(filter, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const filtered = filter === 'all' ? CASES : CASES.filter(c => c.badge === filter);
  renderCases(filtered);
}

// ---- OPEN CASE ----
function openCase(caseId) {
  currentCase = CASES.find(c => c.id === caseId);
  if (!currentCase) return;
  currentQty = 1;
  isSpinning = false;

  document.getElementById('modalCaseName').textContent = currentCase.name;
  updateCostDisplay();
  renderSpinTrack();
  renderPossibleItems();

  document.getElementById('openModal').classList.add('active');
  document.getElementById('openBtn').disabled = false;
}

function closeOpenModal(e) {
  if (e && e.target !== document.getElementById('openModal')) return;
  if (isSpinning) return;
  document.getElementById('openModal').classList.remove('active');
}

function updateCostDisplay() {
  const total = (currentCase.price * currentQty).toFixed(2);
  document.getElementById('openCost').textContent = `$${total}`;
}

function setQty(n) {
  if (isSpinning) return;
  currentQty = n;
  document.querySelectorAll('.qty-btn').forEach((b, i) => {
    b.classList.toggle('active', [1, 2, 3, 5][i] === n);
  });
  updateCostDisplay();
}

// ---- SPIN TRACK ----
function renderSpinTrack() {
  const track = document.getElementById('spinTrack');
  track.style.transition = 'none';
  track.style.transform = 'translateX(0)';
  track.innerHTML = '';

  const totalItems = 60;
  for (let i = 0; i < totalItems; i++) {
    const item = getRandomItem();
    const div = document.createElement('div');
    div.className = `spin-item rarity-${item.rarity}`;
    div.innerHTML = `<span style="font-size:2.5rem">${item.emoji}</span>`;
    track.appendChild(div);
  }
}

function getRandomItem() {
  // weighted random based on chance
  const roll = Math.random() * 100;
  let cumulative = 0;
  for (const item of currentCase.items) {
    const chance = parseFloat(item.chance);
    cumulative += chance;
    if (roll < cumulative) return item;
  }
  return currentCase.items[currentCase.items.length - 1];
}

function renderPossibleItems() {
  const grid = document.getElementById('itemsGrid');
  grid.innerHTML = '';
  const sorted = [...currentCase.items].sort((a, b) => b.price - a.price);
  sorted.forEach(item => {
    const div = document.createElement('div');
    div.className = `item-card rarity-${item.rarity}`;
    div.innerHTML = `
      <span class="item-emoji">${item.emoji}</span>
      <div class="item-name">${item.name}</div>
      <div class="item-price">$${item.price.toFixed(2)}</div>
      <div class="item-chance">${item.chance}</div>
    `;
    grid.appendChild(div);
  });
}

// ---- SPIN CASE ----
function spinCase(demo = false) {
  if (isSpinning) return;
  if (!demo) {
    const cost = currentCase.price * currentQty;
    if (balance < cost) {
      showToast('❌ Insufficient balance!', 'error');
      return;
    }
    balance -= cost;
    updateBalance();
  }

  isSpinning = true;
  document.getElementById('openBtn').disabled = true;

  // Determine winning item
  const winItem = getRandomItem();

  // Build spin track with winner near center
  const track = document.getElementById('spinTrack');
  track.style.transition = 'none';
  track.style.transform = 'translateX(0)';
  track.innerHTML = '';

  const itemWidth = 118; // item width + gap
  const totalItems = 60;
  const winnerIndex = 48; // where the winner appears

  for (let i = 0; i < totalItems; i++) {
    const item = i === winnerIndex ? winItem : getRandomItem();
    const div = document.createElement('div');
    div.className = `spin-item rarity-${item.rarity}`;
    div.innerHTML = `<span style="font-size:2.5rem">${item.emoji}</span>`;
    track.appendChild(div);
  }

  // Container center offset
  const containerWidth = document.querySelector('.spin-container').offsetWidth;
  const centerOffset = containerWidth / 2 - itemWidth / 2;
  const targetX = -(winnerIndex * itemWidth - centerOffset) + (Math.random() * 60 - 30);

  // Animate
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      track.style.transition = 'transform 4s cubic-bezier(0.12, 0.8, 0.25, 1)';
      track.style.transform = `translateX(${targetX}px)`;
    });
  });

  // Show win after animation
  setTimeout(() => {
    isSpinning = false;
    document.getElementById('openModal').classList.remove('active');
    showWin(winItem);
  }, 4200);
}

// ---- WIN MODAL ----
function showWin(item) {
  lastWonItem = item;
  const rarity = RARITIES[item.rarity];
  document.getElementById('winTitle').textContent =
    item.rarity === 'gold' ? '🎉 LEGENDARY WIN!' :
    item.rarity === 'purple' ? '🎊 Rare Win!' : '🎉 You Won!';
  document.getElementById('winItem').innerHTML = `
    <span class="win-item-emoji">${item.emoji}</span>
    <div class="win-item-name">${item.name}</div>
    <div class="win-item-price">$${item.price.toFixed(2)}</div>
    <span class="win-rarity-badge" style="background:${rarity.color};color:${item.rarity === 'gold' ? '#000' : '#fff'}">
      ${rarity.label}
    </span>
  `;
  document.getElementById('sellPrice').textContent = `$${item.price.toFixed(2)}`;
  document.getElementById('winModal').classList.add('active');
}

function closeWinModal(e) {
  if (e && e.target !== document.getElementById('winModal')) return;
  document.getElementById('winModal').classList.remove('active');
}

function sellWin() {
  if (!lastWonItem) return;
  balance += lastWonItem.price;
  updateBalance();
  showToast(`💰 Sold for $${lastWonItem.price.toFixed(2)}!`, 'success');
  document.getElementById('winModal').classList.remove('active');
}

function keepWin() {
  if (!lastWonItem) return;
  inventory.push({ ...lastWonItem });
  renderInventory();
  showToast(`🎒 Added ${lastWonItem.name} to inventory!`, 'success');
  document.getElementById('winModal').classList.remove('active');
}

function openAgain() {
  document.getElementById('winModal').classList.remove('active');
  if (currentCase) openCase(currentCase.id);
}

// ---- INVENTORY ----
function renderInventory() {
  const grid = document.getElementById('inventoryGrid');
  if (inventory.length === 0) {
    grid.innerHTML = `
      <div class="empty-inventory">
        <span>🎒</span><p>Your inventory is empty. Open some cases!</p>
      </div>`;
    document.getElementById('inventoryValue').textContent = '$0.00';
    return;
  }
  const totalValue = inventory.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('inventoryValue').textContent = `$${totalValue.toFixed(2)}`;
  grid.innerHTML = '';
  inventory.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = `inv-item rarity-${item.rarity}`;
    div.innerHTML = `
      <span class="inv-emoji">${item.emoji}</span>
      <div class="inv-name">${item.name}</div>
      <div class="inv-price">$${item.price.toFixed(2)}</div>
    `;
    grid.appendChild(div);
  });
}

function sellAll() {
  if (inventory.length === 0) {
    showToast('🎒 Inventory is empty!', 'error');
    return;
  }
  const total = inventory.reduce((sum, i) => sum + i.price, 0);
  balance += total;
  updateBalance();
  inventory = [];
  renderInventory();
  showToast(`💰 Sold all items for $${total.toFixed(2)}!`, 'success');
}

function withdraw() {
  showToast('📤 Withdrawal requires Steam linked account!', 'error');
}

// ---- DEPOSIT MODAL ----
function showDeposit() {
  depositAmount = 0;
  document.getElementById('depositTotal').textContent = '$0.00';
  document.getElementById('customAmount').value = '';
  document.querySelectorAll('.deposit-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('depositModal').classList.add('active');
}

function closeDeposit(e) {
  if (e && e.target !== document.getElementById('depositModal')) return;
  document.getElementById('depositModal').classList.remove('active');
}

function selectAmount(amount) {
  depositAmount = amount;
  document.querySelectorAll('.deposit-btn').forEach(b => b.classList.remove('selected'));
  event.target.classList.add('selected');
  document.getElementById('customAmount').value = '';
  document.getElementById('depositTotal').textContent = `$${amount.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const customInput = document.getElementById('customAmount');
  if (customInput) {
    customInput.addEventListener('input', () => {
      const val = parseFloat(customInput.value) || 0;
      depositAmount = val;
      document.getElementById('depositTotal').textContent = `$${val.toFixed(2)}`;
      document.querySelectorAll('.deposit-btn').forEach(b => b.classList.remove('selected'));
    });
  }
});

function confirmDeposit() {
  if (depositAmount <= 0) {
    showToast('❌ Please select an amount!', 'error');
    return;
  }
  balance += depositAmount;
  updateBalance();
  showToast(`✅ Deposited $${depositAmount.toFixed(2)} successfully!`, 'success');
  document.getElementById('depositModal').classList.remove('active');
}

// ---- USER MENU ----
function toggleUserMenu() {
  showToast('👤 Account settings coming soon!', 'success');
}

// ---- TOAST ----
function showToast(message, type = 'success') {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast ${type}`;
  void toast.offsetWidth;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}
