(function () {
  var doc = document;
  // Aktiv länk i menyn
  var path = location.pathname.replace(/index\.html$/, '');
  doc.querySelectorAll('.nav-links a').forEach(function (a) {
    var p = new URL(a.href).pathname.replace(/index\.html$/, '');
    if (p === path) a.setAttribute('aria-current', 'page');
  });

  // Mobilmeny
  var toggle = doc.querySelector('.nav-toggle');
  var links = doc.querySelector('.nav-links');
  var nav = doc.querySelector('.site-nav');
  if (toggle && links) {
    var label = toggle.querySelector('.label');
    var set = function (open) {
      links.classList.toggle('open', open);
      nav.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      label.textContent = open ? 'Stäng' : 'Meny';
      doc.body.style.overflow = open ? 'hidden' : '';
    };
    toggle.addEventListener('click', function () { set(!links.classList.contains('open')); });
    links.addEventListener('click', function (e) { if (e.target.tagName === 'A') set(false); });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('open')) { set(false); toggle.focus(); }
    });
    // Stäng mobilmenyn om fönstret blir brett (t.ex. när mobilen vänds)
    var wide = window.matchMedia('(min-width: 901px)');
    var onWide = function () { if (wide.matches) set(false); };
    if (wide.addEventListener) wide.addEventListener('change', onWide); else if (wide.addListener) wide.addListener(onWide);
  }

  // Menyn får fast bakgrund när man scrollat
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 40); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Toning in vid scroll
  var els = doc.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  // Bildvisning (klick eller Enter)
  var box = doc.querySelector('.lightbox');
  if (box) {
    var big = doc.createElement('img');
    box.appendChild(big);
    var last = null;
    var close = function () {
      if (box.hidden) return;
      box.hidden = true; box.classList.remove('open'); doc.body.style.overflow = '';
      if (last) last.focus();
    };
    doc.querySelectorAll('[data-zoom]').forEach(function (img) {
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', 'Förstora bild: ' + img.alt);
      var open = function () {
        last = img; big.src = img.src; big.alt = img.alt;
        box.hidden = false; box.classList.add('open'); doc.body.style.overflow = 'hidden';
        box.setAttribute('tabindex', '-1'); box.focus();
      };
      img.addEventListener('click', open);
      img.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
    box.addEventListener('click', close);
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  // YouTube laddas först när man trycker play
  doc.querySelectorAll('.yt').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = doc.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + btn.dataset.id + '?autoplay=1&rel=0';
      f.title = btn.dataset.titel;
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      f.allowFullscreen = true;
      btn.replaceWith(f);
      f.focus();
    });
  });

  // Bokningsformuläret skickas utan att lämna sidan
  doc.querySelectorAll('.booking-form').forEach(function (form) {
    var status = form.querySelector('.form-status');
    var btn = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', function (e) {
      if (!window.fetch) return;
      e.preventDefault();
      btn.disabled = true;
      status.className = 'form-status';
      status.textContent = 'Skickar…';
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error(r.status);
          form.reset();
          status.className = 'form-status ok';
          status.textContent = 'Tack! Vi har fått din förfrågan och hör av oss så snart vi kan.';
        })
        .catch(function () {
          status.className = 'form-status fel';
          status.innerHTML = 'Något gick fel. Försök igen eller mejla oss på <a href="mailto:skanskavagor@gmail.com">skanskavagor@gmail.com</a>.';
        })
        .then(function () { btn.disabled = false; });
    });
  });
})();
