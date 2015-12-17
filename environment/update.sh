# Uninstall
echo "----- Removing ~/.npm_global -----"
rm -r ~/.npm_global
echo "----- Removing node_modules -----"
rm -r ~/Development/front-end-food/front-end-food/node_modules
echo "----- Removing bower_components -----"
rm -r ~/Development/front-end-food/front-end-food/bower_components
echo "----- Removing dist -----"
rm -r ~/Development/front-end-food/front-end-food/dist

# Install
echo "----- Updating nodejs -----"
sudo apt-get update
sudo apt-get install nodejs

echo "----- Installing npm -----"
npm install -g npm
echo "----- Installing bower -----"
npm install -g bower
echo "----- Installing gulp -----"
npm install -g gulp
echo "----- Installing eslint -----"
npm install -g eslint

echo "----- Do npm install -----"
npm install
echo "----- Do bower install -----"
bower install

# Build
echo "----- Run gulp build -----"
gulp

# Versions
echo "----- Node version -----"
node -v
echo "----- Global npm versions -----"
npm list -g --depth=0
echo "----- Local npm versions -----"
npm list --depth=0
echo "----- Bower versions -----"
bower list
