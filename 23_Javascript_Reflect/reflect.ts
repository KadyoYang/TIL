const run = async (func: () => void) => {
  await func();
};
/**!SECTION
 *
 * Reflect.construct()
 * new Operator와 같이 작동하는 정적 메소드
 */

run(() => {
  return;
  function createSomething(a: number, b: number) {
    // @ts-ignore
    this.sum = a + b;
    // @ts-ignore
    this.mul = a * b;
  }
  const whoami = Reflect.construct(createSomething, [3, 5]);
  console.log(whoami);
});

// Reflect.getOwnPropertyDescriptor()
// 주어진 property의 property descriptoer를 리턴한다.
// 있으면 object 이고 없으면 undefined 이다
run(() => {
  // return;
  const object1 = {
    a: 1,
    b: "asdsd",
  };
  console.log(Reflect.getOwnPropertyDescriptor(object1, "a")); // { value: 1, writable: true, enumerable: true, configurable: true }
  console.log(Reflect.getOwnPropertyDescriptor(object1, "b")); // { value: 'asdsd', writable: true, enumerable: true,configurable: true }
  // prototype chain에서 정보 긁어 오는게 아니라 object1 그 자체에서 꺼내오는것
  // property Descriptor의 value writable enumrable configurable은 도대체 뭐냐
  // TypedPropertyDescriptor<T>
  // value : 객체의 현재 값을 가지고있다!!!!
  // writable : 해당 프로퍼티에 새로운 값을 할당할수 있는지 여부를 boolean으로 가지고있다
  // enumerable : for in 이나 for of 또는 Object.keys에서 나타날지 안나타날지 여부를 가지고 있따
  // configurable : 유저가 writable이나 enumerable같은 세팅을 바꿀수 있는지 없는지 권한 여부를 가지고 있따

  console.log("property descriptor experiments");
  let iAmAtomic = {
    bomb: true,
    bbb: 202020,
  };
  console.log(Reflect.getOwnPropertyDescriptor(iAmAtomic, "bomb"));
  Object.defineProperty(iAmAtomic, "bomb", { writable: false });
  console.log(Reflect.getOwnPropertyDescriptor(iAmAtomic, "bomb"));
  try {
    iAmAtomic.bomb = false;
  } catch (err) {
    console.log(err);
  }

  console.log(Object.keys(iAmAtomic));
  Object.defineProperty(iAmAtomic, "bbb", { enumerable: false });
  console.log(Object.keys(iAmAtomic));
  // Relfect.getOwnKeys 로 하면 다 보이네 그래도 ㅎㅎ

  // 객체 생성할때 먹일수도있다
  let bbb = Object.create(Object.prototype, {
    a: { value: 1, writable: false },
    b: { value: 2, writable: true },
  });
  console.log(bbb.a);
  console.log(bbb.b);
  console.log(Reflect.has(bbb, "a"));

  console.log("prevent Extensible experiments");
  const kekai = { a: 1212 };
  console.log(kekai);
  console.log(Reflect.isExtensible(kekai));
  console.log(kekai);
  Reflect.preventExtensions(kekai);
  console.log(Reflect.isExtensible(kekai));
  console.log(kekai);
  try {
    // @ts-ignore
    kekai.abc = 123;
  } catch (err) {
    console.log(err);
  }
});
