* 安装nginx
* 安装pm2
* 上传文件

	```
		安装nodejs
		npm start --port 0.0.0.0
		
		在你的电脑访问119.29.16.140:3000
	```
* 配置文件
	
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
	
	    }
	
	}
	```
* nginx配置
	
	```
	增加配置文件到ngnix
        sudo ln -s ....share_nginx.conf  /etc/nginx/sites-enabled/

    重启nginx
    
    /var/log/nginx
        系统默认的日志路径
        
    更新文件
    	pm2重启www
    配置文件更新
    	路径和之前保持不变
				> 上传配置
				> 不需要 cd /etc/nginx/sites-enabled/ ;删除配置
				> 不需要 sudo ln -s ~/Django/MuOnlie/conf/online_nginx.conf /etc/nginx/sites-enabled/
				> 重启
		路径改变
			执行上面四步
	```	

* 命令
	
	```
	nginx
		/etc/init.d/nginx start;启动
		sudo /etc/init.d/nginx restart;重启
		sudo nginx -t检查配置是否正确
		
		关闭
		ps -ef | grep nginx
		kill -QUIT pid
	```