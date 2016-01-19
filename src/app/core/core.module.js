import routerConfig from "core/core.router.config";
import materialConfig from "core/core.material.config";

export default angular
    .module("app.core", [

        /* angular modules */
        "ngNewRouter",
        "ngMaterial"

        /* 3rd-party modules */

        /* cross-app modules */
    ])
    .config(routerConfig)
    .config(materialConfig);
