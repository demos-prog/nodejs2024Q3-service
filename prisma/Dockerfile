FROM postgres:13-alpine3.20

WORKDIR /db

COPY /migrations /db/docker-entrypoint-initdb.d/migrations

EXPOSE 5432
