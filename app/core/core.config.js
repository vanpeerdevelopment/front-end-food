"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var templateMappingConfig = function templateMappingConfig($componentLoaderProvider) {
    var camelToDash = function camelToDash(name) {
        var UPPERCASE = /([A-Z])/g;
        var upperCaseToDashLowerCase = function upperCaseToDashLowerCase($1) {
            return "-" + $1.toLowerCase();
        };

        return name.replace(UPPERCASE, upperCaseToDashLowerCase);
    };

    $componentLoaderProvider.setTemplateMapping(function (name) {
        return "./app/" + camelToDash(name) + "/" + camelToDash(name) + ".html";
    });
};

templateMappingConfig.$inject = ["$componentLoaderProvider"];

exports.default = templateMappingConfig;