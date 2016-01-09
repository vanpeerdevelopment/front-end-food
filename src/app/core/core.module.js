import templateMappingConfig from "core/core.config";

export default angular
    .module("app.core", [

        /* angular modules */
        "ngNewRouter",
        "ngMaterial"

        /* 3rd-party modules */

        /* cross-app modules */
    ])
    .config(templateMappingConfig);
