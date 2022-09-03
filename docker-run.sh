#!/bin/bash
docker container run -d \
  -p 443:443 \
  --rm \
  -v $(pwd)/web/public:/usr/share/nginx \
  -v $(pwd)/web/var/log:/var/log/nginx \
  --name web \
  --net network_dev \
  tokyomap.web:dev
