import "reflect-metadata";

// https://rbuckton.github.io/reflect-metadata/
// 문서

const run = async (func: () => void) => {
  await func();
};

const print = (...args: any) => {
  console.log(args);
};

// 기본적인 set get
run(() => {
  class C {
    @Reflect.metadata("__mkey__", { hello: "moto" })
    methodA() {}
  }
  const c = new C();
  // check for presence of a metadata on the prototype chain of an 'object' or 'property'
  print(Reflect.hasMetadata("__mkey__", C.prototype)); // false1
  print(Reflect.hasMetadata("__mkey__", C.prototype, "methodA")); // true
  print(Reflect.hasMetadata("__mkey__", c)); // false1
  print(Reflect.hasMetadata("__mkey__", c, "methodA")); // true

  print(Reflect.getMetadata("__mkey__", c, "methodA")); // { hello: 'moto' }
  print(Reflect.getMetadata("__mkey__", C.prototype, "methodA")); // { hello: 'moto' }

  // it will override
  Reflect.defineMetadata("__mkey__", "woowowwo", C.prototype, "methodA");

  print(Reflect.getMetadata("__mkey__", c, "methodA")); // 'woowowwo'
  print(Reflect.getMetadata("__mkey__", C.prototype, "methodA")); // 'woowowwo'

  print(Reflect.getOwnMetadata("__mkey__", c, "methodA")); // undefined
  print(Reflect.getOwnMetadata("__mkey__", C.prototype, "methodA")); // 'woowowwo'

  // 신기한게 객체에다가 defineMetadata 하면 객체만 영향받는다!? 뭐지 prototype에 대해서 좀 더 알아봐야할듯 넌 정체가 뭐냐
  Reflect.defineMetadata("__mkey__", "I AM Atomic", c, "methodA");
  print(Reflect.getMetadata("__mkey__", c, "methodA")); // 'I AM Atomic'
  print(Reflect.getMetadata("__mkey__", C.prototype, "methodA")); // 'woowowwo'
  print(Reflect.getMetadata("__mkey__", C, "methodA")); // undefined

  // 모든 키를 출력해보자

  console.log("모든 메타데이터 키를 출력해보자");
  print(Reflect.getOwnMetadataKeys(c, "methodA")); // ['__mkey__']
  print(Reflect.getOwnMetadataKeys(C.prototype, "methodA")); // ['design:returntype','design:paramtypes','design:type','__mkey__']
  print(Reflect.getOwnMetadataKeys(C, "methodA")); // []
  print(Reflect.getMetadataKeys(c, "methodA")); // ['design:returntype','design:paramtypes','design:type','__mkey__']
  print(Reflect.getMetadataKeys(C.prototype, "methodA")); // ['design:returntype','design:paramtypes','design:type','__mkey__']
  print(Reflect.getMetadataKeys(C, "methodA")); // []
});

// on constructor 과 on prototype 차이점을 모르겠단 말이지
run(() => {
  console.log("on constructor 과 on prototype 차이점을 알아보자");
  const metadataKey = "__wowowo__";
  class AntiHero {
    static sayHelloStatic() {}
    sayHello() {}
    name: string;
  }

  // ######## static method
  console.log("static method");
  print(Reflect.hasMetadata(metadataKey, AntiHero, "sayHelloStatic")); // false
  print(Reflect.hasMetadata(metadataKey, AntiHero.prototype, "sayHelloStatic")); // false

  Reflect.defineMetadata(
    metadataKey,
    "onononConstructor",
    AntiHero,
    "sayHelloStatic"
  );

  print(Reflect.hasMetadata(metadataKey, AntiHero, "sayHelloStatic")); // true
  print(Reflect.hasMetadata(metadataKey, AntiHero.prototype, "sayHelloStatic")); // false
  Reflect.defineMetadata(
    metadataKey,
    "onononPrototype",
    AntiHero.prototype,
    "sayHelloStatic"
  );

  print(Reflect.hasMetadata(metadataKey, AntiHero, "sayHelloStatic")); // true
  print(Reflect.hasMetadata(metadataKey, AntiHero.prototype, "sayHelloStatic")); // true
  print(
    Reflect.hasMetadata(metadataKey, AntiHero.constructor, "sayHelloStatic")
  );

  const antiHere = new AntiHero();
  print(Reflect.hasMetadata(metadataKey, antiHere, "sayHelloStatic")); // true
  print(Reflect.getMetadata(metadataKey, antiHere, "sayHelloStatic")); // 'onononPrototype'
  print(Reflect.getMetadata(metadataKey, AntiHero, "sayHelloStatic")); // 'onononConstructor'

  // ########## method
  console.log("method");
  print(Reflect.hasMetadata(metadataKey, AntiHero, "sayHello")); // false
  print(Reflect.hasMetadata(metadataKey, AntiHero.prototype, "sayHello")); // false

  Reflect.defineMetadata(
    metadataKey,
    "onononConstructor",
    AntiHero,
    "sayHello"
  );

  print(Reflect.hasMetadata(metadataKey, AntiHero, "sayHello")); // true
  print(Reflect.hasMetadata(metadataKey, AntiHero.prototype, "sayHello")); // false

  Reflect.defineMetadata(
    metadataKey,
    "onononPrototype",
    AntiHero.prototype,
    "sayHello"
  );

  print(Reflect.hasMetadata(metadataKey, AntiHero, "sayHello")); // true
  print(Reflect.hasMetadata(metadataKey, AntiHero.prototype, "sayHello")); // true

  // ########## string property
  console.log("string property");
  print(Reflect.hasMetadata(metadataKey, AntiHero, "name")); // false
  print(Reflect.hasMetadata(metadataKey, AntiHero.prototype, "name")); // false

  Reflect.defineMetadata(metadataKey, "onononConstructor", AntiHero, "name");

  print(Reflect.hasMetadata(metadataKey, AntiHero, "name")); // true
  print(Reflect.hasMetadata(metadataKey, AntiHero.prototype, "name")); // false

  Reflect.defineMetadata(
    metadataKey,
    "onononPrototype",
    AntiHero.prototype,
    "name"
  );

  print(Reflect.hasMetadata(metadataKey, AntiHero, "name")); // true
  print(Reflect.hasMetadata(metadataKey, AntiHero.prototype, "name")); // true

  // ########## 존재하지않는것
  console.log("존재하지않는것");
  print(Reflect.hasMetadata(metadataKey, AntiHero, "age")); // false
  print(Reflect.hasMetadata(metadataKey, AntiHero.prototype, "age")); // false

  Reflect.defineMetadata(metadataKey, "onononConstructor", AntiHero, "age");

  print(Reflect.hasMetadata(metadataKey, AntiHero, "age")); // true
  print(Reflect.hasMetadata(metadataKey, AntiHero.prototype, "age")); // false

  Reflect.defineMetadata(
    metadataKey,
    "onononPrototype",
    AntiHero.prototype,
    "age"
  );

  print(Reflect.hasMetadata(metadataKey, AntiHero, "age")); // true
  print(Reflect.hasMetadata(metadataKey, AntiHero.prototype, "age")); // true
});

run(() => {
  console.log("나의 자그마한 궁금증");
  const metakey = "__sss__";
  class My {
    methodA() {}
  }
  const my = new My();
  const mi = new My();

  Reflect.defineMetadata(metakey, "hey~", my, "methodA");
  print(Reflect.getMetadata(metakey, my, "methodA")); // "hey~"
  print(Reflect.getMetadata(metakey, My.prototype, "methodA")); // undefined
  print(Reflect.getMetadata(metakey, My, "methodA")); // undefined
  print(Reflect.getMetadata(metakey, mi, "methodA")); // undefined

  // Reflect.defineMetadata(metakey, "hey~", Object.getPrototypeOf(my), "methodA");
  // print(Reflect.getMetadata(metakey, my, "methodA")); // "hey~"
  // print(Reflect.getMetadata(metakey, My.prototype, "methodA")); // "hey~"
  // print(Reflect.getMetadata(metakey, My, "methodA")); // undefined

  class Apple {
    static sayHelloStatic() {}
    sayHello() {}
    name: string;
  }

  print(Reflect.defineMetadata("__taste__", "not bad", Apple.prototype));
  print(Reflect.getMetadata("__taste__", Apple.prototype));
  print(Reflect.getMetadata("__taste__", new Apple()));

  Reflect.defineMetadata(
    "__speakable__",
    "과일은 말을 할 수 없어요",
    Apple.prototype,
    "sayHello"
  );
  print(Reflect.getMetadata("__speakable__", Apple.prototype, "sayHello")); // 'not bad'
  print(Reflect.getMetadata("__speakable__", new Apple(), "sayHello")); // 'not bad'
});
