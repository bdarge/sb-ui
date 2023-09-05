#!/bin/sh
if [ "${ENVIRONMENT}" = "prod" ]
then
  echo "starting app prod"
  mv /usr/share/nginx/html/config/config.prod.json /usr/share/nginx/html/config/config.json
elif [ "${ENVIRONMENT}" = "test" ]
then
  echo "starting dev"
  mv /usr/share/nginx/html/config/config.json /usr/share/nginx/html/config/config.json
else
  echo "starting app default / local"
fi
nginx -g "daemon off;"
