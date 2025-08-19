FROM nginx:latest

COPY ./docker/default.env.conf /tmp/default.env.conf
COPY ./docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

WORKDIR /etc/nginx

ENTRYPOINT [ "/entrypoint.sh" ]
