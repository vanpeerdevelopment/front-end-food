/* global module, require, process */
/* eslint
    babel/object-shorthand: 0
    no-var: 0,
    no-process-env: 0 */

var KarmaConfigBuilder = require("./karma.common.config");

var browsers = {
    launchers: {
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
    },
    names: function names() {
        return Object.keys(this.launchers);
    }
};

var sauceLabsConfig = {
    username: "vanpeerdevelopment",
    accessKey: process.env.SAUCE_ACCESS_KEY,
    build: `Front-End-Food (Travis #${process.env.TRAVIS_BUILD_NUMBER})`,
    testName: "Front-End-Food Unit Tests",
    tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
};

module.exports = function configure(config) {
    config.set(
        new KarmaConfigBuilder()
            .withBrowsers(browsers.names())
            .withCustomLaunchers(browsers.launchers)
            .withSauceLabsConfig(sauceLabsConfig)
            .withReporter("saucelabs")
            .withPlugin("karma-sauce-launcher")
            .withConcurrency(5)
            .withCaptureTimeout(200000)
            .build());
};
