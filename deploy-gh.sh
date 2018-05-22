#!/usr/bin/env bash
git branch -D gh-pages
git push origin --delete gh-pages
git checkout -b gh-pages
npm run build --prod --aot
find . -type d ! -path './www*' ! -path './.git*' ! -path '.' | xargs rm -rf
rm -r *.*
mv www/* .
rm -rf www
git add .
git commit -m "Publishing to github pages"
git push origin gh-pages
git checkout master