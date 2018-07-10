import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn,BeforeInsert, Connection,AfterLoad} from "typeorm";
import DataBaseManager from "../tools/DataBaseManager";

@Entity("KeyModel")
export class KeyShareModel{
    @PrimaryGeneratedColumn()
    id:number = 0;

    @Column()
    date:Date  = new Date()

    @Column()
    uid:number  = 0

    @Column()
    content:string = ""

    constructor(content:string,uid:number) {
        this.content = content
        this.uid = uid
    }
    
}


@Entity("FileModel")
export class FileShareModel{

    @PrimaryGeneratedColumn()
    id:number = 0;

    @Column()
    date:Date  = new Date()

    @Column()
    uid:number  = 0

    //上传的名字
    @Column()
    name:string = ""   

    //保存的名字
    @Column()
    path:string = ""

    constructor(uid,name,path) {
        this.uid = uid
        this.name = name
        this.path = path
    }
    
}