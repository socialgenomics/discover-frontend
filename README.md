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

## Styles Submodule

### Setting up the styles submodule

To get setup with using the styles you must initialize the submodule. In the project directory run:
```
git submodule update --init repositive-styles
```

The repositive-styles submodule will be added to the root directory.

### Getting the latest styles

To ensure you're working with the latest styles, in the root directory of the app, run:
```
git submodule update
```

### Editing styles

To make changes to the styles, first create a new branch in the submodule.

```
cd repositive-styles
git checkout -b bugfix/example
```

When you're happy with the styles changes you have made. Push the branch, make a pull request and assign someone to review it.


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
