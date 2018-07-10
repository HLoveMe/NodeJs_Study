import {Get,Controller,Post, Render,Req,BodyParam,UploadedFile,ContentType} from "routing-controllers";
import { FindUSerOrFail } from "../decorators/FindUSerOrFail";
import UserInfo from "../models/User";
import * as path from "path";
import * as fs from "fs";
import { request } from "http";
import { KeyShareModel, FileShareModel } from "../models/ShareModel";
import DataBaseManager from "../tools/DataBaseManager";
import { Connection } from "typeorm";
import fileUploadOptions from "../tools/FileShareOptions";

@Controller("/share")
export default class ContentShareController{
    constructor(){}

    @Get("/")
    @Render("share/Share.html")
    async share(@FindUSerOrFail("/noUser") user:UserInfo){
        let key = await DataBaseManager.operation((connect:Connection)=>{
            return connect.getRepository(KeyShareModel)
            .createQueryBuilder("key")
            .where(`key.uid = ${user.id}`)
            .orderBy("key.date","DESC")
            .take(1)
            .getOne()
        }) || {content:""}
        let file = await DataBaseManager.operation((connect:Connection)=>{
            return connect.getRepository(FileShareModel)
            .createQueryBuilder("key")
            .where(`key.uid = ${user.id}`)
            .orderBy("key.date","DESC")
            .take(1)
            .getOne()
        })  || {name:"",id:0}
        return {keyword:key.content,lastname:file.name,last_id:file.id}
    }


    @Post("/keyShare")
    async keyShare(@FindUSerOrFail("/noUser") user:UserInfo,@Req() request:any,@BodyParam("data") data:string){
        var _path = request.app.get("media")
        if(data.length >= 1){
            let key = new KeyShareModel(data,user.id)
            key =  await DataBaseManager.operation((connect:Connection)=>{
                return connect.getRepository(KeyShareModel).save(key)
            })
            return{keyword:key.content || "保存失败"}
        }else{
            return {keyword:"文本长度不满足"}
        }
    }
    @Post("/fileShare")
    @ContentType("application/json")
    async fileShare(@FindUSerOrFail("/noUser") user:UserInfo,@Req() request:any,@UploadedFile("filename",{options:fileUploadOptions}) file:any){
        if(file == null){return {lastname:"文件上传 null"}}
        let _file = new FileShareModel(user.id,file.originalname,file.filename)
        _file = await DataBaseManager.operation((connect:Connection)=>{
            return connect.getRepository(FileShareModel).save(_file)
        })
        return {lastname:_file ? _file.name :"文件上传失败",last_id:_file.id}
    }
}