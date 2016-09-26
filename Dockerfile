FROM nginx
MAINTAINER Repositive <info@repositive.io>

WORKDIR /opt

COPY dist /opt
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Base tools
