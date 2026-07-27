/* ==========================================================================
   DATA.JS
   Dit is het ENIGE bestand dat je moet aanpassen om nieuwe foto's op de
   website te zetten. Alle pagina's (portfolio, categoriepagina's,
   fotodetail) lezen automatisch uit de lijsten hieronder.

   WERKWIJZE OM EEN NIEUWE FOTO TOE TE VOEGEN:
   1. Zet je foto (en eventueel een aparte, kleinere thumbnail) in de map
      /images.
   2. Kopieer hieronder één object uit CATEGORIEEN of FOTOS als voorbeeld,
      plak het in de lijst en pas de velden aan.
   3. Klaar — de foto verschijnt automatisch op de portfolio-pagina, op de
      juiste categoriepagina en is filterbaar.
   ========================================================================== */

/* --------------------------------------------------------------------
   CATEGORIEEN
   slug   : gebruikt in de URL, bv. categorie.html?cat=landschappen
   naam   : weergavenaam
   cover  : afbeelding gebruikt als omslagfoto in het overzicht en menu
   -------------------------------------------------------------------- */
const CATEGORIEEN = [
  {
    slug: "landschappen",
    naam: "Landschappen",
    cover: "images/cover-landschappen.jpg"
  },
  {
    slug: "zoogdieren",
    naam: "Zoogdieren",
    cover: "images/cover-dieren.jpg"
  },
  {
    slug: "vogels",
    naam: "Vogels",
    cover: "images/cover-macro.jpg"
  },
  {
    slug: "insecten",
    naam: "Insecten",
    cover: "images/cover-water.jpg"
  },
  {
    slug: "reptielen",
    naam: "Reptielen",
    cover: "images/cover-lucht.jpg"
  }
];

/* --------------------------------------------------------------------
   FOTOS
   id           : unieke code, alleen kleine letters/cijfers/streepjes,
                  wordt gebruikt in de URL van de fotopagina
   titel        : titel die overal getoond wordt
   categorie    : moet exact overeenkomen met een 'slug' hierboven
   rank         : een getal (1, 2, 3, ...) dat de vaste volgorde bepaalt
                  waarin de foto's getoond worden — zowel binnen een
                  categorie als op de pagina "Alle foto's". Lager
                  getal = eerder getoond. Elk getal mag maar één keer
                  gebruikt worden; hou best een beetje ruimte tussen de
                  nummers (bv. 10, 20, 30, ...) zodat je later makkelijk
                  een nieuwe foto ertussen kan schuiven.
   filters      : vrij te kiezen groepen waarop bezoekers kunnen filteren
                  op de categoriepagina. Gebruik dezelfde groepnaam
                  (bv. "seizoen") consequent zodat de filterbalk ze
                  samen groepeert.
   afbeelding   : volledige foto (fotodetail + portfolio-grid)
   beschrijving : kort tekstblokje op de fotodetailpagina
   formaten     : lijst van beschikbare afdrukformaten + prijs. Deze
                  worden getoond op de fotodetailpagina.
   -------------------------------------------------------------------- */
const FOTOS = [

  // ===== VOORBEELD — kopieer dit blok om een nieuwe foto toe te voegen =====
  {
    id: "vos-in-de-mist",
    rank: 10,
    titel: "Vos in de ochtendmist",
    categorie: "zoogdieren",
    filters: {
      seizoen: "Winter",
      locatie: "Ardennen",
      soort: "Zoogdier"
    },
    afbeelding: "images/foto-vos-in-de-mist.jpg",
    beschrijving: "Vlak na zonsopgang stak deze vos het open veld over. De mist demptte alle geluid, waardoor ik dichterbij kon sluipen dan normaal mogelijk is.",
    formaten: [
      { naam: "30 × 20 cm", prijs: "€ 45" },
      { naam: "60 × 40 cm", prijs: "€ 95" },
      { naam: "90 × 60 cm", prijs: "€ 165" },
      { naam: "Op aluminium, 90 × 60 cm", prijs: "€ 245" }
    ]
  },

  {
    id: "berghelling-bij-zonsopgang",
    rank: 20,
    titel: "Berghelling bij zonsopgang",
    categorie: "landschappen",
    filters: { seizoen: "Herfst", locatie: "Alpen", lichtinval: "Zonsopgang" },
    afbeelding: "images/foto-berghelling.jpg",
    beschrijving: "Het eerste licht kleurt de bergtoppen goud, terwijl de vallei nog in de schaduw ligt. Genomen na een nachtelijke beklimming.",
    formaten: [
      { naam: "40 × 30 cm", prijs: "€ 55" },
      { naam: "80 × 60 cm", prijs: "€ 135" },
      { naam: "120 × 90 cm", prijs: "€ 245" }
    ]
  },
  {
    id: "mistige-dennenbossen",
    rank: 30,
    titel: "Mistige dennenbossen",
    categorie: "landschappen",
    filters: { seizoen: "Herfst", locatie: "Ardennen", lichtinval: "Ochtendlicht" },
    afbeelding: "images/foto-dennenbos.jpg",
    beschrijving: "Laagliggende mist tussen de naaldbomen, kort na zonsopgang. Elke laag bomen wordt lichter naarmate de diepte toeneemt.",
    formaten: [
      { naam: "40 × 30 cm", prijs: "€ 55" },
      { naam: "80 × 60 cm", prijs: "€ 135" }
    ]
  },
  {
    id: "korenveld-in-de-avond",
    rank: 40,
    titel: "Korenveld in de avond",
    categorie: "landschappen",
    filters: { seizoen: "Zomer", locatie: "Vlaanderen", lichtinval: "Zonsondergang" },
    afbeelding: "images/foto-korenveld.jpg",
    beschrijving: "Het gouden uur over een korenveld in de Vlaamse velden, met een enkele verweerde boom als middelpunt.",
    formaten: [
      { naam: "30 × 20 cm", prijs: "€ 45" },
      { naam: "60 × 40 cm", prijs: "€ 95" }
    ]
  },

  {
    id: "ree-in-het-kreupelhout",
    rank: 50,
    titel: "Ree in het kreupelhout",
    categorie: "zoogdieren",
    filters: { seizoen: "Lente", locatie: "Veluwe", soort: "Zoogdier" },
    afbeelding: "images/foto-ree.jpg",
    beschrijving: "Een jonge ree kijkt op vanuit het kreupelhout, verrast door de stilte van de vroege ochtend.",
    formaten: [
      { naam: "30 × 20 cm", prijs: "€ 45" },
      { naam: "60 × 40 cm", prijs: "€ 95" }
    ]
  },
  {
    id: "ijsvogel-op-de-uitkijk",
    rank: 60,
    titel: "IJsvogel op de uitkijk",
    categorie: "dieren",
    filters: { seizoen: "Zomer", locatie: "Vlaanderen", soort: "Vogel" },
    afbeelding: "images/foto-ijsvogel.jpg",
    beschrijving: "Na drie ochtenden wachten in de schuilhut kwam deze ijsvogel eindelijk binnen bereik van de lens.",
    formaten: [
      { naam: "30 × 20 cm", prijs: "€ 45" },
      { naam: "60 × 40 cm", prijs: "€ 95" }
    ]
  },

  {
    id: "dauwdruppel-op-spinnenweb",
    rank: 70,
    titel: "Dauwdruppel op spinnenweb",
    categorie: "landschappen",
    filters: { seizoen: "Herfst", locatie: "Tuin", onderwerp: "Insect" },
    afbeelding: "images/foto-spinnenweb.jpg",
    beschrijving: "Elke druppel op dit web weerspiegelt de omgeving in miniatuur. Genomen met een macrolens vlak na zonsopgang.",
    formaten: [
      { naam: "20 × 20 cm", prijs: "€ 35" },
      { naam: "40 × 40 cm", prijs: "€ 75" }
    ]
  },
  {
    id: "varenblad-in-close-up",
    rank: 80,
    titel: "Varenblad in close-up",
    categorie: "landschappen",
    filters: { seizoen: "Lente", locatie: "Ardennen", onderwerp: "Plant" },
    afbeelding: "images/foto-varenblad.jpg",
    beschrijving: "De symmetrie van een ontvouwend varenblad, gefotografeerd in het diffuse licht van het bosdak.",
    formaten: [
      { naam: "20 × 20 cm", prijs: "€ 35" },
      { naam: "40 × 40 cm", prijs: "€ 75" }
    ]
  },

  {
    id: "golven-tegen-de-rotskust",
    rank: 90,
    titel: "landschappen",
    categorie: "water",
    filters: { seizoen: "Winter", locatie: "Bretagne", lichtinval: "Bewolkt" },
    afbeelding: "images/foto-rotskust.jpg",
    beschrijving: "Lange sluitertijd om de beweging van het water te vangen tegen de onbeweeglijke rotsen.",
    formaten: [
      { naam: "40 × 30 cm", prijs: "€ 55" },
      { naam: "80 × 60 cm", prijs: "€ 135" }
    ]
  },
  {
    id: "spiegelend-meer-bij-dageraad",
    rank: 100,
    titel: "Spiegelend meer bij dageraad",
    categorie: "landschappen",
    filters: { seizoen: "Zomer", locatie: "Alpen", lichtinval: "Zonsopgang" },
    afbeelding: "images/foto-meer.jpg",
    beschrijving: "Windstil water dat de bergen en de lucht als een spiegel weergeeft, vlak voor zonsopgang.",
    formaten: [
      { naam: "40 × 30 cm", prijs: "€ 55" },
      { naam: "80 × 60 cm", prijs: "€ 135" },
      { naam: "120 × 90 cm", prijs: "€ 245" }
    ]
  },

  {
    id: "onweerswolken-boven-de-vlakte",
    rank: 110,
    titel: "Onweerswolken boven de vlakte",
    categorie: "landschappen",
    filters: { seizoen: "Zomer", locatie: "Vlaanderen", lichtinval: "Onweer" },
    afbeelding: "images/foto-onweer.jpg",
    beschrijving: "Een naderend onweersfront boven open landbouwgrond, met bliksem in de verte.",
    formaten: [
      { naam: "40 × 30 cm", prijs: "€ 55" },
      { naam: "80 × 60 cm", prijs: "€ 135" }
    ]
  },
  {
    id: "noorderlicht-boven-dennen",
    rank: 120,
    titel: "Noorderlicht boven dennen",
    categorie: "landschappen",
    filters: { seizoen: "Winter", locatie: "Lapland", lichtinval: "Nacht" },
    afbeelding: "images/foto-noorderlicht.jpg",
    beschrijving: "Groen en violet noorderlicht boven een besneeuwd dennenbos, na uren wachten bij -18°C.",
    formaten: [
      { naam: "40 × 30 cm", prijs: "€ 55" },
      { naam: "80 × 60 cm", prijs: "€ 135" },
      { naam: "Op aluminium, 90 × 60 cm", prijs: "€ 245" }
    ]
  }

  // ===== nieuwe foto's hieronder toevoegen (komma tussen elk object!) =====

];

/* --------------------------------------------------------------------
   Hulpfuncties — gebruikt door portfolio.js, hoeft u niet aan te passen
   -------------------------------------------------------------------- */

// Virtuele categorie "alle foto's" — geen echte categorie uit de lijst
// hierboven, maar wordt gebruikt door de knop "Alle foto's" op de
// portfolio-pagina om alle foto's samen te tonen.
const ALLE_FOTOS_SLUG = "alle";

function opVolgordeGesorteerd(lijst){
  return [...lijst].sort((a, b) => (a.rank ?? 9999) - (b.rank ?? 9999));
}
function vindCategorie(slug){
  if (slug === ALLE_FOTOS_SLUG) return { slug: ALLE_FOTOS_SLUG, naam: "Alle foto's" };
  return CATEGORIEEN.find(c => c.slug === slug);
}
function fotosVanCategorie(slug){
  if (slug === ALLE_FOTOS_SLUG) return opVolgordeGesorteerd(FOTOS);
  return opVolgordeGesorteerd(FOTOS.filter(f => f.categorie === slug));
}
function vindFoto(id){
  return FOTOS.find(f => f.id === id);
}
function coverFotoVoorCategorie(slug){
  const fotos = fotosVanCategorie(slug);
  return fotos.length ? fotos[0].afbeelding : "";
}
