
import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn,BeforeInsert, Connection,AfterLoad} from "typeorm";
import DataBaseManager from "../tools/DataBaseManager";
import * as crypto from "crypto";

@Entity("User")
export default class UserInfo{

    @PrimaryGeneratedColumn()
    id:number = 0;

    @Column()
    name:String =  ""

    @Column()
    email:string = ""

    @Column()
    password:string = null
    repassword:string = null

    @Column()
    token:string = ""
    
    @Column()
    last_date:Date = new Date()

    @Column()
    lose_date:Date

    //{user}验证
    /*** 
     * name:oo
     * password:xx
    */
    static Authorization(param):Promise<UserInfo>{
        console.log("123123",param,UserAuthentication.encrypt(param["password"]))
        return DataBaseManager.operation<UserInfo>((conn:Connection)=>{
            return new Promise((resolve, reject) => {
                conn.getRepository(UserInfo).findOne({name:param["username"],password:UserAuthentication.encrypt(param["password"])}).then((user)=>{
                    resolve(user)
                })
            })
            
        })
    }
    //执行登入
    async Login(){
        return await DataBaseManager.operation((conn:Connection)=>{
            this.last_date = new Date()
            this.lose_date = new Date(new Date().getTime()+24*60*60*1000)
            return conn.getRepository(UserInfo).save(this)
        })
    }
    //密码 和 确认密码验证
    isRePassword(){
        return this.password == this.repassword
    }
    //时间验证
    get isLost(){
        return this.lose_date.getTime() <= new Date().getTime()
    }

    @BeforeInsert()
    insertBefore(){
        //简单的密码加密
        this.password = UserAuthentication.encrypt(this.password)
    }
    @AfterLoad()
    AfterLoad(){
        this.password = null;
    }
}


class UserAuthentication{
    static encrypt(str:string){
        let hash = crypto.createHash("sha1")
        str = UserAuthentication.salt(str)
        hash.update(str)
        return hash.digest("hex")
    }  
    protected static salt(str:string):string{
        //简单的加盐处理
        return str[str.length -1] + str
    }
}