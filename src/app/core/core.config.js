angular
    .module("app.core")
    .config(configureTemplateMapping);

let configureTemplateMapping = $componentLoaderProvider => {
    let camelCaseToDashCase = name => name.replace(/([A-Z])/g, $1 => "-" + $1.toLowerCase());

    $componentLoaderProvider
        .setTemplateMapping(name => "./app/" + camelCaseToDashCase(name) + "/" + camelCaseToDashCase(name) + ".html");
};

configureTemplateMapping.$inject = ["$componentLoaderProvider"];
