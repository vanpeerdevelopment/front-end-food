import HomePage from "page/home.page";

describe("Front End Food", () => {
    it("should have a title", () => {
        HomePage
            .open()
            .assertBrowserTitle()
            .assertPageTitle()
            .assertSum();
    });
});
