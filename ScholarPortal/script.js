function showToast(msg) {
  var t = document.getElementById('toast');
  t.innerHTML = msg;
  t.classList.add('show');
  setTimeout(function() { t.classList.remove('show'); }, 3200);
}

function handleLogin() {
  var email = document.getElementById('login-email') ? document.getElementById('login-email').value.trim() : '';
  var password = document.getElementById('login-password') ? document.getElementById('login-password').value : '';
  var name = email ? email.split('@')[0] : 'Student';
  // Derive a display name from the email (capitalize first letter)
  name = name.charAt(0).toUpperCase() + name.slice(1);
  localStorage.setItem('sp_logged_in', '1');
  localStorage.setItem('sp_name', name);
  localStorage.setItem('sp_email', email);
  window.location.href = 'profile.html';
}

function handleRegister() {
  var first = document.getElementById('reg-first') ? document.getElementById('reg-first').value.trim() : '';
  var last  = document.getElementById('reg-last')  ? document.getElementById('reg-last').value.trim()  : '';
  var name  = (first + ' ' + last).trim() || 'Student';
  localStorage.setItem('sp_logged_in', '1');
  localStorage.setItem('sp_name', name);
  showToast('🎓 Account created! Student ID: SP-2025-00891');
  setTimeout(function() { window.location.href = 'index.html#courses'; }, 1000);
}

function handleLogout() {
  localStorage.removeItem('sp_logged_in');
  localStorage.removeItem('sp_name');
  window.location.href = 'index.html';
}

function guardPage() {
  if (!localStorage.getItem('sp_logged_in')) {
    window.location.href = 'index.html';
  }
}

function updateNav() {
  var loggedIn = localStorage.getItem('sp_logged_in');
  var name     = localStorage.getItem('sp_name') || 'Student';
  var navTranscript = document.getElementById('nav-transcript');
  var navProfile    = document.getElementById('nav-profile');
  var navLogin      = document.getElementById('nav-login');
  var navLogout     = document.getElementById('nav-logout');
  var loginCard     = document.querySelector('.login-card');

  if (loggedIn) {
    if (navTranscript) navTranscript.style.display = '';
    if (navProfile)    navProfile.style.display    = '';
    if (navLogin)      navLogin.style.display      = 'none';
    if (navLogout)     navLogout.style.display     = '';
    if (loginCard) {
      loginCard.innerHTML =
        '<div class="login-card-header" style="margin-bottom:1.25rem;">' +
          '<div class="login-card-icon">👋</div>' +
          '<div>' +
            '<div class="login-card-title">Welcome back, ' + name + '!</div>' +
            '<div class="login-card-sub">You are logged in to ScholarPortal</div>' +
          '</div>' +
        '</div>' +
        '<a href="profile.html" class="btn btn-primary" style="width:100%;justify-content:center;margin-bottom:0.75rem;">Go to My Profile →</a>' +
        '<a href="transcript.html" class="btn btn-ghost" style="width:100%;justify-content:center;margin-bottom:0.75rem;">View Transcript</a>' +
        '<button class="btn" style="width:100%;justify-content:center;font-size:0.82rem;background:rgba(220,38,38,0.08);color:#dc2626;border:1.5px solid rgba(220,38,38,0.2);" onclick="handleLogout()">Sign Out</button>';
    }
  } else {
    if (navTranscript) navTranscript.style.display = 'none';
    if (navProfile)    navProfile.style.display    = 'none';
    if (navLogin)      navLogin.style.display      = '';
    if (navLogout)     navLogout.style.display     = 'none';
  }
}

function filterCourses(cat, btn) {
  document.querySelectorAll('.filter-tab').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  document.querySelectorAll('.course-card').forEach(function(card) {
    card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
  });
}

function toggleMobileMenu() {
  var nl = document.querySelector('.nav-links');
  if (nl.style.display === 'flex') {
    nl.style.display = 'none';
  } else {
    nl.style.display = 'flex';
    nl.style.flexDirection = 'column';
    nl.style.position = 'absolute';
    nl.style.top = '64px';
    nl.style.left = '0';
    nl.style.right = '0';
    nl.style.background = 'rgba(247,245,242,0.98)';
    nl.style.padding = '1rem 1.5rem 1.5rem';
    nl.style.borderBottom = '1px solid rgba(26,37,64,0.1)';
    nl.style.gap = '0.25rem';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  updateNav();

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.progress-fill, .gpa-bar-fill').forEach(function(bar) {
          var w = bar.style.width;
          bar.style.width = '0';
          requestAnimationFrame(function() { bar.style.width = w; });
        });
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.animate-bars').forEach(function(s) { observer.observe(s); });

  window.addEventListener('scroll', function() {
    var current = '';
    document.querySelectorAll('section[id]').forEach(function(s) {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(function(a) {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
  });
});
