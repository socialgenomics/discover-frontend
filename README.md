# Ember Frontend for repositive.io

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)
* We recommend you use jscs and hshint plugins in your editor.
 * [atom editor](https://atom.io/) - That way you can get the benefits of [code style linter](https://atom.io/packages/linter-jscs) and [jshint linter](https://atom.io/packages/linter-jshint). See [this article](http://blog.yld.io/2015/04/15/using-jscs-and-jscs-fixer-for-atom/).

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `git submodule update --init`
* `npm install`
* `bower install`
* `npm install -g onchange`

## Running / Development

* `npm start`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Setting up styles submodule
The project styles are kept as a submodule. To get setup with using the styles you must initialize the submodule. In the project directory run:
```
git submodule update --init repositive-styles
```

## Writing and Running Tests

We use [ember-cli-mocha](https://github.com/switchfly/ember-cli-mocha) for running our tests. This uses the [Chai](http://chaijs.com/) assertion library. Ember-cli-mocha overrides the test blueprints of ember-cli.

The actual testing modules are from [ember-mocha](https://github.com/switchfly/ember-mocha), so reference this when writing tests.

We also use [ember-sinon](https://github.com/csantero/ember-sinon) for spies and better stubbing.

To run the tests use: `ember test --server` or `ember t -s` for short.

## Development Guidelines
It's easy to cut corners. We have in the past, however this leaves us with nasty code which comes with many undesirable traits.

To ensure our code follows best practices, please become familiar with this [ember coding style-guide](https://github.com/netguru/ember-styleguide).

As well as this, we encourage component based design. So before you create a controller, or add markup directly into a top level template, STOP. Create a component for it.


## Code Generators

Make use of the many generators for code, try `ember help generate` for more details

## Deploying

### Deploying to development
When you push to development, this build is deployed to the development machine at [https://discover-dev.repositive.io/](https://discover-dev.repositive.io/).

### Deploying to staging
To deploy to staging you must first merge the master branch into the development branch:

```
git checkout master

git pull

git checkout development

git merge master
```

After checking everything is working. You then need to merge the development branch into master. Check everything is working as it should then push the changes:

```
git checkout master

git merge development

git push
```

This build will be deployed to the staging machine at [https://discover-staging.repositive.io](https://discover-staging.repositive.io)
