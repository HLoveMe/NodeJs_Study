
import {Middleware, ExpressErrorMiddlewareInterface,HttpError} from "routing-controllers";
import ErrorCode, { BaseHttpError } from "../errors/ErrorCode";


@Middleware({ type: "after" })
export default class GolalErrorHandle implements ExpressErrorMiddlewareInterface {
    error(error: BaseHttpError, request: any, response: any, next: (err: any) => any) {
        
        console.log("处理全局错误 CurrentUserAuthorHandle",error ,error.param)
        if(error.name == "AuthorizationRequiredError"){
            response.redirect(301,error.param || "/login")
        }else if(error.httpCode == ErrorCode.NoUserCode){
            response.redirect(301,error.param || "/login")
        }else if(error.httpCode == ErrorCode.FileDownTask){
            const {path,name} = error.param
            console.log("下载",path,name)
            response.download(path,name)
        } else{
            next(error);
        }
        
    }
}