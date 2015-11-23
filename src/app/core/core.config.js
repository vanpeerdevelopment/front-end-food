let camelToDash = name => {
    const UPPERCASE = /([A-Z])/g;
    let upperCaseToDashLowerCase = $1 => `-${$1.toLowerCase()}`;

    return name.replace(UPPERCASE, upperCaseToDashLowerCase);
};

export default $componentLoaderProvider => {
    "ngInject";
    $componentLoaderProvider
        .setTemplateMapping(name => `./app/${camelToDash(name)}/${camelToDash(name)}.html`);
};
