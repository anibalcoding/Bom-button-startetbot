
(function () {
  const TARGET_PATH = "/rev-ion/2024-rev-ion-frc-starter-bot/";
  if (window.location.pathname !== TARGET_PATH) return;

  const BUTTON_ID = "add-starter-bot-bom";

  // ✅ Manually maintain this list (SKU + qty)
  const BOM_ITEMS = [
    { sku: "REV-21-2130", qty: 1 },
    { sku: "REV-11-2158", qty: 1 },
    { sku: "REV-11-2159", qty: 1 },
    { sku: "REV-11-1850", qty: 1 },
    { sku: "REV-21-1653", qty: 1 },
    { sku: "REV-20-2051-PK2", qty: 1 },
  ];

  async function tryAddSku(sku, qty) {
    const params = new URLSearchParams({ action: "add", sku, qty: String(qty) });
    const r = await fetch(`/cart.php?${params.toString()}`, {
      credentials: "include",
      redirect: "follow",
      // Some themes/storefronts behave better when you avoid cached responses
      cache: "no-store",
    });

    // Note: cart.php may return HTML even when “error”; status is still the best simple signal
    return { ok: r.ok, status: r.status };
  }

  async function addManyToCartSkipFailures(items) {
    const added = [];
    const skipped = [];

    for (const { sku, qty } of items) {
      const res = await tryAddSku(sku, qty);

      if (res.ok) {
        added.push({ sku, qty });
      } else {
        skipped.push({ sku, qty, status: res.status });
        // keep going
      }
    }

    return { added, skipped };
  }

  function injectButton() {
    if (document.getElementById(BUTTON_ID)) return true;

    // Try common Stencil anchors near add-to-cart
    const anchor =
      document.querySelector('form[data-cart-item-add]') ||
      document.querySelector("form.form") ||
      document.querySelector(".productView-details") ||
      document.querySelector(".productView");

    if (!anchor) return false;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = BUTTON_ID;
    btn.textContent = "Add Starter Bot BOM to Cart";
    btn.style.cssText =
      "margin-top:12px;width:100%;padding:12px 14px;font-weight:700;cursor:pointer;";

    btn.addEventListener("click", async () => {
      const original = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Adding items…";

      try {
        const { added, skipped } = await addManyToCartSkipFailures(BOM_ITEMS);

        // Friendly summary (kept short so it’s not annoying)
        let msg = `Added ${added.length} item(s) to your cart.`;
        if (skipped.length) {
          const top = skipped.slice(0, 8).map(s => `- ${s.sku} (x${s.qty})`).join("\n");
          msg += `\n\nSkipped ${skipped.length} item(s) (likely out of stock / not purchasable):\n${top}`;
          if (skipped.length > 8) msg += "\n…";
        }

        alert(msg);
        window.location = "/cart.php";
      } finally {
        btn.disabled = false;
        btn.textContent = original;
      }
    });

    anchor.appendChild(btn);
    return true;
  }

  document.addEventListener("DOMContentLoaded", injectButton);
  let tries = 0;
  const t = setInterval(() => {
    tries++;
    if (injectButton() || tries > 20) clearInterval(t);
  }, 250);
})();
