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

## Running / Development

* `npm start`
* Visit your app at [http://localhost:4200](http://localhost:4200). (it is important you use this address and not 127.0.0.1:4200 for the 3rd party authentication to work correctly)

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Deploying

* `npm run deployTesting`
* `npm run deployLive`
