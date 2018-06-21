
import {Middleware, ExpressErrorMiddlewareInterface,HttpError} from "routing-controllers";

@Middleware({ type: "after" })
export default class CurrentUserAuthorHandle implements ExpressErrorMiddlewareInterface {
    error(error: HttpError, request: any, response: any, next: (err: any) => any) {
        if(error.name == "AuthorizationRequiredError"){
            response.redirect(301,"/login")
        }else{
            next(error);
        }
        
    }
}