export const disableDebugInfo = $compileProvider => {
    "ngInject";
    $compileProvider.debugInfoEnabled(false);
};

export const enableHtml5Mode = $locationProvider => {
    "ngInject";
    $locationProvider.html5Mode(true);
};
