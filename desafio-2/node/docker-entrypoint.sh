#!/bin/sh

dockerize -wait tcp://db:3306 -timeout 20s

echo ""
node src/migrate.js

exec "$@"
