# tokyomap-front

<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/xyzsince2014/tokyomap-front">
<img alt="GitHub tag (latest by date)" src="https://img.shields.io/github/v/tag/xyzsince2014/tokyomap-front">

## Abstract for the applicaiton

<p>A web mapping service which tracks locations of users in the Greater Tokyo Area.</p>
<p>You can see it's demo <strong><a href="https://imgur.com/gallery/3tVWKBd">here</a></strong>.</p>


## How to dev

```bash
# add `eval "$(fnm env --use-on-cd)"` to .zshrc after installation
brew install fnm
fnm install --lts

# install pnpm
brew install pnpm
pnpm setup
pnpm install

# run dev server
pnpm start

# push to S3 bucket
pnpm build:dev
./sync-s3.sh
```
