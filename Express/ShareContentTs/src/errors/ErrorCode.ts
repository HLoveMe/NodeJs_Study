import { HttpError } from "routing-controllers";

export default {
    NoUserCode:500,
    DownloadFilePath:600,
    FileDownTask:601
}

export class BaseHttpError extends HttpError{
    //code message
    public param:any
    constructor(code:number,message:string,param:any){
        super(code,message)
        this.param = param
    }
}