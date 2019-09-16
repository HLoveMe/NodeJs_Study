* 安装nginx
* 安装pm2
* 上传文件

	```
		安装nodejs
		npm start --port 0.0.0.0
		
		在你的电脑访问119.29.16.140:3000
	```
* 配置文件 share_nginx.conf
	
	```share_nginx.conf
	upstream nodejs {
	    server 127.0.0.1:3000;//你的express 端口
	}
	
	server {
	    listen 3001;  //外网访问端口
	    server_name 119.29.16.140;
	    location / {
	        proxy_set_header X-Real-IP $remote_addr;
	        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	        proxy_set_header Host  $http_host;
	        proxy_set_header X-Nginx-Proxy true;
	        proxy_set_header Connection "";
	        proxy_pass      http://nodejs;
			 //proxy_read_timeout 240s;
	    }
	
	}
	```
* nginx配置
	
	```
	增加配置文件到ngnix
        sudo ln -s ....share_nginx.conf【后缀不限定】  /etc/nginx/sites-enabled/
        
        || 
        
        放在 /etc/nginx/conf.d/下 文件.conf 后缀

    重启nginx
    
    /var/log/nginx
        系统默认的日志路径
        
    更新文件
    	pm2重启www
    	
    配置文件更新
    	路径和之前保持不变
				> 上传配置
				> 不需要 cd /etc/nginx/sites-enabled/ ;删除配置
				> 不需要 增加配置文件到ngnix
				> 重启
		路径改变
			执行上面四步
	```	
* pm2 nodejs 进程守护

	```
	pm2 start ./bin/www --watch  开启监听
	pm2 reload|restart <appName> [options]  重启指定应用，
	pm2 stop app_name|app_id 停止
	pm2 stop all
	pm2 delete <appName> [options] 删除指定应用  配置变化最好先删除
	pm2 list 列表
	pm2 monit 监控各个应用进程cpu和memory使用情况
	pm2 logs  日志
	pm2 startup 开机启动
	
	启动参数
		--watch：监听应用目录的变化，一旦发生变化，自动重启。如果要精确监听、不见听的目录，最好通过配置文件。
		-i --instances：启用多少个实例，可用于负载均衡。如果-i 0或者-i max，则根据当前机器核数确定实例数目。
		--ignore-watch：排除监听的目录/文件，可以是特定的文件名，也可以是正则。比如--ignore-watch="test node_modules "some scripts""
		-n --name：应用的名称。查看应用信息的时候可以用到。
		-o --output <path>：标准输出日志文件的路径。
		-e --error <path>：错误输出日志文件的路径。
		--max-memory-restart 20M 内存超过重启
		
	配置文件 pm2 ecosystem 生成ecosystem.json文件
	启动
		pm2 start ecosystem.json --env dev //指定环境
	
		{
		  "apps": [
			    {
			      "name": "mywork", //名称
			      "cwd": "/srv/node-app/current", //应用程序所在的目录 绝对路径
			      "script": "bin/www",       //应用程序的脚本路径
			      "watch": [  // 监控变化的目录，一旦变化，自动重启
				    "bin",
				    "routers"
				  ],
				  "ignore_watch" : [  // 从监控目录中排除
				    "node_modules", 
				    "logs",
				    "public"
				  ],
			      "log_date_format": "YYYY-MM-DD HH:mm Z",
			      "error_file": "./node-app.stderr.log",// 错误日志路径
			      "out_file": "./node-app.stdout.log",// 普通日志路径
			      "instances": 6,          //开启进程数
			      "min_uptime": "200s",	//最小运行时间 pm2会认为是异常
			      "max_restarts": 10,    //最大重启数
			      "max_memory_restart": "300M",  //最大占据内存
			       
			      //process.env.REMOTE_ADDR 取配置中生命的变量
			      "env": {         //生产环境
				    "NODE_ENV": "production",
				    "REMOTE_ADDR": "http://www.example.com/",
				    PORT:"3001"
				  },
				  "env_dev": {  //开发
				    "NODE_ENV": "development",
				    "REMOTE_ADDR": "http://wdev.example.com/"
				  },
				  "env_test": {  //测试
				    "NODE_ENV": "test",
				    "REMOTE_ADDR": "http://wtest.example.com/"
				  }
			    }
		  ]
		}
	```

* 命令
	
	```
	nginx
		/etc/init.d/nginx start;启动
		sudo /etc/init.d/nginx restart;重启
			1.	重启服务： service nginx restart
			2. 快速停止或关闭Nginx：nginx -s stop
			3. 正常停止或关闭Nginx：nginx -s quit
			4. 配置文件修改重装载命令：nginx -s reload
		sudo nginx -t 检查配置是否正确
		
		
		关闭
		ps -ef | grep nginx 查看进程
		kill -QUIT pid
	```