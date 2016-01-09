/* global module */
/* eslint no-var:0 */

module.exports = function KarmaConfigBuilder() {
    this.commonConfig = {
        basePath: "../../..",
        files: [
            "dist/src/vendor/js/polyfill.min.js",
            "dist/src/vendor/js/es6-module-loader.min.js",
            "dist/src/vendor/js/system.min.js",
            "dist/src/app/**/*.js",
            "dist/test/unit/util/**/*.js",
            "dist/test/unit/**/*.spec.js",
            "test/unit/config/karma.bootstrap.js",
            {
                pattern: "dist/**/*.js.map",
                watched: false,
                included: false
            }
        ],
        browsers: [],
        frameworks: [
            "mocha",
            "chai-sinon"
        ],
        reporters: ["mocha"],
        plugins: [
            "karma-mocha",
            "karma-chai-sinon",
            "karma-mocha-reporter"
        ],
        port: 9876
    };

    this.withBrowser = function withBrowser(browser) {
        this.commonConfig.browsers.push(browser);
        return this;
    };

    this.withBrowsers = function withBrowser(browsers) {
        this.commonConfig.browsers = this.commonConfig.browsers.concat(browsers);
        return this;
    };

    this.withCustomLaunchers = function withCustomLaunchers(launchers) {
        this.commonConfig.customLaunchers = launchers;
        return this;
    };

    this.withReporter = function withReporter(reporter) {
        this.commonConfig.reporters.push(reporter);
        return this;
    };

    this.withPlugin = function withPlugin(plugin) {
        this.commonConfig.plugins.push(plugin);
        return this;
    };

    this.withSauceLabsConfig = function withSauceLabsConfig(config) {
        this.commonConfig.sauceLabs = config;
        return this;
    };

    this.withConcurrency = function withConcurrency(concurrency) {
        this.commonConfig.concurrency = concurrency;
        return this;
    };

    this.withCaptureTimeout = function withCaptureTimeout(timeout) {
        this.commonConfig.captureTimeout = timeout;
        return this;
    };

    this.build = function build() {
        return this.commonConfig;
    };
};
