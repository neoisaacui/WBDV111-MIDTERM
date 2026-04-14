document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const page = body.dataset.page;

  // Active nav link
  if (page) {
    const activeLink = document.querySelector(`[data-nav="${page}"]`);
    if (activeLink) activeLink.classList.add('active');
  }

  // Year
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Atmosphere toggle (renamed from party mode)
  const partyBtn = document.querySelector('[data-party-toggle]');
  if (partyBtn) {
    const setLabel = () => {
      partyBtn.textContent = body.classList.contains('party') ? '✦ VIBE ON' : '✦ ATMOSPHERE';
    };
    partyBtn.addEventListener('click', () => {
      body.classList.toggle('party');
      setLabel();
    });
    setLabel();
  }

  // Event filter + search
  const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
  const cards = Array.from(document.querySelectorAll('[data-event-card]'));
  const searchInput = document.querySelector('[data-search]');
  let activeFilter = 'all';

  const applyFilters = () => {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    cards.forEach(card => {
      const tags = (card.dataset.tags || '').toLowerCase();
      const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const matchesFilter = activeFilter === 'all' || tags.includes(activeFilter);
      const matchesSearch = !query || title.includes(query) || tags.includes(query);
      card.style.display = (matchesFilter && matchesSearch) ? '' : 'none';
    });
  };

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.filter || 'all';
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    });
  });

  if (searchInput) searchInput.addEventListener('input', applyFilters);

  // Ticket qty builder
  const ticketRows = document.querySelectorAll('[data-ticket-row]');
  const totalEl = document.querySelector('[data-total]');

  const updateTotal = () => {
    let total = 0;
    ticketRows.forEach(row => {
      const qtyInput = row.querySelector('[data-qty]');
      const price = Number(row.dataset.price || 0);
      const qty = Number(qtyInput ? qtyInput.value : 0);
      total += price * qty;
    });
    if (totalEl) {
      totalEl.textContent = total.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
  };

  ticketRows.forEach(row => {
    const minus = row.querySelector('[data-qty-minus]');
    const plus = row.querySelector('[data-qty-plus]');
    const input = row.querySelector('[data-qty]');

    const clamp = () => {
      if (!input) return;
      const val = Math.max(0, Math.min(9, Number(input.value || 0)));
      input.value = String(val);
    };

    if (input) input.addEventListener('change', () => { clamp(); updateTotal(); });
    if (minus && input) minus.addEventListener('click', () => { input.value = String(Math.max(0, Number(input.value || 0) - 1)); updateTotal(); });
    if (plus && input) plus.addEventListener('click', () => { input.value = String(Math.min(9, Number(input.value || 0) + 1)); updateTotal(); });
  });

  if (ticketRows.length) updateTotal();

  // Accordion
  document.querySelectorAll('[data-accordion]').forEach(section => {
    const items = section.querySelectorAll('.accordion-item');
    items.forEach(item => {
      const btn = item.querySelector('button');
      if (!btn) return;
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        items.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });
  });
});

// ── CHECKOUT LOGIC ───────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const fmt = n => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  let discount = { type: null, value: 0, label: '' };

  const summaryLines    = document.getElementById('summary-lines');
  const summaryEmpty    = document.getElementById('summary-empty');
  const summarySubtotal = document.getElementById('summary-subtotal');
  const summaryFee      = document.getElementById('summary-fee');
  const summaryGrand    = document.getElementById('summary-grand');
  const discountRow     = document.getElementById('summary-discount-row');
  const discountLabel   = document.getElementById('summary-discount-label');
  const discountVal     = document.getElementById('summary-discount-val');
  const payBtn          = document.getElementById('checkout-pay-btn');
  const modal           = document.getElementById('checkout-modal');
  const modalSummary    = document.getElementById('modal-summary');
  const modalClose      = document.getElementById('modal-close');
  const eventSelect     = document.getElementById('checkout-event');
  const summaryEventBox = document.getElementById('summary-event-box');
  const summaryEventTxt = document.getElementById('summary-event-text');
  const promoInput      = document.getElementById('checkout-promo');
  const promoBtn        = document.getElementById('checkout-promo-btn');
  const promoMsg        = document.getElementById('checkout-promo-msg');
  const termsCheck      = document.getElementById('checkout-terms');

  if (!summaryLines) return;

  const getTicketRows = () => Array.from(document.querySelectorAll('[data-ticket-row]'));

  const TICKET_NAMES = { '45': 'Luminary Pass', '85': 'Aura Pass', '140': 'Pinnacle Pass' };

  const refreshSummary = () => {
    const rows = getTicketRows();
    let subtotal = 0;
    const lines = [];

    rows.forEach(row => {
      const price = Number(row.dataset.price || 0);
      const qty = Number(row.querySelector('[data-qty]')?.value || 0);
      if (qty > 0) {
        subtotal += price * qty;
        lines.push({ name: TICKET_NAMES[String(price)] || 'Ticket', qty, price });
      }
    });

    summaryLines.innerHTML = '';
    if (lines.length === 0) {
      summaryLines.appendChild(summaryEmpty);
      summaryEmpty.style.display = '';
    } else {
      summaryEmpty.style.display = 'none';
      lines.forEach(l => {
        const el = document.createElement('div');
        el.className = 'summary-row';
        el.innerHTML = `<span>${l.name} × ${l.qty}</span><span>${fmt(l.price * l.qty)}</span>`;
        summaryLines.appendChild(el);
      });
    }

    let discountAmt = 0;
    if (subtotal > 0 && discount.type === 'percent') discountAmt = subtotal * (discount.value / 100);
    else if (subtotal > 0 && discount.type === 'fixed') discountAmt = Math.min(discount.value, subtotal);

    const fee = (subtotal - discountAmt) * 0.05;
    const grand = subtotal - discountAmt + fee;

    if (summarySubtotal) summarySubtotal.textContent = fmt(subtotal);
    if (summaryFee) summaryFee.textContent = fmt(fee);
    if (summaryGrand) summaryGrand.textContent = fmt(grand);

    if (discountAmt > 0 && discountRow) {
      discountRow.style.display = '';
      if (discountLabel) discountLabel.textContent = discount.label;
      if (discountVal) discountVal.textContent = `-${fmt(discountAmt)}`;
    } else if (discountRow) {
      discountRow.style.display = 'none';
    }

    const hasEvent = eventSelect && eventSelect.value;
    const hasTickets = lines.length > 0;
    const hasTerms = termsCheck && termsCheck.checked;
    if (payBtn) payBtn.disabled = !(hasEvent && hasTickets && hasTerms);
  };

  document.querySelectorAll('[data-qty-minus],[data-qty-plus],[data-qty]').forEach(el => {
    el.addEventListener('click', () => setTimeout(refreshSummary, 0));
    el.addEventListener('change', () => setTimeout(refreshSummary, 0));
  });

  if (eventSelect) {
    eventSelect.addEventListener('change', () => {
      const val = eventSelect.value;
      if (summaryEventBox) summaryEventBox.style.display = val ? '' : 'none';
      if (summaryEventTxt) summaryEventTxt.textContent = val;
      refreshSummary();
    });
  }

  if (termsCheck) termsCheck.addEventListener('change', refreshSummary);

  // Promo codes
  const PROMOS = {
    'NEXUS10': { type: 'percent', value: 10, label: 'NEXUS10 (10% off)' },
    'VIPCREW': { type: 'fixed', value: 20, label: 'VIPCREW (−$20)' },
  };

  if (promoBtn) {
    promoBtn.addEventListener('click', () => {
      const code = promoInput.value.trim().toUpperCase();
      if (PROMOS[code]) {
        discount = PROMOS[code];
        promoMsg.textContent = '✓ Code applied: ' + discount.label;
        promoMsg.style.color = 'var(--teal)';
        promoMsg.style.display = '';
        promoInput.disabled = true;
        promoBtn.disabled = true;
        promoBtn.textContent = 'Applied';
      } else if (!code) {
        promoMsg.textContent = 'Enter a promo code first.';
        promoMsg.style.color = 'var(--gold)';
        promoMsg.style.display = '';
      } else {
        discount = { type: null, value: 0, label: '' };
        promoMsg.textContent = 'Code not recognised.';
        promoMsg.style.color = 'var(--rose)';
        promoMsg.style.display = '';
      }
      refreshSummary();
    });
  }

  // Payment tabs
  document.querySelectorAll('.payment-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.payment-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.pay-panel').forEach(p => p.style.display = 'none');
      const target = document.getElementById('pay-' + tab.dataset.method);
      if (target) target.style.display = '';
    });
  });

  // Card number formatting
  const cardNumInput = document.getElementById('checkout-card-num');
  if (cardNumInput) {
    cardNumInput.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 16);
      e.target.value = v.replace(/(.{4})/g, '$1 ').trim();
    });
  }

  const expInput = document.getElementById('checkout-card-exp');
  if (expInput) {
    expInput.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 4);
      if (v.length >= 3) v = v.slice(0, 2) + ' / ' + v.slice(2);
      e.target.value = v;
    });
  }

  // Pay Now — NO QR code
  if (payBtn) {
    payBtn.addEventListener('click', () => {
      const fname = document.getElementById('checkout-fname')?.value.trim();
      const lname = document.getElementById('checkout-lname')?.value.trim();
      const email = document.getElementById('checkout-email')?.value.trim();

      if (!fname || !lname || !email) {
        alert('Please fill in your First Name, Last Name, and Email before paying.');
        return;
      }

      const rows = getTicketRows();
      let subtotal = 0;
      let lineHTML = '';

      rows.forEach(row => {
        const price = Number(row.dataset.price || 0);
        const qty = Number(row.querySelector('[data-qty]')?.value || 0);
        if (qty > 0) {
          subtotal += price * qty;
          lineHTML += `<div class="summary-row"><span>${TICKET_NAMES[String(price)] || 'Ticket'} × ${qty}</span><span>${fmt(price * qty)}</span></div>`;
        }
      });

      let discountAmt = 0;
      if (discount.type === 'percent') discountAmt = subtotal * (discount.value / 100);
      if (discount.type === 'fixed') discountAmt = Math.min(discount.value, subtotal);
      const fee = (subtotal - discountAmt) * 0.05;
      const grand = subtotal - discountAmt + fee;

      const activeTab = document.querySelector('.payment-tab.active');
      const payMethod = activeTab ? activeTab.textContent.trim() : 'Card';
      const ref = 'NX-' + Math.random().toString(36).slice(2, 9).toUpperCase();
      const eventVal = eventSelect ? eventSelect.value : '';

      if (modalSummary) {
        modalSummary.innerHTML = `
          <div class="summary-row" style="font-size:0.92rem;font-weight:600;padding-bottom:0.6rem;border-bottom:1px solid var(--border);margin-bottom:0.6rem;">
            <span>${fname} ${lname}</span>
            <span style="font-size:0.75rem;color:var(--text-muted);">${email}</span>
          </div>
          ${eventVal ? `<div style="font-size:0.78rem;color:var(--text-muted);margin-bottom:0.6rem;">📅 ${eventVal}</div>` : ''}
          ${lineHTML}
          ${discountAmt > 0 ? `<div class="summary-row" style="color:var(--teal);"><span>${discount.label}</span><span>-${fmt(discountAmt)}</span></div>` : ''}
          <div class="summary-row"><span>Service Fee</span><span>${fmt(fee)}</span></div>
          <div class="summary-row" style="font-size:1rem;font-weight:700;border-top:1px solid var(--border);padding-top:0.6rem;margin-top:0.3rem;">
            <span>Total Paid</span><span style="color:var(--gold);">${fmt(grand)}</span>
          </div>
          <div style="margin-top:0.8rem;font-size:0.75rem;color:var(--text-muted);">via ${payMethod} · Ref: <strong style="color:var(--gold-light);">${ref}</strong></div>
        `;
      }

      if (modal) modal.style.display = 'flex';
    });
  }

  // Modal close
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      if (modal) modal.style.display = 'none';
      document.querySelectorAll('[data-qty]').forEach(i => i.value = '0');
      document.querySelectorAll('[data-total]').forEach(t => t.textContent = '$0');
      ['checkout-fname','checkout-lname','checkout-email','checkout-phone','checkout-notes'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
      if (eventSelect) eventSelect.value = '';
      if (summaryEventBox) summaryEventBox.style.display = 'none';
      if (termsCheck) termsCheck.checked = false;
      discount = { type: null, value: 0, label: '' };
      if (promoInput) { promoInput.value = ''; promoInput.disabled = false; }
      if (promoBtn) { promoBtn.disabled = false; promoBtn.textContent = 'Apply'; }
      if (promoMsg) promoMsg.style.display = 'none';
      refreshSummary();
    });
  }

  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal && modalClose) modalClose.click();
    });
  }

  refreshSummary();
});
