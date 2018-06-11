* 安装Ts
	* sudo npm install -g typescript	

* 安装 express
	* npm install -g express
	* npm install -g express-generator 

* 创建工程
	* express AppName
	* 删除所有文件除了package.json
	* copy src文件夹到目录下
* 修改package.json
	
	```
	script:{
		"start": "npm run build && node ./build/Index.js", 
		//Index.js 对应你的src目录下的如何文件Index.ts
		"build": "node_modules/.bin/tsc"
	}
	```
	
* 新增ts 配置(tsconfig.json)
	
	```
	{
	  "compileOnSave": true,
	  "compilerOptions": {
	    "outDir": "build",
	    "module": "commonjs",
	    "target": "es6",
	    "moduleResolution": "node",
	    "emitDecoratorMetadata": true,
	    "experimentalDecorators": true,
	    "noImplicitAny": true,
	    "sourceMap": true
	  },
	  "exclude": [
	    "node_modules",
	    "build"
	  ]
	}
	```
* 安装第三方库
	* typescript
	* @types/node
	* ejs  //html处理
	* 安装Router-controller
		* typedi
		* npm install routing-controllers
		* npm install reflect-metadata
		* npm install body-parser multer
		* npm install @types/express @types/body-parser @types/multer

		
* npm start 运行





* typeorm-routing-controllers-extensions