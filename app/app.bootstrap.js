"use strict";

/* global document */

System.config({
    baseURL: "/app"
});

System.import("app.module.js").then(function () {
    return angular.element(document).ready(function () {
        return angular.bootstrap(document, ["app"]);
    });
});
//# sourceMappingURL=app.bootstrap.js.map
