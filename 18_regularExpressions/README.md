# 규식이형
`https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions`

# 테스트
```
node {file}.js
```

# 정규 표현식

### 정규표현식 만들기
* 정규식 리터럴(슬래쉬 '/' 로 감싸는 패턴)
 - var re = /ab+c/;
 - 정규식이 상수라면 이렇게 사용하는 것이 성능이 빠름
* RegExp 객체의 생성자 함수를 호출
 - 실행시점에 컴파일됨
 - 사용 시점에 다른곳에서 패턴을 가져와야할때는 이렇게 생성자 함수를 사용
 - var re = new RegExp("ab+c");


### 정규식 패턴 작성하기
```
정규식 패턴은 /abc/ 같이 단순문자로 될수도있고, /ab*c/ 같이 특수문자로 될 수도 있다.
```

* 단순패턴
```
hi do you know your abc's 에서 /abc/ 로 매칭을 하면 매칭이 된다
Grab crab 은 ab c 이므로 /abc/로 매칭이 안된다
```

* 특수문자
``` 
검색에서 하나 이상의 b가 포함된 특정한 문자열을 찾고싶다하면
예를들어 /ab*c/ 는 
*는 앞의 문자가 0개또는 여러개 라는 것을 뜻함
ac abc abbbc abbbbc 매칭된다
```

### 정규식에서 특수 문자
* '\'
```
일반 문자 앞에 올때는 이 문자는 평범한 문자가 아니라는 것을 의미
\b
특수 문자 앞에 올때는 이 문자는 다음에 나오는 문자는 특별하지않고 문자 그대로 해석되어야한다는 사실을 가리킨다
/ab*c/ 에서 *이 단순문자임로 하고싶으면 /ab\*c/ 로 *가 특별하지 않다는 것을 의미

RegExp("patter") 표기를 쓸때 \자체를 이스케이프 시켜줘야한다
ex) new RegExp('ab\\*c)
```

* '^'
```
입력의 시작 부분에 대응, 다중행 플래그가 참으로 설정되어 있다면 줄 바꿈 문자 바로 다음부분과도 대응됨

/^A/ 는 "an A"의 A와는 대응안함, "An E"의 A와는 대응함 완전 시작부분에 대응을 의미하는것같음

하지만 ^가 문자셋 ([abc]) 패턴의 첫 글자로 쓰인다면 그 때는 다른 의미를 가짊
```

* '$'
```
입력의 끝 부분과 대응, 만약 다중행 플래그가 참이면 줄바꿈문자의 바로 앞과 대응됨
/t$/ 는 "eater"의 t와는 대응을 안하지만 "eat" 의 t에는 대응을 함
```

* '*'
```
앞의 표현식이 0개 또는 연속으로 반복되는 부분과 대응 {0,} 과 같은 의미
```

* '+'
```
앞의 표현식이 1회 이상 연속으로 반복되는 부분과 대응한다 {1,} 과 같은 의미
```

* '?'
```
앞의 표현식이 0 또는 1회 등장하는 부분과 대응한다 {0, 1}과 같은 의미

만약 수량자 *, +, ?, 가 {} 바로 뒤에 사용되면 기본적으로 탐욕스럽던(가능한 많이 대응한다) 수량자를 탐욕스럽지 않게 함
/\d+/ 를 "123abc"에 대응시키면 123과 대응함
/\d+?/ 는 오직 1만 대응

또한 이 문자는 x(?=y), x(?!y) 같은 사전 검증을 위해서도 쓰임
```

* '.'
```
개행 문자를 제외한 모든 단일 문자외 대응
/.n/ 은 "nay an apple is on the"에서 nay는 대응안하고 
an, on 에 대응함
```

* '(x)'
```
x에 대응되고 그것을 기억함 괄호는 포획괄호라고 함 (capturing parenthesse)

패턴 /(foo) (bar) \1 \2/ 안의 (foo)와 (bar) 는 문자열 "foo bar foo bar" 에서 처음 두 단어 foo와 bar를 대응하고 이를 기억함
그 뒤에 \n 패턴은 그 기억한 포획단어를 대응된 문자열과 똑같은 문자열에 대응함 따라서 마지막 두 단어 foo bar를 또 대응함
```

* '(?:x)'
```
비포획 괄호
괄호를 사용하면서 대응된 문자열을 기억하고 싶지 않을때 
https://bohyeon-n.github.io/deploy/javascript/regexp.html
만약에 
foo 단어에 {1,2} 를 적용하고싶다
/foo{1,2}/ 라면 o{1,2} 되서 'foo' 단어의 마지막 o에만 적용된다
단어 하나를 그 전체에 {1,2} 적용하고싶다
하면 
/(?:foo){1,2}/ 하자
```

* 'x(?=y)` 와 'x(?!y)'
```
x(?=y) 는 
무조건 y가 따라오는 x를 대응

x(?!y) 는
y가 따라오지 않는 x를 대응
```

* 'x|y'
```
x 또는 y에 대응
```

* '{n}' 와 '{n, m}'
```
앞 표현식이 n번 나타나는 부분에 대응
/a{2}/ a가 두개 나타나는 곳에 대응

/a{n,m} 
최소 n개 최대 m개가 나타나는 부분에 대응 m이 생략되면 무한대로 취급
```

* \[xyz\]' 과 \[^xyz\]
```
[xyz] 문자셋
괄호안에 어떤 문자와도 대응 [a-d] 는 [abcd]와 똑같이 동작

^붙으면 부정문자셋
괄호내부에 등장하지않는 어떤 문자와도 대응
```

* 그외
```
[\b] : 백스페이스에 대응
\b : 단어 경계에 대응 : 단어경계 moon 에서 \bm일때 m의 앞에 아무것도 없으므로 대응, oo\b일때 oo 뒤에 뭐가 있으므로 대응 안함
\B : 단어 경계가 아닌것에 대응
\d : 숫자 문자에 대응
\D : 숫자 문자가 아닌것에 대응
\s : 하나의 공백문자 대응
\S : 공백문자가 아닌 하나의 문자에 대응
\t : 탭
\v : 수직 탭

```


