# app.js and index.html
NODE_ENV=production node_modules/.bin/webpack --mode production &&
echo "WebPack completed successfully" &&
# build css
./node_modules/.bin/sass ./src/styles/index.scss:./dist/application/style.css &&
# minify css
./node_modules/.bin/uglifycss ./dist/application/style.css --output ./dist/application/style.css &&
echo "Sass built and completed successfully"