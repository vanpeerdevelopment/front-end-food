angular
    .module("app.home")
    .controller("HomeController", HomeController);

function HomeController() {}

HomeController.prototype.activate = function() {
    this.title = "Front End Food";
};
