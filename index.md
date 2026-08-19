---
title: LearnTech Foundation
description: LearnTech Foundation builds practical software for records, attendance, and real organisational work.
subtitle: We build practical software and provide technology expertise to help organisations make important work clearer, more visible, and easier to manage.
layout: default
homepage: true
show_sidebar: false
hero_eyebrow: Software built around real operational problems
hero_title: Practical software for <strong>work that matters</strong>
hero_portrait: /favicon.png
hero_portrait_alt: LearnTech Foundation
image: /favicon.png
hero_link: /products/
hero_link_text: Explore our products
hero_secondary_link: /connect/
hero_secondary_text: Discuss a project
hero_note: Built in Jamaica · Software products, technology services, and useful knowledge
---

<section class="site-section site-section--warm" id="products"><div class="site-container"><div class="section-heading section-heading--center"><p class="section-heading__eyebrow">Flagship products</p><h2>Software that connects information with accountable action</h2><p>Discover two working products designed around the daily realities of records management and organisational attendance.</p></div><div class="product-grid">{% for product in site.data.products %}{% include product-card.html %}{% endfor %}</div><div class="section-action"><a class="site-button site-button--outline" href="{{ '/products/' | relative_url }}">View all products</a></div></div></section>

<section class="site-section"><div class="site-container"><div class="section-heading"><p class="section-heading__eyebrow">Problems we help solve</p><h2>Bring structure to complex operational work</h2></div><div class="site-grid site-grid--3">
<article class="site-card"><span class="site-card__icon"><i class="fas fa-folder-open" aria-hidden="true"></i></span><h3>Records lose visibility</h3><p>Connect registration, physical location, custody, digitised files, requests, and record history.</p></article>
<article class="site-card"><span class="site-card__icon"><i class="fas fa-clock" aria-hidden="true"></i></span><h3>Attendance lacks context</h3><p>Bring time, place, punctuality, itineraries, leave, and reporting into a clearer operational view.</p></article>
<article class="site-card"><span class="site-card__icon"><i class="fas fa-project-diagram" aria-hidden="true"></i></span><h3>Technology decisions stall</h3><p>Use practical discovery, review, facilitation, and leadership to turn needs into workable next steps.</p></article>
</div></div></section>

<section class="site-section site-section--accent"><div class="site-container"><div class="section-heading section-heading--center"><p class="section-heading__eyebrow">Why LearnTech</p><h2>Technical depth, practical execution, clear communication</h2></div><div class="site-grid site-grid--3">
<article class="site-card"><h3>Built around real work</h3><p>Products begin with operational workflows, the people responsible for them, and the information they need.</p></article>
<article class="site-card"><h3>Designed for understanding</h3><p>Useful interfaces, structured information, reporting, and explanations make technology easier to act on.</p></article>
<article class="site-card"><h3>Supported by experience</h3><p>Software development is reinforced by years of systems, networks, instruction, project, and operations work.</p></article>
</div></div></section>

<section class="site-section"><div class="site-container"><div class="section-heading"><p class="section-heading__eyebrow">Supporting services</p><h2>Expertise around the software and systems</h2><p>Focused professional services help organisations review their current position, build skills, choose technology, shape implementation, and steady operations.</p></div><div class="site-grid site-grid--3">{% for service in site.data.home_services limit: 5 %}<article class="site-card"><span class="site-card__icon"><i class="fas {{ service.icon }}" aria-hidden="true"></i></span><h3>{{ service.title }}</h3><p>{{ service.description }}</p><a class="site-card__link" href="{{ service.link | relative_url }}">Explore service <span aria-hidden="true">→</span></a></article>{% endfor %}</div><div class="section-action"><a class="site-button site-button--outline" href="{{ '/services/' | relative_url }}">View all services</a></div></div></section>

<section class="credibility-strip" aria-label="Experience and resources"><div class="site-container credibility-strip__grid"><p class="credibility-strip__intro">Software development supported by practical technology experience.</p><div class="credibility-strip__stat"><strong>2</strong><span>flagship software products</span></div><div class="credibility-strip__stat"><strong>15+</strong><span>years of IT experience</span></div><div class="credibility-strip__stat"><strong>{{ site.posts | size }}</strong><span>articles and guides</span></div></div></section>

{% assign latest_post = site.posts | first %}{% if latest_post %}<section class="site-section"><div class="site-container"><div class="section-heading"><p class="section-heading__eyebrow">Latest News and Insights</p><h2>Ideas, guides, and work worth sharing</h2></div><article class="latest-story">{% if latest_post.image %}<img class="latest-story__image" src="{{ latest_post.image | replace: 'http:', 'https:' }}" alt="">{% endif %}<div class="latest-story__content"><p class="latest-story__meta">Published {{ latest_post.date | date: "%B %-d, %Y" }}</p><h3><a href="{{ latest_post.url | relative_url }}">{{ latest_post.title }}</a></h3><p>{{ latest_post.excerpt | strip_html | truncatewords: 38 }}</p><a href="{{ latest_post.url | relative_url }}" class="site-button site-button--outline">Read the article</a></div></article><div class="article-grid article-grid--compact">{% for post in site.posts offset: 1 limit: 2 %}{% include post-card.html %}{% endfor %}</div><div class="section-action"><a class="site-button site-button--outline" href="{{ '/news/' | relative_url }}">More News</a></div></div></section>{% endif %}

<section class="site-section site-section--warm"><div class="site-container"><div class="section-heading"><p class="section-heading__eyebrow">Resources and books</p><h2>Keep learning and exploring</h2><p>Find technical guides, learning material, specialist notes, and books that preserve the site’s wider history and interests.</p></div><div class="site-grid site-grid--3"><article class="site-card"><h3>Technical guides</h3><p>Practical material covering software, operating systems, deployment, security, and support.</p></article><article class="site-card"><h3>Learning material</h3><p>Explanations and specialist resources for students, practitioners, and curious readers.</p></article><article class="site-card"><h3>Books</h3><p>Explore published work connected to Jamaican food, dancehall culture, and identity.</p></article></div><div class="section-action"><a class="site-button site-button--outline" href="{{ '/resources/' | relative_url }}">Explore resources</a></div></div></section>

{% include cta-band.html eyebrow="Start a conversation" title="Have a software or technology problem worth solving?" text="Tell LearnTech what is getting in the way and let’s identify a practical next step." label="Contact LearnTech" %}
