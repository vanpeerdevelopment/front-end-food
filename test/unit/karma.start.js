/* eslint-disable */

__karma__.loaded = function() {};

System.config({
    map: moduleNamesToPath()
});

var importPromises = testModuleNames().map(importModule);

Promise.all(importPromises).then(startKarma);

function moduleNamesToPath(){
    var result = {};
    testModuleNameToPathMapping().forEach(function(mapping){
        result[mapping.name] = mapping.path;
    });
    return result;
}

function testModuleNameToPathMapping(){
    return Object.keys(window.__karma__.files)
        .filter(hasFileAsOwnProperty)
        .filter(isUnitTestSpecJs)
        .map(toTestModuleNamePathMapping);
}

function toTestModuleNamePathMapping(file){
    return {
        name: file.match(/^\/base\/test\/unit\/(.*).js$/)[1],
        path: file
    };
}

function testModuleNames(){
    return Object.keys(window.__karma__.files)
        .filter(hasFileAsOwnProperty)
        .filter(isUnitTestSpecJs)
        .map(toTestModuleName);
}

function toTestModuleName(file){
    return file.match(/^\/base\/test\/unit\/(.*).js$/)[1];
}

function hasFileAsOwnProperty(file){
    return window.__karma__.files.hasOwnProperty(file);
}

function isUnitTestSpecJs(file){
    return /^\/base\/test\/unit\/(.*).spec.js$/.test(file);
}

function importModule(name){
    return System.import(name);
}

function startKarma(){
    window.__karma__.start();
}
