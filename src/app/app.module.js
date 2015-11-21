import RouteController from "./app.route.js";
import CoreModule from "./core/core.module.js";
import WidgetsModule from "./widgets/widgets.module.js";
import LayoutModule from "./layout/layout.module.js";
import HomeModule from "./home/home.module.js";

angular
    .module("app", [

        /* shared modules */
        CoreModule.name,
        WidgetsModule.name,

        /* feature areas */
        LayoutModule.name,
        HomeModule.name
    ])
    .controller("RouteController", RouteController);
