import {HttpError} from "routing-controllers";
import ErrorCode, { BaseHttpError } from "./ErrorCode";


export default class FileDownTask extends BaseHttpError{
    constructor(path,name) {
        super(ErrorCode.FileDownTask,"文件下载",{path,name})
    }
    
}