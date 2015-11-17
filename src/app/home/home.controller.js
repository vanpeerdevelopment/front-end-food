class HomeController {

    constructor() {}

    activate() {
        this.title = "Front End Food";
    }
}

angular
    .module("app.home")
    .controller("HomeController", HomeController);
