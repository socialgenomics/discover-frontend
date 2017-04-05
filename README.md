# Ember Frontend for repositive.io

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)
* We recommend you use [eslint](https://atom.io/packages/linter-eslint) plugin in your editor.

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `git submodule update --init`
* `npm install`
* `bower install`
* `npm install -g onchange`

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

## Deploying

### Deploying to Staging

```
git checkout master

git pull
```

If there are branches ready to be merged, merge them.

Increment version number with `npm version <major | minor | patch>`

Then push:

```

git push --tags
```
This build will be deployed to the staging machine at [https://discover-staging.repositive.io](https://discover-staging.repositive.io)

### Deploying to Production

1. [Deploy to staging](#deploying-to-staging)
2. Wait for successful deployment to staging.:watch:
3. Go to [Rancher](http://rancher.repositive.io:8080/env/1a100/apps/stacks/1e39) :cow:
4. Within the 'production' environment 'discover-platform' stack (link should take you there), click the 'upgrade' button on the 'discover' service.
5. In the input labeled 'Select Image', change the version number to the build you'd like to deploy.
6. Click upgrade and pray to the deployment god that nothing bad happens. :pray:
