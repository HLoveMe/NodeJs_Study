import {Get,Render,Req,Res,Controller,Params,CurrentUser,QueryParams,Redirect, Authorized,JsonController, Post} from "routing-controllers";
import UserInfo from "../models/User";
import { Request } from "express-serve-static-core";
import { FindUSerOrFail } from "../decorators/FindUSerOrFail";


@JsonController()
export class IndexPageConteroller{
    constructor(){}
    
    @Get("/testget")
    index(){
        console.log(111111)
        return new Promise((reslove)=>{
            reslove({
                data:{name:"朱子豪",url:"https://www.github.com/HLoveMe",age:19},
                code:200,
                message:"success"
            })
        })
    }
    @Post("/testpost")
    _post(@Req() request:Request){
        return {
            data:request.body,
            query:request.query,
            code:200,
            message:"success"
        }
    }
}

