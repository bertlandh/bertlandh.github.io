---
title: Services
description: Supporting technology services from LearnTech Foundation, including reviews, training, consultancy, workshops, and interim leadership.
subtitle: Focused expertise to help organisations understand needs, make technology decisions, implement change, and strengthen operations.
layout: page
redesign_page: true
eyebrow: Services
hero_image: /img/445-1200x800.jpg
hero_alt: Technology professional working with digital systems
image: /img/favicon.png
---

<section class="site-section">
  <div class="site-container">
    <div class="section-heading">
      <p class="section-heading__eyebrow">Supporting capabilities</p>
      <h2>Expertise shaped around the problem in front of you</h2>
      <p>LearnTech’s services bring software, systems, teaching, and operational experience to the work around technology implementation.</p>
    </div>
    <div class="site-grid site-grid--3">
      {% for service in site.data.services %}
        {% include service-card.html service=service %}
      {% endfor %}
    </div>
  </div>
</section>

{% include cta-band.html title="Not sure which service fits?" text="Describe the situation and start with a direct conversation." %}
