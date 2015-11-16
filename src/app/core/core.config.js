angular
    .module("app.core")
    .config(configureTemplateMapping);

function configureTemplateMapping($componentLoaderProvider) {
    function camelCaseToDashCase(name) {
        return name.replace(/([A-Z])/g, function capitalToDash($1) {
            return "-" + $1.toLowerCase();
        });
    }

    $componentLoaderProvider.setTemplateMapping(function toTemplatePath(name) {
        return "./app/" + camelCaseToDashCase(name) + "/" + camelCaseToDashCase(name) + ".html";
    });
}

configureTemplateMapping.$inject = ["$componentLoaderProvider"];
