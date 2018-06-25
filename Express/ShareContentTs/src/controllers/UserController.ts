import {Get,Render,Req,Res,Controller, Post,OnNull,CurrentUser,QueryParam,Body} from "routing-controllers";
import UserInfo from "../models/User";
import DataBaseManager from "../tools/DataBaseManager";
import { Connection } from "typeorm";
import UUID from "../tools/UUID";
@Controller()
export default class UserController{
    @Get("/login")
    @Post("/login")
    @Render("user/login.html")
    @OnNull(405)
    async login(@Req() request:any,@Res() response:any,@CurrentUser() user:UserInfo,@QueryParam("reason") reason:String){
        if(request.method == "GET"){
            return {componey:"HLoveMe",tel:"17688938286",system:"(>^ω^<)喵,扇贝公司",reason}
        }else if(request.method == "POST"){
            let _user = await UserInfo.Authorization(user)
            if(_user == null){
                response.redirect(301,"/login?reason=账号或密码错误")
            }else{
                await DataBaseManager.operation((conn:Connection)=>{
                    _user.last_date = new Date()
                    _user.lose_date = new Date(new Date().getTime()+24*60*60*1000)
                    return conn.getRepository(UserInfo).save(_user)
                })
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