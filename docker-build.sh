#!/bin/bash

docker image rm tokyomap.web:dev

yarn build:dev

docker build -t tokyomap.web:dev web
