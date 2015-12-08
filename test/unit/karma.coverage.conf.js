/* global module*/

module.exports = function configure(config) {
    config.set({
        basePath: "../..",
        files: [
            "dist/src/vendor/polyfill.min.js",
            "dist/src/vendor/es6-module-loader.min.js",
            "dist/src/vendor/system.min.js",
            "dist/src/app/**/*.js",
            "dist/test/unit/**/*.spec.js",
            {
                pattern: "dist/**/*.js.map",
                watched: false,
                included: false
            },
            "test/unit/karma.bootstrap.js"
        ],
        preprocessors: {
            "dist/src/app/**/*.js": ["coverage"]
        },
        browsers: ["PhantomJS"],
        frameworks: [
            "mocha",
            "chai-sinon"
        ],
        reporters: ["mocha", "coverage"],
        coverageReporter: {
            type: "html",
            dir: "dist/test/unit/coverage",
            subdir: "report",
            includeAllSources: true
        },
        plugins: [
            "karma-coverage",
            "karma-phantomjs-launcher",
            "karma-mocha",
            "karma-chai-sinon",
            "karma-mocha-reporter"
        ],
        port: 9876
    });
};
