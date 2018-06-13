# Routing-controllers
Express 路由

* typedi
	
	```
		注入器库
	```
* 安装
	* npm install routing-controllers
	* npm install reflect-metadata
	* npm install express body-parser multer
	* npm install @types/express @types/body-parser @types/multer

	
* API

	* 注入器
	
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
					export class User {
					    @IsEmail()
					    email: string;
					    @MinLength(6)
					    password: string;
					}
					login(@Body({ validate: true }) user: User) {}
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
	启动
		ESer.use
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
					对象
					Promises
					response.send("Hello response!");
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
		```
		
		
	* 参数验证

	* 服务注入
	
* typeorm-routing-controllers-extensions