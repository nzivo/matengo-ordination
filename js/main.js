/* =========================================================
   EDIT HERE — every personal detail on the site lives in this
   one object. Change a value and the page updates everywhere.
   Empty strings ("") hide that line on the page.
   ========================================================= */
const ORDINATION = {
  firstName: "Felix",
  displayName: "Felix Matengo",
  bishop: "",                           // e.g. "His Excellency Bishop N." — shown under the name
  motto: "",                            // e.g. "“Remain in my love”"
  patron: "",                           // e.g. "Saint Felix" — also added to the Litany
  homeParish: "",
  formedAt: "",
  portrait: "",                         // e.g. "images/felix.jpg" — empty shows the monogram
  livestream: "",                       // link appears in "Watching from afar" when set
  travel: "",                           // replaces the "Getting there" text when set

  // Dates are YYYY-MM-DD; times are 24h "HH:MM", or "" while still to be confirmed
  ordinations: {
    deacon: { date: "2026-11-21", time: "" },
    priest: { date: "2027-05-22", time: "" }
  },

  // The six choices below must match the Google Form options word for word
  events: [
    {
      group: "deacon", id: "diaconate", main: true,
      tag: "The Ordination", title: "Ordination to the Diaconate",
      date: "2026-11-21", time: "", hours: 3,
      place: "", address: "",
      desc: "Felix is ordained a deacon by the laying on of hands and prayer of the Bishop.",
      formValue: "Ordination to the diaconate on the 21st of November 2026"
    },
    {
      group: "deacon", id: "diaconate-lunch",
      tag: "Following", title: "Lunch after the Ordination",
      date: "2026-11-21", time: "", hours: 3,
      place: "", address: "",
      desc: "A festive lunch together after the ordination Mass.",
      formValue: "Lunch after ordination to the diaconate on the 21st of November 2026"
    },
    {
      group: "deacon", id: "villa-tevere",
      tag: "The Next Day", title: "Mass of Thanksgiving",
      date: "2026-11-22", time: "", hours: 1.5,
      place: "Villa Tevere", address: "Rome",
      desc: "A Mass of thanksgiving at which Felix serves at the altar as a new deacon.",
      formValue: "Thanksgiving Mass in Villa Tevere on 22nd November 2026"
    },
    {
      group: "priest", id: "priesthood", main: true,
      tag: "The Ordination", title: "Ordination to the Priesthood",
      date: "2027-05-22", time: "", hours: 3,
      place: "", address: "",
      desc: "Felix is ordained a priest of Jesus Christ. First blessings follow the Mass.",
      formValue: "Priestly ordination on the 22nd of May 2027"
    },
    {
      group: "priest", id: "cavabianca-lunch",
      tag: "Following", title: "Lunch at Cavabianca",
      date: "2027-05-22", time: "", hours: 3,
      place: "Cavabianca", address: "Rome",
      desc: "Lunch together after the ordination — and a chance to receive a first blessing.",
      formValue: "Lunch in Cavabianca on the 22nd of May 2027"
    },
    {
      group: "priest", id: "first-mass",
      tag: "The Next Day", title: "First Mass of Thanksgiving",
      date: "2027-05-23", time: "", hours: 1.5,
      place: "", address: "",
      desc: "Father Felix offers the Holy Sacrifice of the Mass for the first time.",
      formValue: "Thanksgiving Mass on 23rd of May 2027"
    }
  ],

  // Replies are sent into this Google Form (never put the /edit link here)
  googleForm: {
    action: "https://docs.google.com/forms/d/e/1FAIpQLSdHCJzoiHLxNh2svcJQMOfn0jXbz5-fJGuDUt6pwfPGgqBRWg/formResponse",
    view: "https://docs.google.com/forms/d/e/1FAIpQLSdHCJzoiHLxNh2svcJQMOfn0jXbz5-fJGuDUt6pwfPGgqBRWg/viewform",
    fields: {
      email: "entry.1713225539",
      name: "entry.2112914121",
      events: "entry.309516061",
      company: "entry.281572454",
      count: "entry.1341574413"
    }
  }
};

/* ========================================================= */

(function () {
  "use strict";
  const C = ORDINATION;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  /* ---------- Formal date language ---------- */
  const ORD = ["", "First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth",
    "Eleventh", "Twelfth", "Thirteenth", "Fourteenth", "Fifteenth", "Sixteenth", "Seventeenth", "Eighteenth",
    "Nineteenth", "Twentieth", "Twenty-First", "Twenty-Second", "Twenty-Third", "Twenty-Fourth", "Twenty-Fifth",
    "Twenty-Sixth", "Twenty-Seventh", "Twenty-Eighth", "Twenty-Ninth", "Thirtieth", "Thirty-First"];
  const ONES = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
    "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  const under100 = n => n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? "-" + ONES[n % 10] : "");
  const yearWords = y => "Two Thousand" + (y % 1000 ? " " + under100(y % 1000) : "");
  const roman = n => [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]].reduce((s, [v, r]) => { while (n >= v) { s += r; n -= v; } return s; }, "");

  // Parse as local time so dates never shift across time zones
  const at = (date, time) => {
    const [y, m, d] = date.split("-").map(Number);
    const [hh, mm] = (time || "00:00").split(":").map(Number);
    return new Date(y, m - 1, d, hh, mm);
  };
  const fmt = (d, o) => d.toLocaleDateString("en-GB", o);
  const longDate = d => `${fmt(d, { weekday: "long" })}, the ${ORD[d.getDate()]} of ${fmt(d, { month: "long" })}`;
  const shortDate = d => fmt(d, { day: "numeric", month: "long", year: "numeric" });
  const clock = (date, time) => time
    ? at(date, time).toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true }).replace(" ", " ")
    : "";

  const deacon = at(C.ordinations.deacon.date, C.ordinations.deacon.time);
  const priest = at(C.ordinations.priest.date, C.ordinations.priest.time);
  const dayAfter = d => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
  const now = new Date();
  // A milestone counts as "done" from the day after it
  const status = d => now >= dayAfter(d) ? "done" : "upcoming";
  const next = status(deacon) === "upcoming" ? "deacon" : status(priest) === "upcoming" ? "priest" : null;

  const data = {
    ...C,
    initial: C.firstName.charAt(0),
    deaconLong: longDate(deacon), deaconShort: shortDate(deacon), deaconYear: yearWords(deacon.getFullYear()),
    priestLong: longDate(priest), priestShort: shortDate(priest), priestYear: yearWords(priest.getFullYear()),
    yearsRoman: deacon.getFullYear() === priest.getFullYear()
      ? roman(priest.getFullYear())
      : `${roman(deacon.getFullYear())} – ${roman(priest.getFullYear())}`
  };

  $$("[data-bind]").forEach(el => {
    const v = data[el.dataset.bind];
    if (typeof v === "string" && v) el.textContent = v;
  });
  $$("[data-hide-empty]").forEach(el => { el.hidden = !data[el.dataset.hideEmpty]; });
  document.title = `The Ordinations of ${C.displayName}`;

  if (C.portrait) {
    const p = $("[data-portrait]");
    p.style.backgroundImage = `url("${C.portrait}")`;
    p.classList.add("has-photo");
    p.setAttribute("role", "img");
    p.setAttribute("aria-label", `Portrait of ${C.displayName}`);
  }

  const live = $('[data-href="livestream"]');
  if (C.livestream) { live.href = C.livestream; live.target = "_blank"; live.rel = "noopener"; }
  else live.replaceWith(Object.assign(document.createElement("em"), { textContent: "A livestream link will appear here before each ordination." }));
  $('[data-href="formView"]').href = C.googleForm.view;

  /* ---------- Milestones: hero dates + timeline ---------- */
  $$("[data-milestone]").forEach(el => {
    const key = el.dataset.milestone;
    const s = status(key === "deacon" ? deacon : priest);
    el.classList.toggle("is-done", s === "done");
    el.classList.toggle("is-next", key === next);
    if (el.classList.contains("timeline__item")) {
      el.classList.toggle("timeline__item--done", s === "done");
      el.classList.toggle("timeline__item--now", key === next);
    }
  });

  /* ---------- Countdown to the next ordination ---------- */
  const cd = { days: $('[data-cd="days"]'), hours: $('[data-cd="hours"]'), minutes: $('[data-cd="minutes"]'), caption: $('[data-cd="caption"]') };
  const isToday = d => new Date().toDateString() === d.toDateString();
  function tick() {
    const target = [deacon, priest].find(d => Date.now() < d.getTime());
    // On an ordination day, or once both are past, a line of thanksgiving replaces the countdown
    const message = isToday(deacon) ? `Thanks be to God — today ${C.firstName} is ordained a deacon.`
      : isToday(priest) ? `Thanks be to God — today ${C.firstName} is ordained a priest.`
      : !target ? `Thanks be to God — ${C.firstName} is a priest for ever.` : "";
    if (message) {
      $(".countdown-wrap").hidden = true;
      Object.assign($(".countdown__done"), { hidden: false, textContent: message });
      return;
    }
    cd.caption.textContent = target === deacon ? "until his ordination to the diaconate" : "until his ordination to the priesthood";
    const mins = Math.floor((target - Date.now()) / 60000);
    cd.days.textContent = Math.floor(mins / 1440);
    cd.hours.textContent = String(Math.floor(mins / 60) % 24).padStart(2, "0");
    cd.minutes.textContent = String(mins % 60).padStart(2, "0");
    setTimeout(tick, 60000 - (Date.now() % 60000) + 50);
  }
  tick();

  /* ---------- Events + calendar ---------- */
  const pad = n => String(n).padStart(2, "0");
  const icsUTC = d => `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
  const icsDay = d => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  const esc = s => s.replace(/[\\,;]/g, m => "\\" + m).replace(/\n/g, "\\n");
  const html = s => String(s).replace(/[&<>"]/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));
  const where = ev => [ev.place, ev.address].filter(Boolean).join(", ");

  function downloadIcs(ev) {
    const start = at(ev.date, ev.time);
    // Without a confirmed time, add it as an all-day event
    const when = ev.time
      ? [`DTSTART:${icsUTC(start)}`, `DTEND:${icsUTC(new Date(start.getTime() + ev.hours * 3600000))}`]
      : [`DTSTART;VALUE=DATE:${icsDay(start)}`, `DTEND;VALUE=DATE:${icsDay(dayAfter(start))}`];
    const body = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Ordination//EN", "BEGIN:VEVENT",
      `UID:${ev.id}-${icsDay(start)}@ordination`, `DTSTAMP:${icsUTC(new Date())}`, ...when,
      `SUMMARY:${esc(`${ev.title} — ${C.displayName}`)}`,
      ...(where(ev) ? [`LOCATION:${esc(where(ev))}`] : []),
      `DESCRIPTION:${esc(ev.desc)}`, "END:VEVENT", "END:VCALENDAR"
    ].join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([body], { type: "text/calendar" }));
    a.download = `${ev.id}.ics`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  const GROUPS = {
    deacon: { numeral: "I", name: "The Diaconate", when: fmt(deacon, { month: "long", year: "numeric" }) },
    priest: { numeral: "II", name: "The Priesthood", when: fmt(priest, { month: "long", year: "numeric" }) }
  };
  const eventsEl = $("[data-events]");
  const checksEl = $("[data-event-checks]");

  Object.entries(GROUPS).forEach(([key, g]) => {
    const list = C.events.filter(ev => ev.group === key);
    const s = status(key === "deacon" ? deacon : priest);

    const wrap = document.createElement("div");
    wrap.className = "event-group" + (s === "done" ? " is-done" : "");
    wrap.innerHTML = `<h3 class="event-group__head reveal"><span class="numeral">${g.numeral}</span>${g.name}<span class="event-group__when">${g.when}</span></h3><div class="events"></div>`;
    const grid = $(".events", wrap);

    const checkGroup = document.createElement("div");
    checkGroup.className = "check-group";
    checkGroup.innerHTML = `<p class="check-group__head">${g.name} · ${g.when}</p>`;

    list.forEach(ev => {
      const d = at(ev.date, ev.time);
      const time = clock(ev.date, ev.time);
      const place = ev.place || "Venue to be announced";
      const card = document.createElement("article");
      card.className = "event reveal" + (ev.main ? " event--main" : "");
      card.innerHTML = `
        <span class="event__tag${ev.main ? "" : " event__tag--quiet"}">${html(ev.tag)}</span>
        <p class="event__date"><span class="event__day">${d.getDate()}</span>
          <span class="event__month">${fmt(d, { month: "long" })} ${d.getFullYear()}<br>${fmt(d, { weekday: "long" })}</span></p>
        <h4 class="event__title">${html(ev.title)}</h4>
        <ul class="event__meta">
          <li>${time ? `<strong>${time}</strong>` : `<em>Time to be confirmed</em>`}</li>
          <li>${ev.place ? `<strong>${html(place)}</strong>` : `<em>${place}</em>`}${ev.address ? `<br>${html(ev.address)}` : ""}</li>
        </ul>
        <p class="event__desc">${html(ev.desc)}</p>
        <div class="event__actions">
          ${where(ev) ? `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(where(ev))}" target="_blank" rel="noopener">Directions</a>` : ""}
          <button type="button">Add to calendar</button>
        </div>`;
      $("button", card).addEventListener("click", () => downloadIcs(ev));
      grid.appendChild(card);

      if (s !== "done") {
        const lab = document.createElement("label");
        lab.className = "square";
        lab.innerHTML = `<input type="checkbox" name="events" value="${html(ev.formValue)}"><span></span>
          <span class="square__text">${html(ev.title)}<small>${fmt(d, { weekday: "long", day: "numeric", month: "long" })}</small></span>`;
        checkGroup.appendChild(lab);
      }
    });

    eventsEl.appendChild(wrap);
    if (checkGroup.querySelector("input")) checksEl.appendChild(checkGroup);
  });

  /* ---------- Navigation ---------- */
  const header = $(".site-header");
  const toggle = $(".nav__toggle");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const closeNav = () => { header.classList.remove("nav-open"); toggle.setAttribute("aria-expanded", "false"); };
  toggle.addEventListener("click", () => {
    const open = header.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  $$(".nav__links a").forEach(a => a.addEventListener("click", closeNav));
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeNav(); });

  // Highlight the section in view — top nav and the rite contents list
  const spy = links => {
    const map = new Map(links.map(a => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (!en.isIntersecting) return;
      links.forEach(a => a.classList.remove("is-active"));
      map.get(en.target.id)?.classList.add("is-active");
    }), { rootMargin: "-45% 0px -50% 0px" });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  };
  spy($$('.nav__links a[href^="#"]:not(.btn)'));
  spy($$(".rite-toc a"));

  /* ---------- Order of service ---------- */
  const rite = $("#rite");
  const parts = $$(".rite-part");
  const switchBtns = $$(".switch [data-show]");
  const show = key => {
    rite.dataset.showing = key;
    switchBtns.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.show === key)));
  };
  switchBtns.forEach(b => b.addEventListener("click", () => show(b.dataset.show)));
  show(next || "priest");

  $$(".rite-toc a").forEach(a => a.addEventListener("click", () => {
    const d = document.getElementById(a.getAttribute("href").slice(1));
    if (d) d.open = true;
  }));

  const lp = $('[data-action="large-print"]');
  try { if (localStorage.getItem("largePrint") === "1") { document.body.classList.add("large-print"); lp.setAttribute("aria-pressed", "true"); } } catch (e) {}
  lp.addEventListener("click", () => {
    const on = document.body.classList.toggle("large-print");
    lp.setAttribute("aria-pressed", String(on));
    try { localStorage.setItem("largePrint", on ? "1" : "0"); } catch (e) {}
  });

  const expand = $('[data-action="expand-all"]');
  const syncExpand = () => { expand.textContent = parts.every(p => p.open) ? "Close all" : "Open all"; };
  expand.addEventListener("click", () => {
    const open = !parts.every(p => p.open);
    parts.forEach(p => { p.open = open; });
    syncExpand();
  });
  parts.forEach(p => p.addEventListener("toggle", syncExpand));

  let wasOpen = [];
  window.addEventListener("beforeprint", () => { wasOpen = parts.map(p => p.open); parts.forEach(p => { p.open = true; }); });
  window.addEventListener("afterprint", () => { parts.forEach((p, i) => { p.open = wasOpen[i]; }); syncExpand(); });
  $('[data-action="print"]').addEventListener("click", () => window.print());

  /* ---------- Reveal on scroll ---------- */
  const revealIO = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("is-in"); revealIO.unobserve(en.target); }
  }), { rootMargin: "0px 0px -8% 0px" });
  $$(".reveal").forEach(el => {
    // Stagger siblings slightly so groups settle in, not all at once
    const sibs = [...el.parentElement.children].filter(c => c.classList.contains("reveal"));
    el.style.transitionDelay = `${Math.min(sibs.indexOf(el), 5) * 70}ms`;
    revealIO.observe(el);
  });

  /* ---------- RSVP → Google Form ---------- */
  const form = $(".rsvp");
  const done = $(".rsvp-done");
  const countField = $("[data-company-count]");
  const countInput = $("#f-guests");
  const eventsSet = $('[data-choice="events"]');

  form.addEventListener("change", e => {
    if (e.target.name === "company") {
      countField.hidden = e.target.value !== "Yes";
      if (!countField.hidden) countInput.focus();
    }
    if (e.target.name === "events") eventsSet.classList.remove("is-invalid");
  });

  function validate() {
    const checks = [
      [$("#f-name").closest(".field"), $("#f-name"), v => v.trim().length > 1],
      [$("#f-email").closest(".field"), $("#f-email"), v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())],
      [eventsSet, $('input[name="events"]', eventsSet), () => $$('input[name="events"]:checked', form).length > 0],
      [countField, countInput, v => countField.hidden || Number(v) >= 1]
    ];
    let first = null;
    checks.forEach(([box, input, test]) => {
      const good = test(input ? input.value : "");
      box.classList.toggle("is-invalid", !good);
      if (input) input.setAttribute("aria-invalid", String(!good));
      if (!good && !first) first = input;
    });
    if (first) first.focus();
    return !first;
  }

  form.addEventListener("submit", async e => {
    e.preventDefault();
    if (!validate()) return;
    const fd = new FormData(form);
    const F = C.googleForm.fields;
    const body = new URLSearchParams();
    body.append(F.name, fd.get("name").trim());
    body.append(F.email, fd.get("email").trim());
    fd.getAll("events").forEach(v => body.append(F.events, v));
    body.append(F.company, fd.get("company"));
    if (fd.get("company") === "Yes") body.append(F.count, fd.get("count"));

    const btn = $('button[type="submit"]', form);
    btn.disabled = true;
    btn.textContent = "Sending…";
    try {
      // Google Forms doesn't allow reading the response cross-origin, so this is fire-and-forget
      await fetch(C.googleForm.action, { method: "POST", mode: "no-cors", body });
      form.hidden = true;
      done.hidden = false;
      done.focus();
    } catch (err) {
      btn.disabled = false;
      btn.textContent = "Send my reply";
      alert("Sorry — your reply could not be sent. Please check your connection, or use the Google Form link below the button.");
    }
  });
  $$(".field input").forEach(i => i.addEventListener("input", () => i.closest(".field").classList.remove("is-invalid")));
})();
