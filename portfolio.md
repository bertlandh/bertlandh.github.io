---
title: Selected work
description: Websites and application examples by Bertland Hope and LearnTech Foundation.
subtitle: Selected work by Bertland Hope and LearnTech Foundation, from public websites to operational applications.
layout: page
redesign_page: true
show_sidebar: false
eyebrow: Our work
---
<section class="site-section"><div class="site-container">
<div class="section-heading"><h2>Practical websites and applications</h2><p>Explore real website work, a mobile contact journey and application development. Read the Dancehall Archive and LearnTech case studies for the purpose, contribution and delivered features. Each example shows its current status.</p></div>
<div class="site-grid site-grid--3 portfolio-grid">{% for project in site.data.portfolio %}
<article class="site-card">{% if project.image %}<img src="{{ project.image | relative_url }}" alt="{{ project.name | escape }} interface example" loading="lazy" class="portfolio-card__image">{% endif %}
<p class="section-heading__eyebrow">{{ project.status | escape }}</p><h3>{{ project.name | escape }}</h3><p><strong>{{ project.capability | escape }}</strong></p><p>{{ project.description | escape }}</p>
{% if project.url %}<a class="site-card__link" href="{{ project.url | relative_url }}">{{ project.label | escape }}</a>{% endif %}</article>{% endfor %}</div>
<p class="portfolio-note">Selected work includes LearnTech’s own website, published features and application projects. Status labels show which examples are published, internal or in development.</p>
</div></section>
{% include cta-band.html eyebrow="Your business website" title="Make your next enquiry easier" text="Tell us what you sell, who you serve and what customers should do next." label="Discuss your website" url="/services/business-websites/" %}
