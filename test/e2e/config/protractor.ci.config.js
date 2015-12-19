/* global exports, require, process */
/* eslint
        no-var: 0 ,
        no-process-env: 0 */

var ProtractorConfigBuilder = require("./protractor.common.config");

var chromeCapability = {
    "browserName": "chrome",
    "version": "45",
    "os": "Linux",
    "name": "Front-End-Food E2E Tests",
    "build": `Front-End-Food (Travis #${process.env.TRAVIS_BUILD_NUMBER})`,
    "tunnel-identifier": process.env.TRAVIS_JOB_NUMBER
};

exports.config = new ProtractorConfigBuilder()
    .withSauceUsername(process.env.SAUCE_USERNAME)
    .withSauceAccessKey(process.env.SAUCE_ACCESS_KEY)
    .withCapabilities(chromeCapability)
    .build();
