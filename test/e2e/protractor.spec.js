/* globals require */
/* eslint no-var:0 no-shadow:0, vars-on-top: 0 */

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
var expect = chai.expect;

describe("Front End Food", function frontEndFood() {
    it("should have a title", function shouldHaveTitle() {
        browser.get("http://localhost:3000");

        expect(browser.getTitle()).to.eventually.equal("Front End Food");
        expect(element(by.binding("home.title")).getText()).to.eventually.equal("Front End Food");
        expect(element(by.tagName("p")).getText()).to.eventually.equal("Angular is working: 1 + 1 = 2");
    });
});
