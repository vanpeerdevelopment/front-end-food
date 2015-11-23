export let disableDebugInfo = $compileProvider => {
    "ngInject";
    $compileProvider.debugInfoEnabled(false);
};

export let enableHtml5Mode = $locationProvider => {
    "ngInject";
    $locationProvider.html5Mode(true);
};
