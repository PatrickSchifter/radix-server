#!/bin/sh
cd ../
pm2 stop radix-server
pm2 delete radix-server
npm install
rm -r dist/
npm run build
pm2 start ./dist/app.js --name radix-server