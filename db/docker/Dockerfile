FROM postgres:15

COPY ./data /var/lib/postgresql/data
COPY ./docker/postgresql.conf /var/lib/postgresql/data/postgresql.conf
COPY ./docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

WORKDIR /var/lib/postgresql/data

ENTRYPOINT [ "/entrypoint.sh" ]
