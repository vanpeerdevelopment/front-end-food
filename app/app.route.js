function RouteController($router) {
    $router.config([{
        path: "/",
        component: "home"
    }]);
}

angular
    .module("app")
    .controller("RouteController", RouteController);
