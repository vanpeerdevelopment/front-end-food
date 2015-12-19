/* global module */
/* eslint no-var:0 */

module.exports = function KarmaConfigBuilder() {
    this.commonConfig = {
        basePath: "../../..",
        files: [
            "dist/src/vendor/polyfill.min.js",
            "dist/src/vendor/es6-module-loader.min.js",
            "dist/src/vendor/system.min.js",
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

    this.withPlugin = function withPlugin(plugin) {
        this.commonConfig.plugins.push(plugin);
        return this;
    };

    this.build = function build() {
        return this.commonConfig;
    };
};
