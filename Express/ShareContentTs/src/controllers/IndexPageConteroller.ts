import {Get,Render,Req,Res,Controller,Params,CurrentUser,QueryParams,Redirect, Authorized, UseBefore} from "routing-controllers";
import UserInfo from "../models/User";
import { Request } from "express-serve-static-core";
import { FindUSerOrFail } from "../decorators/FindUSerOrFail";


@Controller()
export class IndexPageConteroller{
    constructor(){}
    @Get("/")
    @Get("/index")
    // @Authorized()
    @Render("index.html")
    //index(@QueryParams() pars:any,@CurrentUser() user:UserInfo)
    index(@Req() request:Request,@FindUSerOrFail() user:UserInfo){
        return {name:"朱子豪",url:"https://www.github.com/HLoveMe",age:19}
    }
}

