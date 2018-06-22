"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var routing_controllers_1 = require("routing-controllers");
var typedi_1 = require("typedi");
var DataBaseManager_1 = require("./tools/DataBaseManager");
var App_1 = require("./App");
var User_1 = require("./models/User");
/**
 * Setup routing-controllers to use typedi container.
 */
routing_controllers_1.useContainer(typedi_1.Container);
var expressApp = routing_controllers_1.useExpressServer(App_1.default, {
    controllers: [__dirname + "/controllers/*.js"],
    middlewares: [__dirname + "/middlewares/*.js"],
    defaultErrorHandler: false,
    classTransformer: true,
    authorizationChecker: function (action, roles) {
        var authorization = action.request.headers["authorization"];
        console.log("查询数据库");
        return false;
    },
    currentUserChecker: function (action) {
        return DataBaseManager_1.default.operation(function (connect) {
            return connect.getRepository(User_1.default).findOne({ token: action.request.headers["authorization"] });
        });
    },
    defaults: {
        nullResultCode: 404,
        undefinedResultCode: 204,
    }
});
/**
 * Start the express app.
 */
expressApp.listen(3000);
console.log("Server is up and running at port 3000");
//# sourceMappingURL=index.js.map