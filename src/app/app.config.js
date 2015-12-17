export let disableDebugInfo = $compileProvider => {
    "ngInject";
    $compileProvider.debugInfoEnabled(false);
};
