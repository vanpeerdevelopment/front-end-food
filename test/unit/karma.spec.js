/* eslint no-unused-expressions: 0 */

describe("Karma", () => {
    it("should work with Mocha", () => {});

    it("should work with Chai", () =>
        [1, 2, 3].should.have.length(3)
    );

    it("should work with Sinon", () => {
        let addMock = sinon.spy();

        addMock(1, 2);

        addMock.calledWith(1, 2).should.be.ok;
    });

    it("should work with Sinon-Chai", () => {
        let addMock = sinon.spy();

        addMock(1, 2);

        addMock.should.have.been.calledWith(1, 2);
    });
});
