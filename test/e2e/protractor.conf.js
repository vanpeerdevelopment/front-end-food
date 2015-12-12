/* globals exports */

exports.config = {
    framework: "jasmine",
    seleniumAddress: "http://localhost:4444/wd/hub",
    specs: ["protractor.spec.js"],
    capabilities: {
        browserName: "firefox"
    }
};
