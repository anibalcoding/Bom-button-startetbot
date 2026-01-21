
(function () {
  const TARGET_PATH = "/rev-ion/rev-ion-frc-starter-bot-2025/";
  const CART_PATH = "/cart.php";
  const BUTTON_ID = "add-starter-bot-bom";
  const STORAGE_KEY = "starterBotBOMResult";

  // ✅ Manually maintain this list (SKU + qty)
  const BOM_ITEMS = [
    { sku: "REV-21-2130", qty: 1 },
    { sku: "REV-11-2158", qty: 1 },
    { sku: "REV-11-2159", qty: 1 },
    { sku: "REV-11-1850", qty: 1 },
    { sku: "REV-21-1653", qty: 1 },
    { sku: "REV-20-2051-PK2", qty: 1 },
  ];

  // -----------------------------
  // CART PAGE MESSAGE RENDER
  // -----------------------------
  function renderCartMessage() {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
      return;
    }

    // prevent old messages from showing
    if (!data?.ts || Date.now() - data.ts > 5 * 60 * 1000) {
      sessionStorage.removeItem(STORAGE_KEY);
      return;
    }

    const { added = [], skipped = [] } = data;

    // Insert above cart content
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
      "margin:16px 0;padding:14px 16px;border:2px solid #f05a28;border-radius:12px;" +
      "background:#fff;";

    const headline = document.createElement("div");
    headline.style.cssText = "font-weight:800;margin-bottom:8px;";
    headline.textContent = skipped.length
      ? `Some BOM items could not be added (${skipped.length}).`
      : "All BOM items were added to your cart.";

    const summary = document.createElement("div");
    summary.style.cssText = "margin-bottom:10px;";
    summary.textContent = `Added: ${added.length} • Skipped: ${skipped.length}`;

    box.appendChild(headline);
    box.appendChild(summary);

    if (skipped.length) {
      const ul = document.createElement("ul");
      ul.style.cssText = "margin:0;padding-left:18px;";

      skipped.forEach((s) => {
        const li = document.createElement("li");
        const reason = s.reason ? ` — ${s.reason}` : "";
        li.textContent = `${s.sku} (x${s.qty})${reason}`;
        ul.appendChild(li);
      });

      box.appendChild(ul);
    }

    anchor.insertBefore(box, anchor.firstChild);
    sessionStorage.removeItem(STORAGE_KEY);
  }

  if (window.location.pathname === CART_PATH) {
    document.addEventListener("DOMContentLoaded", renderCartMessage);
    let tries = 0;
    const t = setInterval(() => {
      tries++;
      if (document.getElementById("starter-bom-cart-message")) return clearInterval(t);
      renderCartMessage();
      if (document.getElementById("starter-bom-cart-message") || tries > 20) clearInterval(t);
    }, 250);
    return;
  }

  // -----------------------------
  // PRODUCT PAGE BUTTON + ADD LOGIC
  // -----------------------------
  if (window.location.pathname !== TARGET_PATH) return;

  async function fetchCartHtml() {
    const r = await fetch("/cart.php", {
      credentials: "include",
      cache: "no-store",
    });
    return await r.text();
  }

  function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // Count occurrences of SKU in cart HTML.
  // This is intentionally simple and tokenless.
  function countSkuInCartHtml(cartHtml, sku) {
    const re = new RegExp(escapeRegExp(sku), "g");
    const m = cartHtml.match(re);
    return m ? m.length : 0;
  }

  async function tryAddSku(sku, qty) {
    const params = new URLSearchParams({ action: "add", sku, qty: String(qty) });
    const r = await fetch(`/cart.php?${params.toString()}`, {
      credentials: "include",
      redirect: "follow",
      cache: "no-store",
    });

    const text = await r.text();

    // Best-effort: only look inside the error box to avoid false positives
    const errorMatch = text.match(/alertBox--error[\s\S]*?<\/div>/i);
    const errorHtml = errorMatch ? errorMatch[0] : "";
    const hasErrorBox = !!errorHtml;

    const outOfStock =
      /out of stock|we don't have enough|insufficient stock|currently unavailable/i.test(errorHtml);

    const notPurchasable =
      /cannot be purchased|not purchasable|is not available for purchase/i.test(errorHtml);

    let reason = null;
    if (hasErrorBox && outOfStock) reason = "Out of stock";
    else if (hasErrorBox && notPurchasable) reason = "Not purchasable";
    else if (hasErrorBox) reason = "Could not add item";
    else if (!r.ok) reason = `Request failed (HTTP ${r.status})`;

    // This "ok" is best-effort only; we’ll verify via cart.php HTML
    const ok = r.ok && !hasErrorBox;

    return { ok, status: r.status, reason };
  }

  async function addManyToCartVerifiedViaCartHtml(items) {
    const added = [];
    const skipped = [];

    for (const { sku, qty } of items) {
      // Snapshot before
      const beforeHtml = await fetchCartHtml();
      const beforeCount = countSkuInCartHtml(beforeHtml, sku);

      // Attempt add
      const res = await tryAddSku(sku, qty);

      // Snapshot after
      const afterHtml = await fetchCartHtml();
      const afterCount = countSkuInCartHtml(afterHtml, sku);

      // If count increased, treat as added (works even if item was already in cart)
      if (afterCount > beforeCount) {
        added.push({ sku, qty });
      } else {
        skipped.push({
          sku,
          qty,
          status: res.status,
          // Only label out-of-stock/purchasable if we saw it; otherwise stay generic
          reason: res.reason || "Item out of stock",
        });
      }
    }

    return { added, skipped };
  }

  function injectButton() {
    if (document.getElementById(BUTTON_ID)) return true;

    const heading = document.querySelector("h1.page-heading");
    if (!heading) return false;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = BUTTON_ID;
    btn.textContent = "Add Starter Bot to Cart";

    // Real button styling
    btn.className = "button";
    btn.style.backgroundColor = "#f05a28";
    btn.style.borderColor = "#f05a28";
    btn.style.color = "#ffffff";
    btn.style.marginLeft = "12px";
    btn.style.whiteSpace = "nowrap";

    btn.addEventListener("click", async () => {
      const original = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Adding items…";

      try {
        const { added, skipped } = await addManyToCartVerifiedViaCartHtml(BOM_ITEMS);

        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            ts: Date.now(),
            added,
            skipped,
          })
        );

        window.location = "/cart.php";
      } finally {
        btn.disabled = false;
        btn.textContent = original;
      }
    });

    // Wrap H1 and button together
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";

    heading.parentNode.insertBefore(wrapper, heading);
    wrapper.appendChild(heading);
    wrapper.appendChild(btn);

    return true;
  }

  document.addEventListener("DOMContentLoaded", injectButton);

  let tries = 0;
  const t = setInterval(() => {
    tries++;
    if (injectButton() || tries > 20) clearInterval(t);
  }, 250);
})();

