# Ember Frontend for repositive.io


## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM) 
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `git submodule update --init`
* `npm install`
* `bower install`
* `npm install -g onchange`

## Running / Development

* `npm start`
* Visit your app at [http://localhost:4200](http://localhost:4200). (it is important you use this address and not 127.0.0.1:4200 for the 3rd party authentication to work correctly)

## Live editing of repositive-styles

To link a separate checkout of repositive-styles into the project and do live editing with reload support:

1. Create a Bower global link

    ```
    $ cd path/to/repositive-styles
    $ bower link
    ```

2. Link the Bower component into this project  

    ```
    $ cd path/to/discover.repositive.io
    $ bower link repositive-styles
    ```

    This will create a symlink from `bower_components/repositive-styles` to `path/to/repositive-styles`

3. To start Ember server with live editing (reloading) of the SCSS styles, utilise the node-foreman support:


    ```
    $ cd path/to/discover.repositive.io
    $ nf start
    ```

  This will start 2 background processes, one for ember server and another to watch SCSS changes and trigger a reload.
  This is required because fb-watchman does not currently support watching for filesystem changes over symlinks 
  (https://github.com/facebook/watchman/issues/105).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Deploying

* `npm run deployTesting`
* `npm run deployLive`
