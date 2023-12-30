#!/bin/sh
if [ "${ENVIRONMENT}" = "prod" ]
then
  if [ "${LOC}" = "k8s" ]
  then
    echo "starting app prod in k8s"
    mv /usr/share/nginx/html/config/config.prod-k8s.json /usr/share/nginx/html/config/config.json
  else
    echo "starting app prod"
    mv /usr/share/nginx/html/config/config.prod.json /usr/share/nginx/html/config/config.json
  fi
elif [ "${ENVIRONMENT}" = "test" ]
then
  echo "starting dev"
  mv /usr/share/nginx/html/config/config.json /usr/share/nginx/html/config/config.json
else
  echo "starting app default / local"
fi
nginx -g "daemon off;"
