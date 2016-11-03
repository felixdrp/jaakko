#!/bin/bash
#

gulp deploy

NODE_ENV=production browserify  ./build/jaakko-client.js -g [envify --NODE_ENV 'production']  > public/lib/bundle.js

BABEL_ENV=production node_modules/.bin/babili public/lib/bundle.js -o public/lib/bundle.min.js

cp public/lib/bundle.min.js public/lib/bundle.js
