
// ==========================================
// VISCAN ADMIN DASHBOARD
// ==========================================

// DEMO LOGIN ONLY — NOT SECURE FOR PRODUCTION
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "viscan123";

const BOOKINGS_KEY = "viscanBookings";
const UNAVAILABLE_KEY = "viscanManualUnavailable";

const VENUES = [
  "VSU Gymnatorium",
  "Convention Center",
  "Center for Continuing Education",
  "Function Room (2nd floor)",
  "Beach Garden",
  "RDE Hall",
  "VSU Pavilion"
];

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.error("Unable to read storage:", key, error);
    return fallback;
  }
}

function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Unable to save storage:", key, error);
    alert("Unable to save changes. Please check your browser storage.");
  }
}

function getBookings() {
  const data = readStorage(BOOKINGS_KEY, []);
  return Array.isArray(data) ? data : [];
}

function getUnavailable() {
  const data = readStorage(UNAVAILABLE_KEY, {});
  return data && typeof data === "object" && !Array.isArray(data)
    ? data
    : {};
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

function getBookingValue(booking, possibleNames, fallback = "—") {
  for (const name of possibleNames) {
    if (
      booking[name] !== undefined &&
      booking[name] !== null &&
      booking[name] !== ""
    ) {
      return booking[name];
    }
  }

  return fallback;
}

function getClientName(booking) {
  return getBookingValue(booking, [
    "name",
    "fullName",
    "clientName",
    "customerName"
  ]);
}

function getVenue(booking) {
  return getBookingValue(booking, [
    "venue",
    "venueName",
    "space"
  ]);
}

function getDate(booking) {
  return getBookingValue(booking, [
    "date",
    "bookingDate",
    "eventDate"
  ]);
}

function getStatus(booking) {
  return String(getBookingValue(booking, ["status"], "Pending"));
}

function getBookingId(booking, index) {
  return booking.id ?? booking.bookingId ?? `booking-${index}`;
}

function formatDate(dateValue) {
  if (!dateValue || dateValue === "—") return "—";

  const match = String(dateValue).match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (match) {
    const date = new Date(
      Number(match[1]),
      Number(match[2]) - 1,
      Number(match[3])
    );

    return date.toLocaleDateString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return String(dateValue);
  }

  return date.toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function getStatusClass(status) {
  const normalized = String(status).toLowerCase();

  if (normalized === "approved") return "status-approved";
  if (normalized === "cancelled") return "status-cancelled";
  if (normalized === "rejected") return "status-rejected";

  return "status-pending";
}

function showStatus(status) {
  return `<span class="status ${getStatusClass(status)}">${escapeHTML(status)}</span>`;
}

// ==========================================
// TIME SLOT FUNCTIONS
// ==========================================

function timeToMinutes(time) {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(String(time || ""))) {
    return null;
  }

  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

function formatTime(time) {
  if (!time) return "Time not specified";

  const minutes = timeToMinutes(time);

  if (minutes === null) return String(time);

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const suffix = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;

  return `${hour12}:${String(mins).padStart(2, "0")} ${suffix}`;
}

function getBookingTime(booking) {
  const startTime = booking.startTime || booking.start_time || "";
  const endTime = booking.endTime || booking.end_time || "";

  if (startTime && endTime) {
    return `${formatTime(startTime)} – ${formatTime(endTime)}`;
  }

  // Support older bookings without start and end times.
  return getBookingValue(booking, [
    "hours",
    "time",
    "duration",
    "bookingTime"
  ]);
}

function isInactive(status) {
  return ["cancelled", "rejected"].includes(
    String(status).toLowerCase()
  );
}

// Check whether two bookings overlap.
function hasOverlappingBooking(candidate, candidateIndex, allBookings) {
  const venue = String(getVenue(candidate)).toLowerCase();
  const date = String(getDate(candidate));

  const start = timeToMinutes(
    candidate.startTime || candidate.start_time
  );

  const end = timeToMinutes(
    candidate.endTime || candidate.end_time
  );

  // Older bookings without valid time slots reserve the entire day.
  if (start === null || end === null || end <= start) {
    return allBookings.some((other, index) => {
      if (index === candidateIndex) return false;
      if (isInactive(getStatus(other))) return false;

      return (
        String(getVenue(other)).toLowerCase() === venue &&
        String(getDate(other)) === date
      );
    });
  }

  return allBookings.some((other, index) => {
    if (index === candidateIndex) return false;
    if (isInactive(getStatus(other))) return false;

    const sameVenue =
      String(getVenue(other)).toLowerCase() === venue;

    const sameDate =
      String(getDate(other)) === date;

    if (!sameVenue || !sameDate) return false;

    const otherStart = timeToMinutes(
      other.startTime || other.start_time
    );

    const otherEnd = timeToMinutes(
      other.endTime || other.end_time
    );

    // An older booking without a valid time reserves the entire day.
    if (
      otherStart === null ||
      otherEnd === null ||
      otherEnd <= otherStart
    ) {
      return true;
    }

    // Overlap exists when the time intervals intersect.
    return start < otherEnd && end > otherStart;
  });
}

function getBookingGuests(booking) {
  return getBookingValue(booking, [
    "guests",
    "numberOfGuests",
    "attendees",
    "guestCount"
  ]);
}

function getBookingOrganization(booking) {
  return getBookingValue(booking, [
    "organization",
    "clientType",
    "email",
    "contact"
  ]);
}

// ==========================================
// LOGIN AND LOGOUT
// ==========================================

const loginScreen = document.getElementById("loginScreen");
const dashboard = document.getElementById("dashboard");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

function showDashboard() {
  loginScreen.classList.add("hidden");
  dashboard.classList.remove("hidden");

  loadDashboard();
}

function showLogin() {
  dashboard.classList.add("hidden");
  loginScreen.classList.remove("hidden");
}

loginForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (
    username === ADMIN_USERNAME &&
    password === ADMIN_PASSWORD
  ) {
    sessionStorage.setItem("viscanAdminLoggedIn", "true");

    loginError.textContent = "";

    showDashboard();
  } else {
    loginError.textContent = "Incorrect username or password.";
  }
});

document.getElementById("logoutBtn").addEventListener("click", function() {
  sessionStorage.removeItem("viscanAdminLoggedIn");

  showLogin();
  loginForm.reset();
});

if (sessionStorage.getItem("viscanAdminLoggedIn") === "true") {
  showDashboard();
} else {
  showLogin();
}

// ==========================================
// DASHBOARD NAVIGATION
// ==========================================

const sections = {
  overview: document.getElementById("overviewSection"),
  bookings: document.getElementById("bookingsSection"),
  availability: document.getElementById("availabilitySection")
};

const pageTitles = {
  overview: "Dashboard Overview",
  bookings: "Booking Management",
  availability: "Venue Availability"
};

function showSection(sectionName) {
  if (!sections[sectionName]) return;

  Object.entries(sections).forEach(([name, section]) => {
    section.classList.toggle("hidden", name !== sectionName);
  });

  document.querySelectorAll(".nav-link").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.section === sectionName
    );
  });

  document.getElementById("pageTitle").textContent =
    pageTitles[sectionName] || "Dashboard";

  document.getElementById("sidebar").classList.remove("open");

  if (sectionName === "overview") loadOverview();
  if (sectionName === "bookings") renderBookings();
  if (sectionName === "availability") renderBlockedDates();
}

document.querySelectorAll(".nav-link").forEach(button => {
  button.addEventListener("click", () => {
    showSection(button.dataset.section);
  });
});

document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => {
    showSection(button.dataset.go);
  });
});

document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("open");
});

// ==========================================
// DASHBOARD OVERVIEW
// ==========================================

function loadDashboard() {
  document.getElementById("currentYear").textContent =
    new Date().getFullYear();

  loadOverview();
  renderBookings();
  renderBlockedDates();
}

function loadOverview() {
  const bookings = getBookings();

  const pending = bookings.filter(
    booking => getStatus(booking).toLowerCase() === "pending"
  );

  const approved = bookings.filter(
    booking => getStatus(booking).toLowerCase() === "approved"
  );

  const cancelled = bookings.filter(
    booking => ["cancelled", "rejected"].includes(
      getStatus(booking).toLowerCase()
    )
  );

  document.getElementById("totalBookings").textContent =
    bookings.length;

  document.getElementById("pendingBookings").textContent =
    pending.length;

  document.getElementById("approvedBookings").textContent =
    approved.length;

  document.getElementById("cancelledBookings").textContent =
    cancelled.length;

  const recentBody = document.getElementById("recentBookingsBody");

  const recent = [...bookings].reverse().slice(0, 5);

  if (recent.length === 0) {
    recentBody.innerHTML =
      `<tr><td colspan="4" class="empty-cell">No booking records found.</td></tr>`;
    return;
  }

  recentBody.innerHTML = recent.map(booking => `
    <tr>
      <td>
        <span class="client-name">
          ${escapeHTML(getClientName(booking))}
        </span>
      </td>

      <td>${escapeHTML(getVenue(booking))}</td>

      <td>
        ${escapeHTML(formatDate(getDate(booking)))}
        <small class="client-sub">
          ${escapeHTML(getBookingTime(booking))}
        </small>
      </td>

      <td>${showStatus(getStatus(booking))}</td>
    </tr>
  `).join("");
}

document.getElementById("refreshOverview").addEventListener(
  "click",
  loadOverview
);

// ==========================================
// BOOKING MANAGEMENT
// ==========================================

const bookingsTableBody = document.getElementById("bookingsTableBody");
const bookingSearch = document.getElementById("bookingSearch");
const statusFilter = document.getElementById("statusFilter");

function renderBookings() {
  const bookings = getBookings();

  const searchText = bookingSearch.value.toLowerCase().trim();
  const selectedStatus = statusFilter.value;

  const filtered = bookings
    .map((booking, index) => ({ booking, index }))
    .filter(({ booking }) => {
      const searchableText = [
        getClientName(booking),
        getVenue(booking),
        getBookingOrganization(booking),
        getDate(booking),
        getBookingTime(booking)
      ].join(" ").toLowerCase();

      const matchesSearch =
        searchableText.includes(searchText);

      const matchesStatus =
        selectedStatus === "all" ||
        getStatus(booking).toLowerCase() ===
          selectedStatus.toLowerCase();

      return matchesSearch && matchesStatus;
    });

  if (filtered.length === 0) {
    bookingsTableBody.innerHTML =
      `<tr><td colspan="7" class="empty-cell">No matching bookings found.</td></tr>`;
    return;
  }

  bookingsTableBody.innerHTML = filtered.map(({ booking, index }) => {
    const status = getStatus(booking);

    let actionButtons = "";

    if (status.toLowerCase() === "pending") {
      actionButtons = `
        <div class="action-buttons">
          <button
            class="action-btn approve-btn"
            data-action="approve"
            data-index="${index}"
          >Approve</button>

          <button
            class="action-btn reject-btn"
            data-action="reject"
            data-index="${index}"
          >Reject</button>
        </div>
      `;
    } else if (status.toLowerCase() === "approved") {
      actionButtons = `
        <div class="action-buttons">
          <button
            class="action-btn cancel-btn"
            data-action="cancel"
            data-index="${index}"
          >Cancel</button>
        </div>
      `;
    } else {
      actionButtons = `<span class="client-sub">No actions</span>`;
    }

    return `
      <tr>
        <td>
          <span class="client-name">
            ${escapeHTML(getClientName(booking))}
          </span>

          <span class="client-sub">
            ${escapeHTML(getBookingOrganization(booking))}
          </span>
        </td>

        <td>${escapeHTML(getVenue(booking))}</td>

        <td>${escapeHTML(formatDate(getDate(booking)))}</td>

        <td>${escapeHTML(getBookingTime(booking))}</td>

        <td>${escapeHTML(getBookingGuests(booking))}</td>

        <td>${showStatus(status)}</td>

        <td>${actionButtons}</td>
      </tr>
    `;
  }).join("");
}

bookingSearch.addEventListener("input", renderBookings);
statusFilter.addEventListener("change", renderBookings);

document.getElementById("refreshBookings").addEventListener(
  "click",
  renderBookings
);

bookingsTableBody.addEventListener("click", function(event) {
  const button = event.target.closest("button[data-action]");

  if (!button) return;

  const index = Number(button.dataset.index);
  const action = button.dataset.action;

  const bookings = getBookings();
  const booking = bookings[index];

  if (!booking) return;

  let newStatus = "";

  if (action === "approve") {
    newStatus = "Approved";
  } else if (action === "reject") {
    newStatus = "Rejected";
  } else if (action === "cancel") {
    newStatus = "Cancelled";
  }

  if (!newStatus) return;

  // Check for conflicts before approving.
  // Pending and approved bookings both reserve time slots.
  if (
    action === "approve" &&
    hasOverlappingBooking(booking, index, bookings)
  ) {
    alert(
      "This booking overlaps with another pending or approved booking for the same venue and date. Resolve the conflicting request before approving it."
    );

    return;
  }

  const confirmation = confirm(
    `Are you sure you want to change this booking status to ${newStatus}?`
  );

  if (!confirmation) return;

  booking.status = newStatus;

  saveStorage(BOOKINGS_KEY, bookings);

  renderBookings();
  loadOverview();
});

// ==========================================
// AVAILABILITY MANAGEMENT
// ==========================================

const availabilityForm = document.getElementById("availabilityForm");
const availabilityVenue = document.getElementById("availabilityVenue");
const availabilityDate = document.getElementById("availabilityDate");
const availabilityReason = document.getElementById("availabilityReason");
const blockedDatesList = document.getElementById("blockedDatesList");

// Use local date instead of UTC.
function getTodayLocal() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

availabilityDate.min = getTodayLocal();

function getUnavailableEntries() {
  const unavailable = getUnavailable();

  return Object.entries(unavailable).map(([key, value]) => {
    if (typeof value === "object" && value !== null) {
      return {
        key,
        venue: value.venue || key.split("__")[0],
        date: value.date || key.split("__")[1],
        reason: value.reason || ""
      };
    }

    const parts = key.split("__");

    return {
      key,
      venue: parts[0] || "",
      date: parts[1] || "",
      reason: typeof value === "string" ? value : ""
    };
  });
}

function hasActiveBooking(venue, date) {
  return getBookings().some(booking => {
    const sameVenue =
      String(getVenue(booking)).toLowerCase() ===
      String(venue).toLowerCase();

    const sameDate =
      String(getDate(booking)) === String(date);

    const active = !isInactive(getStatus(booking));

    return sameVenue && sameDate && active;
  });
}

// Block an entire date for a venue.
availabilityForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const venue = availabilityVenue.value;
  const date = availabilityDate.value;
  const reason = availabilityReason.value.trim();

  if (!venue || !date) {
    alert("Please select a venue and date.");
    return;
  }

  if (date < getTodayLocal()) {
    alert("You cannot block a date in the past.");
    return;
  }

  // Do not block a full day when an active reservation already exists.
  if (hasActiveBooking(venue, date)) {
    alert(
      "This venue already has an active booking on the selected date. Review the booking before blocking the entire day."
    );

    return;
  }

  const unavailable = getUnavailable();
  const key = `${venue}__${date}`;

  if (Object.prototype.hasOwnProperty.call(unavailable, key)) {
    alert("This date is already blocked for the selected venue.");
    return;
  }

  unavailable[key] = {
    venue,
    date,
    reason,
    createdAt: new Date().toISOString()
  };

  saveStorage(UNAVAILABLE_KEY, unavailable);

  alert("The selected date has been blocked successfully.");

  availabilityForm.reset();
  availabilityDate.min = getTodayLocal();

  renderBlockedDates();
});

// Display manually blocked dates.
function renderBlockedDates() {
  const entries = getUnavailableEntries()
    .sort((a, b) => a.date.localeCompare(b.date));

  if (entries.length === 0) {
    blockedDatesList.innerHTML =
      `<p class="empty-message">No manually blocked dates.</p>`;
    return;
  }

  blockedDatesList.innerHTML = entries.map(entry => `
    <div class="blocked-date-item">
      <div>
        <strong>${escapeHTML(entry.venue)}</strong>

        <small>${escapeHTML(formatDate(entry.date))}</small>

        ${entry.reason
          ? `<small>Reason: ${escapeHTML(entry.reason)}</small>`
          : ""}
      </div>

      <button
        class="reopen-btn"
        data-reopen="${escapeHTML(entry.key)}"
        type="button"
      >Reopen Date</button>
    </div>
  `).join("");
}

// Reopen a manually blocked date.
blockedDatesList.addEventListener("click", function(event) {
  const button = event.target.closest("[data-reopen]");

  if (!button) return;

  const key = button.dataset.reopen;
  const unavailable = getUnavailable();

  if (!Object.prototype.hasOwnProperty.call(unavailable, key)) {
    return;
  }

  const entry = getUnavailableEntries().find(
    item => item.key === key
  );

  if (!entry) return;

  const confirmation = confirm(
    `Are you sure you want to reopen ${entry.venue} on ${formatDate(entry.date)}?`
  );

  if (!confirmation) return;

  // Reopening only removes the manual date restriction.
  // It does not cancel or modify any existing bookings.
  delete unavailable[key];

  saveStorage(UNAVAILABLE_KEY, unavailable);

  renderBlockedDates();

  alert("The selected date is now available again.");
});

document.getElementById("refreshAvailability").addEventListener(
  "click",
  renderBlockedDates
);

// ==========================================
// CROSS-TAB REFRESH
// ==========================================

window.addEventListener("storage", function(event) {
  if (
    event.key === BOOKINGS_KEY ||
    event.key === UNAVAILABLE_KEY
  ) {
    loadOverview();
    renderBookings();
    renderBlockedDates();
  }
});
