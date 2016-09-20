# Ember Frontend for repositive.io

## Application Architecture

### Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

### Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `git submodule update --init`
* `npm install`
* `bower install`
* `npm install -g onchange`

### Running / Development

* We recommend you use jscs and hshint plugins in your editor.
 * [atom editor](https://atom.io/) - That way you can get the benefits of [code style linter](https://atom.io/packages/linter-jscs) and [jshint linter](https://atom.io/packages/linter-jshint). See [this article](http://blog.yld.io/2015/04/15/using-jscs-and-jscs-fixer-for-atom/).
 * sublime - [SublimeLinter-jscs](https://packagecontrol.io/packages/SublimeLinter-jscs). See [this article](https://medium.com/@addyosmani/auto-formatting-javascript-code-style-fe0f98a923b8#.jud0r23pu)
* `npm start`
* Visit your app at [http://localhost:4200](http://localhost:4200). (it is important you use this address and not 127.0.0.1:4200 for the 3rd party authentication to work correctly)

### Writing and Running Tests

We use [ember-cli-mocha](https://github.com/switchfly/ember-cli-mocha) for running our tests. This uses the [Chai](http://chaijs.com/) assertion library. Ember-cli-mocha overrides the test blueprints of ember-cli.

The actual testing modules are from [ember-mocha](https://github.com/switchfly/ember-mocha), so reference this when writing tests.

We also use [ember-sinon](https://github.com/csantero/ember-sinon) for spies and better stubbing.

To run the tests use: `ember test --server` or `ember t -s` for short.


## Styles / CSS

### Setting up styles submodule
The project styles are kept as a submodule. To get setup with using the styles you must initialize the submodule. In the project directory run:
```
git submodule update --init repositive-styles
```

## Working on feature branches in both "discover.repositive.io" and "repositive-styles" projects

In production (and development), "discover.repositive.io" has the `master` branch of "repositive-styles" as a Bower dependency:

  ```
  "repositive-styles": "git@github.com:repositive/repositive-styles.git#master"
  ```
This means that when the deployment process runs `bower install`, Bower does a git checkout of that Git branch of the styles.

  For working on Git feature branches in both "discover.repositive.io" and "repositive-styles", the Bower dependency
needs to point to the "repositive-styles" feature branch instead of `master`,
so that "discover.repositive.io" deployment to servers installs that "repositive-styles" feature branch.

For pointing the frontend dependency to another branch, on the "repositive-styles" feature branch,
just change the branch name in the `bower.json` file (after the `#`):

  ```
  "repositive-styles": "git@github.com:repositive/repositive-styles.git#feature-my-feature-branch-name"
  ```

and be sure to commit the `bower.json`, for example along with other changes to the frontend app on the 1st commit.

After the "repositive-styles" feature branch is finished and the changes are merged into main development ("development" branch),
update the "discover.repositive.io" `bower.json` file to point to `master` again, before finishing and
merging the "discover.repositive.io" feature branch.

The full common workflow step-by-step is:

1. Create feature branch on "repositive-styles". ex.: "feature/nice-buttons-scss"

    ```
    $ cd /path/to/repositive-styles/
    $ git flow feature start nice-buttons-scss
    ```

2. Create feature branch on "discover.repositive.io", ex.: "feature/nice-buttons"

    ```
    $ cd /path/to/discover.repositive.io/
    $ git flow feature start nice-buttons
    ```

3. Edit "discover.repositive.io" `bower.json` to point to the styles feature branch

    ```
    "repositive-styles": "git@github.com:repositive/repositive-styles.git#feature/nice-buttons-scss"
    ```

Work as usual on both projects. When finishing work on both branches:

1. Finish the styles feature branch and push to Github

    ```
    $ cd /path/to/discover.repositive.io/
    $ git flow feature finish nice-buttons-scss
    $ git push
    ```

2. Edit "discover.repositive.io" `bower.json` to point Bower back to `master branch`, commit and push to Github

    ```
    "repositive-styles": "git@github.com:repositive/repositive-styles.git#master"
    ```

3. Finish the "discover.repositive.io" feature branch and push to Github

    ```
    $ cd /path/to/discover.repositive.io/
    $ git flow feature finish nice-buttons
    $ git push
    ```




### Code Generators

Make use of the many generators for code, try `ember help generate` for more details


### Deploying

We are using ember CLI deploy packages with the 'lightening approach' for deployment.
In summary this means that when you run `ember deploy` 2 things happen:

 - assets are uploaded to an s3 bucket
 - the index.html file is uploaded to a small server with a redis instance.

In order to deploy you need to add your AWS Iams credentials to a .env file in the
root of the project.

```
# /.env

AWS_KEY=123456
AWS_SECRET=abcdef
```

You can then use ember cli to deploy from your local machine:

```
ember deploy development
```

You can specify the location of the config file you want to use for deployment by
using the env variable `FRONTEND_DEPLOY_CONFIG_PATH`.
