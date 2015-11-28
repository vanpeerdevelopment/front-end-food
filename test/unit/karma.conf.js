/* global module*/

module.exports = function configure(config) {
    config.set({
        basePath: "../..",
        files: ["test/unit/**/*.spec.js"],
        browsers: ["PhantomJS"],
        frameworks: ["mocha"],
        reporters: ["mocha"],
        plugins: [
            "karma-phantomjs-launcher",
            "karma-mocha",
            "karma-mocha-reporter"
        ],
        port: 9876
    });
};
