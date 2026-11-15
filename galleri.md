---
layout: default
title: Galleri
permalink: /galleri.html
---

<style>
  .gallery-block {
    margin-bottom: clamp(2.8rem, 6vw, 4rem);
  }
  .gallery-block:last-child {
    margin-bottom: 0;
  }
  .video-stage {
    max-width: 780px;
    margin: 0 auto;
    background: linear-gradient(160deg, var(--bg-deep) 0%, var(--bg-coastal) 100%);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    padding: clamp(1rem, 3vw, 1.8rem);
  }
  .video-carousel {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  .controls-row {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
  }
  .carousel-track-wrapper {
    width: 100%;
    overflow: hidden;
    border-radius: var(--radius-md);
  }
  .carousel-track {
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
    transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .carousel-slide {
    min-width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
  }
  .video-card {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .video-card .video-wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    border-radius: var(--radius-md);
    background: #000;
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
    margin-bottom: 0.9rem;
  }
  .video-card iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: var(--radius-md);
  }
  .video-caption {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 600;
    color: #e0f2f1;
    text-align: center;
  }
  .controls-bottom {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    margin-top: 0.25rem;
  }
  .carousel-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 50%;
    cursor: pointer;
    font-size: 1rem;
    transition: background var(--transition-fast), transform var(--transition-fast);
  }
  .carousel-btn:hover:not(:disabled),
  .carousel-btn:focus-visible:not(:disabled) {
    background: var(--brand);
    transform: translateY(-1px);
    outline: none;
  }
  .carousel-btn:disabled {
    opacity: 0.38;
    cursor: default;
  }
  .carousel-dots {
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
  }
  .carousel-dot {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.28);
    cursor: pointer;
    border: 0;
    padding: 0;
    transition: width 0.25s ease, background 0.25s ease;
  }
  .carousel-dot.active {
    width: 24px;
    background: var(--accent-warm);
  }
  .video-swipe-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.08));
    color: #fff;
    z-index: 3;
    cursor: grab;
  }
  .video-swipe-overlay:active {
    cursor: grabbing;
  }
  .swipe-label {
    background: rgba(11, 34, 40, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.25);
    padding: 0.42rem 0.85rem;
    border-radius: 999px;
    font-size: 0.9rem;
    font-weight: 500;
    color: #fff;
  }
  @media (min-width: 900px) {
    .video-swipe-overlay {
      display: none;
    }
  }
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.5rem;
  }
  .gallery-card {
    background: var(--surface);
    border: 1px solid var(--border-soft);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast);
  }
  .gallery-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--border-strong);
  }
  .gallery-thumb-btn {
    padding: 0;
    border: 0;
    background: var(--bg-deep);
    width: 100%;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    cursor: zoom-in;
    display: block;
  }
  .gallery-thumb-btn img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .gallery-thumb-btn--portrait img {
    object-position: center 20%;
  }
  .gallery-card:hover .gallery-thumb-btn img {
    transform: scale(1.05);
  }
  .gallery-caption {
    padding: 1rem 1.2rem;
    font-family: var(--font-display);
    font-size: 0.98rem;
    font-weight: 600;
    color: var(--ink);
    text-align: center;
  }
  .lightbox {
    display: none;
    position: fixed;
    z-index: 9999;
    inset: 0;
    padding: 1.5rem;
    background: rgba(6, 18, 22, 0.92);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    align-items: center;
    justify-content: center;
  }
  .lightbox.active {
    display: flex;
  }
  .lightbox img {
    max-width: 92vw;
    max-height: 88vh;
    border-radius: var(--radius-md);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  }
  .lightbox-close {
    position: absolute;
    top: 1.2rem;
    right: 1.4rem;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.25);
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
    font-size: 1.6rem;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .lightbox-close:hover {
    background: rgba(255, 255, 255, 0.22);
  }
  @media (max-width: 900px) {
    .gallery-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media (max-width: 640px) {
    .gallery-grid {
      grid-template-columns: 1fr;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .carousel-track,
    .gallery-card,
    .gallery-thumb-btn img,
    .carousel-btn,
    .carousel-dot {
      transition: none;
    }
    .gallery-card:hover,
    .gallery-card:hover .gallery-thumb-btn img {
      transform: none;
    }
  }
</style>

<section class="page-hero">
  <div class="page-hero__inner">
    <span class="page-hero__badge">Video &amp; Foto</span>
    <h1 class="page-hero__title">Galleri</h1>
    <p class="page-hero__lead">
      Upplev vår scennärvaro – lyssna på liveklipp från YouTube och klicka på bilderna för att se dem i full storlek.
    </p>
  </div>
</section>

<section class="page-section page-section--soft">
  <div class="section-container">
    <div class="gallery-block">
      <div class="section-header">
        <span class="section-eyebrow">YouTube</span>
        <h2 class="section-title">Liveklipp &amp; Video</h2>
        <p class="section-subtitle">Bläddra mellan våra inspelade framträdanden.</p>
      </div>
      <div class="video-stage">
        <div class="video-carousel" id="videoCarousel">
          <div class="controls-row">
            <div class="carousel-track-wrapper">
              <ul class="carousel-track">
                <li class="carousel-slide">
                  <div class="video-card">
                    <div class="video-wrapper">
                      <div class="video-swipe-overlay" aria-hidden="true"><span class="swipe-label">Svep för att byta video · Tryck för att spela</span></div>
                      <iframe src="https://www.youtube.com/embed/bhsHd3c4Spo?si=UjGOrbrzRnXhtMsn&enablejsapi=1" title="Skånska Vågor – Liveklipp 1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                    <div class="video-caption">Liveklipp</div>
                  </div>
                </li>
                <li class="carousel-slide">
                  <div class="video-card">
                    <div class="video-wrapper">
                      <div class="video-swipe-overlay" aria-hidden="true"><span class="swipe-label">Svep för att byta video · Tryck för att spela</span></div>
                      <iframe src="https://www.youtube.com/embed/_L8Fi8Xahaw?enablejsapi=1" title="Video från Skånska Vågor" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                    <div class="video-caption">Video från Skånska Vågor</div>
                  </div>
                </li>
                <li class="carousel-slide">
                  <div class="video-card">
                    <div class="video-wrapper">
                      <div class="video-swipe-overlay" aria-hidden="true"><span class="swipe-label">Svep för att byta video · Tryck för att spela</span></div>
                      <iframe src="https://www.youtube.com/embed/3AZSVCrPNs8?si=6sGKvnAwxIVJ-nRm&enablejsapi=1" title="Skånska Vågor – Liveklipp 2" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                    <div class="video-caption">Liveklipp</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="controls-bottom">
            <button class="carousel-btn prev" type="button" aria-label="Föregående video">&#9664;</button>
            <div class="carousel-dots" aria-hidden="false"></div>
            <button class="carousel-btn next" type="button" aria-label="Nästa video">&#9654;</button>
          </div>
        </div>
      </div>
    </div>
    <div class="gallery-block">
      <div class="section-header">
        <span class="section-eyebrow">Fotografier</span>
        <h2 class="section-title">Bilder från scen &amp; sessioner</h2>
        <p class="section-subtitle">Klicka på valfri bild för att öppna den i större format.</p>
      </div>
      <div class="gallery-grid">
        <article class="gallery-card">
          <button type="button" class="gallery-thumb-btn" onclick="openLightbox(this.querySelector('img'))" aria-label="Förstora bild: Live på Limhamnsfestivalen">
            <img src="{{ site.baseurl }}/public/galleri/756219206_2595398347557718_3045355905677558017_n.jpg" alt="Skånska Vågor live på Limhamnsfestivalen" />
          </button>
          <div class="gallery-caption">Live på Limhamnsfestivalen</div>
        </article>
        <article class="gallery-card">
          <button type="button" class="gallery-thumb-btn gallery-thumb-btn--portrait" onclick="openLightbox(this.querySelector('img'))" aria-label="Förstora bild: Bild på hela bandet med gitarrer">
            <img src="{{ site.baseurl }}/public/galleri/516693477_10227548120584839_2821924789254496156_n.jpg" alt="Bild på hela bandet med akustiska gitarrer" />
          </button>
          <div class="gallery-caption">Bild på hela bandet</div>
        </article>
        <article class="gallery-card">
          <button type="button" class="gallery-thumb-btn gallery-thumb-btn--portrait" onclick="openLightbox(this.querySelector('img'))" aria-label="Förstora bild: Akustisk session med hela bandet">
            <img src="{{ site.baseurl }}/public/galleri/501057291_10226767836958236_8478783061480093931_n.jpg" alt="Hela bandet tillsammans utomhus" />
          </button>
          <div class="gallery-caption">Akustisk session utomhus</div>
        </article>
        <!-- Lägg till fler bilder här -->
      </div>
    </div>
  </div>
</section>

<!-- Lightbox markup -->
<div class="lightbox" id="lightbox" onclick="closeLightbox(event)" role="dialog" aria-modal="true" aria-label="Bildvisning">
  <button type="button" class="lightbox-close" onclick="closeLightbox(event)" aria-label="Stäng bild">&times;</button>
  <img id="lightbox-img" src="" alt="" />
</div>

<script>
function openLightbox(img) {
  if (!img) return;
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.classList.add('active');
}
function closeLightbox(e) {
  if (e.target.classList.contains('lightbox') || e.target.classList.contains('lightbox-close')) {
    document.getElementById('lightbox').classList.remove('active');
  }
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.getElementById('lightbox').classList.remove('active');
  }
});
</script>

<!-- Carousel script -->
<script>
;(function(){
  var track = document.querySelector('.carousel-track');
  if (!track) return;
  var slides = Array.from(track.children);
  var prevBtns = document.querySelectorAll('.carousel-btn.prev');
  var nextBtns = document.querySelectorAll('.carousel-btn.next');
  var dotsContainer = document.querySelector('.carousel-dots');
  var currentIndex = 0;
  var wrap = document.querySelector('.carousel-track-wrapper');
  var isDragging = false;
  var startX = 0;
  var dragDelta = 0;
  slides.forEach(function(_, i){
    var dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot' + (i===0? ' active':'');
    dot.setAttribute('data-index', i);
    dot.setAttribute('aria-label', 'Visa video ' + (i + 1));
    dot.addEventListener('click', function(){ goToSlide(i); });
    dotsContainer.appendChild(dot);
  });
  function update() {
    var width = wrap.clientWidth;
    track.style.transform = 'translateX(' + (-currentIndex * width) + 'px)';
    Array.from(dotsContainer.children).forEach(function(d, i){ d.classList.toggle('active', i===currentIndex); });
    prevBtns.forEach(function(b){ b.disabled = currentIndex === 0; });
    nextBtns.forEach(function(b){ b.disabled = currentIndex === slides.length - 1; });
  }
  function goToSlide(i) {
    track.querySelectorAll('iframe').forEach(function(iframe){
      try {
        iframe.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: 'pauseVideo',
          args: []
        }), '*');
      } catch (e) {}
    });
    currentIndex = Math.max(0, Math.min(i, slides.length-1));
    update();
    resetAutoplay();
  }
  prevBtns.forEach(function(b){ b.addEventListener('click', function(){ goToSlide(currentIndex-1); }); });
  nextBtns.forEach(function(b){ b.addEventListener('click', function(){ goToSlide(currentIndex+1); }); });
  var autoplayInterval = 300000, autoplayId = null;
  function startAutoplay(){ autoplayId = setInterval(function(){
    currentIndex = (currentIndex + 1) % slides.length; update();
  }, autoplayInterval); }
  function resetAutoplay(){ if (autoplayId) { clearInterval(autoplayId); } startAutoplay(); }
  startAutoplay();
  window.addEventListener('resize', update);
  var overlays = document.querySelectorAll('.video-swipe-overlay');
  overlays.forEach(function(overlay){
    overlay.style.touchAction = 'pan-y';
    overlay.addEventListener('pointerdown', function(e){
      isDragging = true; startX = e.clientX; dragDelta = 0; if (autoplayId) clearInterval(autoplayId);
      track.style.transition = 'none';
      overlay.setPointerCapture(e.pointerId);
    });
    overlay.addEventListener('pointermove', function(e){
      if (!isDragging) return;
      dragDelta = e.clientX - startX;
      var width = wrap.clientWidth;
      track.style.transform = 'translateX(' + ((-currentIndex * width) + dragDelta) + 'px)';
    });
    function endDragOverlay(e){
      if (!isDragging) return; isDragging = false; track.style.transition = '';
      var width = wrap.clientWidth;
      if (Math.abs(dragDelta) < 6) {
        overlay.style.display = 'none';
        var iframe = overlay.parentElement.querySelector('iframe');
        try { iframe && iframe.focus(); } catch (err) {}
        if (autoplayId) clearInterval(autoplayId);
        return;
      }
      if (Math.abs(dragDelta) > width * 0.2) {
        if (dragDelta < 0) { goToSlide(currentIndex + 1); } else { goToSlide(currentIndex - 1); }
      } else {
        update();
        resetAutoplay();
      }
      try { overlay.releasePointerCapture(e.pointerId); } catch (err) {}
    }
    overlay.addEventListener('pointerup', endDragOverlay);
    overlay.addEventListener('pointercancel', endDragOverlay);
    overlay.addEventListener('pointerleave', endDragOverlay);
  });
  track.querySelectorAll('iframe').forEach(function(frm){
    frm.addEventListener('focus', function(){ if (autoplayId) clearInterval(autoplayId); });
  });
  update();
})();
</script>
