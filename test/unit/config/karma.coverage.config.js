/* global module */

module.exports = function configure(config) {
    config.set({
        basePath: "../../..",
        files: [
            "dist/src/vendor/js/polyfill.min.js",
            "dist/src/vendor/js/es6-module-loader.min.js",
            "dist/src/vendor/js/system.min.js",
            "src/app/**/*.js",
            "dist/test/unit/util/**/*.js",
            "dist/test/unit/**/*.spec.js",
            "test/unit/config/karma.bootstrap.js"
        ],
        preprocessors: {
            "src/app/**/*.module.js": ["babel"],
            "src/app/**/!(*.module).js": ["babel", "coverage"]
        },
        babelPreprocessor: {
            options: {
                moduleIds: true,
                presets: ["es2015"],
                plugins: ["transform-es2015-modules-systemjs"]
            },
            filenameRelative: function filenameRelative(file) {
                return file.originalPath.substring(file.originalPath.indexOf("src/app/") + "src/app/".length);
            }
        },
        browsers: ["PhantomJS"],
        frameworks: [
            "mocha",
            "chai-sinon"
        ],
        reporters: ["mocha", "coverage"],
        coverageReporter: {
            type: "lcovonly",
            dir: "dist/test/unit/coverage",
            subdir: "report",
            includeAllSources: true
        },
        plugins: [
            "karma-babel-preprocessor",
            "karma-phantomjs-launcher",
            "karma-mocha",
            "karma-chai-sinon",
            "karma-mocha-reporter",
            "karma-coverage"
        ],
        port: 9876
    });
};
