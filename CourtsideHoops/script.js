// ========================
//  COURTSIDE HOOPS JS
// ========================

// ---- DATA ----
const cards = [
  { id:1, name:"Michael Jordan", team:"Chicago Bulls", year:"1986", price:28500, category:"Legend", emoji:"", pts:30.1, reb:6.2, ast:5.3, desc:"The greatest of all time. This 1986 Fleer rookie card is one of the most iconic in NBA history, featuring MJ in his signature pose." },
  { id:2, name:"LeBron James", team:"Los Angeles Lakers", year:"2003", price:15800, category:"Rookie", emoji:"", pts:27.2, reb:7.5, ast:7.3, desc:"King James' rookie card from his first season with Cleveland. A cornerstone of any serious collection." },
  { id:3, name:"Stephen Curry", team:"Golden State Warriors", year:"2009", price:9200, category:"Rookie", emoji:"", pts:29.4, reb:5.1, ast:6.3, desc:"Chef Curry's rookie card capturing the beginning of a legendary sharpshooter's career. Revolution personified." },
  { id:4, name:"Kobe Bryant", team:"Los Angeles Lakers", year:"1996", price:22000, category:"Legend", emoji:"", pts:25.0, reb:5.2, ast:4.7, desc:"The Black Mamba's rookie card. Mamba mentality forever encapsulated in this prized collector's item." },
  { id:5, name:"Kevin Durant", team:"Oklahoma City Thunder", year:"2007", price:7600, category:"Rookie", emoji:"", pts:27.3, reb:7.1, ast:4.3, desc:"KD's rookie year card before he became a two-time champion. A must-have for any serious collector." },
  { id:6, name:"Giannis Antetokounmpo", team:"Milwaukee Bucks", year:"2013", price:5400, category:"Rookie", emoji:"", pts:29.9, reb:11.6, ast:5.8, desc:"The Greek Freak's rookie card. An investment that only continues to rise as Giannis cements his legacy." },
  { id:7, name:"Magic Johnson", team:"Los Angeles Lakers", year:"1980", price:18500, category:"Legend", emoji:"", pts:19.5, reb:7.2, ast:11.2, desc:"Showtime's maestro. Magic's 1980 rookie card is a stunning vintage piece from the golden age of the Lakers." },
  { id:8, name:"Larry Bird", team:"Boston Celtics", year:"1980", price:16900, category:"Legend", emoji:"", pts:24.3, reb:10.0, ast:6.3, desc:"Larry Legend's rookie card, part of the iconic 1980 Topps set. A must for any serious vintage collection." },
  { id:9, name:"Luka Dončić", team:"Dallas Mavericks", year:"2018", price:6700, category:"Rookie", emoji:"", pts:28.4, reb:9.1, ast:8.7, desc:"The Slovenian sensation's rookie card. Luka's talent is generational and this card is already a classic." },
  { id:10, name:"Shaquille O'Neal", team:"Orlando Magic", year:"1992", price:4300, category:"Legend", emoji:"", pts:23.7, reb:10.9, ast:2.5, desc:"Shaq's rookie card from his dominant Orlando days. One of the most physically imposing players ever." },
  { id:11, name:"Wilt Chamberlain", team:"Philadelphia Warriors", year:"1961", price:45000, category:"Rare", emoji:"💍", pts:30.1, reb:22.9, ast:4.4, desc:"The rarest and most coveted card in our collection. Wilt's 1961 Fleer rookie is a true museum piece." },
  { id:12, name:"Jayson Tatum", team:"Boston Celtics", year:"2017", price:3800, category:"Rookie", emoji:"", pts:26.9, reb:8.1, ast:4.9, desc:"JT's rookie card from his first season with the Celtics. A future Hall of Famer in the making." },
  { id:13, name:"Nikola Jokic", team:"Denver Nuggets", year:"2015", price:4900, category:"Rookie", emoji:"", pts:26.4, reb:12.4, ast:9.0, desc:"The Joker's rookie card before three MVPs and a championship. One of the most undervalued cards on the market." },
  { id:14, name:"Scottie Pippen", team:"Chicago Bulls", year:"1988", price:7200, category:"Limited", emoji:"", pts:16.1, reb:6.4, ast:5.2, desc:"Pip's rookie card as part of the legendary Bulls dynasty alongside MJ. A limited-print gem." },
  { id:15, name:"Allen Iverson", team:"Philadelphia 76ers", year:"1996", price:8800, category:"Limited", emoji:"", pts:26.7, reb:3.7, ast:6.2, desc:"The Answer's rookie card. Iverson was a cultural icon whose limited-edition cards are highly sought after." },
  { id:16, name:"Dirk Nowitzki", team:"Dallas Mavericks", year:"1998", price:5600, category:"Rare", emoji:"", pts:20.7, reb:7.5, ast:2.4, desc:"The German Wunderkind's rookie card from his first NBA season. A limited-run special foil edition." },
];

// ---- STATE ----
let cart = [];
let currentFilter = 'all';

// ---- NAVIGATION ----
function showPage(pageName) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  document.getElementById('page-' + pageName).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const links = document.querySelectorAll('.nav-links a');
  links.forEach(a => {
    if (a.getAttribute('onclick') && a.getAttribute('onclick').includes("'" + pageName + "'")) {
      a.classList.add('active');
    }
  });

  if (pageName === 'shop') renderShop();
  if (pageName === 'gallery') renderGallery();
}

// ---- RENDER FEATURED (HOME) ----
function renderFeatured() {
  const grid = document.getElementById('featured-grid');
  const featured = cards.filter(c => ['Legend','Rare','Limited'].includes(c.category)).slice(0, 4);
  grid.innerHTML = featured.map(card => cardHTML(card)).join('');
}

// ---- RENDER SHOP ----
function renderShop(list) {
  const grid = document.getElementById('shop-grid');
  const noResults = document.getElementById('no-results');
  const toRender = list !== undefined ? list : cards;
  if (toRender.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'block';
  } else {
    noResults.style.display = 'none';
    grid.innerHTML = toRender.map(card => cardHTML(card)).join('');
  }
}

// ---- CARD HTML ----
function cardHTML(card) {
  const gradients = {
    Legend: 'linear-gradient(145deg,#3f1a1a,#2a1010)',
    Rookie: 'linear-gradient(145deg,#1a2a3f,#101a2a)',
    Rare: 'linear-gradient(145deg,#2a1a3f,#1a102a)',
    Limited: 'linear-gradient(145deg,#3f2a1a,#2a1a10)'
  };
  return `
    <div class="product-card" onclick="openDetail(${card.id})">
      <div class="product-card-img" style="background:${gradients[card.category] || '#1e1e1e'}">
        <span style="font-size:4rem">${card.emoji}</span>
      </div>
      <div class="product-card-body">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div>
            <div class="product-card-name">${card.name}</div>
            <div class="product-card-team">${card.team} • ${card.year}</div>
          </div>
          <span class="product-card-badge badge-${card.category}">${card.category}</span>
        </div>
        <div class="product-card-footer">
          <span class="product-card-price">₱${card.price.toLocaleString()}</span>
        </div>
        <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${card.id})">+ Add to Cart</button>
      </div>
    </div>
  `;
}

// ---- FILTERS ----
function applyFilters() {
  const cat = document.querySelector('input[name="cat"]:checked')?.value || 'all';
  const price = document.querySelector('input[name="price"]:checked')?.value || 'all';
  const sort = document.getElementById('sort-select')?.value || 'default';
  const search = document.getElementById('search-input')?.value.toLowerCase() || '';

  let filtered = [...cards];

  if (cat !== 'all') filtered = filtered.filter(c => c.category === cat);
  if (price === 'low') filtered = filtered.filter(c => c.price < 1000);
  if (price === 'mid') filtered = filtered.filter(c => c.price >= 1000 && c.price <= 5000);
  if (price === 'high') filtered = filtered.filter(c => c.price > 5000);
  if (search) filtered = filtered.filter(c =>
    c.name.toLowerCase().includes(search) ||
    c.team.toLowerCase().includes(search) ||
    c.category.toLowerCase().includes(search)
  );

  if (sort === 'price-asc') filtered.sort((a,b) => a.price - b.price);
  if (sort === 'price-desc') filtered.sort((a,b) => b.price - a.price);
  if (sort === 'name') filtered.sort((a,b) => a.name.localeCompare(b.name));

  renderShop(filtered);
}

function resetFilters() {
  document.querySelectorAll('input[name="cat"]')[0].checked = true;
  document.querySelectorAll('input[name="price"]')[0].checked = true;
  document.getElementById('sort-select').value = 'default';
  document.getElementById('search-input').value = '';
  renderShop();
}

function filterAndShow(cat) {
  showPage('shop');
  setTimeout(() => {
    const radio = document.querySelector(`input[name="cat"][value="${cat}"]`);
    if (radio) { radio.checked = true; applyFilters(); }
  }, 100);
}

// ---- GALLERY ----
function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  const items = [...cards].sort(() => Math.random() - 0.5);
  grid.innerHTML = items.map(card => `
    <div class="gallery-item" onclick="openDetail(${card.id})">
      <div class="gallery-item-inner" style="background:linear-gradient(145deg,#1e1e1e,#2a2a2a)">
        <span>${card.emoji}</span>
      </div>
      <div class="gallery-overlay">
        <h4>${card.name}</h4>
        <p>${card.team} • ${card.year} • <span class="product-card-price" style="font-size:.85rem;font-family:'Bebas Neue',cursive">₱${card.price.toLocaleString()}</span></p>
      </div>
    </div>
  `).join('');
}

// ---- DETAIL MODAL ----
function openDetail(id) {
  const card = cards.find(c => c.id === id);
  if (!card) return;
  const badgeColors = { Rookie:'#60a5fa', Legend:'#fbbf24', Rare:'#c084fc', Limited:'#f87171' };
  document.getElementById('detail-content').innerHTML = `
    <div style="text-align:center;font-size:6rem;margin-bottom:1rem">${card.emoji}</div>
    <div class="detail-header">
      <span class="detail-tag badge-${card.category}" style="background:rgba(0,0,0,0.3);color:${badgeColors[card.category]};border:1px solid ${badgeColors[card.category]}40">${card.category}</span>
      <div class="detail-name">${card.name}</div>
      <div class="detail-team">${card.team} · Issued ${card.year}</div>
      <div class="detail-price">₱${card.price.toLocaleString()}</div>
    </div>
    <div class="detail-stats">
      <div class="detail-stat"><div class="detail-stat-val">${card.pts}</div><div class="detail-stat-label">PPG</div></div>
      <div class="detail-stat"><div class="detail-stat-val">${card.reb}</div><div class="detail-stat-label">RPG</div></div>
      <div class="detail-stat"><div class="detail-stat-val">${card.ast}</div><div class="detail-stat-label">APG</div></div>
    </div>
    <p class="detail-desc">${card.desc}</p>
    <div class="detail-actions">
      <button class="btn-primary" style="flex:1" onclick="addToCart(${card.id}); closeModal('detail-modal')">+ Add to Cart</button>
      <button class="btn-outline" onclick="closeModal('detail-modal')">Back</button>
    </div>
  `;
  openModal('detail-modal');
}

// ---- CART ----
function addToCart(id) {
  const card = cards.find(c => c.id === id);
  if (!card) return;
  cart.push(card);
  updateCartCount();
  showToast('Added to cart!');
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  renderCartItems();
}

function updateCartCount() {
  document.getElementById('cart-count').textContent = cart.length;
}

function renderCartItems() {
  const container = document.getElementById('cart-items');
  if (cart.length === 0) {
    container.innerHTML = '<div class="cart-empty">Your cart is empty 🏀</div>';
    document.getElementById('cart-total').textContent = '₱0';
    return;
  }
  container.innerHTML = cart.map((c, i) => `
    <div class="cart-item">
      <div>
        <div class="cart-item-name">${c.emoji} ${c.name}</div>
        <div style="font-size:.75rem;color:#888">${c.year} · ${c.category}</div>
      </div>
      <div style="display:flex;gap:.75rem;align-items:center">
        <span class="cart-item-price">₱${c.price.toLocaleString()}</span>
        <button class="cart-item-remove" onclick="removeFromCart(${i})">✕</button>
      </div>
    </div>
  `).join('');
  const total = cart.reduce((sum, c) => sum + c.price, 0);
  document.getElementById('cart-total').textContent = '₱' + total.toLocaleString();
}

// ---- MODALS ----
function openCart() {
  renderCartItems();
  openModal('cart-modal');
}

function openLogin() {
  openModal('login-modal');
}

function openModal(id) {
  document.getElementById(id).classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

// ---- TOAST ----
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ---- FAQ ----
function toggleFAQ(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = answer.classList.contains('open');
  document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-q span').forEach(s => s.textContent = '+');
  if (!isOpen) {
    answer.classList.add('open');
    btn.querySelector('span').textContent = '−';
  }
}

// ---- INIT ----
window.addEventListener('DOMContentLoaded', () => {
  renderFeatured();
  renderShop();
});
