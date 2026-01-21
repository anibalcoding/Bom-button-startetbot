
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
      cache: "no-store",
    });

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
    btn.textContent = "Add Starter Bot BOM to Cart";

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
        const { added, skipped } = await addManyToCartSkipFailures(BOM_ITEMS);

        let msg = `Added ${added.length} item(s) to your cart.`;
        if (skipped.length) {
          const top = skipped
            .slice(0, 8)
            .map(s => `- ${s.sku} (x${s.qty})`)
            .join("\n");

          msg += `\n\nSkipped ${skipped.length} item(s):\n${top}`;
          if (skipped.length > 8) msg += "\n…";
        }

        alert(msg);
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
