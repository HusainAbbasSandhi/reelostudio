import { useState, useEffect } from "react";
import { Sparkles, ArrowRight, ArrowLeft, Wand2, RotateCcw, Check, Loader2, ImagePlus, Plus, X, Download, Eye, Smartphone, Monitor, Save, FolderOpen } from "lucide-react";

const C = { cream: "#FFF7EC", ink: "#20182B", coral: "#FF5A36", purple: "#6C2BD9", yellow: "#FFCB3C", mint: "#1FB68A" };
const display = { fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, letterSpacing: "-0.01em" };
const body = { fontFamily: "'Inter', sans-serif" };

// ---------- theme presets ----------
const STRUCTURES = {
  blob: { label: "Bold & Playful", radius: 28, bg: "#FFF7EC", ink: "#20182B", accent2: "#6C2BD9", accent3: "#FFCB3C", accentDefault: "#FF5A36" },
  sharp: { label: "Elegant", radius: 2, bg: "#141314", ink: "#F3EFE7", accent2: "#8a6d1f", accent3: "#E4D7B0", accentDefault: "#C9A227" },
  soft: { label: "Modern Minimal", radius: 6, bg: "#FAFAF7", ink: "#1C1C1A", accent2: "#1C1C1A", accent3: "#E4E1D6", accentDefault: "#1F3A63" },
  grid: { label: "Urban Bistro", radius: 0, bg: "#111111", ink: "#F2F2F2", accent2: "#8a9c2a", accent3: "#333", accentDefault: "#CFFF3C" },
  nightlife: { label: "After Dark", radius: 6, bg: "#0b0b0d", ink: "#F5F0E6", accent2: "#FFB020", accent3: "#241f26", accentDefault: "#FF2E88", pop2: "#7DE9F2" },
};
const TYPOGRAPHY = {
  playful: { label: "Bold Sans", font: "'Segoe UI', system-ui, sans-serif", weight: 800, tracking: "-0.02em", caseStyle: "none" },
  finedine: { label: "Elegant Serif", font: "Georgia, 'Times New Roman', serif", weight: 400, tracking: "0.03em", caseStyle: "none" },
  cafe: { label: "Clean Modern", font: "'Helvetica Neue', Arial, sans-serif", weight: 500, tracking: "0.01em", caseStyle: "none" },
  bistro: { label: "Condensed Bold", font: "'Arial Narrow', 'Segoe UI', system-ui, sans-serif", weight: 700, tracking: "0.04em", caseStyle: "uppercase" },
  nightlife: { label: "Heavy Impact", font: "'Helvetica Neue', Arial, sans-serif", displayFont: "'Anton', Impact, 'Arial Narrow', sans-serif", googleFontImport: "family=Anton", weight: 800, tracking: "-0.01em", caseStyle: "uppercase" },
};
const SHAPE_DEFAULTS = { blob: { menuLayout: "cards", testiLayout: "marquee", galleryLayout: "pop" }, sharp: { menuLayout: "list", testiLayout: "quote", galleryLayout: "elegant" }, soft: { menuLayout: "cards", testiLayout: "quote", galleryLayout: "pop" }, grid: { menuLayout: "masonry", testiLayout: "ticker", galleryLayout: "grid" }, nightlife: { menuLayout: "masonry", testiLayout: "ticker", galleryLayout: "grid" } };
const HERO_LAYOUTS = [{ key: "blob", label: "Bold & Playful" }, { key: "sharp", label: "Elegant" }, { key: "soft", label: "Modern Minimal" }, { key: "grid", label: "Urban Bistro" }, { key: "nightlife", label: "After Dark" }];
const MENU_LAYOUTS = [{ key: "cards", label: "Card grid" }, { key: "list", label: "Price list" }, { key: "masonry", label: "Photo grid" }];
const TESTI_LAYOUTS = [{ key: "marquee", label: "Sliding cards" }, { key: "quote", label: "Rotating quote" }, { key: "ticker", label: "Scrolling ticker" }];
const GALLERY_LAYOUTS = [{ key: "pop", label: "Bold pop" }, { key: "elegant", label: "Elegant" }, { key: "grid", label: "Tight grid" }];
const SWATCHES = ["#FF5A36", "#C9A227", "#C98A6B", "#CFFF3C", "#6C2BD9", "#1FA6A6", "#E8578E", "#3B6EF6", "#FF2E88"];
const BG_SWATCHES = ["#FFF7EC", "#FFFFFF", "#FBF3EC", "#F3EFE7", "#141314", "#111111", "#1A1F2E", "#20182B", "#0b0b0d"];

const PRESETS = {
  playful: {
    key: "playful", label: "Bold & Playful", blurb: "Rounded shapes, bright accents, high energy",
    accent: "#FF5A36", accent2: "#6C2BD9", accent3: "#FFCB3C", bg: "#FFF7EC",
    textColor: "#20182B", textColorLight: "#F5F1EA",
    radius: 28, weight: 800, tracking: "-0.02em", font: "'Segoe UI', system-ui, sans-serif",
    shape: "blob", caseStyle: "none", menuLayout: "cards", testiLayout: "marquee", galleryLayout: "pop", typographyKey: "playful",
    showAbout: true, showTestimonials: true, showLocations: true,
  },
  finedine: {
    key: "finedine", label: "Elegant Fine Dining", blurb: "Serif type, deep tones, generous space",
    accent: "#C9A227", accent2: "#8a6d1f", accent3: "#E4D7B0", bg: "#141314",
    textColor: "#20182B", textColorLight: "#F3EFE7",
    radius: 2, weight: 400, tracking: "0.03em", font: "Georgia, 'Times New Roman', serif",
    shape: "sharp", caseStyle: "none", menuLayout: "list", testiLayout: "quote", galleryLayout: "elegant", typographyKey: "finedine",
    showAbout: true, showTestimonials: true, showLocations: true,
  },
  cafe: {
    key: "cafe", label: "Modern Minimal", blurb: "Editorial whitespace, thin frames, quiet confidence",
    accent: "#1F3A63", accent2: "#1C1C1A", accent3: "#E4E1D6", bg: "#FAFAF7",
    textColor: "#1C1C1A", textColorLight: "#F5F1EA",
    radius: 6, weight: 500, tracking: "0.01em", font: "'Helvetica Neue', Arial, sans-serif",
    shape: "soft", caseStyle: "none", menuLayout: "cards", testiLayout: "quote", galleryLayout: "pop", typographyKey: "cafe",
    showAbout: true, showTestimonials: true, showLocations: true,
  },
  bistro: {
    key: "bistro", label: "Urban Bistro", blurb: "Monochrome, condensed type, grid structure",
    accent: "#CFFF3C", accent2: "#8a9c2a", accent3: "#333", bg: "#111111",
    textColor: "#141414", textColorLight: "#F2F2F2",
    radius: 0, weight: 700, tracking: "0.04em", font: "'Arial Narrow', 'Segoe UI', system-ui, sans-serif",
    shape: "grid", caseStyle: "uppercase", menuLayout: "masonry", testiLayout: "ticker", galleryLayout: "grid", typographyKey: "bistro",
    showAbout: true, showTestimonials: true, showLocations: true,
  },
  nightlife: {
    key: "nightlife", label: "After Dark", blurb: "Rotating hero, neon energy, built for bars & nightlife",
    accent: "#FF2E88", accent2: "#FFB020", accent3: "#241f26", bg: "#0b0b0d",
    textColor: "#141414", textColorLight: "#F5F0E6",
    radius: 6, weight: 800, tracking: "-0.01em", font: "'Helvetica Neue', Arial, sans-serif",
    displayFont: "'Anton', Impact, 'Arial Narrow', sans-serif", googleFontImport: "family=Anton",
    shape: "nightlife", caseStyle: "uppercase", menuLayout: "masonry", testiLayout: "marquee", galleryLayout: "grid", typographyKey: "nightlife",
    showAbout: true, showTestimonials: true, showLocations: true, showOffers: true,
  },
};

const DEFAULT_CONTENT = {
  brand: "",
  bannerSubtitle: "",
  eyebrowText: "🔥 Now open",
  ratingBadge: "4.8 · 200+ reviews",
  openBadge: "Open now",
  ctaMenuLabel: "View menu",
  ctaDirectionsLabel: "Get directions →",
  ctaReserveLabel: "Reserve a table",
  navCtaLabel: "Visit us",
  tickerText: "WALK-INS WELCOME",
  kickerAbout: "Our story",
  kickerMenu: "On the table",
  kickerSpecials: "This week",
  kickerGallery: "Inside",
  kickerTestimonials: "Word on the street",
  kickerLocations: "Find us",
  kickerOffers: "Deals",
  titleAbout: "About",
  titleMenu: "Menu",
  titleSpecials: "Specials & Events",
  titleGallery: "Gallery",
  titleTestimonials: "Reviews",
  titleLocations: "Locations",
  titleOffers: "Offers & Deals",
  directionsUrl: "",
  about: "",
  logoImage: null,
  bannerImage: null,
  aboutImage: null,
  galleryImages: [],
  menuItems: [],
  highlights: [],
  specials: [],
  offers: [],
  heroSlides: [],
  testimonials: [],
  locations: [],
  email: "",
  phone: "",
  hours: "",
  addressFooter: "",
  copyright: "",
  socialLinks: [],
  orderLinks: [],
};

// =========================================================================
// SECTION BUILDERS — genuinely different structure per shape, not just color
// =========================================================================

function ef(edit, path, value) {
  if (!edit) return value;
  return `<span class="ed-field" data-field="${path}" contenteditable="true" spellcheck="false">${value}</span>`;
}
function eiInline(edit, path) {
  if (!edit) return "";
  return `<div class="ed-img-hint">📷<input type="file" accept="image/*" class="ed-file-input-badge" data-imgfield="${path}"/></div>`;
}
function ei(edit, path, imgHtml) {
  if (!edit) return imgHtml;
  return `<div class="ed-img-wrap">${imgHtml}<input type="file" accept="image/*" class="ed-file-input" data-imgfield="${path}"/></div>`;
}

function heroBlock(t, c, btnText, first, rest, edit) {
  const img = c.bannerImage;
  const menuBtn = `<a class="btn" href="#menu" data-scrollto="menu">${ef(edit, "ctaMenuLabel", c.ctaMenuLabel)}</a>`;
  const dirBtn = `<a class="btn-ghost" href="#locations" data-scrollto="locations">${ef(edit, "ctaDirectionsLabel", c.ctaDirectionsLabel)}</a>`;
  const reserveBtn = `<a class="btn" href="#visit" data-scrollto="visit">${ef(edit, "ctaReserveLabel", c.ctaReserveLabel)}</a>`;
  const eyebrow = ef(edit, "eyebrowText", c.eyebrowText);

  if (t.shape === "blob") {
    const visual = `<div class="blob">${img ? `<img src="${img}" class="blob-img"/>` : `<div class="blob-emoji">🍽️</div>`}${eiInline(edit, "bannerImage")}</div>
       <div class="float-card f1"><span class="dot"></span> ${ef(edit, "openBadge", c.openBadge)}</div>
       <div class="float-card f2">★ ${ef(edit, "ratingBadge", c.ratingBadge)}</div>`;
    return `<section class="hero hero-split">
      <div>
        <div class="eyebrow">${eyebrow}</div>
        <h1>${first} <span>${rest}</span></h1>
        <p class="sub">${ef(edit, "bannerSubtitle", c.bannerSubtitle)}</p>
        <div class="ctas">${menuBtn}${dirBtn}</div>
      </div>
      <div class="hero-visual">${visual}</div>
    </section>`;
  }
  if (t.shape === "soft") {
    return `<section class="hero hero-editorial">
      <div class="ed-hero-text">
        <div class="eyebrow">${eyebrow}</div>
        <h1>${first}<br><span>${rest}</span></h1>
        <p class="sub">${ef(edit, "bannerSubtitle", c.bannerSubtitle)}</p>
        <div class="ctas">${menuBtn}${dirBtn}</div>
      </div>
      <div class="ed-hero-frame">${img ? `<img src="${img}"/>` : `<div class="ed-hero-frame-ph">✦</div>`}${eiInline(edit, "bannerImage")}</div>
    </section>`;
  }
  if (t.shape === "sharp") {
    return `<section class="hero hero-center">
      ${img ? `<img src="${img}" class="hero-bg"/>` : `<div class="hero-bg hero-bg-grad"></div>`}
      ${eiInline(edit, "bannerImage")}
      <div class="hero-overlay"></div>
      <div class="hero-center-content">
        <div class="eyebrow">${eyebrow}</div>
        <h1>${first} <span>${rest}</span></h1>
        <div class="rule"></div>
        <p class="sub sub-center">${ef(edit, "bannerSubtitle", c.bannerSubtitle)}</p>
        <div class="ctas ctas-center">${reserveBtn}${menuBtn}</div>
      </div>
    </section>`;
  }
  if (t.shape === "nightlife") {
    const slidesRaw = c.heroSlides && c.heroSlides.length ? c.heroSlides : [{ line1: first, line2: rest, subtitle: c.bannerSubtitle, image: c.bannerImage }];
    const slidesHtml = slidesRaw.map((s, i) => {
      const bg = s.image ? `<img src="${s.image}" class="hero-bg"/>` : `<div class="hero-bg hero-bg-grad"></div>`;
      return `<div class="hero-slide${i === 0 ? " active" : ""}" data-slide="${i}">
        ${bg}${eiInline(edit, `heroSlides.${i}.image`)}
        <div class="hero-overlay"></div>
        <div class="hero-slide-content">
          <div class="eyebrow">${eyebrow}</div>
          <h1>${ef(edit, `heroSlides.${i}.line1`, s.line1 || "")}<br><span>${ef(edit, `heroSlides.${i}.line2`, s.line2 || "")}</span></h1>
          <p class="sub">${ef(edit, `heroSlides.${i}.subtitle`, s.subtitle || "")}</p>
        </div>
      </div>`;
    }).join("");
    const dots = slidesRaw.length > 1 ? `<div class="hero-dots">${slidesRaw.map((_, i) => `<span class="hero-dot${i === 0 ? " active" : ""}"></span>`).join("")}</div>` : "";
    return `<section class="hero hero-nightlife">
      ${slidesHtml}
      <div class="hero-nightlife-foot"><div class="ctas">${menuBtn}${dirBtn}</div>${dots}</div>
    </section>`;
  }
  return `<section class="hero hero-grid">
    <div class="hero-grid-num">01</div>
    <h1>${first}<br><span>${rest || "MENU"}</span></h1>
    <p class="sub">${ef(edit, "bannerSubtitle", c.bannerSubtitle)}</p>
    <div class="ctas">${menuBtn}${dirBtn}</div>
    <div class="ticker"><div class="ticker-track">${Array(4).fill(`<span>${c.brand.toUpperCase()} &nbsp;•&nbsp; ${c.hours} &nbsp;•&nbsp; ${(c.tickerText || "").toUpperCase()} &nbsp;•&nbsp; </span>`).join("")}</div></div>
  </section>`;
}

function offersBlock(t, c, edit) {
  if (!t.showOffers) return "";
  const items = c.offers && c.offers.length ? c.offers : [{ title: "Happy Hour", description: "Half-price drinks and snacks at the bar", price: "12 PM – 8 PM" }];
  const kicker = ef(edit, "kickerOffers", c.kickerOffers);
  const title = ef(edit, "titleOffers", c.titleOffers);
  const rows = items.map((o, i) => ({
    title: ef(edit, `offers.${i}.title`, o.title),
    desc: ef(edit, `offers.${i}.description`, o.description),
    price: ef(edit, `offers.${i}.price`, o.price || ""),
  }));
  const cls = t.shape === "nightlife" ? "offers-row offers-neon" : "offers-row";
  return `<section data-reveal><div class="head"><div class="kicker">${kicker}</div><h2>${title}</h2></div>
    <div class="${cls}" data-stagger>${rows.map((r) => `<div class="offer-card">${r.price ? `<div class="offer-price">${r.price}</div>` : ""}<h3>${r.title}</h3><p>${r.desc}</p></div>`).join("")}</div>
  </section>`;
}

function aboutBlock(t, c, edit) {
  if (!t.showAbout || (!c.about && !edit)) return "";
  const aboutText = ef(edit, "about", c.about);
  const kicker = ef(edit, "kickerAbout", c.kickerAbout);
  const title = ef(edit, "titleAbout", c.titleAbout);
  if (t.shape === "sharp") {
    return `<section data-reveal class="about-center"><div class="kicker">${kicker}</div><p class="about-lede">${aboutText}</p></section>`;
  }
  if (t.shape === "grid") {
    return `<section data-reveal class="about-grid"><div class="num-watermark">02</div><div><div class="kicker">${kicker}</div><h2>${title}</h2></div><p>${aboutText}</p></section>`;
  }
  return `<section data-reveal class="about-split">
    <div class="about-img">${c.aboutImage ? `<img src="${c.aboutImage}"/>` : `<div class="about-img-placeholder">📖</div>`}${eiInline(edit, "aboutImage")}</div>
    <div><div class="kicker">${kicker}</div><h2>${title}</h2><p>${aboutText}</p></div>
  </section>`;
}

function menuBlock(t, c, edit) {
  const menu = c.menuItems.length ? c.menuItems : [{ name: "Signature Plate", price: "" }, { name: "House Favorite", price: "" }, { name: "Chef's Pick", price: "" }];
  const layout = t.menuLayout || "cards";
  const kicker = ef(edit, "kickerMenu", c.kickerMenu);
  const title = ef(edit, "titleMenu", c.titleMenu);
  if (layout === "list") {
    return `<section data-reveal id="menu"><div class="head"><div class="kicker">${kicker}</div><h2>${title}</h2></div>
      <div class="menu-list" data-stagger>${menu.map((m, i) => `<div class="menu-row"><span class="mname">${ef(edit, `menuItems.${i}.name`, m.name)}</span><span class="leader"></span><span class="mprice">${ef(edit, `menuItems.${i}.price`, m.price || "")}</span></div>`).join("")}</div>
    </section>`;
  }
  if (layout === "masonry") {
    const six = menu.slice(0, 6);
    return `<section data-reveal id="menu"><div class="head"><div class="num-watermark">03</div><div class="kicker">${kicker}</div><h2>${title}</h2></div>
      <div class="menu-masonry" data-stagger>${six.map((m, i) => `<div class="mtile">${m.image ? `<img src="${m.image}"/>` : `<div class="mtile-ph"></div>`}${eiInline(edit, `menuItems.${i}.image`)}<div class="mtile-label">${ef(edit, `menuItems.${i}.name`, m.name)}${m.price ? ` — ${ef(edit, `menuItems.${i}.price`, m.price)}` : ""}</div></div>`).join("")}</div>
    </section>`;
  }
  return `<section data-reveal id="menu"><div class="head"><div class="kicker">${kicker}</div><h2>${title}</h2></div>
    <div class="grid3" data-stagger>${menu.map((m, i) => `<div class="card"><div class="thumb">${m.image ? `<img src="${m.image}"/>` : "🍲"}${eiInline(edit, `menuItems.${i}.image`)}</div><h3>${ef(edit, `menuItems.${i}.name`, m.name)}</h3>${m.price ? `<div class="price">${ef(edit, `menuItems.${i}.price`, m.price)}</div>` : ""}</div>`).join("")}</div>
  </section>`;
}

function testimonialsBlock(t, c, edit) {
  if (!t.showTestimonials) return "";
  const testis = c.testimonials.length ? c.testimonials : [{ name: "Guest", text: "Great food, great room." }];
  const layout = t.testiLayout || "marquee";
  const kicker = ef(edit, "kickerTestimonials", c.kickerTestimonials);
  const title = ef(edit, "titleTestimonials", c.titleTestimonials);
  if (layout === "quote") {
    return `<section data-reveal><div class="head head-center"><div class="kicker">${kicker}</div><h2>${title}</h2></div>
      <div class="quote-stack">${testis.map((x, i) => `<div class="quote${i === 0 ? " active" : ""}">"${ef(edit, `testimonials.${i}.text`, x.text)}"<div class="qwho">— ${ef(edit, `testimonials.${i}.name`, x.name)}</div></div>`).join("")}</div>
    </section>`;
  }
  if (layout === "ticker") {
    return `<section data-reveal><div class="head"><div class="num-watermark">05</div><div class="kicker">${kicker}</div><h2>${title}</h2></div>
      <div class="review-ticker"><div class="review-ticker-track">${Array(2).fill(testis.map((x) => `<span>★★★★★ "${x.text}" — ${x.name} &nbsp;&nbsp;•&nbsp;&nbsp; </span>`).join("")).join("")}</div></div>
    </section>`;
  }
  return `<section data-reveal><div class="head"><div class="kicker">${kicker}</div><h2>${title}</h2></div>
    <div class="tviewport"><div class="ttrack" id="ttrack">${testis.map((x, i) => `<div class="testi"><div class="stars">★★★★★</div><p>"${ef(edit, `testimonials.${i}.text`, x.text)}"</p><div class="who">${ef(edit, `testimonials.${i}.name`, x.name)}</div></div>`).join("")}</div></div>
  </section>`;
}

function highlightsBlock(t, c, edit) {
  const items = c.highlights && c.highlights.length ? c.highlights : [{ icon: "✨", label: "Great food" }];
  if (t.shape === "sharp") {
    return `<section data-reveal><div class="highlights-row highlights-elegant" data-stagger>${items.map((h, i) => `<div class="hl-elegant"><span class="hl-icon">${h.icon}</span><span>${ef(edit, `highlights.${i}.label`, h.label)}</span></div>`).join("")}</div></section>`;
  }
  if (t.shape === "grid") {
    return `<section data-reveal><div class="highlights-row highlights-grid" data-stagger>${items.map((h, i) => `<div class="hl-grid"><span class="hl-num">0${i + 1}</span><span class="hl-icon">${h.icon}</span><span>${ef(edit, `highlights.${i}.label`, h.label)}</span></div>`).join("")}</div></section>`;
  }
  return `<section data-reveal><div class="highlights-row highlights-pill" data-stagger>${items.map((h, i) => `<div class="hl-pill"><span class="hl-icon">${h.icon}</span><span>${ef(edit, `highlights.${i}.label`, h.label)}</span></div>`).join("")}</div></section>`;
}

function specialsBlock(t, c, edit) {
  const items = c.specials && c.specials.length ? c.specials : [{ title: "Happy Hour", description: "Half-price drinks and snacks at the bar", schedule: "Mon–Fri, 4–6 PM" }];
  const kicker = ef(edit, "kickerSpecials", c.kickerSpecials);
  const title = ef(edit, "titleSpecials", c.titleSpecials);
  const rows = items.map((s, i) => ({
    title: ef(edit, `specials.${i}.title`, s.title),
    desc: ef(edit, `specials.${i}.description`, s.description),
    when: ef(edit, `specials.${i}.schedule`, s.schedule),
  }));
  if (t.shape === "sharp") {
    return `<section data-reveal><div class="head"><div class="kicker">${kicker}</div><h2>${title}</h2></div>
      <div class="specials-list" data-stagger>${rows.map((r) => `<div class="special-row"><div><div class="special-title">${r.title}</div><div class="special-desc">${r.desc}</div></div><div class="special-when">${r.when}</div></div>`).join("")}</div>
    </section>`;
  }
  if (t.shape === "grid") {
    return `<section data-reveal><div class="head"><div class="num-watermark">04</div><div class="kicker">${kicker}</div><h2>${title}</h2></div>
      <div class="specials-row specials-bold" data-stagger>${rows.map((r) => `<div class="special-card"><div class="special-tag">${r.when}</div><h3>${r.title}</h3><p>${r.desc}</p></div>`).join("")}</div>
    </section>`;
  }
  return `<section data-reveal><div class="head"><div class="kicker">${kicker}</div><h2>${title}</h2></div>
    <div class="specials-row" data-stagger>${rows.map((r) => `<div class="special-card"><div class="special-tag">${r.when}</div><h3>${r.title}</h3><p>${r.desc}</p></div>`).join("")}</div>
  </section>`;
}

function galleryBlock(t, c, edit) {
  const uploaded = c.galleryImages && c.galleryImages.length ? c.galleryImages.slice(0, 4) : [];
  const usingUploaded = uploaded.length > 0;
  const imgs = usingUploaded ? uploaded : [c.bannerImage, c.aboutImage, ...(c.menuItems || []).map((m) => m.image)].filter(Boolean).slice(0, 4);
  const placeholders = ["🔥", "🧑‍🍳", "🌶️", "🍹"];
  const kicker = ef(edit, "kickerGallery", c.kickerGallery);
  const title = ef(edit, "titleGallery", c.titleGallery);
  const layout = t.galleryLayout || "pop";
  const cells = Array.from({ length: 4 }).map((_, i) => {
    const inner = imgs[i] ? `<img src="${imgs[i]}"/>` : `<div class="gal-ph">${placeholders[i]}</div>`;
    return `<div class="gal-cell">${inner}${usingUploaded ? eiInline(edit, `galleryImages.${i}`) : ""}</div>`;
  });
  if (layout === "elegant") {
    return `<section data-reveal><div class="head head-center"><div class="kicker">${kicker}</div><h2>${title}</h2></div><div class="gallery gallery-elegant" data-stagger>${cells.join("")}</div></section>`;
  }
  if (layout === "grid") {
    return `<section data-reveal><div class="head"><div class="num-watermark">06</div><div class="kicker">${kicker}</div><h2>${title}</h2></div><div class="gallery gallery-grid" data-stagger>${cells.join("")}</div></section>`;
  }
  return `<section data-reveal><div class="head"><div class="kicker">${kicker}</div><h2>${title}</h2></div><div class="gallery gallery-pop" data-stagger>${cells.join("")}</div></section>`;
}

function locationsBlock(t, c, edit) {
  if (!t.showLocations) return "";
  const locs = c.locations.length ? c.locations : [{ name: "Main location", address: c.addressFooter || "Address on request", mapUrl: "" }];
  const kicker = ef(edit, "kickerLocations", c.kickerLocations);
  const title = ef(edit, "titleLocations", c.titleLocations);
  const cards = locs.map((l, i) => {
    const url = (l.mapUrl && l.mapUrl.trim()) || (c.directionsUrl && c.directionsUrl.trim()) || ("https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(l.address || l.name || c.brand));
    const inner = `<b>${ef(edit, `locations.${i}.name`, l.name)}</b>${ef(edit, `locations.${i}.address`, l.address)}`;
    if (edit) {
      // plain div in edit mode so clicking text to edit it doesn't also trigger navigation
      return `<div class="loc">${inner}<a class="loc-arrow" href="${url}" target="_blank" rel="noopener" title="Open map link" onclick="event.stopPropagation();">↗</a></div>`;
    }
    return `<a class="loc" href="${url}" target="_blank" rel="noopener" onclick="try{window.parent.postMessage({source:'sitegen',type:'openLink',url:'${url.replace(/'/g, "\\'")}'},'*')}catch(e){}">${inner}<span class="loc-arrow">→</span></a>`;
  }).join("");
  return `<section data-reveal id="locations"><div class="head"><div class="kicker">${kicker}</div><h2>${title}</h2></div>
    <div class="locs">${cards}</div>
  </section>`;
}

// =========================================================================
function relLuminance(hex) {
  const c = (hex || "#ffffff").replace("#", "");
  const r = parseInt(c.substr(0, 2), 16) || 0, g = parseInt(c.substr(2, 2), 16) || 0, b = parseInt(c.substr(4, 2), 16) || 0;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}
function resolveInk(bgHex, theme) {
  return relLuminance(bgHex) > 0.55 ? (theme.textColor || "#1C1C1A") : (theme.textColorLight || "#F5F1EA");
}

const DEFAULT_SECTION_ORDER = ["highlights", "offers", "about", "menu", "specials", "gallery", "testimonials", "locations"];
const SECTION_BUILDERS = {
  highlights: highlightsBlock,
  offers: offersBlock,
  about: aboutBlock,
  menu: menuBlock,
  specials: specialsBlock,
  gallery: galleryBlock,
  testimonials: testimonialsBlock,
  locations: locationsBlock,
};

function buildHTML(theme, c, opts) {
  opts = opts || {};
  const edit = !!opts.editable;
  const isStatic = !!opts.staticPreview;
  const t = { ...theme, ink: resolveInk(theme.bg, theme) };
  const blobLike = t.shape === "blob";
  const dark = relLuminance(t.bg) <= 0.55;
  const btnText = t.shape === "grid" ? t.bg : dark ? "#141314" : "#fff";
  const first = c.brand.split(" ")[0];
  const rest = c.brand.split(" ").slice(1).join(" ");
  const svgColor = (hex) => (hex || "#000000").replace("#", "%23");

  const middleSections = DEFAULT_SECTION_ORDER.map((key) => (SECTION_BUILDERS[key] ? SECTION_BUILDERS[key](t, c, edit) : "")).join("");

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${t.googleFontImport ? `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?${t.googleFontImport}&display=swap" rel="stylesheet">` : ""}<style>
    *{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    body{font-family:${t.font};background:${t.bg};color:${t.ink};overflow-x:hidden;}
    a{color:inherit;text-decoration:none;}
    img{max-width:100%;display:block;}
    .wrap{max-width:1360px;margin:0 auto;padding:0 40px;}
    nav{display:flex;justify-content:space-between;align-items:center;padding:26px 0;font-weight:${t.weight};letter-spacing:${t.tracking};text-transform:${t.caseStyle};font-size:14px;background:${t.bg};}

    nav .brandrow{display:flex;align-items:center;gap:10px;}
    nav img.logo{width:32px;height:32px;border-radius:${blobLike ? "50%" : "4px"};object-fit:cover;}
    .navcta{background:${t.accent};color:${btnText};padding:9px 18px;border-radius:${blobLike ? 999 : 0}px;font-size:12px;font-weight:700;}

    section{padding:60px 0;}
    .head{position:relative;margin-bottom:34px;}
    .head-center{text-align:center;}
    .kicker{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:${t.accent};margin-bottom:8px;position:relative;display:inline-block;}
    .kicker::after{content:'';position:absolute;left:0;bottom:-4px;height:2px;width:28px;background:${t.accent};}
    h2{font-family:${t.displayFont || "inherit"};font-size:clamp(26px,3vw,36px);font-weight:${t.weight};text-transform:${t.caseStyle};}
    @keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}

    .eyebrow{display:inline-flex;align-items:center;gap:6px;background:${t.accent};color:${btnText};padding:6px 14px;border-radius:${blobLike ? 999 : 0}px;font-size:12px;font-weight:700;margin-bottom:18px;${t.shape === "blob" ? "transform:rotate(-2deg);" : ""}animation:fadeUp .6s cubic-bezier(.2,.7,.3,1) both;}
    h1{font-family:${t.displayFont || "inherit"};font-size:clamp(34px,4.8vw,58px);font-weight:${t.weight};letter-spacing:${t.tracking};text-transform:${t.caseStyle};line-height:1.04;margin-bottom:16px;animation:fadeUp .65s cubic-bezier(.2,.7,.3,1) both .08s;}
    h1 span{color:${t.accent};}
    p.sub{font-size:15px;opacity:.72;max-width:380px;margin-bottom:24px;line-height:1.6;animation:fadeUp .65s cubic-bezier(.2,.7,.3,1) both .16s;}
    .ctas{display:flex;gap:12px;align-items:center;animation:fadeUp .65s cubic-bezier(.2,.7,.3,1) both .24s;}
    .btn{display:inline-flex;align-items:center;gap:6px;background:${t.accent};color:${btnText};padding:13px 24px;border-radius:${blobLike ? 999 : t.radius}px;font-weight:700;font-size:13px;text-transform:${t.caseStyle};transition:transform .15s ease;animation:ctaGlow 3.5s ease-in-out 2s infinite;${t.shape !== "sharp" ? `box-shadow:0 6px 0 ${t.accent2};` : `border:1px solid ${t.accent};`}}
    .btn:hover{transform:translateY(-2px);}
    .btn:active{transform:translateY(3px);${t.shape !== "sharp" ? `box-shadow:0 3px 0 ${t.accent2};` : ""}}
    @keyframes ctaGlow{0%,80%,100%{filter:drop-shadow(0 0 0 transparent);}90%{filter:drop-shadow(0 0 10px ${t.accent}77);}}
    .btn-ghost{font-weight:700;font-size:13px;padding:13px 4px;border-bottom:2px solid ${t.ink};}

    .hero-split{display:grid;grid-template-columns:1.15fr .85fr;gap:36px;align-items:center;padding-top:50px;padding-bottom:90px;}
    .hero-visual{position:relative;aspect-ratio:1/.95;}
    .blob{position:absolute;inset:0;background:${t.accent2};border-radius:60% 40% 55% 45%/45% 55% 40% 60%;display:flex;align-items:center;justify-content:center;animation:blobMorph 12s cubic-bezier(.45,0,.15,1) infinite;overflow:hidden;}
    @keyframes blobMorph{0%,100%{border-radius:60% 40% 55% 45%/45% 55% 40% 60%;transform:rotate(-3deg);}50%{border-radius:48% 52% 42% 58%/56% 44% 58% 42%;transform:rotate(-1deg);}}
    .blob-emoji{font-size:100px;} .blob-img{width:100%;height:100%;object-fit:cover;}
    .circ{position:absolute;border-radius:50%;overflow:hidden;}
    .c1{width:78%;height:78%;top:0;right:0;background:${t.accent3};display:flex;align-items:center;justify-content:center;animation:floatSlow 8s ease-in-out infinite;}
    .c1 img{width:100%;height:100%;object-fit:cover;}
    .circ-emoji{font-size:80px;}
    .c2{width:38%;height:38%;bottom:0;left:0;background:${t.accent2};opacity:.7;animation:floatSlow 8s ease-in-out infinite 1s;}
    @keyframes floatSlow{0%,100%{transform:translateY(0);}50%{transform:translateY(-14px);}}
    .tape-badge{position:absolute;bottom:10px;right:-6px;background:#fff;color:${t.ink};padding:12px 16px;border-radius:4px;font-size:12px;font-weight:700;line-height:1.4;box-shadow:0 8px 20px rgba(0,0,0,.12);transform:rotate(4deg);}

    /* ---------- HERO: Modern Minimal (editorial split) ---------- */
    .hero-editorial{display:grid;grid-template-columns:1fr 0.9fr;gap:64px;align-items:end;padding:80px 0 90px;}
    .ed-hero-text .eyebrow{background:transparent;border:none;padding:0;color:${t.accent};font-size:12px;letter-spacing:.14em;text-transform:uppercase;}
    .ed-hero-frame{position:relative;aspect-ratio:.85;border:1px solid ${t.ink}30;padding:14px;}
    .ed-hero-frame img{width:100%;height:100%;object-fit:cover;}
    .ed-hero-frame-ph{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:40px;color:${t.accent};background:${t.accent}0d;}
    .float-card{position:absolute;background:${dark ? "#232025" : "#fff"};color:${t.ink};border-radius:16px;padding:12px 16px;box-shadow:0 10px 24px rgba(0,0,0,.15);font-weight:700;font-size:13px;display:flex;align-items:center;gap:8px;animation:bob 5s cubic-bezier(.45,0,.15,1) infinite;}
    .f1{top:-8px;right:0;} .f2{bottom:6px;left:-14px;animation-delay:.6s;}
    @keyframes bob{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
    .dot{width:8px;height:8px;border-radius:50%;background:${C.mint};animation:pulse 2s ease-in-out infinite;}
    @keyframes pulse{0%,100%{opacity:1;}50%{opacity:.4;}}

    .hero-center{position:relative;min-height:520px;display:flex;align-items:center;justify-content:center;margin:0 -28px 0;padding:0 28px;overflow:hidden;}
    .hero-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;animation:kenburns 18s ease-in-out infinite alternate;}
    .hero-bg-grad{background:linear-gradient(135deg,${t.accent2},#0d0c0d);}
    @keyframes kenburns{from{transform:scale(1);}to{transform:scale(1.045);}}
    .hero-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,9,10,.08) 0%,rgba(10,9,10,.22) 55%,rgba(10,9,10,.6) 100%);}
    .hero-center-content h1,.hero-center-content .sub,.hero-center-content .eyebrow{text-shadow:0 2px 16px rgba(0,0,0,.55);}
    .hero-center-content{position:relative;text-align:center;max-width:640px;padding:60px 0;}
    .hero-center-content .eyebrow{background:transparent;border:1px solid ${t.accent};color:${t.accent};}
    .rule{width:60px;height:1px;background:${t.accent};margin:0 auto 20px;}
    .sub-center{max-width:460px;margin-left:auto;margin-right:auto;font-style:italic;}
    .ctas-center{justify-content:center;}

    .hero-grid{position:relative;padding:30px 0 10px;border-bottom:3px solid ${t.ink};}
    .hero-grid-num{position:absolute;top:0;right:0;font-size:120px;font-weight:800;opacity:.06;line-height:1;}
    .hero-grid h1{font-size:clamp(46px,7vw,90px);}
    .ticker{border-top:2px solid ${t.ink};padding:12px 0;overflow:hidden;margin-top:26px;}
    .ticker-track{display:inline-block;white-space:nowrap;font-weight:800;font-size:14px;letter-spacing:.08em;animation:tickerScroll 18s linear infinite;}
    @keyframes tickerScroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}

    /* ---------- HERO: After Dark (rotating multi-slide) ---------- */
    .hero-nightlife{position:relative;min-height:600px;overflow:hidden;margin:0 -28px;padding:0 28px;display:flex;flex-direction:column;justify-content:flex-end;}
    .hero-slide{position:absolute;inset:0;opacity:0;transition:opacity 1s ease;pointer-events:none;}
    .hero-slide.active{opacity:1;z-index:1;pointer-events:auto;}
    .hero-slide .hero-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
    .hero-slide .hero-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.12) 0%,rgba(0,0,0,.35) 55%,rgba(0,0,0,.78) 100%);}
    .hero-slide-content{position:relative;padding:80px 28px 90px;max-width:660px;}
    .hero-slide-content h1,.hero-slide-content .sub,.hero-slide-content .eyebrow{text-shadow:0 2px 18px rgba(0,0,0,.6);}
    .hero-nightlife-foot{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:center;padding:0 28px 40px;flex-wrap:wrap;gap:16px;}
    .hero-dots{display:flex;gap:8px;}
    .hero-dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.35);transition:background .3s ease,transform .3s ease;}
    .hero-dot.active{background:${t.accent};transform:scale(1.3);}

    .offers-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px;}
    .offer-card{background:color-mix(in srgb, var(--sbg, ${t.bg}) 85%, var(--sink, ${t.ink}) 15%);border-radius:${t.radius}px;padding:22px;transition:transform .25s cubic-bezier(.2,.7,.3,1);}
    .offer-card:hover{transform:translateY(-5px);}
    .offer-price{display:inline-block;background:${t.accent};color:${btnText};font-size:11px;font-weight:800;padding:5px 12px;border-radius:${blobLike ? 999 : 0}px;margin-bottom:12px;letter-spacing:.04em;text-transform:uppercase;}
    .offer-card h3{font-size:17px;font-weight:${t.weight};margin-bottom:6px;text-transform:${t.caseStyle};}
    .offer-card p{font-size:13px;opacity:.7;line-height:1.55;white-space:pre-line;}
    .offers-neon .offer-card{border:1px solid ${t.accent}55;}
    .offers-neon .offer-card:hover{border-color:${t.accent};box-shadow:0 0 24px ${t.accent}33;}
    .offers-neon .offer-price{background:${t.accent2};color:#141414;}

    .about-split{display:grid;grid-template-columns:.9fr 1.1fr;gap:36px;align-items:center;}
    .about-img{position:relative;aspect-ratio:1/.85;border-radius:${t.radius}px;overflow:hidden;background:${t.accent}18;display:flex;align-items:center;justify-content:center;}
    .about-img img{width:100%;height:100%;object-fit:cover;transition:transform .5s ease;}
    .about-img:hover img{transform:scale(1.06);}
    .about-img-placeholder{font-size:48px;}
    .about-split p{font-size:15px;opacity:.75;line-height:1.75;margin-top:10px;white-space:pre-line;}
    .about-center{text-align:center;max-width:680px;margin:0 auto;}
    .about-lede{font-size:20px;line-height:1.7;font-style:italic;opacity:.85;white-space:pre-line;}
    .about-grid{position:relative;display:grid;grid-template-columns:.5fr 1fr;gap:30px;border-top:2px solid ${t.ink}30;padding-top:40px;}
    .about-grid p{font-size:14px;line-height:1.8;opacity:.8;align-self:center;white-space:pre-line;}
    .num-watermark{position:absolute;top:-6px;left:-6px;font-size:64px;font-weight:800;opacity:.08;}

    .grid3{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:18px;}
    .card{background:color-mix(in srgb, var(--sbg, ${t.bg}) 85%, var(--sink, ${t.ink}) 15%);border-radius:${t.radius}px;padding:20px;transition:transform .25s cubic-bezier(.2,.7,.3,1),box-shadow .25s ease,background .5s ease;overflow:hidden;}
    .card:hover{transform:translateY(-6px)${t.shape === "blob" ? " rotate(-1deg)" : ""};box-shadow:0 16px 32px rgba(0,0,0,.12);}
    .thumb{position:relative;aspect-ratio:4/3;border-radius:${Math.max(t.radius - 8, 0)}px;background:${t.accent}22;margin-bottom:12px;display:flex;align-items:center;justify-content:center;font-size:28px;overflow:hidden;}
    .thumb img{width:100%;height:100%;object-fit:cover;display:block;}
    .card h3{font-size:15px;font-weight:${t.weight};text-transform:${t.caseStyle};}
    .card .price{font-size:13px;font-weight:800;color:${t.accent};margin-top:4px;}

    .menu-list{max-width:640px;}
    .menu-row{display:flex;align-items:baseline;gap:10px;padding:16px 0;border-bottom:1px solid ${t.ink}18;}
    .mname{font-size:17px;white-space:nowrap;}
    .leader{flex:1;border-bottom:1px dotted ${t.ink}55;transform:translateY(-4px);}
    .mprice{font-size:14px;color:${t.accent};font-weight:600;white-space:nowrap;}

    .menu-masonry{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;background:${t.ink};}
    .mtile{position:relative;aspect-ratio:1;overflow:hidden;background:#000;}
    .mtile img{width:100%;height:100%;object-fit:cover;opacity:.75;transition:opacity .3s,transform .4s;}
    .mtile:hover img{opacity:1;transform:scale(1.06);}
    .mtile-ph{width:100%;height:100%;background:${t.accent}22;}
    .mtile-label{position:absolute;left:0;bottom:0;right:0;padding:12px;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:#fff;background:linear-gradient(0deg,rgba(0,0,0,.75),transparent);}

    .tviewport{overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);}
    .ttrack{display:flex;gap:18px;width:max-content;animation:marquee 40s linear infinite;}
    .tviewport:hover .ttrack{animation-play-state:paused;}
    @keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}
    .testi{background:color-mix(in srgb, var(--sbg, ${t.bg}) 88%, var(--sink, ${t.ink}) 12%);border:1px solid rgba(0,0,0,.05);border-radius:${t.radius}px;padding:22px;min-width:280px;flex-shrink:0;transition:transform .2s ease,background .5s ease;}
    .testi:hover{transform:translateY(-4px);}
    .stars{color:${t.accent};font-size:13px;margin-bottom:10px;}
    .testi p{font-size:14px;opacity:.85;line-height:1.6;margin-bottom:14px;white-space:pre-line;}
    .who{font-size:13px;font-weight:700;}

    .highlights-row{display:grid;gap:16px;}
    .highlights-pill{grid-template-columns:repeat(auto-fit,minmax(180px,1fr));}
    .hl-pill{background:color-mix(in srgb, var(--sbg, ${t.bg}) 88%, var(--sink, ${t.ink}) 12%);border-radius:999px;padding:14px 20px;display:flex;align-items:center;gap:10px;font-weight:700;font-size:14px;box-shadow:0 4px 14px rgba(0,0,0,.06);transition:transform .2s ease,background .5s ease;}
    .hl-pill:hover{transform:translateY(-3px);}
    .hl-icon{font-size:18px;display:inline-block;transition:transform .3s cubic-bezier(.34,1.56,.64,1);}
    .hl-pill:hover .hl-icon, .hl-elegant:hover .hl-icon, .hl-grid:hover .hl-icon{transform:scale(1.25) rotate(-8deg);}
    .highlights-elegant{grid-template-columns:repeat(auto-fit,minmax(160px,1fr));border-top:1px solid ${t.accent}40;border-bottom:1px solid ${t.accent}40;padding:24px 0;}
    .hl-elegant{display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center;font-size:12px;letter-spacing:.08em;text-transform:uppercase;}
    .hl-elegant .hl-icon{font-size:22px;}
    .highlights-grid{grid-template-columns:repeat(auto-fit,minmax(200px,1fr));border-top:2px solid ${t.ink};}
    .hl-grid{display:flex;align-items:center;gap:12px;padding:18px 0;border-bottom:1px solid ${t.ink}30;font-weight:700;font-size:14px;text-transform:uppercase;}
    .hl-num{font-size:12px;opacity:.4;font-weight:800;}

    .specials-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px;}
    .special-card{background:color-mix(in srgb, var(--sbg, ${t.bg}) 85%, var(--sink, ${t.ink}) 15%);border-radius:${t.radius}px;padding:22px;transition:transform .25s cubic-bezier(.2,.7,.3,1);}
    .special-card:hover{transform:translateY(-5px);}
    .special-tag{display:inline-block;background:${t.accent};color:${btnText};font-size:11px;font-weight:700;padding:4px 12px;border-radius:${blobLike ? 999 : 0}px;margin-bottom:12px;}
    .special-card h3{font-size:17px;font-weight:${t.weight};margin-bottom:6px;text-transform:${t.caseStyle};}
    .special-card p{font-size:13px;opacity:.7;line-height:1.55;white-space:pre-line;}
    .specials-bold .special-card{border-radius:0;background:${t.accent};color:${t.bg};}
    .specials-bold .special-tag{background:${t.bg};color:${t.accent};}
    .specials-bold .special-card p{opacity:.75;}
    .specials-list{max-width:680px;}
    .special-row{display:flex;justify-content:space-between;align-items:baseline;gap:16px;padding:16px 0;border-bottom:1px solid ${t.ink}18;}
    .special-title{font-size:16px;font-weight:600;}
    .special-desc{font-size:13px;opacity:.65;margin-top:2px;}
    .special-when{font-size:12px;color:${t.accent};font-weight:700;white-space:nowrap;text-align:right;}

    .gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
    .gal-cell{position:relative;aspect-ratio:1;border-radius:${t.radius}px;overflow:hidden;display:flex;align-items:center;justify-content:center;font-size:32px;transition:transform .3s cubic-bezier(.2,.7,.3,1),box-shadow .3s ease;}
    .gal-cell:hover{transform:scale(1.05);box-shadow:0 14px 28px rgba(0,0,0,.16);z-index:2;}
    .gal-cell img{width:100%;height:100%;object-fit:cover;transition:transform .5s ease;}
    .gal-cell:hover img{transform:scale(1.1);}
    .gallery-pop .gal-cell:nth-child(1){background:${t.accent};transform:rotate(-2deg);}
    .gallery-pop .gal-cell:nth-child(2){background:${t.accent3 || t.accent2};transform:rotate(2deg);margin-top:16px;}
    .gallery-pop .gal-cell:nth-child(3){background:${t.accent2};transform:rotate(-1deg);}
    .gallery-pop .gal-cell:nth-child(4){background:${t.accent};color:#fff;transform:rotate(2deg);margin-top:-10px;}
    .gallery-elegant .gal-cell{background:${t.accent2}33;}
    .gallery-grid{gap:2px;}
    .gallery-grid .gal-cell{border-radius:0;background:${t.accent}22;}

    .quote-stack{position:relative;max-width:640px;margin:0 auto;text-align:center;min-height:80px;}
    .quote{display:none;font-size:22px;font-style:italic;line-height:1.6;white-space:pre-line;}
    .quote.active{display:block;animation:quoteFadeIn .5s ease both;}
    @keyframes quoteFadeIn{from{opacity:0;}to{opacity:1;}}
    .qwho{margin-top:14px;font-size:13px;font-style:normal;opacity:.6;text-transform:uppercase;letter-spacing:.08em;}

    .review-ticker{border-top:2px solid ${t.ink}40;border-bottom:2px solid ${t.ink}40;padding:16px 0;overflow:hidden;}
    .review-ticker-track{display:inline-block;white-space:nowrap;font-weight:700;font-size:15px;animation:tickerScroll 26s linear infinite;}

    .locs{display:flex;flex-wrap:wrap;gap:12px;}
    .loc{display:block;position:relative;border:1px solid ${t.ink}22;border-radius:${t.radius}px;padding:14px 44px 14px 18px;font-size:13px;transition:border-color .2s ease,transform .2s ease;cursor:pointer;}
    .loc:hover{transform:translateY(-2px);}
    .loc-arrow{position:absolute;right:16px;top:50%;transform:translateY(-50%);opacity:.4;transition:opacity .2s ease,transform .2s ease;}
    .loc:hover .loc-arrow{opacity:1;transform:translateY(-50%) translateX(3px);}
    .loc:hover{border-color:${t.accent};}
    .loc b{display:block;font-size:14px;margin-bottom:3px;}
    footer{border-top:1px solid ${t.ink}22;padding:44px 0 30px;font-size:13px;}
    .foot-grid{display:flex;justify-content:space-between;flex-wrap:wrap;gap:20px;margin-bottom:20px;}
    .foot-links{display:flex;gap:8px;flex-wrap:wrap;margin:-8px;}
    .foot-links a{color:${t.accent};font-weight:700;padding:8px;display:inline-block;position:relative;z-index:1;}
    .foot-links a:hover{text-decoration:underline;}
    .copyright{opacity:.5;font-size:12px;}

    @media(max-width:760px){.hero-split,.hero-editorial{grid-template-columns:1fr;}.grid3{grid-template-columns:1fr 1fr;}.about-split,.about-grid{grid-template-columns:1fr;}.menu-masonry{grid-template-columns:1fr 1fr;}}
    @media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important;}}
    ${isStatic ? `*{animation:none!important;} [data-reveal],[data-stagger]>*{opacity:1!important;transform:none!important;}` : ""}
    ${t.shape === "nightlife" ? `
    /* ---------- After Dark signature treatments: numbered index, duotone pop text, tilted note cards ---------- */
    body{counter-reset:secnum 1;}
    .head{display:flex;flex-direction:column;counter-increment:secnum;}
    .head .kicker{order:1;font-size:12px;}
    .head .kicker::before{content:counter(secnum,decimal-leading-zero) " / ";color:${t.ink}88;}
    .head .kicker::after{display:none;}
    .head::after{content:'';order:2;display:block;height:1px;background:${t.ink}22;margin:14px 0 22px;}
    .head h2{order:3;}
    .head-center{align-items:center;}

    h1 span{color:${t.pop2 || t.accent2};text-shadow:4px 4px 0 ${t.accent},0 12px 30px rgba(0,0,0,.35);}
    h2{color:${t.ink};-webkit-text-stroke:1px ${t.accent}33;}
    #locations h2{color:transparent;-webkit-text-stroke:1.5px ${t.ink};}

    .testi{position:relative;border:2px solid ${t.accent};transform:rotate(-2deg);box-shadow:6px 6px 0 rgba(0,0,0,.35);}
    .testi:nth-child(3n+2){border-color:${t.pop2 || t.accent2};transform:rotate(1.5deg);background:${t.accent2}14;}
    .testi:nth-child(3n){border-color:${t.accent2};transform:rotate(-1deg);}
    .testi:hover{transform:rotate(0deg) translateY(-6px);}
    .testi::after{content:'REVIEW';position:absolute;top:10px;right:-2px;writing-mode:vertical-rl;font-size:9px;font-weight:800;letter-spacing:.1em;color:${t.accent};opacity:.6;}
    .stars{color:${t.pop2 || t.accent2};}

    .offer-card:nth-child(odd){transform:rotate(-1deg);}
    .offer-card:nth-child(even){transform:rotate(1deg);}
    .offer-card:hover{transform:rotate(0deg) translateY(-5px);}
    .num-watermark{display:none;}
    .tviewport{overflow:visible;-webkit-mask-image:none;mask-image:none;}
    .ttrack{flex-wrap:wrap;width:auto;animation:none;}
    ` : ""}
    ${t.shape === "blob" ? `
    /* ---------- Bold & Playful signature: hand-drawn squiggle + wiggle-on-hover ---------- */
    .kicker::after{content:'';position:absolute;left:0;bottom:-6px;background:transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='8' viewBox='0 0 40 8'%3E%3Cpath d='M1 5 Q6 1 11 5 T21 5 T31 5 T41 5' stroke='${svgColor(t.accent)}' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat;width:40px;height:8px;}
    @keyframes wiggle{0%,100%{transform:rotate(0deg);}25%{transform:rotate(-3deg);}75%{transform:rotate(3deg);}}
    .hl-pill:hover,.card:hover .thumb,.gal-cell:hover{animation:wiggle .4s ease;}
    .card:hover{box-shadow:0 20px 36px rgba(0,0,0,.16);}
    .thumb{transition:transform .3s cubic-bezier(.34,1.56,.64,1);}
    ` : ""}
    ${t.shape === "sharp" ? `
    /* ---------- Elegant Fine Dining signature: drop cap + ornamental dividers ---------- */
    .about-lede:first-letter,.about-split p:first-letter{float:left;font-size:3.6em;line-height:.78;padding:.05em .08em 0 0;color:${t.accent};font-family:${t.displayFont || t.font};}
    .head::after{content:'❖';display:block;color:${t.accent};font-size:13px;margin-top:16px;letter-spacing:.3em;}
    .head-center::after{text-align:center;}
    .about-img,.ed-hero-frame{border:1px solid ${t.accent}55;box-shadow:0 0 0 4px ${t.bg}, 0 0 0 5px ${t.accent}33;}
    .card{border:1px solid ${t.accent}25;}
    ` : ""}
    ${t.shape === "soft" ? `
    /* ---------- Modern Minimal signature: editorial stagger + underline-reveal links ---------- */
    .grid3 .card:nth-child(even){margin-top:28px;}
    .grid3 .card:nth-child(3n+2){margin-top:14px;}
    .btn-ghost{border-bottom:none;background-image:linear-gradient(${t.ink},${t.ink});background-size:0% 1px;background-position:0 100%;background-repeat:no-repeat;transition:background-size .3s cubic-bezier(.2,.7,.3,1);padding-bottom:2px;}
    .btn-ghost:hover{background-size:100% 1px;}
    .foot-links a{background-image:linear-gradient(${t.accent},${t.accent});background-size:0% 1px;background-position:8px 100%;background-repeat:no-repeat;transition:background-size .3s ease;}
    .foot-links a:hover{background-size:calc(100% - 16px) 1px;text-decoration:none;}
    ` : ""}
    ${t.shape === "grid" ? `
    /* ---------- Urban Bistro signature: halftone texture + glitch-on-hover ---------- */
    .thumb::before,.mtile::before,.gal-cell::before{content:'';position:absolute;inset:0;background-image:radial-gradient(${t.accent}30 1px, transparent 1.4px);background-size:7px 7px;pointer-events:none;z-index:1;}
    @keyframes glitch{0%{text-shadow:none;}20%{text-shadow:2px 0 ${t.accent2 || t.accent},-2px 0 ${t.accent};}40%{text-shadow:-2px 0 ${t.accent2 || t.accent},2px 0 ${t.accent};}100%{text-shadow:none;}}
    .card:hover h3,.mtile:hover .mtile-label,.hl-grid:hover span{animation:glitch .35s steps(2);}
    .hl-grid:hover{background:${t.accent}0d;}
    ` : ""}
    ${edit ? `
    .ed-field{outline:2px dashed transparent;outline-offset:3px;border-radius:4px;cursor:text;display:inline-block;min-width:1ch;}
    .ed-field:hover{outline-color:#00AEEF;}
    .ed-field:focus{outline-color:#00AEEF;outline-style:solid;background:rgba(0,174,239,.06);}
    .ed-img-wrap{position:relative;cursor:pointer;}
    .ed-img-wrap:hover::after{content:'📷 Click to replace';position:absolute;inset:0;background:rgba(0,0,0,.5);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;border-radius:inherit;text-align:center;padding:8px;pointer-events:none;z-index:1;}
    .ed-file-input{position:absolute;inset:0;opacity:0;cursor:pointer;z-index:2;}
    .ed-img-hint{position:absolute;bottom:8px;right:8px;width:30px;height:30px;border-radius:50%;background:rgba(0,0,0,.7);color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px;z-index:3;overflow:hidden;}
    .ed-file-input-badge{position:absolute;inset:0;opacity:0;cursor:pointer;}
    ` : ""}
  </style></head><body>
  <div class="wrap">
    <nav>
      <div class="brandrow">${c.logoImage ? ei(edit, "logoImage", `<img class="logo" src="${c.logoImage}"/>`) : ""}${ef(edit, "brand", c.brand)}</div>
      <a class="navcta" href="#locations" data-scrollto="locations">${ef(edit, "navCtaLabel", c.navCtaLabel)}</a>
    </nav>
    ${heroBlock(t, c, btnText, first, rest, edit)}
    ${middleSections}
    <footer id="visit">
      <div class="foot-grid">
        <div>${ef(edit, "hours", c.hours)}<br>${ef(edit, "phone", c.phone)}<br>${ef(edit, "email", c.email)}</div>
        <div class="foot-links">${[...c.socialLinks, ...c.orderLinks].map((l) => `<a href="${l.url || "#"}" target="_blank" rel="noopener" onclick="try{window.parent.postMessage({source:'sitegen',type:'openLink',url:'${(l.url || "#").replace(/'/g, "\\'")}'},'*')}catch(e){}">${l.platform}</a>`).join("")}</div>
      </div>
      <div class="copyright">${ef(edit, "copyright", c.copyright)}</div>
    </footer>
  </div>
  <script>
    try{
      document.querySelectorAll('[data-scrollto]').forEach(function(btn){
        btn.addEventListener('click', function(e){
          e.preventDefault();
          var target = document.getElementById(btn.getAttribute('data-scrollto'));
          if(target){
            var navH = (document.querySelector('nav') || {}).offsetHeight || 0;
            var top = target.getBoundingClientRect().top + window.scrollY - navH - 12;
            window.scrollTo({ top: top, behavior: 'smooth' });
          }
        });
      });
    }catch(e){}

    ${isStatic ? `
    try{ var track0 = document.getElementById('ttrack'); if(track0${t.shape === "nightlife" ? " && false" : ""}){ track0.innerHTML += track0.innerHTML; } }catch(e){}
    ` : `
    try{
      var track = document.getElementById('ttrack');
      if(track${t.shape === "nightlife" ? " && false" : ""}){ track.innerHTML += track.innerHTML; }
    }catch(e){}

    try{
      var quotes = document.querySelectorAll('.quote-stack .quote');
      if(quotes.length > 1){
        var qi = 0;
        setInterval(function(){
          quotes[qi].classList.remove('active');
          qi = (qi + 1) % quotes.length;
          quotes[qi].classList.add('active');
        }, 4500);
      }
    }catch(e){}

    try{
      var heroSlides = document.querySelectorAll('.hero-nightlife .hero-slide');
      var heroDots = document.querySelectorAll('.hero-dot');
      if(heroSlides.length > 1){
        var hi = 0;
        setInterval(function(){
          heroSlides[hi].classList.remove('active');
          if(heroDots[hi]) heroDots[hi].classList.remove('active');
          hi = (hi + 1) % heroSlides.length;
          heroSlides[hi].classList.add('active');
          if(heroDots[hi]) heroDots[hi].classList.add('active');
        }, 5000);
      }
    }catch(e){}
    `}

    ${edit ? `
    try{
      document.querySelectorAll('[data-field]').forEach(function(el){
        el.addEventListener('blur', function(){
          try{ window.parent.postMessage({source:'sitegen', type:'textEdit', field: el.getAttribute('data-field'), value: el.innerText}, '*'); }catch(e){}
        });
        el.addEventListener('keydown', function(e){
          if(e.key !== 'Enter') return;
          e.preventDefault();
          if(e.shiftKey){
            var sel = window.getSelection();
            if(sel && sel.rangeCount){
              var range = sel.getRangeAt(0);
              range.deleteContents();
              var br = document.createElement('br');
              range.insertNode(br);
              range.setStartAfter(br);
              range.collapse(true);
              sel.removeAllRanges();
              sel.addRange(range);
            }
          } else {
            el.blur();
          }
        });
      });
    }catch(e){}
    try{
      document.querySelectorAll('.ed-file-input, .ed-file-input-badge').forEach(function(inp){
        inp.addEventListener('change', function(e){
          var file = e.target.files && e.target.files[0];
          if(!file) return;
          var reader = new FileReader();
          reader.onload = function(){
            try{ window.parent.postMessage({source:'sitegen', type:'imageEdit', field: inp.getAttribute('data-imgfield'), value: reader.result}, '*'); }catch(e){}
          };
          reader.readAsDataURL(file);
        });
      });
    }catch(e){}
    ` : ""}
  </script>
  </body></html>`;
}

function slugify(s) { return (s || "site").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "site"; }

function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (x) => Math.round(255 * x).toString(16).padStart(2, "0");
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

function setByPath(obj, path, value) {
  const parts = path.split(".");
  function helper(o, idx) {
    const key = parts[idx];
    const isLast = idx === parts.length - 1;
    const isArrKey = /^\d+$/.test(key);
    const k = isArrKey ? Number(key) : key;
    const container = Array.isArray(o) ? [...o] : { ...o };
    container[k] = isLast ? value : helper(o ? o[k] : undefined, idx + 1);
    return container;
  }
  return helper(obj, 0);
}

function downloadHTML(theme, content) {
  const html = buildHTML(theme, content);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `${slugify(content.brand)}.html`;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}

function saveSession(content, theme, step) {
  const payload = { version: 1, savedAt: new Date().toISOString(), content, theme, step };
  const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `${slugify(content.brand)}-session.json`;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}

function loadSessionFile(file, onLoaded, onError) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const payload = JSON.parse(reader.result);
      if (!payload || typeof payload !== "object" || !payload.content) throw new Error("not a session file");
      onLoaded(payload);
    } catch (e) {
      onError();
    }
  };
  reader.onerror = onError;
  reader.readAsText(file);
}

function lightSignature(content) {
  const shrink = (v) => (typeof v === "string" && v.length > 60 ? v.length : v);
  const c = content || {};
  return JSON.stringify({
    ...c,
    logoImage: shrink(c.logoImage), bannerImage: shrink(c.bannerImage), aboutImage: shrink(c.aboutImage),
    galleryImages: (c.galleryImages || []).map(shrink),
    menuItems: (c.menuItems || []).map((m) => ({ ...m, image: shrink(m.image) })),
  });
}

function LivePreview({ theme, content, className, style, editable, staticPreview }) {
  const previewKey = theme.key + "-" + JSON.stringify(theme) + "-" + lightSignature(content);
  return <iframe key={previewKey} title="preview" srcDoc={buildHTML(theme, content, { editable, staticPreview })} className={className} style={style} loading="lazy" />;
}

function useDebounced(value, delay = 350) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => { const id = setTimeout(() => setDebounced(value), delay); return () => clearTimeout(id); }, [value, delay]);
  return debounced;
}

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ---------- form UI ----------
function Field({ label, value, onChange, area, placeholder, half }) {
  return (
    <div className={half ? "" : "col-span-2"}>
      <label className="text-xs font-semibold" style={{ color: C.ink, opacity: 0.6 }}>{label}</label>
      {area ? (
        <textarea value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}
          className="w-full mt-1.5 border-2 rounded-2xl px-4 py-3 text-sm h-24 resize-none focus:outline-none" style={{ borderColor: "#EEE3D3", background: "#fff", color: C.ink, ...body }} />
      ) : (
        <input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}
          className="w-full mt-1.5 border-2 rounded-2xl px-4 py-3 text-sm focus:outline-none" style={{ borderColor: "#EEE3D3", background: "#fff", color: C.ink, ...body }} />
      )}
    </div>
  );
}

function ImageUploadBox({ label, value, onChange, half }) {
  async function handleFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const dataUrl = await fileToDataURL(file);
    onChange(dataUrl);
    e.target.value = "";
  }
  return (
    <div className={half ? "" : "col-span-2"}>
      <label className="text-xs font-semibold block mb-1.5" style={{ color: C.ink, opacity: 0.6 }}>{label}</label>
      {value ? (
        <div className="relative rounded-2xl overflow-hidden group" style={{ border: "2px solid #EEE3D3" }}>
          <img src={value} alt={label} className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105" />
          <button onClick={() => onChange(null)} className="absolute top-2 right-2 bg-white rounded-full w-7 h-7 flex items-center justify-center shadow z-10"><X size={14} /></button>
          <div className="absolute bottom-2 right-2">
            <label className="relative block text-white text-xs font-bold px-3 py-1.5 rounded-full cursor-pointer overflow-hidden" style={{ background: "rgba(0,0,0,.55)" }}>
              Replace
              <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFile} />
            </label>
          </div>
        </div>
      ) : (
        <label className="group relative block w-full border-2 border-dashed rounded-2xl py-8 flex flex-col items-center justify-center gap-1.5 cursor-pointer overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
          style={{ borderColor: "#EEE3D3", color: "#B3A796" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.coral; e.currentTarget.style.background = "#FFF6F0"; e.currentTarget.style.color = C.coral; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#EEE3D3"; e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#B3A796"; }}>
          <ImagePlus size={20} />
          <span className="text-xs font-medium">Upload {label.toLowerCase()}</span>
          <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFile} />
        </label>
      )}
    </div>
  );
}

function DraftImageField({ value, onChange, placeholder }) {
  async function handleFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const dataUrl = await fileToDataURL(file);
    onChange(dataUrl);
    e.target.value = "";
  }
  return value ? (
    <div className="flex items-center gap-2 border-2 rounded-xl px-3 py-2 bg-white" style={{ borderColor: "#EEE3D3" }}>
      <img src={value} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
      <span className="text-xs flex-1" style={{ opacity: 0.6 }}>Photo added</span>
      <button type="button" onClick={() => onChange(null)} className="text-red-400 hover:text-red-500 flex-shrink-0"><X size={14} /></button>
    </div>
  ) : (
    <label className="relative flex items-center gap-1.5 border-2 border-dashed rounded-xl px-3 py-2.5 w-full text-xs font-medium cursor-pointer overflow-hidden transition-all duration-200"
      style={{ borderColor: "#EEE3D3", color: "#8b7f6d" }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.coral; e.currentTarget.style.background = "#FFF6F0"; e.currentTarget.style.color = C.coral; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#EEE3D3"; e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#8b7f6d"; }}>
      <ImagePlus size={14} /> {placeholder}
      <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFile} />
    </label>
  );
}

function GalleryUpload({ images, onAdd, onRemove }) {
  async function handleFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const dataUrl = await fileToDataURL(file);
    onAdd(dataUrl);
    e.target.value = "";
  }
  return (
    <div className="col-span-2 rounded-2xl p-5" style={{ background: "#FBF6EC", border: "2px solid #EEE3D3" }}>
      <h4 className="text-sm font-bold mb-1" style={{ ...display, color: C.ink, fontSize: 15 }}>Gallery Photos</h4>
      <p className="text-xs mb-3" style={{ opacity: 0.5 }}>Behind-the-scenes shots for the "Inside" section.</p>
      <div className="grid grid-cols-4 gap-2">
        {images.map((img, i) => (
          <div key={i} className="relative aspect-square rounded-xl overflow-hidden" style={{ border: "1px solid #EEE3D3" }}>
            <img src={img} className="w-full h-full object-cover" />
            <button onClick={() => onRemove(i)} className="absolute top-1 right-1 bg-white rounded-full w-5 h-5 flex items-center justify-center shadow"><X size={11} /></button>
          </div>
        ))}
        <label className="relative aspect-square rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
          style={{ borderColor: "#EEE3D3", color: "#B3A796" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.coral; e.currentTarget.style.background = "#FFF6F0"; e.currentTarget.style.color = C.coral; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#EEE3D3"; e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#B3A796"; }}>
          <ImagePlus size={18} />
          <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFile} />
        </label>
      </div>
    </div>
  );
}

function ListSection({ title, items, onAdd, onRemove, fields, renderItem, accent }) {
  const blankDraft = () => fields.reduce((a, f) => ({ ...a, [f.key]: f.type === "image" ? null : "" }), {});
  const [draft, setDraft] = useState(blankDraft());
  const [showError, setShowError] = useState(false);
  function handleAdd() {
    const missing = fields.some((f) => f.required && f.type !== "image" && !(draft[f.key] || "").trim());
    if (missing) { setShowError(true); return; }
    setShowError(false);
    onAdd(draft);
    setDraft(blankDraft());
  }
  return (
    <div className="col-span-2 rounded-2xl p-5" style={{ background: "#FBF6EC", border: "2px solid #EEE3D3" }}>
      <h4 className="text-sm font-bold mb-3" style={{ ...display, color: C.ink, fontSize: 15 }}>{title}</h4>
      {items.length > 0 && (
        <div className="space-y-2 mb-3">
          {items.map((it, i) => (
            <div key={i} className="flex items-center justify-between bg-white rounded-xl px-3.5 py-2.5 text-xs" style={{ border: "1px solid #EEE3D3" }}>
              <span className="flex items-center gap-2" style={body}>
                {it.image && <img src={it.image} className="w-7 h-7 rounded-lg object-cover" />}
                {renderItem(it)}
              </span>
              <button onClick={() => onRemove(i)} className="text-neutral-300 hover:text-red-500"><X size={14} /></button>
            </div>
          ))}
        </div>
      )}
      <div className="space-y-2">
        <div className="grid gap-2" style={{ gridTemplateColumns: fields.filter((f) => f.type !== "image" && f.type !== "textarea").length > 1 ? "1fr 1fr" : "1fr" }}>
          {fields.filter((f) => f.type !== "image" && f.type !== "textarea").map((f) => (
            <input key={f.key} value={draft[f.key] || ""} placeholder={f.placeholder}
              onChange={(e) => { setDraft({ ...draft, [f.key]: e.target.value }); if (showError) setShowError(false); }}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              className="border-2 rounded-xl px-3.5 py-2.5 text-sm bg-white focus:outline-none"
              style={{ borderColor: showError && f.required && !(draft[f.key] || "").trim() ? "#E5484D" : "#EEE3D3", background: "#fff", color: C.ink, ...body }} />
          ))}
        </div>
        {fields.filter((f) => f.type === "textarea").map((f) => (
          <textarea key={f.key} value={draft[f.key] || ""} placeholder={f.placeholder}
            onChange={(e) => { setDraft({ ...draft, [f.key]: e.target.value }); if (showError) setShowError(false); }}
            className="w-full border-2 rounded-xl px-3.5 py-2.5 text-sm bg-white focus:outline-none h-20 resize-none"
            style={{ borderColor: showError && f.required && !(draft[f.key] || "").trim() ? "#E5484D" : "#EEE3D3", background: "#fff", color: C.ink, ...body }} />
        ))}
        {fields.filter((f) => f.type === "image").map((f) => (
          <DraftImageField key={f.key} value={draft[f.key]} onChange={(v) => setDraft((d) => ({ ...d, [f.key]: v }))} placeholder={f.placeholder} />
        ))}
      </div>
      {showError && <div className="text-xs font-medium mt-2" style={{ color: "#E5484D" }}>Fill in the required field(s) above first.</div>}
      <button
        onClick={handleAdd}
        className="w-full text-white rounded-full py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 mt-3 transition-transform hover:-translate-y-0.5"
        style={{ background: accent || C.mint }}>
        <Plus size={14} /> Add {title.replace(/s$/, "")}
      </button>
    </div>
  );
}

function PillButton({ children, onClick, disabled, variant = "primary", icon }) {
  const styles = {
    primary: { background: C.coral, color: "#fff", boxShadow: "0 6px 0 #C23F1F" },
    dark: { background: C.ink, color: C.cream, boxShadow: "0 6px 0 #0e0a15" },
    ghost: { background: "#fff", color: C.ink, border: "2px solid #EEE3D3" },
  };
  return (
    <button onClick={onClick} disabled={disabled}
      className="rounded-full font-bold text-sm px-6 py-3 flex items-center justify-center gap-2 transition-transform disabled:opacity-50 active:translate-y-[3px]"
      style={{ ...styles[variant], ...body }}>
      {icon}{children}
    </button>
  );
}

function IconButton({ icon, onClick, title, active, small }) {
  const size = small ? "w-8 h-8 sm:w-10 sm:h-10" : "w-10 h-10";
  return (
    <button onClick={onClick} title={title}
      className={`rounded-full ${size} flex-shrink-0 flex items-center justify-center transition-transform active:scale-90 hover:-translate-y-0.5`}
      style={{ background: active ? C.coral : "#fff", color: active ? "#fff" : C.ink, border: active ? "none" : "2px solid #EEE3D3" }}>
      {icon}
    </button>
  );
}

function ChipGroup({ label, options, value, onChange }) {
  return (
    <div className="mb-6">
      <div className="text-xs font-bold mb-2" style={{ ...display, color: C.ink, fontSize: 12, textTransform: "uppercase", letterSpacing: ".06em", opacity: 0.7 }}>{label}</div>
      <div className="grid grid-cols-2 gap-2">
        {options.map((o) => (
          <button key={o.key} onClick={() => onChange(o.key)}
            className="text-left rounded-xl px-3 py-2.5 text-xs font-semibold flex items-center gap-2 transition-colors"
            style={{ border: `2px solid ${value === o.key ? C.coral : "#EEE3D3"}`, background: value === o.key ? "#FFF1EA" : "#fff", color: C.ink }}>
            {o.preview && <span className="text-base leading-none" style={o.previewStyle}>{o.preview}</span>}
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function EditDrawer({ open, onClose, theme, onHero, onTypography, onMenu, onTesti, onGallery, onAccent, hue, onHue, onBg, bgHue, onBgHue }) {
  if (!theme) return null;
  return (
    <div className="fixed top-0 right-0 h-full z-40 flex flex-col shadow-2xl"
      style={{ width: 380, maxWidth: "90vw", background: "#fff", borderLeft: "2px solid #EEE3D3", transform: open ? "translateX(0)" : "translateX(100%)", transition: "transform .3s cubic-bezier(.2,.7,.3,1)" }}>
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "2px solid #EEE3D3" }}>
        <div className="text-base font-bold flex items-center gap-2" style={display}><Wand2 size={16} style={{ color: C.coral }} /> Edit design</div>
        <button onClick={onClose} className="text-neutral-400 hover:text-neutral-700"><X size={18} /></button>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-5">
        <ChipGroup label="Hero style" options={HERO_LAYOUTS} value={theme.shape} onChange={onHero} />
        <ChipGroup
          label="Typography"
          options={Object.entries(TYPOGRAPHY).map(([k, v]) => ({ key: k, label: v.label, preview: "Aa", previewStyle: { fontFamily: v.font, fontWeight: v.weight } }))}
          value={theme.typographyKey} onChange={onTypography}
        />
        <ChipGroup label="Menu layout" options={MENU_LAYOUTS} value={theme.menuLayout} onChange={onMenu} />
        <ChipGroup label="Gallery layout" options={GALLERY_LAYOUTS} value={theme.galleryLayout} onChange={onGallery} />
        <ChipGroup label="Testimonials layout" options={TESTI_LAYOUTS} value={theme.testiLayout} onChange={onTesti} />

        <div className="mb-6">
          <div className="text-xs font-bold mb-2" style={{ ...display, color: C.ink, fontSize: 12, textTransform: "uppercase", letterSpacing: ".06em", opacity: 0.7 }}>Accent color</div>
          <div className="grid grid-cols-4 gap-2.5 mb-4">
            {SWATCHES.map((hex) => (
              <button key={hex} onClick={() => onAccent(hex)} className="w-full aspect-square rounded-full"
                style={{ background: hex, boxShadow: theme.accent === hex ? `0 0 0 2px #fff, 0 0 0 4px ${C.ink}` : "0 0 0 2px #EEE3D3" }} />
            ))}
          </div>
          <input type="range" min="0" max="360" value={hue} onChange={(e) => onHue(+e.target.value)}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{ background: "linear-gradient(90deg,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)" }} />
          <div className="flex items-center gap-2 mt-3 text-xs font-medium" style={{ opacity: 0.6 }}>
            <span className="w-5 h-5 rounded-full flex-shrink-0" style={{ background: theme.accent, border: "1px solid #EEE3D3" }}></span>
            {theme.accent}
          </div>
        </div>

        <div>
          <div className="text-xs font-bold mb-2" style={{ ...display, color: C.ink, fontSize: 12, textTransform: "uppercase", letterSpacing: ".06em", opacity: 0.7 }}>Background color</div>
          <div className="grid grid-cols-4 gap-2.5 mb-4">
            {BG_SWATCHES.map((hex) => (
              <button key={hex} onClick={() => onBg(hex)} className="w-full aspect-square rounded-full"
                style={{ background: hex, boxShadow: theme.bg === hex ? `0 0 0 2px #fff, 0 0 0 4px ${C.ink}` : "0 0 0 2px #EEE3D3" }} />
            ))}
          </div>
          <input type="range" min="0" max="360" value={bgHue} onChange={(e) => onBgHue(+e.target.value)}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{ background: "linear-gradient(90deg,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)" }} />
          <div className="flex items-center gap-2 mt-3 text-xs font-medium" style={{ opacity: 0.6 }}>
            <span className="w-5 h-5 rounded-full flex-shrink-0" style={{ background: theme.bg, border: "1px solid #EEE3D3" }}></span>
            {theme.bg} <span>· text auto-adjusts for contrast</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SiteGenTool() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Inter:wght@400;500;600;700&family=Anton&display=swap";
    document.head.appendChild(link);
  }, []);

  const [step, setStep] = useState(1);
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const previewContent = useDebounced(content, 350);

  const [generating, setGenerating] = useState(false);
  const [theme, setTheme] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [hue, setHue] = useState(14);
  const [bgHue, setBgHue] = useState(30);
  const [editHint, setEditHint] = useState(true);
  const [finalPreview, setFinalPreview] = useState(false);
  const [loadError, setLoadError] = useState(false);

  function handleSave() {
    saveSession(content, theme, step);
  }
  function handleLoadFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    loadSessionFile(
      file,
      (payload) => {
        setContent({ ...DEFAULT_CONTENT, ...payload.content });
        if (payload.theme) setTheme(payload.theme);
        setStep(payload.step && payload.theme ? payload.step : payload.theme ? 3 : 1);
        setLoadError(false);
      },
      () => setLoadError(true)
    );
    e.target.value = "";
  }
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    if (step === 3) {
      setEditHint(true);
      const id = setTimeout(() => setEditHint(false), 6000);
      return () => clearTimeout(id);
    }
  }, [step, theme && theme.key]);

  useEffect(() => {
    if (loadError) {
      const id = setTimeout(() => setLoadError(false), 4000);
      return () => clearTimeout(id);
    }
  }, [loadError]);

  useEffect(() => {
    function onMessage(e) {
      const d = e.data;
      if (!d || d.source !== "sitegen") return;
      if (d.type === "textEdit") {
        setContent((c) => setByPath(c, d.field, d.value));
      } else if (d.type === "imageEdit") {
        setContent((c) => setByPath(c, d.field, d.value));
      } else if (d.type === "openLink" && d.url) {
        window.open(d.url, "_blank", "noopener");
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const set = (key) => (val) => setContent((c) => ({ ...c, [key]: val }));
  const addTo = (key) => (item) => setContent((c) => ({ ...c, [key]: [...c[key], item] }));
  const removeFrom = (key) => (i) => setContent((c) => ({ ...c, [key]: c[key].filter((_, idx) => idx !== i) }));

  function onHero(key) { setTheme((th) => ({ ...th, shape: key, radius: STRUCTURES[key].radius, bg: STRUCTURES[key].bg, ink: STRUCTURES[key].ink, accent2: STRUCTURES[key].accent2, accent3: STRUCTURES[key].accent3, pop2: STRUCTURES[key].pop2 })); }
  function onTypography(key) { setTheme((th) => ({ ...th, typographyKey: key, font: TYPOGRAPHY[key].font, weight: TYPOGRAPHY[key].weight, tracking: TYPOGRAPHY[key].tracking, caseStyle: TYPOGRAPHY[key].caseStyle, displayFont: TYPOGRAPHY[key].displayFont, googleFontImport: TYPOGRAPHY[key].googleFontImport })); }
  function onMenu(key) { setTheme((th) => ({ ...th, menuLayout: key })); }
  function onTesti(key) { setTheme((th) => ({ ...th, testiLayout: key })); }
  function onGallery(key) { setTheme((th) => ({ ...th, galleryLayout: key })); }
  function onAccent(hex) { setTheme((th) => ({ ...th, accent: hex })); }
  function onHue(h) { setHue(h); onAccent(hslToHex(h, 72, 52)); }
  function onBg(hex) { setTheme((th) => ({ ...th, bg: hex })); }
  function onBgHue(h) { setBgHue(h); onBg(hslToHex(h, 35, 92)); }

  function pickPreset(key) {
    setGenerating(true);
    setTimeout(() => {
      setTheme({ ...PRESETS[key] });
      setGenerating(false);
      setStep(3);
    }, 900);
  }

  return (
    <div className="w-full min-h-screen" style={{ background: C.cream, ...body }}>
      <style>{`
        @keyframes fadeSlideIn{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
        .step-anim{animation:fadeSlideIn .45s cubic-bezier(.2,.7,.3,1) both;}
        .section-anim{animation:fadeSlideIn .4s cubic-bezier(.2,.7,.3,1) both;}
        @keyframes popIn{from{opacity:0;transform:scale(.9);}to{opacity:1;transform:scale(1);}}
        .card-pop{animation:popIn .4s cubic-bezier(.2,.7,.3,1) both;}
        .step-pill{transition:background-color .3s ease,color .3s ease,transform .2s ease;}
      `}</style>
      <div className="flex items-center justify-between px-4 sm:px-8 py-2.5 sticky top-0 z-20 gap-2 sm:gap-4" style={{ background: C.cream, borderBottom: "2px solid #EEE3D3" }}>
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-base sm:text-xl flex-shrink-0" style={display}>Reelo<span style={{ color: C.coral }}>Studio</span></div>
          <div className="flex items-center gap-1.5 sm:gap-2 pl-2 sm:pl-3 ml-1" style={{ borderLeft: "2px solid #EEE3D3" }}>
            <IconButton icon={<Save size={15} />} onClick={handleSave} title="Save progress to a file" small />
            <label className="relative rounded-full w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 flex items-center justify-center cursor-pointer overflow-hidden transition-transform active:scale-90 hover:-translate-y-0.5"
              style={{ background: "#fff", color: C.ink, border: "2px solid #EEE3D3" }} title="Load a saved session">
              <FolderOpen size={15} />
              <input type="file" accept="application/json" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleLoadFile} />
            </label>
          </div>
          {step === 3 && theme && !finalPreview && (
            <div className="flex items-center gap-1.5 sm:gap-2 pl-2 sm:pl-3 ml-1" style={{ borderLeft: "2px solid #EEE3D3" }}>
              <IconButton icon={<ArrowLeft size={15} />} onClick={() => setStep(2)} title="Back to styles" small />
              <IconButton icon={<RotateCcw size={15} />} onClick={() => { setStep(1); setTheme(null); }} title="Start over" small />
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {["Content", "Style", "Refine"].map((s, i) => (
            <div key={s} className="flex items-center gap-1 sm:gap-2">
              <div className="step-pill flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3.5 py-1.5 rounded-full text-xs font-bold"
                style={step === i + 1 ? { background: C.ink, color: C.cream, transform: "scale(1.05)" } : step > i + 1 ? { background: C.mint, color: "#fff" } : { background: "#EEE3D3", color: "#8b7f6d" }}>
                {step > i + 1 ? <Check size={12} /> : <span className="w-4 h-4 flex items-center justify-center">{i + 1}</span>}
                <span className="hidden md:inline">{s}</span>
              </div>
              {i < 2 && <div className="hidden sm:block w-6 h-[2px]" style={{ background: "#EEE3D3" }} />}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 flex-1 justify-end">
          {step === 3 && theme && !finalPreview && (
            <>
              <IconButton icon={mobileView ? <Monitor size={15} /> : <Smartphone size={15} />} onClick={() => setMobileView((v) => !v)} title={mobileView ? "Desktop view" : "Mobile preview"} active={mobileView} small />
              <IconButton icon={<Eye size={15} />} onClick={() => setFinalPreview(true)} title="Final preview" small />
              <IconButton icon={<Wand2 size={15} style={{ color: editOpen ? "#fff" : C.coral }} />} onClick={() => setEditOpen((v) => !v)} title="Edit design" active={editOpen} small />
              <IconButton icon={<Download size={15} />} onClick={() => downloadHTML(theme, content)} title="Download site" active small />
            </>
          )}
        </div>
      </div>

      {loadError && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 text-white text-sm font-bold px-4 py-2.5 rounded-full shadow-lg" style={{ background: "#E5484D" }}>
          Couldn't read that file — make sure it's a session file saved from this tool.
        </div>
      )}

      {step === 1 && (
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-12 items-start step-anim">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4" style={{ background: C.yellow, transform: "rotate(-1deg)" }}>🍽️ Step 1 of 3</div>
            <h1 className="text-4xl mb-2" style={display}>Tell us about the place</h1>
            <p className="text-base mb-10" style={{ opacity: 0.6, maxWidth: 520 }}>Everything the current form collects, plus room to grow. This becomes the raw material for four different designs.</p>

            <div className="space-y-10">
              <div className="section-anim" style={{ animationDelay: "0.02s" }}>
                <h3 className="text-lg mb-4 flex items-center gap-2" style={{ ...display, fontSize: 18 }}><span>🏷️</span> Basic information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Brand Name *" value={content.brand} onChange={set("brand")} placeholder="e.g. Marigold & Ash" />
                  <ImageUploadBox label="Logo" half value={content.logoImage} onChange={set("logoImage")} />
                  <ImageUploadBox label="Banner Image" half value={content.bannerImage} onChange={set("bannerImage")} />
                  <Field label="Banner Subtitle" value={content.bannerSubtitle} onChange={set("bannerSubtitle")} placeholder="A short line under your name" />
                  <ListSection title="Hero Slides" items={content.heroSlides} onAdd={addTo("heroSlides")} onRemove={removeFrom("heroSlides")}
                    fields={[{ key: "line1", placeholder: "First line, e.g. COLD POURS.", required: true }, { key: "line2", placeholder: "Second line (highlighted), e.g. HOT ENERGY." }, { key: "subtitle", placeholder: "Short line under the headline" }, { key: "image", type: "image", placeholder: "Add a photo" }]}
                    renderItem={(it) => `${it.line1}${it.line2 ? ` ${it.line2}` : ""}`} accent={C.purple} />
                  <p className="col-span-2 text-xs -mt-2" style={{ opacity: 0.45 }}>Only used by the "After Dark" design — add 2–3 slides for a rotating hero. Leave empty to use Brand Name + Banner Subtitle + Banner Image as a single slide.</p>
                </div>
              </div>

              <div className="section-anim" style={{ animationDelay: "0.06s" }}>
                <h3 className="text-lg mb-4 flex items-center gap-2" style={{ ...display, fontSize: 18 }}><span>📖</span> About</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="About Description *" value={content.about} onChange={set("about")} area placeholder="What makes this place worth visiting?" />
                  <ImageUploadBox label="About Image" value={content.aboutImage} onChange={set("aboutImage")} />
                  <GalleryUpload images={content.galleryImages} onAdd={addTo("galleryImages")} onRemove={removeFrom("galleryImages")} />
                </div>
              </div>

              <div className="section-anim" style={{ animationDelay: "0.1s" }}>
                <h3 className="text-lg mb-4 flex items-center gap-2" style={{ ...display, fontSize: 18 }}><span>🍲</span> Menu, reviews & locations</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ListSection title="Menu Items" items={content.menuItems} onAdd={addTo("menuItems")} onRemove={removeFrom("menuItems")}
                    fields={[{ key: "name", placeholder: "Item name", required: true }, { key: "price", placeholder: "Price (optional)" }, { key: "image", type: "image", placeholder: "Add a photo" }]}
                    renderItem={(it) => `${it.name}${it.price ? ` — ${it.price}` : ""}`} accent={C.coral} />
                  <ListSection title="Specials & Events" items={content.specials} onAdd={addTo("specials")} onRemove={removeFrom("specials")}
                    fields={[{ key: "title", placeholder: "e.g. Happy Hour", required: true }, { key: "description", placeholder: "Half-price drinks and snacks", required: true }, { key: "schedule", placeholder: "e.g. Mon–Fri, 4–6 PM" }]}
                    renderItem={(it) => `${it.title}${it.schedule ? ` — ${it.schedule}` : ""}`} accent={C.coral} />
                  <ListSection title="Offers & Deals" items={content.offers} onAdd={addTo("offers")} onRemove={removeFrom("offers")}
                    fields={[{ key: "title", placeholder: "e.g. Buy 1 Get 1 Draught Beer", required: true }, { key: "description", placeholder: "Short line about the deal", required: true }, { key: "price", placeholder: "e.g. 12 PM – 8 PM or ₹299" }]}
                    renderItem={(it) => `${it.title}${it.price ? ` — ${it.price}` : ""}`} accent={C.coral} />
                  <ListSection title="Testimonials" items={content.testimonials} onAdd={addTo("testimonials")} onRemove={removeFrom("testimonials")}
                    fields={[{ key: "name", placeholder: "Reviewer name", required: true }, { key: "text", type: "textarea", placeholder: "Review text — press Enter for a new line", required: true }]}
                    renderItem={(it) => `${it.name}: "${it.text.slice(0, 28)}${it.text.length > 28 ? "…" : ""}"`} accent={C.purple} />
                  <ListSection title="Locations" items={content.locations} onAdd={addTo("locations")} onRemove={removeFrom("locations")}
                    fields={[{ key: "name", placeholder: "Location name", required: true }, { key: "address", placeholder: "Street, City, State, ZIP", required: true }, { key: "mapUrl", placeholder: "Google Maps link (optional)" }]}
                    renderItem={(it) => `${it.name} — ${it.address}`} accent={C.mint} />
                  <ListSection title="Highlights" items={content.highlights} onAdd={addTo("highlights")} onRemove={removeFrom("highlights")}
                    fields={[{ key: "icon", placeholder: "Emoji, e.g. 🔥", required: true }, { key: "label", placeholder: "e.g. Wood-fired daily", required: true }]}
                    renderItem={(it) => `${it.icon} ${it.label}`} accent={C.yellow} />
                </div>
              </div>

              <div className="section-anim" style={{ animationDelay: "0.14s" }}>
                <h3 className="text-lg mb-4 flex items-center gap-2" style={{ ...display, fontSize: 18 }}><span>📞</span> Contact & links</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Email *" value={content.email} onChange={set("email")} half placeholder="hello@yourplace.com" />
                  <Field label="Phone *" value={content.phone} onChange={set("phone")} half placeholder="+91 00000 00000" />
                  <Field label="Hours" value={content.hours} onChange={set("hours")} placeholder="e.g. Mon–Fri 9 AM–5 PM" half />
                  <Field label="Copyright Text" value={content.copyright} onChange={set("copyright")} half placeholder="© 2026 Your Place" />
                  <Field label="Address (Footer)" value={content.addressFooter} onChange={set("addressFooter")} area placeholder="Street, City, State" />
                  <Field label="Default Google Maps Link (optional)" value={content.directionsUrl} onChange={set("directionsUrl")} placeholder="Used for locations that don't have their own map link" />
                  <ListSection title="Social Links" items={content.socialLinks} onAdd={addTo("socialLinks")} onRemove={removeFrom("socialLinks")}
                    fields={[{ key: "platform", placeholder: "e.g. Instagram", required: true }, { key: "url", placeholder: "https://…", required: true }]}
                    renderItem={(it) => it.platform} accent={C.coral} />
                  <ListSection title="Order Online Links" items={content.orderLinks} onAdd={addTo("orderLinks")} onRemove={removeFrom("orderLinks")}
                    fields={[{ key: "platform", placeholder: "e.g. Book a Table", required: true }, { key: "url", placeholder: "https://…", required: true }]}
                    renderItem={(it) => it.platform} accent={C.purple} />
                </div>
              </div>
            </div>

            <div className="mt-10"><PillButton onClick={() => setStep(2)}>Continue to design <ArrowRight size={16} /></PillButton></div>

            <div className="mt-16 pt-6" style={{ borderTop: "1px solid #EEE3D3" }}>
              <span className="text-xs font-medium" style={{ opacity: 0.4, ...body }}>Built by Husain Abbas</span>
            </div>
          </div>

          <div className="lg:sticky lg:top-28 rounded-3xl overflow-hidden" style={{ border: "2px solid #EEE3D3", background: "#fff" }}>
            <div className="px-5 py-3 text-xs font-bold flex items-center gap-2" style={{ background: "#EEE3D3", color: C.ink }}><Sparkles size={13} /> Live glance — updates as you type</div>
            <div className="h-[600px]">
              <LivePreview theme={PRESETS.playful} content={previewContent} className="w-full h-full border-0 pointer-events-none"
                style={{ transform: "scale(0.42)", transformOrigin: "top left", width: "238%", height: "238%" }} staticPreview />
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 py-8 sm:py-12 step-anim">
          <button onClick={() => setStep(1)} className="flex items-center gap-1.5 text-sm font-bold mb-6" style={{ color: C.ink, opacity: 0.6 }}><ArrowLeft size={14} /> Back to content</button>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4" style={{ background: C.purple, color: "#fff", transform: "rotate(-1deg)" }}>✨ Step 2 of 3</div>
          <h1 className="text-4xl mb-2" style={display}>Pick a starting design</h1>
          <p className="text-base mb-10" style={{ opacity: 0.6, maxWidth: 560 }}>Five complete, distinct directions — generated live from {content.brand}'s actual content.</p>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-6 mb-8">
            {Object.entries(PRESETS).map(([key, t], idx) => (
              <button key={key} onClick={() => pickPreset(key)} disabled={generating}
                className="group text-left rounded-3xl overflow-hidden bg-white transition-all disabled:opacity-50 hover:-translate-y-1 hover:shadow-xl card-pop"
                style={{ border: "2px solid #EEE3D3", animationDelay: `${idx * 0.06}s` }}>
                <div className="h-64 overflow-hidden" style={{ background: t.bg, borderBottom: "2px solid #EEE3D3" }}>
                  <LivePreview theme={t} content={previewContent} className="w-full h-full border-0 pointer-events-none" style={{ transform: "scale(0.4)", transformOrigin: "top left", width: "250%", height: "250%" }} staticPreview />
                </div>
                <div className="p-5"><div className="font-bold text-base mb-1" style={display}>{t.label}</div><div className="text-sm" style={{ opacity: 0.6 }}>{t.blurb}</div></div>
              </button>
            ))}
          </div>

          {generating && (
            <div className="fixed inset-0 flex items-center justify-center z-30" style={{ background: "rgba(255,247,236,0.85)" }}>
              <div className="flex items-center gap-3 font-bold text-lg" style={{ ...display, color: C.ink }}><Loader2 size={22} className="animate-spin" style={{ color: C.coral }} /> Generating site…</div>
            </div>
          )}
        </div>
      )}

      {step === 3 && theme && !finalPreview && (
        <div className="relative step-anim" style={{ height: "calc(100vh - 64px)" }}>
          {mobileView ? (
            <div className="w-full h-full flex items-center justify-start pl-16" style={{ background: "#E7E2D6" }}>
              <div className="relative" style={{ width: 390, height: "min(820px, 88vh)", borderRadius: 46, border: "10px solid #1A1A1A", background: "#000", boxShadow: "0 24px 60px rgba(0,0,0,.25)", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 120, height: 26, background: "#1A1A1A", borderRadius: "0 0 16px 16px", zIndex: 5 }} />
                <LivePreview theme={theme} content={content} className="w-full h-full border-0" style={{ display: "block" }} editable />
              </div>
            </div>
          ) : (
            <LivePreview theme={theme} content={content} className="w-full h-full border-0" style={{ display: "block" }} editable />
          )}
          {editHint && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-lg z-10" style={{ background: C.ink }}>
              ✏️ Click any text or photo to edit
            </div>
          )}

          <EditDrawer open={editOpen} onClose={() => setEditOpen(false)} theme={theme}
            onHero={onHero} onTypography={onTypography} onMenu={onMenu} onTesti={onTesti} onGallery={onGallery}
            onAccent={onAccent} hue={hue} onHue={onHue} onBg={onBg} bgHue={bgHue} onBgHue={onBgHue} />
        </div>
      )}

      {step === 3 && theme && finalPreview && (
        <div className="fixed inset-0 z-50" style={{ background: mobileView ? "#E7E2D6" : "#fff" }}>
          {mobileView ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="relative" style={{ width: 390, height: "min(820px, 88vh)", borderRadius: 46, border: "10px solid #1A1A1A", background: "#000", boxShadow: "0 24px 60px rgba(0,0,0,.25)", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 120, height: 26, background: "#1A1A1A", borderRadius: "0 0 16px 16px", zIndex: 5 }} />
                <LivePreview theme={theme} content={content} className="w-full h-full border-0" style={{ display: "block" }} />
              </div>
            </div>
          ) : (
            <LivePreview theme={theme} content={content} className="w-full h-full border-0" style={{ display: "block" }} />
          )}
          <div className="fixed top-4 left-4 z-10">
            <PillButton variant="ghost" onClick={() => setMobileView((v) => !v)} icon={mobileView ? <Monitor size={14} /> : <Smartphone size={14} />}>{mobileView ? "Desktop view" : "Mobile preview"}</PillButton>
          </div>
          <button onClick={() => setFinalPreview(false)}
            className="fixed top-4 right-4 z-10 rounded-full shadow-xl w-11 h-11 flex items-center justify-center"
            style={{ background: C.ink, color: "#fff" }}>
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
