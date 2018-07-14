FROM node:10.6.0-alpine
RUN mkdir -p /src/app
WORKDIR /src/app
COPY package.json /src/app/package.json
COPY .babelrc /src/app/.babelrc
RUN npm install
COPY koa-app /src/app
EXPOSE 8080
CMD ["npm","run","start-docker"]