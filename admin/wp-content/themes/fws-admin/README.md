# FWS Nuxt Admin
*Version: 1.0.0*

> Make Love Not WordPress!

## Installation Instructions
Install Forwardslash CLI globaly.

Install PHP dependencies by running [Composer](https://getcomposer.org/doc/00-intro.md) dependency manager.

    composer install

## Starter Config

Use `.fwsconfig.yml` file to configure top level theme options.

### Global Config

- `theme-name` - set theme full name
- `virtual-host` - set local env url
- `recovery-mode-emails` - set the fatal error handler email address from admin's to our internal
- `prevent-plugin-update` - enable only logged in users with declared email domain to add/update/remove plugins
- `acf-only-local-editing` - enable acf to edit and manage only on local enviorment


    global:
        theme-name: 'FWS Nuxt Admin'
        virtual-host: 'http://starter.local/'
        recovery-mode-emails:
            - 'nick@forwardslashny.com'
            - 'boris@forwardslashny.com'
            - 'petar@forwardslashny.com'
        prevent-plugin-update:
            enable: true
            domain: forwardslashny.com
        acf-only-local-editing:
            enable: true
            allowed-hosts:
                - '.local'
                - 'localhost/'
                - '.lndo.site'
