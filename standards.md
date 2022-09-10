---
title: TDWG standards
subtitle: Biodiversity Information Standards development
layout: page
show_sidebar: false
---

Since 2010 I've been an active participant in [Biodiversity Information Standards (TDWG)](https://www.tdwg.org/), the international organization that develops standards to enable more effective sharing of knowledge about biodiversity. I've had leadership roles in several initiatives within the organization. 

------

# Audubon Core

<img src="/img/ac_bird.jpg" alt="Audubon Core parrot" width="400"><br/>
<small>Image by <a href="https://unsplash.com/photos/gGC63oug3iY">Mikhail Vasilyev</a></small>

[Audubon Core](https://www.tdwg.org/standards/ac/) is the TDWG standard for describing biodiversity-related multimedia. During ratification of the standard in 2013, I served as the review manager. I was responsible for recruiting expert reviewers, running the public review, and working with the authors to revise the standard in light of the reviews. From 2018 to 2021, I was the inagural convener of the Audubon Core Maintenance Group. In that role, I recruited members for the group, carried out a cleanup of the documentation, led the development of the [first three controlled vocabularies](https://www.tdwg.org/standards/ac/#parts%20of%20the%20standard) used with the core vocabulary, and led the effort to create terms for describing [regions of interest](https://github.com/tdwg/ac/blob/master/roi-recipes.md) within a media item. From 2019 to the present, I've been the convener of a [task group charged with developing controlled vocabularies to describe the subject part and orientation of images](https://github.com/tdwg/ac/tree/master/views).

------

# Darwin Core

<img src="/img/occurrence_map.png" alt="organism occurrence map" width="400"><br/>
<small>Map of organism occurrences recorded by <a href="https://www.gbif.org/">GBIF</a> 31 Dec 2021</small>

[Darwin Core](https://www.tdwg.org/standards/dwc/) is the flagship TDWG vocubulary for describing the distribution of organisms around the earth and is used to describe [over a billion occurrences](https://www.gbif.org/). My first major contribution to Darwin Core was as the lead author of the [Darwin Core RDF Guide](http://rs.tdwg.org/dwc/terms/guides/rdf/) in 2015. I've been a part of the Darwin Core Maintenance Group since its organization in 2017. In that role, I've developed a lot of the organizational and technical infrastructure used to manage the standard. In particular, I was the lead author of the [TDWG Vocabulary Maintenance Specification](http://rs.tdwg.org/vms/doc/specification/), which describes how all TDWG vocabularies should be managed.

------

# Technical Architecture

In 2017, I was the lead author of the [TDWG Standards Documentation Specification (SDS)](http://rs.tdwg.org/sds/doc/specification/), which describes how human- and machine-readable standards documents should be structured in TDWG standards. Following its adoption, I lead the ongoing effort to develop the technical infrastructure necessary to implement the specification. I created a system where standards metadata are archived as CSV files in a [GitHub repository](https://github.com/tdwg/rs.tdwg.org). Those data are loaded into a server application that I designed that can serve dynamically generated machine-readable RDF representations when requested through content negotiation, or redirect to human-readable "list of terms" documents that are also generated from the same CSV tables. I wrote the Python scripts to generate those list of terms documents as well as other scripts used in the pipeline for processing changes to vocabularies. 

In 2021, I was elected to the TDWG Executive Committee, serving as the chair of the Technical Architecture Group (TAG). 