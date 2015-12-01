import HomeController from "home/home.controller";

describe("HomeController", () => {
    let homeController;

    beforeEach(() => homeController = new HomeController());

    describe("#activate()", () =>
        it("should initialize title", () => {
            homeController.activate();

            homeController.title.should.equal("Front End Food");
        })
    );
});
