"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var routing_controllers_1 = require("routing-controllers");
var IndexPageConteroller = /** @class */ (function () {
    function IndexPageConteroller() {
    }
    IndexPageConteroller.prototype.index = function (pars) {
        return __assign({ name: "朱子豪", url: "https://www.github.com/HLoveMe", age: 19 }, pars);
    };
    __decorate([
        routing_controllers_1.Get("/"),
        routing_controllers_1.Get("/index"),
        routing_controllers_1.Authorized(),
        routing_controllers_1.Render("index.html"),
        __param(0, routing_controllers_1.QueryParams()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], IndexPageConteroller.prototype, "index", null);
    IndexPageConteroller = __decorate([
        routing_controllers_1.Controller(),
        __metadata("design:paramtypes", [])
    ], IndexPageConteroller);
    return IndexPageConteroller;
}());
exports.IndexPageConteroller = IndexPageConteroller;
//# sourceMappingURL=IndexPageConteroller.js.map