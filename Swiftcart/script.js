const categories = [
  { id: 'Electronics', icon: '', name: 'Electronics', count: 4 },
  { id: 'Fashion',     icon: '', name: 'Fashion',     count: 5 },
  { id: 'Home',        icon: '', name: 'Home & Living', count: 4 },
  { id: 'Sports',      icon: '', name: 'Sports',      count: 3 },
  { id: 'Beauty',      icon: '', name: 'Beauty',      count: 3 },
  { id: 'Food',        icon: '', name: 'Food & Drinks', count: 3 },
];

const products = [
  { id:1,  name:'Wireless Headphones Pro', cat:'Electronics', price:2999, desc:'Premium noise-cancelling over-ear headphones with 40hr battery.', badge:'Bestseller', image:'https://i.pinimg.com/736x/4e/a5/c8/4ea5c8c480625906a692bafa65ba7aad.jpg'},
  { id:2,  name:'Smart Watch Series X',    cat:'Electronics', price:5499, desc:'AMOLED display, health tracking, GPS. 7-day battery life.',         badge:'New',       image: 'https://i.pinimg.com/736x/93/f4/85/93f48511615b3612962658043e50a0e0.jpg' },
  { id:3,  name:'Portable Speaker 360',    cat:'Electronics', price:1799, desc:'360° sound with deep bass. IP67 waterproof & dustproof.',           badge:null,        image: 'https://i.pinimg.com/1200x/ac/23/7f/ac237f901f52afd369df2ce53a7ed64e.jpg' },
  { id:4,  name:'USB-C Hub Pro 7-in-1',    cat:'Electronics', price:999,  desc:'HDMI 4K, USB 3.0, SD card, PD charging in one sleek hub.',         badge:'Sale',      image: 'https://i.pinimg.com/1200x/43/e3/dc/43e3dcc5264a9ce3a65fcf2ee26f2610.jpg' },
  { id:5,  name:'Classic Denim Jacket',    cat:'Fashion', price:1299, desc:'Washed denim, relaxed fit. A wardrobe essential for any season.',     badge:null,        image: 'https://i.pinimg.com/1200x/14/41/08/144108b2fc879e287f667a75d01c089b.jpg' },
  { id:6,  name:'Minimalist Sneakers',     cat:'Fashion', price:2499, desc:'Clean white leather with cushioned insole. All-day comfort.',         badge:'Trending',  image: 'https://i.pinimg.com/1200x/76/53/65/765365f54a8b767d174c8755cc2882b1.jpg' },
  { id:7,  name:'Floral Summer Dress',     cat:'Fashion', price:899,  desc:'Lightweight chiffon with flattering wrap silhouette.',               badge:null,        image: 'https://i.pinimg.com/736x/95/34/5a/95345a6b2966d35131ec1f046769ff88.jpg' },
  { id:8,  name:'Leather Tote Bag',        cat:'Fashion', price:1699, desc:'Genuine leather with interior pockets. Work to weekend.',            badge:'New',       image: 'https://i.pinimg.com/736x/95/a8/9b/95a89bcebb1a1c633253532b1768d4a2.jpg' },
  { id:9,  name:'Slim Fit Chinos',         cat:'Fashion', price:1099, desc:'Stretch fabric, 4 colors. Smart casual for every occasion.',         badge:null,        image: 'https://i.pinimg.com/1200x/a9/68/d2/a968d2a203cb0e271d8a9ab7adb10501.jpg' },
  { id:10, name:'Aromatherapy Diffuser',   cat:'Home', price:649,  desc:'Ultrasonic mist with 7-color LED mood lighting. Whisper-quiet.',     badge:null,   image: 'https://i.pinimg.com/1200x/31/b3/45/31b345a7039a2fa331a8583ea5339956.jpg' },
  { id:11, name:'Bamboo Cutting Board',    cat:'Home', price:449,  desc:'Eco-friendly antibacterial bamboo. Non-slip feet. Juice groove.',    badge:null,   image: 'https://i.pinimg.com/1200x/da/2e/b7/da2eb7529bf843772e71cfab09ff355b.jpg' },
  { id:12, name:'Smart LED Strip 5m',      cat:'Home', price:799,  desc:'App-controlled RGB, voice compatible. Cut-to-size flexibility.',     badge:'New',  image: 'https://i.pinimg.com/1200x/f3/6a/dc/f36adc1016c729135558fc3158ef8486.jpg' },
  { id:13, name:'Linen Throw Blanket',     cat:'Home', price:1199, desc:'100% stonewashed linen. Breathable, cozy, and machine-washable.',    badge:null,   image: 'https://i.pinimg.com/1200x/56/51/cd/5651cdffb941d879f117354fa616b872.jpg' },
  { id:14, name:'Yoga Mat Premium',        cat:'Sports', price:999, desc:'Non-slip 6mm thick TPE. Carry strap included. Eco-friendly.',       badge:null,          image: 'https://i.pinimg.com/1200x/d7/e3/73/d7e3736121e7c00060dd2125421511dc.jpg' },
  { id:15, name:'Resistance Band Set',     cat:'Sports', price:549, desc:'5-level set from 10–50lbs. Ideal for home gym & rehab.',            badge:'Bestseller',  image: 'https://i.pinimg.com/1200x/25/f3/67/25f36701d542c0a7ff261cc33f80e55b.jpg' },
  { id:16, name:'Insulated Water Bottle',  cat:'Sports', price:699, desc:'32oz double-wall stainless. Keeps cold 24hr, hot 12hr.',            badge:null,          image: 'https://i.pinimg.com/1200x/57/82/9e/57829e29a74fc50884a93864adab2792.jpg' },
  { id:17, name:'Vitamin C Serum',         cat:'Beauty', price:849, desc:'20% L-Ascorbic acid with Hyaluronic Acid. Brightens & firms.',     badge:'Trending', image: 'https://i.pinimg.com/1200x/b0/cc/59/b0cc5937e0edaccefaf66a6fccb482c0.jpg' },
  { id:18, name:'Jade Facial Roller',      cat:'Beauty', price:499, desc:'Real jade stone. Reduces puffiness and boosts circulation.',       badge:null,       image: 'https://i.pinimg.com/1200x/97/3a/f8/973af8192506e83272a688a6c3e04dab.jpg' },
  { id:19, name:'Matte Lip Kit',           cat:'Beauty', price:699, desc:'12-hour wear lip liner + liquid lipstick duo in 6 shades.',        badge:null,       image: 'https://i.pinimg.com/736x/cd/74/b3/cd74b38c582d80e165f47c15681ca9b6.jpg' },
  { id:20, name:'Cold Brew Coffee Kit',    cat:'Food', price:799, desc:'Glass jar + filter + beans. Make café-quality cold brew at home.',  badge:'New', image: 'https://i.pinimg.com/736x/36/69/76/366976fa3ef1ffd53ee465b47ff8fa9a.jpg' },
  { id:21, name:'Protein Granola Mix',     cat:'Food', price:449, desc:'25g protein per 100g. Oats, nuts, seeds. No added sugar.',          badge:null,  image: 'https://i.pinimg.com/1200x/55/bc/ea/55bceaf057c2bef540d80829260f8c07.jpg' },
  { id:22, name:'Matcha Premium Grade',    cat:'Food', price:649, desc:'Ceremonial-grade Japanese matcha. 30g resealable pouch.',           badge:null,  image: 'https://i.pinimg.com/736x/db/27/c8/db27c8ac3768b2d2f230534357ccb96e.jpg' },
];

let cart = [];
let activeCategory = 'All';
let cartOpen = false;

function buildProductImage(p) {
  if (p.image) {
    return `<img class="product-img" src="${p.image}" alt="${p.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
            <div class="product-img-placeholder" style="display:none;">
              <span style="font-size:52px">${p.icon}</span>
              <span class="placeholder-label">Image not found</span>
            </div>`;
  }
  return `<div class="product-img-placeholder">
            <span style="font-size:52px">${p.icon}</span>
            <span class="placeholder-label">Your photo here</span>
          </div>`;
}

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
  const filtered = products.filter(p => {
    const matchCat = activeCategory === 'All' || p.cat === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search) || p.desc.toLowerCase().includes(search);
    return matchCat && matchSearch;
  });

  document.getElementById('products-title').innerHTML = activeCategory === 'All'
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
        ${buildProductImage(p)}
        ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
      </div>
      <div class="product-body">
        <div class="product-category">${p.cat}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-footer">
          <div class="product-price"><span class="currency">&#8369;</span>${p.price.toLocaleString()}</div>
          <button class="add-to-cart ${inCart ? 'added' : ''}" id="btn-${p.id}" onclick="addToCart(${p.id}, event)">
            ${inCart ? '&#10003; Added' : '+ Add'}
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
}

function updateCartUI() {
  const total = cart.reduce((s, c) => s + c.qty, 0);
  document.getElementById('cart-count').textContent = total;
  const totalPrice = cart.reduce((s, c) => s + c.price * c.qty, 0);
  document.getElementById('cart-total').textContent = `\u20B1${totalPrice.toLocaleString()}`;
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
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">&#8722;</button>
          <span class="qty-display">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <div class="cart-item-price">\u20B1${(item.price * item.qty).toLocaleString()}</div>
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
