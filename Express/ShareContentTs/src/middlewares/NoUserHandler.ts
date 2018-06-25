
import { ExpressMiddlewareInterface } from "routing-controllers";
import DataBaseManager from "../tools/DataBaseManager";
import { Connection } from "typeorm";
import UserInfo from "../models/User";
import HTTPNoUserError from "../errors/HTTPNoUserError";



export default class NoUSerHandler implements ExpressMiddlewareInterface { // interface implementation is optional
    use(request: any, response: any, next?: (err?: any) => any): any {
        let authorization = request.headers["authorization"] || request.cookies["token"];
        if(null == authorization){ next(new HTTPNoUserError("未匹配到用户"));}
        DataBaseManager.operation((connect:Connection)=>{
            return connect.getRepository(UserInfo).findOne({token:authorization});
        }).then((user)=>{
            request["_user"] = user
            next(user == null ? new HTTPNoUserError("未匹配到用户") : user.isLost ? new HTTPNoUserError("用户失效,重新登入") :null)
        })
    }
}