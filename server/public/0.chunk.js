webpackJsonp([0],{

/***/ "../../../../../src/app/home/home.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__material_material_module__ = __webpack_require__("../../../../../src/app/material/material.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home_component__ = __webpack_require__("../../../../../src/app/home/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_routes__ = __webpack_require__("../../../../../src/app/home/home.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_app_service__ = __webpack_require__("../../../../../src/app/home/home/app.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeModule", function() { return HomeModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var HomeModule = (function () {
    function HomeModule() {
    }
    return HomeModule;
}());
HomeModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["h" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__material_material_module__["a" /* MaterialModule */],
            __WEBPACK_IMPORTED_MODULE_5__home_routes__["a" /* default */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_6__home_app_service__["a" /* AppService */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_4__home_home_component__["a" /* HomeComponent */]]
    })
], HomeModule);

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ "../../../../../src/app/home/home.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home_component__ = __webpack_require__("../../../../../src/app/home/home/home.component.ts");


var routes = [
    {
        path: "", component: __WEBPACK_IMPORTED_MODULE_1__home_home_component__["a" /* HomeComponent */]
    }
];
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* RouterModule */].forChild(routes));
//# sourceMappingURL=home.routes.js.map

/***/ }),

/***/ "../../../../../src/app/home/home/app.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operator_map__ = __webpack_require__("../../../../rxjs/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppService = (function () {
    function AppService(http) {
        this.http = http;
    }
    AppService.prototype.getApplication = function (userId) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiUrl + "/app/" + userId);
    };
    AppService.prototype.createApp = function (appData) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiUrl + "/app/new", appData);
    };
    AppService.prototype.delete = function (appId) {
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiUrl + "/app/" + appId);
    };
    return AppService;
}());
AppService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */]) === "function" && _a || Object])
], AppService);

var _a;
//# sourceMappingURL=app.service.js.map

/***/ }),

/***/ "../../../../../src/app/home/home/home.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container md-card{\n    float: left;\n    min-width: 250px;\n    cursor: pointer;\n    margin: 20px;\n}\n\n.container:after{\n    clear: both;\n    display: table;\n    zoom: 1;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<md-toolbar>\n  Welcome {{userService.currentUser.profile.firstName}}\n</md-toolbar>\n<div class=\"container\">\n  <md-card *ngFor=\"let app of applications\">\n    <md-card-title>{{app.name}}</md-card-title>\n    <md-card-content>\n      AppId: &nbsp; {{app._id}}\n    </md-card-content>\n    <md-card-actions>\n      <button md-button (click)=\"deleteApp(app._id)\">Delete</button>\n    </md-card-actions>\n  </md-card>\n  <!-- <md-card>\n    <md-card-title (click)=\"openNewAppDialog()\">\n      <i class=\"material-icons\">storage</i>\n      <span>Create New</span>\n    </md-card-title>\n  </md-card> -->\n  <md-card id=\"newapp\">\n    <md-card-title>\n      Create New App\n    </md-card-title>\n    <md-card-content>\n      <md-input-container>\n        <input mdInput type=\"text\" name=\"appname\" id=\"appname\" #newAppName placeholder=\"Enter app name\">\n      </md-input-container>\n    </md-card-content>\n    <md-card-actions>\n      <button md-raised-button type=\"submit\" color=\"primary\" (click)=\"createNew(newAppName.value); newAppName.value=''\">Create</button>\n    </md-card-actions>\n  </md-card>\n</div>"

/***/ }),

/***/ "../../../../../src/app/home/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_service__ = __webpack_require__("../../../../../src/app/home/home/app.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared__ = __webpack_require__("../../../../../src/app/shared/index.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomeComponent = (function () {
    function HomeComponent(appService, userService) {
        this.appService = appService;
        this.userService = userService;
        this.applications = [
            {
                _id: 1,
                name: "Sample App"
            },
            {
                _id: 1,
                name: "Sample App"
            }
        ];
        this.newAppName = "";
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appService.getApplication(this.userService.currentUser._id)
            .subscribe(function (apps) { return _this.applications = apps; });
    };
    HomeComponent.prototype.createNew = function (appName) {
        var _this = this;
        this.appService.createApp({ name: appName, user: this.userService.currentUser._id })
            .subscribe(function (data) {
            _this.applications.push(data);
        }, function (err) {
            console.error('Failed to create application ', err);
        });
    };
    HomeComponent.prototype.deleteApp = function (appId) {
        var _this = this;
        this.appService.delete(appId)
            .subscribe(function (data) {
            _this.applications = _this.applications.filter(function (app) {
                return app._id != appId;
            });
        }, function (err) {
        });
    };
    return HomeComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* ViewChild */])("newAppDialog"),
    __metadata("design:type", Object)
], HomeComponent.prototype, "newAppDialog", void 0);
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Component */])({
        selector: 'app-home',
        template: __webpack_require__("../../../../../src/app/home/home/home.component.html"),
        styles: [__webpack_require__("../../../../../src/app/home/home/home.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__app_service__["a" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__app_service__["a" /* AppService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared__["b" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared__["b" /* UserService */]) === "function" && _b || Object])
], HomeComponent);

var _a, _b;
//# sourceMappingURL=home.component.js.map

/***/ })

});
//# sourceMappingURL=0.chunk.js.map