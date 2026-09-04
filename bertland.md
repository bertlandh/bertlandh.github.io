---
title: Bertland Hope | Digital contact card
description: Connect with Bertland Hope of LearnTech Foundation, save his contact details, explore LearnTech products, or arrange a conversation.
layout: digital-card
permalink: /bertland/
image: /img/favicon.png
---

{% assign card = site.data.contact_card %}
<div class="digital-card-wrap">
  <a class="digital-card-brand" href="{{ '/' | relative_url }}" aria-label="Visit the LearnTech Foundation home page">
    <span>LearnTech Foundation</span>
    <small>Practical software. Useful technology.</small>
  </a>

  <article class="digital-card" aria-labelledby="digital-card-name">
    <div class="digital-card__portrait-wrap">
      <img class="digital-card__portrait" src="{{ card.portrait | relative_url }}" alt="Portrait of {{ card.name }}">
    </div>
    <header class="digital-card__intro">
      <p class="digital-card__eyebrow">Let’s connect</p>
      <h1 id="digital-card-name">{{ card.name }}</h1>
      <p class="digital-card__role">{{ card.role }}</p>
      <p class="digital-card__organisation">{{ card.organisation }}</p>
      <p class="digital-card__summary">{{ card.summary }}</p>
    </header>

    <nav class="digital-card__social" aria-label="Bertland’s social profiles">
      {% for item in card.social %}
        <a href="{{ item.url }}" target="_blank" rel="noopener noreferrer" aria-label="{{ item.name }}">
          <i class="{{ item.icon }}" aria-hidden="true"></i>
        </a>
      {% endfor %}
    </nav>

    <div class="digital-card__actions">
      {% if card.booking_url != empty %}
        <a class="digital-card-button digital-card-button--primary" href="{{ card.booking_url }}" target="_blank" rel="noopener noreferrer">
          <i class="far fa-calendar-alt" aria-hidden="true"></i><span>Book a conversation</span>
        </a>
      {% else %}
        <a class="digital-card-button digital-card-button--primary" href="mailto:{{ card.email }}?subject=Conversation%20with%20Bertland">
          <i class="far fa-calendar-alt" aria-hidden="true"></i><span>Request a time to chat</span>
        </a>
      {% endif %}
      <a class="digital-card-button" href="https://wa.me/{{ card.whatsapp_uri }}" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-whatsapp" aria-hidden="true"></i><span>Message on WhatsApp</span>
      </a>
      <a class="digital-card-button" href="{{ '/products/' | relative_url }}">
        <i class="fas fa-cubes" aria-hidden="true"></i><span>Explore LearnTech products</span>
      </a>
      <a class="digital-card-button" href="{{ '/services/' | relative_url }}">
        <i class="fas fa-laptop-code" aria-hidden="true"></i><span>View technology services</span>
      </a>
      <a class="digital-card-button" href="mailto:{{ card.email }}">
        <i class="far fa-envelope" aria-hidden="true"></i><span>{{ card.email }}</span>
      </a>
      <a class="digital-card-button digital-card-button--save" href="{{ card.vcard | relative_url }}" download>
        <i class="far fa-address-card" aria-hidden="true"></i><span>Save contact</span>
      </a>
    </div>
  </article>

  <p class="digital-card-note">Built in Jamaica · <a href="{{ '/' | relative_url }}">learntechfoundation.org</a></p>
</div>

