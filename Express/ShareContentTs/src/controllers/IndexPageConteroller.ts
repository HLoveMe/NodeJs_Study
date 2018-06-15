import {Get,Render,Req,Res,Controller, Session,JsonController,Params,CurrentUser,BadRequestError,QueryParams,Redirect, Action} from "routing-controllers";
import { Service } from "typedi";
@Service()
class UserManager{
    print(){
        console.log("78945678657866946445454")
    }
}

@Controller()
export class IndexPageConteroller{
    constructor(){}
    @Get("/")
    @Get("/index")
    @Render("index.html")
    index(@QueryParams() pars:any){
        return {name:"朱子豪",url:"https://www.github.com/HLoveMe",age:19,...pars}
    }
}

@Controller()
export class TestController{
    constructor(private userM:UserManager){}
    @Get("/test")
    @Redirect("/index?aaa=11&age=:age")
    test(){
        console.log(111,this.userM.print())
        return {name:"呵呵2",age:"8286"}
    }
}


