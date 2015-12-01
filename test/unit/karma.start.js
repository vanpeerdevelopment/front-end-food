/* globals __karma__ */
/* eslint no-underscore-dangle: 0 */

(() => {
    let disableKarmaAutoStartUp = () => {
        __karma__.loaded = () => {};
    };

    let configureSystemJS = () => {
        let testModuleNameToPath = {};

        Object.keys(__karma__.files)
            .filter(filePath => __karma__.files.hasOwnProperty(filePath))
            .filter(filePath => (/^\/base\/test\/unit\/(.*).spec.js$/).test(filePath))
            .map(filePath => {
                return {
                    name: filePath.match(/^\/base\/test\/unit\/(.*).js$/)[1],
                    path: filePath
                };
            })
            .forEach(entry => testModuleNameToPath[entry.name] = entry.path);

        System.config({
            map: testModuleNameToPath
        });
    };

    let importTestFiles = () => {
        return Object.keys(__karma__.files)
            .filter(filePath => __karma__.files.hasOwnProperty(filePath))
            .filter(filePath => (/^\/base\/test\/unit\/(.*).spec.js$/).test(filePath))
            .map(filePath => filePath.match(/^\/base\/test\/unit\/(.*).js$/)[1])
            .map(testModuleName => System.import(testModuleName));
    };

    let startKarma = importTestFilePromises => {
        Promise
            .all(importTestFilePromises)
            .then(
                () => __karma__.start(),
                error => __karma__.error(error.stack || error));
    };

    disableKarmaAutoStartUp();
    configureSystemJS();
    startKarma(importTestFiles());
})();
