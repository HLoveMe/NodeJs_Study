import "reflect-metadata";
import {createExpressServer, useContainer, useExpressServer,Action} from "routing-controllers";
import {Container} from "typedi";
import DataBaseManager from "./tools/DataBaseManager";
import {Connection,EntityManager,Repository} from "typeorm";
import Server from "./App";
import UserInfo from "./models/User";
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
            return DataBaseManager.operation((connect:Connection)=>{
                return connect.getRepository(UserInfo).findOne({token:action.request.headers["authorization"]});
            })
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