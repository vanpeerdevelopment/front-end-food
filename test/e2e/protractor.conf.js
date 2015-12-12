/* globals exports */

exports.config = {
    framework: "mocha",
    mochaOpts: {
        reporter: "spec",
        slow: 3000,
        timeout: 5000
    },

    baseUrl: "http://localhost:3000",
    specs: ["protractor.spec.js"],

    seleniumServerJar: "../../node_modules/protractor/selenium/selenium-server-standalone-2.48.2.jar",
    capabilities: {
        browserName: "firefox"
    }
};
