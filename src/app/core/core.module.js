import templateMappingConfig from "./core.config.js";

export default angular
    .module("app.core", [

        /* angular modules */
        "ngNewRouter"

        /* 3rd-party modules */

        /* cross-app modules */
    ])
    .config(templateMappingConfig);
