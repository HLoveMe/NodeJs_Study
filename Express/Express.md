* nodejs Http核心服务

* express
	* npm install -g express
* express应用生成器
	* npm install express-generator -g

* 生成应用
	* express myapp
	* npm install
	* Express 应用是基于分层实现


* API	

	```
	Request
		.app 指向express
		.baseUrl
		.body
		.cookies =>{}
		.signedCookies [cookie-parser中间件]
		.fresh 
		.hostname
		.ip
		.ips
		.originalUrl  原始url包含参数
		.params =>{}参数
		.path  端口后面的
		.protocol  https/...
		.secure 是否是安全的
		.query 参数
			/shoes?order=desc&shoe[color]=blue&shoe[type]=converse
			req.query.order =>desc
			req.query.shoe.type|color = xx
		.route ==>{}路由对象
		.subdomains 主机
		.xhr 是否是XMLHttpRequest请求
		
		.get("header | Content-Type")获取头信息
		.is()  对Content-Type进行匹配
		
	Response
	
	
	var app =  express()
		属性|方法
			...
		
		
		配置
			app.set('views', path.join(__dirname, 'views'));视图位置
			app.set('view engine', 'jade');模板渲染引擎
		中间件			
			app.use(logger('dev'));日志中间件
			app.use(express.json());json中间件
				// for parsing application/json
			app.use(express.urlencoded({ extended: false }));
				//for parsing application/x-www-form-urlencoded
			//var multer = require('multer'); 
			//app.use(multer()); 
				// for parsing multipart/form-data
			app.use(cookieParser()); cookies中间件
			app.use(express.static(path.join(__dirname, 'public')));静态文件中间件
		
		
		
	var router = express.Router()
		中间件 	所有请求必须经过这个中间件 再次调用next
			.use(function(req,res,next){
				...
				next()
			})
			
		方法处理
			.all/get/post/delete
			(str/reg/[str|reg],....handles)
				.all(func(req,res,next){
					//所有 请求方式 都会调用
					next()
				})
				.get("path/reg",func(rq,rs,next){
					//时间处理
					next()
				},func(rq,rs,next){
					//参数处理数据库读取
					next()
				},[fun1,fun2],function(rq,res,next,xx){
						res.end("hello")
					//处理链接受 next不需要调用
				})
		参数
		 router.param("id",func(req,res,next,id){
		 	res.useid=id
		 	next()
		 })
		 router.param("time",func(req,res,next, time){
		 	res.time=time
		 	next()
		 })
		 router.get("/news/:id/: time",func(req,res,next){
		 	如果匹配会自动调用param声明的函数 并提取id
		 })
	```		
* 中间件
	*  app中间件
	*  一个请求的中间件
	
* 路由方式 （可以是字符串 字符串模式 正则表达式）
	* 路由声明方式
		* path 
		
			```
				app.get("/a",function(req,res,next){
				
				})
				app.post("/",function(){})
				app.delete
				
				http://localhost:3000/a
				.....
			```
			
		* Router 适合分类
		
			```
			var router = express.Router()
			```
		* router 一个路由不同方法
	
			```
			app.router("/news")
				.get()
				.post()
			
			http://localhost:3000/news
			```
	* 路由分类方式

		* 并行
		
			```
			app.use('/router1', router1);  
			app.use('/router2', router2);  
			app.use('/router3', router3);  
			
			-------->Request
								router1 如果匹配 处理 Response
								router2 如果匹配 处理 Response
								router3 如果匹配 处理 Response
			```
		* 串行
			
			```
			router1.get()
			router1.post()			
			router1.use(router2)
			router1.use(router3)
			
			app.use('/router1', router1);
			
			 
			
			-------->Request
								router1/get/post 如果匹配 处理 Response
								router2 1不匹配 2匹配 处理 Response
								router3 2不匹配 3匹配 处理 Response
								...
			```
	*  路由设计
		* [路由设计](https://www.jianshu.com/p/7b0cafe5e4be)

		
* 静态文件服务
	* jade模板 默认
		* app.set('view engine', 'jade');
	* html模板
		*  npm install ejs
		*  修改
		
			```
			//app.set('view engine', 'jade');
			app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
			```
	* ejs模板
		* npm install ejs
		* app.set('view engine', 'jade改为ejs')