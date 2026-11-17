/* =====================================================================
   KONFIGURACE WEBU – všechny texty a kontakty na jednom místě
   ---------------------------------------------------------------------
   • Upravujte jen hodnoty v uvozovkách.
   • Hodnoty obsahující "[DOPLNIT" se na webu zobrazí zvýrazněně
     a v konzoli prohlížeče (F12) se vypíše jejich seznam.
   • Pokud nějaký údaj nechcete zobrazovat (např. DIČ), nastavte null.
   • Meta tagy pro vyhledávače a sociální sítě (title, description,
     Open Graph) jsou v hlavičce souboru index.html – viz README.
   ===================================================================== */

window.SITE = {
  /* ---------- Základní údaje ---------- */
  name: "Ing. Eva Kováčová",
  role: "Projektantka ZTI",
  roleLong: "Projektantka zdravotně technických instalací",
  slogan: "Návrh vodovodu, kanalizace a plynovodu, který spolehlivě funguje – od rodinného domu po komerční objekt.",

  /* ---------- Firemní údaje (z ARES) ---------- */
  ico: "02581337",
  dic: "CZ8752272122",                        // null = nezobrazovat
  vatPayer: null,                              // true = „plátce DPH“, false = „neplátce DPH“, null = nezobrazovat
  since: 2014,
  address: {
    street: "Nepomucká 418",
    zip: "334 01",
    city: "Přeštice",
    region: "Plzeňský kraj",
    country: "CZ"
  },

  /* ---------- Autorizace ČKAIT ---------- */
  // Pokud autorizaci nechcete zobrazovat, nastavte: ckait: null
  ckait: {
    number: "0202205",
    field: "Autorizovaný inženýr pro techniku prostředí staveb"
  },

  /* ---------- Kontakty ---------- */
  phone: "+420 724 770 242",
  email: "eva.kovacova@ek-zti.cz",
  area: "Praha, Plzeňský kraj a celá ČR",
  workingHours: "Po–Pá 8:00–17:00",       // null = nezobrazovat

  /* ---------- Kontaktní formulář ----------
     Prázdný řetězec = formulář otevře e-mailového klienta (mailto).
     Pro odesílání přímo z webu založte formulář na formspree.io
     a vložte sem jeho adresu, např. "https://formspree.io/f/abcdwxyz" */
  formEndpoint: "",

  /* ---------- Adresa webu (pro strukturovaná data) ---------- */
  url: "https://www.ek-zti.cz",

  /* ---------- Mapa (volitelné) ----------
     true = pod kontaktem se zobrazí mapa sídla (Google Maps, bez API klíče).
     Načte se až po kliknutí, kvůli rychlosti a cookies Googlu. */
  showMap: true,

  /* ---------- Profil ---------- */
  about: {
    heading: "Projekty vnitřních instalací od roku 2014",
    paragraphs: [
      "Autorizovaný inženýr ČKAIT pro techniku prostředí staveb se zaměřením na zdravotně technické instalace budov. Od roku 2014 samostatné zpracování projektových dokumentací vnitřního vodovodu, kanalizace, plynovodu a přípojek pro soukromé investory, architekty i stavební firmy.",
      "Důraz na srozumitelnou komunikaci, dodržení termínů a řešení, která se dají bez komplikací postavit. Dokumentace v souladu s platnými normami a předpisy, včetně pomoci s projednáním na úřadech a u správců sítí."
    ],
    facts: [
      { value: "od 2014", label: "samostatná praxe" },
      { value: "ČKAIT", label: "autorizovaný inženýr" },
      { value: "ZTI", label: "vodovod · kanalizace · plyn" }
    ],
    education: null                     // např. "ČVUT v Praze, Fakulta stavební" – null = nezobrazovat
  },

  /* ---------- Služby (ikony: water, drain, connection, gas, docs, consult) ---------- */
  services: [
    {
      icon: "water",
      title: "Vnitřní vodovod",
      text: "Rozvody studené, teplé a cirkulační vody včetně dimenzování podle ČSN 75 5455, návrhu ohřevu vody a zařizovacích předmětů."
    },
    {
      icon: "drain",
      title: "Vnitřní a dešťová kanalizace",
      text: "Splašková a dešťová kanalizace, odvodnění střech a zpevněných ploch, vsakování a retence dešťových vod."
    },
    {
      icon: "connection",
      title: "Vodovodní a kanalizační přípojky",
      text: "Návrh přípojek včetně napojení na veřejný řad, vodoměrné šachty a projednání se správcem sítě."
    },
    {
      icon: "gas",
      title: "Plynovod a plynovodní přípojky",
      text: "Domovní plynovod, NTL přípojky a odběrná plynová zařízení pro vytápění, ohřev vody i vaření."
    },
    {
      icon: "docs",
      title: "Projektová dokumentace",
      text: "Dokumentace pro povolení stavby, pro provádění stavby (DPS) i dokumentace skutečného provedení (DSPS)."
    },
    {
      icon: "consult",
      title: "Konzultace a posudky",
      text: "Odborné konzultace, posudky stávajících instalací, studie proveditelnosti a technické návrhy řešení."
    }
  ],

  /* ---------- Pro koho (ikony: house, apartment, renovation, commercial) ---------- */
  audiences: [
    { icon: "house", title: "Rodinné domy", text: "Novostavby i dostavby – kompletní ZTI pro stavební řízení i realizaci." },
    { icon: "apartment", title: "Bytové domy", text: "Rozvody, stoupačky, měření spotřeby a koordinace s ostatními profesemi." },
    { icon: "renovation", title: "Rekonstrukce", text: "Výměna stávajících rozvodů, půdní vestavby, změny užívání staveb." },
    { icon: "commercial", title: "Komerční objekty", text: "Provozovny, kanceláře, gastro, ubytovací a občanské stavby." }
  ],

  /* ---------- Jak spolupracujeme ---------- */
  steps: [
    { title: "Poptávka", text: "Telefonát nebo e-mail s popisem záměru. Domluva rozsahu, termínu a orientační ceny." },
    { title: "Podklady", text: "Architektonické výkresy, situace a vyjádření správců sítí. Pomoc se zajištěním chybějících podkladů." },
    { title: "Zpracování", text: "Návrh technického řešení, průběžné konzultace s investorem a koordinace s dalšími profesemi." },
    { title: "Předání a projednání", text: "Kompletní dokumentace v tištěné i digitální podobě a pomoc s projednáním." }
  ],

  /* ---------- Reference ----------
     Obrázky vložte do složky img/reference/ (ideálně WebP, cca 1200×800 px)
     a změňte cestu v "image". Alt text popisuje, co je na obrázku.
     Níže jsou UKÁZKOVÉ položky – nahraďte je skutečnými projekty
     a poté nastavte referencesAreSamples: false (zmizí štítek „Ukázka“). */
  referencesAreSamples: true,
  references: [
    { title: "Rodinný dům, Přeštice", type: "Novostavba", scope: "Vodovod, kanalizace, přípojky", year: "2024", image: "img/reference/projekt-1.webp", alt: "Ukázkový obrázek – rodinný dům" },
    { title: "Bytový dům, Plzeň", type: "Novostavba", scope: "Kompletní ZTI, DPS", year: "2023", image: "img/reference/projekt-2.webp", alt: "Ukázkový obrázek – bytový dům" },
    { title: "Rekonstrukce domu, Klatovy", type: "Rekonstrukce", scope: "Vodovod, kanalizace, plynovod", year: "2023", image: "img/reference/projekt-3.webp", alt: "Ukázkový obrázek – rekonstrukce domu" },
    { title: "Provozovna, Plzeň-jih", type: "Komerční objekt", scope: "ZTI, dešťová kanalizace", year: "2022", image: "img/reference/projekt-4.webp", alt: "Ukázkový obrázek – provozovna" },
    { title: "Plynovodní přípojka, Dobřany", type: "Přípojka", scope: "NTL přípojka, OPZ", year: "2022", image: "img/reference/projekt-5.webp", alt: "Ukázkový obrázek – plynovodní přípojka" },
    { title: "Penzion, Šumava", type: "Ubytovací zařízení", scope: "Kompletní ZTI, DSPS", year: "2021", image: "img/reference/projekt-6.webp", alt: "Ukázkový obrázek – penzion" }
  ]
};
