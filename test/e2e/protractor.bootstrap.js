/* eslint prefer-arrow-callback: 0 */

describe("protractor", function tests() {
    it("should bootstrap", function shouldBootstrap() {
        return Promise.all([
            System.import("spec/e2e.spec")
        ]);
    });
});
