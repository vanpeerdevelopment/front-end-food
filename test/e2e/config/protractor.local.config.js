/* global exports, require */
/* eslint no-var: 0 */

var ProtractorConfigBuilder = require("./protractor.common.config");

var localSeleniumServer = "../../../node_modules/protractor/selenium/selenium-server-standalone-2.48.2.jar";
var firefoxCapability = {
    browserName: "firefox"
};

exports.config = new ProtractorConfigBuilder()
    .withSeleniumServerJar(localSeleniumServer)
    .withCapabilities(firefoxCapability)
    .build();
