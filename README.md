# Ember Frontend for repositive.io

## Prerequisites

You need the following installed on your computer:

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Ember CLI](http://www.ember-cli.com/)
* [Yarn](https://yarnpkg.com/en/docs/install)
* We use eslint, so ensure your editor has a linter with the eslint package installed.

## Installation

* Clone this repo `git clone <repository-url>`
* Change into the new directory
* Run `yarn setup`

## Running / Development

To run the app against the [local development environment](https://github.com/repositive/devops/tree/master/development-environment/discover):
* Firstly clone the dev environment and start it with the command: `./start.sh` (this can take a while if it's the first time you've run it).
* Install dependencies using `yarn`, do **NOT** use `npm`, it does not work: `yarn install`
* To allow the local frontend to talk to these other services, run: `yarn startLocal` (or alternatively `yarn startLocalOnNewMac` on Mac with the fancy keyboard display)
* Visit your app at [http://localhost:4200](http://localhost:4200).


## Writing and Running Tests

We use [ember-cli-mocha](https://github.com/switchfly/ember-cli-mocha) for running our tests. This uses the [Chai](http://chaijs.com/) assertion library. Ember-cli-mocha overrides the test blueprints of ember-cli.

The actual testing modules are from [ember-mocha](https://github.com/switchfly/ember-mocha), so reference this when writing tests.

We also use [ember-sinon](https://github.com/csantero/ember-sinon) for spies and better stubbing.

To run the tests use: `ember test --server` or `ember t -s` for short.

## Development Guidelines
It's easy to cut corners. We have in the past, however this leaves us with nasty code which comes with many undesirable traits.

To ensure our code follows best practices, please become familiar with this [ember coding style-guide](https://github.com/netguru/ember-styleguide).

As well as this, we encourage component based design and functional programming. Composability > inheritance.

## Code Generators

Make use of the many generators for code, try `ember help generate` for more details

## Deployment

### Deploying to Staging

Whenever a PR is merged into master, the new build of master is deployed to [dev]](https://discover-dev.repositive.io) automatically.

### Deploying to Production
1. Because you can't directly push changes to master, you must first make a new branch.
2. Within the new branch, update the version number with `npm version <major | minor | patch>`
3. Push with tags: `git push && git push --tags`
4. You can create a release by [editting the release notes of the tag](https://github.com/repositive/discover.repositive.io/tags). This gives us a good history of what we've deployed.
5. Create a PR to merge the upgrade branch into master. You must choose the rebase and merge option, not squash.
