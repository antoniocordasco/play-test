#!/usr/bin/env bash

psql -v ON_ERROR_STOP=1 \
  --username "$POSTGRES_USER" \
  --dbname "$POSTGRES_DB" \
  -j -f /docker-entrypoint-initdb.d/postgres-init.sql