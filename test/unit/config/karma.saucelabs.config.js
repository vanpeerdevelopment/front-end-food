/* global module, process */
/* eslint
    babel/object-shorthand: 0
    no-var: 0,
    no-process-env: 0 */

module.exports = function configure(config) {
    var customLaunchers = {
        sauceLabsChrome45Linux: {
            base: "SauceLabs",
            browserName: "chrome",
            version: "45",
            platform: "Linux"
        },
        sauceLabsFirefox42Windows10: {
            base: "SauceLabs",
            browserName: "firefox",
            version: "42",
            platform: "Windows 10"
        },
        sauceLabsIE11Windows10: {
            base: "SauceLabs",
            browserName: "internet explorer",
            version: "11",
            platform: "Windows 10"
        },
        sauceLabsAndroid51: {
            base: "SauceLabs",
            browserName: "android",
            version: "5.1"
        },
        sauceLabsAndroid44: {
            base: "SauceLabs",
            browserName: "android",
            version: "4.4"
        }
    };

    config.set({
        basePath: "../../..",
        files: [
            "dist/src/vendor/polyfill.min.js",
            "dist/src/vendor/es6-module-loader.min.js",
            "dist/src/vendor/system.min.js",
            "dist/src/app/**/*.js",
            "dist/test/unit/util/**/*.js",
            "dist/test/unit/**/*.spec.js",
            "test/unit/config/karma.bootstrap.js"
        ],
        browsers: Object.keys(customLaunchers),
        customLaunchers: customLaunchers,
        sauceLabs: {
            username: "vanpeerdevelopment",
            accessKey: process.env.SAUCE_ACCESS_KEY,
            build: `Front-End-Food (Travis #${process.env.TRAVIS_BUILD_NUMBER})`,
            testName: "Front-End-Food Unit Tests",
            tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
        },
        frameworks: [
            "mocha",
            "chai-sinon"
        ],
        reporters: ["mocha", "saucelabs"],
        plugins: [
            "karma-sauce-launcher",
            "karma-mocha",
            "karma-chai-sinon",
            "karma-mocha-reporter"
        ],
        port: 9876,
        singleRun: true,
        concurrency: 5,
        captureTimeout: 200000
    });
};
