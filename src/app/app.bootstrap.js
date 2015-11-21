/* global document */

System.config({
    baseURL: "/app"
});

System
    .import("app.module.js")
    .then(() =>
        angular
        .element(document)
        .ready(() => angular.bootstrap(document, ["app"]))
    );
