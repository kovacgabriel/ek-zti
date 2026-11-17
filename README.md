# Web – Ing. Eva Kováčová, projektantka ZTI

Jednostránkový prezentační web. Čisté HTML + CSS + JavaScript, bez frameworku a bez buildu.

## Struktura

```
index.html                           hlavní stránka (meta tagy SEO / Open Graph v hlavičce)
zasady-ochrany-osobnich-udaju.html   GDPR
js/config.js                         ← VŠECHNY TEXTY A KONTAKTY
js/main.js                           vykreslení obsahu, menu, animace, formulář (neměnit)
css/style.css                        vzhled (barvy nahoře v :root)
img/logo.webp, logo.png, logo-white.png   logo (logo-original.jpg = zdroj)
img/favicon.ico, favicon.png, apple-touch-icon.png
img/og-image.png                     náhled při sdílení (1200×630)
img/reference/                       obrázky referencí (WebP)
robots.txt, sitemap.xml, .nojekyll
```

## Úpravy obsahu

1. Otevřete `js/config.js` a přepište hodnoty označené `[DOPLNIT …]` / `[UPŘESNIT …]`.
   Dokud nejsou vyplněné, zobrazí se na webu žlutě a jejich seznam se vypíše
   v konzoli prohlížeče (F12 → Console).
2. Nechcete-li nějaký údaj zobrazit (DIČ, autorizace ČKAIT, mapa), nastavte ho na `null` / `false`.
3. V `index.html` v hlavičce nahraďte `https://www.example.cz` svou doménou
   (canonical, og:url, og:image). Totéž v `robots.txt` a `sitemap.xml`.

### Reference
- Fotky uložte do `img/reference/` ve formátu **WebP**, ideálně 1200×800 px (poměr 3 : 2), do ~150 kB.
  Převod: [squoosh.app](https://squoosh.app) (zdarma, v prohlížeči).
- V `config.js` v poli `references` upravte název, rozsah, rok, cestu k obrázku a `alt` (popis obrázku).
- Až nahradíte ukázky skutečnými projekty, nastavte `referencesAreSamples: false`.
- Počet položek je libovolný – položku stačí přidat nebo smazat.

### Kontaktní formulář
- **Bez nastavení** formulář otevře e-mailový program návštěvníka s předvyplněnou zprávou (mailto).
- **Odesílání přímo z webu (doporučeno):** založte zdarma účet na [formspree.io](https://formspree.io),
  vytvořte formulář, zkopírujte jeho adresu (např. `https://formspree.io/f/abcdwxyz`)
  a vložte ji do `formEndpoint` v `config.js`. Poprvé Formspree pošle potvrzovací e-mail.

## Spuštění lokálně

V této složce:

```bash
py -m http.server 8080
```

a otevřete http://localhost:8080 (soubor `index.html` jen poklepáním otevřít nejde
spolehlivě kvůli SVG ikonám a formuláři – použijte server).

## Nasazení na GitHub Pages

1. Založte si účet na [github.com](https://github.com) a vytvořte nový **veřejný** repozitář, např. `web`.
2. Nahrajte soubory – buď přes web (*Add file → Upload files*, přetáhnout obsah této složky
   kromě `.claude`), nebo z příkazové řádky:

   ```bash
   git init
   git add .
   git commit -m "První verze webu"
   git branch -M main
   git remote add origin https://github.com/VAS-UCET/web.git
   git push -u origin main
   ```
3. V repozitáři: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   Branch: `main`, složka `/ (root)` → **Save**.
4. Za 1–2 minuty web poběží na `https://VAS-UCET.github.io/web/`.

Další úpravy: změňte soubor (i přímo na GitHubu tužkou ✎) a uložte (*Commit changes*) – web se sám aktualizuje.

## Vlastní doména (např. www.projekce-zti.cz)

1. Doménu kupte u registrátora (Wedos, Forpsi, Active24…).
2. U registrátora v nastavení **DNS** vytvořte:
   - pro `www`: záznam **CNAME** → `VAS-UCET.github.io`
   - pro holou doménu (bez www): čtyři záznamy **A** →
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
     (volitelně **AAAA** → `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`)
3. Na GitHubu: **Settings → Pages → Custom domain** → zadejte `www.projekce-zti.cz` → Save
   (GitHub sám vytvoří soubor `CNAME`).
4. Po ověření DNS (minuty až 24 h) zaškrtněte **Enforce HTTPS**.
5. Doporučení: v **Settings (účtu) → Pages → Verified domains** doménu ověřte (ochrana proti zneužití).
6. Aktualizujte doménu v `index.html`, `config.js` (`url`), `robots.txt` a `sitemap.xml`.

## Po spuštění

- [Google Search Console](https://search.google.com/search-console) – přidejte web a odešlete `sitemap.xml`.
- [Firmy.cz](https://www.firmy.cz) a [Google Business Profile](https://business.google.com) – zápis zdarma, výrazně pomáhá v místním vyhledávání.
- Kontrola strukturovaných dat: [validator.schema.org](https://validator.schema.org).
- Kontrola náhledu při sdílení: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/).

## Poznámky

- **Písmo** se načítá z Google Fonts (předává IP adresu Googlu – uvedeno v zásadách GDPR).
  Pro úplné vyloučení lze písmo Manrope stáhnout (např. přes google-webfonts-helper)
  do složky `fonts/` a odkaz v `<head>` nahradit vlastním `@font-face`.
- Obsah se vykresluje JavaScriptem z `config.js`. Google ho indexuje bez problémů;
  titulek, popis a náhled pro sociální sítě jsou ale pevně v `index.html`, proto je upravte tam.
- Animace se automaticky vypnou, pokud má návštěvník v systému zapnuté „omezit pohyb“.
