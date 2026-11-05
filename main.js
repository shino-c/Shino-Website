/* ============ Helpers ============ */
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== "") node.textContent = text;
  return node;
}

/* ============ Contact links ============ */
(function renderContact() {
  const list = document.getElementById("contactLinks");
  if (!list || typeof PROFILE === "undefined") return;

  const items = [];
  if (PROFILE.email) items.push({ label: "Email", value: PROFILE.email, href: "mailto:" + PROFILE.email });
  if (PROFILE.linkedin) items.push({ label: "LinkedIn", value: "Chow Shino", href: PROFILE.linkedin, external: true });
  if (PROFILE.github) {
    const name = PROFILE.github.replace(/\/+$/, "").split("/").pop();
    items.push({ label: "GitHub", value: name, href: PROFILE.github, external: true });
  }
  if (PROFILE.whatsapp) {
    items.push({ label: "WhatsApp", value: "+" + PROFILE.whatsapp, href: "https://wa.me/" + PROFILE.whatsapp, external: true });
  }

  items.forEach((item) => {
    const li = el("li");
    const a = el("a");
    a.href = item.href;
    if (item.external) { a.target = "_blank"; a.rel = "noopener"; }
    a.append(el("span", "contact-label", item.label), document.createTextNode(item.value));
    li.append(a);
    list.append(li);
  });
})();

/* ============ Projects ============ */
(function projects() {
  if (typeof PROJECTS === "undefined") return;

  const grid = document.getElementById("projectGrid");
  const filterBar = document.getElementById("filters");
  const moreBtn = document.getElementById("moreBtn");
  const limit = typeof PROJECTS_VISIBLE === "number" ? PROJECTS_VISIBLE : PROJECTS.length;

  let activeFilter = "All";
  let expanded = false;

  const categories = ["All"];
  PROJECTS.forEach((p) => p.categories.forEach((c) => { if (!categories.includes(c)) categories.push(c); }));

  const linkLabels = { code: "Source code", design: "Figma design", demo: "Demo video", live: "Live site" };

  function buildCard(p) {
    const card = el("article", "project");

    const metaParts = [p.type, p.period].filter(Boolean);
    card.append(el("p", "project-meta", metaParts.join(" · ")));
    card.append(el("h3", "", p.title));
    if (p.subtitle) card.append(el("p", "project-sub", p.subtitle));
    card.append(el("p", "project-desc", p.description));

    if (p.points && p.points.length) {
      const ul = el("ul", "project-points");
      p.points.forEach((pt) => ul.append(el("li", "", pt)));
      card.append(ul);
    }

    const chips = el("ul", "chips");
    p.tech.forEach((t) => chips.append(el("li", "", t)));
    card.append(chips);

    const linkKeys = Object.keys(p.links || {}).filter((k) => p.links[k]);
    if (linkKeys.length) {
      const row = el("div", "project-links");
      linkKeys.forEach((k) => {
        const a = el("a", "", linkLabels[k] || k);
        a.href = p.links[k];
        a.target = "_blank";
        a.rel = "noopener";
        row.append(a);
      });
      card.append(row);
    }
    return card;
  }

  function render() {
    const filtered = PROJECTS.filter((p) => activeFilter === "All" || p.categories.includes(activeFilter));
    const canCollapse = activeFilter === "All" && filtered.length > limit;
    const shown = canCollapse && !expanded ? filtered.slice(0, limit) : filtered;

    grid.replaceChildren(...shown.map(buildCard));

    if (canCollapse) {
      moreBtn.hidden = false;
      moreBtn.textContent = expanded ? "Show fewer projects" : "Show all " + filtered.length + " projects";
    } else {
      moreBtn.hidden = true;
    }

    filterBar.querySelectorAll("button").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.filter === activeFilter));
    });
  }

  categories.forEach((c) => {
    const b = el("button", "filter-btn", c);
    b.type = "button";
    b.dataset.filter = c;
    b.addEventListener("click", () => { activeFilter = c; render(); });
    filterBar.append(b);
  });

  moreBtn.addEventListener("click", () => { expanded = !expanded; render(); });

  render();
})();

/* ============ Active nav link ============ */
(function navHighlight() {
  const links = Array.from(document.querySelectorAll(".nav-links a"));
  const map = new Map();
  links.forEach((a) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) map.set(target, a);
  });
  if (!("IntersectionObserver" in window) || !map.size) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((l) => l.classList.remove("active"));
        map.get(entry.target).classList.add("active");
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  map.forEach((_, section) => io.observe(section));
})();

/* ============ Footer year ============ */
(function year() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();

/* ============ Pixel platformer strip ============ */
(function pixelScene() {
  const canvas = document.getElementById("scene");
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;
  const GROUND = 54;
  const SPEED = 1.2;      // px per frame at 60fps
  const GRAVITY = 0.3;
  const JUMP_V = 4;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Sprite maps: h hair, s skin, e eye, p shirt, d pants, k shoes
  const FRAMES = {
    runA: ["..hhhh..", ".hhhhhh.", ".hssssh.", ".sesses.", "..ssss..", ".pppppp.", "spppppps", ".pppppp.", ".dd..dd.", ".kk..kk."],
    runB: ["..hhhh..", ".hhhhhh.", ".hssssh.", ".sesses.", "..ssss..", ".pppppp.", "spppppps", ".pppppp.", "..dddd..", "..kkkk.."],
    jump: ["..hhhh..", ".hhhhhh.", ".hssssh.", ".sesses.", "..ssss..", "spppppps", ".pppppp.", ".pppppp.", ".dd..dd.", ".kk..kk."]
  };

  let colors = {};
  function readColors() {
    const s = getComputedStyle(document.documentElement);
    const v = (name) => s.getPropertyValue(name).trim();
    colors = {
      ground: v("--px-ground"), dirt: v("--px-dirt"), cloud: v("--px-cloud"), block: v("--px-block"),
      h: v("--px-hair"), s: v("--px-skin"), e: v("--px-eye"), p: v("--px-shirt"), d: v("--px-pants"), k: v("--px-hair")
    };
  }
  readColors();
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => { readColors(); draw(); });

  const player = { x: 40, h: 0, vy: 0 };
  let obstacles = [{ x: 150 }];
  let clouds = [{ x: 30, y: 8, s: 0.15 }, { x: 120, y: 18, s: 0.1 }, { x: 200, y: 6, s: 0.2 }];
  const speckles = [];
  for (let i = 0; i < 18; i++) speckles.push({ x: (i * 37) % W, y: GROUND + 4 + ((i * 7) % 8) });
  let scroll = 0;
  let nextGap = 110;

  function jump() {
    if (player.h === 0 && !reduceMotion.matches) player.vy = JUMP_V;
  }

  function step(f) {
    scroll += SPEED * f;

    // player physics
    if (player.vy !== 0 || player.h > 0) {
      player.h += player.vy * f;
      player.vy -= GRAVITY * f;
      if (player.h <= 0) { player.h = 0; player.vy = 0; }
    }

    // obstacles
    obstacles.forEach((o) => { o.x -= SPEED * f; });
    obstacles = obstacles.filter((o) => o.x > -10);
    const last = obstacles[obstacles.length - 1];
    if (!last || last.x < W - nextGap) {
      obstacles.push({ x: W + 4 });
      nextGap = 90 + Math.random() * 70;
    }

    // auto-jump when a block gets close
    obstacles.forEach((o) => {
      const gap = o.x - (player.x + 8);
      if (gap > 0 && gap <= 12) jump();
    });

    // clouds
    clouds.forEach((c) => { c.x -= c.s * f; if (c.x < -16) c.x = W + 4; });
  }

  function px(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), w, h);
  }

  function drawCloud(c) {
    px(c.x + 2, c.y, 10, 1, colors.cloud);
    px(c.x, c.y + 1, 14, 2, colors.cloud);
    px(c.x + 2, c.y + 3, 10, 1, colors.cloud);
  }

  function drawPlayer() {
    let frame = FRAMES.jump;
    if (player.h === 0) frame = Math.floor(scroll / 6) % 2 === 0 ? FRAMES.runA : FRAMES.runB;
    const top = Math.round(GROUND - frame.length - player.h);
    frame.forEach((row, j) => {
      for (let i = 0; i < row.length; i++) {
        const ch = row[i];
        if (ch !== ".") px(player.x + i, top + j, 1, 1, colors[ch]);
      }
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    clouds.forEach(drawCloud);

    px(0, GROUND, W, 2, colors.ground);
    px(0, GROUND + 2, W, H - GROUND - 2, colors.dirt);
    ctx.globalAlpha = 0.35;
    speckles.forEach((sp) => {
      const x = (((sp.x - scroll) % W) + W) % W;
      px(x, sp.y, 2, 1, colors.cloud);
    });
    ctx.globalAlpha = 1;

    obstacles.forEach((o) => {
      px(o.x, GROUND - 6, 6, 6, colors.block);
      ctx.globalAlpha = 0.45;
      px(o.x + 1, GROUND - 5, 2, 1, colors.cloud);
      ctx.globalAlpha = 1;
    });

    drawPlayer();
  }

  // Input
  canvas.addEventListener("click", jump);

  // Animation loop (pauses when off-screen or tab hidden)
  let running = false;
  let lastTime = 0;
  let visible = true;

  function frame(t) {
    if (!running) return;
    const dt = Math.min((t - lastTime) / 16.667, 3);
    lastTime = t;
    step(dt);
    draw();
    requestAnimationFrame(frame);
  }

  function start() {
    if (running || reduceMotion.matches || !visible || document.hidden) return;
    running = true;
    lastTime = performance.now();
    requestAnimationFrame(frame);
  }
  function stop() { running = false; }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      visible ? start() : stop();
    }).observe(canvas);
  }
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
  reduceMotion.addEventListener("change", () => { if (reduceMotion.matches) { stop(); draw(); } else { start(); } });

  draw();
  start();
})();
