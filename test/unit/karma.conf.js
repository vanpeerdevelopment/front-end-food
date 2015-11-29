/* global module*/

module.exports = function configure(config) {
    config.set({
        basePath: "../..",
        files: [
            "node_modules/babel-polyfill/dist/polyfill.js",
            "test/unit/**/*.spec.js"
        ],
        browsers: ["PhantomJS"],
        preprocessors: {
            "test/unit/**/*.spec.js": ["babel"]
        },
        babelPreprocessor: {
            options: {
                presets: ["es2015"],
                sourceMap: "inline"
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
