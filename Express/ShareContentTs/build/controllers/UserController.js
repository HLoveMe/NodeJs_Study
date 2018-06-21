"use strict";
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
const routing_controllers_1 = require("routing-controllers");
const User_1 = require("../models/User");
let UserController = class UserController {
    login(request, response, user, reason) {
        if (request.method == "GET") {
            return { componey: "HLoveMe", tel: "17688938286", system: "(>^ω^<)喵,扇贝公司", reason };
        }
        else if (request.method == "POST") {
            if (user == null) {
                response.redirect(301, "/login?reason=账号或密码错误");
            }
            else {
                console.log(request);
                return undefined;
            }
        }
        else {
            return null;
        }
    }
    register(request, response, user) {
        console.log("777777777777777777");
        console.log(user); //,@Body({validate:true,required:false}) user?: UserInfo
        console.log("777777777777777777");
        if (request.method == "GET") {
            return {};
        }
        else if (request.method == "POST") {
            let user = null;
            console.log("8286", user);
            if (user == null) {
                response.redirect(301, "/register?reason=账号或密码错误");
            }
            else {
                return undefined;
            }
        }
        else {
            return null;
        }
    }
};
__decorate([
    routing_controllers_1.Get("/login"),
    routing_controllers_1.Post("/login"),
    routing_controllers_1.Render("user/login.html"),
    routing_controllers_1.OnNull(405),
    __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Res()), __param(2, routing_controllers_1.CurrentUser()), __param(3, routing_controllers_1.QueryParam("reason")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "login", null);
__decorate([
    routing_controllers_1.Get("/register"),
    routing_controllers_1.Post("/register"),
    routing_controllers_1.Render("user/regist.html"),
    __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Res()), __param(2, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, User_1.default]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "register", null);
UserController = __decorate([
    routing_controllers_1.Controller()
], UserController);
exports.default = UserController;
//# sourceMappingURL=UserController.js.map