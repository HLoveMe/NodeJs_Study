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