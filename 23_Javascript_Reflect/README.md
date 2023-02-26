# Reflect

# link https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Reflect

```typescript
Reflect.apply();
// 대상 함수를 주어진 매개변수로 호출하는것
// Function.prototype.apply() 참고

Reflect.construct();
// 함수로 사용하는 new 연산자. new target(...args) 을 호출하는것과 같다.

Reflect.defineProperty();
// Object.defineProperty() 와 비슷하다. boolean 을 반환

Reflect.deleteProperty();
// 함수로 사용하는 delete 연산자 delete target[name] 을 호출하는것과 같다

Reflect.get();
// 대상 속성의 값을 반환하는 함수

Reflect.getPrototypeOf();
// Object.getPrototypeOf() 와 같다

Relfect.has();
// 함수로 사용하는 in 연산자다. 자신 또는 상속한 속성이 존재하는지 나타낸다 boolean을 사용

Reflect.isEntensible();
// Object.isExtensible() 과 같다

Reflect.ownKeys();
// 대상 객체의 자체 키 (상속하지 않은 키) 목록을 배열로 반환

Reflect.preventExtensions();
// Object.preventExtensiton() 와 비슷하다. Boolean을 반환

Reflect.set();
// 속성에 값을 할당하는 함수. 할당 성공 여부는 boolean을 반환

Reflect.setPrototypeOf();
// 객체의 프로토타입을 지정하는 함수, 지정 성공 여부를 나타내는 boolean을 반환
```
