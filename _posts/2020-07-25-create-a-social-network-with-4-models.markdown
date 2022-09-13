---
layout: post
title: Create a social network with 4 models
description: The Eloquent relationships needed to create a social network in 4 models
date: 2020-07-25 16:00:07
hero_image: /img/social-network-4-models.jpg
hero_height: is-large
hero_darken: true
image: /img/social-network-4-models.jpg
tags: laravel eloquent database php
---

When you think about defining the database for a social network you will probably think it's going to involve hundreds of tables and complex relationships. This doesn't have to be the case. This article explains how you can create a social network with just 4 models.

The 4 models we are going to use are User, Post, Follower and Like.

## Post

The post model will contain the content the user wants to share or post on the social network. What type of content you want to store will affect what fields you need, but for this example we just want to store some text. 

The post needs to belong to a user, so we will store the user id in the post as well. 

A post can have many replies or comments so you may think we need another model to store comments, but if your social network was like twitter, then a comment or reply is also a tweet in its own right so you could then get away with having 4 models. We could store a reply as a post, but also store a parent id to define the relationship to the original post. This also means that by using the same logic, a reply can also have a reply. 

### Post relationships

* A post belongs to a user.
* A post has many comments/replies.
* A post can belong to another post 

## Follower

A user can follow other users. This will determine what content is displayed in their feed. If you follow another user, you then become one of their followers. 

We can create a Follower model which can be used to store both the follower and following relationship at the same time. This can be done with a many to many relationship that goes from the User model to the Followers model and back to the User model. The follower table will store a user_id and a follower_id, but both will point to the users table. 

### Follower relationships

* A user has many followers
* A user follows many users

## Like

A user creates a post and you see it in your feed and you want to say you like the post to give some positive feedback to the user. Likes are similar to followers in that they have an inverse of the relationship too. A post has likes from users, but a user also has posts they like. 

We can create a Likes model which can be used to store the post_id and the user_id. This will be the pivot table between the User and Post models in the many to many relationship. If you want to store different types of likes, such as thumbs up or a heart, then this can be stored on the pivot as well. 

### Like relationships

* A user likes many posts
* A post is liked by many users

## User

We have touched on the user relationships already as all the other relationships involve the user in some way. 

### User relationships

* A user has many posts
* A user has many followers
* A user follows many users
* A user likes many posts

## Summary

Sometimes it pays to keep your database as simple as possible by using effective relationships. By spending a little time organising your thoughts 