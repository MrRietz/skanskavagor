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
      <img src="{{ site.baseurl }}/public/img/mia.png" alt="Mia" style="width:120px;height:120px;border-radius:50%;object-fit:cover;margin-bottom:12px;" />
      <div class="member-name">Mia</div>
      <div class="member-role">Sång</div>
      <div class="member-desc" style="margin-top:0.8em;color:#555;text-align:center;line-height:1.35;">
        Musiken är inte bara något Mia gör – det är något hon är. Med sång, dans och rytm som livslånga följeslagare förmedlar hon känslor och närvaro på scenen. Hon tror på kraften i gemenskap, där varje medlem och publikens energi skapar ett flöde där musiken får tala.
      </div>
    </div>
    <div class="member-card">
      <img src="{{ site.baseurl }}/public/img/robin.png" alt="Robin" style="width:120px;height:120px;border-radius:50%;object-fit:cover;margin-bottom:12 px;" />
      <div class="member-name">Robin</div>
      <div class="member-role">Gitarr &amp; sång</div>
      <div class="member-desc" style="margin-top:0.8em;color:#555;text-align:center;line-height:1.35;">
        Robin är en energisk gitarrist som spelar med hjärtat först. Han är spontan och kreativ,  ofta med oväntade infall som ger musiken liv. Sången är intensiv och uttrycksfull – ibland vild, ibland sårbar.
      </div>
    </div>
    <div class="member-card">
      <img src="{{ site.baseurl }}/public/img/andre.png" alt="André" style="width:120px;height:120px;border-radius:50%;object-fit:cover;margin-bottom:12px;" />
      <div class="member-name">André</div>
      <div class="member-role">Gitarr &amp; sång</div>
      <div class="member-desc" style="margin-top:0.8em;color:#555;text-align:center;line-height:1.35;">
        Andre är en trygg och eftertänksam gitarrist som utgör ett lugn i bandet. Han har ett säkert grepp om tempo och rytm, spelar med känsla snarare än ego, och bidrar ibland med sång. En stabil närvaro som håller ihop helheten.
      </div>
    </div>
  </div>
</div>
