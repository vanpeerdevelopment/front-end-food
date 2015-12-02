/* global module*/

module.exports = function configure(config) {
    config.set({
        basePath: "../..",
        files: [
            "node_modules/babel-polyfill/dist/polyfill.js",
            "bower_components/es6-module-loader/dist/es6-module-loader.src.js",
            "bower_components/system.js/dist/system.src.js",
            "dist/src/app/**/*.js",
            "dist/test/unit/**/*.spec.js",
            "test/unit/karma.bootstrap.js"
        ],
        browsers: ["PhantomJS"],
        frameworks: [
            "mocha",
            "chai-sinon"
        ],
        reporters: ["mocha"],
        plugins: [
            "karma-phantomjs-launcher",
            "karma-babel-preprocessor",
            "karma-mocha",
            "karma-chai-sinon",
            "karma-mocha-reporter"
        ],
        port: 9876
    });
};
