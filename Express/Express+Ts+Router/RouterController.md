# Routing-controllers
Express 路由

* 安装
	
	* npm install routing-controllers
	* npm install reflect-metadata
	* npm install express body-parser multer
	* npm install @types/express @types/body-parser @types/multer
	* //* npm install typedi //参数注入器   Action 参数注入
	* -
	* class-transformer可选 数据装换
	* class-validator可选  数据属性检查
	
* API

	* 注入器  （见底部数据注入）
	
		```
			import {Container} from "typedi";
			import {useContainer} from "routing-controllers";
			
			useContainer(Container);
		```
	* 创建服务服务
		
		```
		import {createExpressServer, useExpressServer} from "routing-controllers";		
		启动
		
		使用默认创建
			ESer = createExpressServer({
				cors?: boolean | Object; 跨域
				routePrefix?: string;  全局url前部
				controllers?: Function[] | string[];控制器
					[
						import { IndexPageConteroller } from "./controllers/IndexPageConteroller";
							或者
						[__dirname + "/controllers/*.js"]
					],
				middlewares?: Function[] | string[]; 全局中间件
					[
						[__dirname + "/middlewares/**/*.js"]
						
						import
					]
				interceptors:Function[] | string[]; 拦截器
					[
						return ----> interceptor ---> client
					]
				classTransformer ：bool 会把你的参数转换为对应类
					{
						class-transformer 库
						@Body, @Param, @QueryParam, @BodyParam转换需要用到这个  
					}
				classToPlainTransformOptions
				plainToClassTransformOptions
				validation:Bool | ValidatorOptions 类认证
					对类进行认证 这里表示全局都需要认证
					也可以对某个类进行认证
				development:bool 是否为开发模式					process.NODE_ENV   "production"
				defaultErrorHandler:是否使用默认的错误处理
				errorOverridingMap:错误xxx
				
				authorizationChecker: authorization认证
					@Authorized
				currentUserChecker：当前用户认证
					@CurrentUser
				defaults  默认设置
					{
						nullResultCode:404 空结果
						undefinedResultCode：204 未定义
						 paramOptions: {
				            //with this option, argument will be required by default
				            required: true
				        }
					}
			})
		使用现有的Expresss
			var express = require('express');
			server = express()
			server.set....
			ESer = useExpressServer(server,{
			})
		全局配置
			ESer.use
			ESer.set
		启动	
			ESer.listen(3000)
		```	
	* 路由控制器  | 方法
		
		```
		import {JsonController,Controller} from "routing-controllers";
		指明控制器类型
		Controller([基础路由])/JsonController
			{
				Controller 直接返回字符串 （适合文本返回 和 渲染Html）
				JsonController会把对象json化
			}
		
		@Controller("/user")
		export class UserController{
			
			@Get("/center")
			.....很多的修饰符
			index(....各种参数){
				/user/center
				return {
					> 对象 | null | undefined
					> Promises
					> response.send("Hello response!");
				}		
			}
		}
		
		```
		
	*  Request | Response

		```
		import {Controller, Req, Res, Get} from "routing-controllers";
		
		@C()
		export class OneController{
			@Get("/all")
			all(@Req() request:any,@Res() response:any){
				return response.send("Hello response!");
			}
		}
			
		```
	* 路由 匹配

		```
		import {Get,Post,Put,Patch,Delete,Head,Method} from "routing-controllers";	
			@Get("/someMethod")
			method(){}
			
			方式
				Get
			路由
				routePrefix/controller/someMethod
		```
		
	* 请求参数

		```
		import {
			QueryParam,      request.query
			QueryParams,		request.query.xxx
			HeaderParam,		request.headers.xx
			HeaderParams,    request.headers
			CookieParam,     request.cookie("username") 
			CookieParams,    request.cookies
			Session,         request.session.xxxx 
			Body,            request.body 
			BodyParam,       request.body.name
			Param,           request.params.xx url匹配参数
			Params,			request.params 
			UploadedFile,    request.file.xx
			UploadedFiles    request.files
		} from "routing-controllers";  
		
		Body{
			 required?: boolean;  //必须的
		    transform?: ClassTransformOptions;转换参数
		    validate?: boolean | ValidatorOptions;是否验证
		    options?: any;
		    type?: any;
		}
		Session{
			 required?: boolean;  必须
		    parse?: boolean;    解析
		    transform?: ClassTransformOptions;转换参数
		    validate?: boolean | ValidatorOptions;验证
		    type?: any;
		}
		
		路由参数
		@Get("/user/:id")
		oneuser(@Param("id") uid:Number){
		
		}		
		@Get("/user/:id/:age")
		oneUser(@params() pars:any){
		
		}
		@Post("/user")
		saveUser(@BodyParam("name") userName: string) {
			request.body.name
			
		}
		@Post("/user")
		saveUser(@Body() user: User) {
			request.body --- >User
			参数转换 And 参数验证 
		}
		```
	
	* Authorization | CurrentUser  帮助认证App

		```
		@Authorized(null | String | String[])
			createExpressServer . authorizationChecker
				= (action: Action, roles: any[]) => Promise<boolean> | boolean;
				= func(action,roles){
					 const token = action.request.headers["authorization"];
					 ...
					 return 
				}
			@Get()
			@Authorized(roles)
			index(){
				在调用Action时  会进行authorizationChecker进行认证
			}
		@CurrentUser
			createExpressServer . currentUserChecker
				= (action: Action) => Promise<any> | any;
				=  func(action){
					return user
				}
				
			@Get()
			index(@CurrentUser({required: true }) user:Any){
			
			}
		```
	
	* 中间件 在你请求过程中的函数
		
		```
		局部
			export function loggingMiddleware(request: any, response: any, next?: (err?: any) => any): any {
			    console.log("do something...");
			    next();
			}
			
			
			import {ExpressMiddlewareInterface} from "routing-controllers";	
			export class MyMiddleware implements ExpressMiddlewareInterface { // interface implementation is optional
			
			    use(request: any, response: any, next?: (err?: any) => any): any {
			        console.log("do something...");
			        next();
			    }
			
			}
			Controller
				@Controller()
				@UseBefore(MyMiddleware)
				@UseAfter(loggingMiddleware)
				export class UserController {
				
				}
			Action
				@Get("/users/:id")
				@UseBefore(MyMiddleware)
				@UseAfter(loggingMiddleware)
				getOne(@Param("id") id: number) {
				}
				
		全局
			import {Middleware, ExpressMiddlewareInterface} from "routing-controllers";

			@Middleware({ type: "before" }) | {type:"after"}
			会在所有请求before | after执行
			export class LoggingMiddleware implements ExpressMiddlewareInterface {
			    use(request: any, response: any, next: (err: any) => any): void {
			        console.log("do something...");
			        next();
			    }			
			}
			
			createExpressServer ==> middlewares = []
		
		全局错误处理
			import {Middleware, ExpressErrorMiddlewareInterface} from "routing-controllers";
			@Middleware({ type: "after" })
			export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
			    error(error: any, request: any, response: any, next: (err: any) => any) {
			        console.log("do something...");
			        next();
			    }
			}
			
			配置
				去掉系统默认的错误处理
				createExpressServer  defaultErrorHandler = false
				createExpressServer ==> middlewares = []
		```
	* 拦截器
	
		```
		拦截器是拦截你的数据 修改  并返回给客服端
		
		局部
			import {Get, Param, UseInterceptor} from "routing-controllers";
			@Get("/users")
			@UseInterceptor(function(action: Action, content: any) {
			    return content.replace(/Mike/gi, "Michael");
			})
			getOne(@Param("id") id: number) {
			    return "Hello, I am Mike!"; // client will get a "Hello, I am Michael!" response.
			}
			
			import {Interceptor, InterceptorInterface, Action} from "routing-controllers";
			export class NameCorrectionInterceptor implements InterceptorInterface {
			    intercept(action: Action, content: any) {
			        return content.replace(/Mike/gi, "Michael");
			    }
			}
			use
				@UseInterceptor(NameCorrectionInterceptor)
				
		全局
			import {Interceptor, InterceptorInterface, Action} from "routing-controllers";
			@Interceptor()
			export class NameCorrectionInterceptor implements InterceptorInterface {
			    intercept(action: Action, content: any) {
			        return content.replace(/Mike/gi, "Michael");
			    }
			}
			
			createExpressServer == > interceptors
		```
	* html处理
		
		```
			使用useExpressServer
			
			@Get("/index")
			@Render("index.html")
			index(){
				return {name:"ZZH"} res.local
			}
		```
	* 响应处理
	
		* 重定向
			* @Redirect("http://github.com")
			
			```
			 @Get("/test")
		    @Redirect("/index/:name/:age")
		    @Redirect("/index")
		    test(){
		        console.log(111)
		        return {name:"呵呵2",age:"哪有直接问年龄的"}
		    }
			```
		* 设置响应头 
			* @Header(contentType: string)
		* 设置响应头 ContentType
			* @ContentType(contentType: string)
		* 设置浏览器location
			* @Location(url: string)
		* 设置响应头code
			* @HttpCode(code: number)
			
		* 处理方法放返回null
			* @OnNull(codeOrError: number|Error)
			
				```
				@Get()
				@OnNull(201)
				index(){
					return null
				}
				```
		* 处理方法放返回Undefined
			* @OnUndefined(codeOrError: number|Error)

				```
				import {HttpError} from "routing-controllers";
				export class UserNotFoundError extends HttpError {
				    constructor() {
				        super(404, "User not found!");
				    }
				}
				
				@Get()
				@OnUndefined(404)
				@OnUndefined(UserNotFoundError)
				index(){
					无return语句
					或者返回undefined
				}
				```
		* @ResponseClassTransformOptions(options: ClassTransformOptions)
		
	* 错误处理

		```
		HttpError
		BadRequestError
		ForbiddenError
		InternalServerError
		MethodNotAllowedError
		NotAcceptableError
		NotFoundError
		UnauthorizedError	
		
		clsss MyError  extend Error{}
		或者
		class DbError extends HttpError {
		    public operationName: string;
		    public args: any[];
		
		    constructor(operationName: string, args: any[] = []) {
		        super(500);
		        Object.setPrototypeOf(this, DbError.prototype);
		        this.operationName = operationName;
		        this.args = args; // can be used for internal logging
		    }
		
		    toJSON() {
		        return {
		            status: this.httpCode,
		            failedOperation: this.operationName
		        }
		    }
		}	
		1: throw new Error()
		2: OnNull
		3: NotFoundError
		4: createExpressServer({
				default:{
					 nullResultCode: 404,
        			 undefinedResultCode: 204,
				}
		   })
		5: ExpressErrorMiddlewareInterface 全局错误处理中间件
		```
	* 自己定义修饰符
		
		```
		function UserFromSession(option:{require:boolean}){
		    return createParamDecorator({
		        required:option.require,
		        value:(action:Action,value:any)=>{
		            return Obj | Promise
		        }
		    })
		}
		
		@Post()
    	save(@UserFromSession({ required: true }) user: User) {
    	
    	}
		```	
	* 参数验证
		
		```
		import { createParamDecorator } from "routing-controllers";
		
		第三方库 class-validator
		import {validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max} from "class-validator";
		
		1:RoutingControllersOptions.validation
			所有需要转换的数据都要进行数据格式验证
		2:Session | Body |...
			export class User {
			    @IsEmail()
			    email: string;
			    @MinLength(6)
			    password: string;
			}

			@Post("/regist")
			regist(@Body({ validate: true }) user:User){
				
			}
		
		``` 
		
	* 数据转换 class-transformer

		```
		> 必须开启转换 createExpressServer  classTransformer  true
		> class-transformer模块安装
		
		export class User {
	    	id: number;
	    	firstName: string;
	    	lastName: string;
		}
		@Post("/regist")
		regist(@Body() user:User){
			
		}
	```
	* 服务注入

		```
			npm install typedi 
			import { Service } from "typedi";
		1：	
			@Post("/regist")
			regist(@Body() user:User){
				数据注入
			}
		
		2：
			@Service()
			class UserManager{
			    print(){
			        console.log("78945678657866946445454")
			    }
			}
			
			@Controler()
			export class MyController{
				constructor(private userM:UserManager){}
			}
		```
	
