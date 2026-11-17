/* =====================================================================
   Vykreslení obsahu z config.js + menu, animace, formulář
   Obsah se upravuje v js/config.js – tento soubor není třeba měnit.
   ===================================================================== */
(function () {
  "use strict";

  var S = window.SITE || {};
  var TODO_RE = /\[(DOPLNIT|UPŘESNIT)/;
  var todos = [];

  /* ---------- Pomocné funkce ---------- */
  function get(path) {
    return path.split(".").reduce(function (o, k) { return o == null ? undefined : o[k]; }, S);
  }
  function isTodo(v) { return typeof v === "string" && TODO_RE.test(v); }
  function isSet(v) { return v != null && v !== "" && !isTodo(v); }

  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "class") n.className = attrs[k];
      else if (k === "text") setValue(n, attrs[k]);
      else n.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) n.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return n;
  }
  /* Vloží text; nevyplněné hodnoty zvýrazní */
  function setValue(node, value) {
    node.textContent = "";
    if (value == null) return;
    value = String(value);
    if (isTodo(value)) {
      node.appendChild(el("span", { class: "todo" }, [value]));
    } else {
      node.textContent = value;
    }
  }
  function icon(name, cls) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "icon" + (cls ? " " + cls : ""));
    svg.setAttribute("aria-hidden", "true");
    var use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", "#i-" + name);
    svg.appendChild(use);
    return svg;
  }
  function telHref(phone) { return "tel:" + String(phone).replace(/[^\d+]/g, ""); }
  function render(name, fn) {
    document.querySelectorAll('[data-render="' + name + '"]').forEach(fn);
  }

  /* Seznam nevyplněných údajů (vypíše se do konzole) */
  (function collect(obj, prefix) {
    Object.keys(obj).forEach(function (k) {
      var v = obj[k], p = prefix ? prefix + "." + k : k;
      if (v && typeof v === "object") collect(v, p);
      else if (isTodo(v)) todos.push(p + " = " + v);
    });
  })(S, "");

  /* ---------- Jednoduché texty: data-text="cesta.v.configu" ---------- */
  document.querySelectorAll("[data-text]").forEach(function (n) {
    var v = get(n.getAttribute("data-text"));
    if (v !== undefined) setValue(n, v);
  });

  /* ---------- Odkazy na telefon ---------- */
  document.querySelectorAll('[data-href="tel"]').forEach(function (a) {
    if (isSet(S.phone)) a.setAttribute("href", telHref(S.phone));
    else a.setAttribute("href", "#kontakt");
  });

  /* ---------- Profil ---------- */
  render("about-paragraphs", function (box) {
    (get("about.paragraphs") || []).forEach(function (t) { box.appendChild(el("p", { text: t })); });
  });
  render("about-facts", function (ul) {
    (get("about.facts") || []).forEach(function (f) {
      ul.appendChild(el("li", null, [el("strong", { text: f.value }), el("span", { text: f.label })]));
    });
  });
  render("about-creds", function (ul) {
    var items = [];
    if (get("about.education")) items.push({ i: "cap", t: "Vzdělání", d: get("about.education") });
    if (S.ckait) items.push({ i: "award", t: S.ckait.field, d: "Autorizace ČKAIT č. " + S.ckait.number, todo: isTodo(S.ckait.number) || isTodo(S.ckait.field) });
    items.push({ i: "docs", t: "Podnikání od roku " + S.since, d: "Projektová činnost ve výstavbě, poradenství, odborné studie a posudky, technické návrhy." });
    items.forEach(function (c) {
      var d = el("span");
      if (c.todo) d.appendChild(el("span", { class: "todo" }, [c.d])); else setValue(d, c.d);
      ul.appendChild(el("li", null, [icon(c.i), el("div", null, [el("strong", { text: c.t }), d])]));
    });
  });

  /* ---------- Služby ---------- */
  render("services", function (ul) {
    (S.services || []).forEach(function (s) {
      ul.appendChild(el("li", { class: "reveal" }, [
        el("article", { class: "card" }, [
          el("div", { class: "card__icon" }, [icon(s.icon)]),
          el("h3", { text: s.title }),
          el("p", { text: s.text })
        ])
      ]));
    });
  });

  /* ---------- Pro koho ---------- */
  render("audiences", function (ul) {
    (S.audiences || []).forEach(function (a) {
      ul.appendChild(el("li", { class: "audience reveal" }, [
        icon(a.icon),
        el("div", null, [el("h3", { text: a.title }), el("p", { text: a.text })])
      ]));
    });
  });

  /* ---------- Kroky ---------- */
  render("steps", function (ol) {
    (S.steps || []).forEach(function (s) {
      ol.appendChild(el("li", { class: "step reveal" }, [el("h3", { text: s.title }), el("p", { text: s.text })]));
    });
  });

  /* ---------- Reference ---------- */
  render("references-note", function (p) {
    p.textContent = S.referencesAreSamples
      ? "Ukázkové položky – budou nahrazeny skutečnými projekty."
      : "Výběr ze zpracovaných projektů v regionu i mimo něj.";
  });
  render("references", function (ul) {
    (S.references || []).forEach(function (r) {
      var img = el("img", { src: r.image, alt: r.alt || r.title, loading: "lazy", decoding: "async", width: "600", height: "400" });
      var media = el("div", { class: "ref__img" }, [img, el("span", { class: "ref__badge", text: r.type })]);
      if (S.referencesAreSamples) media.appendChild(el("span", { class: "ref__badge ref__badge--sample", text: "Ukázka" }));
      ul.appendChild(el("li", { class: "reveal" }, [
        el("article", { class: "ref" }, [
          media,
          el("div", { class: "ref__body" }, [
            el("h3", { text: r.title }),
            el("p", { text: r.scope + (r.year ? " · " + r.year : "") })
          ])
        ])
      ]));
    });
  });

  /* ---------- Kontakty ---------- */
  var A = S.address || {};
  var addressLine = A.street + ", " + A.zip + " " + A.city;

  render("contact-list", function (ul) {
    function row(ic, label, value, href) {
      var v = (href && isSet(value)) ? el("a", { href: href, text: value }) : el("b", { text: value });
      ul.appendChild(el("li", null, [el("span", { class: "ci" }, [icon(ic)]), el("div", null, [el("small", { text: label }), v])]));
    }
    row("phone", "Telefon", S.phone, telHref(S.phone));
    row("mail", "E-mail", S.email, "mailto:" + S.email);
    row("pin", "Sídlo", addressLine, "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(addressLine));
    row("area", "Působnost", S.area);
    if (S.workingHours) row("clock", "Pracovní doba", S.workingHours);
  });

  /* Mapa – načte se až po kliknutí (rychlost + žádné cookies předem) */
  render("map", function (box) {
    if (!S.showMap) { box.remove(); return; }
    var btn = el("button", { type: "button", class: "map__placeholder" }, [
      el("span", null, [icon("pin"), ""]),
      el("span", null, ["Zobrazit mapu", el("small", { text: addressLine + " · načte se z Google Maps" })])
    ]);
    btn.addEventListener("click", function () {
      var q = encodeURIComponent(addressLine);
      var frame = el("iframe", {
        title: "Mapa – " + addressLine,
        loading: "lazy",
        referrerpolicy: "no-referrer-when-downgrade",
        allowfullscreen: "",
        src: "https://www.google.com/maps?q=" + q + "&z=15&hl=cs&output=embed"
      });
      var link = el("p", { style: "margin:10px 0 0;font-size:.9rem" }, [
        el("a", { href: "https://www.google.com/maps/search/?api=1&query=" + q, target: "_blank", rel: "noopener" }, ["Otevřít v Google Maps ↗"])
      ]);
      box.replaceChildren(frame, link);
    });
    box.appendChild(btn);
  });

  /* ---------- Patička ---------- */
  render("footer-meta", function (box) {
    box.appendChild(el("div", { text: addressLine }));
    var ids = el("div", null, ["IČO: " + S.ico]);
    if (S.dic) { ids.appendChild(document.createTextNode(" · DIČ: ")); ids.appendChild(el("span", { text: S.dic })); }
    if (S.vatPayer === true) ids.appendChild(document.createTextNode(" · plátce DPH"));
    if (S.vatPayer === false) ids.appendChild(document.createTextNode(" · neplátce DPH"));
    box.appendChild(ids);
    var c = el("div");
    if (isSet(S.phone)) c.appendChild(el("a", { href: telHref(S.phone), text: S.phone })); else c.appendChild(el("span", { text: S.phone }));
    c.appendChild(document.createTextNode(" · "));
    if (isSet(S.email)) c.appendChild(el("a", { href: "mailto:" + S.email, text: S.email })); else c.appendChild(el("span", { text: S.email }));
    box.appendChild(c);
    box.appendChild(el("div", { text: "Podnikatel zapsaný v živnostenském rejstříku." }));
  });
  render("year", function (n) { n.textContent = new Date().getFullYear(); });

  /* ---------- Strukturovaná data schema.org ---------- */
  (function () {
    var ld = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": S.name + " – " + S.role,
      "description": S.roleLong + ": vnitřní vodovod, kanalizace, plynovod a přípojky.",
      "founder": { "@type": "Person", "name": S.name, "jobTitle": S.roleLong },
      "foundingDate": String(S.since),
      "taxID": S.ico,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": A.street, "postalCode": A.zip, "addressLocality": A.city,
        "addressRegion": A.region, "addressCountry": A.country
      },
      "areaServed": isSet(S.area) ? S.area : A.region,
      "hasCredential": S.ckait ? { "@type": "EducationalOccupationalCredential", "name": S.ckait.field + " (ČKAIT " + S.ckait.number + ")", "recognizedBy": { "@type": "Organization", "name": "Česká komora autorizovaných inženýrů a techniků činných ve výstavbě" } } : undefined,
      "knowsAbout": (S.services || []).map(function (s) { return s.title; })
    };
    if (isSet(S.url)) { ld.url = S.url; ld.image = S.url.replace(/\/$/, "") + "/img/og-image.png"; }
    if (isSet(S.phone)) ld.telephone = S.phone;
    if (isSet(S.email)) ld.email = S.email;
    if (isSet(S.dic)) ld.vatID = S.dic;
    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(ld);
    document.head.appendChild(s);
  })();

  /* ---------- Menu ---------- */
  var header = document.querySelector(".header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("menu");

  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Zavřít menu" : "Otevřít menu");
    toggle.querySelector("use").setAttribute("href", open ? "#i-close" : "#i-menu");
  }
  toggle.addEventListener("click", function () { setMenu(!nav.classList.contains("is-open")); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) { setMenu(false); toggle.focus(); }
  });
  window.matchMedia("(min-width: 960px)").addEventListener("change", function () { setMenu(false); });

  window.addEventListener("scroll", function () {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }, { passive: true });

  /* Zvýraznění aktivní sekce v menu */
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav__list a"));
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          var on = a.getAttribute("href") === "#" + en.target.id;
          a.classList.toggle("is-active", on);
          if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(function (a) { var t = document.querySelector(a.getAttribute("href")); if (t) spy.observe(t); });
  }

  /* ---------- Animace při posouvání ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (n, i) {
      n.style.transitionDelay = (n.parentElement && n.parentElement.children.length > 1 && n.tagName === "LI") ? (Array.prototype.indexOf.call(n.parentElement.children, n) % 4) * 80 + "ms" : "0ms";
      io.observe(n);
    });
  } else {
    revealEls.forEach(function (n) { n.classList.add("is-visible"); });
  }

  /* ---------- Kontaktní formulář ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    var status = form.querySelector(".form__status");
    var showStatus = function (msg, ok) {
      status.textContent = msg;
      status.className = "form__status " + (ok ? "is-ok" : "is-error");
    };

    form.addEventListener("input", function (e) { e.target.removeAttribute("aria-invalid"); });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var invalid = Array.prototype.filter.call(form.querySelectorAll("[required]"), function (f) {
        var bad = !f.value.trim() || (f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value));
        f.setAttribute("aria-invalid", bad ? "true" : "false");
        return bad;
      });
      if (invalid.length) {
        showStatus("Vyplňte prosím jméno, platný e-mail a zprávu.", false);
        invalid[0].focus();
        return;
      }
      if (form._gotcha.value) { showStatus("Děkujeme, zpráva byla odeslána.", true); form.reset(); return; }

      var data = new FormData(form);

      /* A) Formspree nebo jiný endpoint */
      if (S.formEndpoint) {
        var btn = form.querySelector("[type=submit]");
        btn.disabled = true;
        showStatus("Odesílám…", true);
        fetch(S.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
          .then(function (r) {
            if (!r.ok) throw new Error(r.status);
            showStatus("Děkujeme, zpráva byla odeslána. Odpověď přijde co nejdříve.", true);
            form.reset();
          })
          .catch(function () {
            showStatus("Zprávu se nepodařilo odeslat. Zkuste to prosím znovu nebo pošlete e-mail.", false);
          })
          .finally(function () { btn.disabled = false; });
        return;
      }

      /* B) Bez endpointu – otevře e-mailového klienta */
      if (!isSet(S.email)) {
        showStatus("E-mail zatím není v config.js vyplněn – formulář nelze odeslat.", false);
        return;
      }
      var body =
        "Jméno: " + data.get("jmeno") + "\n" +
        "E-mail: " + data.get("email") + "\n" +
        "Telefon: " + (data.get("telefon") || "–") + "\n" +
        "Typ stavby: " + data.get("typ_stavby") + "\n\n" +
        data.get("zprava");
      window.location.href = "mailto:" + S.email +
        "?subject=" + encodeURIComponent("Poptávka z webu – " + data.get("typ_stavby")) +
        "&body=" + encodeURIComponent(body);
      showStatus("Otevírám váš e-mailový program s předvyplněnou zprávou…", true);
    });
  }

  /* ---------- Upozornění na nevyplněné údaje ---------- */
  if (todos.length && window.console) {
    console.warn("[config.js] Nevyplněné údaje (" + todos.length + "):\n• " + todos.join("\n• "));
  }
})();
