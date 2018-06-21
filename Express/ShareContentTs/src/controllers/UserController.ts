import {Get,Render,Req,Res,Controller, Post,OnNull,CurrentUser,QueryParam,Body} from "routing-controllers";
import UserInfo from "../models/User";
@Controller()
export default class UserController{
    @Get("/login")
    @Post("/login")
    @Render("user/login.html")
    @OnNull(405)
    login(@Req() request:any,@Res() response:any,@CurrentUser() user:any,@QueryParam("reason") reason:String){
        if(request.method == "GET"){
            return {componey:"HLoveMe",tel:"17688938286",system:"(>^ω^<)喵,扇贝公司",reason}
        }else if(request.method == "POST"){
            if(user == null){
                response.redirect(301,"/login?reason=账号或密码错误")
            }else{
                
                console.log(request)
                return undefined

            }
            
        }else{
            return null
        }
    }
    @Get("/register")
    @Post("/register")
    @Render("user/regist.html")
    register(@Req() request:any,@Res() response:any,@Body() user: UserInfo){
        console.log("777777777777777777")
        console.log(user)//,@Body({validate:true,required:false}) user?: UserInfo
        console.log("777777777777777777")
        if(request.method == "GET"){
            return {}
        }else if(request.method == "POST"){
            let user = null
            console.log("8286",user)
            if(user == null){
                response.redirect(301,"/register?reason=账号或密码错误")
            }else{
                return undefined
            }
            
        }else{
            return null
        }
    }
}