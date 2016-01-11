/* global exports, require, process */
/* eslint
        no-var: 0 ,
        no-process-env: 0 */

var ProtractorConfigBuilder = require("./protractor.common.config");

var capabilities = [
    {
        "browserName": "chrome",
        "version": "45",
        "os": "Linux",
        "name": "Front-End-Food E2E Tests",
        "build": `Front-End-Food (Travis #${process.env.TRAVIS_BUILD_NUMBER})`,
        "tunnel-identifier": process.env.TRAVIS_JOB_NUMBER
    },
    {
        "browserName": "firefox",
        "version": "42",
        "os": "Linux",
        "name": "Front-End-Food E2E Tests",
        "build": `Front-End-Food (Travis #${process.env.TRAVIS_BUILD_NUMBER})`,
        "tunnel-identifier": process.env.TRAVIS_JOB_NUMBER
    },
    {
        "browserName": "firefox",
        "version": "42",
        "os": "Windows 10",
        "name": "Front-End-Food E2E Tests",
        "build": `Front-End-Food (Travis #${process.env.TRAVIS_BUILD_NUMBER})`,
        "tunnel-identifier": process.env.TRAVIS_JOB_NUMBER
    },
    {
        "browserName": "internet explorer",
        "version": "11",
        "os": "Windows 10",
        "name": "Front-End-Food E2E Tests",
        "build": `Front-End-Food (Travis #${process.env.TRAVIS_BUILD_NUMBER})`,
        "tunnel-identifier": process.env.TRAVIS_JOB_NUMBER
    },
    {
        "browserName": "safari",
        "version": "9",
        "os": "OS X El Capitan 10.11",
        "name": "Front-End-Food E2E Tests",
        "build": `Front-End-Food (Travis #${process.env.TRAVIS_BUILD_NUMBER})`,
        "tunnel-identifier": process.env.TRAVIS_JOB_NUMBER
    }
];

exports.config = new ProtractorConfigBuilder()
    .withSauceUsername(process.env.SAUCE_USERNAME)
    .withSauceAccessKey(process.env.SAUCE_ACCESS_KEY)
    .withMultiCapabilities(capabilities)
    .withMaxSessions(5)
    .build();
