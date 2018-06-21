

export default class UserInfo{
    name:String =  ""
    email:string = ""

    password:string = null

    repassword:string = null
    
    isRePassword(){
        return this.password == this.repassword
    }
}