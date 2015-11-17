class RouteController {

    constructor($router) {
        $router.config([{
            path: "/",
            component: "home"
        }]);
    }
}

RouteController.$inject = ["$router"];

angular
    .module("app")
    .controller("RouteController", RouteController);
