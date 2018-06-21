import "reflect-metadata";
import {createExpressServer, useContainer, useExpressServer,Action} from "routing-controllers";
import {Container} from "typedi";

import Server from "./App";
/**
 * Setup routing-controllers to use typedi container.
 */
useContainer(Container);

const expressApp = useExpressServer(Server,{
        controllers: [ __dirname + "/controllers/*.js"],
        middlewares: [__dirname + "/middlewares/*.js"],
        defaultErrorHandler: false,
        classTransformer:true,
        authorizationChecker:(action: Action, roles: string[])=>{
            let authorization = action.request.headers["authorization"];
            console.log("查询数据库")
            return false
        },
        currentUserChecker:(action: Action)=>{
            return null;
        },
        defaults: {
            nullResultCode: 404,
            undefinedResultCode: 204,
        }
})

/**
 * Start the express app.
 */
expressApp.listen(3000);
console.log("Server is up and running at port 3000");
