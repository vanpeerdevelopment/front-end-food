/* global module*/

module.exports = function configure(config) {
    config.set({
        basePath: "../..",
        files: ["test/unit/**/*.spec.js"],
        browsers: ["PhantomJS"],
        frameworks: [
            "mocha",
            "chai-sinon"
        ],
        reporters: ["mocha"],
        plugins: [
            "karma-phantomjs-launcher",
            "karma-mocha",
            "karma-chai-sinon",
            "karma-mocha-reporter"
        ],
        port: 9876
    });
};
