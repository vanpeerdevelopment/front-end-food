/* globals __karma__ */
/* eslint no-underscore-dangle: 0 */

(() => {
    let disableKarmaAutoStartUp = () => {
        __karma__.loaded = () => {};
    };

    let importTestFiles = () => {
        return Object.keys(__karma__.files)
            .filter(filePath => __karma__.files.hasOwnProperty(filePath))
            .filter(filePath => (/^\/base\/dist\/test\/unit\/(.*).spec.js$/).test(filePath))
            .map(filePath => filePath.match(/^\/base\/dist\/test\/unit\/(.*).js$/)[1])
            .map(testModuleName => {
                return System.import(testModuleName);
            });
    };

    let startKarma = importTestFilePromises => {
        Promise
            .all(importTestFilePromises)
            .then(
                () => __karma__.start(),
                error => __karma__.error(error.stack || error));
    };

    disableKarmaAutoStartUp();
    startKarma(importTestFiles());
})();
