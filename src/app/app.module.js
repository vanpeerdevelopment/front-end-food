import CoreModule from "core/core.module";
import WidgetsModule from "widgets/widgets.module";
import LayoutModule from "layout/layout.module";
import HomeModule from "home/home.module";
import disableDebugInfo from "app.config";
import RouteController from "app.route";

export default angular
    .module("app", [

        /* shared modules */
        CoreModule.name,
        WidgetsModule.name,

        /* feature areas */
        LayoutModule.name,
        HomeModule.name
    ])
    .config(disableDebugInfo)
    .controller("RouteController", RouteController);
