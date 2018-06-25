
import {createParamDecorator} from "routing-controllers";
import UserInfo from "../models/User";
import DataBaseManager from "../tools/DataBaseManager";
import { Connection } from "typeorm";
import HTTPNoUserError from "../errors/HTTPNoUserError";

export function FindUSerOrFail(options?: { required?: boolean }) {
    return createParamDecorator({
        required: options && options.required ? true : false,
        value: async action => {
            let authorization = action.request.headers["authorization"] || action.request.cookies["token"];
            if(null == authorization){ throw new HTTPNoUserError("指定 authorization or token");}
            let user = await DataBaseManager.operation((connect:Connection)=>{
                return connect.getRepository(UserInfo).findOne({token:authorization});
            })
            if(null == user){ throw new HTTPNoUserError("authorization or token 没有找到User");}
            if(user.isLost){ throw new HTTPNoUserError("User 失效");}
            return user
        }
    });
}