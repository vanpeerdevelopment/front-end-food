"use strict";

var _appRoute = require("./app.route.js");

var _appRoute2 = _interopRequireDefault(_appRoute);

var _coreModule = require("./core/core.module.js");

var _coreModule2 = _interopRequireDefault(_coreModule);

var _widgetsModule = require("./widgets/widgets.module.js");

var _widgetsModule2 = _interopRequireDefault(_widgetsModule);

var _layoutModule = require("./layout/layout.module.js");

var _layoutModule2 = _interopRequireDefault(_layoutModule);

var _homeModule = require("./home/home.module.js");

var _homeModule2 = _interopRequireDefault(_homeModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module("app", [

/* shared modules */
_coreModule2.default.name, _widgetsModule2.default.name,

/* feature areas */
_layoutModule2.default.name, _homeModule2.default.name]).controller("RouteController", _appRoute2.default);