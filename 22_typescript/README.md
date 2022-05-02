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