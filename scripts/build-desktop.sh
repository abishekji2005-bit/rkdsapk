# build mac app
# TODO: Replace the URL below with your own deployed instance
nativefier --name "rkds" --platform osx --conceal --icon icon-final.png --min-width 450px --min-height 600px --disable-dev-tools "https://your-domain.app" ./dist/desktop-builds/

# build mac installer
create-dmg ./dist/desktop-builds/rkds-darwin-x64/rkds.app ./dist/desktop-builds/ --overwrite
rm -rf ./dist/desktop-builds/rkds.dmg
mv ./dist/desktop-builds/rkds\ 1.0.0.dmg ./dist/desktop-builds/rkds.dmg

# build windows app
nativefier --name "rkds" --platform windows --icon icon-final.ico --min-width 450px --min-height 600px --disable-dev-tools "https://your-domain.app" ./dist/desktop-builds/

# build windows zip file
rm -rf ./dist/desktop-builds/rkds.zip
zip -r ./dist/desktop-builds/rkds.zip ./dist/desktop-builds/rkds-win32-x64/
