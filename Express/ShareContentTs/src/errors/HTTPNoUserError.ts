import {HttpError} from "routing-controllers";
import ErrorCode, { BaseHttpError } from "./ErrorCode";

export default class HTTPNoUserError extends BaseHttpError{
    constructor(message: string = "未登入", path:string="/login") {
        super(ErrorCode.NoUserCode,message,path);
    }
}