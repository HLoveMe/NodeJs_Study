"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserInfo {
    constructor() {
        this.name = "";
        this.email = "";
        this.password = null;
        this.repassword = null;
    }
    isRePassword() {
        return this.password == this.repassword;
    }
}
exports.default = UserInfo;
//# sourceMappingURL=User.js.map