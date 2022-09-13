---
layout: post
title: Using Ldap Record with Laravel Fortify
description: Laravel 8 has some great features, including Laravel Fortify. Learn how to use it with Ldap Record
date: 2020-10-12 18:00:07
hero_image: /img/cranes.jpg
hero_height: is-large
hero_darken: false
image: /img/cranes.jpg
tags: laravel ldap authentication
---

In my organisation we use Ldap to authenticate users so they only have to remember one username and password and it means we don't have to worry about managing passwords. Laravel 8 has some fantastic new features, including Laravel Fortify. This is a guide to getting started using Ldap Record with Laravel Fortify.

## Jetstream

Before we get started, I wanted to mention that Laravel 8 also has another great package called [Jetstream](https://jetstream.laravel.com/1.x/introduction.html) that offers a frontend built with Tailwind CSS. If you prefer to use this then there is documentation available on the [Ldap Record docs](https://ldaprecord.com/docs/laravel/auth/laravel-jetstream/) website. 

## Username or Email

You can either user email or username to login, but in this article I am going to use username, more specifically samaccountname with ActiveDirectory. If you use OpenLdap then you need to replace `samaccountname` with the relevant field, such as `uid` and replace `LdapRecord\Models\ActiveDirectory\User::class` with `LdapRecord\Models\OpenLdap\User::class`

## Add the packages

Start by creating a new Laravel 8 project and then install Fortify using composer and publish the resources.

```bash
composer require laravel/fortify
php artisan vendor:publish --provider="Laravel\Fortify\FortifyServiceProvider"
```

Don't run the migrations just yet. Let's install Ldap Record next using composer and publish the resources.

```bash
composer require directorytree/ldaprecord-laravel
php artisan vendor:publish --provider="LdapRecord\Laravel\LdapServiceProvider"
```

## Database Migrations

Update the create users table migration to add the username column. The Ldap Record documentation suggests updating the email column to the username, but personally I think it's useful to store the email in your user model. This makes it easy to use Laravel's Notifications and Mailables. 

```php
// database/migrations/2014_10_12_000000_create_users_table.php
$table->string('username')->unique(); // add this line
```

The Ldap Record package also provides a migration with additional fields it needs. We don't need to make any changes here. 

Finally, we can run the migrations.

```bash
php artisan migrate
```

## Ldap Record Configuration

Next we can update the authentication configuration file by adding the ldap provider and updating the web guard to use the newly created ldap provider. 

As we are storing both the username (samaccountname) and the email address we can add these, along with the name, to the sync_attributes array. Also, we don't want to manage passwords in our Laravel app as this is done in ActiveDirectory for us, so we set sync_passwords to false. 

```php
// config/auth.php

'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'ldap', // Changed to 'ldap'
    ],
],

'providers' => [
    'ldap' => [
        'driver' => 'ldap',
        'model' => LdapRecord\Models\ActiveDirectory\User::class,
        'database' => [
            'model' => App\Models\User::class,
            'sync_passwords' => false,
            'sync_attributes' => [
                'name' => 'cn',
                'email' => 'mail',
                'username' => 'samaccountname',
            ],
        ],
    ],
],
```

Add the LdapAuthenticatable interface and the AuthenticatesWithLdap trait to your User model.

```php
// app/Models/User.php

use LdapRecord\Laravel\Auth\LdapAuthenticatable;
use LdapRecord\Laravel\Auth\AuthenticatesWithLdap;

class User extends Authenticatable implements LdapAuthenticatable
{
    use AuthenticatesWithLdap;

}
```

## Fortify Updates

We need to update the fortify configuration to expect the username instead of an email address and we also need to disable other built in features as we don't want users to register via our app, we want them to log in with an existing active directory account.

```php
// config/fortify.php

'username' => 'username',

'features' => [
    // Features::registration(),
    // Features::resetPasswords(),
    // Features::emailVerification(),
    // Features::updateProfileInformation(),
    // Features::updatePasswords(),
    // Features::twoFactorAuthentication(),
],
```

Update the AuthServiceProvider by overwriting the `Fortify:authenticateUsing` method so it expects the samaccountname and password, rather than email.

```php
// app/Providers/AuthServiceProvider.php

public function boot() 
{
   Fortify::authenticateUsing(function ($request) {
        $validated = Auth::validate([
            'samaccountname' => $request->username,
            'password' => $request->password
        ]);

        return $validated ? Auth::getLastAttempted() : null;
    }); 
}
```

## Login Page

Create a view for your login page. The below has absolutely no styling, I'll leave that up to you, but it will do the job for now. Fortify provides a login route for us and the default view is `auth.login` but this can be overwritten if required. 

{% raw %}
```html
// resources/views/auth/login.blade.php

<form method="POST" action="{{ route('login') }}">

    @csrf
    @method('post')

    <label for="username">Username</label>
    <input type="text" name="username" value="{{ old('username') }}" id="username" />

    <label for="password">Password</label>
    <input type="password" name="password" id="password" />

    <input type="submit" value="Login" />

</form>
```
{% endraw %}

## Env file

Finally we just need to update the .env file with our LDAP settings and we are good to go.

```text
LDAP_HOST=127.0.0.1
LDAP_USERNAME="cn=user,dc=local,dc=com"
LDAP_PASSWORD=secret
LDAP_PORT=389
LDAP_BASE_DN="dc=local,dc=com"
```

You should now be able to log in with your active directory account and your user's details will be synced to your users table in your database. 

Photo by <a href="https://stocksnap.io/author/wyncliffe">Wyncliffe</a> from <a href="https://stocksnap.io">StockSnap</a>