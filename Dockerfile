# discover.repositive.io
#
# VERSION 1.0.0

FROM ubuntu:15.10
MAINTAINER Repositive <info@repositive.io>

LABEL Description="Repositive frontend environment" Version="1.0.0"

# Base tools
RUN apt-get update
RUN apt-get install -y build-essential curl wget git ssh vim npm phantomjs

ENV USER root

RUN npm install -g n
RUN n 5.4.1
RUN npm install -g ember-cli bower
RUN echo '{ "allow_root": true }' > /root/.bowerrc

WORKDIR /app
