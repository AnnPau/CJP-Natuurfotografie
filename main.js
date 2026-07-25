/* ==========================================================================
   MAIN.JS — gedeeld op elke pagina
   - navigatiebalk die van transparant naar effen kleurt bij scrollen
   - mega-menu onder "Portfolio" gevuld met de categorieën uit data.js
   - mobiel menu open/dicht
   - hero-slideshow op de homepagina
   - scroll-reveal animatie voor de horizontale "bars" op de homepagina
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------- navigatiebalk kleurt bij scrollen ---------------- */
  const nav = document.querySelector(".site-nav");
  if (nav){
    const updateNav = () => {
      if (window.scrollY > 40) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    };
    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });
  }

  /* ---------------- mega-menu vullen met categorieën ---------------- */
  const megaMenu = document.querySelector("[data-mega-menu]");
  if (megaMenu && typeof CATEGORIEEN !== "undefined"){
    megaMenu.innerHTML = CATEGORIEEN.map(cat => `
      <a href="categorie.html?cat=${cat.slug}">
        <div class="cat-thumb"><img src="${cat.cover}" alt="${cat.naam}" loading="lazy"></div>
        <span class="cat-naam">${cat.naam}</span>
      </a>
    `).join("");
  }

  /* ---------------- mobiel menu ---------------- */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks){
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", navLinks.classList.contains("open"));
    });
  }

  /* ---------------- hero-slideshow ---------------- */
  const heroSlides = document.querySelectorAll(".hero-slide");
  const heroDotsWrap = document.querySelector(".hero-dots");
  if (heroSlides.length){
    let huidige = 0;
    heroSlides[0].classList.add("is-active");

    if (heroDotsWrap){
      heroDotsWrap.innerHTML = Array.from(heroSlides).map((_, i) =>
        `<button aria-label="Toon foto ${i + 1}" class="${i === 0 ? "is-active" : ""}"></button>`
      ).join("");
    }
    const dots = heroDotsWrap ? heroDotsWrap.querySelectorAll("button") : [];

    const toonSlide = (index) => {
      heroSlides[huidige].classList.remove("is-active");
      dots[huidige]?.classList.remove("is-active");
      huidige = index;
      heroSlides[huidige].classList.add("is-active");
      dots[huidige]?.classList.add("is-active");
    };

    let timer = setInterval(() => toonSlide((huidige + 1) % heroSlides.length), 6000);

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        clearInterval(timer);
        toonSlide(i);
        timer = setInterval(() => toonSlide((huidige + 1) % heroSlides.length), 6000);
      });
    });
  }

  /* ---------------- scroll-reveal voor de horizontale bars ---------------- */
  const bars = document.querySelectorAll(".bar");
  if (bars.length){
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    bars.forEach(bar => observer.observe(bar));
  }

});
