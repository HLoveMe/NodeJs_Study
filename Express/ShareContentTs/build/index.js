"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const IndexPageConteroller_1 = require("./controllers/IndexPageConteroller");
const App_1 = require("./App");
/**
 * Setup routing-controllers to use typedi container.
 */
routing_controllers_1.useContainer(typedi_1.Container);
const expressApp = routing_controllers_1.useExpressServer(App_1.default, {
    controllers: [
        IndexPageConteroller_1.IndexPageConteroller,
    ],
});
/**
 * Start the express app.
 */
expressApp.listen(3000);
console.log("Server is up and running at port 3000");
//# sourceMappingURL=index.js.map