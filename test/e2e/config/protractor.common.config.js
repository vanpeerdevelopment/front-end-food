/* global module */
/* eslint global-require: 0 */

module.exports = function ProtractorConfigBuilder() {
    this.commonConfig = {
        framework: "mocha",
        mochaOpts: {
            reporter: "spec",
            slow: 15000,
            timeout: 30000
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

    this.withMultiCapabilities = function withMultiCapabilities(multiCapabilities) {
        this.commonConfig.multiCapabilities = multiCapabilities;
        return this;
    };

    this.withSauceUsername = function withSauceUsername(username) {
        this.commonConfig.sauceUser = username;
        return this;
    };

    this.withSauceAccessKey = function withSauceAccessKey(accessKey) {
        this.commonConfig.sauceKey = accessKey;
        return this;
    };

    this.withMaxSessions = function withMaxSessions(nbSessions) {
        this.commonConfig.maxSessions = nbSessions;
        return this;
    };

    this.build = function build() {
        return this.commonConfig;
    };
};
