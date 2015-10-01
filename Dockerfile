FROM google/debian:wheezy

# update and install all the bits
RUN apt-get update -y && \
    apt-get install --no-install-recommends -y -q \
    curl git ssh build-essential ca-certificates libpq-dev python-dev \
    && rm -rf /var/lib/apt/lists/*

# install node
RUN mkdir /nodejs && \
    curl http://nodejs.org/dist/v0.12.2/node-v0.12.2-linux-x64.tar.gz | \
    tar xvzf - -C /nodejs --strip-components=1

ENV PATH $PATH:/nodejs/bin:node_modules/.bin
RUN ln -s /nodejs/bin/node /usr/bin/node
RUN ln -s /nodejs/bin/npm /usr/bin/npm

# change www-data home directory to /home/www-data
RUN mkdir -p /home/www-data/.ssh/
RUN usermod -d /home/www-data www-data

# setup SSH deploy key
RUN mkdir -p /home/www-data/.ssh/
RUN usermod -d /home/www-data www-data
ADD docker/id_rsa /home/www-data/.ssh/id_rsa
ADD docker/known_hosts /home/www-data/.ssh/
RUN chown -R www-data:www-data /home/www-data/
RUN chmod 700 /home/www-data/.ssh/
RUN chmod 600 /home/www-data/.ssh/id_rsa

# build ember app

ADD . /app
RUN chown -R www-data:www-data /app

USER www-data
WORKDIR /app
RUN npm install bower
RUN npm install
RUN bower install

# cleanup private data
RUN rm /home/www-data/.ssh/id_rsa

CMD ["npm", "start"]
