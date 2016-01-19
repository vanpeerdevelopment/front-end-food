export default $mdThemingProvider => {
    "ngInject";
    $mdThemingProvider
        .theme("default")
        .primaryPalette("brown", {
            "default": "500",
            "hue-1": "100",
            "hue-2": "700",
            "hue-3": "900"
        })
        .accentPalette("deep-orange", {
            "default": "A200",
            "hue-1": "A100",
            "hue-2": "A400",
            "hue-3": "A700"
        })
        .warnPalette("amber", {
            "default": "500",
            "hue-1": "100",
            "hue-2": "700",
            "hue-3": "900"
        });
};
