#!/bin/bash
aws s3 sync public/ s3://tokyomapfrontstack-dev-tokyomapfront54a4c58f-jqg8opghxva4 --delete
aws cloudfront create-invalidation --distribution-id E2URE157HO4L0Z --paths "/*"
