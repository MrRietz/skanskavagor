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

<div class="hero">
  <div class="hero-title">Galleri</div>
  <div class="gallery-section-title">Video</div>
  <div class="video-list">
    <div class="video-card">
      <div class="video-wrapper">
        <iframe src="https://www.youtube.com/embed/_L8Fi8Xahaw" title="YouTube video" allowfullscreen></iframe>
      </div>
      <div class="gallery-caption">Video från Skånska Vågor</div>
    </div>
    <!-- Lägg till fler videos här -->
  </div>
  <div class="gallery-section-title">Bilder</div>
  <div class="gallery-list">
    <div class="gallery-card">
      <img src="{{ site.baseurl }}/public/galleri/501057291_10226767836958236_8478783061480093931_n.jpg" alt="Spelning 1" onclick="openLightbox(this)">
      <div class="gallery-caption">Spelning på Limhamnsfestivalen</div>
    </div>
    <div class="gallery-card">
      <img src="{{ site.baseurl }}/public/galleri/516693477_10227548120584839_2821924789254496156_n.jpg" alt="Spelning 2" onclick="openLightbox(this)">
      <div class="gallery-caption">Spelning på Kollektivkrogen</div>
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
