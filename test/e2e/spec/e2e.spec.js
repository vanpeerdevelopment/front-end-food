import HomePage from "page/home.page";

describe("Front End Food", () => {
    beforeEach(() => {
        browser.ignoreSynchronization = true;
    });

    it("should have a title", () => {
        HomePage
            .open()
            .assertBrowserTitle()
            .assertNumberOfRecipes();
    });
});
