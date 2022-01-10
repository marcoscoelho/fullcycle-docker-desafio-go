FROM node:16-alpine

WORKDIR /usr/src/app

RUN apk add --update --no-cache wget openssl
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY package*.json ./
RUN rm -rf node_modules
RUN npm ci --only=production

COPY . .
RUN chmod +x docker-entrypoint.sh
ENTRYPOINT ["sh", "./docker-entrypoint.sh"]

CMD ["node","src/app.js"]
