/* eslint no-unused-vars: 0 */

import ngDeannotate from "util/testutil";
import RouteControllerAnnotated from "app.route";

describe("RouteController", () => {
    let router;
    let RouteController;

    beforeEach(() => {
        RouteController = ngDeannotate(RouteControllerAnnotated);
        router = {
            configuration: null,
            config(configuration) {
                this.configuration = configuration;
            }
        };
    });

    it("should configure router", () => {
        let routerMock = sinon
            .mock(router)
            .expects("config").once();

        let routeController = new RouteController(router);

        routerMock.verify();
    });

    it("should route home", () => {
        let routeController = new RouteController(router);

        router.configuration.should.deep.include.members([{
            path: "/",
            component: "home"
        }]);
    });
});
