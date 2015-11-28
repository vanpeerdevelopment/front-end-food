describe("Karma with Mocha with Chai", function karmaWithMochaWithChai() {
    it("should work", function shouldWork() {});

    it("should have access to Chai", function shouldChai() {
        [1, 2, 3].should.have.length(3);
    });
});
