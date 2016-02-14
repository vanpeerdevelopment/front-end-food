/* global exports, require */
/* eslint no-var: 0 */

var ProtractorConfigBuilder = require("./protractor.common.config");

var localSeleniumServer = "../../../node_modules/protractor/selenium/selenium-server-standalone-2.51.0.jar";
var chromeDriver = "../../../node_modules/protractor/selenium/chromedriver";

exports.config = new ProtractorConfigBuilder()
    .withSeleniumServerJar(localSeleniumServer)
    .withChromeDriver(chromeDriver)
    .build();
