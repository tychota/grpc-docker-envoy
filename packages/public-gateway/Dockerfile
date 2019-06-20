FROM node:alpine

WORKDIR /srv
RUN cd /srv

VOLUME [ "/usr/local/share/.cache/yarn/v4" ]
RUN yarn global add nodemon

ADD patches /srv/patches
ADD package.json /srv/package.json
ADD yarn.lock  /srv/yarn.lock

RUN yarn --pure-lockfile
