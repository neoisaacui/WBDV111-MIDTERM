

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const page = body.dataset.page;

  if (page) {
    const activeLink = document.querySelector(`[data-nav="${page}"]`);
    if (activeLink) activeLink.classList.add('active');
  }

  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const partyBtn = document.querySelector('[data-party-toggle]');
  if (partyBtn) {
    const setLabel = () => {
      partyBtn.textContent = body.classList.contains('party') ? 'Party Mode: ON' : 'Party Mode: OFF';
    };
    partyBtn.addEventListener('click', () => {
      body.classList.toggle('party');
      setLabel();
    });
    setLabel();
  }

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
      totalEl.textContent = total.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      });
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

    if (input) {
      input.addEventListener('change', () => {
        clamp();
        updateTotal();
      });
    }

    if (minus && input) {
      minus.addEventListener('click', () => {
        input.value = String(Math.max(0, Number(input.value || 0) - 1));
        updateTotal();
      });
    }

    if (plus && input) {
      plus.addEventListener('click', () => {
        input.value = String(Math.min(9, Number(input.value || 0) + 1));
        updateTotal();
      });
    }
  });

  if (ticketRows.length) updateTotal();

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

  const pulse = document.querySelector('[data-pulse]');
  if (pulse) {
    setInterval(() => {
      pulse.classList.toggle('pulse');
    }, 1400);
  }
});

// ── CHECKOUT LOGIC ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // ── Helpers ──
  const fmt = n => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  // ── State ──
  let discount = { type: null, value: 0, label: '' };

  // ── DOM refs ──
  const summaryLines   = document.getElementById('summary-lines');
  const summaryEmpty   = document.getElementById('summary-empty');
  const summarySubtotal= document.getElementById('summary-subtotal');
  const summaryFee     = document.getElementById('summary-fee');
  const summaryGrand   = document.getElementById('summary-grand');
  const discountRow    = document.getElementById('summary-discount-row');
  const discountLabel  = document.getElementById('summary-discount-label');
  const discountVal    = document.getElementById('summary-discount-val');
  const payBtn         = document.getElementById('checkout-pay-btn');
  const modal          = document.getElementById('checkout-modal');
  const modalSummary   = document.getElementById('modal-summary');
  const modalClose     = document.getElementById('modal-close');
  const eventSelect    = document.getElementById('checkout-event');
  const summaryEventBox= document.getElementById('summary-event-box');
  const summaryEventTxt= document.getElementById('summary-event-text');
  const promoInput     = document.getElementById('checkout-promo');
  const promoBtn       = document.getElementById('checkout-promo-btn');
  const promoMsg       = document.getElementById('checkout-promo-msg');
  const termsCheck     = document.getElementById('checkout-terms');

  if (!summaryLines) return; // not on tickets page

  // ── Recompute summary from ticket builder rows ──
  const getTicketRows = () => Array.from(document.querySelectorAll('[data-ticket-row]'));

  const refreshSummary = () => {
    const rows = getTicketRows();
    const names = { '45': 'Pulse Pass', '85': 'Glow Pass', '140': 'Orbit Pass' };
    let subtotal = 0;
    const lines = [];

    rows.forEach(row => {
      const price = Number(row.dataset.price || 0);
      const qty   = Number(row.querySelector('[data-qty]')?.value || 0);
      if (qty > 0) {
        subtotal += price * qty;
        lines.push({ name: names[String(price)] || 'Ticket', qty, price });
      }
    });

    // Render lines
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

    // Discount
    let discountAmt = 0;
    if (subtotal > 0 && discount.type === 'percent') {
      discountAmt = subtotal * (discount.value / 100);
    } else if (subtotal > 0 && discount.type === 'fixed') {
      discountAmt = Math.min(discount.value, subtotal);
    }

    const fee   = (subtotal - discountAmt) * 0.05;
    const grand = subtotal - discountAmt + fee;

    summarySubtotal.textContent = fmt(subtotal);
    summaryFee.textContent      = fmt(fee);
    summaryGrand.textContent    = fmt(grand);

    if (discountAmt > 0) {
      discountRow.style.display = '';
      discountLabel.textContent = discount.label;
      discountVal.textContent   = '-' + fmt(discountAmt);
    } else {
      discountRow.style.display = 'none';
    }

    updatePayBtn(subtotal, lines.length);
  };

  // ── Enable/disable Pay button ──
  const updatePayBtn = (subtotal, lineCount) => {
    if (!payBtn) return;
    const hasTickets = lineCount > 0;
    const hasEvent   = eventSelect && eventSelect.value !== '';
    const hasTerms   = termsCheck && termsCheck.checked;
    payBtn.disabled  = !(hasTickets && hasEvent && hasTerms);
  };

  // ── Hook ticket qty changes ──
  const hookQtyChanges = () => {
    document.querySelectorAll('[data-qty-minus],[data-qty-plus],[data-qty]').forEach(el => {
      el.addEventListener('click', () => setTimeout(refreshSummary, 0));
      el.addEventListener('change', () => setTimeout(refreshSummary, 0));
    });
  };
  hookQtyChanges();

  // ── Event select ──
  if (eventSelect) {
    eventSelect.addEventListener('change', () => {
      const val = eventSelect.value;
      if (val && summaryEventBox) {
        summaryEventBox.style.display = '';
        summaryEventTxt.textContent   = val;
      } else if (summaryEventBox) {
        summaryEventBox.style.display = 'none';
      }
      refreshSummary();
    });
  }

  // ── Terms ──
  if (termsCheck) {
    termsCheck.addEventListener('change', refreshSummary);
  }

  // ── Promo codes ──
  const PROMOS = {
    'NEXUS10':  { type: 'percent', value: 10,  label: 'Promo: NEXUS10 (10% off)' },
    'VIPCREW':  { type: 'fixed',   value: 20,  label: 'Promo: VIPCREW (-$20)'    },
  };

  if (promoBtn) {
    promoBtn.addEventListener('click', () => {
      const code = promoInput.value.trim().toUpperCase();
      if (PROMOS[code]) {
        discount = PROMOS[code];
        promoMsg.textContent  = '✅ Code applied: ' + discount.label;
        promoMsg.style.color  = '#16a34a';
        promoMsg.style.display = '';
        promoInput.disabled   = true;
        promoBtn.disabled     = true;
        promoBtn.textContent  = 'Applied';
      } else if (code === '') {
        promoMsg.textContent  = '⚠ Enter a promo code first.';
        promoMsg.style.color  = '#b45309';
        promoMsg.style.display = '';
      } else {
        discount = { type: null, value: 0, label: '' };
        promoMsg.textContent  = '❌ Code not recognised.';
        promoMsg.style.color  = '#dc2626';
        promoMsg.style.display = '';
      }
      refreshSummary();
    });
  }

  // ── Payment tabs ──
  document.querySelectorAll('.payment-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.payment-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.pay-panel').forEach(p => p.style.display = 'none');
      const target = document.getElementById('pay-' + tab.dataset.method);
      if (target) target.style.display = '';
    });
  });

  // ── Card number formatting ──
  const cardNumInput = document.getElementById('checkout-card-num');
  if (cardNumInput) {
    cardNumInput.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 16);
      e.target.value = v.replace(/(.{4})/g, '$1 ').trim();
    });
  }

  // ── Expiry formatting ──
  const expInput = document.getElementById('checkout-card-exp');
  if (expInput) {
    expInput.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 4);
      if (v.length >= 3) v = v.slice(0,2) + ' / ' + v.slice(2);
      e.target.value = v;
    });
  }

  // ── Pay Now ──
  if (payBtn) {
    payBtn.addEventListener('click', () => {
      const fname = document.getElementById('checkout-fname')?.value.trim();
      const lname = document.getElementById('checkout-lname')?.value.trim();
      const email = document.getElementById('checkout-email')?.value.trim();

      if (!fname || !lname || !email) {
        alert('Please fill in your First Name, Last Name, and Email before paying.');
        return;
      }

      // Build modal content
      const rows = getTicketRows();
      const names = { '45': 'Pulse Pass', '85': 'Glow Pass', '140': 'Orbit Pass' };
      let subtotal = 0;
      let lineHTML = '';
      rows.forEach(row => {
        const price = Number(row.dataset.price || 0);
        const qty   = Number(row.querySelector('[data-qty]')?.value || 0);
        if (qty > 0) {
          subtotal += price * qty;
          lineHTML += `<div style="display:flex;justify-content:space-between;"><span>${names[String(price)] || 'Ticket'} × ${qty}</span><span>${fmt(price * qty)}</span></div>`;
        }
      });

      let discountAmt = 0;
      if (discount.type === 'percent') discountAmt = subtotal * (discount.value / 100);
      if (discount.type === 'fixed')   discountAmt = Math.min(discount.value, subtotal);
      const fee   = (subtotal - discountAmt) * 0.05;
      const grand = subtotal - discountAmt + fee;
      const activeTab = document.querySelector('.payment-tab.active');
      const payMethod = activeTab ? activeTab.textContent.trim() : 'Card';
      const ref = 'NX-' + Math.random().toString(36).slice(2,9).toUpperCase();
      const eventVal = eventSelect ? eventSelect.value : '';

      // Receipt summary (exactly as before)
      modalSummary.innerHTML = `
        <div style="display:flex;justify-content:space-between;border-bottom:1px dashed var(--ink);padding-bottom:0.5rem;margin-bottom:0.5rem;font-size:0.95rem;font-weight:700;">
          <span>👤 ${fname} ${lname}</span><span style="font-size:0.78rem;color:#666;">${email}</span>
        </div>
        <div style="font-size:0.8rem;color:#666;margin-bottom:0.4rem;">📅 ${eventVal}</div>
        ${lineHTML}
        ${discountAmt > 0 ? `<div style="display:flex;justify-content:space-between;color:green;"><span>${discount.label}</span><span>-${fmt(discountAmt)}</span></div>` : ''}
        <div style="display:flex;justify-content:space-between;"><span>Service Fee</span><span>${fmt(fee)}</span></div>
        <div style="display:flex;justify-content:space-between;font-family:'Archivo Black',sans-serif;font-size:1rem;border-top:2px solid var(--ink);margin-top:0.4rem;padding-top:0.4rem;">
          <span>Total Paid</span><span>${fmt(grand)}</span>
        </div>
        <div style="margin-top:0.6rem;font-size:0.8rem;color:#555;">Payment via ${payMethod} · Ref: ${ref}</div>
      `;

      // Pre-fill QR panel info
      const qrRef   = document.getElementById('modal-qr-ref');
      const qrName  = document.getElementById('modal-qr-name');
      const qrEvent = document.getElementById('modal-qr-event');
      if (qrRef)   qrRef.textContent   = ref;
      if (qrName)  qrName.textContent  = fname + ' ' + lname;
      if (qrEvent) qrEvent.textContent = eventVal;

      // Reset QR panel to hidden each time
      const qrPanel = document.getElementById('modal-qr-panel');
      const qrBtn   = document.getElementById('modal-qr-btn');
      if (qrPanel) qrPanel.style.display = 'none';
      if (qrBtn)   qrBtn.textContent = '📱 Show QR Code';

      // Always show modal — must be last
      modal.style.display = 'flex';
    });
  }

  // ── QR toggle button ──
  const qrBtn   = document.getElementById('modal-qr-btn');
  const qrPanel = document.getElementById('modal-qr-panel');
  if (qrBtn && qrPanel) {
    qrBtn.addEventListener('click', () => {
      const visible = qrPanel.style.display !== 'none';
      qrPanel.style.display = visible ? 'none' : 'block';
      qrBtn.textContent = visible ? '📱 Show QR Code' : '🙈 Hide QR Code';
    });
  }

  // ── Modal close ──
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.style.display = 'none';
      // Reset qty inputs
      document.querySelectorAll('[data-qty]').forEach(i => i.value = '0');
      document.querySelectorAll('[data-total]').forEach(t => t.textContent = '$0');
      document.getElementById('checkout-fname').value = '';
      document.getElementById('checkout-lname').value = '';
      document.getElementById('checkout-email').value = '';
      if (document.getElementById('checkout-phone')) document.getElementById('checkout-phone').value = '';
      if (document.getElementById('checkout-notes')) document.getElementById('checkout-notes').value = '';
      if (eventSelect) eventSelect.value = '';
      if (summaryEventBox) summaryEventBox.style.display = 'none';
      if (termsCheck) termsCheck.checked = false;
      discount = { type: null, value: 0, label: '' };
      if (promoInput) { promoInput.value = ''; promoInput.disabled = false; }
      if (promoBtn)   { promoBtn.disabled = false; promoBtn.textContent = 'Apply'; }
      if (promoMsg)   promoMsg.style.display = 'none';
      // Reset QR panel
      const qrPanelEl = document.getElementById('modal-qr-panel');
      const qrBtnEl   = document.getElementById('modal-qr-btn');
      if (qrPanelEl) qrPanelEl.style.display = 'none';
      if (qrBtnEl)   qrBtnEl.textContent = '📱 Show QR Code';
      refreshSummary();
    });
  }

  // ── Close modal on backdrop click ──
  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) { if (modalClose) modalClose.click(); }
    });
  }

  refreshSummary();
});
