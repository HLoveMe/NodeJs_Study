import {HttpError} from "routing-controllers";
import ErrorCode from "./ErrorCode";

export default class HTTPNoUserError extends HttpError{
    public operationName: string;
	public args: any[];
    constructor(operationName: string, args: any[] = []) {
        super(ErrorCode.NoUserCode,"未登入");
        Object.setPrototypeOf(this, HTTPNoUserError.prototype);
        this.operationName = operationName;
        this.args = args; // can be used for internal logging
    }

    toJSON() {
        return {
            status: this.httpCode,
            failedOperation: this.operationName
        }
    }
}