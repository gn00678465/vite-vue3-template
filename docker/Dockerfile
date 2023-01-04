FROM node:16.17.1 as build-stage

ARG version
ENV COMMITID=$version

ENV WORKDIR=/app

WORKDIR $WORKDIR

COPY . $WORKDIR

RUN yarn install
RUN yarn build

FROM nginx:alpine as production-stage

RUN mkdir /app
RUN mkdir /ssl

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/docker/nginx.conf /etc/nginx/nginx.conf

VOLUME ["/ssl/"]

EXPOSE 443
EXPOSE 80