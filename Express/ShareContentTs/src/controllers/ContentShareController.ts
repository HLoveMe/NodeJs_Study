import {Get,Controller,Post, Render} from "routing-controllers";
import { FindUSerOrFail } from "../decorators/FindUSerOrFail";
import UserInfo from "../models/User";
@Controller()
export default class ContentShareController{
    constructor(){}

    @Get("/share")
    @Render("share/Share.html")
    share(@FindUSerOrFail("/noUser") user:UserInfo){
        console.log("-----Share",user)
        return {keyword:"a",lastname:"txt"}
    }
}