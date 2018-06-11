"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
var fs = require('fs'), stat = fs.stat;
/*
05
 * 复制目录中的所有文件包括子目录
06
 * @param{ String } 需要复制的目录
07
 * @param{ String } 复制到指定的目录
08
 */
var copy = function (src, dst) {
    // 读取目录中的所有文件/目录
    fs.readdir(src, function (err, paths) {
        if (err) {
            throw err;
        }
        paths.forEach(function (path) {
            var _src = src + '/' + path, _dst = dst + '/' + path, readable, writable;
            stat(_src, function (err, st) {
                if (err) {
                    throw err;
                }
                // 判断是否为文件
                if (st.isFile()) {
                    // 创建读取流
                    console.log("copy =====", _src, _dst);
                    readable = fs.createReadStream(_src);
                    // 创建写入流
                    writable = fs.createWriteStream(_dst);
                    // 通过管道来传输流
                    readable.pipe(writable);
                }
                // 如果是目录则递归调用自身
                else if (st.isDirectory()) {
                    exists(_src, _dst, copy);
                }
            });
        });
    });
};
// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
var exists = function (src, dst, callback) {
    fs.exists(dst, function (exists) {
        // 已存在
        if (exists) {
            callback(src, dst);
        }
        // 不存在
        else {
            fs.mkdir(dst, function () {
                callback(src, dst);
            });
        }
    });
};
/****
 *  source 需要copy的文件
 *  src 是你源   路径   tsconfig.json 对应
 *  target 目标路径 和你tsconfig.json 对应
 */
class FileCopyManager {
    constructor() {
    }
    static Copy() {
        let source = [
            ["public"],
            ["views"],
        ];
        let src = "src";
        let taregt = "build";
        //
        let _src = path.join(__dirname, src);
        let _target = path.join(__dirname, taregt);
        for (var index in source) {
            let onepart = source[index];
            let s_path = _src;
            let t_path = _target;
            for (var _index in onepart) {
                s_path = path.join(s_path, onepart[_index]);
                t_path = path.join(t_path, onepart[_index]);
            }
            console.log(t_path);
        }
    }
}
exports.default = FileCopyManager;
//# sourceMappingURL=HtmlFileCopy.js.map