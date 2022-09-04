#!/bin/bash

docker image rm tokyomap.web:dev
docker build -t tokyomap.web:dev web
