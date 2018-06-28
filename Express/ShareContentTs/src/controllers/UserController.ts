import {Get,Render,Req,Res,Controller, Post,OnNull,CurrentUser,QueryParam,Body} from "routing-controllers";
import UserInfo from "../models/User";
import DataBaseManager from "../tools/DataBaseManager";
import { Connection } from "typeorm";
import UUID from "../tools/UUID";
@Controller()
export default class UserController{
    static options = {componey:"HLoveMe",tel:"17688938286",name:"(>^ω^<)喵,扇贝公司"}
    @Get("/login")
    @Post("/login")
    @Render("user/login.html")
    @OnNull(405)
    async login(@Req() request:any,@Res() response:any,@Body() user:any,@QueryParam("reason") reason:String){
        if(request.method == "GET"){
            return {...UserController.options,reason}
        }else if(request.method == "POST"){
            let _user = await UserInfo.Authorization(user)
            if(_user == null){
                response.redirect("/login?reason=账号或密码错误",UserController.options)
            }else{
                _user = await _user.Login()
                response.cookie("token",_user.token)
                response.redirect("/")
            }
        }else{
            return null
        }
    }
    @Get("/register")
    @Post("/register")
    @Render("user/regist.html")
    async register(@Req() request:any,@Res() response:any,@Body() user: UserInfo){
        console.log("777777777777777777")
        console.log(user)//,@Body({validate:true,required:false}) user?: UserInfo
        console.log("777777777777777777")
        if(request.method == "GET"){
            return {}
        }else if(request.method == "POST"){
            if(user.isRePassword()){
                //各种验证
                //....
                user.last_date = new Date()
                user.lose_date = new Date(new Date().getTime()+24*60*60*1000) 
                user.token = UUID()
                let _user = await DataBaseManager.operation((connect:Connection)=>{
                    return connect.getRepository(UserInfo).save(user)
                })
                if (_user){
                    response.cookie("token",_user.token)
                    response.redirect("/")
                }else{
                    return response.redirect("/register?reason=注册失败-保存失败")
                }
            }else{
                return response.redirect("/register?reason=注册失败")
            }
            
        }else{
            return null
        }
    }
}