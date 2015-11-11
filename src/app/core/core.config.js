angular
    .module('app.core')
    .config(configureTemplateMapping);

function configureTemplateMapping($componentLoaderProvider) {
    var camelCaseToDashCase = function(name) {
        return name.replace(/([A-Z])/g, function($1) {
            return '-' + $1.toLowerCase();
        });
    }
    $componentLoaderProvider.setTemplateMapping(function(name) {
        var dashCasedName = camelCaseToDashCase(name);
        return './app/' + dashCasedName + '/' + dashCasedName + '.html';
    })
}
