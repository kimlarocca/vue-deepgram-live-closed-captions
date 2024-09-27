FROM node:18.20 as build

ARG DEEPGRAM_API_KEY
ARG ENVIRONMENT
ARG BFF_URL 

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci
RUN npm install sass

COPY . .
RUN npm run build

FROM node:18.20.4-slim as app

WORKDIR /app

RUN groupadd www && \
    useradd -d /app -s /sbin/nologin -g www www

RUN apt-get update \ 
    && apt-get install -y \
    curl \
    netcat-traditional \
    nginx-extras \
    python3 \
    python3-pip \
    python3-setuptools \
    unzip \
    supervisor 

COPY --chown=www:www scripts/entry.sh ./scripts/entry.sh
COPY --chown=www:www ./nginx*.conf /etc/nginx/

COPY --chown=www:www --from=build /app/.output ./.output/
COPY --chown=www:www --from=build /app/.nuxt ./.nuxt/
COPY --chown=www:www --from=build /app/node_modules ./node_modules/
COPY --chown=www:www --from=build /app/package.json .

RUN mkdir -p /var/run/nginx/ && \
    mkdir -p /var/log/nginx/ && \
    mkdir -p /app/log/ && \
    touch /run/nginx.pid && \
    chown -Rf www:www /var/run/nginx/ && \
    chown -Rf www:www /var/lib/nginx/ && \
    chown -Rf www:www /var/log/nginx/ && \
    chown -Rf www:www /etc/nginx/ && \
    chown -Rf www:www /run/nginx.pid && \
    chown -Rf www:www /app/ && \
    chmod -R 777 /app/node_modules && \
    chmod -R 755 /app/scripts/entry.sh

ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

USER www

EXPOSE 8080
ENTRYPOINT [ "./scripts/entry.sh" ]