FROM nginx:latest

# COPY ./ssl/aidrom.lc.pem /etc/nginx/ssl/front.cert
# COPY ./ssl/aidrom.lc.key.pem /etc/nginx/ssl/front.key
# COPY ./ssl/api.aidrom.lc.pem /etc/nginx/ssl/api.cert
# COPY ./ssl/api.aidrom.lc.key.pem /etc/nginx/ssl/api.key

COPY ./docker/default.env.conf /tmp/default.env.conf
COPY ./docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

WORKDIR /etc/nginx

ENTRYPOINT [ "/entrypoint.sh" ]
