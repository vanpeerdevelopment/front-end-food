/* global module*/

module.exports = function configure(config) {
    config.set({
        basePath: "../..",
        files: [
            "node_modules/babel-polyfill/dist/polyfill.js",
            "bower_components/es6-module-loader/dist/es6-module-loader.src.js",
            "bower_components/system.js/dist/system.src.js",
            // "bower_components/system.js/dist/system-register-only.src.js",
            "test/unit/**/*.spec.js",
            "test/unit/karma.start.js"
        ],
        browsers: ["PhantomJS"],
        preprocessors: {
            "test/unit/**/*.spec.js": ["babel"]
        },
        babelPreprocessor: {
            options: {
                moduleIds: true,
                presets: ["es2015"],
                plugins: ["transform-es2015-modules-systemjs"],
                sourceMap: "true"
            },
            filenameRelative: function filename(file) {
                return file.originalPath.substring(file.originalPath.indexOf("test/unit/") + "test/unit/".length);
            },
            sourceMapTarget: function sourceMapTarget(file) {
                return file.originalPath;
            },
            sourceFileName: function sourceFileName(file) {
                return `/sources/${file.originalPath.substring(file.originalPath.indexOf("test/unit/"))}`;
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
