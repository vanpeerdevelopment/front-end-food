import expect from "config/chai.config";

export default class HomePage {

    constructor() {
        browser.get("");
        browser.wait(() => element(by.id("number-recipes")).isPresent(), 1000);
    }

    assertBrowserTitle() {
        expect(browser.getTitle()).to.eventually.equal("Front End Food");
        return this;
    }

    assertNumberOfRecipes() {
        expect(element(by.id("number-recipes")).getText())
            .to.eventually.equal("Op deze pagina zullen binnenkort minstens 10 recepten staan.");
        return this;
    }

    static open() {
        return new HomePage();
    }
}
