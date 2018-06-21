"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const App_1 = require("./App");
/**
 * Setup routing-controllers to use typedi container.
 */
routing_controllers_1.useContainer(typedi_1.Container);
const expressApp = routing_controllers_1.useExpressServer(App_1.default, {
    controllers: [__dirname + "/controllers/*.js"],
    middlewares: [__dirname + "/middlewares/*.js"],
    defaultErrorHandler: false,
    classTransformer: true,
    authorizationChecker: (action, roles) => {
        let authorization = action.request.headers["authorization"];
        console.log("查询数据库");
        return false;
    },
    currentUserChecker: (action) => {
        return null;
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