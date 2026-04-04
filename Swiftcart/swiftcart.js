const categories = [
  { id: 'Electronics', icon: '💻', name: 'Electronics', count: 4 },
  { id: 'Fashion', icon: '👗', name: 'Fashion', count: 5 },
  { id: 'Home', icon: '🏠', name: 'Home & Living', count: 4 },
  { id: 'Sports', icon: '⚽', name: 'Sports', count: 3 },
  { id: 'Beauty', icon: '💄', name: 'Beauty', count: 3 },
  { id: 'Food', icon: '🍱', name: 'Food & Drinks', count: 3 },
];

const products = [
  { id:1, name:'Wireless Headphones Pro', cat:'Electronics', price:2999, desc:'Premium noise-cancelling over-ear headphones with 40hr battery.', icon:'🎧', badge:'Bestseller' },
  { id:2, name:'Smart Watch Series X', cat:'Electronics', price:5499, desc:'AMOLED display, health tracking, GPS. 7-day battery life.', icon:'⌚', badge:'New' },
  { id:3, name:'Portable Speaker 360', cat:'Electronics', price:1799, desc:'360° sound with deep bass. IP67 waterproof & dustproof.', icon:'🔊', badge:null },
  { id:4, name:'USB-C Hub Pro 7-in-1', cat:'Electronics', price:999, desc:'HDMI 4K, USB 3.0, SD card, PD charging in one sleek hub.', icon:'🔌', badge:'Sale' },
  { id:5, name:'Classic Denim Jacket', cat:'Fashion', price:1299, desc:'Washed denim, relaxed fit. A wardrobe essential for any season.', icon:'🧥', badge:null },
  { id:6, name:'Minimalist Sneakers', cat:'Fashion', price:2499, desc:'Clean white leather with cushioned insole. All-day comfort.', icon:'👟', badge:'Trending' },
  { id:7, name:'Floral Summer Dress', cat:'Fashion', price:899, desc:'Lightweight chiffon with flattering wrap silhouette.', icon:'👗', badge:null },
  { id:8, name:'Leather Tote Bag', cat:'Fashion', price:1699, desc:'Genuine leather with interior pockets. Work to weekend.', icon:'👜', badge:'New' },
  { id:9, name:'Slim Fit Chinos', cat:'Fashion', price:1099, desc:'Stretch fabric, 4 colors. Smart casual for every occasion.', icon:'👖', badge:null },
  { id:10, name:'Aromatherapy Diffuser', cat:'Home', price:649, desc:'Ultrasonic mist with 7-color LED mood lighting. Whisper-quiet.', icon:'🕯️', badge:null },
  { id:11, name:'Bamboo Cutting Board', cat:'Home', price:449, desc:'Eco-friendly antibacterial bamboo. Non-slip feet. Juice groove.', icon:'🪵', badge:null },
  { id:12, name:'Smart LED Strip 5m', cat:'Home', price:799, desc:'App-controlled RGB, voice compatible. Cut-to-size flexibility.', icon:'💡', badge:'New' },
  { id:13, name:'Linen Throw Blanket', cat:'Home', price:1199, desc:'100% stonewashed linen. Breathable, cozy, and machine-washable.', icon:'🛏️', badge:null },
  { id:14, name:'Yoga Mat Premium', cat:'Sports', price:999, desc:'Non-slip 6mm thick TPE. Carry strap included. Eco-friendly.', icon:'🧘', badge:null },
  { id:15, name:'Resistance Band Set', cat:'Sports', price:549, desc:'5-level set from 10–50lbs. Ideal for home gym & rehab.', icon:'💪', badge:'Bestseller' },
  { id:16, name:'Insulated Water Bottle', cat:'Sports', price:699, desc:'32oz double-wall stainless. Keeps cold 24hr, hot 12hr.', icon:'🚰', badge:null },
  { id:17, name:'Vitamin C Serum', cat:'Beauty', price:849, desc:'20% L-Ascorbic acid with Hyaluronic Acid. Brightens & firms.', icon:'✨', badge:'Trending' },
  { id:18, name:'Jade Facial Roller', cat:'Beauty', price:499, desc:'Real jade stone. Reduces puffiness and boosts circulation.', icon:'🌿', badge:null },
  { id:19, name:'Matte Lip Kit', cat:'Beauty', price:699, desc:'12-hour wear lip liner + liquid lipstick duo in 6 shades.', icon:'💋', badge:null },
  { id:20, name:'Cold Brew Coffee Kit', cat:'Food', price:799, desc:'Glass jar + filter + beans. Make café-quality cold brew at home.', icon:'☕', badge:'New' },
  { id:21, name:'Protein Granola Mix', cat:'Food', price:449, desc:'25g protein per 100g. Oats, nuts, seeds. No added sugar.', icon:'🥣', badge:null },
  { id:22, name:'Matcha Premium Grade', cat:'Food', price:649, desc:'Ceremonial-grade Japanese matcha. 30g resealable pouch.', icon:'🍵', badge:null },
];

let cart = [];
let activeCategory = 'All';
let activeSort = 'all';
let cartOpen = false;

function doLogin() {
  sessionStorage.setItem('sc_loggedIn', '1');
  document.getElementById('page-login').classList.remove('active');
  document.getElementById('page-login').style.display = 'none';
  const app = document.getElementById('page-app');
  app.style.display = 'flex';
  app.classList.add('active');
  renderCategories();
  renderProducts();
}

function logout() {
  sessionStorage.removeItem('sc_loggedIn');
  document.getElementById('page-login').style.display = 'flex';
  document.getElementById('page-login').classList.add('active');
  document.getElementById('page-app').style.display = 'none';
  document.getElementById('page-app').classList.remove('active');
}

function renderCategories() {
  const grid = document.getElementById('cats-grid');
  grid.innerHTML = '';
  categories.forEach(cat => {
    const div = document.createElement('div');
    div.className = 'cat-card' + (activeCategory === cat.id ? ' active' : '');
    div.innerHTML = `
      <span class="cat-icon">${cat.icon}</span>
      <span class="cat-name">${cat.name}</span>
      <span class="cat-count">${cat.count} items</span>
    `;
    div.onclick = () => selectCat(cat.id);
    grid.appendChild(div);
  });
}

function selectCat(id) {
  activeCategory = id;
  renderCategories();
  renderProducts();
}

function renderProducts() {
  const search = (document.getElementById('search-input')?.value || '').toLowerCase();
  let filtered = products.filter(p => {
    const matchCat = activeCategory === 'All' || p.cat === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search) || p.desc.toLowerCase().includes(search);
    return matchCat && matchSearch;
  });

  const title = document.getElementById('products-title');
  title.innerHTML = activeCategory === 'All'
    ? 'ALL <span>PRODUCTS</span>'
    : `${activeCategory.toUpperCase()} <span>PICKS</span>`;

  const grid = document.getElementById('products-grid');
  grid.innerHTML = '';

  if (!filtered.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--muted);">
      <div style="font-size:40px;margin-bottom:12px;">🔍</div>
      <p>No products found. Try a different search.</p>
    </div>`;
    return;
  }

  filtered.forEach((p, i) => {
    const inCart = cart.find(c => c.id === p.id);
    const div = document.createElement('div');
    div.className = 'product-card';
    div.style.animationDelay = `${i * 0.05}s`;
    div.innerHTML = `
      <div class="product-img-wrap">
        <div class="product-img-placeholder">
          <span style="font-size:52px">${p.icon}</span>
          <span class="placeholder-label">Your photo here</span>
        </div>
        ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
      </div>
      <div class="product-body">
        <div class="product-category">${p.cat}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-footer">
          <div class="product-price"><span class="currency">₱</span>${p.price.toLocaleString()}</div>
          <button class="add-to-cart ${inCart ? 'added' : ''}" id="btn-${p.id}" onclick="addToCart(${p.id}, event)">
            ${inCart ? '✓ Added' : '+ Add'}
          </button>
        </div>
      </div>
    `;
    grid.appendChild(div);
  });
}

function filterProducts() { renderProducts(); }

function addToCart(id, e) {
  e.stopPropagation();
  const product = products.find(p => p.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartUI();
  renderProducts();
  showToast(`${product.icon} ${product.name} added to cart!`);
  const btn = document.getElementById(`btn-${id}`);
  if (btn) { btn.classList.add('added'); btn.textContent = '✓ Added'; }
}

function updateCartUI() {
  const total = cart.reduce((s, c) => s + c.qty, 0);
  document.getElementById('cart-count').textContent = total;
  const totalPrice = cart.reduce((s, c) => s + c.price * c.qty, 0);
  document.getElementById('cart-total').textContent = `₱${totalPrice.toLocaleString()}`;
  renderCartItems();
}

function renderCartItems() {
  const container = document.getElementById('cart-items');
  if (!cart.length) {
    container.innerHTML = `<div class="cart-empty">
      <div class="empty-icon">🛒</div>
      <p>Your cart is empty.<br>Start adding some products!</p>
    </div>`;
    return;
  }
  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-icon">${item.icon}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-cat">${item.cat}</div>
        <div class="cart-item-actions">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="qty-display">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <div class="cart-item-price">₱${(item.price * item.qty).toLocaleString()}</div>
    </div>
  `).join('');
}

function changeQty(id, delta) {
  const idx = cart.findIndex(c => c.id === id);
  if (idx === -1) return;
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  updateCartUI();
  renderProducts();
}

function toggleCart() {
  cartOpen = !cartOpen;
  document.getElementById('cart-panel').classList.toggle('open', cartOpen);
  document.getElementById('cart-overlay').classList.toggle('open', cartOpen);
  if (cartOpen) renderCartItems();
}

function checkout() {
  if (!cart.length) { showToast('🛒 Cart is empty!'); return; }
  cart = [];
  updateCartUI();
  toggleCart();
  showToast('🎉 Order placed! Thank you for shopping at SwiftCart!');
  renderProducts();
}

function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

updateCartUI();

if (sessionStorage.getItem('sc_loggedIn') === '1') {
  doLogin();
}
