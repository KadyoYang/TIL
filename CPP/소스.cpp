
/*
#include <iostream>
using namespace std;
void test(int *p);

void main()
{
	int a[2] = { 1,2, };
	test(a);
	system("pause");
	return;
}

void test(int *p)
{
	cout << p[0];
	cout << p[1];
	return;
}
*/



/*
void cal(stuRecord* p, int num);
void prn(stuRecord* p, int num); // &temp = stu[0] 식으로는 되는데 
그냥 배열 이름 자체를 넘기는거는 안되네 그러니까 call by address 바께안댄다  배열은 안대나보다..ㅎㅎㅎㅎ 조ㅓㄴ나 궁금하다
*/
/*
1. 성적을 관리하기 위한 구조체를 선언하라 구조체 이름 stuRecord > 멤버변수 name kor eng mat tot ave
2. 1번 문제에 초기값 주고 총점과 평균을 구하고(3. 이걸 또 함수로 만들어라 ㅎㅎ) 이를 출력하래 4. 출력도 함수로 하라 prn 5.입력도 init 함수 선언 할수있게 그냥 종합적으로 만들라 이얘기네 ㅎㅎ 애들은 구조체 배열로 
*/
/*
#include <iostream>
using namespace std;
struct stuRecord {
	char name[20];
	int kor;
	int eng;
	int mat;
	int tot;
	double ave;
};
void initial();

int main() {


	return 0;
}
*/

/*
int main()
{
	stuRecord stu[headnum]; // stu 구조체 배열 선언
	
	cin >> stu[0].name;

	init(stu, headnum); //init 호출 
	
	system("pause");
	
	return 0;


}
// 구조체배열을 주소로 함수에 하 
*/


 
/*
// 2차원 구조체 배열
#include <iostream>
#define ROW 2
#define COL 3
using namespace std;
struct namecard {
	char name[20];
	char job[20];
};

void main() {
	namecard a[ROW][COL];
	namecard (*p)[COL];
	p = a;
	
	cout << endl << "입력" << endl;
	for (int i = 0; i < ROW; i++)
		for (int j = 0; j < COL; j++) {
			cout << "\n 애로우 연산자 사용 " << endl;
			cin >> *(*(p + i) + j)->name;
			cin >> *(*(p + i) + j)->job; // 애로우 연산자 사용

			cout << "\n 닷 연산자 사용 " << endl;
			cin >> (*(*(p + i) + j)).name;
			cin >> (*(*(p + i) + j)).job;
		}

	cout << endl << "출력" << endl;
	for (int i = 0; i < ROW; i++)
		for (int j = 0; j < COL; j++) {
			cout << "\n 애로우 연산자 사용 " << endl;
			cout << *(*(p + i) + j)->name << endl;
			cout << *(*(p + i) + j)->job << endl; // 애로우 연산자 사용

			cout << "\n 닷 연산자 사용 " << endl;
			cout << (*(*(p + i) + j)).name << endl;
			cout << (*(*(p + i) + j)).job << endl;
		}

	system("pause");
	return;
}
*/




/*
// 구조체 배열 
#include <iostream>
using namespace std;
#define headnum 2
struct namecard {
	char name[20];
	char job[20];
	char tel[20];
	char email[50];
};

void namecardInput(namecard *p);
void namecardPrint(namecard &temp);

void main()
{
	namecard info[headnum];
	
	cout << "정보 입력 단계"<<endl;
	for (int i = 0; i < headnum; i++)
		namecardInput(&info[i]);

	cout << "정보 출력 단계" << endl;
	for (int i = 0; i < headnum; i++)
		namecardPrint(info[i]);

	system("pause");
	return;
}

void namecardInput(namecard *p) {
	cout << " 입력 이름 직업 전화 이메일 순임" << endl;
	cin >> (*p).name;
	cin >> p->job;
	cin >> (*p).tel;
	cin >> p->email;
	return;
}
void namecardPrint(namecard &temp){
	cout << " 출력 이름 직업 전화 이메일 순임" << endl;
	cout << temp.name << endl << temp.job << endl << temp.tel << endl << temp.email << endl;
	return;
}
*/





// 구조체 포인터는 (*p).member   형식으로 멤버를 호출해야한다 왜냐하면 . 연산자가 *연산자보다 우선순위가 높다. -> 이걸로 써도된다.
/*
call by address 
void structInput(namecard *p){ cin >> p->name 등등 이렇게 하면 된다    cin >> (*p).name 요로코롬 return;
함수호출할때 이렇게 인자주면된다    structInput(&x); 이렇게 ㅎㅎ
*/

/*
call by reference 
void structInput(namecard &temp) { cin >> temp.name     등등 이렇게 하면 된다    그냥 구조체 멤버 부르는것처럼 하면 된다 엄청편하다 메모리도 추가로 할당 안하고 좋다.    return;
*/
/*
#include <iostream>
using namespace std;
struct namecard {
	char name[20];
	char job[30];
	char tel[20];
	char email[40];
};

void structPrn(namecard temp);
namecard structInput();
void main()
{
	namecard x = structInput();
	namecard y = structInput();
	structPrn(x);
	structPrn(y);
	
	namecard *xp;
	namecard *yp;
	xp = &x;
	yp = &y;

	cout << "\n x 의 크기는" << sizeof(x);
	cout << "\n y 의 크기는" << sizeof(y);

	cout << "\n xp 의 크기는" << sizeof(xp);
	cout << "\n *xp의 크기는" << sizeof(*xp) << endl;
	
	cout << sizeof(xp->name);

	cout << x.name << endl;
	cout << xp->name << endl;
	cout << (*xp).name << endl;

	system("pause");
	return;
}

void structPrn(namecard temp) {
	cout << temp.name << "\t" << temp.job << "\t" << temp.tel << "\t" << temp.email << endl;
	return;
}

namecard structInput() {
	namecard temp;
	cout << "이름을 입력하시오";
	cin >> temp.name;
	cout << "직업을 입력하시오";
	cin >> temp.job;
	cout << "전화번호를 입력하시오";
	cin >> temp.tel;
	cout << "email을 입력하시오";
	cin >> temp.email;
	return (temp);
}
*/



//structInput 함수 선언해서 쉽게 입력해보기
/*
#include <iostream>
using namespace std;
struct namecard {
	char name[20];
	char tel[20];
	char email[50];
};
namecard structInput(void) {
	namecard temp;
	cout << "what's your name" << endl;
	cin >> temp.name;
	cout << "what's your phone Number" << endl;
	cin >> temp.tel;
	cout << "email" << endl;
	cin >> temp.email;
	return temp;
}
void structPrint(namecard temp) {
	cout << temp.name << endl << temp.tel << endl << temp.email << endl;
	return;
}
void main() {
	namecard x;
	x = structInput();
	structPrint(x);

	system("pause");
	return;
}
*/


//structprn 함수 선언해서 출력쉽게 해보기
/*
#include <iostream>
using namespace std;
struct namecard {
	char name[20];
	char tel[20];
	char email[50];
};
void structprn(namecard temp);
void main() {
	namecard x = { "aaa", "aaaa" , "aaaaa" };
	namecard y = { "bbb", "bbbb", "bbbbb" };
	namecard z = { "ccc", "ccc", "ccc" };

	structprn(x);
	structprn(y);
	structprn(z);

	system("pause");
	return;
}
void structprn(namecard temp) {
	cout << temp.name << endl << temp.tel << endl << temp.email << endl;
	return;
}
*/


//구조체단위로 값 복사하기
/*
#include <iostream>
using namespace std;
struct namecard {
	char name[20];
	char tel[20];
	char email[50];
};
void main() {
	namecard x = { "이동식", "010-xxxx-xxxx", "mrrnd@naver.com" };
	namecard y;

	cout << x.name << "\t" << x.tel << "\t" << x.email << endl;
	cout << y.name << "\t" << y.tel << "\t" << y.email << endl;

	y = x;
	cout << y.name << "\t" << y.tel << "\t" << y.email << endl;

	system("pause");
	return;
}
*/


/*
// 구조체 변수를 선언할때 초기화도 해줋수있음.
#include <iostream>
using namespace std;
struct namecard {
	char name[20];
	char tel[20];
	char email[50];
};
void main() {
	
	namecard x = { "이동식", "1111", "lksjf@naer.coj" },
		y = { "개무무", "2222", "adkf@dgadf.d" },
		z = { "alsone", "3333", "skdf@dddam.cc" };
	
	cout << x.name << x.tel << x.email << endl;
	cout << y.name << y.tel << y.email << endl;
	cout << z.name << z.tel << z.email << endl;

	system("pause");
	return;
}
*///이거는 이거다
//이거는 이거다

/*
//struct 를 이용해서 새료운 자료형을 만든다.   마치 int float 세상에 bool
// 구조체 선언할때 틀만 만드는 거라서 초기값 주지도 못하고 동시에 메모리 할당도 안된다.
#include <iostream>
using namespace std;
struct namecard {
	char name[20];
	char job[30];
	char tel[20];
	char email[40];
	int test[5];
};

void main()
{
	struct namecard man;

	cout << " 이름을 입력하세요. =>";
	cin >> man.name;
	cout << " 직업을 입력하세요. =>";
	cin >> man.job;
	cout << " 전화번호를 입력하세요. =>";
	cin >> man.tel;
	cout << " Email을 입력하세요 =>";
	cin >> man.email;
	for (int i = 0; i < 6; i++) {
		man.test[i] = i + 1;
	}

	cout << "\n 입력받은 데이터를 출력합니다.";
	cout << "\n 이름\t직업\t연락처\t이메일";
	cout << "\n " << man.name << "\t" << man.job << "\t" << man.tel << "\t" << man.email << endl << endl;
	
	cout << "\n sizeof(namecard) =>\t" << sizeof(namecard);
	cout << "\n sizeof(man) =>\t" << sizeof(man);
	cout << "\n sizeof(man.test) =>\t" << sizeof(man.test);

	system("pause");
	return;
}
*/



/*
// 숫자 다섯개 입력 받고  최대 최소 판단
#include <iostream>
using namespace std;
int main() {
	int num[5] = { 0, };
	int misscount = 0;
	int temp = 0;

	for (int i = 0; i < 5; i++) {
		cout << i + 1 << "번째 숫자 입력"<<endl;
		cin >> num[i];
	}
	for (int i = 0; i < 5; i++) {
		
		if (num[i] > num[0]) { // 최대를 구하는 if'
			temp = num[0];
			num[0] = num[i];
			num[i] = temp;
		}
		else if (num[i] < num[4]) { // 최소를 구하는 if
			temp = num[5];
			num[5] = num[i];
			num[i] = temp;
		}
		else
			misscount++;

	}
	cout << "max num\t" << num[0] << endl;
	cout << "min num\t" << num[4] << endl;
	cout << "equal count" << misscount << endl;
	system("pause");
	return 0;
}
*/


/*
#include <iostream>
using namespace std;
void main() {
	int a[5];

	for (int i = 1; i < 6; i++) {
		a[i] = i * 5;
	}
	int sum = 0;
	for (int i = 1; i < 6; i++) {
		cout << a[i] << endl;
		sum += a[i];

	}
	cout << sum;
	system("pause");
	return;
}
*/


/*
#include <iostream>
using namespace std;
void main() {
	int a[3] = { 1,2,3 };
	int b[3] = { 0, };
	for (int i = 0; i < 3; i++) {
		b[i] = a[i];
	}

	for (int i = 0; i < 3; i++) {
		cout << b[i] << endl;
	}

	system("pause");
	return;
}
*/


/*
//2차원 배열을 출력하는 함수만들기 
#include <iostream>
#define ROW 3
#define COL 4
using namespace std;
void prn(int (*p)[COL]);  // 이거 void prn(int p[][COL]) 식으로 해도된다 근데  이거는 함수 매개변수용으로만 써야한다 다른대서 이렇게 쓰면 컴파일러한테 쳐맞는다.

int main() {
	int a[ROW][COL] = { {1,2,3,4}, {5,6,7,8}, {9,10,11,12} };

	prn(a); // prn 매개변수로 배열주소를 받는 프린트함수 근데이거 포인터말고 레퍼런스도 되나?ㅋㅋㅋㅋ

	system("pause");
	return 0;
}
void prn(int(*p)[COL]) {   
	for (int i = 0; i < ROW; i++) {
		cout << endl;
		for (int j = 0; j < COL; j++) {
			cout <<"*((p + "<<i<<") + "<<j<<") = > "<<*(*(p + i) + j) << endl;
		}
	}
	return;
}
*/


/*
#include <iostream>
using namespace std;
int main() {
	int	a[3][4] = { {1,2,3,4}, {5,6,7,8}, {9,10,11,12} };
	int(*p)[4];
	p = a;
	
	for (int i = 0; i < 3; i++) {
		cout << endl;
		for (int j = 0; j < 4; j++) {
			cout << "*(*(a + "<<i<<") + "<<j<<") = > "<<*(*(p + i) + j)<<"\t";
		}
	}
	system("pause");
	return 0;
} // 2차원 배열이랑 2차원 포인터배열이랑 똑같네 사용법이 ㅎㅎ
*/



/*
// a[i][j] == *(*(a+i)+j)
#include <iostream>
using namespace std;
#define ROW 3
#define COL 4
int main() {
	int a[ROW][COL] = { {1,2,3,0},{4,5,6,0},{7,8,9,0} };

	for (int i = 0; i < ROW; i++) {
		cout << endl;
		for (int j = 0; j < COL; j++) {
			cout << "*(*(a + " << i << ") + " << j << ") = " << *(*(a + i) + j)<<"\t";
		}
	}
	system("pause");
	return 0;
}
*/


/*
// a[i][j]  일때    a+1 하면      4*j 만큼 주소가 더해진다. 이뜻은 행단위로 된다는 뜻 이차원 배열
#include <iostream>
using namespace std;
#define ROW 3
#define COL 4
int main() {
	int a[3][4] = { {90,48,65,23,}, {12,14,15,17}, {24,23,21,20	 } };
	
	cout << "\n a\t = " << a;
	cout << "\n *a\t = " << *a;
	cout << "\n **a\t = " << **a;

	cout << "\n a + 1\t = " << a + 1;
	cout << "\n a + 2\t = " << a + 2 << endl;

	system("pause");
	return 0;
}
*/

/*
#include <iostream>
using namespace std;
#define ROW 2
#define COL	4

int main() {
	int a[ROW][COL] = { 0, };
	
	for (int i = 0; i < ROW; i++) {
		cout << "a[" << i << "] = "<< a[i]<< "\t";
		
		cout << "&a[" << i << "][0] = " << &a[i][0] << endl;

		
	}
	system("pause");
	return 0;
}
*/


/*
// 2차원 배열 주소값 출력
#include <iostream>
using namespace std;
#define ROW 3
#define COL 6

int main()
{
	int a[ROW][COL] = { 0, };
	
	for (int temp = 0; temp < ROW; temp++) {
		for (int ttemp = 0; ttemp < COL; ttemp++) {
			cout << "a[" << temp << "]" << "[" << ttemp << "] = " << &a[temp][ttemp] << endl;
		}
	}
	system("pause");
	return 0;
}
*/



/*
// 2차원 포인터     int a    int *p      int **pp             a는 일반변수      &a 1차원 포인터     p 1차원 포인터   &p 2차원 포인터  pp 2차원 포인터     & 는 두개이상 못붙임, *는 무제한으로 붙일수있음   *할때마다 차원 내려가고 & 은 차원 올라감
// 예제
#include <iostream>
using namespace std;
void main() {
	int a = 20;
	int *p = &a;
	int **pp = &p;
	
	cout << "a = " << a << endl;
	cout << "&a = " << &a << endl;
	cout << "p = " << p << endl;
	cout << "&p = " << &p << endl;
	cout << "pp = " << pp << endl;

	cout << " *p    and    **pp\t" << *p << "\t" << **pp << endl;
	system("pause");
	return;
}
*/





/*
// 다른 표현법도 있다 void prn (int p[]) 도 있다 이거 무슨 정수배열같지만 사실은 컴파일러가 해석하면은 void prn(int *p) 이다   그러니까
// VOID PRN( INT P[])  ==  void prn(int *p) 이다 그러니까 헷갈리지마라라... 아래는 예제
#include <iostream>
using namespace std;
void prn(int p[], int size);
int main()
{
	int a[5] = { 0,1,2,3,4 };
	prn(a, 5);

	system("pause");
	return 0;

}
void prn(int p[], int size) { // void prn(int p[] == void prn(int *p
	for (int i = 0; i < size; i++) {
		cout << *(p + i) << endl;
	}
}
*/


/*
#include <iostream>
using namespace std;
void prn(int *p, int num);
int main()// 함수의 매개변수를 포인터로 션언해서 주소로 받는다. num 은 배열의 크기를 준거다 .음.
{
	int arr[5] = { 1,2,3,4,5 };
	
	prn(arr, 5);
	system("pause");
	return 0;
}

void prn(int *p, int num) {

	for (int i = 0; i < num; i++) {
		cout << *(p + i) << endl;
	}
}
*/



/*
#include <iostream>
using namespace std;
int main()
{
	int a[5] = { 1,3,5,7,9 };
	int *ap;
	ap = a;

	cout << "\t *ap\t => \t" << *ap << endl;
	cout << "\t a[0]\t => \t" << a[0] << endl;
	
	cout << "\t *(p+1)\t => \t" << *(ap + 1) << endl;
	cout << "\t a[1]\t => \t" << a[1] << endl;

	cout << "\t *(p+2)\t => \t" << *(ap + 2) << endl;
	cout << "\t a[2]\t => \t" << a[2] << endl;
	
	system("pause");
	return 0;
}
*/


/*
#include <iostream>
using namespace std;
int main() {
	int arr[5] = { 1,3,5,7,9 }; 
	int *parr = arr;
	
	for (int i = 0; i < 5; i++) {
		cout << "arr + "<<i<<" = 0x" << arr + i << "\t&arr["<<i<<"] = 0x" << &arr[i] << endl;
	}

	for (int i = 0; i < 5; i++) {
		cout << "*(arr+i) = " << *(arr + i) << "\tarr[i] = " << arr[i] << endl;
	}

	system("pause");
	return 0;
}  
*/
/* 위의 코드의 계산 결과.
arr + 0 = 0x00CFF9AC    &arr[0] = 0x00CFF9AC
arr + 1 = 0x00CFF9B0    &arr[1] = 0x00CFF9B0
arr + 2 = 0x00CFF9B4    &arr[2] = 0x00CFF9B4
arr + 3 = 0x00CFF9B8    &arr[3] = 0x00CFF9B8
arr + 4 = 0x00CFF9BC    &arr[4] = 0x00CFF9BC
*(arr+i) = 1    arr[i] = 1
*(arr+i) = 3    arr[i] = 3
*(arr+i) = 5    arr[i] = 5
*(arr+i) = 7    arr[i] = 7
*(arr+i) = 9    arr[i] = 9
계속하려면 아무 키나 누르십시오 . . .
*/



/*
//   *a    *a+1   *(a+1) 의 차이를 알아보좌.
#include <iostream>
using namespace std;
int main()
{
	int a[5] = { 1,3,5,7,9 };
	cout << "*a = " << *a << endl;
	cout << "*a+1 = " << *a + 1 << endl;
	cout << "*(a+1) = " << *(a + 1) << endl;

	system("pause");
	return 0; // 결과로 1  2  3 나온다.
}
*/



/*
#include <iostream>
using namespace std;
int main()
{
	int a[5] = { 0, };

	for (int i = 0; i < 5; i++) {
		cout << "a + " << i << " == " << a + i << "\t &a[" << i << "] == " << &a[i] << endl;
	}
	system("pause");
	return 0;
}
*/

// 배열 int a[5]       에서    a == &a[0] 이것들 같은 의미임 a 그 자체가 시작주소를 의미   *a == a[0]          a+i ==    &a[i]
/*
//1차원 배열의 주소값을 알아보자 short 랑 int 를 예로 들자
#include <iostream>
using namespace std;
int main()
{
	int arrshort[5] = { 1,2,3,4,5 };
	int arrint[5] = { 6,7,8,9,10 };
	
	cout << " short 값 출력\t";
	for (int i = 0; i < 5; i++)
		cout << arrshort[i] << "\t";
	cout << endl;
	cout << " short 주소 출력\t";
	for (int i = 0; i < 5 ; i++)
		cout << &arrshort[i] << "\t";
	cout << endl;
	cout << " int 값 출력\t";
	for (int i = 0; i < 5; i++)
		cout << arrint[i] << "\t";
	cout << endl;
	cout << " int  주소 출력\t";
	for (int i = 0; i < 5 ; i++)
		cout << &arrint[i] << "\t";
	cout << endl;

	system("pause");
	return 0;

}
*/




/*
// 성적입력 프로그램 수정쉽게 하기 위하여 ROW COL을 매크로상수로 정의해놓자.
#include <iostream>
#define ROW 3
#define COL 5
using namespace std;

int main()
{
	cout << "성적을 입력하자 학생 번호 국어 수학 영어" << endl;
	int arr[ROW][COL] = { 0, };
		for (int i = 0; i < ROW; i++){
			arr[i][0] = i + 1;
			for (int j = 1; j < COL; j++) {
				cout << arr[i][0] << "번 학생의 "<< (j) << "번 과목의 성적을 입력하세요" << endl;
				cin >> arr[i][j];

			}
	}
		
		cout << "입력 종료" << endl;
		cout << "\t번호\t국어\t수학\t영어\t" << endl;;
			for (int i = 0; i < ROW; i++) {
				cout << "\t";
				for (int j = 0; j < COL; j++) {
					cout << arr[i][j] << "\t";
				}
				cout << endl;
		}

			system("pause");
			return 0;
}
*/





/*
// 2차원 배열 
#include <iostream>
using namespace std;
int main()
{

	int arr[3][4] = { {48,59,69,48}, {98,78,37,27}, {76,25,90,89} };

	for (int r = 0; r < 3; r++) {
		for (int c = 0; c < 4; c++) {
			cout << arr[r][c] << "\t";
		}
		cout << endl;
	}

	system("pause");
	return 0;
}
*/




/*
// 배열을 이용하여 입력받은 5개의 값의 최대를 구하는 코드
#include <iostream>
using namespace std;
void main()
{

	int arr[] = { 412,123,548,239,408 };
	int max = 0;
	for (int i = 0; i < 5; i++) {
		if (arr[i] > max)
			max = arr[i];
	}
	cout << "max number is " << max << endl;
	system("pause");
	return;
}
*/




/*
//진짜 간단한 배열 
#include <iostream>
using namespace std;
void main()
{
	int arr[5];
	for (int i = 10, j=0; i > 5; i--,j++) {
		arr[j] = i;
	}

	for (int i = 0; i < 5; i++) {
		cout <<"arr["<<i<<"] = "<< arr[i] << endl;
	}
	system("pause");
	return;
}
*/



/*
// 절댓값 구하기 함수를 absolute 함수를 만드는데 call by reference 랑 call by address 둘다 만들어보자.
#include <iostream>
using namespace std;
void absoluteP(int *ap);
void absoluteR(int &br);
void main()
{
	int a = -43;
	cout << a << endl;
	absoluteP(&a);
	cout << a << endl;
	int b = -78;
	cout << b << endl;
	absoluteR(b);
	cout << b << endl;
	system("pause");
	return;
}
void absoluteP(int *ap)
{
	if (*ap < 0)
		*ap = -(*ap);
}
void absoluteR(int &br)
{
	if (br < 0)
		br = -(br);
}
*/


/*
// Call by Reference 를 사용한 숫자 교환 함수
#include <iostream>
using namespace std;
void swap(int &ar, int &br);

void main()
{
	int a = 64;
	int b = 32;
	cout << a << b << endl;
	swap(a, b);
	cout << a << b << endl;
	system("pause");
	return;
}

void swap(int &ar, int &br)
{
	int temp = ar;
	ar = br;
	br = temp;
	return;
}
*/




// reference 변수 요놈은 선언시에 메모리에 올라가지않는다. 다시말하면 하나의 주소에 여러이름을 붙이는거다 별명을 ㅎㅎㅎ 참조참조 여기서는 & 참조연산자 쓴다 포인터에서 쓰던 &주소연산자가 아니다!!!!!!
// 변수 선언시에 & 이게 보이면 참조연산자라고 판단하고    이미 선언된 변수 앞에 & 이게 붙으면 주소연산자라고 판단한다고한다. 
// 레퍼런스변수 선언할때는 무조건 초기값 줘야한다 하나의 별명이기 때문에.
/*
//레퍼런스 예
#include <iostream>
using namespace std;
void main()
{
	int a = 294;
	int &b = a;
	
	cout << "a = " << a << endl;
	cout << "b = " << b << endl;

	b = 395;
	cout << "a = " << a << endl;
	cout << "b = " << b << endl;

	cout << "&a" << &a << endl;
	cout << "&b" << &b << endl;

	system("pause");
	return;
}
*/



/*
//교환함수 call by Address	
#include <iostream>
using namespace std;
void swap(int *ap, int *bp);

void main()
{
	int a = 1;
	int b = 2;
	cout << a << b << endl;
	swap(&a, &b);
	cout << a << b << endl;

	system("pause");
	return;
	
}
void swap(int *ap, int *bp)
{
	int temp = 0;
	temp = *ap;
	*ap = *bp;
	*bp = temp;
	return;
}
*/




/*
#include <iostream>
using namespace std;
void main()
{
	int a = 40;
	int *p = &a;

	cout << a << endl;
	*p = 20;
	cout << a << endl;
	cout << *p << endl;

	a = 60;
	*p = a;
	cout << *p << endl;

	system("pause");
	return;
}
*/







/*
#include <iostream>
using namespace std;
void main()
{
	int a = 40;
	int *p = &a;
	
	cout << "a\t" << a << endl;
	cout << "&a\t" << &a << endl;
	cout << "p\t" << p << endl;
	cout << "*p\t" << *p << endl;

	system("pause");
	return;
}
*/





/*
// 포인터 기본 
#include <iostream>
using namespace std;
void main()
{
	int a = 30;
 // int b = &a 해봤는데 일반 정수변수는 주소를 가질수없나보다. ㅎ 무조건 int *  해줘야하는듯 ㅎ
	cout << "a = " << a << endl;
	cout << "&a = " << &a << endl;
	cout << "*&a = " << *&a << endl;
	cout << "&*&a = " << &*&a << endl;
    
	system("pause");
	return;
}
*/




/*
// Call by Value 값의 의한 전달방식
#include  <iostream>
using namespace std;
int sum(int x, int b);
int main()
{
	int a = 0, b = 0;
	cin >> a;
	cin >> b;
	int an = sum(a, b);
	cout << an << endl;

	system("pause");
	return 0;
}

int sum(int x, int b)
{
	int t = 0;
	t = x + b;
	return (t);
}
*/









/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@여기까지가 완전 기본이었습니다.!@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/



/*
// 두개의 정수를 입력받고 평균을 실수로 반환하는 함수를 제작.
#include <iostream>
using namespace std;
double avg(int a, int b);

int main()
{
	int a = 0, b = 0;
	cout << "두 정수를 입력";
	cin >> a;
	cin >> b;
	
	double avgfact = avg(a, b);
	cout << avgfact << endl;
	system("pause");
	return 0;
}

double avg(int a, int b)
{
	return (double)((double)(a + b) / 2);
}
*/



/*
#include <iostream>
using namespace std;
void gogodan(int dan);

int main()
{
	int temp;
	cout << "input =";
	cin >> temp;
	gogodan(temp);

	system("pause");
	return 0;
}

void gogodan(int dan)
{

	for (int i = 1; i <= 9; i++) {
		cout <<dan<<"X"<<i<<"="<<(dan*i) << endl;
	}
}
*/



/*
#include <iostream>
using namespace std;
void prn();
int main()
{
	prn();
	system("pause");
	return 0;
}
void prn()
{
	cout << "내 이름은 YangCK다 " << endl;

}
*/







//자동변수 auto    전역변수 extern    정적변수? static:외보에 쓰일경우 해당 코드파일 안에서만 작동 안에서할경우 암튼 그 메모리에 할당됨 계속  레지스터변수 register cpu register에 빠르게빠르게 
// #define 매크로 상수랑 매크로 함수      inline 함수  선행처리때 #붙은것들 다 처리된다. 그래서 실제 코드로 대치되서 컴파일되기때문에 프로그램 속도 향상에 도움을 줌. 기타 함수는 그 로직이 그대로 컴파일되서 오래걸림 ... 왔다리갔다리함
// ex)  #define PI 3.141592      등등      #define add(x,y) 2*(x+y)  요로코롬 inline 함수는 일반 함수처럼 선언해서 쓰면된다. 다만 리턴형선언 앞에다가 inline 만 붙여주면 된다. ㅎㅎㅎㅎ 



/*
//for 문을 이용하여 1! 2! .... 10! 을 구하여라 가능하면 빠른 실행속도로 올려보자 
#include <iostream>
using namespace std;
int main()
{
	for (int fac = 1, fact; fac <= 10; fac++)
	{
		fact = 1;
		for (int temp = 1; temp <= fac; temp++)
			fact *= temp;

		cout << fact << endl;
	}
	system("pause");
	return 0;
}
*/





/*
//알파벳 A to Z 까지 출력하기 
#include <iostream>
using namespace std;
int main()
{
	int A = (int)'A';
	int Z = (int)'Z';
	
	for (; A <= Z; A++)
		cout << (char)A<< "\t";

	system("pause");
	return 0;
}
*/




/*
// do while 사용 
#include <iostream>
int main()
{
	int a = 0;
	int sum = 0;
	

	do { // 일단 진행하라.... 
		std::cout << a << std::endl;
		sum += a;
		std::cout << sum << std::endl<< std::endl;
		a++;
	} while (sum < 50);


	system("pause");
	return 0;
}
*/





/*
// while 사용 예제 1 부터 10의 합
#include <iostream>
using namespace std;
void main()
{
	int a = 0;
	int sum = 0;

	while (a < 11) // () 안이 참이면 계속 하라..
	{
		cout << "현재 수는 " << a << endl;
		
		sum += a;
		a++;
	}

	cout << "합은 " << sum << endl;
	system("pause");

}
*/





/*
// for 문을 이용해서 구구단 출력
#include <iostream>
using namespace std;
void main()
{
	for (short A = 2; A < 10; A++)
	{
		for (short a = 1; a < 10; a++)
		{
			cout << A << "X" << a << "=" << (A*a) << endl;
		}
	}

	system("pause");

}
*/





/*
// 0부터 입력해준 수 까지의 홀수합 구하기	
#include <iostream>
using namespace std;
void main()
{
	int sum = 0;
	int num = 0;
	cout << "수입력 =";
	cin >> num;

	for (int temp = 0; temp < num+1; temp++)
	{
		cout << "현재 수 =" << temp;
		if (temp % 2)
			cout << "현재 합 =" << (sum += temp) << endl;
		else
			cout << "현재 합 =" << sum << endl;

	} // 이렇게 if 로 홀수 가려도 되고 빠른 실행 시간을 원하면은... for 초기 값을 1로 증감식으로는1 3 5 7 출력이 되게 +2씩 하면 될듯하다.  

	system("pause");
}
*/





/*
// for 로 1에서 5부터 더하기 ㅎㅎㅎㅎ인가 출력인가 암튼 둘다 해보자 ㅎㅎㅎㅎㅎㅎㅎ
#include <iostream>
using namespace std;
void main()
{
	int sum = 0;
	for (int num = 0; num < 6; num++)
	{
		cout << "현재 수는 " << num << "이다" << endl;
		cout << "현재 sum의 값" << (sum += num) << "이다" << endl;

	}
	system("pause");
}
*/







/*
#include <iostream>
using namespace std;

void main()
{
	int num = 0;
	cout << "점수를 입력 = ";
	cin >> num;

	switch (num / 10)
	{
	case 10: cout << "100" << endl;
	case 9: cout << "90" << endl;
	case 8: cout << "80" << endl;
	case 7: cout << "70" << endl;
	case 6: cout << "60" << endl;
	default: cout << "default" << endl;
	}
	cout << "70에 break; 건다" << endl;
		
	switch (num / 10)
	{
	case 10: cout << "100" << endl; 
	case 9: cout << "90" << endl;
	case 8: cout << "80" << endl;
	case 7: cout << "70" << endl; break;
	case 6: cout << "60" << endl;
	default: cout << "default" << endl;
	}

	// 실험 결과 90 입력했을때 이놈이 case 9로 가서 break; 만날때 까지 쭉  간다 이놈이 ㅎㅎㅎㅎ 실험 성공

	system("pause");
}
*/






/*
#include <iostream>
using namespace std;

void main() // 스위치 문 사용법 예제 
{

	int num = 0;
	cout << "점수를 입력하라 : ";
	cin >> num;
	
	switch (num / 10)
	{
	case 10: cout << "성적은 100점대이다." << endl; break; //break; 를 해줘야 switch 문 빠져나온다 이거 안하면은 다음꺼까지 아마 출력할텐데 실험해보자 ㅎㅎ 
	case 9: cout << "성적은 90점대이다." << endl; break;
	case 8: cout << "성적은 80점대이다." << endl; break;
	case 7: cout << "성적은 70점대이다." << endl; break;
	case 6: cout << "성적은 60점대이다." << endl; break;
	default: cout << "성적은 (-무한대 ~ 59) 이거나 (110 ~ 무한대) 이다" << endl;
	}
	system("pause");
	
}
*/











/*
#include <iostream>
using namespace std;
int main() // if 랑 else if 는 () 안의 값이 참일때 0이 아닐때 작동한다 ex) 1 -1 2 3 4 등등 
{
	int num;
	
	cout << "짝수인지 홀수인지 알아볼 값을 입력하시오 : ";
	cin >> num;
	
	if (!(num % 2))
		cout << num << " 은 짝수입니다\n" << endl;
	else if ((num % 2))
		cout << num << " 은 홀수입니다.\n" << endl;
	else
		cout << "니놈은 정수를 입력하지않았다 쒸불놈아." << endl;
	

	system("pause");
	return 0;
}
*/




/*
#include <iostream>
using namespace std;
void main()
{
	int a = 5;
	cout << a++ << endl;
	cout << ++a << endl;
	cout << a-- << endl;
	cout << --a << endl;
	
	system("pause");
// 5775 출력됨. 	
}
	*/ 




/*
// 대문자를 소문자로 소문자는 그대로. 쉬방 아스끼꼬드 계산해야대나..
#include <iostream>
using namespace std;	

int main()
{
	char char_temp;
	cout << "문자를 입력해라";
	cin >> char_temp;
	int char_gap = (int)'A' - (int)'a';

	((int)char_temp < (int)'a') ? cout << "변환 완료 " << char((int)char_temp + (int)((int)'a' - (int)'A')) << endl : cout << "변환 완료 " << char_temp << endl;
	
	system("pause");
	return 0;
// 이걸로 알수있는거는 cout 변수출력공간에서 별 이상한 연산을 다 해도 된다는거닼ㅋㅋㅋㅋㅋ 		
}
*/







/*
// 숫자를 입력해서 절댓값을 출력하라
#include <iostream>
using namespace std;
int main()
{
	int num; // 입력받을 정수형 변수 선언
	cout << "절댓값을 구할 수를 입력하라" << endl;
	cin >> num; // num 입력받음.
	
	(num >= 0) ? cout << num << "의 절댓값은 " << num << "이다" : cout << num << "의 절댓값은 " << -num << "이다"; // 절댓값 판단 계산
	
	cout << endl;
	
	system("pause");
	return 0;

}
*/




/*
#include <iostream>
using namespace std;
// 짝수 홀수 판단하는 코드. odd 가 짝수인듯 ㅎㅎㅎ 
void main()
{

	int a;
	cout << "\nInput the number : ";
	cin >> a;

	(a%2==1) ? cout << a << " is odd number" : cout << a << " is even number"; // 참일때 앞에꺼 실행 . a is odd number 라고 출력

	cout << endl;
	system("pause"); //vs2017 이거 개빡친다 ㅠㅠ
	
	
}
*/











//각 변수당 몇바이트를 쳐먹는지 알아보는 코드. 
/*
#include <iostream>
using namespace std;
int main()
{
	int test_int = 30;
	short test_short = 20;
	long test_long = 40;

	float test_float = 30;
	double test_double = 40;

	char test_char = 'Q';
	char test_string[6] = "hello";
	
	bool test_bool = true;

	cout << "이거는 내 컴퓨터 x64환경에서 메모리가 얼마만큼 할당되는지 확인하는 코드이다아아아\n" << endl;


	cout << "test_short의 값" << test_short << "\t test_short의 크기" << sizeof(test_short) << endl;
	cout << "test_int의 값" << test_int << "\t test_int의 크기" << sizeof(test_int) << endl;
	cout << "test_long의 값" << test_long << "\t test_long의 크기" << sizeof(test_long) << endl;
	
	cout << "test_float의 값" << test_float << "\t test_float의 크기" << sizeof(test_float) << endl;
	cout << "test_double의 값" << test_double << "\t test_double의 크기" << sizeof(test_double) << endl;
	
	cout << "test_char의 값" << (char)test_char << "\t test_char의 크기" << sizeof(test_char) << endl;
	cout << "test_string의 값" << test_string << "\t test_string의 크기" << sizeof(test_string) << endl;
	cout << "test_string의 각 값들을 하나씩 해보자, \t" << test_string[1] << "\t" << test_string[5]<< endl;

	cout << "test_bool의 값" << test_bool << "\t test_bool의 크기" << sizeof(test_bool) << endl;



	system("pause");
	
	return 0;
	
}
*/











//this 포인터 예제 
/*#include <iostream>
#include <string>
using namespace std;


class inventory {
	char item[20];
	double cost;
	int on_hand;

public:
	inventory(char *i, double c, int o)
	{
		strcpy(this->item, i); //this 포인터 사용
		this->cost = c;
		this->on_hand = o;
	}
	void show();

};

void inventory::show()
{
	cout << this->item;
	cout << ": $" << this->cost;
	cout << "  On hand: " << this->on_hand << "\n";

}

int main()
{
	inventory object(wrench, 4.95, 4);

	object.show();

	system("pause");
	return 0;
}*/









/*
#include <stdio.h>// 왜 iostream 헤더가 안붙지
#include <iostream>	//.h 붙이면 안댐 ㅎㅎㅎ <> 썼기때문인듯 ㅎㅎㅎ 이게 어디에있는파일이라 그런거라고 들음 ㅎㅎ 헤더파일 모여있는데

int main()
{
	int fact = 1;
	for (int i = 1; i < 6; i++)
		fact *= i;
	printf("factorial = %d \n", fact);
	system("pause"); //안꺼지게 하는 코드임
	return 0;
}
/*뭐 어때 우우우우우
우우우우우우
*/
// 그냥 주석  just comment 
//우우우우


/*

#include <iostream>
using namespace std;


int main() {


	int i, j;
	double d;



	i = 10;
	j = 20;
	d = 99.101;

	cout << "here are some values: ";
	cout << i << ' ' << j << ' ' << d;

	cin >> i;
	cin >> j;
	cin >> d;

	system("pause");

	return 0;





}




*/

/*

#include <iostream>
#include <string>
using namespace std;


class inventory {
	char item[20];
	double cost;
	int on_hand;

public:
	inventory(char *i, double c, int o) // const 붙여야함 ㅎㅎ 그래야 작동함  ㅎㅎ 2019 
	{
		strcpy(this->item, i); //this 포인터 사용
		this->cost = c;
		this->on_hand = o;
	}
	void show();

};

void inventory::show()
{
	cout << this->item;
	cout << ": $" << this->cost;
	cout << "  On hand: " << this->on_hand << "\n";

}

int main()
{
	inventory object("wrench", 4.95, 4);

	object.show();

	system("pause");
	return 0;
}
*/
