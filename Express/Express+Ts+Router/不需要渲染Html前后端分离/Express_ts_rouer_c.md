# TS + Express + Router-Controller
* 安装Ts
	* sudo npm install -g typescript	

* 安装 express
	* npm install -g express
	* npm install -g express-generator 

* 创建工程
	* express AppName
	* npm install
	* 删除所有文件除了package.json
	* copy src文件夹到目录下
	* copy FileCopy.js到目录下


* 新增ts 配置(tsconfig.json)
	
	```
	{
	  "compileOnSave": true,
	  "compilerOptions": {
  	  	//默认编译src文件夹
	    "outDir": "build",//输出文件夹问build
	    "module": "commonjs",
	    "target": "es6",
	    "moduleResolution": "node",
	    "emitDecoratorMetadata": true,
	    "experimentalDecorators": true,
	    "noImplicitAny": true,
	    "sourceMap": true,
	  },
	  "exclude": [
	    "node_modules",
	    "build"
	  ]
	}
	```
* 修改package.json
	
	```
	script:{
		"start": "npm run build && node ./build/index.js", 
		"build": "node_modules/.bin/tsc",
		//index.js 对应你的src目录下的启动文件index.ts
	}
	```
	
* 安装第三方库
	* npm install -save typescript
	* npm install -save @types/node
	* 安装Router-controller
		* npm install -save typedi
		* npm install -save routing-controllers
		* npm install -save reflect-metadata
		* npm install -save body-parser multer
		* npm install -save @types/express @types/body-parser @types/multer

		
* 运行
	* npm start


* 热启动 
	*  安装nodemon
	*  目录下生成nodemon.json
		
		```
		{
		    "restartable": "rs",
		    "ignore": [
		        ".git",
		        ".svn",
		        "node_modules/**/node_modules"
		    ],
		    "verbose": true,
		    "execMap": {
		        "js": "node --harmony"
		    },
		    "watch": [
		        "src" //监听目录
		    ],
		    "env": {
		        "NODE_ENV": "development"
		    },
		    "ext": "ts js" //监听文件后缀
		}
		```
	* 启动
		* npm run run 


* typeorm-routing-controllers-extensions