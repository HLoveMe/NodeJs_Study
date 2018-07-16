import { ExpressMiddlewareInterface } from "routing-controllers";
import DataBaseManager from "../tools/DataBaseManager";
import { Connection } from "typeorm";
import UserInfo from "../models/User";
import HTTPNoUserError from "../errors/HTTPNoUserError";


export default class FileDownloadHandle implements ExpressMiddlewareInterface { // interface implementation is optional
    use(request: any, response: any, next?: (err?: any) => any): any {
        console.log(next,response,789789789)
        next()
    }
}