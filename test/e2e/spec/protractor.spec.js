/* globals require */

let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
let expect = chai.expect;

describe("Front End Food", () => {
    it("should have a title", () => {
        browser.get("");

        expect(browser.getTitle()).to.eventually.equal("Front End Food");
        expect(element(by.binding("home.title")).getText()).to.eventually.equal("Front End Food");
        expect(element(by.tagName("p")).getText()).to.eventually.equal("Angular is working: 1 + 1 = 2");
    });
});
