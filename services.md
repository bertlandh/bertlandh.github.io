---
title: Services
description: Computer Support And Services in Kingston. Calls in JM office hours only please.
subtitle: Practical technology support, training, and leadership for organisations in Jamaica and online.
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
      <p class="section-heading__eyebrow">Ways to work together</p>
      <h2>Support shaped around the problem in front of you</h2>
      <p>Bertland Hope’s professional services bring systems experience, clear communication, and practical execution to five areas of IT support.</p>
    </div>
    <div class="site-grid site-grid--3">
      {% for service in site.data.services %}
        {% include service-card.html service=service %}
      {% endfor %}
    </div>
  </div>
</section>

{% include cta-band.html title="Not sure which service fits?" text="Describe the situation and start with a direct conversation." %}
