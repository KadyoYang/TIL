echo "down container"
call docker-compose -f docker-compose-dev.yml down
echo "mvn clean..." 
call mvn clean -f .\ 
echo "mvn package..." 
call mvn package -f .\ -Dmaven.test.skip=true
echo "docker image build & run"
call docker-compose -f docker-compose-dev.yml up -d --build