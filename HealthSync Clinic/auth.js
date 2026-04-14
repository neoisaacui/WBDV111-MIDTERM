(function () {
  const SESSION_KEY = "healthsync-portal-session";
  const LATEST_BOOKING_KEY = "healthsync-latest-booking";
  const APPOINTMENTS_STORAGE_KEY = "healthsync-demo-appointments";

  const accounts = [
    {
      role: "default",
      label: "Default",
      username: "default",
      password: "default123",
      name: "Default Operator",
      dashboard: "default-dashboard.html",
      description: "Shared clinic overview for demos and general monitoring."
    },
    {
      role: "admin",
      label: "Admin",
      username: "admin",
      password: "admin123",
      name: "Dra. Angelica Ramos",
      dashboard: "admin-dashboard.html",
      description: "Branch-wide control for schedules, approvals, and staffing."
    },
    {
      role: "staff",
      label: "Staff",
      username: "staff",
      password: "staff123",
      name: "Lena Bautista",
      dashboard: "staff-dashboard.html",
      description: "Front desk and clinical coordination for daily operations."
    },
    {
      role: "user",
      label: "User",
      username: "user",
      password: "user123",
      name: "Mia Santos",
      dashboard: "user-dashboard.html",
      description: "Patient access for profile, bookings, and reminders."
    }
  ];

  // Specialty and doctor data mirrored for dashboard rendering
  const specialties = [
    { id: "cardiology", label: "Cardiology" },
    { id: "dermatology", label: "Dermatology" },
    { id: "pediatrics", label: "Pediatrics" },
    { id: "orthopedics", label: "Orthopedics" },
    { id: "neurology", label: "Neurology" },
    { id: "obstetrics", label: "OB-Gynecology" },
    { id: "ent", label: "ENT" },
    { id: "ophthalmology", label: "Ophthalmology" }
  ];

  const doctors = [
    { id: "d1", name: "Dr. Maria Reyes", specialtyId: "cardiology", branch: "Central Branch", rating: 4.9 },
    { id: "d2", name: "Dr. Jose Bautista", specialtyId: "cardiology", branch: "North Branch", rating: 4.7 },
    { id: "d3", name: "Dr. Ana Santos", specialtyId: "dermatology", branch: "Central Branch", rating: 4.8 },
    { id: "d4", name: "Dr. Ramon dela Cruz", specialtyId: "dermatology", branch: "West Branch", rating: 4.6 },
    { id: "d5", name: "Dr. Lourdes Manalo", specialtyId: "pediatrics", branch: "West Branch", rating: 5.0 },
    { id: "d6", name: "Dr. Carlo Villanueva", specialtyId: "pediatrics", branch: "North Branch", rating: 4.7 },
    { id: "d7", name: "Dr. Natividad Ocampo", specialtyId: "orthopedics", branch: "South Branch", rating: 4.9 },
    { id: "d8", name: "Dr. Eduardo Pascual", specialtyId: "orthopedics", branch: "Central Branch", rating: 4.6 },
    { id: "d9", name: "Dr. Corazon Aguilar", specialtyId: "neurology", branch: "Central Branch", rating: 4.8 },
    { id: "d10", name: "Dr. Felix Navarro", specialtyId: "neurology", branch: "South Branch", rating: 4.5 },
    { id: "d11", name: "Dr. Remedios Castillo", specialtyId: "obstetrics", branch: "Central Branch", rating: 4.9 },
    { id: "d12", name: "Dr. Ligaya Romualdo", specialtyId: "obstetrics", branch: "North Branch", rating: 4.7 },
    { id: "d13", name: "Dr. Bienvenido Torres", specialtyId: "ent", branch: "West Branch", rating: 4.8 },
    { id: "d14", name: "Dr. Florencia Alvarez", specialtyId: "ent", branch: "South Branch", rating: 4.9 },
    { id: "d15", name: "Dr. Domingo Ramos", specialtyId: "ophthalmology", branch: "North Branch", rating: 4.7 },
    { id: "d16", name: "Dr. Estrella Fuentes", specialtyId: "ophthalmology", branch: "Central Branch", rating: 4.9 }
  ];

  function getSpecialtyLabel(id) {
    const s = specialties.find((x) => x.id === id);
    return s ? s.label : id;
  }

  function getDoctorById(id) {
    return doctors.find((d) => d.id === id) || null;
  }

  function formatDate(dateString) {
    if (!dateString) return "—";
    const date = new Date(`${dateString}T12:00:00`);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short", month: "short", day: "numeric", year: "numeric"
    }).format(date);
  }

  function getSession() {
    try {
      const stored = window.localStorage.getItem(SESSION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      return null;
    }
  }

  function saveSession(account) {
    const session = {
      role: account.role,
      label: account.label,
      username: account.username,
      name: account.name,
      dashboard: account.dashboard
    };
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  }

  function clearSession() {
    window.localStorage.removeItem(SESSION_KEY);
  }

  function getAccount(username, password) {
    const normalizedUsername = username.trim().toLowerCase();
    return accounts.find((account) => {
      return account.username === normalizedUsername && account.password === password;
    }) || null;
  }

  function goToDashboard(role) {
    const account = accounts.find((entry) => entry.role === role);
    window.location.href = account ? account.dashboard : "login.html";
  }

  function setupLogoutButtons() {
    document.querySelectorAll("[data-logout]").forEach((button) => {
      button.addEventListener("click", () => {
        clearSession();
        window.location.href = "login.html";
      });
    });
  }

  function populateSession(session) {
    document.querySelectorAll("[data-auth-name]").forEach((node) => {
      node.textContent = session.name;
    });
    document.querySelectorAll("[data-auth-role]").forEach((node) => {
      node.textContent = session.label;
    });
    document.querySelectorAll("[data-auth-username]").forEach((node) => {
      node.textContent = session.username;
    });
  }

  function readLatestBooking() {
    try {
      const stored = window.localStorage.getItem(LATEST_BOOKING_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      return null;
    }
  }

  function readAllAppointments() {
    try {
      const stored = window.localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      return [];
    }
  }

  function renderLatestBooking() {
    const booking = readLatestBooking();

    document.querySelectorAll("[data-latest-booking]").forEach((node) => {
      if (!booking) {
        node.innerHTML = `
          <div class="empty-box">
            No new booking has been submitted from the public wizard yet.
          </div>
        `;
        return;
      }

      node.innerHTML = `
        <div class="booking-summary">
          <strong>${booking.specialty}</strong>
          <small>${booking.doctor}</small>
          ${booking.branch ? `<small style="display:block;color:var(--muted)">${booking.branch}</small>` : ""}
          <p>${booking.date} at ${booking.time}</p>
          <span class="status-pill status-pending">${booking.status}</span>
        </div>
      `;
    });
  }

  function renderAppointmentHistory() {
    const appts = readAllAppointments();

    document.querySelectorAll("[data-appointment-history]").forEach((node) => {
      if (!appts.length) {
        node.innerHTML = `<div class="empty-box">No appointment history available yet.</div>`;
        return;
      }

      // Show most recent 5, newest first
      const recent = [...appts].slice(0, 5);

      node.innerHTML = recent.map((appt) => {
        const doc = getDoctorById(appt.doctorId);
        const specLabel = getSpecialtyLabel(appt.specialtyId);
        const statusClass = appt.status === "Confirmed"
          ? "status-confirmed"
          : appt.status === "Pending"
          ? "status-pending"
          : "status-complete";

        return `
          <div class="appointment-row">
            <strong>${specLabel}</strong>
            <p>${doc ? doc.name : "Unknown Doctor"}${doc ? " · " + doc.branch : ""}</p>
            <div class="appointment-meta">
              <span class="meta-pill">${formatDate(appt.date)}</span>
              <span class="meta-pill">${appt.time}</span>
              <span class="status-pill ${statusClass}">${appt.status}</span>
            </div>
          </div>
        `;
      }).join("");
    });
  }

  function protectPage(expectedRole) {
    const session = getSession();

    if (!session) {
      window.location.href = "login.html";
      return;
    }

    if (session.role !== expectedRole) {
      goToDashboard(session.role);
      return;
    }

    populateSession(session);
    renderLatestBooking();
    renderAppointmentHistory();
    setupLogoutButtons();
  }

  function renderAccountCards() {
    const grid = document.getElementById("accountGrid");
    if (!grid) return;

    grid.innerHTML = accounts.map((account) => {
      return `
        <article class="account-card">
          <div class="card-head">
            <span class="role-chip">${account.label}</span>
            <button type="button" class="fill-button" data-fill="${account.role}">Use</button>
          </div>
          <h3>${account.name}</h3>
          <p>${account.description}</p>
          <div class="credential-line"><span>Username</span><strong>${account.username}</strong></div>
          <div class="credential-line"><span>Password</span><strong>${account.password}</strong></div>
        </article>
      `;
    }).join("");

    grid.querySelectorAll("[data-fill]").forEach((button) => {
      button.addEventListener("click", () => {
        const account = accounts.find((entry) => entry.role === button.dataset.fill);
        const usernameInput = document.getElementById("username");
        const passwordInput = document.getElementById("password");

        if (!account || !usernameInput || !passwordInput) return;

        usernameInput.value = account.username;
        passwordInput.value = account.password;
      });
    });
  }

  function setLoginStatus(message, state) {
    const node = document.getElementById("loginStatus");
    if (!node) return;
    node.textContent = message;
    node.dataset.state = state;
  }

  function initLoginPage() {
    renderAccountCards();

    const session = getSession();
    const currentSession = document.getElementById("currentSession");
    const continueSession = document.getElementById("continueSession");

    if (session && currentSession && continueSession) {
      currentSession.hidden = false;
      continueSession.hidden = false;
      currentSession.textContent = `Current session: ${session.name} (${session.label})`;
      continueSession.addEventListener("click", () => {
        goToDashboard(session.role);
      });
    }

    setupLogoutButtons();

    const form = document.getElementById("loginForm");
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const account = getAccount(username, password);

      if (!account) {
        setLoginStatus("Incorrect username or password. Use one of the demo accounts below.", "error");
        return;
      }

      saveSession(account);
      setLoginStatus(`Login successful. Opening the ${account.label} dashboard...`, "success");
      goToDashboard(account.role);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.dataset.page;
    const protectedRole = document.body.dataset.protectedRole;

    if (page === "login") {
      initLoginPage();
      return;
    }

    if (protectedRole) {
      protectPage(protectedRole);
    }
  });
})();
