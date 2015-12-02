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
            "test/unit/karma.start.js"
        ],
        browsers: ["PhantomJS"],
        preprocessors: {
            "test/unit/karma.start.js": ["babelES2015"]
        },
        customPreprocessors: {
            babelES2015: {
                base: "babel",
                options: {
                    presets: ["es2015"],
                    sourceMap: "inline"
                },
                sourceFileName: function sourceFileName(file) {
                    return `/sources/${file.originalPath.substring(file.originalPath.indexOf("test/unit/"))}`;
                }
            }
        },
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
