/* globals exports */

exports.config = {
    framework: "jasmine",
    seleniumServerJar: "../../node_modules/protractor/selenium/selenium-server-standalone-2.48.2.jar",
    specs: ["protractor.spec.js"],
    capabilities: {
        browserName: "firefox"
    }
};
