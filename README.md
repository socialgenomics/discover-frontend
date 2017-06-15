# Ember Frontend for repositive.io

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)
* [Yarn](https://yarnpkg.com/en/docs/install)
* We recommend you use [eslint](https://atom.io/packages/linter-eslint) plugin in your editor.

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `git submodule update --init`
* `npm run setup`

## Running / Development

* `npm run startStaging`
* Visit your app at [http://localhost:4200](http://localhost:4200).


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

## Deployment

### Deploying to Staging

Whenever a PR is merged into master, the new build of master is deployed to [staging](https://discover-staging.repositive.io) automatically.

### Deploying to Production
1. Because you can't directly push changes to master, you must first make a new branch.
2. Within the new branch, update the version number with `npm version <major | minor | patch>`
3. Push with tags: `git push && git push --tags`
4. Create a PR to merge the upgrade branch into master.
