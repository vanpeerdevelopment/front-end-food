class RouteController {

    constructor($router) {
        $router.config([{
            path: "/",
            component: "home"
        }]);
    }
}

RouteController.$inject = ["$router"];

export default RouteController;
