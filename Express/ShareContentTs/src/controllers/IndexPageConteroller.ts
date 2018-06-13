import {Get,Render,Req,Res,Controller, JsonController} from "routing-controllers";


@Controller()
export class IndexPageConteroller{
    constructor(){}
    @Get("/")
    @Get("/index")
    @Render("index.html")
    index(){
        return {name:"朱子豪",url:"https://www.github.com/HLoveMe",age:19}
    }
}

@Controller()
export class TestController{
    @Get("/test")
    test(){
        console.log(111)
        return {name:"呵呵2",age:"哪有直接问年龄的"}
    }
}