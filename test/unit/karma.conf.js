/* global module*/

module.exports = function configure(config) {
    config.set({
        basePath: "../..",
        files: ["test/unit/**/*.spec.js"],
        browsers: ["Firefox"],
        plugins: ["karma-firefox-launcher"],
        frameworks: [],
        reporters: [],
        port: 9876
    });
};
