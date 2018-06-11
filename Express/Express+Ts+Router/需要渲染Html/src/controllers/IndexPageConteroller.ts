import {Get,Render,Req,Res,Controller, JsonController} from "routing-controllers";


@Controller()
export class IndexPageConteroller{

    constructor(){}

    @Get("/")
    @Get("/index")
    @Render("index.html")
    index(){
        return {name:"ZZHw",age:19}
    }
}