FROM node:current-alpine

COPY . /app

COPY ./docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Чтобы было удобно 🙃😇
RUN apk add --no-cache bash
RUN echo "alias ll='ls -lah'" >> /root/.bashrc

WORKDIR /app

ENTRYPOINT [ "/entrypoint.sh" ]
