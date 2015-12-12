describe("Front End Food", function frontEndFood() {
    it("should have a title", function shouldHaveTitle() {
        browser.get("http://localhost:3000");

        expect(browser.getTitle()).toEqual("Front End Food");
        expect(element(by.binding("home.title")).getText()).toEqual("Front End Food");
        expect(element(by.tagName("p")).getText()).toEqual("Angular is working: 1 + 1 = 2");
    });
});
