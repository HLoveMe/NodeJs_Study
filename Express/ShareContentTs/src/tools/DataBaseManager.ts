import {createConnection,Connection,ConnectionOptions,EntityManager} from "typeorm";

import * as path from "path";
class _DataBaseManager{
    public _connect?:Connection = null;
    
    constructor () {
        createConnection({
            type:"sqlite",
            database: "database.sqlite",
            synchronize: true,
            logging: false,
            entities:[
                path.dirname(__dirname) + "/models/**/*.js"
            ]
        } as ConnectionOptions).then((connect)=>{
            this._connect = connect
        }).catch((err)=>{console.log("创建数据库连接错误")})
    }
    operation<T>(handle:(connect:Connection)=>T|Promise<T>):Promise<T>{
        return new Promise((resolve, reject) => {
            Promise.resolve(handle(this._connect)).then((res)=>{
                resolve(res)
            },()=>{resolve(null)}).catch(()=>{resolve(null)})
        })
    }
    transaction(handle:(manager:EntityManager)=>Promise<any>):Promise<any>{
        return this._connect.transaction((entityManager: EntityManager)=>{
            return handle(entityManager)
        }).catch((err)=>{console.log("事务运行报错",err)})
    }
}
export default  new _DataBaseManager()


// class _SASASAManager{}
// var _Manager = new _SASASAManager()
// createConnection({
//     type:"sqlite",
//     database: "database.sqlite",
//     synchronize: true,
//     logging: false,
//     entities:[
//         path.dirname(__dirname) + "/models/**/*.js"
//     ]
// } as ConnectionOptions).then((connect)=>{
//     console.log("1231231231231231231332",connect == null)
//     _Manager["__proto__"] = connect
// }).catch((err)=>{console.log("创建数据库连接错误")})

// export const Manager = _Manager