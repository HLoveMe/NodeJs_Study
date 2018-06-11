import {Get,Render,Req,Res, JsonController} from "routing-controllers";


@JsonController()
export class IndexPageConteroller{

    constructor(){}

    @Get("/")
    @Get("/index")
    index(){
        return {name:"ZZHw",age:19}
    }
}