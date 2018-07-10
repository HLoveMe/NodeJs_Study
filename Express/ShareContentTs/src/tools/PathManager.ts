
import * as path from "path";
import * as fs from "fs";
  
// 递归创建目录 异步方法  

export default class PathManager{
    /**
     * 
     * @param dirname 递归 创建文件夹
     * @param callback 
     */
    static checksDirs(dirname, callback) {  
        fs.exists(dirname, function (exists) {  
            if (exists) {  
                callback();  
            } else {  
                // console.log(path.dirname(dirname));  
                PathManager.checksDirs(path.dirname(dirname), function () {  
                    fs.mkdir(dirname, callback);  
                    console.log('在' + path.dirname(dirname) + '目录创建好' + dirname  +'目录');
                });  
            }  
        });  
    }

    static mkfile(_path,callback){
        PathManager.checksDirs(path.dirname(_path),()=>{
            fs
        })
    }

}