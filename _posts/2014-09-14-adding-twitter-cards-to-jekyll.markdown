---
layout: post
title:  "Adding Twitter cards to Jekyll"
date:   2014-09-24 13:09:01
categories: twitter jekyll seo social-media
description: "A little tutorial for how I added Twitter cards to my Jekyll site"
---

Twitter cards are a great way of making links to your site stand out to other twitter users. They can be used to provide additional information and an image about your page, from within twitter when you expand a tweet. Examples include twitter summary cards that provide a title, description and image, or product cards that can provide information such as price or product category.

![Example Twitter Card](/img/twitter-card-example.png "Example Twitter Card")

## Twitter Meta Tags

In order to get [twitter cards](https://dev.twitter.com/cards/overview) to work, you first need to add twitter meta tags to your pages. In the default Jekyll project the meta tags are held in the head.html file within the includes folder. 

There are different types of tags required for different types of twitter cards. For this example I am going to use the default "Summary" card. 

For a summary card to work you need the following tags as a minimum:

- Card - The card type
- Site - This is your twitter name / handle
- Title - The page title
- Description - The description of the page

You can also add an image. 

Below is the example HTML meta tags.

```
<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="@twitterhandle" />
<meta name="twitter:title" content="Page title goes here" />
<meta name="twitter:description" content="Page description goes in here" />
<meta name="twitter:image" content="Image URL" />
```

## Adding custom template tags

So now you need to add content into the meta tags for each page. To do this I created custom page variables in the front matter of each page and then added the variables to the head.html file. More information about Jekyll page variables can be found in the [documentation](http://jekyllrb.com/docs/variables/). 

### Example Front Matter with custom variables

```
---
title:  "Example page title here"
description: "You can use this as the standard description meta tag and twitter description if required"
twitter-description: "This is a specific twitter card description (optional)"
---
```

I used my standard page title as the content for the twitter:title tag, but I thought I had better put a back up value in there of the site.title in case I forgot to set the title for every page.

  {% raw %}{% if page.title %}{{ page.title }}{% else %}{{ site.title }}{% endif %}{% endraw %}
  
The above basically says if there is a page title variable then use that, else (if not) then use the site title variable.

I then created a custom variable for the description. Previously, I have added description for the normal description meta tag (so that each page has a unique description and not using the site description) and then used this variable again within the twitter:description tag. If you want to have a different description for twitter then you can create a new custom variable, for example twitter-description. 

### Adding Page Description to Description Meta Tag

```
<meta name="description" content="{% raw %}{% if page.description %}{{ page.description }}{% else %}{{ site.description }}{% endif %}{% endraw %}">
```

You can then do the same for the image if you require, or you can hard code a single URL for each page (as in the below example) if you don't have a different image for each page.

### Twitter Meta Tags with variables added

```
<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="@chrisrhymes" />
<meta name="twitter:title" content="{% raw %}{% if page.title %}{{ page.title }}{% else %}{{ site.title }}{% endif %}{% endraw %}" />
<meta name="twitter:description" content="{% raw %}{% if page.description %}{{ page.description }}{% else %}{{ site.description }}{% endif %}{% endraw %}" />
<meta name="twitter:image" content="http://chrisrhymes.github.io/img/csrhymeslogo.png" />
```

## Validating Your Cards

Once you have added your twitter card meta tags to your site you then need to go to the twitter devs site and [validate your cards](https://cards-dev.twitter.com/validator). This simply involves copying and pasting your sites URL into the form. It will tell you of any errors it finds for you to fix before it can be validated. 

It is normally very quick to get your page validated, but there is also the option to validate your whole site by adding it to the whitelist. The only issue I found with doing this is that you get an email from Twitter for _EVERY_ page in your site telling you the twitter card is ready. This is fine if you have a few pages, but if you have hundreds of pages then you will get hundreds of emails. This seems like a bit of an oversight by twitter. 

## Measuring Clicks

All sorted? Well, there is one more thing you should know about. Twitter offer an [Analytics](https://analytics.twitter.com) service that provides some great information, showing you how your tweets convert to impressions and from impressions to clicks. More information is available on the [Twitter devs site](https://dev.twitter.com/cards/analytics).

