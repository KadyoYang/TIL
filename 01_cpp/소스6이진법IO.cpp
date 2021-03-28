//지금까지 예제는 데이타가 텍스트 파일에 텍스트 형식으로 저장됬었다.
// 그거를 이진형식으로 메모리에 저장되어있는 데이터 형태 고대로 저장할수있다.

// fout << man.namne ,< " " << man.age << " " 이런식으로 하면 느리고 복잡하다. 텍스트형식은
// fout.write((char *) &man, sizeof(man)); 형식으로 하면 좋다.
// write(char *, int n);

/*
#include <iostream>
#include <fstream>
using namespace std;

struct insa {
	char name[20]; 
	int age;
	char address[20];
};

void main()
{
	insa man[5] = { {"성윤정",20, "서울"},{"전혜영", 30, "부산"},{"이은정", 24, "대구"},{"오경주", 34, "서울"},{"채제원", 25, "마산"} };
	
	ofstream fout;
	fout.open("insa.dat");
	if (fout.fail()) {
		cout << "file open failure";
		return;
	}

	for (int i = 0; i < 5; i++) {
		fout << man[i].name << " " << man[i].age << " " << man[i].address << endl;
	}

	fout.close();
	cout << "done!" << endl;

	return;
} // 기존의 방식
*/

/*
#include <iostream>
#include <fstream>
using namespace std;

struct insa {
	char name[20];
	int age;
	char address[20];
};

void main()
{
	insa man[5] = { {"성윤정",20, "서울"},{"전혜영", 30, "부산"},{"이은정", 24, "대구"},{"오경주", 34, "서울"},{"채제원", 25, "마산"} };

	ofstream fout;
	fout.open("insa.dat");
	if (fout.fail()) {
		cout << "open failure";
		return;
	}


		fout.write((char*)&man[i], sizeof(insa) * 5);
	
	fout.close();

	ifstream fin; // read(char *, int n);

	insa newman[5];

	fin.open("insa.dat");
	if (fin.fail()) {
		cout << "open failure" << endl;
		return;
	}
	
	fin.read((char*)&newman, sizeof(insa) * 5); // 고냥 블록단위로 다시 가져온다 read로 
	for (int i = 0; i < 5; i++)
		cout << newman[i].name << " " << newman[i].age << " " << newman[i].address << endl;




	//while (fin.read((char *)&newman, sizeof(newman))) {
	//	cout << newman.name << "\t" << newman.age << "\t" << newman.address << endl;
	//}

	fin.close();
}
*/


/*
#include <iostream>
#include <fstream>
using namespace std;

struct insa {
	char name[20];
	int age;
	char address[20];
};

void main()
{
	insa man;
	ifstream fin;
	int pos;
	bool bFind = true;

	fin.open("insa.dat");
	if (fin.fail() != 0) {
		cout << "Error: open file failure";
		return;
	}

	cout << "몇 번째 레코드의 정보를 보고싶습니까?" << endl;
	cin >> pos;

	for (int i = 0; i < pos; i++) {
		fin.read((char *)&man, sizeof(man));
		if (!fin.good()) {
			bFind = false;
			break;
		}
	}
	
	if (bFind == true) {
		cout << man.name << " " << man.age << " " << man.address << endl;
	}
	else if (bFind == false) {
		cout << "해당하는 레코드에 데이터가 없다" << endl;
	}
	fin.close();
	
}
*/

/*
// 순차파일 방식은 속도가 느려지고 비효율적임
// 랜덤파일 방식으로 해야함. 대신 데이터가 일정한 크기여야함.
// 일정 하면 이진파일임. 
//구조체 그대로를 파일에 저장하기에 원하는 위치를 찾아가기에는 파일포인터를 구조체 크기만큼 움직이면됨
// 레코드 포인터를 원하는 위치로 이동하기 위햇거는 seekg 함수를 사용해야함.

#include <iostream>
#include <fstream>
using namespace std;

// istream & seekg(long offset, seek_dir);

// seekg 함ㅅ구의 첫번째ㅔ 매개변수인 offset은 seek dir 로부터 얼마나 움직일까에 관한거임
// seekg 함수의 seek_dir 에 입력할수있는것들 ios::beg 처음  ios::cur 현재  ios::end 끝
// 예들어서   ex fin.seekg(-4, ios::end)면 맨 끝에서부터 -4를 참조한다 ㄱ거임

struct insa {
	char name[20];
	int age;
	char address[20];
};

void main()
{
	insa man;
	ifstream fin;

	int pos;
	int total_rec;

	fin.open("insa.dat");

	if (fin.fail()) {
		cout << "file open failure" << endl;
		return;
	}

	fin.seekg(0, ios::end); // tellg로 길이가 얼마인지 볼려고
	total_rec = fin.tellg() / sizeof(insa); // 총 몇개의 레코드인지 계산할려고.
	cout << "현재 레코드의 총 개수는 " << total_rec << endl; // 여기서 insa.dat 할때 모르고 write함수쓸때
	// for문 써가지곻ㅎㅎ;; 엄청 많이 나올거임
	// tellg 는 처음부터 현재 위치까지 바이트단위로 구한다. 
	cout << " 읽고싶은 레코드는" << endl;
	cin >> pos;

	if (pos >= total_rec) {
		cout << "레코드 찾기 실패" << endl;
	}

	fin.seekg((pos - 1) * sizeof(insa), ios::beg); // 만약에 두번째 레코드 보고싶어서 2 입력하면
	// 1 * 44 되서   ios::beg 부터 44후니까 44바이트부터 이제 참조할수잇는거임
	fin.read((char *)&man, sizeof(insa));

	cout << man.name << " " << man.age << " " << man.address << endl;
}

*/
