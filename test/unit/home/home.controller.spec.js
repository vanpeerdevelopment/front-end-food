import HomeController from "home/home.controller";

describe("HomeController", () => {
    let homeController;

    beforeEach(() => homeController = new HomeController());

    describe("#activate()", () =>
        it("should initialize minimum number of recipes", () => {
            homeController.activate();

            homeController.minNbOfRecipes.should.equal(10);
        })
    );
});
