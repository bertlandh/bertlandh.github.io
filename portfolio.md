---
title: Selected work
description: Websites and application examples by Bertland Hope and LearnTech Foundation.
subtitle: See the interfaces, information and workflows we can help you bring together.
layout: page
redesign_page: true
show_sidebar: false
eyebrow: Our work
---
<section class="site-section"><div class="site-container">
<div class="section-heading"><h2>Websites first. Technical depth behind them.</h2><p>Looking for a clearer business website? Start with the published website examples below. The application examples show wider development capability, with their current status stated on each card.</p></div>
<div class="site-grid site-grid--3 portfolio-grid">{% for project in site.data.portfolio %}
<article class="site-card">{% if project.image %}<img src="{{ project.image | relative_url }}" alt="{{ project.name | escape }} interface example" loading="lazy" class="portfolio-card__image">{% endif %}
<p class="section-heading__eyebrow">{{ project.status | escape }}</p><h3>{{ project.name | escape }}</h3><p><strong>{{ project.capability | escape }}</strong></p><p>{{ project.description | escape }}</p>
{% if project.url %}<a class="site-card__link" href="{{ project.url | relative_url }}">{{ project.label | escape }}</a>{% endif %}</article>{% endfor %}</div>
<p class="portfolio-note">These are LearnTech's own website, features and software examples. They are not presented as a list of commissioned client websites, and development examples are not promises of production availability.</p>
</div></section>
{% include cta-band.html eyebrow="Your business website" title="Make your next enquiry easier" text="Tell us what you sell, who you serve and what customers should do next." label="Discuss your website" url="/services/business-websites/" %}
