---
title: Using GitHub Dependabot with a Monorepo
description: How to configure and use GitHub Dependabot for a mono repo
layout: post
date: 2022-03-03 18:00:07
hero_image: /img/github-dependabot-monorepo.jpg
hero_height: is-large
hero_darken: true
image: /img/github-dependabot-monorepo.jpg
tags: GitHub PHP JavaScript
---

GitHub offers a dependabot service that can let you know of any potential security issues with your dependencies and automatically create a Pull Request for you. This works great without any configuration if you have a repo that contains npm, composer or gem dependencies, but you may need additional configuration if your lock files aren't in the root directory, or in separate directories in the case of a monorepo. 

This article will guide you through the basics of creating your configuration for dependabot so it can correctly analyse your dependencies and automatically create Pull Requests for you.

## dependabot.yml file

To create a custom configuration for dependabot, we need to create a dependabot.yml file in the .github directory. The .github directory needs to be in the root of your project. 

`touch .github/dependabot.yml`

Let's start by writing a configuration for a basic project that uses both composer and npm for it's dependencies, where the lock files are both in the root directory. This would be used for a Laravel project. 

```yaml
version: 2

updates:
  - package-ecosystem: "composer"
    directory: "/"
    schedule:
      interval: "weekly"
    target-branch: "develop"
    labels:
      - "php dependencies"
      - "backend"

  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    target-branch: "develop"
    labels:
      - "npm dependencies"
      - "frontend"
```

We start by defining the version, which the current version is 2. Then we specify the different package ecosystems we are using. 

### Composer 

* We start by defining the package-ecosystem as "composer"
* The composer.lock file is in the root directory, so we set the directory to be "/". 
* We then define the schedule. This will tell dependabot how often to check for dependency updates. Here we have defined weekly, but you might want to check more often, such as daily. 
* The target-branch will define where the pull request will target. Here we have specified our develop branch which will allow us to do some testing on the change before we merge it into our main branch
* Finally we define some labels. These will appear against the pull request in GitHub and can help you see what the pull requests are for at a glance. 

#### A note about labels 

Make sure that the labels have been created in GitHub before you commit and push up your new dependabot.yml file otherwise they won't show in the list of Pull Requests. Another thing to look out for is that they are case sensitive, so if you have a label for "Frontend" and you define "frontend" in your config file, it won't be displayed.

### NPM

The npm configuration is almost identical to the composer configuration, except we define the package-ecosystem as "npm" and the labels have been updated too. 

## Using Subdirectories

If your repo structure is a bit more complicated then you may need to adjust the configuration to cater for this. In this next example we have a monorepo with a frontend directory and a backend directory, where the backend is PHP, such as Laravel, and the frontend is JavaScript based, such as Next.js.

 This means the lock files are no longer in the root directory, they are also now in separate directories. 

We only need to make a small modification to the existing configuration to handle this example. We can update the directory setting in each to define the location of each lock file. 

```yaml
version: 2

updates:
  - package-ecosystem: "composer"
    # Update the directory
    directory: "/backend"
    schedule:
      interval: "weekly"
    target-branch: "develop"
    labels:
      - "php dependencies"
      - "backend"

  - package-ecosystem: "npm"
    # Update the directory
    directory: "/frontend"
    schedule:
      interval: "weekly"
    target-branch: "develop"
    labels:
      - "npm dependencies"
      - "frontend"
```

Our `backend` directory contains our Laravel app so this is where the composer.lock file is now located. 

Our `frontend` directory contains our Next.js app so this is where the package-lock.json file is now located.

Dependabot can now use this configuration to correctly identify the locations of the lock files.

## Sub Branches

Imagine we have a large team working on our project. We could have a specialist PHP team and a specialist JavaScript team. We don't want our PHP team to worry about the JavaScript dependencies and we don't want our JavaScript developers to worry about the PHP dependencies. 

We can modify our configuration to update the target branch, so rather than all Pull Requests going to the `develop` branch, we can specify individual branches. 

```yaml
version: 2

updates:
  - package-ecosystem: "composer"
    directory: "/backend"
    schedule:
      interval: "weekly"
    # Update the target branch
    target-branch: "develop_backend"
    labels:
      - "php dependencies"
      - "backend"

  - package-ecosystem: "npm"
    directory: "/frontend"
    schedule:
      interval: "weekly"
    # Update the target branch
    target-branch: "develop_frontend"
    labels:
      - "npm dependencies"
      - "frontend"
```

Now our PHP dependency Pull Requests will target the `develop_backend` branch and the JavaScript dependency Pull Requests will target the `develop_frontend` branch.

## Reviewers 

We can also go one step further and specify the reviewers for the pull requests too. This is really helpful if there is a specific user or team that takes care of this job.

The below example specifies individual users, such as "php-dev-1", and a team too, such as "my-org/php-team".

```yaml
version: 2

updates:
  - package-ecosystem: "composer"
    directory: "/backend"
    schedule:
      interval: "weekly"
    target-branch: "develop_backend"
    labels:
      - "php dependencies"
      - "backend"
    # Add reviewers
    reviewers:
      - "php-dev-1"
      - "php-dev-2"
      - "my-org/php-team"

  - package-ecosystem: "npm"
    directory: "/frontend"
    schedule:
      interval: "weekly"
    target-branch: "develop_frontend"
    labels:
      - "npm dependencies"
      - "frontend"
    # Add reviewers
    reviewers:
      - "js-dev-1"
      - "js-dev-2"
      - "my-org/js-team"
```

## Commit and push

Now all you need to do is commit your new dependabot.yml file and push it up to your main branch and GitHub should detect it and start processing your dependencies straight away. 

## More information

Hopefully this will give you a good starting point with getting started using dependabot for your monorepo in GitHub, but for the full list of options check out the [GitHub Dependabot configuration documentation](https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/configuration-options-for-dependency-updates).

<a href="https://stocksnap.io/photo/architecture-building-0GZ83DHBCE">Photo</a> by <a href="https://stocksnap.io/author/51823">Sawyer Bengtson</a> on <a href="https://stocksnap.io">StockSnap</a>