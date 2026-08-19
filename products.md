---
title: Products
description: Practical software products from LearnTech Foundation for records management and organisational attendance.
subtitle: Software designed around operational problems that organisations need to understand, manage, and improve.
layout: page
redesign_page: true
eyebrow: LearnTech products
---

<section class="site-section">
  <div class="site-container">
    <div class="section-heading"><p class="section-heading__eyebrow">Flagship software</p><h2>Turn everyday operational complexity into clearer workflows</h2><p>LearnTech builds practical tools that connect people, information, and accountable action. Explore our two current flagship products.</p></div>
    <div class="product-grid">{% for product in site.data.products %}{% include product-card.html %}{% endfor %}</div>
  </div>
</section>

<section class="site-section site-section--warm"><div class="site-container"><div class="section-heading section-heading--center"><p class="section-heading__eyebrow">Our approach</p><h2>Software grounded in real work</h2><p>We focus on visible problems, understandable workflows, useful reporting, and technology that supports the people responsible for getting work done.</p></div></div></section>

{% include cta-band.html title="Have an operational problem that deserves a practical software response?" label="Talk with LearnTech" %}
