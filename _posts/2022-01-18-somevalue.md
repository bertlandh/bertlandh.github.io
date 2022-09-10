---
layout: post
title: VanderBot 1.9 supports somevalue
description: A new version of the VanderBot script now supports blank nodes (somevalue) in Wikidata
date: 2022-01-17 18:00:00
hero_image: /img/anonymous_artist_graph.png
image: /img/vanderbot_abraham.png
hero_height: is-large
hero_darken: true
---

One of the issues I discussed at my [recent talk](https://doi.org/10.6084/m9.figshare.17068088) in the [Art in Context: Identity, Ethics, and Insight symposium](https://artinformationcommons.github.io/blog/art-in-context-indentity-ethics-insight/) was the problem of representing anonymous artists in knowledge graphs. The [solution that the Wikidata community has accepted](https://www.wikidata.org/wiki/Wikidata:Requests_for_comment/Cleaning_up_the_ontology_of_anonymous) is to associate a P170 (creator) claim with a [`somevalue` snak](https://www.mediawiki.org/wiki/Wikibase/DataModel#PropertySomeValueSnak) having a P3831 (object has role) qualifier value of Q4233718 (anonymous). In RDF, this corresponds to a [blank node](https://www.w3.org/TR/rdf11-concepts/#dfn-blank-node) and Wikidata claims using `somevalue` are represented by blank nodes in the [Query Service](https://query.wikidata.org/). 

This solution was a bit annoying, because the [VanderBot](https://github.com/HeardLibrary/linked-data/blob/master/vanderbot/README.md) script that I use to create items in Wikidata from data in CSV files could not generate `somevalue` claims. Since anonymous artists are important for two Vanderbilt Libraries Wikidata projects that I'm working on ([WikiProject Vanderbilt Fine Arts Gallery](https://www.wikidata.org/wiki/Wikidata:WikiProject_Vanderbilt_Fine_Arts_Gallery) and [WikiProject Art in the Christian Tradition (ACT)](https://www.wikidata.org/wiki/Wikidata:WikiProject_Art_in_the_Christian_Tradition_(ACT))), I spent some time last week updating [the VanderBot Python script](https://github.com/HeardLibrary/linked-data/blob/master/vanderbot/vanderbot.py) to be able to create `somevalue` claims. I also modified its [companion script](https://github.com/HeardLibrary/linked-data/blob/master/vanderbot/acquire_wikidata.md) (used to download existing data) to record `somevalue` information in the same format used by VanderBot. 

Using the new script, last Friday I was able to create about 100 new artwork items for the ACT project, many of which had anonymous artists.

For details of how to use the new feature, see the [VanderBot user information page](https://github.com/HeardLibrary/linked-data/blob/master/vanderbot/README.md#somevalue-claims-blank-nodes).