FROM postgres:15

COPY ./docker/postgresql.conf /tmp/postgresql.conf
COPY ./docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh /tmp/postgresql.conf

VOLUME /var/lib/postgresql/data
VOLUME /var/lib/postgresql/data/log
VOLUME /backups

WORKDIR /var/lib/postgresql/data

ENTRYPOINT [ "/entrypoint.sh" ]
