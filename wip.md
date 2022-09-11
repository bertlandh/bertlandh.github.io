---
title: Work In Progress
subtitle: Requests from customers plus
layout: page
show_sidebar: false
toc: true
toc_title: Projects
---

<img src="/img/wikidata-logo.png" alt="Wikidata logo" width="200"><br/>

# Wikidata

I've been an active contributor to Wikidata since 2019 through editing, but also by developiing tools and educational resources to help others use Wikidata more effectively.

-----

## VanderBot

VanderBot is a Python application designed to allow humans to edit Wikidata more effectively using CSV spreadsheets as a data sources. Unlike other tools that use CSVs in the Wikidata upload process, VanderBot maintians a complete record of the state of the data at the time the data are uploaded, making it possible to detect changes over time using federated queries with the Wikidata Query Service.

<img src="/img/csv_to_graph.png" alt="CSV to graph conversion" width="500"><br/>

For more information about this approach to managing data in Wikidata, see [Baskauf and Baskauf, 2021](https://doi.org/10.3233/SW-210443). For more information about the VanderBot script, including tutorials, visit the [VanderBot landing page](http://vanderbi.lt/vanderbot). 

-----

## Learn Wikidata

In 2020, a team of librarians from Vanderbilt received a [WikiCite grant funded by the Alfred P. Sloan Foundation](https://meta.wikimedia.org/wiki/Wikicite/grant/WikiCite_for_Librarians:_Interactive_Learning_Pathways_for_Information_Professionals) to produce a series of interactive learning modules for Wikidata beginners. These self-paced lessons are geared towards information professionals, but usable by anyone.

<img src="/img/learn_wikidata.png" alt="Learn Wikidata splash screen" width="400">

I contributed to the project through scriptwriting, Twine programming, and workflow management. To try out the lessons, visit <https://learnwikidata.net/> .

## WikiProjects: VandyCite, Fine Arts Gallery, Art in the Christian Tradition

I play a significant role in three ongoing WikiProjects operating out of the Vanderbilt Libraries. The overall goal of all three projects is to increase discoverability of Vanderbilt resources through rich, searchable linked metadata in Wikidata.

------

**[WikiProject VandyCite](https://www.wikidata.org/wiki/Wikidata:WikiProject_VandyCite)** 

<img src="/img/vandycite_workflow.png" alt="researcher input workflow" width="400">

Starting in late 2019, I began developing the VanderBot script for the purpose of creating or enhancing Wikidata items about Vanderbilt University researchers and scholars. By July 2020, I had created or curated records for over 4500 researchers, which included all faculty and most postdocs and research staff at the university. (The faculty data phase of the project is described more fully [here](https://github.com/HeardLibrary/linked-data/blob/master/vanderbot/researcher-project.md). This led to a broader effort, [WikiProject VandyCite](https://www.wikidata.org/wiki/Wikidata:WikiProject_VandyCite), to upload and link publications to these researchers. 

Working with my colleague Charlotte Lew, we have completed creation of all publications with DOIs authored by Divinity School faculty. We will continue to expand this effort to other types of publications and other parts of the university.

------

**[WikiProject Vanderbilt Fine Arts Gallery](https://www.wikidata.org/wiki/Wikidata:WikiProject_Vanderbilt_Fine_Arts_Gallery)**

<img src="/img/Demon_Playing_a_Samisen,_With_Wine_Bottle_and_Drinking_Cup_in_Foreground_-_Vanderbilt_Fine_Arts_Gallery_-_1992.253.tif.jpg" alt="Demon Playing a Samisen" width="250"><br/>
<small><a href="https://www.wikidata.org/wiki/Q105096111">Q105096111</a> Demon Playing a Samisen, With Wine Bottle and Drinking Cup in Foreground. 1992.253</small>

Working with [Kali Mason](https://www.linkedin.com/in/kalimason1/), former registrar and collections manager of the [Vanderbilt University Fine Arts Gallery](https://www.library.vanderbilt.edu/gallery/), I used data from the [Gallery's ArtStor database](https://library.artstor.org/#/collection/100140247) to create Wikidata items for all 6888 works in the collection. 

In December 2020, I started uploading [Public Domain images from the Gallery into Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Vanderbilt_University_Fine_Arts_Gallery). These images are linked to and from their corresponding items in Wikidata. 

------

**[WikiProject Art in the Christian Tradition (ACT)](https://www.wikidata.org/wiki/Wikidata:WikiProject_Art_in_the_Christian_Tradition_(ACT))**

<img src="/img/640px-Wilhelm_Morgner_001.jpg" alt="Entry into Jerusalem" width="350"><br/>
<small>Wilhelm Morgner. 1912. Entry of Jesus into Jerusalem. ACT ID 54247</small> 

The [Art in the Christian Tradition (ACT) database](https://diglib.library.vanderbilt.edu/act-search.pl) provides images for the popular [Revised Common Lectionary website](https://lectionary.library.vanderbilt.edu//) run by the [Vanderbilt Divininty Library](https://www.library.vanderbilt.edu/divinity/). My colleagues Charlotte Lew, Anne Richardson, and I created the property "Art in the Christian Tradition ID" (P9092), which we are using to link Wikidata items for artworks to their corresponding records in the ACT database. We have linked existing items and are working on creating new items for works that are in Commons, but which are not yet in Wikidata. Eventually we plan to upload additional freely-available images to Wikimedia Commons and link them to ACT through Wikidata.

# RDF

I have been working for over ten years towards making it possible to share biodiversity data using RDF as part of the [Biodiversity Information Standards (TDWG)](https://www.tdwg.org/) organization. Starting in 2021, I served as the co-convener of the [RDF/OWL Task Group](https://github.com/tdwg/rdf), which was tasked with determining best practices for using RDF in the context of biodiversity.

------

## Darwin Core RDF Guide

<img src="/img/dwc_rdf_guide.png" alt="Darwin Core RDF guide header" width="350">

The most prominent outcome of the RDF task group was creation in 2015 of the [Darwin Core RDF guide](http://rs.tdwg.org/dwc/terms/guides/rdf/). This part of the TDWG Darwin Core Standard describes how to use the general Darwin Core terms in the context of RDF, and created a new category of terms (in the `dwciri:` namespace) specifically designed to be used with IRI objects. 

For more information, see our paper at <http://dx.doi.org/10.3233/SW-150199> (open access at <http://bit.ly/2e7i3Sj>).

------

## Darwin-SW

<img src="/img/dsw.png" alt="Darwin Core RDF guide header" width="350">

Cam Web and I developed the Darwin-SW (DSW) ontology in parallel with the Darwin Core RDF Guide. Although it was not an official TDWG effort, DSW was designed to be used together with the Darwin Core RDF guide, and to serve as an underlying graph model for the biodiversity informatics domain. Its object properties have been used in several projects and it has served as a reference point for modelling discussions in the community.

For more information, see our paper at <http://dx.doi.org/10.3233/SW-150203> (open access at <http://bit.ly/2dG85b5>).

# JSON-LD

I'm interested in figuring out how [JSON-LD](https://json-ld.org/) can be used to bridge the gap between developers and the Linked Data world in the context of biodiversity informatics. For some of my thoughts on the subject, see [this presentation](https://doi.org/10.3897/biss.5.74266). 

------

## SKOS controlled vocabularies serialized as JSON-LD

<img src="/img/skos_translations.png" alt="JSON-LD representation of SKOS" width="350">

Because of its built-in capabilities for denoting preferred labels in multiple languages, the [Simple Knowledge Organization System (SKOS)](https://www.w3.org/TR/skos-primer/) is an ideal way to express translations of controlled vocabularies. When serialized as JSON-LD, machine-readable metadata can either be consumed by conventional applications as JSON, or loaded directly into a triplestore as RDF. I have made multilingual labels and definitions available for six TDWG controlled vocabularies as standardized, machine-readable [JSON-LD files](https://tdwg.github.io/rs.tdwg.org/) by [scripting their conversion from CSV tables](https://github.com/tdwg/rs.tdwg.org/blob/gh-pages/cvJson/build_json_ld_for_controlled_vocabularies.ipynb). 

------

## Regions of Interest within media items

<img src="/img/roi.png" alt="JSON-LD representation of SKOS" width="400" style="border:1px solid black">

In 2021, the Audubon Core multimedia metadata standard [adopted terms for describing regions of interest (ROIs) within media items](https://github.com/tdwg/ac/milestone/4?closed=1). This introduced an additional layer of complexity to the representation of media metadata using the Audubon Core vocabulary and I used [JSON-LD to express the links](https://github.com/tdwg/ac/blob/master/roi-recipes.md) between the media items, their service access points, and ROIs with the items.