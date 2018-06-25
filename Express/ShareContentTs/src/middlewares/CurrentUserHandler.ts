
import {Middleware, ExpressErrorMiddlewareInterface,HttpError} from "routing-controllers";
import ErrorCode from "../errors/ErrorCode";


@Middleware({ type: "after" })
export default class CurrentUserAuthorHandle implements ExpressErrorMiddlewareInterface {
    error(error: HttpError, request: any, response: any, next: (err: any) => any) {
        console.log("处理全局错误 CurrentUserAuthorHandle",error)
        if(error.name == "AuthorizationRequiredError"){
            response.redirect(301,"/login")
        }else if(error.httpCode == ErrorCode.NoUserCode){
            response.redirect(301,"/login")
        }else{
            next(error);
        }
        
    }
}