# Typescript 학습

### typescript는 런타임 체크를 할 수가 없다
```js
interface A { 
    name : string;
}

interface B extends A{
    age : number;
}
type Shape = A | B ;
function eee(val : B){
    if(val instanceof B){
        return val.age + val.name;
        // 이거 런타임 에러 날 수 있다. 
        // 타입체크는 안댄다 런타임에 
    }
}

// 방법 1 
if('age' in val){}
// 해당 속성이 있는지 체크해서 타입체크를 하는 방법 

//방법 2 
interface A {
    kind : 'a'
}
interface B extends A {
    kind : 'b'
}
if(val.kind === 'b'){}
//이런식으로 타입을 기입한다 

// 방법 3 
// 애초에 클래스로 작성
class A {
    constructor(public name : string){}
}
class B extends A {
    constructor(public name : string, public age:number){
        super(name);
    }
}

```

### type 연산은 런타임 영향 안줌 
```js
~~ as number; 
이거 js로 컴파일될대 아무것도 아님 
asArray(str:string){
    return str as number ; // 이거 하지마라.... 
}

```

### type 단언보다 선언을 이용 (as type  -> : type )


### type연산과 generic 사용으로 반복 줄이기
```js
interface State{
    userId: string;
    pageTitle: string;
    recentFiles: string[];
    pageContents: string;
}

interface TopNavState{
    userId:string;
    pageTitle:string;
    recentFiles:string[];
}

// 위는 State의 특정 필드만 사용하는 TopNavState 선언 
// 요것을 아래와 같이 중복을 줄일수있다
type TopNavState = {
    userId: State['userId'];
    pageTitle: State['pageTitle'];
    recentFiles: State['recentFiles'];
}
// State에서 타입을 수정했을때 굳이 TopNav... 여기도 바꿀 필요가 없다

// 이런식으로 발전 가능 
type TopNavState = {
    [k in 'userId' | 'pageTitle' | 'recentFiles' ]: State[k]
}

// 이러한 방식은 표준 라이브러리에도 있다 Pick 방식이라고 한다 
type TopNavState = Pick<State, 'userId' | 'pageTitle' | 'recentFiles'>;



// ############### Options 를 update할때 사용하는 OptionsUpdate 반복제거
interface Options { 
    width : number;
    height : number;
}
interface OptionsUpdate{
    width? : number;
    height?: number;
}
// 대신에 
type OptionsUpdate = {[k in keyof Options]?: Options[k]};
// 또 이 대신에 표준라이브러리에서 Partial 이라는 것을 지원해줌
class UIWidget{
    constructor(init:Options){}
    update(options:Partial<Options>){}
}

//################ 특정함수의 리턴타입을 특정한 type으로 정의하고싶다 
type UserInfo = ReturnType<typeof 해당함수>;
```

### XXXXXXXXXx item18 oreilly effective typescript 이해불가 


### 공식명칭에는 상표를 붙이기 
```js
interface Vector2D { 
    x: number;
    y: number;
}

function calculateNorm(p: Vector2D){
    return Math.sqrt(p.x * p.x + p.y * p.y);
}

interface Vector3D { 
    x: number;
    y: number;
    z: number;
}

// 구조적 타이핑의 특성 때문에 이상한 결과를 만들 수 있다 
calculateNorm({2, 3});
calculateNorm({2, 3, 4});
// 똑같은 결과가 나온다 
// 공식 명칭은 타입이 아니라 값의 관점에서 vector2d라고 하는것 

interface Vector2D{
    _brand: '2d';
    x: number;
    y: number;
}// 요런식으로 하면 calcuateNorm에 vector3D 넣으면 타입에러 뜬다 
// 이러한 상표(브랜드) 기법은 런타임에는 사용되어지지않기때문에 런타임 오버헤드가 없다


// 이진탐색에서도 
// 이진탐색은 정렬된 어레이에서만 동작해야한다. 
// 이진탐색파라미터가 정렬된 어레이라는 것을 보장하기 위한 브랜드 기법

type SortedList<T> = T[] & {_brand: 'sorted'};

function isSorted<T>(xs: T[]): xs is SortedList<T> {
    // 검증 
    return false;
    return true;
}
function binarySearch<T>(xs: SortedList<T>, x:T): boolean{
    // ...
}
```


### 몽키패치보다는 안전한 타입을 사용하기 
```js 
// 객체에 특정 속성을 추가할때가 있다 
window.monkey = 'hello';
// 대신에 
(windows as any).monkey = 'hello'; // 이것도 좋은 방법은 아님

// 방법 1 
// interface의 특수기능중 하나인 보강(augmentation) 사용 
interface Window{
    monkey: string;
}
window: monkey = 'hello'; // 정상 

// 모듈의 관점에서 (타입스크립트 파일이 import / export 를 사용하는 경우) 제대로 동작하게 하려면 global 선언을 추가해야함
export {};
declare global{
    interface Window{
        monkey:string;
    }
}
window.monkey = 'hello';
// 주의해야할정음 보강은 전역적으로 사용되기때문에 다른부분이나 라이브러리로부터 분리할 수 없다 .
// 실행시점에 보강을 적용할 방법이없다. 이러한 이유로 string|undfined 로 해야할수도있다. 

// 방법2 
interface MonkeyDocument extends Document {
    monkey: string;
}
(document as MonkeyDocument).monkey = 'hello';
// 이제 사용하는곳에서만 이렇게 단언문을 사용해서 사용하면 된다 .
// 하지만 몽키패치 남용해서는 안되고 궁극적으로 더 잘 설계된 구조로 리팩토링 하는 것이 좋다 
```

### type-coverage 를 사용해서 타입 안정성 유지하기 


### api 주석에 TSDoc 사용하기 
```js

/** 인사말을 출력한다. JSDoc
 * @param name 인사할 사람의 이름
 * @param title 그 사람의 칭호
 * @returns 사람이 보기 좋은 형태의 인사말 
*/
function sayHello(name:string, title:string):string{
    return "ㅎㅇ";
}

// TSDoc

/**
 * 이 _interface는 **세 가지** 속성을 가진다, md형식으로 꾸며짐
 * 1. x
 * 2. y
 * 3. z
 *
*/
interface Vector3D{
    /** x 좌표 */
    x:number;
    y:number;
    z:number;
}
```


### THIS 
```js
function f1(){
    return this;
}

// 브라우저 
f1() === window; // true
// Nodejs 
f1() === global; // true


var obj = {a: 'custom'};

var a = 'global';

function whatsThis(){
    return this.a; // 함수 호출 방식에 따라 값이 달라진다
}

whatsThis(); //  this 는 Global
whatsThis.call(obj) // this 는 Custom 
whatsThis.apply(obj) // this 는 Custom


function add(c, d){
    return this.a + this.b + c + d;
}

var o = {a: 1, b: 3};

add.call(o, 5, 7); // 16
// 첫번째 인자는 this로 사용할 객체 이어지는 인자들은 함수 호출에서 인수로 전달된다.
add.apply(o, [10, 20]); // 34

// bind 는 새로운 함수를 생성 
// this 반영구적으로 bind()의 첫번째 매개변수로 고정 
var g = f.bind({a:'hello'});
console.log(g());
var h = f.bind({b:'dsafaf'}); // 이거는 안통함 

// !!! 화살표 함수는 this 강제로 정해줘도 안통함 자기 위에 있는거를 this로 친다고 함 ...

```


### 오버로딩 타입보다 조건부 타입을 사용
```js
function double<T extends number | string>(x: T): T extends string ? string : number;
function double(x:an){return x+x;}
```


### typescript 기능보다 ECMAscript 사용하기 
```js
// 타입스크립트가 타입만 ts39스크립트는 런타임만 이 되기전에 
// 나온 기능들이 있다. 이것들은 유의해야한다.

// enum 
```


### 객체를 순회하는 노하우
```js 
const obj = {
    one: "two", 
    two: "dos",
    three : "three",
}
for (const k in obj){
    const v = obj[k]; // 에러 obj에 인덱스 시그니쳐 없음 
}

//대신
let k : keyof typeof obj; // "one" | "two" | "three" 
for(k in obj){
    const v = obj[k]; // 정상
}
// 하지만 key8of 키워드는 v 타입이 한정디어 문제가 된다 
// ABC타입에 할당 가능한 객체에는 abc 외에 다른 속성이 존재할 수 도 있다.

// 다음을 사요하면 좋다
function foo(abc: ABC){
    for(const [k, v] of Object.entries(abc)){
        k // string type
        v // any type
    }
}
```

### 정보를 감추는 목적으로 private 사용하지 않기
```js
// 많은 이가 비공개 속성임을 나타내기 위해서 언더스코어 _ 를 접두사로 붙이던 것이 관례로 인정됨 /
// 근데 자바스크립트는 클래스에 비공개 속성을 만들 수 없음

class Foo {
    _private;
}

// public protected private 같은 접근 제어자는 런타임때 아무 소용이 없음, 컴파일 후에 제거됨

// 대신 클로저를 사용 
// 근데 불편함
// 메소드를 생성자 내에서 생성해야하므로 
// 인스턴스 생성할 때마다 각 메서드의 복사본이 생겨서 메모리 낭비됨
// # 접두사가 표준화 진행중 음..
declare function hash(text: string):number;

class PasswordChecker{
    checkPassword: (password: string) => boolean
    constructor(passwordHash: number){
        this.checkPassword = (password: string) => {
            return hash(password) === passwordHash;
        }
    }
}

```


### for(;;) 대신 for-of 또는 배열 메소드 사용하기 
```js
// for in 은 몇가지 문제점도 있고 객체 순회할때 사용한다
```

### 단축 객체 표현과 구조 분해 할당 사용하기
```js
const x = 1, y = 2, z = 3;
const pt = {
    x : x,
    y : y,
    z : z,
}
// 변수와 객체 속성의 이름이 같다면 다음처럼 축약
const x = 1, y = 2, z = 3;
const pt = {x, y, z};


// 객제 구조 분해 object destructuring
const props = obj.props;
const a = props.a;
const b = props.b;

// 다음처럼 분해 가능
const {props} = obj;
const {a, b} = props;

// 극단적으로 다음과 같이 줄일 수도 있음
const {props: {a, b}} = obj;

// 구조분해시에 기본값할당하는 방법 if사용
let {a} = obj.props;
if(a===undefined) a = 'default';
//다음과 같이 기본값 설정 가능
const {a = 'default'} = obj.props;

// 배열에도 구조 분해 문법 사용가능 , 튜플처럼 사용하는 배열에서 특히 유용
const point = [1,2,3];
const [x, y, z] = point;
const [,a,b] = point; // 첫 번째 요소 무시 

// 함수 매개변수에도 구조분해 문법 사용 가능
const points = [
    [1,2,3],
    [4,5,6],
];
points.forEach(([x,y,z]) => console.llog(x + y +z));

```


### 함수 매개변수에 기본값 사용하기 
```js
function parseNum(str, base=10)
```

### 연관배열대신 map, set 사용
```js

//단어갯수 사용하는데 다음과 같은 타입이 사용
const counts: {[word: string]: number} = {};
// 여기에 단어가 constructor가 만약에 걸리면 에러 뜸 객체에 constructor 는 객체 Object.prototype에 있는 생성자 
// 따라서 map이나 set 사용 
```

### typescript 에서 use strict 사용하지 않기 