/* eslint no-unused-expressions: 0 */

describe("Karma", function karma() {
    it("should work with Mocha", function shouldMocha() {});

    it("should work with Chai", function shouldChai() {
        [1, 2, 3].should.have.length(3);
    });

    it("should work with Sinon", function shouldSinon() {
        var addMock = sinon.spy();

        addMock(1, 2);

        addMock.calledWith(1, 2).should.be.ok;
    });

    it("should work with Sinon-Chai", function shouldSinonChai() {
        var addMock = sinon.spy();

        addMock(1, 2);

        addMock.should.have.been.calledWith(1, 2);
    });
});
