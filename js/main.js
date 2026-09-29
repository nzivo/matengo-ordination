/* =========================================================
   EDIT HERE — the details that drive the page.
   Wording (in every language) lives in js/i18n.js.
   ========================================================= */
const ORDINATION = {
  firstName: "Felix",
  displayName: "Felix Oyende Matengo",
  portrait: "images/felix-small.jpg",   // the gold initial shows until it loads, or if it can't; "" for initial only

  // Links that open when set; while "" the Media cards say "coming soon"
  livestream: "",                       // YouTube live link
  gallery: "",                          // photo & video galleries
  sharedAlbum: "",                      // album guests can upload to

  // RSVP opens this Google Form in a new tab (use the public link, never the /edit one)
  rsvpForm: "https://docs.google.com/forms/d/e/1FAIpQLSdHCJzoiHLxNh2svcJQMOfn0jXbz5-fJGuDUt6pwfPGgqBRWg/viewform",

  // Dates are YYYY-MM-DD; times are 24h "HH:MM", or "" while still to be confirmed.
  // place is a key in js/i18n.js ("place.eugene", "place.peace"); titles/descriptions are "cel.<id>.title/desc".
  celebrations: [
    { id: "diaconate", main: true, date: "2026-11-21", time: "10:30", doors: "09:00",
      place: "eugene", address: "Viale delle Belle Arti, 10, 00196 Rome",
      maps: "https://maps.google.com/?q=Basilica+di+Sant'Eugenio+Roma" },
    { id: "diaconate-thanks", date: "2026-11-22", time: "",
      place: "peace", address: "Viale Bruno Buozzi 75, Rome",
      maps: "https://maps.google.com/?q=Viale+Bruno+Buozzi+75+Roma" },
    { id: "priesthood", main: true, date: "2027-05-22", time: "10:00", doors: "09:00",
      place: "eugene", address: "Viale delle Belle Arti, 10, 00196 Rome",
      maps: "https://maps.google.com/?q=Basilica+di+Sant'Eugenio+Roma" },
    { id: "first-mass", date: "2027-05-23", time: "",
      place: "peace", address: "Viale Bruno Buozzi 75, Rome",
      maps: "https://maps.google.com/?q=Viale+Bruno+Buozzi+75+Roma" }
  ]
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

  const fill = (s, vars = {}) => s
    .replace(/\{first\}/g, html(C.firstName)).replace(/\{name\}/g, html(C.displayName))
    .replace(/\{(\w+)\}/g, (m, k) => k in vars ? vars[k] : m);
  const t = (key, vars) => {
    const s = (I18N[lang] || {})[key] ?? I18N.en[key];
    return s != null ? fill(s, vars) : english[key] ?? key;
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
  const yearLine = y => lang === "en" ? "Two Thousand" + (y % 1000 ? " " + under100(y % 1000) : "") : String(y);
  const clock = (date, time) => time
    ? at(date, time).toLocaleTimeString(LOCALES[lang], { hour: "numeric", minute: "2-digit", hour12: lang === "en" }).replace(" ", " ").toUpperCase()
    : "";

  const ordDeacon = C.celebrations.find(c => c.id === "diaconate");
  const ordPriest = C.celebrations.find(c => c.id === "priesthood");
  const deacon = at(ordDeacon.date, ordDeacon.time);
  const priest = at(ordPriest.date, ordPriest.time);
  const dayAfter = d => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
  // Something counts as "done" from the day after it
  const status = d => new Date() >= dayAfter(d) ? "done" : "upcoming";
  const next = status(deacon) === "upcoming" ? "deacon" : status(priest) === "upcoming" ? "priest" : null;

  $$("[data-milestone]").forEach(el => {
    const key = el.dataset.milestone;
    el.classList.toggle("is-done", status(key === "deacon" ? deacon : priest) === "done");
    el.classList.toggle("is-next", key === next);
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

  /* ---------- Celebrations timeline ---------- */
  const stepsEl = $("[data-celebrations]");
  function renderCelebrations(animate) {
    stepsEl.innerHTML = C.celebrations.map(c => {
      const d = at(c.date, c.time);
      const time = clock(c.date, c.time);
      const when = time
        ? `<strong>${time}</strong>${c.doors ? ` · ${t("cel.doors", { time: clock(c.date, c.doors) })}` : ""}`
        : `<em>${t("cel.tbc")}</em>`;
      const state = status(d) === "done" ? " is-done" : "";
      return `
        <li class="step${c.main ? " step--main" : ""}${state} reveal">
          <span class="step__mark" aria-hidden="true"></span>
          <p class="step__date">${cap(fmt(d, { weekday: "long", day: "numeric", month: "long", year: "numeric" }))}</p>
          <h3 class="step__title">${t(`cel.${c.id}.title`)}</h3>
          <p class="step__time">${when}</p>
          <p class="step__place"><strong>${t(`place.${c.place}`)}</strong><br>${html(c.address)}</p>
          <p class="step__desc">${t(`cel.${c.id}.desc`)}</p>
          <a class="step__link" href="${html(c.maps)}" target="_blank" rel="noopener">${t("cel.directions")}&nbsp;↗</a>
        </li>`;
    }).join("");
    $$(".reveal", stepsEl).forEach(el => animate ? observeReveal(el) : el.classList.add("is-in"));
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
    photo = Object.assign(new Image(), { className: "letter__img", decoding: "async" });
    photo.addEventListener("load", () => frameEl.classList.add("has-photo"));
    // Slow or failed download: remove it and the gold initial stays
    photo.addEventListener("error", () => { photo.remove(); photo = null; });
    photo.src = C.portrait;
    frameEl.appendChild(photo);
  }

  /* ---------- Paint all text in the current language ---------- */
  function render(first) {
    document.documentElement.lang = lang;
    document.title = t("title");

    $$("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      el.innerHTML = lang === "en" ? english[key] : t(key);
    });

    const meta = c => [clock(c.date, c.time), t(`place.${c.place}`)].filter(Boolean).join(" · ");
    const data = {
      ...C,
      initial: C.firstName.charAt(0),
      deaconLong: longDate(deacon), deaconYear: yearLine(deacon.getFullYear()), deaconMeta: meta(ordDeacon),
      priestLong: longDate(priest), priestYear: yearLine(priest.getFullYear()), priestMeta: meta(ordPriest)
    };
    $$("[data-bind]").forEach(el => {
      const v = data[el.dataset.bind];
      if (typeof v === "string" && v) el.textContent = v;
    });
    if (photo) photo.alt = t("portrait");

    // Google translates its own buttons (Submit, Required…) with hl; the questions stay as written
    $$("[data-rsvp]").forEach(a => { a.href = `${C.rsvpForm}?hl=${lang}`; });

    $$("[data-media]").forEach(el => {
      const key = el.dataset.media;
      el.innerHTML = C[key]
        ? `<a class="btn btn--primary btn--sm" href="${html(C[key])}" target="_blank" rel="noopener">${t(`media.${key}.open`)}&nbsp;↗</a>`
        : `<span class="pill">${t(`media.${key}.soon`)}</span>`;
    });

    tick();
    renderCelebrations(first);
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

  // Highlight the section in view
  const navLinks = $$('.nav__links a[href^="#"]:not([data-rsvp])');
  const sections = new Map(navLinks.map(a => [a.getAttribute("href").slice(1), a]));
  const spyIO = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    navLinks.forEach(a => a.classList.remove("is-active"));
    sections.get(en.target.id)?.classList.add("is-active");
  }), { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((_, id) => { const s = document.getElementById(id); if (s) spyIO.observe(s); });

  /* ---------- Go ---------- */
  render(true);
  $$(".reveal").forEach(el => { if (!stepsEl.contains(el)) observeReveal(el); });
})();
