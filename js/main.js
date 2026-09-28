/* =========================================================
   EDIT HERE — every personal detail on the site lives in this
   one object. Change a value and the page updates everywhere.
   Empty strings ("") hide that line on the page.
   Wording in other languages lives in js/i18n.js.
   ========================================================= */
const ORDINATION = {
  firstName: "Felix",
  displayName: "Felix Matengo",
  bishop: "",                           // e.g. "His Excellency Bishop N." — shown under the name
  motto: "",                            // e.g. "“Remain in my love”"
  patron: "",                           // e.g. "Saint Felix" — also added to the Litany
  homeParish: "",
  formedAt: "",
  portrait: "images/felix.jpg",         // the gold initial shows until it loads, or if it can't; "" for initial only
  livestream: "",                       // link appears in "Watching from afar" when set
  travel: "",                           // replaces the "Getting there" text when set

  // Dates are YYYY-MM-DD; times are 24h "HH:MM", or "" while still to be confirmed
  ordinations: {
    deacon: { date: "2026-11-21", time: "" },
    priest: { date: "2027-05-22", time: "" }
  },

  // Each event's title and description are in js/i18n.js under "ev.<id>.title" / "ev.<id>.desc".
  // tag is one of: "ordination", "following", "nextDay"
  events: [
    { group: "deacon", id: "diaconate", main: true, tag: "ordination",
      date: "2026-11-21", time: "", hours: 3, place: "", address: "" },
    { group: "deacon", id: "diaconate-lunch", tag: "following",
      date: "2026-11-21", time: "", hours: 3, place: "", address: "" },
    { group: "deacon", id: "villa-tevere", tag: "nextDay",
      date: "2026-11-22", time: "", hours: 1.5, place: "Villa Tevere", address: "Rome" },
    { group: "priest", id: "priesthood", main: true, tag: "ordination",
      date: "2027-05-22", time: "", hours: 3, place: "", address: "" },
    { group: "priest", id: "cavabianca-lunch", tag: "following",
      date: "2027-05-22", time: "", hours: 3, place: "Cavabianca", address: "Rome" },
    { group: "priest", id: "first-mass", tag: "nextDay",
      date: "2027-05-23", time: "", hours: 1.5, place: "", address: "" }
  ],

  // The RSVP section embeds this Google Form (use the public link, never the /edit one)
  googleForm: "https://docs.google.com/forms/d/e/1FAIpQLSdHCJzoiHLxNh2svcJQMOfn0jXbz5-fJGuDUt6pwfPGgqBRWg/viewform"
};

/* ========================================================= */

(function () {
  "use strict";
  const C = ORDINATION;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const html = s => String(s).replace(/[&<>"]/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));

  /* ---------- Language ---------- */
  const LOCALES = { en: "en-GB", es: "es-ES", fr: "fr-FR", it: "it-IT" };
  // English page text is whatever index.html says; keep a copy so we can switch back
  const english = {};
  $$("[data-i18n]").forEach(el => { if (!(el.dataset.i18n in english)) english[el.dataset.i18n] = el.innerHTML; });

  const store = {
    get() { try { return localStorage.getItem("lang"); } catch (e) { return null; } },
    set(v) { try { localStorage.setItem("lang", v); } catch (e) {} }
  };
  const fromUrl = new URLSearchParams(location.search).get("lang");
  let lang = [fromUrl, store.get()].find(l => l && LOCALES[l]) || "en";

  const fill = s => s.replace(/\{first\}/g, html(C.firstName)).replace(/\{name\}/g, html(C.displayName));
  const t = key => {
    const s = (I18N[lang] || {})[key] ?? I18N.en[key];
    return s != null ? fill(s) : english[key] ?? key;
  };

  /* ---------- Dates ---------- */
  const ORD = ["", "First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth",
    "Eleventh", "Twelfth", "Thirteenth", "Fourteenth", "Fifteenth", "Sixteenth", "Seventeenth", "Eighteenth",
    "Nineteenth", "Twentieth", "Twenty-First", "Twenty-Second", "Twenty-Third", "Twenty-Fourth", "Twenty-Fifth",
    "Twenty-Sixth", "Twenty-Seventh", "Twenty-Eighth", "Twenty-Ninth", "Thirtieth", "Thirty-First"];
  const ONES = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
    "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const under100 = n => n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? "-" + ONES[n % 10] : "");
  const roman = n => [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]].reduce((s, [v, r]) => { while (n >= v) { s += r; n -= v; } return s; }, "");
  const cap = s => s.charAt(0).toLocaleUpperCase(LOCALES[lang]) + s.slice(1);

  // Parse as local time so dates never shift across time zones
  const at = (date, time) => {
    const [y, m, d] = date.split("-").map(Number);
    const [hh, mm] = (time || "00:00").split(":").map(Number);
    return new Date(y, m - 1, d, hh, mm);
  };
  const fmt = (d, o) => d.toLocaleDateString(LOCALES[lang], o);
  // English keeps the formal invitation style; other languages use their own long date
  const longDate = d => lang === "en"
    ? `${fmt(d, { weekday: "long" })}, the ${ORD[d.getDate()]} of ${fmt(d, { month: "long" })}`
    : cap(fmt(d, { weekday: "long", day: "numeric", month: "long" }));
  const yearLine = y => lang === "en" ? "Two Thousand" + (y % 1000 ? " " + under100(y % 1000) : "") : `Anno Domini ${roman(y)}`;
  const shortDate = d => fmt(d, { day: "numeric", month: "long", year: "numeric" });
  const clock = (date, time) => time
    ? at(date, time).toLocaleTimeString(LOCALES[lang], { hour: "numeric", minute: "2-digit", hour12: lang === "en" }).replace(" ", " ")
    : "";

  const deacon = at(C.ordinations.deacon.date, C.ordinations.deacon.time);
  const priest = at(C.ordinations.priest.date, C.ordinations.priest.time);
  const dayAfter = d => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
  // A milestone counts as "done" from the day after it
  const status = d => new Date() >= dayAfter(d) ? "done" : "upcoming";
  const next = status(deacon) === "upcoming" ? "deacon" : status(priest) === "upcoming" ? "priest" : null;

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
  let tickTimer;
  function tick() {
    clearTimeout(tickTimer);
    const target = [deacon, priest].find(d => Date.now() < d.getTime());
    // On an ordination day, or once both are past, a line of thanksgiving replaces the countdown
    const message = isToday(deacon) ? t("cd.todayDeacon")
      : isToday(priest) ? t("cd.todayPriest")
      : !target ? t("cd.forever") : "";
    if (message) {
      $(".countdown-wrap").hidden = true;
      Object.assign($(".countdown__done"), { hidden: false, textContent: message });
      return;
    }
    cd.caption.textContent = t(target === deacon ? "cd.toDeacon" : "cd.toPriest");
    const mins = Math.floor((target - Date.now()) / 60000);
    cd.days.textContent = Math.floor(mins / 1440);
    cd.hours.textContent = String(Math.floor(mins / 60) % 24).padStart(2, "0");
    cd.minutes.textContent = String(mins % 60).padStart(2, "0");
    tickTimer = setTimeout(tick, 60000 - (Date.now() % 60000) + 50);
  }

  /* ---------- Events + calendar ---------- */
  const pad = n => String(n).padStart(2, "0");
  const icsUTC = d => `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
  const icsDay = d => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  const esc = s => s.replace(/[\\,;]/g, m => "\\" + m).replace(/\n/g, "\\n");
  const plain = s => { const d = document.createElement("div"); d.innerHTML = s; return d.textContent; };
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
      `SUMMARY:${esc(`${plain(t(`ev.${ev.id}.title`))} — ${C.displayName}`)}`,
      ...(where(ev) ? [`LOCATION:${esc(where(ev))}`] : []),
      `DESCRIPTION:${esc(plain(t(`ev.${ev.id}.desc`)))}`, "END:VEVENT", "END:VCALENDAR"
    ].join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([body], { type: "text/calendar" }));
    a.download = `${ev.id}.ics`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  const eventsEl = $("[data-events]");
  function renderEvents(animate) {
    eventsEl.innerHTML = "";
    [["deacon", "I", deacon], ["priest", "II", priest]].forEach(([key, numeral, date]) => {
      const wrap = document.createElement("div");
      wrap.className = "event-group" + (status(date) === "done" ? " is-done" : "");
      wrap.innerHTML = `<h3 class="event-group__head reveal"><span class="numeral">${numeral}</span>${t(`group.${key}`)}<span class="event-group__when">${fmt(date, { month: "long", year: "numeric" })}</span></h3><div class="events"></div>`;
      const grid = $(".events", wrap);

      C.events.filter(ev => ev.group === key).forEach(ev => {
        const d = at(ev.date, ev.time);
        const time = clock(ev.date, ev.time);
        const card = document.createElement("article");
        card.className = "event reveal" + (ev.main ? " event--main" : "");
        card.innerHTML = `
          <span class="event__tag${ev.main ? "" : " event__tag--quiet"}">${t(`tag.${ev.tag}`)}</span>
          <p class="event__date"><span class="event__day">${d.getDate()}</span>
            <span class="event__month">${cap(fmt(d, { month: "long" }))} ${d.getFullYear()}<br>${cap(fmt(d, { weekday: "long" }))}</span></p>
          <h4 class="event__title">${t(`ev.${ev.id}.title`)}</h4>
          <ul class="event__meta">
            <li>${time ? `<strong>${time}</strong>` : `<em>${t("ev.tbcTime")}</em>`}</li>
            <li>${ev.place ? `<strong>${html(ev.place)}</strong>` : `<em>${t("ev.tbaVenue")}</em>`}${ev.address ? `<br>${html(ev.address)}` : ""}</li>
          </ul>
          <p class="event__desc">${t(`ev.${ev.id}.desc`)}</p>
          <div class="event__actions">
            ${where(ev) ? `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(where(ev))}" target="_blank" rel="noopener">${t("ev.directions")}</a>` : ""}
            <button type="button">${t("ev.calendar")}</button>
          </div>`;
        $("button", card).addEventListener("click", () => downloadIcs(ev));
        grid.appendChild(card);
      });
      eventsEl.appendChild(wrap);
    });
    $$(".reveal", eventsEl).forEach(el => animate ? observeReveal(el) : el.classList.add("is-in"));
  }

  /* ---------- Reveal on scroll ---------- */
  const revealIO = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("is-in"); revealIO.unobserve(en.target); }
  }), { rootMargin: "0px 0px -8% 0px" });
  function observeReveal(el) {
    // Stagger siblings slightly so groups settle in, not all at once
    const sibs = [...el.parentElement.children].filter(c => c.classList.contains("reveal"));
    el.style.transitionDelay = `${Math.min(sibs.indexOf(el), 5) * 70}ms`;
    revealIO.observe(el);
  }

  /* ---------- Portrait: fades in over the initial once loaded ---------- */
  let photo = null;
  if (C.portrait) {
    const frameEl = $("[data-portrait]");
    photo = Object.assign(new Image(), { className: "profile__photo", decoding: "async" });
    photo.addEventListener("load", () => frameEl.classList.add("has-photo"));
    // Slow or failed download: remove it and the gold initial stays
    photo.addEventListener("error", () => { photo.remove(); photo = null; });
    photo.src = C.portrait;
    frameEl.appendChild(photo);
  }

  /* ---------- Paint all text in the current language ---------- */
  const frame = $("[data-form]");
  const parts = $$(".rite-part");
  const expand = $('[data-action="expand-all"]');
  const syncExpand = () => { expand.textContent = t(parts.every(p => p.open) ? "tools.close" : "tools.open"); };

  function render(first) {
    document.documentElement.lang = lang;
    document.title = t("title");

    $$("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      el.innerHTML = lang === "en" ? english[key] : t(key);
    });
    $$("[data-i18n-aria]").forEach(el => el.setAttribute("aria-label", t(el.dataset.i18nAria)));

    // Illuminated first letter on each reading
    $$(".pericope__text").forEach(el => {
      if ($(".incipit", el)) return;
      const text = el.innerHTML;
      el.innerHTML = `<span class="incipit">${text.charAt(0)}</span>${text.slice(1)}`;
    });

    const data = {
      ...C,
      initial: C.firstName.charAt(0),
      deaconLong: longDate(deacon), deaconShort: shortDate(deacon), deaconYear: yearLine(deacon.getFullYear()),
      priestLong: longDate(priest), priestShort: shortDate(priest), priestYear: yearLine(priest.getFullYear()),
      yearsRoman: deacon.getFullYear() === priest.getFullYear()
        ? roman(priest.getFullYear())
        : `${roman(deacon.getFullYear())} – ${roman(priest.getFullYear())}`
    };
    $$("[data-bind]").forEach(el => {
      const v = data[el.dataset.bind];
      if (typeof v === "string" && v) el.textContent = v;
    });
    $$("[data-hide-empty]").forEach(el => { el.hidden = !data[el.dataset.hideEmpty]; });

    if (photo) photo.alt = t("portrait");

    $("[data-live]").innerHTML = C.livestream
      ? `<a class="link" href="${html(C.livestream)}" target="_blank" rel="noopener">${t("v6.link")}</a>`
      : `<em>${t("v6.none")}</em>`;
    $('[data-href="formView"]').href = `${C.googleForm}?hl=${lang}`;

    // Google translates its own buttons (Submit, Required…) with hl; the questions stay as written
    const src = `${C.googleForm}?embedded=true&hl=${lang}`;
    if (frame.getAttribute("src") !== src) {
      frame.closest(".rsvp__frame").classList.remove("is-loaded");
      frame.src = src;
    }
    frame.title = t("rsvp.frame");

    tick();
    renderEvents(first);
    syncExpand();
    syncLangPicker();
  }

  /* ---------- Language picker ---------- */
  const picker = $("[data-lang]");
  const pickerBtn = $(".lang__btn", picker);
  const panel = $(".lang__panel", picker);
  const options = $$('[role="option"]', picker);

  function syncLangPicker() {
    const current = options.find(o => o.dataset.value === lang);
    $("[data-lang-flag]", picker).className = `flag flag--${lang}`;
    $("[data-lang-name]", picker).textContent = current.textContent;
    options.forEach(o => o.setAttribute("aria-selected", String(o === current)));
  }
  function openPicker() {
    panel.hidden = false;
    picker.classList.add("is-open");
    pickerBtn.setAttribute("aria-expanded", "true");
    (options.find(o => o.dataset.value === lang) || options[0]).focus();
  }
  function closePicker(returnFocus) {
    if (panel.hidden) return;
    panel.hidden = true;
    picker.classList.remove("is-open");
    pickerBtn.setAttribute("aria-expanded", "false");
    if (returnFocus) pickerBtn.focus();
  }
  function setLang(value) {
    closePicker(true);
    if (value === lang) return;
    lang = value;
    store.set(lang);
    // Keep the choice in the address so a shared link opens in the same language
    const url = new URL(location.href);
    if (lang === "en") url.searchParams.delete("lang"); else url.searchParams.set("lang", lang);
    history.replaceState(null, "", url);
    render(false);
  }

  pickerBtn.addEventListener("click", () => panel.hidden ? openPicker() : closePicker(false));
  pickerBtn.addEventListener("keydown", e => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); openPicker(); }
  });
  options.forEach(o => o.addEventListener("click", () => setLang(o.dataset.value)));
  panel.addEventListener("keydown", e => {
    const i = options.indexOf(document.activeElement);
    const move = n => options[(i + n + options.length) % options.length].focus();
    if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
    else if (e.key === "Home") { e.preventDefault(); options[0].focus(); }
    else if (e.key === "End") { e.preventDefault(); options[options.length - 1].focus(); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (i >= 0) setLang(options[i].dataset.value); }
    else if (e.key === "Escape") { e.preventDefault(); closePicker(true); }
    else if (e.key === "Tab") closePicker(false);
  });
  document.addEventListener("click", e => { if (!picker.contains(e.target)) closePicker(false); });

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

  /* ---------- RSVP: embedded Google Form ---------- */
  frame.addEventListener("load", () => frame.closest(".rsvp__frame").classList.add("is-loaded"));

  /* ---------- Go ---------- */
  render(true);
  $$(".reveal").forEach(el => { if (!eventsEl.contains(el)) observeReveal(el); });
})();
