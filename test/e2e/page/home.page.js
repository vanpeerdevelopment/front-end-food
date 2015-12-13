import expect from "config/chai.config";

export default class HomePage {

    constructor() {
        browser.get("");
    }

    assertBrowserTitle() {
        expect(browser.getTitle()).to.eventually.equal("Front End Food");
        return this;
    }

    assertPageTitle() {
        expect(element(by.binding("home.title")).getText()).to.eventually.equal("Front End Food");
        return this;
    }

    assertSum() {
        expect(element(by.tagName("p")).getText()).to.eventually.equal("Angular is working: 1 + 1 = 2");
        return this;
    }

    static open() {
        return new HomePage();
    }
}
