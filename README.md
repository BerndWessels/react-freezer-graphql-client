# React / Freezer / GraphQL (without Relay!)/ Webpack

# Current Version 0.1.1

# Overview

This is a template you can fork and clone to develop data driven React/Freezer/GraphQL SPA Websites using a single QL endpoint.

We are using React-Intl V2 as our translation framework.

Another nice feature is the use of CSS modules. It removes all the trouble that usually comes with css naming conflicts.

To make AJAX calls we use fetch, which is available natively on modern browsers and polyfilled via webpack for old browsers.

And we will keep on adding other important SPA related components and processes for whitelabeling and everything else you need to kick-start your unicorn.

# GraphQL without Relay!

We use GraphQL on the server side. But we do NOT use Relay on the client side.

Instead we store entities in the freezer store.

This removes all the problems and complexity that comes with relay! And we can stick to the one pure state that drives the app.

# Babel 6

We are strictly committed to the latest and greatest JavaScript developments and are using Babel 6.

Make sure you get the latest versions of all packages. Otherwise you might run into bugs that have already been fixed. `npm outdated` is your friend.

# Todo

Add a changelog to make it easier for followers to find relevant changes.

# Features
* React
* Freezer
* GraphQL
* NO Relay!
* CSS Modules
* SASS
* Webpack
* Browser Sync
* React Bootstrap
* React-Intl V2 Internationalization
* Heavily commented webpack configuration with reasonable defaults.
* Latest JSX, ES6, and ES7 support with babel 6.
* Source maps included in all builds.
* Development server with live reload.
* Production builds with cache busting and asset minification.
* Testing environment using chai and mocha.
* Code coverage when tests are run.
* No gulp and no grunt, just npm run-scripts.

# i18n

We are using [react-intl v2](https://github.com/yahoo/react-intl/issues/162) to provide translations and internationalization.

For each language you want to provide you have to add a `[id].json` in the `public/assets/translations` folder.

To Extract the default messages from your project and merge them into all your language files run `npm run translations:extract`.
Already existing translations within your language files will not be touched. Only new default messages will be added.

You can also modify and extend the `translationsExtract` script with your own tools and workflows. This gives you plenty of ways to deal with your translator.

## Scripts

* `npm start` - start development server, try it by opening `http://localhost:8080/` or with browser sync `http://localhost:3000/`
* `npm run build` - generate a minified build to dist folder
* `npm run build:serve` - serve the minified build locally on port 8080
* `npm run test` - run all tests
* `npm run test:live` - continuously run unit tests watching for changes
* `npm run translations:extract` - extracts all default messages and merges them into the translations files.

See what each script does by looking at the `scripts` section in [package.json](./package.json).

# Contribution

You are very welcome to report issues and to contribute to the project.
