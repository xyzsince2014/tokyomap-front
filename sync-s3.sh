#!/bin/bash

aws s3 sync --delete public s3://tokyomap-front-dev
aws s3 ls --recursive s3://tokyomap-front-dev
