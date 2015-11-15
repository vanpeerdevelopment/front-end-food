function HomeController() {}

HomeController.prototype.activate = function activate() {
    this.title = "Front End Food";
};

angular
    .module("app.home")
    .controller("HomeController", HomeController);
