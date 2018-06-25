
import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn,BeforeInsert, Connection,AfterLoad} from "typeorm";
import DataBaseManager from "../tools/DataBaseManager";

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
    static Authorization(param):Promise<UserInfo>{
        return DataBaseManager.operation<UserInfo>((conn:Connection)=>{
            return new Promise((resolve, reject) => {
                conn.getRepository(UserInfo).findOne({name:param["name"]}).then((user)=>{
                    if("__NULL__"+param["password"]+"__NULL__"  == user.password){
                        resolve(user)
                    }else{
                        resolve(null)
                    }
                })
            })
            
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
        this.password = "__NULL__"+this.password+"__NULL__"
    }
    @AfterLoad()
    AfterLoad(){
        this.password = null;
    }
}