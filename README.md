# tokyomap-front

<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/xyzsince2014/tokyomap-front">
<img alt="GitHub tag (latest by date)" src="https://img.shields.io/github/v/tag/xyzsince2014/tokyomap-front">

## Abstract for the applicaiton

<p>A web mapping service which tracks locations of users in the Greater Tokyo Area.</p>
<p>You can see it's demo <strong><a href="https://imgur.com/gallery/3tVWKBd">here</a></strong>.</p>

## URL

https://tokyomap.live

※ The service is suspended to avoid running cost being charged.

## System Structure

<img src="https://user-images.githubusercontent.com/30502252/109414006-e3c0a880-79f3-11eb-8278-2a1b68b28f3a.png" width="75%"><br>

## How to dev
```bash
yarn install

# run dev server
## serves http://localhost:3000
yarn start

# or transpile and push to S3 bucket
## cf. https://github.com/xyzsince2014/tokyomap-dev
yarn build:dev
./sync-s3-dev.sh
```
