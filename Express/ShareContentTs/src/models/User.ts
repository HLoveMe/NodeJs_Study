
import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn,BeforeInsert, Connection} from "typeorm";
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
    async isRePassword(){
        await new Promise(()=>{})
        return this.password == this.repassword
    }
    @BeforeInsert()
    insertBefore(){
        //简单的密码加密
        this.password = "__NULL__"+this.password+"__NULL__"
    }

}