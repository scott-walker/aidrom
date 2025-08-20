#!/bin/bash

DATEMARK=$(date +%Y%m%d_%H%M%S)

# Создать дамп БД (backup_${DATEMARK}.dump)
docker exec -it db pg_dump -U ${DB_USER} -d ${DB_NAME} -Fc -f /backups/backup_${DATEMARK}.dump
