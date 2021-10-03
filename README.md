# About the application

<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/xyzsince2014/tokyomap-web">
<img alt="GitHub tag (latest by date)" src="https://img.shields.io/github/v/tag/xyzsince2014/tokyomap-web">

## Abstract
<p>A web mapping service which tracks locations of users in the Greater Tokyo Area.</p>
<p>You can see it's application demo <strong><a href="https://imgur.com/gallery/3tVWKBd">here</a></strong>.</p>

## URL
https://www.tokyomap.live

※ The service is suspended to avoid running cost being charged.

## System Structure
<img src="https://user-images.githubusercontent.com/30502252/109414006-e3c0a880-79f3-11eb-8278-2a1b68b28f3a.png" width="75%"><br>

### Development
```bash
# node modules installation
yarn install

# run the app on the development server
yarn start

# build and run the app on the web server for development
yarn build:dev
docker-compose up -d
```

### Deployment
Merge the develop branch to the master one before push `Start Build` on CodeBuild GUI.