# Ember Frontend for repositive.io


## Utilising Vagrant

See <https://github.com/repositive/api.repositive.io/wiki/Vagrant>.

### Setting up SSH agent

See <https://github.com/repositive/api.repositive.io/wiki/SSH>.

### About the Vagrant setup

The VM has a static IP address, `192.168.33.12`. You can optionally add an entry to `/etc/hosts` to access the VM by a `repositive-frontend` domain name instead of IP, for example utilising [Gas Mask](http://clockwise.ee).

    # /etc/hosts
    192.168.33.12 repositive-frontend

The following services are running in the VM:

* Ember app: <http://repositive-frontend:4200/>
* Supervisor Web UI: <http://repositive-frontend:9001>. This allows start/stop/restart and monitor the logs of the Ember app.

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

### Running Tests

* `ember test`
* `ember test --server`

### Deploying

We are using ember CLI deploy packages with the 'lightening approach' for deployment.
In summary this means that when you run `ember deploy` 2 things happen:

 - assets are uploaded to an s3 bucket
 - the index.html file is uploaded to a small server with a redis instance.

In order to deploy you need to add you AWS Iams credentials to a .env file. This file
should correspond to the environment you are deploying against. For example if you
are deploying to an server called `development` then you need a file called `.env.deploy.development`
in the root of this project. Further information can be found here http://ember-cli.com/ember-cli-deploy/docs/v0.5.x/dotenv-support/.

```
# /.env.deploy.development

AWS_KEY=123456
AWS_SECRET=abcdef
```

You can then use ember cli to deploy from your local machine:

```
ember deploy development
```

You can specify the location of the config file you want to use for deployment by
using the env variable `FRONTEND_DEPLOY_CONFIG_PATH`.
