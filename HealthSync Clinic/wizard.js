const WIZARD_STORAGE_KEY = "healthsync-wizard-state";
const APPOINTMENTS_STORAGE_KEY = "healthsync-demo-appointments";
const LATEST_BOOKING_KEY = "healthsync-latest-booking";

const specialties = [
  {
    id: "cardiology",
    label: "Cardiology",
    badge: "CRD",
    description: "Heart health, blood pressure, palpitations, and preventive cardiac care."
  },
  {
    id: "dermatology",
    label: "Dermatology",
    badge: "DER",
    description: "Skin, hair, and nail concerns with fast consultations for common conditions."
  },
  {
    id: "pediatrics",
    label: "Pediatrics",
    badge: "PDS",
    description: "Child wellness, vaccinations, growth monitoring, and sick visits."
  },
  {
    id: "orthopedics",
    label: "Orthopedics",
    badge: "ORT",
    description: "Bones, joints, mobility, injuries, and recovery-focused treatment plans."
  },
  {
    id: "neurology",
    label: "Neurology",
    badge: "NEU",
    description: "Headaches, migraines, nerve conditions, and brain health assessments."
  },
  {
    id: "obstetrics",
    label: "OB-Gynecology",
    badge: "OBG",
    description: "Women's health, prenatal care, reproductive wellness, and routine checkups."
  },
  {
    id: "ent",
    label: "ENT",
    badge: "ENT",
    description: "Ear, nose, and throat concerns including allergies, sinusitis, and hearing issues."
  },
  {
    id: "ophthalmology",
    label: "Ophthalmology",
    badge: "OPH",
    description: "Eye health, vision correction, cataracts, and routine eye examinations."
  }
];

const doctors = [
  // Cardiology
  {
    id: "d1",
    name: "Dr. Maria Reyes",
    specialtyId: "cardiology",
    title: "Consultant Cardiologist",
    experience: 14,
    branch: "Central Branch",
    rating: 4.9,
    reviews: 312,
    bio: "Specializes in preventive cardiology and heart failure management. Trained at the Philippine Heart Center and completed her fellowship at St. Luke's Medical Center.",
    languages: ["Filipino", "English"],
    availability: {
      0: ["09:00 AM", "10:30 AM", "02:00 PM"],
      1: ["11:00 AM", "01:30 PM", "03:30 PM"],
      2: ["09:30 AM", "12:30 PM", "04:00 PM"]
    }
  },
  {
    id: "d2",
    name: "Dr. Jose Bautista",
    specialtyId: "cardiology",
    title: "Cardiac Imaging Specialist",
    experience: 10,
    branch: "North Branch",
    rating: 4.7,
    reviews: 218,
    bio: "Expert in echocardiography and cardiac CT imaging. Known for his thorough patient education approach and calm bedside manner.",
    languages: ["Filipino", "English"],
    availability: {
      0: ["08:30 AM", "01:00 PM", "03:00 PM"],
      3: ["09:30 AM", "11:30 AM", "02:30 PM"],
      4: ["10:00 AM", "01:30 PM", "04:30 PM"]
    }
  },
  // Dermatology
  {
    id: "d3",
    name: "Dr. Ana Santos",
    specialtyId: "dermatology",
    title: "Dermatology Consultant",
    experience: 11,
    branch: "Central Branch",
    rating: 4.8,
    reviews: 287,
    bio: "Specializes in acne, eczema, and cosmetic dermatology. Active member of the Philippine Dermatological Society with a focus on skin of color.",
    languages: ["Filipino", "English"],
    availability: {
      0: ["09:00 AM", "11:00 AM", "03:30 PM"],
      1: ["10:00 AM", "01:00 PM", "04:00 PM"],
      5: ["09:30 AM", "12:00 PM", "02:30 PM"]
    }
  },
  {
    id: "d4",
    name: "Dr. Ramon dela Cruz",
    specialtyId: "dermatology",
    title: "Clinical Dermatologist",
    experience: 8,
    branch: "West Branch",
    rating: 4.6,
    reviews: 154,
    bio: "Focuses on allergic skin conditions and pediatric dermatology. Passionate about patient-centered care and evidence-based treatment.",
    languages: ["Filipino", "English", "Cebuano"],
    availability: {
      2: ["09:00 AM", "11:30 AM", "02:00 PM"],
      4: ["08:30 AM", "12:00 PM", "03:30 PM"],
      6: ["10:00 AM", "01:00 PM"]
    }
  },
  // Pediatrics
  {
    id: "d5",
    name: "Dr. Lourdes Manalo",
    specialtyId: "pediatrics",
    title: "Senior Pediatrician",
    experience: 16,
    branch: "West Branch",
    rating: 5.0,
    reviews: 401,
    bio: "Beloved by families across Metro Manila for her warm approach. Subspecialty in neonatology. Former department head at Philippine Children's Medical Center.",
    languages: ["Filipino", "English"],
    availability: {
      1: ["08:30 AM", "10:30 AM", "01:30 PM"],
      2: ["09:00 AM", "11:30 AM", "03:30 PM"],
      4: ["08:00 AM", "12:00 PM", "04:00 PM"]
    }
  },
  {
    id: "d6",
    name: "Dr. Carlo Villanueva",
    specialtyId: "pediatrics",
    title: "Child Development Specialist",
    experience: 7,
    branch: "North Branch",
    rating: 4.7,
    reviews: 183,
    bio: "Focuses on developmental milestones, ADHD, and behavioral pediatrics. Trained in early intervention therapy and school readiness assessments.",
    languages: ["Filipino", "English"],
    availability: {
      0: ["09:00 AM", "01:00 PM", "04:00 PM"],
      3: ["08:30 AM", "11:00 AM", "02:00 PM"],
      5: ["10:30 AM", "12:30 PM", "03:30 PM"]
    }
  },
  // Orthopedics
  {
    id: "d7",
    name: "Dr. Natividad Ocampo",
    specialtyId: "orthopedics",
    title: "Orthopedic Surgeon",
    experience: 12,
    branch: "South Branch",
    rating: 4.9,
    reviews: 264,
    bio: "Specializes in knee and shoulder reconstruction and sports injuries. Team physician for several Philippine national sports federations.",
    languages: ["Filipino", "English"],
    availability: {
      0: ["10:00 AM", "01:00 PM", "03:00 PM"],
      2: ["09:00 AM", "12:30 PM", "04:30 PM"],
      6: ["10:30 AM", "01:30 PM", "03:30 PM"]
    }
  },
  {
    id: "d8",
    name: "Dr. Eduardo Pascual",
    specialtyId: "orthopedics",
    title: "Spine & Joint Specialist",
    experience: 9,
    branch: "Central Branch",
    rating: 4.6,
    reviews: 139,
    bio: "Expert in minimally invasive spine surgery and joint replacement. Trained in Japan and South Korea before returning to practice in the Philippines.",
    languages: ["Filipino", "English", "Japanese"],
    availability: {
      1: ["09:00 AM", "12:00 PM", "03:00 PM"],
      3: ["10:30 AM", "01:30 PM"],
      5: ["09:00 AM", "11:30 AM", "02:30 PM"]
    }
  },
  // Neurology
  {
    id: "d9",
    name: "Dr. Corazon Aguilar",
    specialtyId: "neurology",
    title: "Consultant Neurologist",
    experience: 13,
    branch: "Central Branch",
    rating: 4.8,
    reviews: 221,
    bio: "Expertise in stroke management, epilepsy, and headache disorders. Active researcher in vascular neurology at the University of Santo Tomas Hospital.",
    languages: ["Filipino", "English"],
    availability: {
      0: ["08:30 AM", "11:00 AM", "02:30 PM"],
      2: ["09:30 AM", "12:30 PM", "04:00 PM"],
      4: ["10:00 AM", "01:00 PM", "03:30 PM"]
    }
  },
  {
    id: "d10",
    name: "Dr. Felix Navarro",
    specialtyId: "neurology",
    title: "Neuro-Rehabilitation Specialist",
    experience: 8,
    branch: "South Branch",
    rating: 4.5,
    reviews: 97,
    bio: "Focuses on post-stroke rehabilitation and movement disorders. Known for his integrative approach combining traditional neurology with physical therapy planning.",
    languages: ["Filipino", "English"],
    availability: {
      1: ["10:00 AM", "01:30 PM", "04:00 PM"],
      3: ["09:00 AM", "11:30 AM", "02:30 PM"],
      5: ["09:30 AM", "12:00 PM"]
    }
  },
  // OB-Gyne
  {
    id: "d11",
    name: "Dr. Remedios Castillo",
    specialtyId: "obstetrics",
    title: "OB-Gynecologist",
    experience: 18,
    branch: "Central Branch",
    rating: 4.9,
    reviews: 487,
    bio: "One of the most trusted OBs in the region with a subspecialty in high-risk pregnancies. Delivered over 3,000 babies and deeply committed to maternal wellness.",
    languages: ["Filipino", "English"],
    availability: {
      0: ["09:00 AM", "11:30 AM", "02:00 PM"],
      2: ["08:30 AM", "12:00 PM", "03:30 PM"],
      4: ["10:00 AM", "01:30 PM"]
    }
  },
  {
    id: "d12",
    name: "Dr. Ligaya Romualdo",
    specialtyId: "obstetrics",
    title: "Reproductive Health Specialist",
    experience: 9,
    branch: "North Branch",
    rating: 4.7,
    reviews: 198,
    bio: "Focuses on fertility, PCOS, and adolescent gynecology. Advocates for reproductive health education and accessible prenatal care.",
    languages: ["Filipino", "English"],
    availability: {
      1: ["09:30 AM", "12:30 PM", "03:00 PM"],
      3: ["10:00 AM", "01:00 PM", "04:30 PM"],
      5: ["09:00 AM", "11:30 AM"]
    }
  },
  // ENT
  {
    id: "d13",
    name: "Dr. Bienvenido Torres",
    specialtyId: "ent",
    title: "ENT Specialist",
    experience: 11,
    branch: "West Branch",
    rating: 4.8,
    reviews: 233,
    bio: "Specializes in chronic sinusitis, allergic rhinitis, and thyroid conditions. Known for his conservative yet effective treatment philosophy.",
    languages: ["Filipino", "English", "Ilocano"],
    availability: {
      0: ["08:30 AM", "10:30 AM", "01:30 PM"],
      2: ["09:00 AM", "12:00 PM", "03:00 PM"],
      4: ["10:30 AM", "01:30 PM", "04:00 PM"]
    }
  },
  {
    id: "d14",
    name: "Dr. Florencia Alvarez",
    specialtyId: "ent",
    title: "Head & Neck Surgeon",
    experience: 14,
    branch: "South Branch",
    rating: 4.9,
    reviews: 276,
    bio: "Expert in head and neck oncology, cochlear implants, and pediatric ENT. Trained at Johns Hopkins before returning to serve Philippine patients.",
    languages: ["Filipino", "English"],
    availability: {
      1: ["09:00 AM", "12:30 PM", "03:30 PM"],
      3: ["08:30 AM", "11:00 AM", "02:00 PM"],
      5: ["10:00 AM", "12:30 PM"]
    }
  },
  // Ophthalmology
  {
    id: "d15",
    name: "Dr. Domingo Ramos",
    specialtyId: "ophthalmology",
    title: "Ophthalmologist",
    experience: 10,
    branch: "North Branch",
    rating: 4.7,
    reviews: 189,
    bio: "Subspecializes in retinal diseases and diabetic eye complications. Uses the latest imaging technology to detect conditions early.",
    languages: ["Filipino", "English"],
    availability: {
      0: ["09:30 AM", "11:30 AM", "02:30 PM"],
      2: ["10:00 AM", "01:00 PM", "04:00 PM"],
      4: ["09:00 AM", "12:00 PM", "03:30 PM"]
    }
  },
  {
    id: "d16",
    name: "Dr. Estrella Fuentes",
    specialtyId: "ophthalmology",
    title: "Cataract & Refractive Surgeon",
    experience: 15,
    branch: "Central Branch",
    rating: 4.9,
    reviews: 344,
    bio: "Pioneering surgeon with over 5,000 cataract operations. Known for painless procedures and exceptional post-op patient care.",
    languages: ["Filipino", "English"],
    availability: {
      1: ["08:30 AM", "11:00 AM", "01:30 PM"],
      3: ["09:30 AM", "12:30 PM", "03:00 PM"],
      5: ["10:00 AM", "01:00 PM", "03:30 PM"]
    }
  }
];

const seedAppointments = [
  {
    id: "a1",
    specialtyId: "dermatology",
    doctorId: "d3",
    date: "2026-03-24",
    time: "11:00 AM",
    status: "Confirmed"
  },
  {
    id: "a2",
    specialtyId: "pediatrics",
    doctorId: "d5",
    date: "2026-03-28",
    time: "01:30 PM",
    status: "Pending"
  },
  {
    id: "a3",
    specialtyId: "cardiology",
    doctorId: "d1",
    date: "2026-03-22",
    time: "09:00 AM",
    status: "Confirmed"
  },
  {
    id: "a4",
    specialtyId: "orthopedics",
    doctorId: "d7",
    date: "2026-03-22",
    time: "03:00 PM",
    status: "Pending"
  },
  {
    id: "a5",
    specialtyId: "neurology",
    doctorId: "d9",
    date: "2026-03-20",
    time: "10:00 AM",
    status: "Confirmed"
  },
  {
    id: "a6",
    specialtyId: "obstetrics",
    doctorId: "d11",
    date: "2026-03-19",
    time: "09:00 AM",
    status: "Confirmed"
  },
  {
    id: "a7",
    specialtyId: "ent",
    doctorId: "d13",
    date: "2026-04-01",
    time: "08:30 AM",
    status: "Pending"
  }
];

const stepMeta = [
  {
    title: "Step 1 of 4",
    subtitle: "Select the type of care you need.",
    question: "Which specialty should we book for you?"
  },
  {
    title: "Step 2 of 4",
    subtitle: "Choose a doctor matched to your specialty.",
    question: "Who would you like to see?"
  },
  {
    title: "Step 3 of 4",
    subtitle: "Pick an available date and time.",
    question: "When works best for your appointment?"
  },
  {
    title: "Step 4 of 4",
    subtitle: "Review the appointment before final confirmation.",
    question: "Everything look right before we book it?"
  }
];

const defaultWizardState = {
  step: 0,
  specialtyId: "",
  doctorId: "",
  date: "",
  time: "",
  confirmed: false
};

let appointments = loadAppointments();
let wizardState = loadWizardState();

const wizardScreen = document.getElementById("wizardScreen");
const wizardQuestion = document.getElementById("wizardQuestion");
const stepLabel = document.getElementById("stepLabel");
const stepSubtitle = document.getElementById("stepSubtitle");
const progressFill = document.getElementById("progressFill");
const backButton = document.getElementById("backButton");
const nextButton = document.getElementById("nextButton");
const resetWizardButton = document.getElementById("resetWizard");
const resumeNotice = document.getElementById("resumeNotice");
const heroDoctorCount = document.getElementById("heroDoctorCount");
const heroPendingCount = document.getElementById("heroPendingCount");

const summarySpecialty = document.getElementById("summarySpecialty");
const summaryDoctor = document.getElementById("summaryDoctor");
const summaryDate = document.getElementById("summaryDate");
const summaryTime = document.getElementById("summaryTime");
const carouselElement = document.getElementById("careCarousel");
const carouselCaption = document.getElementById("carouselCaption");
const carouselDotsContainer = document.getElementById("carouselDots");
const carouselPrevButton = document.getElementById("carouselPrev");
const carouselNextButton = document.getElementById("carouselNext");

function loadAppointments() {
  try {
    const stored = window.localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
    if (!stored) {
      window.localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(seedAppointments));
      return [...seedAppointments];
    }
    return JSON.parse(stored);
  } catch (error) {
    return [...seedAppointments];
  }
}

function saveAppointments() {
  window.localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(appointments));
}

function loadWizardState() {
  try {
    const stored = window.localStorage.getItem(WIZARD_STORAGE_KEY);
    if (!stored) return { ...defaultWizardState };
    return { ...defaultWizardState, ...JSON.parse(stored) };
  } catch (error) {
    return { ...defaultWizardState };
  }
}

function saveWizardState() {
  window.localStorage.setItem(WIZARD_STORAGE_KEY, JSON.stringify(wizardState));
}

function resetWizard() {
  wizardState = { ...defaultWizardState };
  saveWizardState();
  renderWizard();
}

function updateWizardState(patch) {
  wizardState = { ...wizardState, ...patch };
  saveWizardState();
  renderWizard();
}

function getSpecialtyById(id) {
  return specialties.find((s) => s.id === id);
}

function getDoctorById(id) {
  return doctors.find((d) => d.id === id);
}

function formatDate(dateString) {
  if (!dateString) return "Not selected";
  const date = new Date(`${dateString}T12:00:00`);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

function getDateChoices() {
  return Array.from({ length: 7 }, (_, offset) => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + offset);
    return {
      offset,
      iso: date.toISOString().split("T")[0],
      day: new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date),
      label: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date)
    };
  });
}

function getAvailableTimes(doctor) {
  if (!doctor) return [];
  const match = getDateChoices().find((item) => item.iso === wizardState.date);
  if (!match) return [];
  return doctor.availability[match.offset] || [];
}

function renderStarRating(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    "★".repeat(full) +
    (half ? "½" : "") +
    "☆".repeat(empty)
  );
}

function updateHeroStats() {
  if (heroDoctorCount) heroDoctorCount.textContent = String(doctors.length);
  if (heroPendingCount) {
    const pendingCount = appointments.filter((a) => a.status === "Pending").length;
    heroPendingCount.textContent = String(pendingCount);
  }
}

function updateSummary() {
  const specialty = getSpecialtyById(wizardState.specialtyId);
  const doctor = getDoctorById(wizardState.doctorId);

  summarySpecialty.textContent = specialty ? specialty.label : "Not selected";
  summaryDoctor.textContent = doctor ? doctor.name : "Not selected";
  summaryDate.textContent = wizardState.date ? formatDate(wizardState.date) : "Not selected";
  summaryTime.textContent = wizardState.time || "Not selected";

  const hasPartialState = Boolean(
    wizardState.specialtyId || wizardState.doctorId || wizardState.date || wizardState.time
  );
  resumeNotice.textContent = hasPartialState
    ? "Progress detected. Patients can leave and return later without losing their selections."
    : "Your progress is stored locally in this browser so patients can safely resume later.";
}

function renderSpecialtyStep() {
  wizardScreen.innerHTML = `
    <div class="choice-grid">
      ${specialties.map((specialty) => {
        const active = wizardState.specialtyId === specialty.id ? "active" : "";
        return `
          <button type="button" class="choice-card ${active}" data-specialty-id="${specialty.id}">
            <span class="choice-badge">${specialty.badge}</span>
            <h3>${specialty.label}</h3>
            <p>${specialty.description}</p>
          </button>
        `;
      }).join("")}
    </div>
  `;

  wizardScreen.querySelectorAll("[data-specialty-id]").forEach((button) => {
    button.addEventListener("click", () => {
      updateWizardState({
        specialtyId: button.dataset.specialtyId,
        doctorId: "",
        date: "",
        time: "",
        confirmed: false
      });
    });
  });
}

function renderDoctorCards(doctorsToShow) {
  const grid = document.getElementById("doctorCardGrid");
  if (!grid) return;

  if (!doctorsToShow.length) {
    grid.innerHTML = `<div class="no-results-hint">No doctors match your search. Try a different name or branch.</div>`;
    return;
  }

  grid.innerHTML = doctorsToShow.map((doctor) => {
    const active = wizardState.doctorId === doctor.id ? "active" : "";
    const stars = renderStarRating(doctor.rating);
    return `
      <button type="button" class="doctor-card ${active}" data-doctor-id="${doctor.id}">
        <div class="doctor-avatar">${doctor.name.split(" ").slice(-1)[0].charAt(0)}${doctor.name.split(" ").slice(-2, -1)[0] ? doctor.name.split(" ").slice(-2, -1)[0].charAt(0) : ""}</div>
        <h3>${doctor.name}</h3>
        <p class="doctor-title-label">${doctor.title}</p>
        <p class="doctor-bio-snippet">${doctor.bio.substring(0, 90)}…</p>
        <div class="doctor-rating">
          <span class="star-display">${stars}</span>
          <span class="rating-score">${doctor.rating} <small>(${doctor.reviews} reviews)</small></span>
        </div>
        <div class="doctor-meta">
          <span class="meta-pill">${doctor.experience} yrs exp</span>
          <span class="meta-pill">${doctor.branch}</span>
          ${doctor.languages.map((l) => `<span class="meta-pill lang-pill">${l}</span>`).join("")}
        </div>
      </button>
    `;
  }).join("");

  grid.querySelectorAll("[data-doctor-id]").forEach((button) => {
    button.addEventListener("click", () => {
      updateWizardState({
        doctorId: button.dataset.doctorId,
        date: "",
        time: "",
        confirmed: false
      });
    });
  });
}

function renderDoctorStep() {
  const specialtyDoctors = doctors.filter((d) => d.specialtyId === wizardState.specialtyId);

  if (!specialtyDoctors.length) {
    wizardScreen.innerHTML = `<div class="empty-state">Pick a specialty first so we can show the right doctors.</div>`;
    return;
  }

  // Get unique branches for filter chips
  const branches = [...new Set(specialtyDoctors.map(d => d.branch))];

  wizardScreen.innerHTML = `
    <div class="search-filter-bar">
      <div class="search-input-wrap">
        <input class="search-filter-input" id="doctorSearch" type="search" placeholder="Search by name or specialty..." autocomplete="off" value="">
      </div>
      <button type="button" class="filter-chip active" data-branch-filter="all">All Branches</button>
      ${branches.map(b => `<button type="button" class="filter-chip" data-branch-filter="${b}">${b.replace(" Branch","")}</button>`).join("")}
    </div>
    <div class="doctor-grid" id="doctorCardGrid"></div>
  `;

  let currentBranch = "all";
  let currentSearch = "";

  function applyFilters() {
    let filtered = specialtyDoctors;
    if (currentBranch !== "all") filtered = filtered.filter(d => d.branch === currentBranch);
    if (currentSearch.trim()) {
      const q = currentSearch.trim().toLowerCase();
      filtered = filtered.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.title.toLowerCase().includes(q) ||
        d.branch.toLowerCase().includes(q)
      );
    }
    // Sort by rating desc
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    renderDoctorCards(filtered);
  }

  // Branch filter chips
  wizardScreen.querySelectorAll("[data-branch-filter]").forEach((chip) => {
    chip.addEventListener("click", () => {
      currentBranch = chip.dataset.branchFilter;
      wizardScreen.querySelectorAll("[data-branch-filter]").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      applyFilters();
    });
  });

  // Search input
  const searchInput = document.getElementById("doctorSearch");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearch = e.target.value;
      applyFilters();
    });
  }

  applyFilters();
}

function renderTimeStep() {
  const doctor = getDoctorById(wizardState.doctorId);
  const dateChoices = getDateChoices();
  const availableTimes = getAvailableTimes(doctor);

  wizardScreen.innerHTML = `
    <div>
      <p class="slot-heading">Choose a day</p>
      <div class="date-grid">
        ${dateChoices.map((dateChoice) => {
          const active = wizardState.date === dateChoice.iso ? "active" : "";
          const availableCount = ((doctor && doctor.availability[dateChoice.offset]) || []).length;
          return `
            <button type="button" class="date-card ${active}" data-date="${dateChoice.iso}">
              <h3>${dateChoice.day}</h3>
              <p>${dateChoice.label}</p>
              <p>${availableCount} slot${availableCount !== 1 ? "s" : ""}</p>
            </button>
          `;
        }).join("")}
      </div>
    </div>
    <div>
      <p class="slot-heading">Choose a time</p>
      ${wizardState.date
        ? availableTimes.length
          ? `
            <div class="time-grid">
              ${availableTimes.map((time) => {
                const active = wizardState.time === time ? "active" : "";
                return `
                  <button type="button" class="time-card ${active}" data-time="${time}">
                    <h3>${time}</h3>
                    <p>Available with ${doctor.name}</p>
                  </button>
                `;
              }).join("")}
            </div>
          `
          : `<div class="empty-state">No open slots for this doctor on the selected day. Choose another date.</div>`
        : `<div class="empty-state">Select a date to reveal open time slots.</div>`
      }
    </div>
  `;

  wizardScreen.querySelectorAll("[data-date]").forEach((button) => {
    button.addEventListener("click", () => {
      updateWizardState({ date: button.dataset.date, time: "", confirmed: false });
    });
  });

  wizardScreen.querySelectorAll("[data-time]").forEach((button) => {
    button.addEventListener("click", () => {
      updateWizardState({ time: button.dataset.time, confirmed: false });
    });
  });
}

function renderConfirmStep() {
  const specialty = getSpecialtyById(wizardState.specialtyId);
  const doctor = getDoctorById(wizardState.doctorId);

  wizardScreen.innerHTML = `
    ${wizardState.confirmed
      ? `<div class="confirmation-banner">✓ Appointment request submitted. Log in and open the matching dashboard to see it.</div>`
      : ""}
    <div class="summary-card">
      <h3>Appointment Summary</h3>
      <p><strong>Specialty:</strong> ${specialty ? specialty.label : "Not selected"}</p>
      <p><strong>Doctor:</strong> ${doctor ? doctor.name : "Not selected"}</p>
      ${doctor ? `<p><strong>Branch:</strong> ${doctor.branch}</p>` : ""}
      <p><strong>Date:</strong> ${wizardState.date ? formatDate(wizardState.date) : "Not selected"}</p>
      <p><strong>Time:</strong> ${wizardState.time || "Not selected"}</p>
    </div>
    <div class="helper-copy">
      Tapping Book Now saves a pending appointment request and keeps the latest booking available for the role-based dashboards.
    </div>
  `;
}

function renderWizard() {
  const meta = stepMeta[wizardState.step];
  const progress = ((wizardState.step + 1) / stepMeta.length) * 100;

  stepLabel.textContent = meta.title;
  stepSubtitle.textContent = meta.subtitle;
  wizardQuestion.textContent = meta.question;
  progressFill.style.width = `${progress}%`;

  backButton.disabled = wizardState.step === 0;
  nextButton.textContent = wizardState.step === 3
    ? (wizardState.confirmed ? "Booked ✓" : "Book Now")
    : "Continue";
  nextButton.disabled = !canContinue() || (wizardState.step === 3 && wizardState.confirmed);

  if (wizardState.step === 0) renderSpecialtyStep();
  else if (wizardState.step === 1) renderDoctorStep();
  else if (wizardState.step === 2) renderTimeStep();
  else renderConfirmStep();

  updateSummary();
  updateHeroStats();
}

function canContinue() {
  if (wizardState.step === 0) return Boolean(wizardState.specialtyId);
  if (wizardState.step === 1) return Boolean(wizardState.doctorId);
  if (wizardState.step === 2) return Boolean(wizardState.date && wizardState.time);
  return Boolean(wizardState.specialtyId && wizardState.doctorId && wizardState.date && wizardState.time);
}

function saveLatestBooking() {
  const specialty = getSpecialtyById(wizardState.specialtyId);
  const doctor = getDoctorById(wizardState.doctorId);

  const latestBooking = {
    specialty: specialty ? specialty.label : "Not selected",
    doctor: doctor ? doctor.name : "Not selected",
    branch: doctor ? doctor.branch : "",
    date: formatDate(wizardState.date),
    time: wizardState.time || "Not selected",
    status: "Pending"
  };

  window.localStorage.setItem(LATEST_BOOKING_KEY, JSON.stringify(latestBooking));
}

function goToNextStep() {
  if (!canContinue()) return;

  if (wizardState.step < 3) {
    updateWizardState({ step: wizardState.step + 1 });
    return;
  }

  if (!wizardState.confirmed) {
    appointments = [
      {
        id: `a${Date.now()}`,
        specialtyId: wizardState.specialtyId,
        doctorId: wizardState.doctorId,
        date: wizardState.date,
        time: wizardState.time,
        status: "Pending"
      },
      ...appointments
    ];
    saveAppointments();
    saveLatestBooking();
  }

  wizardState = { ...wizardState, confirmed: true };
  saveWizardState();
  renderWizard();
}

function goToPreviousStep() {
  if (wizardState.step === 0) return;
  updateWizardState({ step: wizardState.step - 1, confirmed: false });
}

function initCarousel() {
  if (!carouselElement || !carouselCaption || !carouselDotsContainer) return;

  const slides = Array.from(carouselElement.querySelectorAll(".carousel-slide"));
  const dots = Array.from(carouselDotsContainer.querySelectorAll(".carousel-dot"));

  if (!slides.length || slides.length !== dots.length) return;

  let activeIndex = slides.findIndex((slide) => slide.classList.contains("active"));
  activeIndex = activeIndex >= 0 ? activeIndex : 0;
  let intervalId = null;

  function renderCarousel(index) {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("active", i === activeIndex));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === activeIndex));
    carouselCaption.textContent = slides[activeIndex].dataset.slideCaption || "";
  }

  function startAutoPlay() {
    stopAutoPlay();
    intervalId = window.setInterval(() => renderCarousel(activeIndex + 1), 4800);
  }

  function stopAutoPlay() {
    if (intervalId) { window.clearInterval(intervalId); intervalId = null; }
  }

  dots.forEach((dot, i) => dot.addEventListener("click", () => { renderCarousel(i); startAutoPlay(); }));
  if (carouselPrevButton) carouselPrevButton.addEventListener("click", () => { renderCarousel(activeIndex - 1); startAutoPlay(); });
  if (carouselNextButton) carouselNextButton.addEventListener("click", () => { renderCarousel(activeIndex + 1); startAutoPlay(); });

  carouselElement.addEventListener("mouseenter", stopAutoPlay);
  carouselElement.addEventListener("mouseleave", startAutoPlay);

  renderCarousel(activeIndex);
  startAutoPlay();
}

backButton.addEventListener("click", goToPreviousStep);
nextButton.addEventListener("click", goToNextStep);
resetWizardButton.addEventListener("click", resetWizard);

renderWizard();
initCarousel();
