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
