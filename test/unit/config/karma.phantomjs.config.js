/* global module, require */
/* eslint no-var: 0 */

var KarmaConfigBuilder = require("./karma.common.config");

module.exports = function configure(config) {
    config.set(
        new KarmaConfigBuilder()
            .withBrowser("PhantomJS")
            .withPlugin("karma-phantomjs-launcher")
            .build());
};
