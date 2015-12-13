/* globals exports, require */
/* eslint global-require: 0 */

exports.config = {
    framework: "mocha",
    mochaOpts: {
        reporter: "spec",
        slow: 3000,
        timeout: 5000
    },

    seleniumServerJar: "../../node_modules/protractor/selenium/selenium-server-standalone-2.48.2.jar",
    capabilities: {
        browserName: "firefox"
    },

    beforeLaunch: function beforeLaunch() {
        require("../../dist/src/vendor/polyfill.min.js");
        require("../../dist/src/vendor/es6-module-loader.min.js");
        require("../../dist/src/vendor/system.min.js");
        require("../../dist/test/e2e/e2e.js");
    },

    baseUrl: "http://localhost:3000",
    specs: ["protractor.bootstrap.js"]
};
