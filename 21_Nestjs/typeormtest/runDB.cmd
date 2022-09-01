docker run --name test-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -d mysql


맥북 m1은 docker run --platform linux/x86_64 --name test-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -d mysql