
/* =====================================================
   VISCAN SPACE FINDER
   COMPLETE UPDATED JAVASCRIPT
   Includes:
   - Venue directory
   - Search and filters
   - Venue details and rates
   - Booking modal
   - Booking validation
   - Estimated pricing calculator
   - Booking history
   - Availability calendar
   - Admin availability management
   - Listing form
===================================================== */


/* =====================================================
   1. VENUE DATA
===================================================== */

const venues = [
  {
    name: "VSU Gymnatorium",
    capacity: 1000,
    description: "A large campus venue for university programs, assemblies, and events.",
    image: "assets/gymnatorium.png",
    facilities: ["LED wall", "Sound system (rates listed separately)"],
    location: "VSU campus",
    rates: [
      ["Venue rental", "General rental rate", "₱600", "First hour"],
      ["Venue rental", "General rental rate", "₱300", "Each consecutive hour"],
      ["LED wall", "Student councils / organizations", "₱3,000", "First 4 hours or below"],
      ["LED wall", "Student councils / organizations", "₱500", "Each excess hour"],
      ["LED wall", "External clients", "₱12,000", "First 4 hours or below"],
      ["LED wall", "External clients", "₱1,000", "Each excess hour"],
      ["LED wall", "PWD / senior citizens / government agencies", "₱9,600", "First 4 hours or below; 20% discount"],
      ["High-end round sound system", "Student organizations", "₱3,500", "First 4 hours; includes setup"],
      ["Extended sound system use", "Student organizations", "₱6,000", "Beyond 4 hours up to 8 hours"],
      ["High-end round sound system", "External clients", "₱10,000", "Maximum 8 hours"],
      ["High-end round sound system", "PWD / senior citizens / government agencies", "₱8,000", "20% discount"],
      ["High-end round sound system", "VSU-affiliated / special-interest / religious groups", "₱5,000", "50% discount"]
    ],
    note: "Venue rental is ₱600 for the first hour and ₱300 for each consecutive hour. Sound-system charges are separate."
  },
  {
    name: "Convention Center",
    contact: { phone: "+63 53 565 0600", local: "1044" },
    capacity: 1000,
    description: "A campus venue for large gatherings, programs, and institutional events.",
    image: "assets/convention-center.jpg",
    facilities: ["Specific facilities not listed in the supplied document"],
    location: "VSU campus",
    rates: [
      ["Venue rental", "VSU employees and relatives", "₱4,000", "First 4 hours"],
      ["Venue rental", "VSU employees and relatives", "₱1,500", "Each succeeding hour"],
      ["Venue rental", "Outsiders", "₱10,000", "First 4 hours"],
      ["Venue rental", "Outsiders", "₱2,000", "Each succeeding hour"]
    ],
    note: "The document gives a capacity of 1,000. It does not specify included equipment or other facilities."
  },
  {
    name: "Center for Continuing Education",
    capacity: null,
    description: "A facility with air-conditioned and non-air-conditioned spaces for academic, organizational, and personal activities.",
    image: "assets/center-for-continuing-education.jpg",
    facilities: [
      "Air-conditioned and non-air-conditioned rooms",
      "Sound system rental",
      "LCD/DLP rental",
      "Videoke rental",
      "Utility personnel"
    ],
    location: "1st Floor, VSU campus",
    rates: [
      ["Venue rental", "VSU units / departments, without aircon", "₱350", "First hour"],
      ["Venue rental", "VSU units / departments, without aircon", "₱50", "Each succeeding hour"],
      ["Utility fee", "Without aircon", "₱170", "Per hour"],
      ["Venue rental", "Recognized VSU organizations, without aircon", "₱400", "First hour"],
      ["Venue rental", "Recognized VSU organizations, without aircon", "₱100", "Each succeeding hour"],
      ["Venue rental", "Personal activities of VSU employees, without aircon", "₱450", "First hour"],
      ["Venue rental", "Personal activities of VSU employees, without aircon", "₱150", "Each succeeding hour"],
      ["Venue rental", "VSU students, without aircon", "₱50", "Per hour"],
      ["Venue rental", "Non-VSU employees / students, without aircon", "₱550", "First hour"],
      ["Venue rental", "Non-VSU employees / students, without aircon", "₱350", "Each succeeding hour"],
      ["Venue rental", "Church-related activities, without aircon", "₱500", "First hour"],
      ["Venue rental", "Church-related activities, without aircon", "₱200", "Each succeeding hour"],
      ["Venue rental", "VSU units / departments, with aircon", "₱510", "First hour"],
      ["Venue rental", "VSU units / departments, with aircon", "₱290", "Each succeeding hour"],
      ["Utility fee", "With aircon", "₱280", "Per hour"],
      ["Venue rental", "Recognized VSU organizations, with aircon", "₱550", "First hour"],
      ["Venue rental", "Recognized VSU organizations, with aircon", "₱350", "Each succeeding hour"],
      ["Venue rental", "Personal activities of VSU employees, with aircon", "₱600", "First hour"],
      ["Venue rental", "Personal activities of VSU employees, with aircon", "₱350", "Each succeeding hour"],
      ["Venue rental", "VSU students, with aircon", "₱510", "First hour"],
      ["Venue rental", "VSU students, with aircon", "₱225", "Each succeeding hour"],
      ["Venue rental", "Non-VSU employees / students, with aircon", "₱1,000", "First hour"],
      ["Venue rental", "Non-VSU employees / students, with aircon", "₱450", "Each succeeding hour"],
      ["Venue rental", "Church-related activities, with aircon", "₱900", "First hour"],
      ["Venue rental", "Church-related activities, with aircon", "₱425", "Each succeeding hour"],
      ["Sound system", "VSU clients", "₱500", "Per day"],
      ["Sound system", "Non-VSU clients", "₱1,000", "Per day"],
      ["LCD/DLP", "All clients", "₱300", "Per day"],
      ["Videoke", "All clients", "₱700", "Per use"],
      ["Utility personnel", "Beyond 5 PM and weekends", "₱100", "Per hour"]
    ],
    note: "Utility fees are separate from venue rental. Rates differ depending on air-conditioning use and client category. Confirm the applicable category and total charges with the venue office."
  },
  {
    name: "Function Room (2nd floor)",
    capacity: null,
    description: "A second-floor function room with air-conditioned and non-air-conditioned rental options for VSU and non-VSU clients.",
    image: "",
    facilities: [
      "Sound system (2 microphones and basic amplifier)",
      "Air-conditioned and non-air-conditioned rental options",
      "Utility personnel fee"
    ],
    location: "2nd floor, VSU campus",
    rates: [
      ["Venue rental", "VSU employees / students, without aircon", "₱550", "First hour"],
      ["Venue rental", "VSU employees / students, without aircon", "₱350", "Each succeeding hour"],
      ["Utility fee", "Without aircon", "₱285", "Per hour"],
      ["Venue rental", "Non-VSU employees, without aircon", "₱600", "First hour"],
      ["Venue rental", "Non-VSU employees, without aircon", "₱350", "Each succeeding hour"],
      ["Venue rental", "VSU employees / students, with aircon", "₱600", "First hour"],
      ["Venue rental", "VSU employees / students, with aircon", "₱350", "Each succeeding hour"],
      ["Utility fee", "With aircon", "₱360", "Per hour"],
      ["Venue rental", "Non-VSU employees, with aircon", "₱1,000", "First hour"],
      ["Venue rental", "Non-VSU employees, with aircon", "₱450", "Each succeeding hour"]
    ],
    note: "The supplied rates document states that rental includes a sound system (2 microphones and basic amplifier). Utility fees are ₱285/hour without air-conditioning and ₱360/hour with air-conditioning. Capacity is not specified."
  },
  {
    name: "Beach Garden",
    capacity: null,
    description: "A recreational and event area with non-exclusive and exclusive use rates.",
    image: "assets/Beach_Resort.jpg",
    facilities: [
      "Swimming pool",
      "Kiosks / cottages",
      "Floating cottage",
      "Function hall",
      "View deck",
      "Social park area",
      "Riverside area"
    ],
    location: "VSU campus",
    rates: [
      ["Entrance fee", "Non-exclusive use", "₱10 per head", "Entrance"],
      ["Swimming pool", "Children 10 and below", "₱25", "Per person"],
      ["Swimming pool", "VSU employees and students", "₱50", "Per person"],
      ["Swimming pool", "Non-VSU employees and students", "₱75", "Per person"],
      ["Kiosk / cottage", "Social Park Area", "₱200", "Per use"],
      ["Kiosk / cottage", "Swimming Pool Area", "₱250", "Per use"],
      ["Floating cottage", "Group usage", "₱100", "Per hour"],
      ["Floating cottage", "Individual usage", "₱25", "Per head"],
      ["Function hall", "Non-exclusive use", "₱3,700", "Per use"],
      ["View deck", "Non-exclusive use", "₱800", "Per use"],
      ["Social Park Area", "Exclusive use", "₱4,500", "Per use"],
      ["Swimming Pool Area", "Exclusive use", "₱6,000", "Per use"],
      ["Riverside Area", "Exclusive use", "₱2,000", "Per use"]
    ],
    note: "The source labels these as non-exclusive and exclusive rates. It does not specify venue capacity."
  },
  {
    name: "RDE Hall",
    capacity: null,
    description: "A campus hall with venue rental and sound-system rates for different client categories.",
    image: "assets/RDE-Hall.jpg",
    facilities: [
      "LED wall",
      "Basic sound system",
      "High-end round sound system"
    ],
    location: "VSU campus",
    rates: [
      ["Venue rental", "Student councils / organizations", "₱2,000", "First 4 hours or below"],
      ["Venue rental", "Student councils / organizations", "₱500", "Each excess hour"],
      ["Venue rental", "External clients", "₱4,000", "First 4 hours or below"],
      ["Venue rental", "External clients", "₱1,000", "Each excess hour"],
      ["LED wall", "Student councils / organizations", "₱3,000", "First 4 hours or below"],
      ["LED wall", "Student councils / organizations", "₱500", "Each excess hour"],
      ["LED wall", "External clients", "₱12,000", "First 4 hours or below"],
      ["LED wall", "External clients", "₱1,000", "Each excess hour"],
      ["LED wall", "PWD / senior citizens / government agencies", "₱9,600", "First 4 hours or below"],
      ["High-end round sound system", "Student organizations", "₱3,500", "First 4 hours; includes setup"],
      ["Extended high-end sound use", "Student organizations", "₱6,000", "Beyond 4 hours up to 8 hours"],
      ["Basic sound system", "Student organizations", "₱500 first 4 hours; ₱100 excess/hour", "As stated in source"],
      ["High-end round sound system", "External clients", "₱10,000", "Maximum 8 hours"],
      ["High-end round sound system", "PWD / senior citizens / government agencies", "₱8,000", "20% discount"],
      ["High-end round sound system", "VSU-affiliated / special-interest / religious groups", "₱5,000", "50% discount"]
    ],
    note: "Some VSU-affiliated / special-interest / religious-group venue and LED-wall rates are incomplete in the supplied source. Confirm charges with the venue office."
  },
  {
    name: "VSU Pavilion",
    capacity: null,
    description: "A campus pavilion offering meal packages for events, with separate corkage and electricity charges.",
    image: "",
    facilities: [
      "Meal Package A: 2 meat, 1 seafood, 1 pasta/vegetable, drinks and dessert",
      "Meal Package B: 1 meat, 1 seafood, 1 pasta, 1 vegetable, drinks and dessert",
      "Lechon, beer and outside-food corkage options",
      "Electricity for videoke / sound system"
    ],
    location: "VSU campus",
    rates: [
      ["Meal package", "Package A", "₱330 per person", "2 meat, 1 seafood, 1 pasta/vegetable, drinks and dessert"],
      ["Meal package", "Package B", "₱280 per person", "1 meat, 1 seafood, 1 pasta, 1 vegetable, drinks and dessert"],
      ["Corkage", "Lechon", "₱300", "Per item / charge as listed"],
      ["Corkage", "Beer", "₱100", "Per case"],
      ["Corkage", "Food", "₱100", "Per dish"],
      ["Electricity", "Videoke / sound system", "₱200", "Per use"]
    ],
    note: "Meal packages are priced per person. Corkage and electricity charges are additional. The source document does not specify a venue rental fee or capacity for the Pavilion."
  }
];


/* =====================================================
   2. GLOBAL VARIABLES AND HELPERS
===================================================== */

let selectedVenue = null;

let bookings = JSON.parse(
  localStorage.getItem("viscanBookings") || "[]"
);

let manualUnavailable = JSON.parse(
  localStorage.getItem("viscanManualUnavailable") || "{}"
);

let selectedBookingDate = "";

let calendarMonth = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  1
);

const $ = id => document.getElementById(id);

function localDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function venueDateKey(venue, date) {
  return `${venue}__${date}`;
}

function isBlockingBooking(booking) {
  const status = String(booking.status || "Pending").toLowerCase();
  return !["cancelled", "rejected"].includes(status);
}

function isDateBooked(venue, date) {
  return bookings.some(b =>
    b.venue === venue &&
    b.date === date &&
    isBlockingBooking(b)
  );
}

function isDateUnavailable(venue, date) {
  return Boolean(manualUnavailable[venueDateKey(venue, date)]);
}

function timeToMinutes(time) {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(String(time || ""))) {
    return null;
  }

  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function bookingTimesOverlap(venue, date, startTime, endTime, ignoreId = null) {
  const newStart = timeToMinutes(startTime);
  const newEnd = timeToMinutes(endTime);

  if (newStart === null || newEnd === null || newEnd <= newStart) {
    return true;
  }

  return bookings.some(b => {
    if (
      b.venue !== venue ||
      b.date !== date ||
      !isBlockingBooking(b) ||
      (ignoreId !== null && String(b.id) === String(ignoreId))
    ) {
      return false;
    }

    if (!b.startTime || !b.endTime) return true;

    const existingStart = timeToMinutes(b.startTime);
    const existingEnd = timeToMinutes(b.endTime);

    if (existingStart === null || existingEnd === null) return true;

    return newStart < existingEnd && newEnd > existingStart;
  });
}

function formatTime(time) {
  if (!time) return "Time not specified";

  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;

  return `${hour12}:${String(m).padStart(2, "0")} ${suffix}`;
}

function saveAvailability() {
  localStorage.setItem(
    "viscanManualUnavailable",
    JSON.stringify(manualUnavailable)
  );

  localStorage.setItem(
    "viscanBookings",
    JSON.stringify(bookings)
  );
}


/* =====================================================
   3. PAGE NAVIGATION
===================================================== */

function showPage(id) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.toggle("active", page.id === id);
  });

  document.querySelector(".main-nav")?.classList.remove("open");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  if (id === "spaces") filterVenues();
  if (id === "bookings") renderBookings();
  if (id === "map") renderMapList();
}


/* =====================================================
   4. VENUE CARDS AND IMAGES
===================================================== */

function photoMarkup(v) {
  return v.image
    ? `<img src="${v.image}" alt="${v.name}" loading="lazy" onerror="this.closest('.venue-photo, .detail-photo')?.classList.add('image-missing'); this.remove();">`
    : `<div class="photo-fallback"><span>PHOTO NOT PROVIDED</span><strong>${v.name}</strong></div>`;
}

function cardMarkup(v) {
  const idx = venues.indexOf(v);

  return `
    <article class="venue-card">
      <div class="venue-photo">
        ${photoMarkup(v)}
      </div>

      <div class="venue-body">
        <h3>${v.name}</h3>
        <p>${v.description}</p>

        <div class="chips">
          <span class="chip">
            ${v.capacity
              ? `Up to ${v.capacity.toLocaleString()} people`
              : "Capacity not specified"}
          </span>

          <span class="chip">${v.rates.length} rate entries</span>
        </div>

        <div class="venue-card-bottom">
          <strong>
            ${v.name === "Beach Garden" ? "Multiple rates" : "Rates available"}
            <small>See detailed rate schedule</small>
          </strong>

          <button onclick="openVenueByIndex(${idx})">
            View details →
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderCards(target, items) {
  const element = $(target);
  if (!element) return;

  element.innerHTML = items.length
    ? items.map(cardMarkup).join("")
    : `<div class="empty-state">
        No venues match your search. Try changing your filters.
       </div>`;
}


/* =====================================================
   5. HOMEPAGE AND SEARCH
===================================================== */

function renderHome() {
  renderCards("featuredGrid", venues.slice(0, 3));
}

function filterVenues() {
  const q = ($("venueSearch")?.value || "").toLowerCase();
  const cap = $("capacityFilter")?.value || "";
  const client = $("clientFilter")?.value || "";

  const items = venues.filter(v => {
    const searchableText =
      (v.name + " " + v.description + " " + v.facilities.join(" "))
      .toLowerCase();

    const matchesSearch = searchableText.includes(q);
    const matchesCapacity = !cap || (v.capacity || 0) >= Number(cap);
    const rateText = v.rates.map(row => `${row[1]} ${row[2]}`).join(" ").toLowerCase();
    const hasClientSpecificRates = /student|organization|vsu|employee|unit|department|recognized|external|outsider|non-vsu/i.test(rateText);
    const matchesClient = !client || !hasClientSpecificRates || (client === "student"
      ? /student|organization|vsu|employee|unit|department|recognized/i.test(rateText)
      : /external|outsider|non-vsu/i.test(rateText));

    return matchesSearch && matchesCapacity && matchesClient;
  });

  renderCards("venueGrid", items);

  if ($("resultCount")) {
    $("resultCount").textContent =
      `Showing ${items.length} of ${venues.length} venues`;
  }
}

function clearFilters() {
  if ($("venueSearch")) $("venueSearch").value = "";
  if ($("capacityFilter")) $("capacityFilter").value = "";
  if ($("clientFilter")) $("clientFilter").value = "";
  filterVenues();
}

function searchFromHome() {
  if (!$("venueSearch") || !$("homeSearch") || !$("homeGuests")) return;

  $("venueSearch").value = $("homeSearch").value;

  const guests = Number($("homeGuests").value);

  $("capacityFilter").value =
    guests > 0 && guests <= 500
      ? "500"
      : guests > 500
        ? "1000"
        : "";

  showPage("spaces");
  filterVenues();
}


/* =====================================================
   6. VENUE DETAILS
===================================================== */

function openVenue(name) {
  const v = venues.find(x => x.name === name);
  if (v) openVenueByIndex(venues.indexOf(v));
}

function openVenueByIndex(i) {
  selectedVenue = venues[i];

  const v = selectedVenue;

  const rateRows = v.rates.map(r => `
    <tr>
      <td>${r[0]}</td>
      <td>${r[1]}</td>
      <td><strong>${r[2]}</strong></td>
      <td>${r[3]}</td>
    </tr>
  `).join("");

  $("venueDetails").innerHTML = `
    <div class="detail-layout">
      <div>
        <div class="detail-photo">
          ${photoMarkup(v)}
        </div>

        <div class="rate-section">
          <h3>Facilities and amenities</h3>
          <ul class="facilities-list">
            ${v.facilities.map(f => `<li>${f}</li>`).join("")}
          </ul>
        </div>
      </div>

      <div class="detail-panel">
        <span class="eyebrow green">VSU FACILITY</span>
        <h1>${v.name}</h1>
        <p>${v.description}</p>

        <div class="detail-stats">
          <div class="stat">
            <small>Capacity</small>
            <strong>
              ${v.capacity
                ? v.capacity.toLocaleString() + " people"
                : "Not specified"}
            </strong>
          </div>

          <div class="stat">
            <small>Location</small>
            <strong>${v.location}</strong>
          </div>
        </div>

        ${v.contact ? `
          <section class="rate-section venue-contact">
            <h3>Contact for More Information</h3>
            <p>
              <a href="tel:+63535650600">${v.contact.phone}</a>
              <strong>Local ${v.contact.local}</strong>
            </p>
          </section>
        ` : ""}

        <div class="rate-section">
          <h3>Published rates</h3>

          <table class="rate-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Client category</th>
                <th>Rate</th>
                <th>Terms</th>
              </tr>
            </thead>
            <tbody>${rateRows}</tbody>
          </table>

          <div class="rate-note">${v.note}</div>
        </div>

        <section class="availability-section">
          <h3>Venue availability</h3>
          <p class="availability-help">
            Choose a green date to request a time slot. Multiple bookings may share a date when their times do not overlap. Red dates are manually blocked.
          </p>

          <div id="venueAvailabilityCalendar"></div>

          <div class="availability-legend">
            <span><i class="availability-dot available"></i> Available</span>
            <span><i class="availability-dot unavailable"></i> Unavailable</span>
          </div>
        </section>

        <div class="detail-actions">
          <button class="btn btn-primary" onclick="openBooking()">
            Request booking
          </button>

          <button class="btn btn-outline" onclick="showPage('spaces')">
            Back to directory
          </button>
        </div>
      </div>
    </div>
  `;

  showPage("details");

  calendarMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

  renderVenueCalendar();
}


/* =====================================================
   7. CAMPUS MAP VENUE LIST
===================================================== */

function renderMapList() {
  const target = $("mapVenueList");
  if (!target) return;

  target.innerHTML = venues.map((v, i) => `
    <li>
      <button onclick="openVenueByIndex(${i})">
        ${v.name}
      </button>
    </li>
  `).join("");
}


/* =====================================================
   8. BOOKING MODAL
===================================================== */

function openBooking() {
  if (!selectedVenue) {
    alert("Please select a venue first.");
    return;
  }

  const modal = $("bookingModal");
  const form = $("bookingForm");
  const venueName = $("modalVenueName");
  const pricingOptions = $("pricingOptions");

  if (!modal || !form || !venueName || !pricingOptions) {
    console.error("Missing booking modal elements.");
    alert("Unable to open booking form. Please check the HTML.");
    return;
  }

  const venueField = form.querySelector('[name="venue"]');
  const dateInput = form.querySelector('[name="date"]');

  if (!venueField || !dateInput) {
    console.error("Missing venue or date field.");
    alert("Booking form is missing a required field.");
    return;
  }

  venueName.textContent = selectedVenue.name;
  venueField.value = selectedVenue.name;

  dateInput.min = localDateKey(new Date());

  if (
    selectedBookingDate &&
    selectedBookingDate >= dateInput.min &&
    !isDateUnavailable(selectedVenue.name, selectedBookingDate)
  ) {
    dateInput.value = selectedBookingDate;
  } else {
    dateInput.value = "";
  }

  modal.classList.add("show");

  initBookingPricing();
  updatePriceSummary();
}
function closeBooking() {
  const modal = document.getElementById("bookingModal");

  if (modal) {
    modal.classList.remove("show");
  }
}

/* =====================================================
   9. PRICING CALCULATOR HELPERS
===================================================== */

function money(amount) {
  return "₱" + Number(amount || 0).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function getPricingForm() {
  return $("pricingOptions");
}


function getPricingValue(name) {
  const container = getPricingForm();
  if (!container) return "";

  const field = container.querySelector(`[name="${name}"]`);
  return field ? field.value : "";
}

function getPricingNumber(name) {
  return Number(getPricingValue(name) || 0);
}

function getPricingChecked(name) {
  const container = getPricingForm();
  if (!container) return false;

  const field = container.querySelector(`[name="${name}"]`);
  return field ? field.checked : false;
}


function addPriceLine(lines, label, amount) {
  if (amount > 0) {
    lines.push({
      label,
      amount: Number(amount.toFixed(2))
    });
  }
}

function firstAndSucceeding(hours, firstHour, succeedingHour) {
  if (hours <= 0) return 0;

  return firstHour + Math.max(0, Math.ceil(hours) - 1) * succeedingHour;
}

function firstFourHours(hours, firstFourRate, excessRate) {
  if (hours <= 0) return 0;

  return firstFourRate + Math.max(0, Math.ceil(hours) - 4) * excessRate;
}

function pricingField(label, name, options, required = true) {
  return `
    <label class="pricing-field">
      <span>${label}</span>
      <select name="${name}" ${required ? "required" : ""}>
        ${options.map(option => `
          <option value="${option.value}">${option.label}</option>
        `).join("")}
      </select>
    </label>
  `;
}

function pricingNumber(label, name, min = 0, value = 0) {
  return `
    <label class="pricing-field">
      <span>${label}</span>
      <input
        type="number"
        name="${name}"
        min="${min}"
        value="${value}"
        step="1"
      >
    </label>
  `;
}

function pricingCheckbox(label, name) {
  return `
    <label class="pricing-checkbox">
      <input type="checkbox" name="${name}">
      <span>${label}</span>
    </label>
  `;
}


/* =====================================================
   10. DISPLAY PRICING OPTIONS
===================================================== */

function initBookingPricing() {
  const pricingOptions = $("pricingOptions");

  if (!pricingOptions || !$("priceSummary") || !selectedVenue) return;

  const venue = selectedVenue.name;
  let html = "";

  if (venue === "VSU Gymnatorium") {
    html = `
      <h3>Gymnatorium Pricing Options</h3>

      ${pricingField("Client category", "gymCategory", [
        { value: "student", label: "Student organizations" },
        { value: "external", label: "External clients" },
        { value: "pwd", label: "PWD / Senior citizens / Government agencies" },
        { value: "special", label: "VSU-affiliated / Special-interest / Religious groups" }
      ])}

      ${pricingField("LED wall", "gymLed", [
        { value: "none", label: "No LED wall" },
        { value: "yes", label: "Use LED wall" }
      ], false)}

      ${pricingField("Sound system", "gymSound", [
        { value: "none", label: "No sound system" },
        { value: "highend", label: "High-end round sound system" }
      ])}

      <p class="pricing-note">
        LED wall and sound-system charges are separate from venue rental. The source does not provide a complete LED-wall rate for VSU-affiliated / special-interest / religious groups.
      </p>
    `;
  }

  else if (venue === "Convention Center") {
    html = `
      <h3>Convention Center Pricing Options</h3>

      ${pricingField("Client category", "conventionCategory", [
        { value: "vsu", label: "VSU employees and relatives" },
        { value: "external", label: "Outsiders / External clients" }
      ])}

      <p class="pricing-note">
        Equipment and additional facility charges are not included because their rates were not provided.
      </p>
    `;
  }

  else if (venue === "Center for Continuing Education") {
    html = `
      <h3>Center for Continuing Education Pricing Options</h3>

      ${pricingField("Client category", "cceCategory", [
        { value: "unit", label: "VSU units / centers / institutes / departments" },
        { value: "organization", label: "Recognized VSU organizations" },
        { value: "employee", label: "Personal activities of VSU employees" },
        { value: "student", label: "VSU students (USSO-approved activities)" },
        { value: "external", label: "Non-VSU employees / students" },
        { value: "church", label: "Church-related activities" }
      ])}

      ${pricingField("Room setup", "cceAircon", [
        { value: "no", label: "Without air-conditioning" },
        { value: "yes", label: "With air-conditioning" }
      ])}

      <h4>Additional amenities</h4>

      ${pricingField("Sound system", "cceSound", [
        { value: "none", label: "Not needed" },
        { value: "vsu", label: "VSU client — ₱500/day" },
        { value: "external", label: "Non-VSU client — ₱1,000/day" }
      ], false)}

      ${pricingCheckbox("LCD/DLP projector — ₱300/day", "cceLcd")}
      ${pricingCheckbox("Videoke — ₱700/use", "cceVideoke")}
      ${pricingCheckbox("Utility personnel for activities beyond 5 PM or weekends — ₱100/hour", "ccePersonnel")}

      <p class="pricing-note">
        Utility personnel charges are estimates and must be confirmed with the venue office.
      </p>
    `;
  }

  else if (venue === "Function Room (2nd floor)") {
    html = `
      <h3>Function Room Pricing Options</h3>

      ${pricingField("Client category", "functionCategory", [
        { value: "vsu", label: "VSU employees / students" },
        { value: "external", label: "Non-VSU employees / students" }
      ])}

      ${pricingField("Room setup", "functionAircon", [
        { value: "no", label: "Without air-conditioning" },
        { value: "yes", label: "With air-conditioning" }
      ])}

      <p class="pricing-note">
        The rental includes a sound system (2 microphones and basic amplifier). Utility fees are added per hour. The VSU air-conditioned first-hour rate is ₱600/hour.
      </p>
    `;
  }

  else if (venue === "Beach Garden") {
    html = `
      <h3>Beach Garden Pricing Options</h3>

      ${pricingField("Area reservation", "beachArea", [
        { value: "none", label: "No area reservation" },
        { value: "function", label: "Function hall — non-exclusive (₱3,700/use)" },
        { value: "viewdeck", label: "View deck — non-exclusive (₱800/use)" },
        { value: "social", label: "Social Park Area — exclusive (₱4,500/use)" },
        { value: "pool", label: "Swimming Pool Area — exclusive (₱6,000/use)" },
        { value: "riverside", label: "Riverside Area — exclusive (₱2,000/use)" }
      ])}

      ${pricingNumber("Number of guests using the non-exclusive entrance (₱10/head)", "beachEntranceGuests")}

      ${pricingField("Swimming pool user category", "beachPoolCategory", [
        { value: "none", label: "No swimming pool use" },
        { value: "children", label: "Children aged 10 and below — ₱25/person" },
        { value: "vsu", label: "VSU employees / students — ₱50/person" },
        { value: "external", label: "Non-VSU employees / students — ₱75/person" }
      ], false)}

      ${pricingNumber("Number of swimming pool users", "beachPoolGuests")}

      ${pricingField("Kiosk / cottage", "beachCottage", [
        { value: "none", label: "None" },
        { value: "social", label: "Social Park Area — ₱200/use" },
        { value: "pool", label: "Swimming Pool Area — ₱250/use" }
      ], false)}

      ${pricingField("Floating cottage", "beachFloating", [
        { value: "none", label: "None" },
        { value: "group", label: "Group usage — ₱100/hour" },
        { value: "individual", label: "Individual usage — ₱25/head" }
      ], false)}

      ${pricingNumber("Number of floating cottage users (individual usage)", "beachFloatingGuests")}

      <p class="pricing-note">
        Select only the area and amenities you intend to use. Exclusive and non-exclusive arrangements may not be compatible. Confirm your selections with the venue office.
      </p>
    `;
  }

  else if (venue === "VSU Pavilion") {
    html = `
      <h3>VSU Pavilion Options</h3>

      ${pricingField("Meal package", "pavilionMeal", [
        { value: "none", label: "No meal package selected" },
        { value: "330", label: "Package A — ₱330/person" },
        { value: "280", label: "Package B — ₱280/person" }
      ], false)}

      ${pricingNumber("Number of meal servings", "pavilionGuests", 0, 0)}

      <h4>Additional corkage and charges</h4>
      ${pricingNumber("Lechon corkage — ₱300 each", "pavilionLechon", 0, 0)}
      ${pricingNumber("Beer corkage — ₱100 per case", "pavilionBeer", 0, 0)}
      ${pricingNumber("Food corkage — ₱100 per dish", "pavilionFood", 0, 0)}
      ${pricingCheckbox("Electricity for videoke / sound system — ₱200 per use", "pavilionElectricity")}

      <p class="pricing-note">
        The Pavilion rates supplied are meal and additional-charge rates. No separate venue rental fee or capacity was listed in the source PDF. Enter the meal serving count separately from the event guest count.
      </p>
    `;
  }

  else if (venue === "RDE Hall") {
    html = `
      <h3>RDE Hall Pricing Options</h3>

      ${pricingField("Client category", "rdeCategory", [
        { value: "student", label: "Student councils / organizations" },
        { value: "external", label: "External clients" }
      ])}

      ${pricingField("LED wall", "rdeLed", [
        { value: "none", label: "No LED wall" },
        { value: "yes", label: "Use LED wall" }
      ], false)}

      ${pricingField("Sound system", "rdeSound", [
        { value: "none", label: "No sound system" },
        { value: "basic", label: "Basic sound system (student organizations)" },
        { value: "highend", label: "High-end round sound system" }
      ], false)}

      ${pricingField("High-end sound-system client category", "rdeSoundCategory", [
        { value: "student", label: "Student organizations" },
        { value: "external", label: "External clients" },
        { value: "pwd", label: "PWD / Senior citizens / Government agencies" },
        { value: "special", label: "VSU-affiliated / Special-interest / Religious groups" }
      ], false)}

      <p class="pricing-note">
        Some RDE Hall rates are incomplete in the supplied source. The calculator does not invent those rates.
      </p>
    `;
  }

  pricingOptions.innerHTML = html;

  pricingOptions.querySelectorAll("input, select").forEach(field => {
    field.addEventListener("change", updatePriceSummary);
    field.addEventListener("input", updatePriceSummary);
  });

  updatePriceSummary();
}


/* =====================================================
   11. CALCULATE BOOKING PRICE
===================================================== */

function getBookingPriceEstimate(hours) {
  const lines = [];
  const needsConfirmation = true;

  if (!selectedVenue || !hours || hours <= 0) {
    return {
      valid: false,
      message: "Please select a valid booking duration."
    };
  }

  const venue = selectedVenue.name;

  // VSU GYMNATORIUM
  if (venue === "VSU Gymnatorium") {
    const category = getPricingValue("gymCategory");
    const led = getPricingValue("gymLed");
    const sound = getPricingValue("gymSound");

    addPriceLine(
      lines,
      "Venue rental",
      600 + Math.max(0, Math.ceil(hours) - 1) * 300
    );

    if (led === "yes") {
      let ledPrice = null;
      if (category === "student") ledPrice = firstFourHours(hours, 3000, 500);
      else if (category === "external") ledPrice = firstFourHours(hours, 12000, 1000);
      else if (category === "pwd") ledPrice = 9600;
      if (ledPrice === null) {
        return { valid: false, message: "The supplied PDF does not provide a complete Gymnatorium LED-wall rate for the selected VSU-affiliated / special-interest / religious-group category. Please confirm with the venue office." };
      }
      addPriceLine(lines, "LED wall", ledPrice);
    }

    if (sound === "highend") {
      let soundPrice = 0;

      if (category === "student") {
        soundPrice = hours <= 4 ? 3500 : hours <= 8 ? 6000 : null;
      } else if (category === "external") {
        soundPrice = hours <= 8 ? 10000 : null;
      } else if (category === "pwd") {
        soundPrice = 8000;
      } else if (category === "special") {
        soundPrice = 5000;
      }

      if (soundPrice === null) {
        return {
          valid: false,
          message: "The selected sound-system rate only covers up to 8 hours. Please shorten the booking duration or confirm with the venue office."
        };
      }

      addPriceLine(lines, "High-end round sound system", soundPrice);
    }
  }

  // CONVENTION CENTER
  else if (venue === "Convention Center") {
    const category = getPricingValue("conventionCategory");

    const price = category === "vsu"
      ? firstFourHours(hours, 4000, 1500)
      : firstFourHours(hours, 10000, 2000);

    addPriceLine(lines, "Venue rental", price);
  }

  // CENTER FOR CONTINUING EDUCATION
  else if (venue === "Center for Continuing Education") {
    const category = getPricingValue("cceCategory");
    const aircon = getPricingValue("cceAircon") === "yes";

    const rates = {
      no: {
        unit: [350, 50, 170],
        organization: [400, 100, 170],
        employee: [450, 150, 170],
        student: [50, 0, 170],
        external: [550, 350, 170],
        church: [500, 200, 170]
      },
      yes: {
        unit: [510, 290, 280],
        organization: [550, 350, 280],
        employee: [600, 350, 280],
        student: [510, 225, 280],
        external: [1000, 450, 280],
        church: [900, 425, 280]
      }
    };

    const rate = rates[aircon ? "yes" : "no"][category];

    if (!rate) {
      return {
        valid: false,
        message: "Please select a valid CCE client category."
      };
    }

    const venuePrice = category === "student" && !aircon
      ? 50 * hours
      : firstAndSucceeding(hours, rate[0], rate[1]);

    addPriceLine(lines, "CCE venue rental", venuePrice);
    addPriceLine(lines, "CCE utility fee", rate[2] * hours);

    const sound = getPricingValue("cceSound");

    if (sound === "vsu") {
      addPriceLine(lines, "Sound system", 500);
    } else if (sound === "external") {
      addPriceLine(lines, "Sound system", 1000);
    }

    if (getPricingChecked("cceLcd")) {
      addPriceLine(lines, "LCD/DLP projector", 300);
    }

    if (getPricingChecked("cceVideoke")) {
      addPriceLine(lines, "Videoke", 700);
    }

    if (getPricingChecked("ccePersonnel")) {
      addPriceLine(lines, "Utility personnel (estimated)", 100 * hours);
    }
  }

  // FUNCTION ROOM
  else if (venue === "Function Room (2nd floor)") {
    const category = getPricingValue("functionCategory");
    const aircon = getPricingValue("functionAircon") === "yes";

    let first = 0;
    let succeeding = 0;

    if (category === "vsu" && !aircon) {
      first = 550;
      succeeding = 350;
    } else if (category === "vsu" && aircon) {
      first = 600; // Confirmed by the user: ₱600 for the first hour.
      succeeding = 350;
    } else if (category === "external" && !aircon) {
      first = 600;
      succeeding = 350;
    } else if (category === "external" && aircon) {
      first = 1000;
      succeeding = 450;
    }

    addPriceLine(
      lines,
      "Function Room rental",
      firstAndSucceeding(hours, first, succeeding)
    );

    addPriceLine(lines, "Function Room utility fee", (aircon ? 360 : 285) * hours);
  }

  // BEACH GARDEN
  else if (venue === "Beach Garden") {
    const area = getPricingValue("beachArea");
    const entranceGuests = getPricingNumber("beachEntranceGuests");
    const poolCategory = getPricingValue("beachPoolCategory");
    const poolGuests = getPricingNumber("beachPoolGuests");
    const cottage = getPricingValue("beachCottage");
    const floating = getPricingValue("beachFloating");
    const floatingGuests = getPricingNumber("beachFloatingGuests");

    const areaRates = {
      function: 3700,
      viewdeck: 800,
      social: 4500,
      pool: 6000,
      riverside: 2000
    };

    if (areaRates[area]) {
      addPriceLine(lines, "Area reservation", areaRates[area]);
    }

    addPriceLine(
      lines,
      "Non-exclusive entrance fee",
      entranceGuests * 10
    );

    const poolRates = {
      children: 25,
      vsu: 50,
      external: 75
    };

    if (poolCategory !== "none" && poolRates[poolCategory]) {
      addPriceLine(
        lines,
        "Swimming pool fee",
        poolRates[poolCategory] * poolGuests
      );
    }

    if (cottage === "social") {
      addPriceLine(lines, "Social Park kiosk/cottage", 200);
    } else if (cottage === "pool") {
      addPriceLine(lines, "Swimming Pool kiosk/cottage", 250);
    }

    if (floating === "group") {
      addPriceLine(lines, "Floating cottage — group usage", 100 * hours);
    } else if (floating === "individual") {
      addPriceLine(
        lines,
        "Floating cottage — individual usage",
        25 * floatingGuests
      );
    }
  }

  // VSU PAVILION
  else if (venue === "VSU Pavilion") {
    const mealRate = Number(getPricingValue("pavilionMeal") || 0);
    const mealGuests = getPricingNumber("pavilionGuests");
    const lechon = getPricingNumber("pavilionLechon");
    const beer = getPricingNumber("pavilionBeer");
    const food = getPricingNumber("pavilionFood");

    if (mealRate > 0 && mealGuests <= 0) {
      return { valid: false, message: "Enter the number of meal servings to calculate the Pavilion meal package." };
    }
    if (mealRate > 0) addPriceLine(lines, `Pavilion meal package (₱${mealRate} × ${mealGuests})`, mealRate * mealGuests);
    addPriceLine(lines, `Lechon corkage (${lechon} × ₱300)`, lechon * 300);
    addPriceLine(lines, `Beer corkage (${beer} cases × ₱100)`, beer * 100);
    addPriceLine(lines, `Food corkage (${food} dishes × ₱100)`, food * 100);
    if (getPricingChecked("pavilionElectricity")) addPriceLine(lines, "Electricity for videoke / sound system", 200);
  }

  // RDE HALL
  else if (venue === "RDE Hall") {
    const category = getPricingValue("rdeCategory");
    const led = getPricingValue("rdeLed");
    const sound = getPricingValue("rdeSound");
    const soundCategory = getPricingValue("rdeSoundCategory");

    const venuePrice = category === "student"
      ? firstFourHours(hours, 2000, 500)
      : firstFourHours(hours, 4000, 1000);

    addPriceLine(lines, "RDE Hall venue rental", venuePrice);

    if (led === "yes") {
      const ledPrice = category === "student"
        ? firstFourHours(hours, 3000, 500)
        : firstFourHours(hours, 12000, 1000);

      addPriceLine(lines, "LED wall", ledPrice);
    }

    if (sound === "basic") {
      if (category !== "student") {
        return {
          valid: false,
          message: "The supplied basic sound-system rate is specifically for student organizations."
        };
      }

      addPriceLine(
        lines,
        "Basic sound system",
        firstFourHours(hours, 500, 100)
      );
    }

    if (sound === "highend") {
      let soundPrice = null;

      if (soundCategory === "student") {
        soundPrice = hours <= 4 ? 3500 : hours <= 8 ? 6000 : null;
      } else if (soundCategory === "external") {
        soundPrice = hours <= 8 ? 10000 : null;
      } else if (soundCategory === "pwd") {
        soundPrice = 8000;
      } else if (soundCategory === "special") {
        soundPrice = 5000;
      }

      if (soundPrice === null) {
        return {
          valid: false,
          message: "The selected high-end sound-system rate only covers up to 8 hours. Please confirm longer use with the venue office."
        };
      }

      addPriceLine(lines, "High-end round sound system", soundPrice);
    }
  }

  else {
    return {
      valid: false,
      message: "Pricing is not available for this venue."
    };
  }

  const total = lines.reduce((sum, line) => sum + line.amount, 0);

  if (!lines.length) {
    return {
      valid: false,
      message: "Choose at least one paid Pavilion meal package or additional charge to calculate an estimate."
    };
  }

  return {
    valid: true,
    total: Number(total.toFixed(2)),
    breakdown: lines,
    needsConfirmation
  };
}


/* =====================================================
   12. UPDATE PRICE SUMMARY
===================================================== */

function updatePriceSummary() {
  const priceSummary = $("priceSummary");
  if (!priceSummary || !selectedVenue) return;

  const form = $("bookingForm");
  const start = form?.elements.startTime?.value;
  const end = form?.elements.endTime?.value;

  if (!start || !end) {
    priceSummary.innerHTML = `
      <h3>Estimated Payment</h3>
      <p>Select your start and end time to calculate the estimated price.</p>
    `;
    return;
  }

  const startMinutes = timeToMinutes(start);
  const endMinutes = timeToMinutes(end);

  if (
    startMinutes === null ||
    endMinutes === null ||
    endMinutes <= startMinutes
  ) {
    priceSummary.innerHTML = `
      <h3>Estimated Payment</h3>
      <p class="pricing-error">Please enter a valid start and end time.</p>
    `;
    return;
  }

  const duration = (endMinutes - startMinutes) / 60;
  const result = getBookingPriceEstimate(duration);

  if (!result.valid) {
    priceSummary.innerHTML = `
      <h3>Estimated Payment</h3>
      <p class="pricing-error">${result.message}</p>
    `;
    return;
  }

  priceSummary.innerHTML = `
    <h3>Estimated Payment</h3>

    <p>Booking duration:
      <strong>${duration.toFixed(2)} hour(s)</strong>
    </p>

    <ul class="price-breakdown">
      ${result.breakdown.map(line => `
        <li>
          <span>${line.label}</span>
          <strong>${money(line.amount)}</strong>
        </li>
      `).join("")}
    </ul>

    <div class="price-total">
      <span>Estimated Total</span>
      <strong>${money(result.total)}</strong>
    </div>

    <p class="pricing-note">
      This is an estimated amount based on the supplied rates.
      Final charges must be confirmed with the VSU venue office.
    </p>
  `;
}


/* =====================================================
   13. SUBMIT BOOKING REQUEST
===================================================== */

if ($("bookingForm")) {
  $("bookingForm").addEventListener("input", () => {
    const message = $("bookingMessage");
    if (message) {
      message.textContent = "Submitting a request does not mean the venue is reserved or confirmed.";
      message.classList.remove("form-message-error");
    }
  });

  $("bookingForm").addEventListener("change", () => {
    const message = $("bookingMessage");
    if (message) {
      message.textContent = "Submitting a request does not mean the venue is reserved or confirmed.";
      message.classList.remove("form-message-error");
    }
  });

  $("bookingForm").addEventListener("submit", e => {
    e.preventDefault();

    const f = e.currentTarget;
    const requestedDate = f.elements.date.value;
    const requestedVenue = f.elements.venue.value;
    const startTime = f.elements.startTime?.value || "";
    const endTime = f.elements.endTime?.value || "";
    const message = $("bookingMessage");

    const showError = text => {
      if (message) {
        message.textContent = text;
        message.classList.add("form-message-error");
      }
      alert(text);
    };

    // Validate inside the submit handler so users always receive clear feedback.
    // The form uses novalidate to prevent the browser from blocking the submit
    // event before this handler can explain which field needs attention.
    const invalidField = Array.from(f.elements).find(field =>
      field.willValidate && !field.checkValidity()
    );

    if (invalidField) {
      const fieldLabel = invalidField.closest("label")?.childNodes?.[0]?.textContent?.trim()
        || invalidField.getAttribute("aria-label")
        || invalidField.name
        || "a required field";

      if (message) {
        message.textContent = `Please complete or correct: ${fieldLabel}.`;
        message.classList.add("form-message-error");
      }

      invalidField.focus();
      invalidField.reportValidity();
      invalidField.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (!requestedVenue || !venues.some(v => v.name === requestedVenue)) {
      showError("Please select a valid venue before submitting.");
      return;
    }

    if (!requestedDate) {
      showError("Please select a booking date.");
      return;
    }

    if (requestedDate < localDateKey(new Date())) {
      showError("Please choose today or a future date.");
      return;
    }

    if (!startTime || !endTime) {
      showError("Please select both a start time and an end time.");
      return;
    }

    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);

    if (startMinutes === null || endMinutes === null || endMinutes <= startMinutes) {
      showError("The end time must be later than the start time.");
      return;
    }

    if (isDateUnavailable(requestedVenue, requestedDate)) {
      showError("Sorry, this venue has been marked unavailable for that date. Please choose another date.");
      if (selectedVenue) renderVenueCalendar();
      return;
    }

    if (bookingTimesOverlap(requestedVenue, requestedDate, startTime, endTime)) {
      showError("That time slot overlaps with an existing booking request for this venue. Please choose another time.");
      return;
    }

    const duration = (endMinutes - startMinutes) / 60;
    const pricing = getBookingPriceEstimate(duration);

    // Capture all venue-specific selections so the request retains what the
    // client asked for, even when the published rates cannot produce a total.
    const selectedOptions = {};
    $("pricingOptions")?.querySelectorAll("input, select, textarea").forEach(field => {
      if (!field.name) return;
      selectedOptions[field.name] = field.type === "checkbox"
        ? field.checked
        : field.value;
    });

    const item = {
      id: (window.crypto && crypto.randomUUID)
        ? crypto.randomUUID()
        : String(Date.now()),
      venue: requestedVenue,
      name: f.elements.name.value.trim(),
      clientType: f.elements.clientType.value,
      organization: f.elements.organization.value.trim(),
      date: requestedDate,
      startTime,
      endTime,
      hours: Number(duration.toFixed(2)),
      guests: Number(f.elements.guests.value),
      purpose: f.elements.purpose.value.trim(),
      selectedOptions,
      estimatedTotal: pricing.valid ? pricing.total : null,
      pricingBreakdown: pricing.valid ? pricing.breakdown : [],
      pricingNeedsConfirmation: true,
      pricingMessage: pricing.valid
        ? "Estimate based on the available published rates. Final charges require venue-office confirmation."
        : (pricing.message || "The venue office must provide or confirm the estimate."),
      status: "Pending",
      submittedAt: new Date().toISOString()
    };

    bookings.unshift(item);

    try {
      saveAvailability();
    } catch (error) {
      bookings.shift();
      console.error("Unable to save booking request:", error);
      showError("Your booking request could not be saved in this browser. Check browser storage settings and try again.");
      return;
    }

    selectedBookingDate = "";
    f.reset();
    closeBooking();

    const pageMessage = $("bookingPageMessage");
    if (pageMessage) {
      pageMessage.textContent = "Your booking inquiry has been saved in this browser. It is pending and is not yet an official reservation.";
      pageMessage.hidden = false;
    }

    showPage("bookings");
  });
}


/* =====================================================
   14. DISPLAY BOOKING HISTORY
===================================================== */

function renderBookings() {
  const target = $("bookingList");
  if (!target) return;

  if (!bookings.length) {
    target.innerHTML = `
      <div class="empty-state">
        You have no booking requests yet.
        Find a venue and submit a request to get started.
      </div>
    `;
    return;
  }

  target.innerHTML = bookings.map(b => `
    <article class="booking-card">
      <div>
        <h3>${b.venue}</h3>

        <p>
          <strong>${b.date}</strong>
          · ${b.startTime && b.endTime
            ? `${formatTime(b.startTime)} – ${formatTime(b.endTime)}`
            : `${b.hours || "—"} hour(s)`}
          · ${b.guests} guests
        </p>

        <p>
          ${b.name}
          ${b.organization ? " · " + b.organization : ""}
          · ${b.clientType === "student" ? "VSU client" : "External client"}
        </p>

        <p>${b.purpose}</p>

        ${b.selectedOptions && Object.keys(b.selectedOptions).length ? `
          <div class="booking-options-details">
            <strong>Requested options</strong>
            <ul>
              ${Object.entries(b.selectedOptions).filter(([key, value]) => value !== "none" && value !== "" && value !== false && value !== "0" && value !== 0).map(([key, value]) => `
                <li>${key.replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase())}: ${value === true ? "Selected" : value}</li>
              `).join("")}
            </ul>
          </div>
        ` : ""}

        ${typeof b.estimatedTotal === "number" ? `
          <div class="booking-price-details">
            <strong>Estimated total: ${money(b.estimatedTotal)}</strong>

            ${b.pricingBreakdown?.length ? `
              <ul>
                ${b.pricingBreakdown.map(line => `
                  <li>${line.label}: ${money(line.amount)}</li>
                `).join("")}
              </ul>
            ` : ""}

            ${b.pricingNeedsConfirmation ? `
              <small>
                Final charges need confirmation from the VSU venue office.
              </small>
            ` : ""}
          </div>
        ` : (b.pricingMessage ? `<p class="pricing-note">${b.pricingMessage}</p>` : "")}
      </div>

      <span class="status">${b.status}</span>
    </article>
  `).join("");
}


/* =====================================================
   15. AVAILABILITY CALENDAR
===================================================== */

function renderVenueCalendar() {
  const target = $("venueAvailabilityCalendar");
  if (!target || !selectedVenue) return;

  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = localDateKey(new Date());

  const monthLabel = calendarMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  let cells = "";

  for (let i = 0; i < firstDay; i++) {
    cells += `<span class="calendar-empty"></span>`;
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = localDateKey(new Date(year, month, day));
    const past = date < today;
    const unavailable = past || isDateUnavailable(selectedVenue.name, date);

    const classes = unavailable
      ? "calendar-day unavailable"
      : "calendar-day available";

    const title = past
      ? "Past date"
      : unavailable
        ? "Unavailable"
        : "Available — click to request";

    cells += `
      <button
        type="button"
        class="${classes}"
        title="${title}"
        ${unavailable ? "disabled" : ""}
        onclick="chooseAvailabilityDate('${date}')"
      >
        ${day}
      </button>
    `;
  }

  target.innerHTML = `
    <div class="calendar-heading">
      <button type="button" aria-label="Previous month"
        onclick="changeCalendarMonth(-1)">‹</button>

      <strong>${monthLabel}</strong>

      <button type="button" aria-label="Next month"
        onclick="changeCalendarMonth(1)">›</button>
    </div>

    <div class="availability-calendar-grid">
      ${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        .map(d => `<span class="calendar-weekday">${d}</span>`)
        .join("")}

      ${cells}
    </div>

    ${selectedBookingDate
      ? `<p class="selected-date-note">
          Selected date: <strong>${selectedBookingDate}</strong>
        </p>`
      : ""}
  `;
}

function changeCalendarMonth(offset) {
  calendarMonth = new Date(
    calendarMonth.getFullYear(),
    calendarMonth.getMonth() + offset,
    1
  );

  renderVenueCalendar();
}

function chooseAvailabilityDate(date) {
  if (!selectedVenue || isDateUnavailable(selectedVenue.name, date)) return;

  selectedBookingDate = date;
  openBooking();
  renderVenueCalendar();
}


/* =====================================================
   16. ADMIN AVAILABILITY MANAGEMENT
===================================================== */

function addAvailabilityAdmin() {
  if ($("viscanAdminLauncher")) return;

  const style = document.createElement("style");
  style.id = "viscanAvailabilityStyles";

  style.textContent = `
    .availability-section {
      margin: 28px 0;
      padding: 22px;
      border: 1px solid #dce8dc;
      border-radius: 16px;
      background: #fbfdfb;
    }

    .availability-help {
      color: #647067;
      font-size: .92rem;
    }

    .calendar-heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 16px 0;
    }

    .calendar-heading button {
      border: 0;
      border-radius: 8px;
      padding: 7px 13px;
      background: #e8f3e8;
      color: #14532d;
      font-size: 22px;
      cursor: pointer;
    }

    .availability-calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, minmax(0, 1fr));
      gap: 7px;
    }

    .calendar-weekday {
      text-align: center;
      font-size: .78rem;
      font-weight: 700;
      color: #647067;
      padding: 7px 0;
    }

    .calendar-day,
    .calendar-empty {
      min-height: 40px;
      border: 0;
      border-radius: 9px;
      display: grid;
      place-items: center;
    }

    .calendar-day {
      font-weight: 700;
      cursor: pointer;
    }

    .calendar-day.available {
      background: #d9f3df;
      color: #176b35;
    }

    .calendar-day.unavailable {
      background: #f9dddd;
      color: #a32222;
      cursor: not-allowed;
      opacity: .9;
    }

    .availability-legend {
      display: flex;
      gap: 18px;
      flex-wrap: wrap;
      margin-top: 14px;
      font-size: .85rem;
    }

    .availability-legend span {
      display: flex;
      align-items: center;
      gap: 7px;
    }

    .availability-dot {
      width: 11px;
      height: 11px;
      border-radius: 50%;
      display: inline-block;
    }

    .availability-dot.available {
      background: #28a745;
    }

    .availability-dot.unavailable {
      background: #dc3545;
    }

    .selected-date-note {
      margin-top: 12px;
      font-size: .9rem;
    }

    #viscanAdminLauncher {
      position: fixed;
      right: 18px;
      bottom: 18px;
      z-index: 9000;
      background: #14532d;
      color: white;
      border: 0;
      border-radius: 999px;
      padding: 12px 18px;
      font-weight: 700;
      box-shadow: 0 5px 18px #0003;
      cursor: pointer;
    }

    #viscanAdminPanel {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 9001;
      background: #0008;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }

    #viscanAdminPanel.open {
      display: flex;
    }

    .viscan-admin-card {
      background: white;
      color: #1d2a20;
      width: min(650px, 100%);
      max-height: 90vh;
      overflow: auto;
      border-radius: 16px;
      padding: 22px;
      box-shadow: 0 15px 45px #0004;
    }

    .viscan-admin-card h2 {
      margin-top: 0;
    }

    .viscan-admin-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin: 12px 0;
    }

    .viscan-admin-card select,
    .viscan-admin-card input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccd6cc;
      border-radius: 8px;
    }

    .viscan-admin-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin: 12px 0;
    }

    .viscan-admin-actions button,
    .viscan-admin-close {
      border: 0;
      border-radius: 8px;
      padding: 10px 14px;
      cursor: pointer;
      font-weight: 700;
    }

    .admin-block {
      background: #dc3545;
      color: white;
    }

    .admin-open {
      background: #198754;
      color: white;
    }

    .admin-neutral {
      background: #e9eee9;
      color: #243;
    }

    .admin-booking {
      padding: 10px 0;
      border-top: 1px solid #e5e9e5;
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: center;
    }

    .admin-booking button {
      background: #f8d7da;
      color: #842029;
      border: 0;
      border-radius: 7px;
      padding: 7px 10px;
      cursor: pointer;
    }

    @media (max-width: 520px) {
      .viscan-admin-row {
        grid-template-columns: 1fr;
      }

      .calendar-day,
      .calendar-empty {
        min-height: 34px;
      }
    }
  `;

  document.head.appendChild(style);

  const launcher = document.createElement("button");
  launcher.id = "viscanAdminLauncher";
  launcher.type = "button";
  launcher.textContent = "Manage availability";

  launcher.onclick = () => {
    $("viscanAdminPanel").classList.add("open");
    renderAdminBookings();
  };

  document.body.appendChild(launcher);

  const panel = document.createElement("div");
  panel.id = "viscanAdminPanel";

  panel.innerHTML = `
    <div class="viscan-admin-card" role="dialog"
      aria-modal="true" aria-label="Manage venue availability">

      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px">
        <h2>Manage availability</h2>

        <button type="button"
          class="viscan-admin-close admin-neutral"
          onclick="closeAvailabilityAdmin()">
          Close
        </button>
      </div>

      <p>
        Choose a venue and date, then manually block or reopen the date.
        A manually blocked date prevents all bookings. Existing pending and approved time slots remain reserved until cancelled or rejected.
      </p>

      <div class="viscan-admin-row">
        <select id="adminVenueSelect">
          ${venues.map(v =>
            `<option value="${v.name}">${v.name}</option>`
          ).join("")}
        </select>

        <input id="adminDateInput" type="date"
          min="${localDateKey(new Date())}">
      </div>

      <div class="viscan-admin-actions">
        <button type="button" class="admin-block"
          onclick="adminSetUnavailable()">
          Mark unavailable
        </button>

        <button type="button" class="admin-open"
          onclick="adminSetAvailable()">
          Mark available
        </button>
      </div>

      <p id="adminAvailabilityMessage" aria-live="polite"></p>

      <h3>Booking requests</h3>
      <div id="adminBookingList"></div>

      <p style="font-size:.82rem;color:#68756a;margin-top:16px">
        Prototype notice: these changes are saved only in this browser.
        This panel is not password-protected and is not suitable for public production use.
      </p>
    </div>
  `;

  panel.addEventListener("click", e => {
    if (e.target === panel) closeAvailabilityAdmin();
  });

  document.body.appendChild(panel);
}

function closeAvailabilityAdmin() {
  $("viscanAdminPanel")?.classList.remove("open");
}

function adminSetUnavailable() {
  const venue = $("adminVenueSelect").value;
  const date = $("adminDateInput").value;

  if (!date) {
    $("adminAvailabilityMessage").textContent =
      "Please choose a date first.";
    return;
  }

  if (isDateBooked(venue, date)) {
    $("adminAvailabilityMessage").textContent =
      "This date has a booking request. Cancel that request before changing its availability.";
    return;
  }

  manualUnavailable[venueDateKey(venue, date)] = true;
  saveAvailability();

  $("adminAvailabilityMessage").textContent =
    `${venue} is now marked unavailable on ${date}.`;

  refreshAvailabilityViews(venue);
}

function adminSetAvailable() {
  const venue = $("adminVenueSelect").value;
  const date = $("adminDateInput").value;

  if (!date) {
    $("adminAvailabilityMessage").textContent =
      "Please choose a date first.";
    return;
  }

  delete manualUnavailable[venueDateKey(venue, date)];
  saveAvailability();

  $("adminAvailabilityMessage").textContent =
    `${venue} is now marked available on ${date}.`;

  refreshAvailabilityViews(venue);
}

function cancelAdminBooking(id) {
  const booking = bookings.find(
    b => String(b.id) === String(id)
  );

  if (!booking) return;

  booking.status = "Cancelled";
  saveAvailability();

  renderAdminBookings();
  refreshAvailabilityViews(booking.venue);
}

function renderAdminBookings() {
  const target = $("adminBookingList");
  if (!target) return;

  const active = bookings.filter(isBlockingBooking);

  target.innerHTML = active.length
    ? active.map(b => `
        <div class="admin-booking">
          <div>
            <strong>${b.venue}</strong><br>
            <small>
              ${b.date} ·
              ${b.startTime && b.endTime
                ? `${formatTime(b.startTime)} – ${formatTime(b.endTime)}`
                : "Time not specified"}
              · ${b.name} · ${b.status}
            </small>
          </div>

          <button type="button"
            onclick="cancelAdminBooking('${b.id}')">
            Cancel request
          </button>
        </div>
      `).join("")
    : `<p>No active booking requests.</p>`;
}

function refreshAvailabilityViews(venue) {
  if (selectedVenue && selectedVenue.name === venue) {
    renderVenueCalendar();
  }

  if ($("adminBookingList")) {
    renderAdminBookings();
  }
}


/* =====================================================
   17. LIST A SPACE FORM
===================================================== */

if ($("listingForm")) {
  $("listingForm").addEventListener("submit", e => {
    e.preventDefault();

    $("listingMessage").textContent =
      "Thank you. Your facility suggestion has been recorded for this demo only; it has not been sent to VSU.";

    e.currentTarget.reset();
  });
}


/* =====================================================
   18. PRICING EVENT LISTENERS
===================================================== */

function setupPricingTimeListeners() {
  const form = $("bookingForm");
  if (!form) return;

  form.elements.startTime?.addEventListener("change", updatePriceSummary);
  form.elements.endTime?.addEventListener("change", updatePriceSummary);
}
// Make HTML onclick functions accessible globally
window.openBooking = openBooking;
window.closeBooking = closeBooking;
window.openVenueByIndex = openVenueByIndex;
window.openVenue = openVenue;
window.showPage = showPage;
window.chooseAvailabilityDate = chooseAvailabilityDate;
window.changeCalendarMonth = changeCalendarMonth;
window.searchFromHome = searchFromHome;
window.filterVenues = filterVenues;
window.clearFilters = clearFilters;
window.closeAvailabilityAdmin = closeAvailabilityAdmin;
window.adminSetUnavailable = adminSetUnavailable;
window.adminSetAvailable = adminSetAvailable;
window.cancelAdminBooking = cancelAdminBooking;
window.closeBooking = closeBooking;

/* =====================================================
   19. INITIALIZE WEBSITE
===================================================== */

function initializeWebsite() {
  renderHome();
  filterVenues();
  renderMapList();
  renderBookings();
  addAvailabilityAdmin();
  setupPricingTimeListeners();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeWebsite);
} else {
  initializeWebsite();
}
