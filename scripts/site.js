// scripts/site.js
(() => {
  // Enable click-to-zoom on any element with [data-lightbox]
  const items = document.querySelectorAll("[data-lightbox]");
  if (!items.length) return;

  // Create lightbox once
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.hidden = true;
  lightbox.innerHTML = `
    <div class="lightbox__backdrop" aria-label="Close"></div>
    <img class="lightbox__img" alt="">
  `;
  document.body.appendChild(lightbox);

  const backdrop = lightbox.querySelector(".lightbox__backdrop");
  const img = lightbox.querySelector(".lightbox__img");

  function open(src, alt) {
    img.src = src;
    img.alt = alt || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function close() {
    lightbox.hidden = true;
    img.src = "";
    document.body.style.overflow = "";
  }

  items.forEach((el) => {
    el.addEventListener("click", () => {
      const full = el.getAttribute("data-full") || el.getAttribute("src");
      const alt = el.getAttribute("alt") || el.querySelector("img")?.getAttribute("alt");
      if (full) open(full, alt);
    });
  });

  backdrop.addEventListener("click", close);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.hidden) close();
  });
})();


document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("consultBtn");
  const dlg = document.getElementById("consultDialog");
  const closeBtn = document.getElementById("closeDialogBtn");
  const form = document.getElementById("consultForm");

  if (!btn || !dlg || !form) return;

  btn.addEventListener("click", () => {
    if (typeof dlg.showModal === "function") dlg.showModal();
    else dlg.setAttribute("open", ""); // fallback for older browsers
  });

  closeBtn?.addEventListener("click", () => {
    dlg.close?.() || dlg.removeAttribute("open");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const phone = (data.get("phone") || "").toString().trim();
    const eventType = (data.get("eventType") || "").toString().trim();
    const date = (data.get("date") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();

    
    const to = "yingzhou@gmail.com";

    const subject = encodeURIComponent(`Consultation request from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone || "(not provided)"}\n` +
      `Event type: ${eventType || "(not provided)"}\n` +
      `Preferred date: ${date || "(not provided)"}\n\n` +
      `Message:\n${message || "(none)"}\n`
    );

    // 打开用户的邮件客户端，内容已填好
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

    dlg.close?.() || dlg.removeAttribute("open");
    form.reset();
  });
});
