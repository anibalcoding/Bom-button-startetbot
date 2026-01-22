
  (function () {
  const TARGET_PATH = "/test/";
  const CART_PATH = "/cart.php";
  const BUTTON_ID = "add-starter-bot-bom";
  const STORAGE_KEY = "starterBotBOM_baseline_compare_v4";

  
  const BOM_ITEMS = [
    { sku: "REV-19-2487-PK2", qty: 1 },
    { sku: "REV-11-1850", qty: 1 },
    { sku: "REV-11-2159", qty: 12 },
    { sku: "REV-11-2158", qty: 1 },
    { sku: "REV-11-3174", qty: 4 },
    { sku: "REV-11-1275-PK4", qty: 1 },
    { sku: "REV-21-1135", qty: 6 },
    { sku: "REV-21-1583", qty: 2 },
    { sku: "REV-21-1652", qty: 12 },
    { sku: "REV-21-1650", qty: 1 },
    { sku: "REV-21-1653", qty: 1 },
    { sku: "REV-21-1651", qty: 1 },
    { sku: "REV-21-1916-PK4", qty: 9 },
    { sku: "REV-21-1934", qty: 2 },
    { sku: "REV-21-2003-PK10", qty: 1 },
    { sku: "REV-21-2004-PK10", qty: 1 },
    { sku: "REV-21-2005-PK10", qty: 1 },
    { sku: "REV-21-2006-PK10", qty: 1 },
    { sku: "REV-21-2029-PK4", qty: 4 },
    { sku: "REV-21-2037-PK2", qty: 6 },
    { sku: "REV-21-2085-PK10", qty: 3 },
    { sku: "REV-21-2086-PK10", qty: 1 },
    { sku: "REV-21-2101", qty: 1 },
    { sku: "REV-21-2102", qty: 2 },
    { sku: "REV-21-2130", qty: 2 },
    { sku: "REV-21-2205", qty: 4 },
    { sku: "REV-21-2295-PK2", qty: 9 },
    { sku: "REV-21-2296-PK2", qty: 2 },
    { sku: "REV-21-2298-PK2", qty: 1 },
    { sku: "REV-21-2302-PK2", qty: 2 },
    { sku: "REV-21-2317-PK2", qty: 2 },
    { sku: "REV-21-2319-PK2", qty: 2 },
    { sku: "REV-21-2329-PK2", qty: 1 },
    { sku: "REV-21-2359-PK2", qty: 1 },
    { sku: "REV-21-2376-PK2", qty: 3 },
    { sku: "REV-21-2444", qty: 6 },
    { sku: "REV-21-2457", qty: 7 },
    { sku: "REV-21-2520", qty: 2 },
    { sku: "REV-21-2541-PK10", qty: 1 },
    { sku: "REV-21-2542-PK10", qty: 2 },
    { sku: "REV-21-2543-PK5", qty: 5 },
    { sku: "REV-21-2581", qty: 8 },
    { sku: "REV-21-2589-PK2", qty: 2 },
    { sku: "REV-21-2805-PK25", qty: 1 },
    { sku: "REV-21-2810", qty: 4 },
    { sku: "REV-21-2812", qty: 1 },
    { sku: "REV-21-3006", qty: 4 },
    { sku: "REV-21-3005", qty: 4 },
    { sku: "REV-21-3011", qty: 2 },
    { sku: "REV-21-3197-PK4", qty: 2 },
    { sku: "REV-21-3207", qty: 3 },
    { sku: "REV-21-3289", qty: 2 },
    { sku: "REV-21-3293-PK2", qty: 5 },
    { sku: "REV-21-3410", qty: 3 },
    { sku: "REV-21-3420-PK2", qty: 5 },
    { sku: "REV-21-3428-PK2", qty: 1 },
    { sku: "REV-21-3476", qty: 2 },
    { sku: "REV-21-3540", qty: 6 },
    { sku: "REV-21-3543", qty: 1 },
    { sku: "REV-21-3552", qty: 2 },
    { sku: "REV-21-3555", qty: 2 },
    { sku: "REV-21-3558", qty: 3 },
    { sku: "REV-21-3564", qty: 4 },
    { sku: "REV-21-3610", qty: 10 },
    { sku: "REV-21-3611", qty: 10 },
    { sku: "REV-21-3612", qty: 2 },
    { sku: "REV-21-3613", qty: 9 },
    { sku: "REV-21-3617-PK30", qty: 1 },
    { sku: "REV-21-3620-PK30", qty: 1 },
    { sku: "REV-21-3738-PK25", qty: 1 },
    { sku: "REV-21-3739-PK25", qty: 1 },
    { sku: "REV-21-4048", qty: 1 },
    { sku: "REV-21-4056", qty: 1 },
    { sku: "REV-21-4064", qty: 1 },
    { sku: "REV-21-4072", qty: 1 },
    { sku: "REV-21-4168", qty: 7 },
    { sku: "REV-21-6567", qty: 7 },
    { sku: "REV-25-2109", qty: 2 },
    { sku: "REV-25-2224", qty: 17 },
    { sku: "REV-29-1016-PK100", qty: 3 },
    { sku: "REV-29-2912-PK50", qty: 1 },
    { sku: "REV-29-2941-PK50", qty: 2 },
    { sku: "REV-29-2943-PK50", qty: 2 },
    { sku: "REV-29-2945-PK50", qty: 1 },
    { sku: "REV-29-2947-PK50", qty: 1 },
    { sku: "REV-29-2953-PK50", qty: 1 },
    { sku: "REV-29-2955-PK50", qty: 3 },
    { sku: "REV-29-2960-PK25", qty: 1 },
    { sku: "REV-29-2961-PK25", qty: 3 },
    { sku: "REV-29-2962-PK25", qty: 1 },
  ];

  // -----------------------------
  // Helpers
  // -----------------------------
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  function combineBom(items) {
    const map = Object.create(null);
    for (const it of items) {
      const sku = (it.sku || "").trim();
      const qty = Number(it.qty || 0);
      if (!sku || !Number.isFinite(qty) || qty <= 0) continue;
      map[sku] = (map[sku] || 0) + qty;
    }
    return map; // sku -> qty to add
  }

  async function fetchCartHtmlFresh() {
    const url = `/cart.php?_=${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const r = await fetch(url, {
      credentials: "include",
      cache: "no-store",
      headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
    });
    return await r.text();
  }

  function parseCartHtmlToQtyMap(cartHtml) {
    const doc = new DOMParser().parseFromString(cartHtml, "text/html");
    const map = Object.create(null);

    doc.querySelectorAll("tr.cart-item").forEach((row) => {
      const dd = row.querySelector("dd.definitionList-value");
      if (!dd) return;
      const sku = (dd.textContent || "").trim();
      if (!sku) return;

      const qtyInput = row.querySelector("input.cart-item-qty-input");
      const qty = qtyInput ? parseInt(qtyInput.getAttribute("value") || "0", 10) : 0;

      map[sku] = Number.isFinite(qty) ? qty : 0;
    });

    return map;
  }

  async function addSkuViaCartPhp(sku, qty) {
    const params = new URLSearchParams({ action: "add", sku, qty: String(qty) });
    const r = await fetch(`/cart.php?${params.toString()}`, {
      credentials: "include",
      redirect: "follow",
      cache: "no-store",
      headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
    });

   
    try {
      await r.text();
    } catch {
      // ignore
    }

    return r.ok;
  }

  async function addAllSequentialWithRetry(skuQtyPairs, opts) {
    const { delayMs, maxRetries, onProgress } = opts;

    for (let idx = 0; idx < skuQtyPairs.length; idx++) {
      const { sku, qty } = skuQtyPairs[idx];

      let ok = false;
      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        ok = await addSkuViaCartPhp(sku, qty);
        if (ok) break;
        await sleep(250);
      }

      if (onProgress) onProgress(idx + 1, skuQtyPairs.length, sku, qty, ok);

      // tiny delay helps prevent session/cart locking issues
      if (delayMs) await sleep(delayMs);
    }
  }

  // -----------------------------
  // CART PAGE: show result (truth = what cart ended up with)
  // -----------------------------
  function renderCartMessageFromBaseline() {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
      return;
    }

    if (!data?.ts || Date.now() - data.ts > 15 * 60 * 1000) {
      sessionStorage.removeItem(STORAGE_KEY);
      return;
    }

    const bomMap = data.bomMap || {};
    const baselineMap = data.baselineMap || {};

    const currentMap = Object.create(null);
    document.querySelectorAll("tr.cart-item").forEach((row) => {
      const dd = row.querySelector("dd.definitionList-value");
      if (!dd) return;
      const sku = (dd.textContent || "").trim();
      if (!sku) return;

      const qtyInput = row.querySelector("input.cart-item-qty-input");
      const qty = qtyInput ? parseInt(qtyInput.getAttribute("value") || "0", 10) : 0;
      currentMap[sku] = Number.isFinite(qty) ? qty : 0;
    });

    const ok = [];
    const issues = [];

    Object.keys(bomMap).forEach((sku) => {
      const before = baselineMap[sku] || 0;
      const wantAdd = bomMap[sku] || 0;
      const expected = before + wantAdd;
      const after = currentMap[sku] || 0;

      if (after >= expected) {
        ok.push({ sku, qty: wantAdd });
      } else {
        issues.push({ sku, qty: wantAdd, reason: `Short by ${expected - after}` });
      }
    });

    const anchor =
      document.querySelector(".cart") ||
      document.querySelector(".cart-content") ||
      document.querySelector(".page-content") ||
      document.querySelector("main");

    if (!anchor) {
      sessionStorage.removeItem(STORAGE_KEY);
      return;
    }

    if (document.getElementById("starter-bom-cart-message")) {
      sessionStorage.removeItem(STORAGE_KEY);
      return;
    }

    const box = document.createElement("div");
    box.id = "starter-bom-cart-message";
    box.style.cssText =
      "margin:16px 0;padding:14px 16px;border:2px solid #f05a28;border-radius:12px;background:#fff;";

    const headline = document.createElement("div");
    headline.style.cssText = "font-weight:800;margin-bottom:8px;";
    headline.textContent = issues.length
      ? `Some BOM items did not fully add (${issues.length}).`
      : "All BOM items were added successfully.";

    const summary = document.createElement("div");
    summary.style.cssText = "margin-bottom:10px;";
    summary.textContent = `OK: ${ok.length} • Issues: ${issues.length}`;

    box.appendChild(headline);
    box.appendChild(summary);

    if (issues.length) {
      const ul = document.createElement("ul");
      ul.style.cssText = "margin:0;padding-left:18px;";
      issues.slice(0, 200).forEach((s) => {
        const li = document.createElement("li");
        li.textContent = `${s.sku} (wanted +${s.qty}) — ${s.reason}`;
        ul.appendChild(li);
      });
      if (issues.length > 200) {
        const more = document.createElement("div");
        more.style.cssText = "margin-top:8px;font-size:12px;";
        more.textContent = `…and ${issues.length - 200} more.`;
        box.appendChild(more);
      }
      box.appendChild(ul);
    }

    anchor.insertBefore(box, anchor.firstChild);
    sessionStorage.removeItem(STORAGE_KEY);
  }

  if (window.location.pathname === CART_PATH) {
    document.addEventListener("DOMContentLoaded", renderCartMessageFromBaseline);
    return;
  }

  // -----------------------------
  // PRODUCT PAGE: button + add
  // -----------------------------
  if (window.location.pathname !== TARGET_PATH) return;

  function injectButton() {
    if (document.getElementById(BUTTON_ID)) return true;

    const heading = document.querySelector("h1.page-heading");
    if (!heading) return false;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = BUTTON_ID;
    btn.textContent = "Add Starter Bot BOM to Cart";

    btn.className = "button";
    btn.style.backgroundColor = "#f05a28";
    btn.style.borderColor = "#f05a28";
    btn.style.color = "#ffffff";
    btn.style.marginLeft = "12px";
    btn.style.whiteSpace = "nowrap";

    const status = document.createElement("div");
    status.id = "starter-bom-status";
    status.style.cssText = "margin-left:12px;font-size:12px;opacity:0.9;";
    status.textContent = "";

    btn.addEventListener("click", async () => {
      const original = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Adding items…";
      status.textContent = "Starting…";

      try {
        const bomMap = combineBom(BOM_ITEMS);

        // baseline snapshot once
        const baselineHtml = await fetchCartHtmlFresh();
        const baselineMap = parseCartHtmlToQtyMap(baselineHtml);

        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ ts: Date.now(), bomMap, baselineMap })
        );

        const skuQtyPairs = Object.keys(bomMap).map((sku) => ({ sku, qty: bomMap[sku] }));

        
        // Delay is tunable. Start at 120ms; if it’s still flaky, raise to 200–300ms.
        await addAllSequentialWithRetry(skuQtyPairs, {
          delayMs: 120,
          maxRetries: 1,
          onProgress: (done, total, sku, qty, ok) => {
            status.textContent = `${done}/${total} — ${sku} (x${qty}) ${ok ? "✓" : "…"} `;
          },
        });

        status.textContent = "Done. Opening cart…";
        window.location = "/cart.php";
      } finally {
        btn.disabled = false;
        btn.textContent = original;
      }
    });

    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";

    heading.parentNode.insertBefore(wrapper, heading);
    wrapper.appendChild(heading);
    wrapper.appendChild(btn);
    wrapper.appendChild(status);

    return true;
  }

  document.addEventListener("DOMContentLoaded", injectButton);
  let tries = 0;
  const t = setInterval(() => {
    tries++;
    if (injectButton() || tries > 20) clearInterval(t);
  }, 250);
})();


