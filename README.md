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


## Use Docker on OSX (Faster alternative to Vagrant for development)

This provides almost instant detection of file changes and rebuild/refresh of the 
repositive frontend, while still running everything in a controlled and isolated 
environment.  
This is currently not a replacement for Vagrant. Instead, it's a better alternative 
to installing the frontend locally (with just ```npm install``` & ```bower install```). 
During live development (e.g., changing page layout), Vagrant might be 
too heavy or take too long to detect file changes and rebuild the app, so developers 
end up avoiding Vagrant.  

#### Technical notes

Since OSX is not Linux, Docker will still have to run inside a Linux VM 
(losing some performance) and file watching will be performed on the host (OSX) 
with rsync synchronizing the file changes to the guest (Linux VM) and making them 
quickly visible to the Docker containers (through docker-osx-dev tool).  
[Here's a blog post with more information](http://www.ybrikman.com/writing/2015/05/19/docker-osx-dev/) about this approach.

### First time

```bash
# Install tools (do once, or make sure they're updated)
brew install docker docker-machine docker-compose
curl -o /usr/local/bin/docker-osx-dev https://raw.githubusercontent.com/brikis98/docker-osx-dev/master/src/docker-osx-dev
chmod +x /usr/local/bin/docker-osx-dev
docker-osx-dev install

# Create a Docker virtual machine (do once)
docker-machine create --virtualbox-disk-size 80000  -d virtualbox docker-vm

# Load env vars to connect the docker client (in your terminal) to the docker server inside the docker-vm (do for each new terminal)
eval $(docker-machine env docker-vm)
# You can also add these variables to you .bashrc or .profile to avoid always having to do eval for a new terminal
echo "$(docker-machine env docker-vm)" >> ~/.bashrc
# Setup the docker-vm IP in hosts to access the app via http://docker-vm:4200 (once)
echo "$(docker-machine ip docker-vm) docker-vm" | sudo tee -a /etc/hosts

# Setup ssh-agent container to access private repos during build (i.e., repositive-styles) (once)
docker run -d --name=ssh-agent whilp/ssh-agent:latest
docker run --rm --volumes-from=ssh-agent -v ~/.ssh:/ssh -it whilp/ssh-agent:latest ssh-add /ssh/id_rsa #type key password if asked
docker run --rm --volumes-from=ssh-agent -v ~/.ssh:/ssh -it whilp/ssh-agent:latest cp /ssh/known_hosts /root/.ssh/known_hosts

# Start rsync watcher
docker-osx-dev # answer yes to the question. At this point if you messed up you'll have to destroy your VM (see below) and restart from docker-machine create step.

# Start container and app server (build image and deps if needed)
## Do this in another windows and don't forget to do eval first to setup the env vars to connect to the Docker VM.
eval $(docker-machine env docker-vm) # if needed
docker-compose up
```

### Second time (e.g., after a reboot or docker-vm halt)

```bash
docker-machine start docker-vm
eval (docker-machine env docker-vm) # if needed
docker-osx-dev
docker-compose up # in a new window
```

### Cleanup

```bash
docker-machine rm docker-vm
```

## Docker on Linux (Faster alternative to Vagrant for development)

On Linux, using Docker should be much easier than OSX since we don't need a VM, 
and performance should be near native speed.

```bash
# Install docker and docker-compose, e.g., sudo apt-get install docker

# Setup container with ssh keys to clone private repos (do once)
docker run -d --name=ssh-agent whilp/ssh-agent:latest
docker run --rm --volumes-from=ssh-agent -v ~/.ssh:/ssh -it whilp/ssh-agent:latest ssh-add /ssh/id_rsa #type key password if asked to
docker run --rm --volumes-from=ssh-agent -v ~/.ssh:/ssh -it whilp/ssh-agent:latest cp /ssh/known_hosts /root/.ssh/known_hosts

# Start app server
docker-compose up
```

