/* global module*/

module.exports = function configure(config) {
    config.set({
        basePath: "../..",
        files: ["test/unit/**/*.spec.js"],
        browsers: ["Firefox"],
        frameworks: ["mocha"],
        reporters: ["mocha"],
        plugins: [
            "karma-firefox-launcher",
            "karma-mocha",
            "karma-mocha-reporter"
        ],
        port: 9876
    });
};
