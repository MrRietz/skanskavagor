---
layout: default
title: Bandmedlemmar
permalink: /medlemmar.html
---

<style>
  .members-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.65rem;
    margin-bottom: clamp(2.2rem, 4vw, 3.2rem);
  }
  .member-card {
    background: var(--surface);
    border: 1px solid var(--border-soft);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast);
  }
  .member-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--border-strong);
  }
  .member-media {
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: var(--bg-deep);
  }
  .member-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .member-card:hover .member-media img {
    transform: scale(1.04);
  }
  .member-media--mia img {
    object-position: center 20%;
  }
  .member-media--robin img {
    object-position: center 16%;
  }
  .member-media--andre img {
    object-position: center 18%;
  }
  .member-body {
    padding: 1.6rem 1.55rem 1.85rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .member-role {
    display: inline-flex;
    align-self: flex-start;
    padding: 0.3rem 0.8rem;
    border-radius: 999px;
    background: rgba(0, 137, 123, 0.11);
    color: var(--brand-dark);
    font-family: var(--font-display);
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-bottom: 0.65rem;
  }
  .member-name {
    margin: 0 0 0.65rem 0;
    font-family: var(--font-display);
    font-size: 1.55rem;
    font-weight: 800;
    color: var(--ink);
  }
  .member-desc {
    margin: 0;
    font-size: 0.98rem;
    line-height: 1.68;
    color: var(--ink-soft);
  }
  .members-cta-box {
    text-align: center;
    background: linear-gradient(135deg, #ffffff 0%, #f1f8f7 100%);
    border: 1px solid var(--border-soft);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    padding: clamp(1.6rem, 4vw, 2.4rem);
  }
  .members-cta-box h2 {
    margin: 0 0 0.55rem 0;
    font-size: clamp(1.35rem, 2.8vw, 1.8rem);
    font-weight: 700;
  }
  .members-cta-box p {
    margin: 0 auto 1.35rem auto;
    max-width: 52ch;
    color: var(--ink-soft);
  }
  .members-cta-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.85rem;
  }
  @media (max-width: 960px) {
    .members-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media (max-width: 660px) {
    .members-grid {
      grid-template-columns: 1fr;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .member-card,
    .member-media img {
      transition: none;
    }
    .member-card:hover,
    .member-card:hover .member-media img {
      transform: none;
    }
  }
</style>

<section class="page-hero">
  <div class="page-hero__inner">
    <span class="page-hero__badge">Trion</span>
    <h1 class="page-hero__title">Bandmedlemmar</h1>
    <p class="page-hero__lead">
      Tre röster och två akustiska gitarrer – lär känna Mia, Robin och André som tillsammans skapar Skånska Vågors unika sound.
    </p>
  </div>
</section>

<section class="page-section page-section--soft">
  <div class="section-container">
    <div class="members-grid">
      <article class="member-card">
        <div class="member-media member-media--mia">
          <img src="{{ site.baseurl }}/public/img/mia.png" alt="Mia – sång i Skånska Vågor" />
        </div>
        <div class="member-body">
          <span class="member-role">Sång</span>
          <h2 class="member-name">Mia</h2>
          <p class="member-desc">
            Musiken är inte bara något Mia gör – det är något hon är. Med sång, dans och rytm som livslånga följeslagare förmedlar hon känslor och närvaro på scenen. Hon tror på kraften i gemenskap, där varje medlem och publikens energi skapar ett flöde där musiken får tala.
          </p>
        </div>
      </article>
      <article class="member-card">
        <div class="member-media member-media--robin">
          <img src="{{ site.baseurl }}/public/img/robin.png" alt="Robin – gitarr och sång i Skånska Vågor" />
        </div>
        <div class="member-body">
          <span class="member-role">Gitarr &amp; sång</span>
          <h2 class="member-name">Robin</h2>
          <p class="member-desc">
            Robin är en energisk gitarrist som spelar med hjärtat först. Han är spontan och kreativ, ofta med oväntade infall som ger musiken liv. Sången är intensiv och uttrycksfull – ibland vild, ibland sårbar.
          </p>
        </div>
      </article>
      <article class="member-card">
        <div class="member-media member-media--andre">
          <img src="{{ site.baseurl }}/public/img/andre.png" alt="André – gitarr och sång i Skånska Vågor" />
        </div>
        <div class="member-body">
          <span class="member-role">Gitarr &amp; sång</span>
          <h2 class="member-name">André</h2>
          <p class="member-desc">
            André är en trygg och eftertänksam gitarrist som utgör ett lugn i bandet. Han har ett säkert grepp om tempo och rytm, spelar med känsla snarare än ego, och bidrar ibland med sång. En stabil närvaro som håller ihop helheten.
          </p>
        </div>
      </article>
    </div>
    <div class="members-cta-box">
      <h2>Vill du höra oss tillsammans på scen?</h2>
      <p>
        Spana in våra liveklipp i galleriet eller skicka en bokningsförfrågan till ditt nästa evenemang.
      </p>
      <div class="members-cta-actions">
        <a href="{{ site.baseurl }}/galleri.html" class="btn btn--ghost">Se videoklipp &amp; foton</a>
        <a href="{{ site.baseurl }}/bokning.html" class="btn btn--primary">Boka Skånska Vågor</a>
      </div>
    </div>
  </div>
</section>
