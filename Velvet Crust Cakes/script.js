

const PRODUCTS = [
  { id: 1, name: "Strawberry Bliss", price: 42, category: "Birthday", desc: "Fresh strawberries, vanilla sponge, rose cream frosting", stars: 5, badge: "Best Seller", img:"https://i.pinimg.com/736x/97/f0/88/97f0883dba59d4b5ca08805d425ec4ea.jpg"},
  { id: 2, name: "Velvet Dream", price: 58, category: "Wedding", desc: "Red velvet layers with cream cheese and rose petal garnish", stars: 5, badge: "Trending", img: "https://i.pinimg.com/736x/6a/8d/cf/6a8dcf8dba2b9f45a833b13089e02bd6.jpg"  },
  { id: 3, name: "Honey & Peach", price: 36, category: "Custom", desc: "Golden honey cake with peach compote and chantilly cream", stars: 4, badge: null, img: "https://i.pinimg.com/736x/f5/b1/c0/f5b1c0132d022e3f0b3181af8a1f3baa.jpg"  },
  { id: 4, name: "Dark Truffle", price: 64, category: "Birthday", desc: "Rich dark chocolate ganache, hazelnut praline layers", stars: 5, badge: "Premium", img: "https://i.pinimg.com/736x/7a/05/f9/7a05f9a77f577bcb27040d237e6d7424.jpg"  },
  { id: 5, name: "Lemon Blossom", price: 38, category: "Custom", desc: "Zesty lemon curd, elderflower sponge, candied lemon", stars: 4, badge: null, img: "https://i.pinimg.com/736x/e5/56/1f/e5561ff14013d4f2fb93a7422f32c002.jpg"  },
  { id: 6, name: "Royal Rose", price: 75, category: "Wedding", desc: "Multi-tiered almond sponge with rosewater buttercream", stars: 5, badge: "New", img: "https://i.pinimg.com/1200x/a6/0d/9d/a60d9d779031515fee0863b4d3c01032.jpg"  },
  { id: 7, name: "Mango Tango", price: 44, category: "Birthday", desc: "Mango mousse, coconut sponge, tropical glaze", stars: 4, badge: null, img: "https://i.pinimg.com/1200x/6a/c3/51/6ac3519894e975a0a1b1ddc8d5bd2c1b.jpg"  },
  { id: 8, name: "Classic Vanilla", price: 32, category: "Custom", desc: "Light vanilla génoise, Swiss meringue buttercream", stars: 4, badge: null, img: "https://i.pinimg.com/736x/17/b7/d0/17b7d025809188ee2bcf28e1002503d3.jpg" },
];

const CAROUSEL_IMAGES = ["https://i.pinimg.com/736x/f1/0a/89/f10a8907d2ceb950c49d884c340a3e8a.jpg", "https://i.pinimg.com/736x/f3/36/68/f336684ba877722c68cac7a8a4867dca.jpg", "https://i.pinimg.com/736x/2e/5a/70/2e5a703852a993cd435af4c7f26ae1d3.jpg"];
let carouselIndex = 0;
let carouselTimer = null;


let cart = JSON.parse(localStorage.getItem("vc_cart") || "[]");

function saveCart() {
  localStorage.setItem("vc_cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll(".cart-count").forEach(el => {
    el.textContent = total;
  });
}


function showToast(msg, icon = "🎂") {
  let toast = document.getElementById("vc-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "vc-toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${msg}</span>`;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}


function buildProductCard(product, showFullDesc = false) {
  const starsHtml = "★".repeat(product.stars) + "☆".repeat(5 - product.stars);
  const badgeHtml = product.badge
    ? `<div class="product-badge">${product.badge}</div>` : "";
  const desc = showFullDesc ? product.desc : (product.desc.length > 60 ? product.desc.slice(0, 60) + "…" : product.desc);

  const card = document.createElement("div");
  card.className = "product-card";
  card.dataset.category = product.category;
  card.innerHTML = `
    <div class="product-img-wrap">
      ${badgeHtml}
      <img
        src="${product.img}"
        alt="${product.name}"
        style="width:100%; height:220px; object-fit:cover; border-radius:16px 16px 0 0; display:block;"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
      >
      <div class="product-img-placeholder" style="display:none; height:220px; align-items:center; justify-content:center; font-size:60px; background:var(--pink-light); border-radius:16px 16px 0 0;">
        🎂
      </div>
      <button class="product-wishlist" title="Wishlist" aria-label="Add to wishlist">🤍</button>
    </div>
    <div class="product-info">
      <div class="product-stars">${starsHtml} <span>(${20 + product.id * 7})</span></div>
      <div class="product-name">${product.name}</div>
      <div class="product-desc">${desc}</div>
      <div class="product-footer">
        <div class="product-price">$${product.price} <span>/ cake</span></div>
        <button class="product-add-btn" data-id="${product.id}" aria-label="Add to cart">+</button>
      </div>
    </div>
  `;

  const wishBtn = card.querySelector(".product-wishlist");
  wishBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    wishBtn.textContent = wishBtn.textContent === "🤍" ? "🩷" : "🤍";
    showToast(wishBtn.textContent === "🩷" ? "Added to wishlist!" : "Removed from wishlist", wishBtn.textContent);
  });

  const addBtn = card.querySelector(".product-add-btn");
  addBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openModal(product);
  });

  return card;
}


let pendingProduct = null;

function openModal(product) {
  pendingProduct = product;
  const overlay = document.getElementById("cart-modal");
  if (!overlay) return;
  document.getElementById("modal-title").textContent = `Add to Cart`;
  document.getElementById("modal-msg").textContent = `Add "${product.name}" ($${product.price}) to your cart?`;
  document.getElementById("item-qty").value = 1;
  overlay.classList.add("active");
}

function closeModal() {
  const overlay = document.getElementById("cart-modal");
  if (overlay) overlay.classList.remove("active");
  pendingProduct = null;
}

function setupModal() {
  const overlay = document.getElementById("cart-modal");
  if (!overlay) return;

  document.getElementById("modal-yes")?.addEventListener("click", () => {
    if (!pendingProduct) return;
    const qty = parseInt(document.getElementById("item-qty").value) || 1;
    const existing = cart.find(i => i.id === pendingProduct.id);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ ...pendingProduct, qty });
    }
    saveCart();
    showToast(`${pendingProduct.name} added to cart! 🛒`);
    closeModal();
  });

  document.getElementById("modal-no")?.addEventListener("click", closeModal);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
}


function setupCarousel() {
  const img = document.getElementById("carousel-img");
  const dots = document.querySelectorAll(".carousel-dot");
  if (!img) return;

  function goTo(idx) {
    carouselIndex = (idx + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length;
    img.style.opacity = "0";
    setTimeout(() => {
      img.src = CAROUSEL_IMAGES[carouselIndex];
      img.style.opacity = "1";
    }, 300);
    dots.forEach((d, i) => d.classList.toggle("active", i === carouselIndex));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      clearInterval(carouselTimer);
      goTo(i);
      carouselTimer = setInterval(() => goTo(carouselIndex + 1), 4000);
    });
  });

  carouselTimer = setInterval(() => goTo(carouselIndex + 1), 4000);
}


function renderTrending() {
  const grid = document.getElementById("trending-grid");
  if (!grid) return;
  const trending = PRODUCTS.filter(p => p.badge).slice(0, 4);
  trending.forEach(p => grid.appendChild(buildProductCard(p)));
}


function renderShop(filterCategory = "All") {
  const grid = document.getElementById("full-grid");
  if (!grid) return;
  grid.innerHTML = "";
  const filtered = filterCategory === "All"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === filterCategory);
  filtered.forEach(p => grid.appendChild(buildProductCard(p, true)));
}

function setupShopFilters() {
  const btns = document.querySelectorAll(".filter-btn");
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderShop(btn.dataset.filter);
    });
  });
}


function renderCart() {
  const tbody = document.getElementById("cart-items");
  const totalEl = document.getElementById("total-price");
  const subtotalEl = document.getElementById("subtotal-price");
  const emptyEl = document.getElementById("cart-empty");
  const tableWrap = document.getElementById("cart-table-wrap");
  const summaryCard = document.getElementById("cart-summary-card");

  if (!tbody) return;

  tbody.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    if (emptyEl) emptyEl.style.display = "block";
    if (tableWrap) tableWrap.style.display = "none";
    if (summaryCard) summaryCard.style.display = "none";
    return;
  }

  if (emptyEl) emptyEl.style.display = "none";
  if (tableWrap) tableWrap.style.display = "block";
  if (summaryCard) summaryCard.style.display = "block";

  cart.forEach((item, idx) => {
    const sub = item.price * item.qty;
    total += sub;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <div class="cart-item-info">
          <div style="width:56px;height:56px;border-radius:12px;background:var(--pink-light);display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0">${item.img}</div>
          <div class="cart-item-name">${item.name}</div>
        </div>
      </td>
      <td>
        <input type="number" value="${item.qty}" min="1" max="20"
          style="width:60px;padding:6px;border:1.5px solid var(--pink-blush);border-radius:8px;font-family:DM Sans,sans-serif;font-size:14px;text-align:center;outline:none;color:var(--text-dark)"
          data-idx="${idx}">
      </td>
      <td><strong>$${sub.toFixed(2)}</strong></td>
      <td>
        <button class="cart-item-remove" data-idx="${idx}" aria-label="Remove item">✕</button>
      </td>
    `;

    tr.querySelector("input").addEventListener("change", (e) => {
      const val = parseInt(e.target.value);
      if (val >= 1) {
        cart[idx].qty = val;
        saveCart();
        renderCart();
      }
    });

    tr.querySelector(".cart-item-remove").addEventListener("click", () => {
      cart.splice(idx, 1);
      saveCart();
      renderCart();
      showToast("Item removed from cart", "🗑️");
    });

    tbody.appendChild(tr);
  });

  if (totalEl) totalEl.textContent = total.toFixed(2);
  if (subtotalEl) subtotalEl.textContent = total.toFixed(2);
}


function setupDeliveryPicker() {
  const dateInput = document.getElementById("delivery-date");
  const timeSelect = document.getElementById("delivery-time");
  const confirmBtn = document.getElementById("delivery-confirm");
  const msgEl = document.getElementById("delivery-msg");

  if (!dateInput || !confirmBtn) return;


  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  dateInput.min = tomorrow.toISOString().split("T")[0];

  confirmBtn.addEventListener("click", () => {
    const date = dateInput.value;
    const time = timeSelect?.value;
    if (!date) {
      showToast("Please select a delivery date", "📅");
      return;
    }
    const d = new Date(date);
    const formatted = d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
    const timeLabel = time ? ` at ${time}` : "";

    if (msgEl) {
      msgEl.innerHTML = `✅ <strong>Delivery scheduled!</strong> Your order will arrive on <strong>${formatted}${timeLabel}</strong>.`;
      msgEl.style.display = "block";
    }

    localStorage.setItem("vc_delivery", JSON.stringify({ date, time }));
    showToast(`Delivery set for ${formatted}!`, "🚗");
  });
}


function setupCheckout() {
  const btn = document.getElementById("checkout-btn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    if (cart.length === 0) {
      showToast("Your cart is empty!", "🛒");
      return;
    }
    showToast("Redirecting to payment…", "💳");
    setTimeout(() => alert("Proceeding to Payment!\n\nTotal: $" + cart.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2)), 600);
  });
}


function setActiveNav() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = a.getAttribute("href") || "";
    if (href === current || (current === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });
}


document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  setActiveNav();
  setupModal();
  setupCarousel();
  renderTrending();
  renderShop();
  setupShopFilters();
  renderCart();
  setupDeliveryPicker();
  setupCheckout();
});
