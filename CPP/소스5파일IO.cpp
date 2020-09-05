 // c++에서는 파일 입출력이 표준 입출력과 유사한 방법으로 일어남 .


// 구조체 변수의 값을 모니터에 출력하기
/*
#include <iostream>
using namespace std;

struct insa {
	char name[20];
	int age;
	char address[20];
};

void main()
{
	insa man = { "성윤정",20,"서울" };
	
	cout << man.name << "::" << man.age << "::" << man.address << endl;
}
*/


/*
ofstream fout; 출력스트림을 관리하기 위한 객체를 선언한다.
fout.open("insa.dat"); 특정 파일을 지정한다.
fout<<man.name<< 해준다. 
fout.close(); 열었던 파일을 닫는다.
*/
// 이거를 파일로 저장할려면
// 출력스트림을 관리하기 위한 객체를 선언해야한다.

/*
#include <iostream>
#include <fstream> // fstream 을 포함시켜야한다  

using namespace std;

struct insa {
	char name[20];
	char age;
	char address[20];
};

void main()
{
	insa man = { "성윤정", 20, "북괴" };

	ofstream fout;
	// 표준입출력 계통이므로 << 도 상속된다.
	fout.open("insa.dat");
	//파일은 C:\Users\yck\source\repos\ProjectCPP\ProjectCPP 해당 프로젝트 폴더에 생성됨.
	fout << man.name << "::" << man.age << "::" << man.address << endl;
	fout.close();
}
*/






// 파일 입력은 하드디스크로부터 메모리로 입력해야하난그더ㅏ 암튼 다음과같이 하자
/*
#include <iostream>
#include <fstream>
using namespace std;

struct insa{
	char name[20];
	char age;
	char address[20];
};

void main()
{
	insa man = { "null", 0 , "null" };
	
	ifstream fin; // 입력스트림을 관리하기위한객체 선언

	fin.open("C:\\test\\insa.dat"); 
	
	if (fin.fail()) {
		cout << "오픈에 실패했습니다." << endl;
		return;
	}
	
	fin >> man.name >> man.age >> man.address; // 공백으로 데이터를 구분짓는듯.
	cout << man.name << " " << man.age << " " << man.address << endl;
	cout << man.name << endl;
	cout << man.age << endl;
	cout << man.address << endl;
	fin.close();
	
}
*/



// 함수를 이용한 파일 입출력 <<>> 말고 get 이랑 put

/*
#include <iostream>
#include <fstream>
using namespace std;


void main()
{
	char ch;
	while (cin.get(ch)) {
		cout.put(ch);
	}
}
*/


/*

#include <iostream>
#include <fstream>
using namespace std;

void main()
{

	char ch;

	ofstream fout;

	fout.open("test.dat");
	
	while (cin.get(ch)) {
		fout.put(ch);
	}  
	fout.close();
}


*/

//단일 문자 형태만 읽어오는 get과 ostream클래스의 멤버함수 중에서 문자 한 개를 출력하기 위한 put함수
/*
#include <iostream>
#include <fstream>
using namespace std;

void main()
{
	char ch;
	
	ofstream fout;

	fout.open("test.dat");
	if (fout.fail()) {
		cout << "file open failure" << endl;
		return;
	}
	while (cin.get(ch)) {
		fout.put(ch);
	}

	fout.close();
	
}
*/



/*
//문자 단위로 파일에서 입력받기
#include <iostream>
#include <fstream>
using namespace std;

void main()
{
	char ch;
	ifstream fin;
	fin.open("test.dat");
	if (fin.fail()) {
		cout << "fin.open() failure" << endl;
		return;
	}
	while (fin.get(ch)) {
		cout.put(ch); // cout.put() 풋함수를 썻 ㅓ문자단위로 
	}
}
*/


// dos의 type 명령어 만들기 ㅎ
// main 함수는 매개변수를 기술하지 않는다. 하지만 main함수가 매개변수를 가질때는 다음과 같은 형태를 지닌다.
// void main(int argc, char *argv[])

// 사용자 정의 함수는 함수 호출시 기술한 매개변수값을 형식 매개변수가 전달받는다.

//만약에 도스에서 소스5파일IO.exe    one two three four 하면
// argc 아큐먼트 카운트는 5개를 받는다 자기자신도 포함하기때문에
// argv는 입력받은 문자열을 저장하는 배열이다. 그러니까 char *argv[] 다 argument value



// 명령행에서 문자열 읽어오기
/*
#include <iostream>
#include <fstream>
using namespace std;

void main(int argc, char *argv[])
{
	cout << "최신이야" << endl;
	for (int i = 0; i < argc; i++) 
	{
		cout << argv[i] << endl;
	}
}
*/



/*
// type 명령어 와 비슷하게 만듬 ㅎㅎ
#include <iostream>
#include <fstream>

using namespace std;

void main(int argc, char * argv[])
{
	if (argc != 2)
	{
		cout << "just open only 1 file you dude" << endl;
		return;
	}
	char ch;
	ifstream fin;
	fin.open(argv[1]);

	if (fin.fail()) {
		cout << "open failure" << endl;
		return;
	}
	else if (fin.good()) {
		while (fin.get(ch)) {
			cout.put(ch);// cout << ch 로 하는게 나을듯
		}
	}
	else
		return;

	fin.close();
}
*/


/*
//파일에서 입력받은 내용을 다시 파일에 출력하기
#include <iostream>
#include <fstream>
using namespace std;

void main(int argc, char * argv[])
{
	if (argc != 3) {
		cout << "3 개만 입력하라" << endl;
		return; // 여기서 exit(0); 해도된다.
	}
	
	ifstream fin;
	ofstream fout;

	fin.open(argv[1]);
	fout.open(argv[2]);
	if (fin.fail() || fout.fail()) {
		cout << "file open failure" << endl;
		return;
	}
	char ch;
	while (fin.get(ch)) {
		fout.put(ch); // 덮어쓰기형식으로 작동함. copy와 비슷 
	}
	
	fin.close();
	fout.close();
	cout << "it worked!!!" << endl;
	return;
}
*/


/*
#include <iostream>
#include <fstream>
using namespace std;
//파일안의 소문자를 모두 대문자로 변환해라. 아 출력하는 프로그램이구나 ㅎ

void main() {
	//AZaz 순
	// cout << (int)'a' << endl << (int)'A' <<endl<< (int)'z' <<endl<< (int)'Z' << endl;
	
	ifstream fin;
	ofstream fout;

	char ch; // 각 문자 하나하나 저장할 변수
	int AsGap = (int)'a' - (int)'A'; // 아스키 대문자 소문자의 차이
	
	fin.open("eng.txt");
	
	if (fin.fail()) {
		cout << "error: fail to open the file";
	}
	while (fin.get(ch)) {
		
		if ((int)ch >= (int)'a' && (int)ch <= (int)'z'){
			ch = (char)((int)ch - AsGap); //아... ch 에다 '' 왜 붙였을까 바보야..ㅋㅋ
			cout << ch; // 이게 그 순간에 바뀌는 걸까 아니면 뒤에 이어붙이기식으로 되는걸까.
		}
		else
			cout << ch;

		if ((int)ch == (int)'A') { //재뿌리기 정말 한글자씩 검사하는구나. 뭔가의 포인터가 있나봄.
			ch = 'X';
			cout << ch;
		}
	}

	cout << "done." << endl;
	fin.close();
	
}
*/




/*
// 파일 앞에 번호를 붙여서 출력하라... get하고 put은 이제 거의 다암

#include <iostream>
#include <fstream>
using namespace std;

void main()
{
	
	ifstream fin;
	int count = 0;
	char ch;

	fin.open("eng.txt");
	if (fin.fail()) {
		cout << "file open failure";
	}
	
	cout <<count<< " : ";
	while (fin.get(ch)) {
		if (ch == '\n') {
			count++;
			cout << ch;
			cout << count << " : ";
			continue;
		}
		cout << ch;
	}
	

	fin.close();
	cout << endl << "done";
	return;
}
*/