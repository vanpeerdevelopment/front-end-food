/* globals exports */

exports.config = {
    baseUrl: "http://localhost:3000",
    framework: "mocha",
    mochaOpts: {
        reporter: "spec",
        slow: 3000,
        timeout: 5000
    },
    seleniumServerJar: "../../node_modules/protractor/selenium/selenium-server-standalone-2.48.2.jar",
    specs: ["protractor.spec.js"],
    capabilities: {
        browserName: "firefox"
    }
};
