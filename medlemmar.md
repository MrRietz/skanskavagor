---
layout: default
title: Bandmedlemmar
permalink: /medlemmar.html
---

<style>
  .members-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.75rem;
    margin-bottom: clamp(2.4rem, 5vw, 3.6rem);
  }
  .member-card {
    background: var(--surface-card);
    border: 1px solid var(--rule);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    padding: 10px 10px 0 10px;
    display: flex;
    flex-direction: column;
    transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  }
  .member-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
  }
  .member-media {
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    border-radius: 2px;
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
    transform: scale(1.03);
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
    padding: 1.35rem 0.95rem 1.65rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .member-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.75rem;
    padding-bottom: 0.75rem;
    margin-bottom: 0.9rem;
    border-bottom: 1px solid var(--rule);
  }
  .member-name {
    margin: 0;
    font-family: var(--font-display);
    font-size: 1.55rem;
    font-weight: 600;
    color: var(--ink);
  }
  .member-role {
    font-family: var(--font-display);
    font-style: italic;
    font-size: 0.98rem;
    color: var(--accent-warm);
    white-space: nowrap;
  }
  .member-desc {
    margin: 0;
    font-size: 0.97rem;
    line-height: 1.7;
    color: var(--ink-soft);
  }
  .members-cta-box {
    max-width: 780px;
    margin: 0 auto;
    padding: clamp(1.6rem, 4vw, 2.4rem);
    background: var(--surface-card);
    border: 1px solid var(--rule-strong);
    border-top: 4px solid var(--brand-dark);
    border-radius: var(--radius-md);
    text-align: center;
  }
  .members-cta-box h2 {
    margin: 0 0 0.55rem 0;
    font-family: var(--font-display);
    font-size: clamp(1.4rem, 2.8vw, 1.85rem);
    font-weight: 600;
  }
  .members-cta-box p {
    margin: 0 auto 1.4rem auto;
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
    <span class="page-hero__kicker">Trion</span>
    <h1 class="page-hero__title">Bandmedlemmar</h1>
    <p class="page-hero__lead">
      Tre röster och två akustiska gitarrer – lär känna Mia, Robin och André som tillsammans skapar Skånska Vågors unika sound.
    </p>
  </div>
</section>

<section class="page-section page-section--warm">
  <div class="section-container">
    <div class="members-grid">
      <article class="member-card">
        <div class="member-media member-media--mia">
          <img src="{{ site.baseurl }}/public/img/mia.png" alt="Mia – sång i Skånska Vågor" />
        </div>
        <div class="member-body">
          <div class="member-header">
            <h2 class="member-name">Mia</h2>
            <span class="member-role">Sång</span>
          </div>
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
          <div class="member-header">
            <h2 class="member-name">Robin</h2>
            <span class="member-role">Gitarr &amp; sång</span>
          </div>
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
          <div class="member-header">
            <h2 class="member-name">André</h2>
            <span class="member-role">Gitarr &amp; sång</span>
          </div>
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
