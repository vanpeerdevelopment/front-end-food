angular
    .module("app")
    .controller("RouteController", RouteController);

function RouteController($router) {
    $router.config([{
        path: "/",
        component: "home"
    }]);
}
