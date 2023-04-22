# 쿼리 문서

## Qeury on Embedded/Nested Documents

- 테스트 데이터를 입력

```js
// 먼저 테스트 데이터를 입력
await db.collection("inventory").insertMany([
  {
    item: "journal",
    qty: 25,
    size: { h: 14, w: 21, uom: "cm" },
    status: "A",
  },
]);
```

- Match an embedded/Nested Document

```js
// {field:value} 식으로 쿼리
// 다음 쿼리는 size 필드가 {h:14, w:21, uom:"cm"} 인 것을 쿼리한다
const cursor = db.collection("inventory").find({
  size: { h: 14, w: 21, uom: "cm" },
});

// 동등 검사는 진짜로 value가 일치하는지 본다, field order 도 포함해서!!!!!!!
const cursor = db.collection("inventory").find({
  size: { h: 14, w: 21, uom: "cm" },
});
const cursor = db.collection("inventory").find({
  size: { uom: "cm", h: 14, w: 21 },
});
// 두 쿼리는 다른 놈이다
```

- nestedField 에 동등검사 & queryOperator 사용 & AND Condition

```js
const cursor = db.collection("inventory").find({
  "size.uom": "in",
});
// dot notation 들어가면 문자열로 해야하는게 상당히 불편하단 말이지 스아아....

// Query Operator를 사용해볼까?
// 문법은 다음과 같다
// {<Field> : {<Operator> : <Value>}, ...}
const cursor = db.collection("inventory").find({
  "size.h": { $lt: 15 },
});

// AND 다음에서는 $and 안해도 된다
const cursor = db.collection("inventory").find({
  "size.h": { $lt: 15 },
  "size.uom": "in",
  status: "D",
});
// 사이즈h가 15보다 작고 size.uom이 in이고 status 가 D 인 다큐먼트를 가져와랏!
```

<br />
<hr />
<br />

## Query an Array

```ts
// test 데이터 넣기 좀 그러니까 그냥 타입으로 하자
type DATA = {
  item: string;
  qty: number;
  tags: Array<string>;
  dim_cm: Array<number>;
};
```

- Match an Array

```js
const cursor = db.collection("inventory").find({
  tags: ["red", "blank"],
});
// 이랑
const cursor = db.collection("inventory").find({
  tags: ["blank", "red"],
});
// 은 다르다 절대로 다르다 다르다 다르다 다르다
// 어레이 엘레먼트 순서도 보고 암튼 완전히 똑같아야한다

// 대신에 단순히 "red"랑 "blank" 를 포함하는지, 순서나 다른 엘레먼트의 유무 상관없이
// $all 오퍼레이터를 사용하면 된다
const cursor = db.collection("inventory").find({
  tags: { $all: ["red", "blnak"] },
}); // 이러면 red, blank 든지 blank, red 든지 red, blank, plain, someshit이든지 다 검색 됨 허헣
```

- Query an Array for an Element

```js
// 어레이 필드에 적어도 하나의 엘레먼트가 제공한 value 에 맞는게 있는지 쿼리하려면
// {<filed> : value} 하면 된다 value는 element value이다
const cursor = db.collection("inventory").find({
  tags: "red",
}); // tags Array의 elemnt가 red인것 하나만 있어도 그 document를 반환한다
// plain을 가지고 있는 놈은 하나밖에 없어서 plain을 쿼리하면 하나만 반환하네

// operator도 적용할 수 있는데
// 다음 쿼리는 dim_cm 어레이 안에 있는 엘레먼트중 단 하나라도 25보다 크면 반환한다
const cursor = db.collection("inventory").find({
  dim_cm: { $gt: 25 },
}); // 아니 그러면 $elemMatch 랑 다른게 뭔데 진짜!!!!!!!!!!!!!으아아아악 답을 줘 답을...왜 전부 보여주지않는거야..
```

- Specify Multiple Conditions for Array Elements

```js
// Query an Array with Compound Filter Conditions on the Array Elements
// 배열 element에 대한 복합 필터 조건으로 배열 쿼리
// dim_cm 배열이 주어진 콤비네이션 조건을 만족하는 element를 포함할때
const cursor = db.collection("inventory").find({
  dim_cm: { $gt: 15, $lt: 20 },
});
// element 중에 하나라도 gt: 15를 만족해야하고
// element 중에 하나라도 lt: 20을 만족해야한다
// EX) 14, 21, 70 일때
// {dim_cm: { $gt: 60, $lt: 13 }} 이면 검색 안된다 왜냐하면 13 아래인 놈이 없기때문에
// {dim_cm: { $gt: 60, $lt: 15 }} 이면 검색 검색 된다

// Query for an Array Element that meets Multipe criteria
// 여러 기준을 충족하는 배열 element에 대한 쿼리
// 명시한 여러 조건을 적어도 하나의 element 가 충족하는 지 쿼리하려면 $elemMatch를 사용해라
const cursor = db.collection("inventory").find({
  dim_cm: { $elemMatch: { $gt: 22, $lt: 30 } },
});
// 주어진 조건을 다 만족하는 element가 하나라도 있어야한다
// dim_cm = [14, 21, 70] 일때
// {dim_cm: { $elemMatch: { $gt: 65, $lt: 40 } }} 하면 안걸린다 65이상이면서 40보다 작은것은 number값은 없어 이 3차원 세계에
// {dim_cm: { $elemMatch: { $gt: 60, $lt: 72 } }} 하면 걸린다 70 하나 가지고 있는
```

- Additional Query Tutorials

```js
// 특정한 배열 엘레먼트에 대한 쿼리
const cursor = db.collection("inventory").find({
  "dim_cm.1": { $gt: 25 },
});
// dim_cm 배열의 두번째 엘레먼트가 25보다 큰지

// 배열 크기에 대한 쿼리
const cursor = db.collection("inventory").find({
  tags: { $size: 3 },
}); // tags 배열 크기가 3인 것을 조회
```

<br />
<hr />
<br />

## Query an Array of Embedded Documents

- Example data

```js
// 이 부분은 중첩객체 Array에 대한 쿼리를 알려줍니다
const inventoryCollection = [
  {
    item: "journal",
    instock: [
      { warehouse: "A", qty: 5 },
      { warehouse: "C", qty: 15 },
    ],
  },
  { item: "notebook", instock: [{ warehouse: "C", qty: 5 }] },
  {
    item: "paper",
    instock: [
      { warehouse: "A", qty: 60 },
      { warehouse: "B", qty: 15 },
    ],
  },
  {
    item: "planner",
    instock: [
      { warehouse: "A", qty: 40 },
      { warehouse: "B", qty: 5 },
    ],
  },
  {
    item: "postcard",
    instock: [
      { warehouse: "B", qty: 15 },
      { warehouse: "C", qty: 35 },
    ],
  },
];
```

- Query for a Document Nested in an Array

```js
// 다음 예제는 instock array안의 엘레먼트가 주어진 document와 일치하는 다큐먼트를 리턴
const cursor = db.collection("inventory").find({
  instock: { warehouse: "A", qty: 5 },
});
// 동등검사기 때문에 {warehouse : "A", qty: 5} 하고 완전히 일치하는 엘레먼트 있으면 리턴
// {qty:5, warehouse: "A"} 처럼 순서 뒤바뀌어버리거나 그러면 조회 안됨
```

- Specify a Query Condition on a Field in an Array of Documents

```js
// 어레이 엘레먼트 다큐먼트의 특정 필드의 index position을 모를경우 다음과 같이 할 수 있다
// dot notation을 사용

// 다음 예제는 qty 필드가 20보다 작은 값을 가지고 있는 엘레먼트가 instock 어레이에 적어도 하나가 있을 경우를 조회한다
const cursor = db.collection("inventory").find({
  "instock.qty": { $lte: 20 },
});

// 배열의 특정 index의 필드의 값을 처리
const cursor = db.collection("inventory").find({
  "instcok.0.qty": { $lte: 20 },
});
```

- Specify Multiple Conditions for Array of Documents

```js
// 진짜 개복잡하네 정말로!!!
// 원본 description
// When specifying conditions on more than one field nested in array of documents,
// you can specify the query such that either a single document meets these condition
// or any combination of documents(including a single document) in  the array meets the conditions

// instock array 가 적어도 하나의 내장 document를 포함하는지 그 내장 document는 필드 두개 다
// qty 가 5이고 warehouse 가 A여야한다
const cursor = db.collection("inventory").find({
  instock: { $elemMatch: { qty: 5, warehouse: "A" } }, // qty warehouse의 필드 순서는 상관없다
});
// instock 어레이 안에 있는 엘레먼트중 하나가 qty가5이고 warehouse가 A이면 만족한다

// 다음 쿼리는 instock 어레이 안에 내장 document 중 하나라도 qty 가 10보다 크고 20보다 작거나 같으면 만족한다
const cursor = db.collection("inventory").find({
  instock: { $elemMatch: { qty: { $gt: 10, $lte: 20 } } },
});

// 실험으로 다음을 해보았더니
const query = {
  instock: { $elemMatch: { $or: [{ qty: { $lt: 6 } }, { qty: { $gt: 14 } }] } },
};
// 6이하거나 14이상인것이 하나라도 있으면 리턴하는듯
```

- Combination of Elements Satisfies the Criteria

```js
/*!SECTION
만약에 어레이 필드에 대한 합성 쿼리 컨디션이 $elemMatch 오퍼레이터를 사용하지않으면
쿼리는 해당 컨디션을 만족하는 조합을 가지는 어레이의 document를 반환
*/
const cursor = db.collection('inventory').find({
    'instock.qty' : {$gt: 10, %lte: 20}
})
// qty [{warehouse:"A", qty: 5}] 인것은 조회 안된다 gt:10 인 것이 없기때문
// qty [{warehouse:"A", qty: 11}, {warehouse:"A", qty: 15}] 는 조회된다
// qty [{warehouse:"A", qty: 5}, {warehouse:"A", qty: 80}] 는 조회된다

//{'instock.qty': { $gt: 14, $lte: 6 }}
// 이거는 아마 이렇게 동작하는듯
// instock.qty 중에 14보다 큰게 있나?
// instock.qty 중에 6보다 작은게 있나?
// 둘다 있으면 리턴


// 다음 쿼리는 instock 어레이에서 주어진 조건을 확인하는데
// qty 가 5 인것이 있어야한다
// warehouse A 인것이 있어야한다
// 똑같은 element에서 만족할 필요없다
const cursor = db.collection('inventory').find({
    'instock.qty' : 5,
    'instock.warehouse' : 'A'
})
// instock : [{qty: 5, warehouse: "B"}, {qty:99, warehouse:"A"}] 가 검색이 된다는 것이다
```
