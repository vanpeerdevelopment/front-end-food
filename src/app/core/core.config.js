let templateMappingConfig = $componentLoaderProvider => {
    let camelToDash = name => {
        const UPPERCASE = /([A-Z])/g;
        let upperCaseToDashLowerCase = $1 => `-${$1.toLowerCase()}`;

        return name.replace(UPPERCASE, upperCaseToDashLowerCase);
    };

    $componentLoaderProvider
        .setTemplateMapping(name => `./app/${camelToDash(name)}/${camelToDash(name)}.html`);
};

templateMappingConfig.$inject = ["$componentLoaderProvider"];

export default templateMappingConfig;
