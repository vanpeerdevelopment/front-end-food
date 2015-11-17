"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RouteController = function RouteController($router) {
    _classCallCheck(this, RouteController);

    $router.config([{
        path: "/",
        component: "home"
    }]);
};

RouteController.$inject = ["$router"];

angular.module("app").controller("RouteController", RouteController);