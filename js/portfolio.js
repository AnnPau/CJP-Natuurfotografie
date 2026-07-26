/* ==========================================================================
   PORTFOLIO.JS
   Rendert drie soorten pagina's aan de hand van data.js:
   1) portfolio.html      → overzicht van alle categorieën
   2) categorie.html      → foto's van 1 categorie + filters (?cat=slug)
   3) foto.html           → detail van 1 foto (?id=foto-id)
   Elk onderdeel controleert zelf of de bijbehorende HTML-elementen
   bestaan, zodat dit bestand overal veilig ingeladen kan worden.
   ========================================================================== */

function getParam(naam){
  return new URLSearchParams(window.location.search).get(naam);
}

document.addEventListener("DOMContentLoaded", () => {

  /* ============================================================
     1) PORTFOLIO-OVERZICHT (portfolio.html)
     ============================================================ */
  const catGrid = document.querySelector("[data-cat-grid]");
  if (catGrid){
    catGrid.innerHTML = CATEGORIEEN.map(cat => `
      <a class="cat-card" href="categorie.html?cat=${cat.slug}">
        <img src="${cat.cover}" alt="${cat.naam}" loading="lazy">
        <div class="label">
          <span class="eyebrow">${fotosVanCategorie(cat.slug).length} foto's</span>
          <h3>${cat.naam}</h3>
        </div>
      </a>
    `).join("");
  }

  /* ============================================================
     2) CATEGORIEPAGINA MET FILTERS (categorie.html)
     ============================================================ */
  const fotoGrid = document.querySelector("[data-foto-grid]");
  const filterBar = document.querySelector("[data-filter-bar]");
  if (fotoGrid){
    const slug = getParam("cat");
    const categorie = vindCategorie(slug) || CATEGORIEEN[0];
    const fotos = fotosVanCategorie(categorie.slug);

    // titel & intro van de pagina invullen
    document.querySelectorAll("[data-cat-titel]").forEach(el => el.textContent = categorie.naam);
    document.title = `${categorie.naam} — Portfolio`;

    // actieve filters bijhouden: { groep: Set(waarden) }
    const actieveFilters = {};

    // alle filtergroepen + unieke waarden verzamelen uit de foto's
    const groepen = {};
    fotos.forEach(f => {
      Object.entries(f.filters || {}).forEach(([groep, waarde]) => {
        if (!groepen[groep]) groepen[groep] = new Set();
        groepen[groep].add(waarde);
      });
    });

    function renderFilterBar(){
      if (!filterBar) return;
      const groepenHtml = Object.entries(groepen).map(([groep, waardenSet]) => `
        <div class="filter-groep" data-groep="${groep}">
          <span class="fg-label">${groep}</span>
          ${Array.from(waardenSet).map(waarde => `
            <button type="button" class="chip" data-groep="${groep}" data-waarde="${waarde}">${waarde}</button>
          `).join("")}
        </div>
      `).join("");
      filterBar.innerHTML = groepenHtml + `<button type="button" class="chip-reset" data-reset>Filters wissen</button>`;

      filterBar.querySelectorAll(".chip").forEach(chip => {
        chip.addEventListener("click", () => {
          const groep = chip.dataset.groep;
          const waarde = chip.dataset.waarde;
          if (!actieveFilters[groep]) actieveFilters[groep] = new Set();
          if (actieveFilters[groep].has(waarde)){
            actieveFilters[groep].delete(waarde);
            chip.classList.remove("is-active");
            if (actieveFilters[groep].size === 0) delete actieveFilters[groep];
          } else {
            actieveFilters[groep].add(waarde);
            chip.classList.add("is-active");
          }
          pasFilterToe();
        });
      });
      filterBar.querySelector("[data-reset]")?.addEventListener("click", () => {
        Object.keys(actieveFilters).forEach(k => delete actieveFilters[k]);
        filterBar.querySelectorAll(".chip.is-active").forEach(c => c.classList.remove("is-active"));
        pasFilterToe();
      });
    }

    function fotoVoldoetAanFilters(foto){
      return Object.entries(actieveFilters).every(([groep, waarden]) => {
        return waarden.has(foto.filters?.[groep]);
      });
    }

    function pasFilterToe(){
      const kaarten = fotoGrid.querySelectorAll("[data-foto-id]");
      let zichtbaar = 0;
      kaarten.forEach(kaart => {
        const foto = vindFoto(kaart.dataset.fotoId);
        const tonen = fotoVoldoetAanFilters(foto);
        kaart.hidden = !tonen;
        if (tonen) zichtbaar++;
      });
      const leeg = document.querySelector("[data-empty-state]");
      if (leeg) leeg.classList.toggle("zichtbaar", zichtbaar === 0);
    }

    function renderGrid(){
      fotoGrid.innerHTML = fotos.map(f => `
        <a class="photo-card" data-foto-id="${f.id}" href="foto.html?id=${f.id}">
          <img src="${f.afbeelding}" alt="${f.titel}" loading="lazy">
          <div class="titel-strip">${f.titel}</div>
        </a>
      `).join("");
    }

    renderGrid();
    renderFilterBar();
  }

  /* ============================================================
     3) FOTODETAILPAGINA (foto.html)
     ============================================================ */
  const detailWrap = document.querySelector("[data-foto-detail]");
  if (detailWrap){
    const foto = vindFoto(getParam("id")) || FOTOS[0];
    const categorie = vindCategorie(foto.categorie);

    document.title = `${foto.titel} — Portfolio`;

    const kenmerkenHtml = Object.values(foto.filters || {}).map(w => `<span>${w}</span>`).join("");
    const formatenHtml = foto.formaten.map(f => `<li><span>${f.naam}</span><b>${f.prijs}</b></li>`).join("");

    detailWrap.innerHTML = `
      <div class="foto-groot">
        <img src="${foto.afbeelding}" alt="${foto.titel}">
      </div>
      <div class="foto-info">
        <a class="terug" href="categorie.html?cat=${foto.categorie}">&larr; Terug naar ${categorie ? categorie.naam : "portfolio"}</a>
        <span class="eyebrow">${categorie ? categorie.naam : ""}</span>
        <h1>${foto.titel}</h1>
        <p class="beschrijving">${foto.beschrijving}</p>
        <div class="kenmerken">${kenmerkenHtml}</div>
        <h3 style="font-size:1rem;text-transform:uppercase;letter-spacing:.08em;font-family:var(--font-body);font-weight:700;">Beschikbare formaten</h3>
        <ul class="formaten-lijst">${formatenHtml}</ul>
        <a class="btn btn-goud" href="bestellen.html?foto=${encodeURIComponent(foto.id)}&titel=${encodeURIComponent(foto.titel)}#bestelformulier">Bestel deze foto</a>
      </div>
    `;
  }

});
