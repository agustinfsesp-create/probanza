/* ============================================================
   Probanza — Consentimiento de cookies + Google Consent Mode v2
   - Estado por defecto: TODO denegado (se ejecuta de inmediato)
   - Banner (capa 1) con 3 botones de igual peso visual
   - Panel (capa 2) con 3 categorías; analítica y publicidad OFF
   - Decisión guardada en localStorage (recaduca a los 24 meses)
   Cárgalo en <head> ANTES de cualquier script de gtag.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 1. Consent Mode v2: por defecto TODO denegado ---------- */
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });

  /* ---------- almacenamiento de la decisión ---------- */
  var KEY = 'pz_consent';
  var MAX_AGE = 1000 * 60 * 60 * 24 * 365 * 2; // 24 meses

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var o = JSON.parse(raw);
      if (!o || !o.t || (Date.now() - o.t) > MAX_AGE) return null; // recaducar
      return o;
    } catch (e) { return null; }
  }
  function save(analytics, ads) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ a: !!analytics, p: !!ads, t: Date.now() }));
    } catch (e) {}
  }
  function applyConsent(analytics, ads) {
    gtag('consent', 'update', {
      analytics_storage: analytics ? 'granted' : 'denied',
      ad_storage: ads ? 'granted' : 'denied',
      ad_user_data: ads ? 'granted' : 'denied',
      ad_personalization: ads ? 'granted' : 'denied'
    });
  }

  /* ---------- traducciones ---------- */
  var T = {
    es: {
      title: 'Tu privacidad',
      body: 'Este sitio usa cookies propias y de terceros para analizar el tráfico y medir nuestras campañas publicitarias. Puedes aceptarlas todas, rechazarlas todas o elegir cuáles permitir. Las cookies técnicas necesarias para que la página funcione se usan siempre. Más información en nuestra ',
      policy: 'Política de cookies',
      reject: 'Rechazar todas', config: 'Configurar', accept: 'Aceptar todas',
      panelTitle: 'Preferencias de cookies', close: 'Cerrar',
      techName: 'Cookies técnicas (necesarias)', techState: 'Siempre activas',
      techDesc: 'Imprescindibles para el funcionamiento del sitio, como recordar el idioma seleccionado. No se pueden desactivar.',
      anaName: 'Cookies analíticas',
      anaDesc: 'Nos permiten medir cómo se usa el sitio (páginas vistas, origen del tráfico) para mejorarlo. Datos agregados.',
      adsName: 'Cookies de publicidad',
      adsDesc: 'Permiten medir la eficacia de nuestras campañas de Google Ads y mostrar anuncios relevantes.',
      save: 'Guardar preferencias', acceptAll: 'Aceptar todas', on: 'Activadas', off: 'Desactivadas'
    },
    en: {
      title: 'Your privacy',
      body: 'This site uses first- and third-party cookies to analyse traffic and measure our advertising campaigns. You can accept them all, reject them all or choose which to allow. The technical cookies needed for the page to work are always used. More information in our ',
      policy: 'Cookie policy',
      reject: 'Reject all', config: 'Customise', accept: 'Accept all',
      panelTitle: 'Cookie preferences', close: 'Close',
      techName: 'Technical cookies (necessary)', techState: 'Always active',
      techDesc: 'Essential for the site to work, such as remembering the selected language. They cannot be disabled.',
      anaName: 'Analytics cookies',
      anaDesc: 'They let us measure how the site is used (page views, traffic source) to improve it. Aggregated data.',
      adsName: 'Advertising cookies',
      adsDesc: 'They let us measure the effectiveness of our Google Ads campaigns and show relevant ads.',
      save: 'Save preferences', acceptAll: 'Accept all', on: 'On', off: 'Off'
    },
    da: {
      title: 'Dit privatliv',
      body: 'Dette site bruger egne cookies og tredjepartscookies til at analysere trafik og måle vores annoncekampagner. Du kan acceptere alle, afvise alle eller vælge, hvilke du vil tillade. De tekniske cookies, der er nødvendige for, at siden fungerer, bruges altid. Mere information i vores ',
      policy: 'Cookiepolitik',
      reject: 'Afvis alle', config: 'Tilpas', accept: 'Accepter alle',
      panelTitle: 'Cookieindstillinger', close: 'Luk',
      techName: 'Tekniske cookies (nødvendige)', techState: 'Altid aktive',
      techDesc: 'Nødvendige for, at sitet fungerer, f.eks. at huske det valgte sprog. De kan ikke deaktiveres.',
      anaName: 'Analysecookies',
      anaDesc: 'De giver os mulighed for at måle, hvordan sitet bruges (sidevisninger, trafikkilde) for at forbedre det. Aggregerede data.',
      adsName: 'Annoncecookies',
      adsDesc: 'De giver os mulighed for at måle effektiviteten af vores Google Ads-kampagner og vise relevante annoncer.',
      save: 'Gem indstillinger', acceptAll: 'Accepter alle', on: 'Til', off: 'Fra'
    }
  };
  function lang() {
    var l = (document.documentElement.lang || 'es').slice(0, 2);
    return T[l] ? l : 'es';
  }

  /* ---------- estilos ---------- */
  var CSS =
  '#pz-cc *{box-sizing:border-box}' +
  '#pz-cc{position:fixed;left:0;right:0;bottom:0;z-index:9999;display:flex;justify-content:center;padding:18px;pointer-events:none;font-family:var(--body,system-ui,sans-serif)}' +
  '#pz-cc .pz-card{pointer-events:auto;width:100%;max-width:760px;background:linear-gradient(160deg,rgba(26,31,38,.98),rgba(19,22,27,.98));border:1px solid var(--ink-line,rgba(232,229,221,.12));border-radius:16px;padding:24px 26px;box-shadow:0 24px 70px -24px rgba(0,0,0,.7);backdrop-filter:blur(14px);transform:translateY(16px);opacity:0;transition:transform .45s cubic-bezier(.2,.7,.2,1),opacity .45s ease}' +
  '#pz-cc.in .pz-card{transform:none;opacity:1}' +
  '#pz-cc h2{font-family:var(--display,Georgia,serif);font-size:1.25rem;font-weight:600;color:var(--on-ink,#E8E5DD);margin:0 0 8px}' +
  '#pz-cc p{font-size:.9rem;line-height:1.6;color:var(--on-ink-mut,#8C929B);margin:0 0 18px}' +
  '#pz-cc a.pz-link{color:var(--verified,#36B98A);text-decoration:underline;text-underline-offset:2px}' +
  '#pz-cc .pz-btns{display:flex;gap:10px;flex-wrap:wrap}' +
  '#pz-cc .pz-btns .pz-b{flex:1 1 0;min-width:150px}' +
  '.pz-b{font-family:var(--body,sans-serif);font-weight:600;font-size:.9rem;border-radius:999px;padding:13px 18px;cursor:pointer;border:1px solid var(--ink-line,rgba(232,229,221,.18));background:rgba(255,255,255,.05);color:var(--on-ink,#E8E5DD);transition:transform .15s,background .2s,border-color .2s}' +
  '.pz-b:hover{transform:translateY(-1px);border-color:var(--verified,#36B98A);background:rgba(255,255,255,.09)}' +
  '.pz-b.pz-accent{background:var(--verified,#36B98A);color:#06281c;border-color:var(--verified,#36B98A)}' +
  '.pz-b.pz-accent:hover{background:#41c896}' +
  /* panel */
  '#pz-modal{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;padding:18px;background:rgba(8,10,13,.62);opacity:0;transition:opacity .3s ease;font-family:var(--body,sans-serif)}' +
  '#pz-modal.in{opacity:1}' +
  '#pz-modal .pz-panel{width:100%;max-width:560px;max-height:88vh;overflow:auto;background:linear-gradient(160deg,rgba(26,31,38,.99),rgba(19,22,27,.99));border:1px solid var(--ink-line,rgba(232,229,221,.12));border-radius:18px;padding:28px 28px 24px;box-shadow:0 30px 80px -30px rgba(0,0,0,.8);transform:translateY(14px) scale(.99);transition:transform .35s cubic-bezier(.2,.7,.2,1)}' +
  '#pz-modal.in .pz-panel{transform:none}' +
  '#pz-modal .pz-h{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px}' +
  '#pz-modal h2{font-family:var(--display,Georgia,serif);font-size:1.4rem;font-weight:600;color:var(--on-ink,#E8E5DD);margin:0}' +
  '#pz-modal .pz-x{background:none;border:0;color:var(--on-ink-mut,#8C929B);font-size:1.5rem;line-height:1;cursor:pointer;padding:4px 8px;border-radius:8px}' +
  '#pz-modal .pz-x:hover{color:var(--on-ink,#E8E5DD)}' +
  '.pz-cat{border:1px solid var(--ink-line,rgba(232,229,221,.12));border-radius:12px;padding:18px 18px;margin-bottom:12px;background:rgba(255,255,255,.02)}' +
  '.pz-cat .pz-row{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:8px}' +
  '.pz-cat h3{font-size:1rem;font-weight:600;color:var(--on-ink,#E8E5DD);margin:0}' +
  '.pz-cat p{font-size:.84rem;line-height:1.55;color:var(--on-ink-mut,#8C929B);margin:0}' +
  '.pz-always{font-family:var(--mono,monospace);font-size:.68rem;letter-spacing:.04em;color:var(--verified,#36B98A);background:var(--verified-soft,rgba(54,185,138,.14));border:1px solid rgba(54,185,138,.4);padding:5px 11px;border-radius:999px;white-space:nowrap}' +
  '.pz-sw{position:relative;width:46px;height:26px;border-radius:999px;border:1px solid var(--ink-line,rgba(232,229,221,.22));background:rgba(255,255,255,.06);cursor:pointer;flex-shrink:0;transition:background .25s,border-color .25s}' +
  '.pz-sw::after{content:"";position:absolute;top:2px;left:2px;width:20px;height:20px;border-radius:50%;background:#9aa0a8;transition:transform .25s,background .25s}' +
  '.pz-sw[aria-checked="true"]{background:var(--verified-soft,rgba(54,185,138,.2));border-color:var(--verified,#36B98A)}' +
  '.pz-sw[aria-checked="true"]::after{transform:translateX(20px);background:var(--verified,#36B98A)}' +
  '.pz-sw:focus-visible{outline:2px solid var(--verified,#36B98A);outline-offset:2px}' +
  '#pz-modal .pz-foot{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}' +
  '#pz-modal .pz-foot .pz-b{flex:1 1 0;min-width:150px}' +
  '@media(max-width:560px){#pz-cc .pz-btns .pz-b,#pz-modal .pz-foot .pz-b{flex:1 1 100%}}';

  /* ---------- construir DOM ---------- */
  var banner, modal, swAna, swAds;

  function buildBanner() {
    var t = T[lang()];
    banner = document.createElement('div');
    banner.id = 'pz-cc';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', t.title);
    banner.innerHTML =
      '<div class="pz-card">' +
        '<h2 data-k="title"></h2>' +
        '<p><span data-k="body"></span><a class="pz-link" href="cookies.html" data-k="policy"></a>.</p>' +
        '<div class="pz-btns">' +
          '<button class="pz-b" data-act="reject" data-k="reject"></button>' +
          '<button class="pz-b" data-act="config" data-k="config"></button>' +
          '<button class="pz-b pz-accent" data-act="accept" data-k="accept"></button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(banner);
    banner.querySelector('[data-act="reject"]').addEventListener('click', rejectAll);
    banner.querySelector('[data-act="accept"]').addEventListener('click', acceptAll);
    banner.querySelector('[data-act="config"]').addEventListener('click', openPanel);
    requestAnimationFrame(function () { banner.classList.add('in'); });
    setTimeout(function () { if (banner) banner.classList.add('in'); }, 30);
  }

  function buildModal() {
    var pre = load();
    modal = document.createElement('div');
    modal.id = 'pz-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.style.display = 'none';
    modal.innerHTML =
      '<div class="pz-panel" role="document">' +
        '<div class="pz-h"><h2 data-k="panelTitle"></h2><button class="pz-x" data-act="close" aria-label="">&times;</button></div>' +
        '<div class="pz-cat">' +
          '<div class="pz-row"><h3 data-k="techName"></h3><span class="pz-always" data-k="techState"></span></div>' +
          '<p data-k="techDesc"></p>' +
        '</div>' +
        '<div class="pz-cat">' +
          '<div class="pz-row"><h3 data-k="anaName"></h3><button class="pz-sw" id="pz-sw-ana" role="switch" aria-checked="false"></button></div>' +
          '<p data-k="anaDesc"></p>' +
        '</div>' +
        '<div class="pz-cat">' +
          '<div class="pz-row"><h3 data-k="adsName"></h3><button class="pz-sw" id="pz-sw-ads" role="switch" aria-checked="false"></button></div>' +
          '<p data-k="adsDesc"></p>' +
        '</div>' +
        '<div class="pz-foot">' +
          '<button class="pz-b" data-act="save" data-k="save"></button>' +
          '<button class="pz-b pz-accent" data-act="acceptAll" data-k="acceptAll"></button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);
    swAna = modal.querySelector('#pz-sw-ana');
    swAds = modal.querySelector('#pz-sw-ads');
    if (pre) { setSw(swAna, pre.a); setSw(swAds, pre.p); }
    [swAna, swAds].forEach(function (sw) {
      sw.addEventListener('click', function () { setSw(sw, sw.getAttribute('aria-checked') !== 'true'); });
    });
    modal.querySelector('[data-act="close"]').addEventListener('click', closePanel);
    modal.querySelector('[data-act="save"]').addEventListener('click', savePrefs);
    modal.querySelector('[data-act="acceptAll"]').addEventListener('click', acceptAll);
    modal.addEventListener('click', function (e) { if (e.target === modal) closePanel(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.style.display !== 'none') closePanel(); });
  }

  function setSw(sw, on) { sw.setAttribute('aria-checked', on ? 'true' : 'false'); }

  /* ---------- traducir nodos ---------- */
  function translate() {
    var t = T[lang()];
    [banner, modal].forEach(function (root) {
      if (!root) return;
      root.querySelectorAll('[data-k]').forEach(function (el) {
        var v = t[el.getAttribute('data-k')];
        if (v != null) el.textContent = v;
      });
    });
    if (banner) banner.setAttribute('aria-label', t.title);
    if (modal) modal.querySelector('[data-act="close"]').setAttribute('aria-label', t.close);
  }

  /* ---------- acciones ---------- */
  function hideBanner() {
    if (!banner) return;
    banner.classList.remove('in');
    setTimeout(function () { if (banner) banner.style.display = 'none'; }, 450);
  }
  function acceptAll() {
    applyConsent(true, true); save(true, true);
    setSw(swAna, true); setSw(swAds, true);
    closePanel(); hideBanner();
  }
  function rejectAll() {
    applyConsent(false, false); save(false, false);
    hideBanner();
  }
  function savePrefs() {
    var a = swAna.getAttribute('aria-checked') === 'true';
    var p = swAds.getAttribute('aria-checked') === 'true';
    applyConsent(a, p); save(a, p);
    closePanel(); hideBanner();
  }
  function openPanel() {
    if (!modal) return;
    var pre = load();
    if (pre) { setSw(swAna, pre.a); setSw(swAds, pre.p); }
    modal.style.display = 'flex';
    requestAnimationFrame(function () { modal.classList.add('in'); });
    setTimeout(function () { if (modal) modal.classList.add('in'); }, 30);
  }
  function closePanel() {
    if (!modal) return;
    modal.classList.remove('in');
    setTimeout(function () { if (modal) modal.style.display = 'none'; }, 300);
  }

  /* reabrir desde un enlace/botón: <a data-cookie-prefs> o window.gestionarCookies() */
  window.gestionarCookies = function () {
    if (banner && banner.style.display === 'none') { banner.style.display = 'flex'; }
    openPanel();
  };

  /* ---------- init ---------- */
  function init() {
    var style = document.createElement('style');
    style.id = 'pz-cc-style';
    style.textContent = CSS;
    document.head.appendChild(style);

    buildModal();
    var decided = load();
    if (!decided) {
      buildBanner();
    } else {
      applyConsent(decided.a, decided.p); // re-aplica en cada carga
    }
    translate();

    // reabrir desde cualquier enlace marcado
    document.querySelectorAll('[data-cookie-prefs]').forEach(function (el) {
      el.addEventListener('click', function (e) { e.preventDefault(); window.gestionarCookies(); });
    });

    // re-traducir al cambiar idioma
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.addEventListener('click', function () { setTimeout(translate, 0); });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
