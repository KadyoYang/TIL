docker run --platform linux/amd64 --name app_test -p 3306:3306 -e MYSQL_DATABASE=app_test -e MYSQL_ROOT_PASSWORD=qwer1234 -d mysql 