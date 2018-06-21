import {Get,Render,Req,Res,Controller,Params,CurrentUser,QueryParams,Redirect, Authorized} from "routing-controllers";


@Controller()
export class IndexPageConteroller{
    constructor(){}
    @Get("/")
    @Get("/index")
    @Authorized()
    @Render("index.html")
    index(@QueryParams() pars:any){
        return {name:"朱子豪",url:"https://www.github.com/HLoveMe",age:19,...pars}
    }
}

