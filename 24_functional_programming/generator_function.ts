// ref : https://ko.javascript.info/generators

import { log, start } from "../common_util";

/**!SECTION
 *
 * 일반 함수는 하나의 값만을 반환한다
 * 하지만 제너레이터는 여러개의 값을 필요에 따라 하나씩 반환(yield) 할 수 있다
 * 제너레이터와 이터러블 객체를 함께 사용하면 손쉽게 데이터 스트림을 만들 수 있다
 */

start("Generator Function 예시", () => {
  function* generateSeq() {
    yield 1;
    yield 2;
    return 3;
  }

  // 제너레이터 함수는 일반 함수와 동작 방식이 다르다.
  // 제너레이터 함수를 호출하면 코드가 실행되지 않고, 대신 실행을 처리하는 특별객체, '제너레이터 객체' 가 반환된다

  const generator = generateSeq();
  log(generator); // Object [Generator] {}

  // next()는 제너레이터의 주요 메서드이다.
  // next() 를 호출하면 가장 가까운 yield <value> 문을 만날때까지 실행이 지속된다 value를 생략할 수 있는데 이때는 undefined가 된다
  // yield <value> 문을 만나면 실행이 멈추고 산출하고자 하는 값인 value가 바깥 코드에 반환된다

  // next()는 {value:T, done:boolean} 을 반환 value는 산출값, done 은 함수 실행이 끝났는지 여부
  log(generator.next()); // { value: 1, done: false }
  log(generator.next()); // { value: 2, done: false }
  log(generator.next()); // { value: 2, done: true }
  log(generator.next()); // { value: undefined, done: true }
  log(generator.next()); // { value: undefined, done: true }
});

start("Generator는 Iterable이다", () => {
  // next() 메소드에서 짐작했듯이 Generator는 Iterable이다
  function* range(length: number) {
    for (let i = 0; i < length; i++) yield i;
  }

  for (let value of range(10)) {
    // 주의할점은 done:true 이면 무시하기때문에 return 으로 마지막 리턴한것은 여기에서 못 본다
    // 모든값 보려면 마지막 것도 yield로 리턴하세요
    log(value); // 0에서 9까지 출력이 된다
  }

  // 제너레이터는 이터러블 객체이므로 제너레이터에도 전개문법(...)같은 것을 적용할 수 있다
  log([-1, ...range(5)]); // [ -1, 0, 1, 2, 3, 4 ]
});

start("Iterable 대신 Generator 사용하기 ", () => {
  // 기존 Iterable
  let iterRange = {
    from: 1,
    to: 5,
    [Symbol.iterator]: function () {
      return {
        current: this.from,
        last: this.to,
        next() {
          if (this.current <= this.last)
            return { value: this.current++, done: false };
          else return { value: undefined, done: true };
        },
      };
    },
  };
  const iter = iterRange[Symbol.iterator]();
  log(iter.next()); // { value: 1, done: false }
  log(iter.next()); // { value: 2, done: false }

  for (const a of iterRange) log(a); // 1~5
  for (const a of iterRange) log(a); // 1~5

  // Generator 사용
  log("Generator 사용");
  let range = {
    from: 1,
    to: 5,
    // [Symbol.iterator]:function*(){} 을 줄임
    *[Symbol.iterator]() {
      // Iterable을 사용한 예시보다 훨씬 간결한데 동일한 기능을 제공함
      for (let value = this.from; value <= this.to; value++) {
        yield value;
      }
    },
  };
  for (const a of range[Symbol.iterator]()) {
    log(a);
  }
});

start("제너레이터 컴포지션", () => {
  function* generateSequence(start: number, end: number) {
    for (let i = start; i <= end; i++) yield i;
  }

  function* generatePasswordCodes() {
    yield* generateSequence(48, 57);
    yield* generateSequence(65, 90);
    yield* generateSequence(97, 122);
  }
  // yield* 는 실행을 다른 제너레이터에 위임
  const genCode = generatePasswordCodes();
  log(genCode.next()); // 48
  log(genCode.next()); // 49
  //   for (const code of generatePasswordCodes()) { // 48 에서 122 쭈윽 반복
  //     log(code); // 48 에서 122 쭈윽 출력
  //   }
});

start("제너레이터 양방향 정보교환", () => {
  function* gogogo() {
    let gogogo = true;
    let i = 1;
    while (gogogo) {
      gogogo = yield i;
      i += 1;
    }
  }

  const gogogoGen = gogogo();
  log(gogogoGen.next()); // yield i // 1
  log(gogogoGen.next(true)); // gogogo = true 다시 while 위로 가서 yield 2
  log(gogogoGen.next(true)); // gogogo = true 다시 while 위로 가서 yield 3
  log(gogogoGen.next(false)); // undefined gogogo = false 다시 while 위로 가서 그런데 조건이 false여서 return
  log(gogogoGen.next(true)); // undefined
  log(gogogoGen.next(true)); // undefined
});

start("generator.throw ", () => {
  function* gogogo() {
    let gogogo = true;
    let i = 1;
    while (gogogo) {
      try {
        gogogo = yield i;
      } catch (err) {
        console.warn(err);
        console.warn("전속전진이라는데요?");
      } finally {
        i += 1;
      }
    }
  }

  const gogogoGen = gogogo();
  log(gogogoGen.next()); // yield i // 1
  log(gogogoGen.next(true)); // gogogo = true 다시 while 위로 가서 yield 2
  log(gogogoGen.next(true)); // gogogo = true 다시 while 위로 가서 yield 3
  log(gogogoGen.throw(new Error("전속전진다"))); // 제너레이터 안에서 예외 처리하지않으면 다시 바깥으로 예외가 또 던져지고 여기서도 핸들하지않으면 스크립트 죽는다
  // 일단 여기서는 4를 리턴받는다 catch로 잡았고 gogogo도 저번값 유지인 true이기 때문
  log(gogogoGen.next(true)); // 5 를 리턴받는다
  log(gogogoGen.next(false)); // undefined
  log(gogogoGen.next(true)); // undefined
});
