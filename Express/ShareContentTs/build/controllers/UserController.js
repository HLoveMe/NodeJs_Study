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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var routing_controllers_1 = require("routing-controllers");
var User_1 = require("../models/User");
var DataBaseManager_1 = require("../tools/DataBaseManager");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.login = function (request, response, user, reason) {
        return __awaiter(this, void 0, void 0, function () {
            var _user_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(request.method == "GET")) return [3 /*break*/, 1];
                        return [2 /*return*/, { componey: "HLoveMe", tel: "17688938286", system: "(>^ω^<)喵,扇贝公司", reason: reason }];
                    case 1:
                        if (!(request.method == "POST")) return [3 /*break*/, 6];
                        return [4 /*yield*/, User_1.default.Authorization(user)];
                    case 2:
                        _user_1 = _a.sent();
                        if (!(_user_1 == null)) return [3 /*break*/, 3];
                        response.redirect(301, "/login?reason=账号或密码错误");
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, DataBaseManager_1.default.operation(function (conn) {
                            _user_1.last_date = new Date();
                            _user_1.lose_date = new Date();
                            return conn.getRepository(User_1.default).save(_user_1);
                        })];
                    case 4:
                        _a.sent();
                        console.log(request);
                        return [2 /*return*/, undefined];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, null];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.register = function (request, response, user) {
        console.log("777777777777777777");
        console.log(user); //,@Body({validate:true,required:false}) user?: UserInfo
        console.log("777777777777777777");
        if (request.method == "GET") {
            return {};
        }
        else if (request.method == "POST") {
            if (user.repassword == null) {
                response.redirect(301, "/register?reason=账号或密码错误");
            }
            else {
                if (user.isRePassword()) {
                }
                return response.redirect("/");
            }
        }
        else {
            return null;
        }
    };
    __decorate([
        routing_controllers_1.Get("/login"),
        routing_controllers_1.Post("/login"),
        routing_controllers_1.Render("user/login.html"),
        routing_controllers_1.OnNull(405),
        __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Res()), __param(2, routing_controllers_1.Body()), __param(3, routing_controllers_1.QueryParam("reason")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Object, String]),
        __metadata("design:returntype", Promise)
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
    return UserController;
}());
exports.default = UserController;
//# sourceMappingURL=UserController.js.map