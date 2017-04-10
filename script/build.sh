#!/bin/bash

cd zepto
npm install
MODULES="zepto event data fx fx_methods selector" npm run-script dist
#npm run-script dist
cd ..

if [ -f index.js ]; then
  rm index.js;
fi

cat zepto/dist/zepto.js _index.js > index.js
