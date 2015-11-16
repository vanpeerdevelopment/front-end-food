"use strict";

angular.module("app.core").config(configureTemplateMapping);

function configureTemplateMapping($componentLoaderProvider) {
    var camelCaseToDashCase = function camelCaseToDashCase(name) {
        return name.replace(/([A-Z])/g, function ($1) {
            return "-" + $1.toLowerCase();
        });
    };

    $componentLoaderProvider.setTemplateMapping(function (name) {
        return "./app/" + camelCaseToDashCase(name) + "/" + camelCaseToDashCase(name) + ".html";
    });
}

configureTemplateMapping.$inject = ["$componentLoaderProvider"];