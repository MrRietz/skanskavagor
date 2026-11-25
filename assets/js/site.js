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
    function set(open) {
      links.classList.toggle('open', open);
      nav.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      label.textContent = open ? 'Stäng' : 'Meny';
      doc.body.style.overflow = open ? 'hidden' : '';
    }
    toggle.addEventListener('click', function () { set(!links.classList.contains('open')); });
    links.addEventListener('click', function (e) { if (e.target.tagName === 'A') set(false); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
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

  // Bildvisning
  var box = doc.querySelector('.lightbox');
  if (box) {
    var big = box.querySelector('img');
    doc.querySelectorAll('[data-zoom]').forEach(function (img) {
      img.addEventListener('click', function () { big.src = img.src; big.alt = img.alt; box.classList.add('open'); });
    });
    box.addEventListener('click', function () { box.classList.remove('open'); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') box.classList.remove('open'); });
  }
})();
