---
layout: default
title: Bandmedlemmar
permalink: /medlemmar.html
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
.members-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
  justify-content: center;
  margin-top: 2em;
}
.member-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.06);
  padding: 2em 1.5em;
  width: 320px;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}
.member-name {
  font-size: 1.3em;
  color: #009688;
  font-weight: 700;
  margin-bottom: 0.5em;
}
.member-role {
  font-size: 1.1em;
  color: #333;
  text-align: center;
}

@media (max-width: 700px) {
  .hero {
    padding: 1.2em 0.3em 1.2em 0.3em;
  }
  .hero-title {
    font-size: 1.3em;
  }
  .members-list {
    flex-direction: column;
    gap: 1em;
    align-items: center;
  }
  .member-card {
    min-width: 0;
    width: 98vw;
    max-width: 98vw;
    padding: 1em 0.5em;
  }
}
</style>

<div class="hero">
  <div class="hero-title">Bandmedlemmar</div>
  <div class="members-list">
    <div class="member-card">
      <div class="member-name">Mia</div>
      <div class="member-role">Sång</div>
    </div>
    <div class="member-card">
      <div class="member-name">Robin</div>
      <div class="member-role">Gitarr &amp; sång</div>
    </div>
    <div class="member-card">
      <div class="member-name">Andre</div>
      <div class="member-role">Gitarr &amp; sång</div>
    </div>
  </div>
</div>
