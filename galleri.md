---
layout: default
title: Galleri
permalink: /galleri.html
---

<style>
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #e0f7fa 0%, #f8fafc 100%);
  padding: 2.5em 1em 2em 1em;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
}
.hero-title {
  font-size: 2.2em;
  font-weight: 700;
  color: #009688;
  margin-bottom: 0.7em;
  letter-spacing: 0.03em;
  text-align: center;
}
.gallery-section-title {
  font-size: 1.4em;
  color: #009688;
  margin: 2em 0 1em 0;
  text-align: center;
  font-weight: 600;
}
.gallery-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
  justify-content: center;
  margin-top: 2em;
}
.gallery-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.06);
  padding: 1em 1em 1.5em 1em;
  width: 260px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}
.gallery-card img {
  max-width: 100%;
  max-height: 140px;
  border-radius: 8px;
  margin-bottom: 0.7em;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  cursor: pointer;
  transition: box-shadow 0.2s;
}
.gallery-card img:hover {
  box-shadow: 0 4px 16px rgba(0,150,136,0.18);
}
.gallery-caption {
  font-size: 1em;
  color: #333;
  text-align: center;
}
/* Video card styles */
.video-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
  justify-content: center;
  margin-top: 2em;
}
.video-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.06);
  padding: 1em 1em 1.5em 1em;
  width: 600px;
  min-height: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}
.video-card .video-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  margin-bottom: 0.7em;
}
.video-card iframe {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%; border: 0;
  border-radius: 8px;
}
/* Lightbox styles */
.lightbox {
  display: none;
  position: fixed;
  z-index: 9999;
  left: 0; top: 0; width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.85);
  align-items: center;
  justify-content: center;
}
.lightbox.active {
  display: flex;
}
.lightbox img {
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 12px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.25);
}
.lightbox-close {
  position: absolute;
  top: 2vw;
  right: 3vw;
  color: #fff;
  font-size: 2.5em;
  font-weight: bold;
  cursor: pointer;
  z-index: 10001;
  text-shadow: 0 2px 8px #000;
}
@media (max-width: 700px) {
  .hero {
    padding: 1.2em 0.3em 1.2em 0.3em;
  }
  .hero-title {
    font-size: 1.3em;
  }
  .gallery-list, .video-list {
    flex-direction: column;
    gap: 1em;
    align-items: center;
  }
  .gallery-card, .video-card {
    min-width: 0;
    width: 98vw;
    max-width: 98vw;
    padding: 1em 0.5em;
  }
  .gallery-card img {
    max-width: 95vw;
    max-height: 180px;
  }
  .video-card .video-wrapper {
    padding-bottom: 56.25%;
    min-height: 180px;
  }
}
</style>

<!-- Carousel styles -->
<style>
/* Layout: buttons + track in one row, dots centered below */
.video-carousel { display:flex; flex-direction:column; align-items:center; gap:12px; justify-content:center; margin-top:1em; }
.controls-row { display:flex; align-items:center; gap:12px; width:100%; justify-content:center; }
.carousel-track-wrapper { width: 640px; max-width: 90vw; overflow: hidden; }
.carousel-track { list-style: none; display:flex; padding:0; margin:0; transition: transform 0.45s ease; }
.carousel-slide { min-width: 100%; box-sizing: border-box; display:flex; justify-content:center; }
.carousel-btn { background:#009688; color:#fff; border:0; padding:8px 12px; border-radius:6px; cursor:pointer; font-size:1.1em; }
.carousel-btn:disabled { opacity:0.5; cursor:default; }
.carousel-dots { display:flex; gap:8px; justify-content:center; align-items:center; width:100%; margin-top:8px; }
.carousel-dot { width:10px; height:10px; border-radius:50%; background:#ddd; cursor:pointer; border:0; }
.carousel-dot.active { background:#009688; }

  .controls-bottom { display:flex; align-items:center; gap:12px; justify-content:center; margin-top:8px; }
.controls-bottom .carousel-btn { padding:6px 10px; }

@media (max-width:700px) {
  .video-carousel { gap:8px; }
  .controls-row { flex-direction:row; }
  .carousel-btn { padding:6px 10px; }
  .carousel-track-wrapper { max-width: 95vw; }
  /* Side buttons removed; bottom controls are always visible */
}
</style>

<!-- Swipe overlay styles -->
<style>
.video-swipe-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.05));
  color: #fff;
  z-index: 3;
  cursor: grab;
}
.video-swipe-overlay:active { cursor: grabbing; }
.swipe-label {
  background: rgba(0,0,0,0.55);
  padding: 0.35em 0.6em;
  border-radius: 999px;
  font-size: 0.95em;
  color: #fff;
}
@media (min-width: 900px) {
  /* Hide overlay on desktop where clicking the iframe is okay */
  .video-swipe-overlay { display: none; }
}
</style>

<div class="hero">
  <div class="hero-title">Galleri</div>
  <div class="gallery-section-title">Video</div>
  <!-- Carousel for embedded YouTube videos -->
  <div class="video-carousel" id="videoCarousel">
    <div class="controls-row">
      <div class="carousel-track-wrapper">
        <ul class="carousel-track">
        <li class="carousel-slide">
          <div class="video-card">
            <div class="video-wrapper">
              <div class="video-swipe-overlay" aria-hidden="true"><span class="swipe-label">Svep för att byta video · Tryck för att spela</span></div>
              <iframe src="https://www.youtube.com/embed/bhsHd3c4Spo?si=UjGOrbrzRnXhtMsn&enablejsapi=1" title="YouTube video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            <div class="gallery-caption">Liveklipp</div>
          </div>
        </li>
        <li class="carousel-slide">
          <div class="video-card">
            <div class="video-wrapper">
              <div class="video-swipe-overlay" aria-hidden="true"><span class="swipe-label">Svep för att byta video · Tryck för att spela</span></div>
              <iframe src="https://www.youtube.com/embed/_L8Fi8Xahaw?enablejsapi=1" title="YouTube video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            <div class="gallery-caption">Video från Skånska Vågor</div>
          </div>
        </li>
        <li class="carousel-slide">
          <div class="video-card">
            <div class="video-wrapper">
              <div class="video-swipe-overlay" aria-hidden="true"><span class="swipe-label">Svep för att byta video · Tryck för att spela</span></div>
              <iframe src="https://www.youtube.com/embed/3AZSVCrPNs8?si=6sGKvnAwxIVJ-nRm&enablejsapi=1" title="YouTube video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            <div class="gallery-caption">Liveklipp</div>
          </div>
        </li>
      </ul>
      </div>  
    </div>
    <div class="controls-bottom">
      <button class="carousel-btn prev" aria-label="Föregående">◀</button>
      <div class="carousel-dots" aria-hidden="false"></div>
      <button class="carousel-btn next" aria-label="Nästa">▶</button>
    </div>

  </div>
  <div class="gallery-section-title">Bilder</div>
  <div class="gallery-list">
    <div class="gallery-card">
      <img src="{{ site.baseurl }}/public/galleri/501057291_10226767836958236_8478783061480093931_n.jpg" alt="Spelning 1" onclick="openLightbox(this)">
      <div class="gallery-caption">Bild på hela bandet</div>
    </div>
    <div class="gallery-card">
      <img src="{{ site.baseurl }}/public/galleri/516693477_10227548120584839_2821924789254496156_n.jpg" alt="Spelning 2" onclick="openLightbox(this)">
      <div class="gallery-caption">Bild på hela bandet </div>
    </div>
    <!-- Lägg till fler bilder här -->
  </div>
</div>

<!-- Lightbox markup -->
<div class="lightbox" id="lightbox" onclick="closeLightbox(event)">
  <span class="lightbox-close" onclick="closeLightbox(event)">&times;</span>
  <img id="lightbox-img" src="" alt="">
</div>

<script>
function openLightbox(img) {
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
  // Touch / pointer drag state
  var isDragging = false;
  var startX = 0;
  var dragDelta = 0;

  // Create dots
  slides.forEach(function(_, i){
    var dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i===0? ' active':'');
    dot.setAttribute('data-index', i);
    dot.addEventListener('click', function(){ goToSlide(i); });
    dotsContainer.appendChild(dot);
  });

  function update() {
    var wrap = document.querySelector('.carousel-track-wrapper');
    var width = wrap.clientWidth;
    track.style.transform = 'translateX(' + (-currentIndex * width) + 'px)';
    Array.from(dotsContainer.children).forEach(function(d, i){ d.classList.toggle('active', i===currentIndex); });
  // enable/disable all prev/next buttons depending on current index
  prevBtns.forEach(function(b){ b.disabled = currentIndex === 0; });
  nextBtns.forEach(function(b){ b.disabled = currentIndex === slides.length - 1; });
  }

  function goToSlide(i) {
    // Pause all YouTube iframes before changing slide
    track.querySelectorAll('iframe').forEach(function(iframe){
      try {
        // send postMessage to YT iframe to pause
        iframe.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: 'pauseVideo',
          args: []
        }), '*');
      } catch (e) {
        // ignore
      }
    });

    currentIndex = Math.max(0, Math.min(i, slides.length-1));
    update();
    resetAutoplay();
  }

  prevBtns.forEach(function(b){ b.addEventListener('click', function(){ goToSlide(currentIndex-1); }); });
  nextBtns.forEach(function(b){ b.addEventListener('click', function(){ goToSlide(currentIndex+1); }); });

  // Autoplay (advance every 7s)
  var autoplayInterval = 300000, autoplayId = null;
  function startAutoplay(){ autoplayId = setInterval(function(){
    currentIndex = (currentIndex + 1) % slides.length; update();
  }, autoplayInterval); }
  function resetAutoplay(){ if (autoplayId) { clearInterval(autoplayId); } startAutoplay(); }
  startAutoplay();

  // Recalculate on resize
  window.addEventListener('resize', update);
  // Pointer / touch swipe support attached to overlay elements so iframe won't block gestures
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
      // If it's a tap (small move), treat as tap-to-reveal overlay
      if (Math.abs(dragDelta) < 6) {
        // hide overlay so user can interact with iframe
        overlay.style.display = 'none';
        // focus iframe if present
        var iframe = overlay.parentElement.querySelector('iframe');
        try { iframe && iframe.focus(); } catch (err) {}
        // pause autoplay while user interacts
        if (autoplayId) clearInterval(autoplayId);
        return;
      }
      // threshold at 20% of width
      if (Math.abs(dragDelta) > width * 0.2) {
        if (dragDelta < 0) { goToSlide(currentIndex + 1); } else { goToSlide(currentIndex - 1); }
      } else {
        // snap back
        update();
        resetAutoplay();
      }
      try { overlay.releasePointerCapture(e.pointerId); } catch (err) {}
    }
    overlay.addEventListener('pointerup', endDragOverlay);
    overlay.addEventListener('pointercancel', endDragOverlay);
    overlay.addEventListener('pointerleave', endDragOverlay);
  });
  // Pause autoplay when user focuses any iframe
  track.querySelectorAll('iframe').forEach(function(frm){
    frm.addEventListener('focus', function(){ if (autoplayId) clearInterval(autoplayId); });
  });
  // Initial layout
  update();
})();
</script>
