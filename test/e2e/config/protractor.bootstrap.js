/* global require */
/* eslint prefer-arrow-callback: 0 */

require("../../../dist/src/vendor/polyfill.min.js");
require("../../../dist/src/vendor/es6-module-loader.min.js");
require("../../../dist/src/vendor/system.min.js");
require("../../../dist/test/e2e/e2e.js");

describe("protractor", function tests() {
    it("should bootstrap", function shouldBootstrap() {
        return Promise.all([
            System.import("spec/e2e.spec")
        ]);
    });
});
