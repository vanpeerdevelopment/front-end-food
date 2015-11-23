export default class RouteController {

    constructor($router) {
        "ngInject";
        $router.config([{
            path: "/",
            component: "home"
        }]);
    }
}
