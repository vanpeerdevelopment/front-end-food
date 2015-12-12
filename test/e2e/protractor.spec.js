describe("Front End Food", function frontEndFood() {
    it("should have a title", function shouldHaveTitle() {
        browser.get("http://localhost:3000");

        expect(browser.getTitle()).toEqual("Front End Food");
    });
});
