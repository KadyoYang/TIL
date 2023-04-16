import { log, start } from "../common_util";

// Generator<여기가 yield하는 타입, 여기가 그냥 return 하는 타입 보통 void, 여기가 yield할때 넣어줄타입인데 보통 안넣는데 그냥 unknown>

function* filter<T>(
  f: (target: T) => boolean,
  iter: Iterable<T>
): Generator<T, void, unknown> {
  for (const a of iter) {
    if (f(a)) yield a;
  }
}

function* map<T, R>(
  f: (target: T) => R,
  iter: Iterable<T>
): Generator<R, void, unknown> {
  for (const a of iter) {
    yield f(a);
  }
}

// 이거는 제너레이터로 안만들고 일반 함수로 만든다
function take<T>(length: number, iter: Iterable<T>) {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === length) return res;
  }
  return res;
}

function takeWhile<T>(f: (...args: any) => boolean, iter: Iterable<T>) {
  // @ts-ignore
  iter = iter[Symbol.iterator]();
  // @ts-ignore
  iter.return = null; // #TODO 넌 뭐야
  let res: T[] = [];
  return (function recur(): any {
    for (const a of iter) {
      const b = go1(a, f);
      if (!b) return res;
      if (b instanceof Promise)
        return b.then(async (b) => (b ? (res.push(await a), recur()) : res));
      res.push(a);
    }
    return res;
  })();
}

// reduce 안고치고
/** @deprecated */
function reduceOld<T, R>(f: (acc: R, t: T) => R, acc: R, iter: Iterable<T>) {
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
}
// reduce 안고치고
/** @deprecated */
// @ts-ignore
const goOld = (a, ...fs) => reduce((a, f) => f(a), a, fs);

function reduce<T, R>(f: (acc: R, t: T) => R, acc: R, iter: Iterable<T>): R;
function reduce<T, R>(f: (acc: R, t: T) => R, iter: Iterable<T>): R;
// @ts-ignore
function reduce(f, acc, iter?) {
  if (arguments.length === 2) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    // #TODO 이거 아규먼트 2개왔을때 iter는 Iterable이 아니라 Iterator 일텐데 이게 어떻게 되는거지 내가 잘못 알고있는건가... 타입이 없으니까 혼돈이다
    acc = f(acc, a);
  }
  return acc;
}

// @ts-ignore // 프로미스 대응
const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));
// @ts-ignore
const go = (...as) => reduce(go1, as);

const curry =
  <F extends (...arg: any) => any>(f: F) =>
  //@ts-ignore
  (a, ...bs) =>
    //@ts-ignore
    bs.length ? f(a, ...bs) : (...bs) => f(a, ...bs);

const CF = {} as any;
CF.map = curry(map);
CF.filter = curry(filter);
CF.take = curry(take);
CF.reduce = curry(reduce);
CF.takeWhile = curry(takeWhile);

const range = function* (stop: number) {
  let i = -1;
  while (++i < stop) yield i;
};

start("리스트에서 홀수를 length 만큼 뽑아서 제곱한 후 모두 더하기", () => {
  function f(list: number[], length: number) {
    let acc = 0;
    let i = 0;
    for (const num of list) {
      if (num % 2) {
        acc = acc + num * num;
        if (++i == length) break;
      }
    }
    return acc;
  }
  log(f([1, 2, 3], 3));
});

start("filter 를 적용해보자", () => {
  function f(list: number[], length: number) {
    let acc = 0;
    let i = 0;
    for (const num of filter((a) => a % 2 === 1, list)) {
      acc = acc + num * num;
      if (++i == length) break;
    }
    return acc;
  }
  log(f([1, 2, 3], 3));
});

start("map 을 적용해보자", () => {
  function f(list: number[], length: number) {
    let acc = 0;
    let i = 0;
    for (const num of map(
      (a) => a * a,
      filter((a) => a % 2 === 1, list)
    )) {
      acc = acc + num;
      if (++i == length) break;
    }
    return acc;
  }
  log(f([1, 2, 3], 3));
});

start("take 를 적용해보자", () => {
  function f(list: number[], length: number) {
    let acc = 0;
    for (const num of take(
      length,
      map(
        (a) => a * a,
        filter((a) => a % 2 === 1, list)
      )
    )) {
      acc = acc + num;
    }
    return acc;
  }
  log(f([1, 2, 3], 3));
});

start("reduce 를 적용해보자", () => {
  const f = (list: number[], length: number) =>
    reduce(
      (acc, t) => acc + t,
      0,
      take(
        length,
        map(
          (a) => a * a,
          filter((a) => a % 2 === 1, list)
        )
      )
    );

  log(f([1, 2, 3], 3));
});

// 으음 그래도 조금 중첩된 함수를 보기가 불편하다
// go 라는 것을 사용해보자

start("go 를 적용해보자", () => {
  const f2 = (list: number[], length: number) =>
    go(
      list,
      (list: number[]) => filter((a) => a % 2 === 1, list),
      (list: number[]) => map((a) => a * a, list),
      (list: number[]) => take(length, list),
      (list: number[]) => reduce((a, b) => a + b, 0, list)
    );
  log(f2([1, 2, 3], 3));

  // curry를 사용
  const f3 = (list: number[], length: number) =>
    go(
      list,
      CF.filter((a: number) => a % 2 === 1),
      CF.map((a: number) => a * a),
      CF.take(length),
      CF.reduce((a: number, b: number) => a + b)
    );
  log(f3([1, 2, 3], 3));
});

start("range 를 해보자 지연평가의 장점", () => {
  const f3 = (list: Iterable<number>, length: number) =>
    go(
      list,
      CF.filter((a: number) => a % 2 === 1),
      CF.map((a: number) => a * a),
      CF.take(length),
      CF.reduce((a: number, b: number) => a + b)
    );

  log(go(f3(range(Infinity), 200))); // 10666600
});

start("2차원 배열을 어떻게 처리해보자", () => {
  const flat = function* (iter: Iterable<unknown>) {
    for (const a of iter) {
      // @ts-ignore
      if (a && a[Symbol.iterator]) yield* a; // yield b 대신에 적용
      else yield a;
    }
  };

  const arr = [[1, 2, 3], [4, 5, 6], [7], 8, 9, [10]];
  go(
    arr,
    flat,
    CF.filter((a: number) => a % 2 === 1),
    CF.take(5),
    log
  ); // [ 1, 3, 5, 7, 9 ]
});

// 스읍,, 모나드..
// 자바스크립트 array 가 모나드 [] 모나드..
// f(g(1)) 아무것도 없을때 1이 아니라 없을때
// [].map(g).map(f).forEach(()=>~~) 실행 안하잖아 굳굳
// [1].~~ 이면 실행하고 이게 모나드라는데요
// 함수의 합성을 안전하게 한다
// Promise 도 모나드래요
// Promise.resolve(1).then(g).then(f).then(a=>log(a))
// Promise는 비동기함수를 합성하기위한 모나드
// 각 목적이 있다 모나드
// a instanceof Promise true 이면 뭐 그런데에 의미가 있다
// const go1 = (a, f)=> a instanceof Promise ? a.then(f) : f(a)

// takeWhile같은걸로 페이징 데이터 가져오는거 쉽게 표현할 수 있겠다

start("takeWhile 예시 ", () => {
  CF.takeWhile(
    (a: number) => a < 2,
    [Promise.resolve(1), Promise.resolve(2)]
  ).then(log);
});
