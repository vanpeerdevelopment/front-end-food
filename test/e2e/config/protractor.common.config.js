/* global module, require */
/* eslint global-require: 0 */

module.exports = function ProtractorConfigBuilder() {
    this.commonConfig = {
        framework: "mocha",
        mochaOpts: {
            reporter: "spec",
            slow: 3000,
            timeout: 5000
        },

        beforeLaunch: function beforeLaunch() {
            require("../../../dist/src/vendor/polyfill.min.js");
            require("../../../dist/src/vendor/es6-module-loader.min.js");
            require("../../../dist/src/vendor/system.min.js");
            require("../../../dist/test/e2e/e2e.js");
        },

        baseUrl: "http://localhost:3000",
        specs: ["protractor.bootstrap.js"]
    };

    this.withSeleniumServerJar = function withSeleniumServerJar(location) {
        this.commonConfig.seleniumServerJar = location;
        return this;
    };

    this.withCapabilities = function withCapabilities(capabilities) {
        this.commonConfig.capabilities = capabilities;
        return this;
    };

    this.build = function build() {
        return this.commonConfig;
    };
};
